'use strict'
namespace app.Controllers{
  export class CalendarController{
    static $inject = ['$scope', '$routeParams', 'app.Services.AppointmentsService', 'app.Services.UserTypesService'];

    private doFullCalendar(
      $scope: any,
      calendarService: app.Services.AppointmentsService,
      userTypePromise: ng.IPromise<IUserType>
    ): void {
      $scope.events = (start: Moment, end: Moment, timezone, callback) => {
        userTypePromise.then((userType) => {
            this.appointmentsService.getAppointments(userType.alias, start, end).then(
                (result: IEventData): any => { callback(result.events); }, // success
                (): any => { callback([]); }); // error
        });
      };
      $scope.eventSources = [$scope.events];

       // event click
       $scope.onEventClick = (event, allDay, jsEvent, view) => {
           $scope.activeAppointment = event;
           $scope.showAppointmentMaintenanceDialog = true;
       };

       $scope.saveAppointment = (appointment: IEvent) => {
           return this.saveAppointment(appointment);
       };

       // Change View
       $scope.changeView = (view, calendar) => { calendar.fullCalendar('changeView', view); };

       var height: number = Math.max(600, window.innerHeight - 255);

       /* set FullCalendar config */
       $scope.uiCalendarConfig = {
           lang: 'en', // Translate calendar in your language
           height: height,
           editable: true,
           cache: false,
           header: {
               left: 'prev,next today',
               center: 'title',
               right: 'month,agendaWeek,agendaDay,list'
           },
           firstDay: 0,
           eventClick: $scope.onEventClick
       };
    };

    private saveAppointment(appointment: IEvent): ng.IPromise<IEvent> {
       return this.appointmentsService.saveAppointment(appointment);
    }

    private renderCalendar(calendar: any): void {
       if (calendar) {
           calendar.fullCalendar('render');
       }
    }

    // ensure rendering of the fullCalendar control (unless it takes more than 2500ms)
    private ensureRendering(id: any, retryCount: any): void {
        if (id) {
            if ($('#' + id + ' .fc-widget-header').length === 0) {
                if (retryCount < 200) {
                    window.setTimeout((): any => {
                        // console.log(retryCount);
                        this.renderCalendar($('#' + id));
                        this.ensureRendering(id, ++retryCount);
                    }, 50);
                }
            }
        }
    }

    constructor(
      private $scope: ICalendarControllerScope,
      $routeParams: any,
      private appointmentsService: app.Services.AppointmentService,
      private userTypesService: app.Services.UserTypesService
    ){
      $scope.content = { tabs: [{id: 1, label: 'Agenda'}] };
      $scope.editMode = () => $routeParams.create === 'true';

      var userTypeService = getUserType($routeParams.id);
      userTypePromise.then((result)=> $scope.userType = result);

      this.doFullCalendar($scope, appointmentsService, userTypePromise);

      this.ensureRendering('calendar', 0);
    }
  }
  angular.module('app').controller('CalendarController', CalendarController);
}
