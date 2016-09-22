angular.module('app').directive('about', () => ({
  templateUrl: '../../templates/about.html',
  restrict: 'E',
  controller: 'GlobalController',
  controllerAs: 'vm'
}));
