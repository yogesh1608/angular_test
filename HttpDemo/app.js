(function ()
{
  angular.module('MyApp', [])
  .controller('MenuServiceController', MenuServiceController)
  .service('MenuService', MenuService);

  MenuServiceController.$inject = ['$scope','MenuService'];

  function MenuServiceController($scope, MenuService)
  {
    var promise = MenuService.getMenu();
    $scope.categories;
    promise
    .then(function (response)
    {
      $scope.categories = response.data;
    })
    .catch(function (response)
    {
      console.log("Some Error Ocurred");
    })

    $scope.showCategoryItems = function (shortName)
    {
      var categoryPromise = MenuService.showItems(shortName);

      categoryPromise
      .then(function (response)
      {
        console.log(response.data);
      })
      .catch(function (response)
      {
        console.log("Some error occured");
      })
    }
  }

  MenuService.$inject = ['$http'];

  function MenuService($http)
  {
    this.getMenu = function ()
    {
      return $http(
        {
          method: "GET",
          url: ("http://davids-restaurant.herokuapp.com/categories.json")
        }
      );
    }

    this.showItems = function (shortName)
    {
      return $http(
        {
          method: "GET",
          url: ("http://davids-restaurant.herokuapp.com/categories.json"),
          params: {
            category: shortName
          }
        }
      );
    }
  }

})();
