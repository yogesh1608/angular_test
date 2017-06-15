(function ()
{
  angular.module("MyApp", [])
  .controller("NonRestrictedController", NonRestrictedController)
  .controller("RestrictedController", RestrictedController)
  .factory("ItemFactory", ItemFactory);

  NonRestrictedController.$inject = ["$scope", "ItemFactory"];

  function NonRestrictedController($scope, ItemFactory)
  {
    $scope.itemName = "";
    $scope.itemQuantity = "";
    var nonRestrictedService = ItemFactory();
    $scope.addItems = function ()
    {
      console.log('Hello');
      nonRestrictedService.addItems(this.itemName, this.itemQuantity);
    }
    $scope.items = nonRestrictedService.getItems();
    console.log($scope.itemName);
    console.log($scope.itemQuantity);
  }

  RestrictedController.$inject = ["$scope", "ItemFactory"];
  function RestrictedController($scope, ItemFactory)
  {
    $scope.itemName = "";
    $scope.itemQuantity = "";
    var restrctedService = ItemFactory(3);
    $scope.addItems = function ()
    {
      try
      {
        restrctedService.addItems($scope.itemName, $scope.itemQuantity);
      }
      catch (e)
      {
        $scope.errorMessage = e.message;
      }
    }
    $scope.items = restrctedService.getItems();
  }

  function ItemService(maximumQuantity)
  {
    var items = [];
    this.addItems = function (itemName, itemQuantity)
    {
      if((maximumQuantity == undefined) || (maximumQuantity != undefined) && items.length < maximumQuantity)
      {
        var tempItem = {
          name: itemName,
          quantity: itemQuantity
        };
        items.push(tempItem);
        console.log('Here');
        console.log(items);
      }
      else
      {
        new error("Item quantity is more than " + maximumQuantity)
      }
    }

    this.getItems = function ()
    {
      return items;
    }

    this.removeItem = function (index)
    {
      items.splice(index, 1);
    }
  }

  function ItemFactory()
  {
    return function (maximumQuantity)
    {
      return new ItemService(maximumQuantity);
    }
  }
})();
