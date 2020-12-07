var app = angular.module('SowingoApp', []);

app.controller('MainCtrl',function($scope, $http) {
  $http({
    method:'GET',
    url:'https://demo5514996.mockable.io/products'})
    .success(function (response) {
        $scope.ocw = response.hits;
        $scope.ocwMain = response.hits;
        $scope.image = ["../front-end-challenge/img/ic_favorite_border.png",
                        "../front-end-challenge/img/ic_favorite.png"]
        $scope.imageSrc = $scope.image[0]
        var index = 1;
        //var val=0;
        $scope.fav=[];
       
        function getMatchedFavItem(item) { // for verifying the fav item match if it match then answer is true
            return $scope.fav.find(function(itm) {
                return itm.objectID === item.objectID;
                
              });
          }

        $scope.flagcartitem = 0;       //flag for checking the click on cart label on top
        $scope.cartReport = function(){
            if($scope.flagcartitem == 0){
             $scope.ocw = [];
             $scope.ocw = $scope.cart;
             $scope.flagcartitem = 1;   
            }
            else{
             $scope.flagcartitem= 0;   
             $scope.ocw= [];
             $scope.ocw = $scope.ocwMain;
            }
           }

        $scope.flag  = 0;           //flag for checking click on favorite label on top
        $scope.favoriteReport = function(){
           if($scope.flag == 0){
            $scope.ocw = [];
            $scope.ocw = $scope.fav;
            $scope.flag = 1;
           }
           else{
            $scope.flag= 0;
            $scope.ocw= [];
            $scope.ocw = $scope.ocwMain;
           }
        }

        $scope.addtoFav = function(item){    //add prodcut to the fav 
            var match = getMatchedFavItem(item);
            if(match){                          //if it is match that means if it was selected (mark as fav) then make it unfavorite
                match.count+=1;
                $scope.fav.splice($scope.fav.indexOf(item), 1);   //remove item from fav array
                this.imageSrc = $scope.image[0]
                return;
            }
            else{                               //if it was not mark as favorite then mark as fav
                this.imageSrc = $scope.image[1]
                item.count=1;
                $scope.fav.push(item);   //add item to fav array
                $scope.ocwMain.find(x => x.objectID == item.objectID).imageSrc =  this.imageSrc 


            }
        }
        $scope.cart = [];
        $scope.carttotal=[];
        $scope.count=0
        $scope.deleteItem = function(item) {  //remove item from cart
            var match = getMatchedCartItem(item);
            if (match.count > 1) {              //remove item from cart but if there are more than one selected item in cart then item should be only removed from total cart item
              $scope.carttotal.splice($scope.carttotal.indexOf(item), 1);
              match.count -= 1;
              $scope.cnt =  $scope.carttotal.length;
            }
            else if(match.count==1){            // count is 1 then only one item of that id in cart so I need to remove it from cart items as well as total cart items
                var index = $scope.cart.indexOf(item)
                if (index > -1) {
                    $scope.cart.splice(index, 1);
                    match.count = 0        
                  }
                  index=$scope.carttotal.indexOf(item)
                  if (index > -1) {
                    $scope.carttotal.splice(index, 1);
                    $scope.cnt -= 1
                    
                  }
            $scope.cnt =  $scope.carttotal.length;    
            return;
            }
            else{                           // if item is not in cart then we can not remove it
                console.log('can not delete')
            }
            $scope.cnt =  $scope.carttotal.length; //count the total item in cart
        }
        
        $scope.addItem = function(item) { //adding the item in cart
            $scope.carttotal.push(item);
            $scope.cnt =  $scope.carttotal.length;
          
            var match = getMatchedCartItem(item);
            if (match) {                    // if item is already in cart then we need to increase its count
              match.count += 1;
              return;
            }
            else{
            item.count = 1;                 // if item is not in cart then we need to add it
            $scope.cart.push(item);
            }
        }
        
        function getMatchedCartItem(item) {  //matching the item in cart so checking if it is in cart or not
            return $scope.cart.find(function(itm) {
              return itm.objectID === item.objectID;
              
            });
          }
        });
});