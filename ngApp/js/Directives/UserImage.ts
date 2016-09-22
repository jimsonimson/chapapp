angular.module('app').directive('userImg', function(){
  return function(scope, element, attrs){
    var url = attrs.backImg;
    element.css({
        'background-image': 'url(' + url +')',
        'background-size' : 'cover'
    });
  };
});​
angular.module('app').directive('tabbar', ()=>({
  templateUrl: '../../templates/tabbar.html',
  restrict: 'E',
  controller: 'TabBarController',
  controllerAs: 'tb'
}));