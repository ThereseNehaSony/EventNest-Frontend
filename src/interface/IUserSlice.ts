

export interface UserState {
  user: UserData;
  loading: boolean;
  error: null | string;
  userDetails: UserData;
 
}


export interface UserData {
  id(id: any): import("redux").UnknownAction;
  phone: string;
  _id: any;
  username: string;
  email: string;
  role?: string | null;
  message: string;
  status: string;
  address:string;
  aadharNumber:string;
  bankAccountNumber:string;

}



export interface IUserSelector {
  user: UserState;
  loading: boolean;
  error: null | string;
}

export interface IHostSelector {
  host: UserState;
  loading: boolean;
  error: null | string;
}

export interface IAdminSelector {
  admin: UserState;
  categories:UserState;
  loading: boolean;
  error: null | string;
}
