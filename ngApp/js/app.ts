'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'ui.materialize', 'ui.calendar'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('LandingPage', {
      url: '/FindBarber',
      templateUrl: '/templates/landingpage.html',
      controller: app.Controllers.LandingPageController,
      controllerAs: 'vm'
    })
    .state('forbarbers', {
      url: '/',
      templateUrl: '/templates/forbarbers.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .state('Register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .state('Login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .state('Dashboard', {
      url: '/account/:id',
      templateUrl: '/templates/barberdashboard.html',
      controller: app.Controllers.DashboardController,
      controllerAs: 'vm'
    })
    .state('MyAccount', {
      url: '/myaccount',
      templateUrl: '/templates/manageaccount.html',
      controller: app.Controllers.DashboardController,
      controllerAs: 'vm'
    })
    .state('ManageServices', {
      url: '/manageservices',
      templateUrl: '/templates/manageservices.html',
      controller: app.Controllers.HairstyleController,
      controllerAs: 'vm'
    })
    .state('MyProfile', {
      url: '/profile',
      templateUrl: '/templates/myprofile.html',
      controller: app.Controllers.HairstyleController,
      controllerAs: 'hc'
    })
    .state('BarberProfile', {
      url: '/barber/:id',
      templateUrl: '/templates/barberprofile.html',
      controller: app.Controllers.BarberProfileController,
      controllerAs: 'vm'
    })
    .state('Barbers', {
      url: '/barbers',
      templateUrl: '/templates/barbers.html',
      controller: app.Controllers.LandingPageController,
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
