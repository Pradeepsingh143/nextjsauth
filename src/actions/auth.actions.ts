"use server";

import { signInSchema } from "@/lib/zodValidation";
import { signIn } from "@/config/auth";
import connectDB from "@/config/connectDB";
import ApiError from "@/lib/ApiError";
import { ApiErrorResponse, ApiResponse, StatusCode } from "@/lib/types";
import UserModel from "@/models/user.schema";

export async function credentialsLoginAction(
  formData: FormData,
): Promise<ApiResponse<String> | ApiErrorResponse> {
  const values = Object.fromEntries(formData.entries());
  const { email, password } = signInSchema.parse(values);

  try {
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return {
      success: true,
      data: response,
      message: "login success",
      statusCode: 200,
    };
  } catch (error: any) {
    const errorResponse = {
      message: error.cause.err.message,
      statusCode: error.cause.err.statusCode,
      success: false,
    };
    return errorResponse as ApiErrorResponse;
  }
}

export async function getUserByEmail(email: string) {
  await connectDB();
  if (!email) {
    throw new ApiError(StatusCode.BadRequest, "Email is required");
  }
  const user = await UserModel.findOne(
    { email },
    "+password -verifyToken -verifyTokenExpiry",
  );
  return user;
}

export async function socialLoginAction(formData: FormData) {
  const action = formData.get("action");
  if (action) {
    await signIn(action.toString(), { redirectTo: "/" });
  }
}