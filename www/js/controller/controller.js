var config = {
    apiKey: "AIzaSyDTvoq6e7fckj5fjE2dE8OGCx4XuKOSHU8",
    authDomain: "cmi-db-33e5d.firebaseapp.com",
    databaseURL: "https://cmi-db-33e5d.firebaseio.com",
    projectId: "cmi-db-33e5d",
    storageBucket: "cmi-db-33e5d.appspot.com",
    messagingSenderId: "970565718586"
  };
var CMI = firebase.initializeApp(config);
app.controller("searchCtrl", function($scope, $firebaseArray){
	var ref = CMI.database().ref('Invitados');
  $scope.objeInvitados = $firebaseArray(ref);
	$scope.objeInvitados.$loaded(function() {
		console.info($scope.objeInvitados);
	})
  $scope.clickInput = function(){
    $scope.classInput = "inputSearchYourNameTop"
  }

  $scope.selectItem = function(item) {
		console.log(item)

	}


})
