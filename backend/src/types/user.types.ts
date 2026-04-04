export interface IUser {
  username: string;
  password: string;
  display_name: string;
  phone_number: string;
  token?: string;
}

export type IUserRegister = Omit<IUser, "token">;
