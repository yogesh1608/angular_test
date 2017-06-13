(function ()
{
  angular.module("MyFirstController", [])
  .controller("AddItemController", AddItemController)
  .controller("ShowItemController", ShowItemController)
  .service("ItemService", ItemService);

  AddItemController.$inject = ["$scope", "ItemService"];

  function AddItemController($scope, ItemService)
  {
    this.itemName = "";
    this.quantity = "";
    this.addItem = function ()
    {
      ItemService.addItem(this.item, this.quantity);
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
      console.log("Hello Yogesh");
      console.log(items);
      return items;
    }

    this.removeItem = function (index)
    {
      items.splice(index, 1);
    }
  }

})();
