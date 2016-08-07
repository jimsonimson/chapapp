angular.module('app').directive('sidenav', () => ({
  templateUrl: '../../templates/sidenav.html',
  restrict: 'E',
  controller: 'GlobalController',
  controllerAs: 'gc'
}));
