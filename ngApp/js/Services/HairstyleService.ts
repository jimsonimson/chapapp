'use strict';
namespace app.Services{
  export class HairstyleService{
    public HairstyleResource;

    public saveHairstyle(hairstyle){
      return this.HairstyleResource.save(hairstyle).$promise;
    };

    public getAll(){
      return this.HairstyleResource.query();
    };

    public deleteHairstyle(hairstyle){
      return this.HairstyleResource.delete({ _id: hairstyle }).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ){
      this.HairstyleResource = $resource('/api/v1/hairstyles/:id', null, { 'update': { method: 'PUT'}})
    };
  }
  angular.module('app').service('HairstyleService', HairstyleService);
}
