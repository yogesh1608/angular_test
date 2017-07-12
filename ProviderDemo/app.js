(function ()
{
  angular.module("MyApp", [])
  .controller("RestrictedController", RestrictedController)
  .provider("ShoppingListService", ShoppingListServiceProvider)
  .directive("itemListDescription", ItemListDescription)
  .directive("listItemTag", ListItemTag)
  .config(Config);

  Config.$inject = ["ShoppingListServiceProvider"];

  function Config(ShoppingListServiceProvider)
  {
    //Change this for changing maxitems, Default is set to 10 on load time.
    ShoppingListServiceProvider.defaults.maxItems = 5;
  }

  function ListItemTag()
  {
    var ddo = {
      templateUrl: 'listItem.html'
    }
    return ddo;
  }

  function ItemListDescription()
  {
    var ddo = {
      template: '{{item.quantity}} of {{item.name}}'
    };
    return ddo;
  }

  RestrictedController.$inject = ["$scope", "ShoppingListService"];
  function RestrictedController($scope, ShoppingListService)
  {
    $scope.itemName = "";
    $scope.itemQuantity = "";
    $scope.addItems = function ()
    {
      try
      {
        ShoppingListService.addItems($scope.itemName, $scope.itemQuantity);
      }
      catch (error)
      {
        $scope.errorMessage = error.message;
      }
    }
    $scope.items = ShoppingListService.getItems();
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
        throw new Error("Item quantity is more than " + maximumQuantity);
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

  function ShoppingListServiceProvider()
  {
    this.defaults = {
      maxItems: 10
    };

    this.$get = function ()
    {
      return new ItemService(this.defaults.maxItems);
    };
  }
})();
