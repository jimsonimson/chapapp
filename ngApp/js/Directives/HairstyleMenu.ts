angular.module('app').directive('hairstylemenu', ()=>({
  templateUrl: '../../templates/hairstylemenu.html',
  restrict: 'E',
  controller: 'HairstyleController',
  controllerAs: 'hm'
}));
