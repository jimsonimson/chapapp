'use strict';
namespace app.Services{
  export class HairstyleService{
    public HairstyleResource;

    public saveHairstyle(hairstyle){
      return this.HairstyleResource.save(hairstyle).$promise;
    };

    public getAll(){
      return this.HairstyleResource.query();
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ){
      this.HairstyleResource = $resource('/api/v1/hairstyles/:id', null, { 'update': { method: 'PUT'}})
    };
  }
  angular.module('app').service('HairstyleService', HairstyleService);
}
