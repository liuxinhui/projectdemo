var app = angular.module('myModule', ["ng", "ngRoute","ngSanitize"]);
var baseUrl="http://tcamp.datangnet.com.cn/camp_service/";
app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "src/html/home.html",
			controller: "home"
		})
		.when("/aa", {
			templateUrl: "src/html/aa.html"
		})
		.when("/bb", {
			templateUrl: "src/html/bb.html"
		})
		.otherwise({
			redirectTo: "/"
		})
})


//父级控制器
app.controller("parentCtrl", function($scope,$rootScope, $location,$http) {
	$scope.jump = function(url) {
		$location.path(url)
	}
	$scope.menu = function() {
		$(".menu").slideToggle();
	}; 
})

app.controller("home", function($scope, $location) {
	var bool = true;
})
