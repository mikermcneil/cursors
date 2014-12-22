angular.module('PBJ').controller('LoginCtrl', [
  '$scope',
  '$timeout',
  function ($scope, $timeout){


  $scope.intent = angular.extend($scope.intent||{}, {

    login: function (){
      $scope.loading = true;
      $timeout(function (){
        $scope.loading = false;
      }, 1000);
    }
  });

}]);
