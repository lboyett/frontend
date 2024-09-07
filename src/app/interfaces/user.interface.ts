export interface UserLogin {
  email: string;
  password?: string;
}

export interface UserResponse {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
}
