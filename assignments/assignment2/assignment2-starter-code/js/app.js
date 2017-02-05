(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
/*******************CONTROLLER1*********************************/
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;
  buyList.getItems1 = ShoppingListCheckOffService.getItems1();
  buyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
  buyList.addItem = function(itemName, itemQuantity){
    ShoppingListCheckOffService.addItem(itemName, itemQuantity);
  }
}
/*******************CONTROLLER2*********************************/
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.getItems2 = ShoppingListCheckOffService.getItems2();
}

/*******************SERVICE*********************************/
function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items
  var buyListItems = [
  { name: "cookies", quantity: 10 },
  { name: "soda", quantity: 5 },
  { name: "cake", quantity: 3 },
  { name: "cereal", quantity: 5},
  { name: "milk", quantity: 2 }
];
console.log("Buy list: "+ buyListItems);
var boughtListItems = [];

  service.getItems1 = function () {
    return buyListItems;
  };
  service.removeItem = function (itemIdex) {
    buyListItems.splice(itemIdex, 1);
    console.log("Buy list: "+ buyListItems);
  };
  service.addItem = function (itemName, itemQuantity) {
      var item = {name:itemName, quantity: itemQuantity};
      boughtListItems.push(item);
      console.log("Bought list: "+boughtListItems);
    };
  service.getItems2 = function () {
    return boughtListItems;
  };
  console.log("Buy list: "+ buyListItems);
  console.log("Bought list: "+ boughtListItems);
}

})();
