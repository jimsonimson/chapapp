'use strict'
namespace app.Controllers{
  export class BarberProfileController{
    public profile;
    public appointment={};
    public appointments=[];

    public submitAppt(){
      this.AppointmentService.saveAppt(this.appointment).then((res)=>{
        this.appointments.push(res);
        this.$location.path('/account');
      });
    };

    constructor(
      private UserService: app.Services.UserService,
      private AppointmentService: app.Services.AppointmentService,
      private $location: ng.ILocationService,
      private $stateParams: ng.ui.IStateParamsService
    ){
      UserService.getUser($stateParams['id']).then((res)=>{
        this.profile = res;
        console.log(res);
      });
    };
  }
  angular.module('app').controller('BarberProfileController', BarberProfileController);
}
