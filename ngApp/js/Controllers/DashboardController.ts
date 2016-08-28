"use strict";
namespace app.Controllers{
  export class DashboardController{
    public eventSources=[];
    public appointments=[];

    // public uiConfig = {
    //   calendar:{
    //     height: 550,
    //     editable: true,
    //     header:{
    //       left: 'month basicWeek basicDay agendaWeek agendaDay',
    //       center: 'title',
    //       right: 'today prev,next'
    //     },
    //     eventClick: alertEventOnClick,
    //     eventDrop: alertOnDrop,
    //     eventResize: alertOnResize
    //   }
    // };




    constructor(
      private AppointmentService: app.Services.AppointmentService,
      private $location: ng.ILocationService
    ){
      this.appointments = AppointmentService.getAllBarberAppointments();
    };
  }
  angular.module('app').controller('DashboardController', DashboardController);
}
