'use strict';
namespace app.Controllers {
  export class UserController {
    public user;

    public register(){
      let user = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password
      }

    }

    constructor(
      private UserService: app.Services.UserService
    ){}
  }
  angular.module('app').controller('UserController', UserController);
}
