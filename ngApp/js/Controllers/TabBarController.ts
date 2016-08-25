'use strict'
namespace app.Controllers{
  export class TabBarController{
    public tabs = [
      {title: 'About', content: 'Show About Page here'},
      {title: 'Hair', content: 'Show Hairstyles Page here'},
      {title: 'Book', content: 'Show Book Page here'},
    ];

    constructor(){

    };
  }
  angular.module('app').controller('TabBarController', TabBarController);
}
