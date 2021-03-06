import { User } from '../shared/interfaces/user.interface';

export class NewUser implements User {
  id?: number;
  login: string;
  password: string;

  constructor(userLogin: string, userPassword: string, userId?: number) {
    this.id = userId;
    this.login = userLogin;
    this.password = userPassword;
  }
}
