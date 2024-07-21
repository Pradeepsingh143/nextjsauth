import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import ApiError from "@/lib/ApiError";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/zodValidation";
import { StatusCode } from "@/lib/types";
import UserModel from "@/models/user.schema";
import connectDB from "@/config/connectDB";
import generateUsername from "@/lib/generateUserName";
import generatePassword from "@/lib/generatePassword";
import mailHelper from "@/lib/mailHelper";
import welcomeUserEmail from "@/templates/welcomeUserEmail";
import env from "./env";
import { authConfig, jwtAndSessionCallbacks } from "@/config/auth.edge";
import { getUserByEmail } from "@/actions/auth.actions";

type InputUserDetails = {
  email: string;
  password: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,

      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", name: "email" },
        password: { label: "Password", type: "password", name: "password" },
      },
      authorize: async (
        credentials: Partial<Record<"email" | "password", unknown>>
      ): Promise<InputUserDetails | null> => {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        )
          return null;

        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await getUserByEmail(email);

          if (user) {
            const isPasswordMatch = await user.comparepassword(password);
            if (isPasswordMatch) {
              return user;
            } else {
              throw new ApiError(400, "Invalid login credentials");
            }
          } else {
            throw new ApiError(404, "User not found");
          }
        } catch (error: any) {
          if (error instanceof ZodError) {  
            throw new ApiError(500, error.message);
          }
          if (error instanceof ApiError) {
            throw new ApiError(error.statusCode, error.message);
          } else {
            throw new ApiError(500, "internal server Error");
          }
        }
      },
    }),
  ],
  callbacks: {
    ...jwtAndSessionCallbacks,
    async signIn({ user, account }) {
      "use server";
      await connectDB();

      if (account?.provider === "google" || account?.provider === "github") {
        const email = user.email;

        if (!email) {
          throw new ApiError(StatusCode.BadRequest, "email is required");
        }

        const ExistingUser = await UserModel.findOne(
            { email },
            "+password -verifyToken -verifyTokenExpiry"
          );

        if (!ExistingUser) {
          const username =
            user.username ?? generateUsername(user.name, user.email);
          const password = generatePassword(15);

          const newUser = await UserModel.create({
            username,
            email,
            password,
          });

          if (!newUser) {
            throw new ApiError(
              StatusCode.InternalServerError,
              "Request !Failed user not created"
            );
          }
          user._id = newUser._id;
          user.role = newUser.role;
          user.username = newUser.username;
          newUser.isVerified = true;
          await newUser.save({ validateBeforeSave: false });
          user.isVerified = true;
          newUser.password = undefined;

          const mailMessage = welcomeUserEmail({
            username: newUser.username || newUser.name,
            companyName: env.COMPANY_NAME!,
            name: newUser.name || newUser.username,
            EMAIL_SENDER_NAME: env.EMAIL_SENDER_NAME!,
            EMAIL_SENDER_JOB_TITLE: env.EMAIL_SENDER_JOB_TITLE!,
          });

          try {
            await mailHelper({
              email: newUser.email,
              subject: `Welcome to ${env.COMPANY_NAME} - Action Required`,
              html: mailMessage,
            });
          } catch (error) {
            console.log("welcome email send failed");
          }
        } else {
          user._id = ExistingUser._id;
          user.role = ExistingUser.role;
          user.username = ExistingUser.username;
          user._id = ExistingUser._id;
          user.isVerified = true;
          ExistingUser.password = undefined;
        }
      }
      return true;
    },
  },
});