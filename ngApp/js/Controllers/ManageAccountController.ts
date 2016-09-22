'use strict';
namespace app.Controllers{
  export class ManageAccountController{
    public account;
    public user;
    
    public updateProfile(){
      this.UserService.updateUser(this.user).then((res)=>{
        this.$location.path('/')
      })
    }
    
    constructor(
      private UserService: app.Services.UserService,
      private $stateParams: ng.ui.IStateParamsService,
      private $location: ng.ILocationService
    ){
      this.account = angular.copy(UserService.status);
      UserService.getUser(this.account._id).then((res)=>{
        this.user = res;
      })
    }
  }
  angular.module('app').controller('ManageAccountController', ManageAccountController);
}