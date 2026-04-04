export interface IUser {
  _id: string;
  username: string;
  password: string;
  display_name: string;
  phone_number: string;
  token: string;
}

export interface IRegisterMutation {
  username: string;
  password: string;
  display_name: string;
  phone_number: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}
