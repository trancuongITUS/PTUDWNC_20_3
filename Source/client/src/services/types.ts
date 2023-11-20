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
  message?: string;
  user: IUser;
}

export interface IUserResponse {
  message: string;
  result: IUser;
}
