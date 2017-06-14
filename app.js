(function ()
{
  angular.module("MyFirstController", [])
  .controller("AddItemController", AddItemController)
  .controller("ShowItemController", ShowItemController)
  .factory("ItemFactory", ItemFactory)
  .service("ItemService", ItemService);

  AddItemController.$inject = ["$scope", "ItemService", "ItemFactory"];

  function AddItemController($scope, ItemService, ItemFactory)
  {
    var tempService = ItemFactory();
    this.items = tempService.showItem();
    console.log(this.items);
    this.itemName = "";
    this.quantity = "";
    this.addItem = function ()
    {
      tempService.addItem(this.item, this.quantity);
    }
  }

  ShowItemController.$inject = ["ItemService"];
  function ShowItemController(ItemService)
  {
    this.showItem = function ()
    {
      return ItemService.showItem();
    }
    this.removeItem = function (index)
    {
      ItemService.removeItem(index);
    }
  }

  function ItemService()
  {
    var items = [];
    this.addItem = function (itemName, quantity)
    {
      var tempItem = {
        name: itemName,
        quantity: quantity
      };
      console.log("Here");
      items.push(tempItem);
    }

    this.showItem = function ()
    {
      console.log('Hello');
      return items;
    }

    this.removeItem = function (index)
    {
      items.splice(index, 1);
    }
  }

  function ItemFactory()
  {
    var tempService;
    tempService = function ()
    {
      return new ItemService();
    }
    return tempService;
  }

})();
