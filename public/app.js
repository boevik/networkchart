var app = angular.module('MyAngularApp',['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
	/* Configuration is where you configure providers ( not instances)*/
	console.log("MyAngularApp Configuration hook");
	$routeProvider.
		when('/', {templateUrl: '/visjs', controller: 'MainController'}).
		//when('/calltypes/detail/:id', {templateUrl: 'calltypes/detail', controller: 'CalltypeDetailCtrl'}).
		//when('/calltypes/edit/:id', {templateUrl: 'calltypes/edit', controller: 'CalltypeEditCtrl'}).
		when('/addNode', {templateUrl: '/addNode', controller: 'AddNodeCtrl'}).
		otherwise({redirectTo: '/'});
	console.log("After routeProvider");
})