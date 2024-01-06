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
  idRole?: number;
}

export interface IGenericResponse {
  message?: string;
  status?: string;
  user?: IUser;
}

export interface IUserResponse {
  message: string;
  result: IUser;
}
