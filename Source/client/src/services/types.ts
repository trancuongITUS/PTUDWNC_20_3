export interface IUser {
  username?: string;
  email?: string;
  fullname?: string;
  role?: string;
  photo?: string;
  _id?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface GenericResponse {
  status?: string;
  message?: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
