import { Schema, models, model } from "mongoose";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Role, User as UserType } from "@/lib/types";

const userSchema = new Schema<UserType>(
  {
    name: String,
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      default: Role.SUBSCRIBER,
      enum: Role,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bio: { type: String },
    profilePicture: { type: String },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return NextResponse.next();
  this.password = await bcryptjs.hash(this.password, 10);
  return NextResponse.next();
});

userSchema.methods = {
  // Compare password
  comparepassword: async function (enteredPassword: string) {
    return await bcryptjs.compare(enteredPassword, this.password);
  },

  // generate forgot password token
  generateForgotPasswordToken: function () {
    const forgotToken = crypto.randomBytes(10).toString("hex");
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
    return forgotToken;
  },

  // verify user
  generateVerifyToken: function () {
    const buffer = crypto.randomBytes(3);
    const otp = parseInt(buffer.toString("hex"), 16) % 1000000;
    const generatedVerifyToken = otp.toString().padStart(6, "0");

    this.verifyToken = crypto
      .createHash("sha256")
      .update(generatedVerifyToken)
      .digest("hex");

    this.verifyTokenExpiry = Date.now() + 10 * 60 * 1000;
    return generatedVerifyToken;
  },
};

const UserModel = models.users || model<UserType>("users", userSchema);

export default UserModel;
