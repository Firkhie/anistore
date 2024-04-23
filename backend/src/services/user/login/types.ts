export type UserLoginParams = {
  email?: string;
  password?: string;
}
export type GenerateJwtTokenParams = {
  user_id: string;
  name: string;
  role: string;
}