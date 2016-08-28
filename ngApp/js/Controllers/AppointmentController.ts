'use strict';
namespace app.Controller{
  export class AppointmentController{
    public appointment={};
    public appointments = [];

    public submitAppt(){
      this.AppointmentService.saveAppt(this.appointment).then((res)=>{
        this.appointments.push(res);
        this.$location.path('/account');
      });
    };


    constructor(
      private AppointmentService: app.Services.AppointmentService,
      private $location: ng.ILocationService,
      private $ui
    ){
      this.appointments = AppointmentService.getAllBarberAppointments();
    };
  }
  angular.module('app').controller('AppointmentController', AppointmentController);
}
