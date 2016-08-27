'Use strict';
namespace app.Services{
  export class UserService{
    public status = {
      _id: null,
      email: null,
      username: null,
      appointments: null,
      hairstyles: null
    }
    public UserRegisterResource;
    public UserLoginResource;
    public UserAllResource;
    public UserResource;

    public register(user){
      return this.UserRegisterResource.save(user).$promise;
    };

    public login(user){
      return this.UserLoginResource.save(user).$promise;
    };

    public setToken(token){
      this.$window.localStorage.setItem('token',token);
    };

    public setUser(){
      let u = JSON.parse( atob( this.$window.localStorage.getItem('token').split('.')[1] ) );
      this.status._id = u._id;
      this.status.email = u.email;
      this.status.username = u.username;
      this.status.appointments = u.appointments;
      this.status.hairstyles = u.hairstyles;
    };

    public removeToken(){
      this.$window.localStorage.removeItem('token');
    };

    public removeUser(){
      this.status._id = null;
      this.status.email = null;
      this.status.username = null;
      this.status.appointments = null;
    };

    // Keep user logged in with page refresh
    public getToken() {
      return this.$window.localStorage.getItem("token");
    };

    //Get individual user info
    public getUser(userId){
      return this.UserResource.get({ id: userId }).$promise;
    }

    //Get all users
    public getUsers(){
      return this.UserAllResource.query().$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService
    ){
      this.UserResource = $resource('api/v1/users/:id');
      this.UserAllResource = $resource('api/v1/users');
      this.UserRegisterResource = $resource('/api/v1/users/register');
      this.UserLoginResource = $resource('/api/v1/users/login');
      if (this.getToken()) this.setUser();

    }
  }
  angular.module('app').service('UserService', UserService);
}
