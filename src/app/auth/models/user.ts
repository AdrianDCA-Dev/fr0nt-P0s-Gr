export class NbUser {

  constructor(public id?: number,
              public nombre?: string,
              public email?: string,
              public password?: string,
              public rememberMe?: boolean,
              public terms?: boolean,
              public confirmPassword?: string,
              public fullName?: string) {
  }
}
