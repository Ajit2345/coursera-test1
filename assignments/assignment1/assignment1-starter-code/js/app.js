(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController',con);
con.$inject = ['$scope'];
function con ($scope){
  $scope.test = function(){
    $scope.message = "";
var textValue = document.getElementById('lunch-menu').value;
if(textValue === ""){
  $scope.message = "Please enter data first";
  }
else if (true) {
  var comma = ","
  var array = textValue.split(comma);
  if(array.length <= 3){
  $scope.message = "Enjoy!" ;
      }
  else if (array.length >= 4) {
    $scope.message = "Too Much!";
      }

    }
  }
}


})();
