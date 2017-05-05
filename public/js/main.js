var mainApp = angular.module("mainApp", ['ngRoute','ui.bootstrap']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'home.html',
			controller: 'StudentController'
		})
		.when('/viewStudents', {
			templateUrl: 'viewStudents.html',
			controller: 'StudentController'
		})
		.when('/organic', {
			templateUrl: 'home.html',
			controller: 'StudentController'
		})
		.when('/product', {
			templateUrl: 'product.html',
			controller: 'StudentController'
		})
		.when('/products', {
			templateUrl: 'products.html',
			controller: 'StudentController'
		})
		.otherwise({
			redirectTo: '/organic'
		});
});

mainApp.service('productService',function(){

  var productURL = 'http://napuorapi.com/products/';

  var setProductURL = function(url) {
      productURL = url;
  };

  var getProductURL = function(){
      return productURL;
  };

  return {
    setProductURL: setProductURL,
    getProductURL: getProductURL
  };

});

mainApp.controller('StudentController', function($scope) {
	$scope.students = [
		{name: 'Mark Waugh', city:'New York'},
		{name: 'Steve Jonathan', city:'London'},
		{name: 'John Marcus', city:'Paris'}
	];

	$scope.message = "Click on the hyper link to view the students list.";
});


 mainApp.controller('productsController', function($scope,productService,$http) {

    var urlBase = 'http://napuorapi.com/';
    var urlProductsBase = 'http://napuorapi.com/products/';
    var urlProducts = '';

    $scope.myInterval = 3000;
   

    $http.get(urlProductsBase+'category/')
        .then(function(response) {
          $scope.categories = response.data;
        });
    
    $http.get(urlBase + 'business/banners/')
        .then(function(response) {
          $scope.banners = response.data;
        });
        

    $scope.productDetail = function getProduct(id) {
        $http.get(urlProductsBase+id+'/').then(function(response) {
        $scope.productdetail = response.data;
        //alert(readService.productdetail.sku)
          
        });
    }

   $scope.productListByCategory= function getProductsByCategory(cat) {
         if (cat == "All Products"){
            cat = "";
         }
         urlProducts =  urlProductsBase + '?category='+cat;
         productService.setProductURL(urlProducts);
    }

    $http.get(productService.getProductURL())
        .then(function(response) {
          $scope.products = response.data;
        });


    });



