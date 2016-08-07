angular.module('app').directive('apptform', () => ({
  templateUrl: '../../templates/appointmentform.html',
  restrict: 'E',
  controller: 'AppointmentController',
  controllerAs: 'vm'
}));
