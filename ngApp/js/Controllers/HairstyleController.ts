'use strict'
namespace app.Controllers{
  export class HairstyleController{
    public hairstyle;
    public hairstyles;

    public createHairstyle(hairstyle){
      this.HairstyleService.saveHairstyle(this.hairstyle).then((res)=>{
        console.log('succesfully added hairstyle')
      })
    };

    constructor(
      private HairstyleService: app.Services.HairstyleService
    ){
      this.hairstyles = HairstyleService.getAll();
    }
  }
  angular.module('app').controller('HairstyleController', HairstyleController);
}
