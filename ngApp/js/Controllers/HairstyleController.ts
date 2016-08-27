'use strict'
namespace app.Controllers{
  export class HairstyleController{
    public hairstyle={};
    public selectedHairstyle;
    public styles;

    public addHairstyle(){
      this.HairstyleService.saveHairstyle(this.hairstyle).then((res)=>{
        this.styles.push(res);
        this.$location.path('/manageservices')
      })
    };

    public deleteStyle(hairstyle){
      this.HairstyleService.deleteHairstyle(hairstyle).then((res)=>{
        this.styles.splice(this.styles.indexOf(hairstyle), 1)
        console.log(res.message);
      });
    }

    constructor(
      private HairstyleService: app.Services.HairstyleService,
      private UserService: app.Services.UserService,
      private $location: ng.ILocationService
    ){
      this.styles = HairstyleService.getUserHairstyles();
    }
  }
  angular.module('app').controller('HairstyleController', HairstyleController);
}
