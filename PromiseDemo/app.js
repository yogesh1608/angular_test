(function ()
{
  angular.module('MyApp', [])
  .controller('ShoppingListController', ShoppingListController)
  .service('ShoppingListService', ShoppingListService)
  .service('WeightFilterService', WeightFilterService);

  ShoppingListController.$inject = ['$scope', 'ShoppingListService'];

  function ShoppingListController($scope, ShoppingListService)
  {
    $scope.itemName = "";
    $scope.itemQuantity = "";

    $scope.addItem = function ()
    {
      ShoppingListService.addItem($scope.itemName, $scope.itemQuantity);
    };
    $scope.items = ShoppingListService.getItems();
  }

  ShoppingListService.inject = ['$q', 'WeightFilterService'];
  function ShoppingListService(WeightFilterService, $q)
  {
    var service = this;
    var items = [];
    service.addItem = function (itemName, itemQuantity)
    {
      console.log($q);
      var namePromise = WeightFilterService.checkName(itemName);
      var quantityPromise = WeightFilterService.checkQuantity(itemQuantity);
      console.log($q.all([namePromise, quantityPromise]));
      $q.all([namePromise, quantityPromise])
      .then(function (response)
      {
        var item = {
          name: itemName,
          quantity: itemQuantity
        }
        items.push(item);
      })
      .catch(function (errorMessage)
      {
        console.log(errorMessage.message);
      });


    }

    service.getItems = function ()
    {
      return items;
    }
  }

  WeightFilterService.$inject = ['$q', '$timeout']
  function WeightFilterService($q, $timeout)
  {
    var service = this;

    service.checkName = function (itemName)
    {
      var defered = $q.defer();
      var result = {
        message: ""
      }

      $timeout(function () {
        if(itemName.toLowerCase().indexOf('cookie') == -1)
        {
          defered.resolve(result);
        }
        else
        {
          result.message = "You cannot have cookies Yogesh..!";
          defered.reject(result);
        }
      }, 1000);
      return defered.promise;
    }

    service.checkQuantity = function (itemQuantity)
    {
      var defered = $q.defer();

      var result = {
        message: ""
      }

      $timeout(function ()
      {
        if(itemQuantity < 5)
        {
          defered.resolve(result);
        }
        else
        {
          result.message = "Dont have more Yogesh..!";
          defered.reject(result);
        }
      }, 3000);
      return defered.promise;
    }
  }
})();
