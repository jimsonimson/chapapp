'Use strict';
namespace app.Services{
  export class UserService{
    public register(user){

    }
    constructor(
      private $resource: ng.resource.IResourceService
    ){}
  }
  angular.module('app').service('UserService', UserService);
}
