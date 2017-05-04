var app = angular.module('nap', ['ui.bootstrap','ngRoute']); 

app.config(function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl : 'home1.html'
    controller : "productsController"
  })
  .when('/product', {
    templateUrl : 'product.html'
    controller : 'productsController'
  })
  .otherwise({
            redirectTo: '/home'
        });
  
});


 app.controller('productsController', function($scope, $http) {

    var urlBase = 'http://napuorapi.com/';
    var urlProductsBase = 'http://napuorapi.com/products/';
    $scope.myInterval = 3000;
    $http.get(urlProductsBase)
        .then(function(response) {
          $scope.products = response.data;
          $scope.productsbycat = response.data;
        });

    $http.get(urlProductsBase+'category/')
        .then(function(response) {
          $scope.categories = response.data;
        });
    
    $http.get(urlBase + 'business/banners/')
        .then(function(response) {
          $scope.banners = response.data;
        });
        

    $scope.productDetail = function getProduct(id) {
        $http.get(urlProductsBase+id+'/')
        .then(function(response) {
          $scope.product = response.data;
          //alert($scope.productsbycat )
        });
    }

     $scope.productListByCategory= function getProductsByCategory(cat) {
         if (cat == "All Products"){
            cat = "";
         }
         $http.get(urlProductsBase+'?category='+cat)
            .then(function(response) {
              $scope.productsbycat = response.data;
              //alert($scope.productsbycat )
            });
    }

    
    

    }


    );

  

