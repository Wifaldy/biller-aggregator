export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  expired: string;
}

export interface IJwtUser {
  username: string;
  name: string;
}
