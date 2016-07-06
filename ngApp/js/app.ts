'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('ForBarbers', {
      url: '/ForBarbers',
      templateUrl: '/templates/forbarbers.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .state('Register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AuthInterceptor');
  });
}
