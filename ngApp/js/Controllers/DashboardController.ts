"use strict";
namespace app.Controllers{
  export class DashboardController{
    public eventSources=[];

    public uiConfig = {
      calendar:{
        height: 550,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };




    constructor($scope){

    }
  }
  angular.module('app').controller('DashboardController', DashboardController);
}
