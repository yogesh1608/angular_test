(function ()
{
  angular.module("MyApp", [])
  .controller("RestrictedController", RestrictedController)
  .controller("NonRestrictedController", NonRestrictedController)
  .factory("ShoppingListFactory", ShoppingListFactory)
  .directive("listItemTag", ListItemTag);


  function ListItemTag()
  {
    var ddo = {
      templateUrl: "listItem.html",
      scope: {
        items: "=myAttribute",
        shoppingTitle: '@title',
        removeItem: "=",
        onRemove: "&"
      },
      controller: ShoppingListDirectiveController,
      bindToController: true,
      controllerAs: 'list'
    }
    return ddo;
  }

  function ShoppingListDirectiveController()
  {
    this.containsCookies = function ()
    {
      for (var i = 0; i < this.items.length; i++)
      {
        var name = this.items[i].name;
        if(name.toLowerCase().indexOf("cookie") !== -1)
          return true;
      }
      return false;
    }
  }

  RestrictedController.$inject = ["$scope", "ShoppingListFactory"];
  function RestrictedController($scope, ShoppingListFactory)
  {
    $scope.itemName = "";
    $scope.itemQuantity = "";
    var restrictedService = ShoppingListFactory(4);
    $scope.items = restrictedService.getItems();
    $scope.addItems = function ()
    {
      try
      {
        restrictedService.addItems($scope.itemName, $scope.itemQuantity);
        $scope.shoppingTitle = "This Shopping bag contains " + $scope.items.length + " items";
      }
      catch (error)
      {
        $scope.errorMessage = error.message;
      }
    }
    $scope.removeItem = function (index)
    {
      console.log("this is ", this);
      console.log("Here...", $scope.items[index]);
      $scope.lastRemovedItem = "Last removed item is"
      restrictedService.removeItem(index);
    }
  }

  NonRestrictedController.$inject = ["$scope", "ShoppingListFactory"];

  function NonRestrictedController($scope, ShoppingListFactory)
  {
    $scope.itemName = "";
    $scope.itemQuantity = "";
    var nonRestrictedService = ShoppingListFactory();
    $scope.items = nonRestrictedService.getItems();
    $scope.addItems = function ()
    {
      try
      {
        nonRestrictedService.addItems($scope.itemName, $scope.itemQuantity);
        $scope.shoppingTitle = "This Shopping bag contains " + $scope.items.length + " items";
      }
      catch (error)
      {
        $scope.errorMessage = error.message;
      }
    }
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
        console.log(items);
      }
      else
      {
        throw new Error("Item quantity is more than " + maximumQuantity);
      }
    }

    this.getItems = function ()
    {
      return items;
    }

    this.removeItem = function (index)
    {
      console.log('Here..', this);
      items.splice(index, 1);
    }
  }

  function ShoppingListFactory()
  {
    return function (restrictedQuantity)
    {
      return new ItemService(restrictedQuantity);
    }
  }
})();
