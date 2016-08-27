namespace app.Controllers {
  export class LandingPageController {
    public searchLocation;
    public barbers;


    constructor(
      private UserService: app.Services.UserService
    ) {
      UserService.getUsers().then((res)=>{
        this.barbers = res;
      })
    }
  }

  angular.module('app').controller('LandingPageController', LandingPageController);
}
