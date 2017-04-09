(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
//
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsDirectiveTemplet.html',
    scope: {
      items: '<',
      onRemove: '&'
    },

    // templateUrl: 'foundItemsDirectiveTemplet.html',
    controller: NarrowItDownControllerDirective,
    controllerAs: 'menu',
    bindToController: true

}
  return ddo;
};

/*******************DIRECTIVE_CONTROLLER******************************/
function NarrowItDownControllerDirective(){
  var menu = this;
  console.log("this is ", menu);
  menu.cookiesInBox = function(){
    var x = 'f';
    if (x ==""){
      return true;
    };
    return false;
  };
};
/*******************PARENT_CONTROLLER*********************************/
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  console.log("this is ", menu)
  menu.searchTerm = "";
  menu.empty_searchTerm = false;
  menu.empty_list = false;
  menu.narrowItDown = function(searchTerm){
    if(searchTerm ==""){
      menu.empty_searchTerm = true;
      console.log("Please enter value!");
    }else {
      menu.empty_searchTerm = false;
      var searchTermLowerCase = searchTerm.toLowerCase();
      var promise = MenuSearchService.getMatchedMenuItems(searchTermLowerCase);
      promise.then(function(response){
        if(response.length == 0){
          menu.empty_list = true;
          console.log("Search item does not match");
        }else {
          menu.empty_list = false;
          menu.found = response;
       console.log(menu.found);
        }

   })
   .catch(function(error){
     console.log("Something went wrong.");
   })
    }
};
//This method will remove items from array
menu.onRemove = function(itemIndex) {
    console.log("this is ajit");
  console.log("this is ", this);
  menu.found.splice(itemIndex,1);

};
};
/*******************SERVICE*********************************/
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;
  //this method will reach to server and retrive data. it also filter items according to agrument
service.getMatchedMenuItems = function(searchTerm){
   return $http({
    method: "GET",
    url:(ApiBasePath + "/menu_items.json"),
  }).then(function(result){
    var found = [];
    var i=0;
      for(  i; i<result.data.menu_items.length; i++){
        if(result.data.menu_items[i].description.includes(searchTerm)){
          found.push(result.data.menu_items[i]);
         };
      };
      return found;
    // };

    //console.log(found);
    //
  });

};
};


})();
