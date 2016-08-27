'use strict';
namespace app.Controllers{
  export class GlobalController{
    public status;

    public logout(){
      this.UserService.removeToken();
      this.UserService.removeUser();
      this.$location.path('/');
    };

    constructor(
      private UserService: app.Services.UserService,
      private $location: ng.ILocationService
    ){
      this.status = this.UserService.status;
    };
  }
  angular.module('app').controller('GlobalController', GlobalController);
}
