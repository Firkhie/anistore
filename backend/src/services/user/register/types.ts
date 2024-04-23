export type RegisterUserParams = {
  name: string;
  email: string;
  phone_number?: string;
  password: string;
  password_confirmation?: string;
  status?: string;
  role?: string;
  last_login?: any;
}