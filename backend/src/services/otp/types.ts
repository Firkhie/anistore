export type OtpParams = {
  email: string;
}
export type GenerateOtpParams = {
  type: "email_activation" | "forgot_password";
  minute: number;
}
export type SendOtpParams = {
  otp: string;
  subject: string;
}
export type GenerateParams = GenerateOtpParams & {
  subject: string;
}
export type VerifyParams = {
  code: string;
  type: "email_activation" | "forgot_password";
}