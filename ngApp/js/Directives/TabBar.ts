angular.module('app').directive('tabbar', ()=>({
  templateUrl: '../../templates/tabbar.html',
  restrict: 'E',
  controller: 'TabBarController',
  controllerAs: 'tb'
}));
