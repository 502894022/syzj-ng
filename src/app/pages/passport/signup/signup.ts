export interface Signup {
  phone: string;
  email: string;
  shopName: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export class User{
  id: number;
  phone: string;
  email: string;
  createTime: Date;
}

export class LoginAccount{
  userId: number;
  identifier: string;
  credential: string;
}
