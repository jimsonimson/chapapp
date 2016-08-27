'use strict'
namespace app.Controllers{
  export class BarberProfileController{
    public profile;


    constructor(
      private UserService: app.Services.UserService,
      private $stateParams: ng.ui.IStateParamsService
    ){
      UserService.getUser($stateParams['id']).then((res)=>{
        this.profile = res;
      })
    };
  }
  angular.module('app').controller('BarberProfileController', BarberProfileController);
}
