(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController',lunchChecker);
lunchChecker.$inject = ['$scope'];
function lunchChecker ($scope){
  $scope.lunchItems = "";
  $scope.message = "";
  $scope.test = function(){
  var comma = ",";
  var itemArray =$scope.lunchItems.split(comma);
  console.log(itemArray);
  if($scope.lunchItems === ""){
  $scope.message = "Please enter data first";
  }else if (itemArray.length <= 3){
  $scope.message = "Enjoy!" ;
  }
  else { $scope.message = "Too Much!";
      }
  }
}
})();
