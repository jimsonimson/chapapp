'use strict';
namespace app.Services{
  export class AppointmentService{

    public AppointmentResource;

    public saveAppt(appt){
      return this.AppointmentResource.save(appt).$promise;
    }

    public getAllBarberAppointments(){
      return this.AppointmentResource.query();
    }

    constructor(
      private $resource: ng.resource.IResourceService,
    ){
      this.AppointmentResource = $resource('/api/v1/appointments/:id', null, { 'update': { method: 'PUT'}})
    };
  }
  angular.module('app').service('AppointmentService', AppointmentService);
}
