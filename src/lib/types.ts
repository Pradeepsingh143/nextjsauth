export enum StatusCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Unverified = 402,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  SUBSCRIBER = "SUBSCRIBER",
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface User {
  _id?: string;
  name?: string;
  username: string;
  email: string;
  avatar?: string;
  password: string;
  isVerified: boolean;
  bio?: string;
  profilePicture?: string;
  role: Role;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: string;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
