"use strict";
namespace app.Controllers{
  export class DashboardController{
    public events=[
      { title: "Jon's haircut", start: new Date(2016, 8, 28)},
      { title: "Rons's haircut", start: new Date(2016, 8, 29, 19, 30)}
    ];
    public eventSources=[  { title: "Jon's haircut", start: new Date(2016, 8, 28)},
      { title: "Rons's haircut", start: new Date(2016, 8, 29, 19, 30)}];

    public appointments;

    //load events from server
    public loadEvents() {
      this.$http.get('/api/v1/appointments', {
      cache: true,
      params: {}
    }).then(function(data){
      this.events.slice(0, this.events.length);
      angular.forEach(data.data, function(value){
        this.events.push({
          title: value.Title,
          description: value.Descritipn,
          start: new Date(parseInt(value.StartAt.substr(6))),
          end: new Date(parseInt(value.EndAt.substr(6))),
          allDay: value.IsFullDay
        });
      });
    });
  }

    //configure calendar
    public uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        displayEventTime: true,
        header: {
          left: 'month basicweek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev, next'
        },
        eventClick: function (event){
          this.SelectedEvent = event;
        },
        eventAfterAllRender: function(){
          if (this.events.length > 0 && this.isFirstTime){
            this.uiCalendarConfig.calendars.myCalendar.fullCallendar('gotoDate', this.events[0].start);
          }
        }
      }
    };

    constructor(
      private AppointmentService: app.Services.AppointmentService,
      private $http,
      private uiCalendarConfig,
      private $location: ng.ILocationService
    ){
      this.appointments = AppointmentService.getAllBarberAppointments();
      console.log(this.appointments)
      this.loadEvents();
    };
  }
  angular.module('app').controller('DashboardController', DashboardController);
};
