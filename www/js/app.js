// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic' , 'firebase', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide StatusBar Android Platform
		if (ionic.Platform.isAndroid()) {
			window.addEventListener("native.hidekeyboard", function () {
				//show stuff on keyboard hide
				StatusBar.hide();
				window.AndroidFullScreen.immersiveMode(false, false);
			});
		}

		ionic.Platform.fullScreen();
		if (window.StatusBar) {
			return StatusBar.hide();
		}
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.transition('none');

  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home/home.html'
  })

  .state('search', {
    url: '/search',
    templateUrl: 'templates/search/search.html',
    controller: "searchCtrl"
  })

  .state('food', {
    url: '/food',
    templateUrl: 'templates/food/food.html',
    controller: "foodCtrl"
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login/login.html',
  })

  .state('insert_name', {
    url: '/insert_name',
    templateUrl: 'templates/insert_name/insert_name.html',
    controller: "insert_nameCtrl"
  })

  .state('info_user', {
    url: '/info_user',
    templateUrl: 'templates/info_user/info_user.html',
    controller: "info_userCtrl"
  })





  $urlRouterProvider.otherwise('/home');
})
