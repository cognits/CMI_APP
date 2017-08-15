var config = {
    apiKey: "AIzaSyDTvoq6e7fckj5fjE2dE8OGCx4XuKOSHU8",
    authDomain: "cmi-db-33e5d.firebaseapp.com",
    databaseURL: "https://cmi-db-33e5d.firebaseio.com",
    projectId: "cmi-db-33e5d",
    storageBucket: "cmi-db-33e5d.appspot.com",
    messagingSenderId: "970565718586"
  };
var CMI = firebase.initializeApp(config);

// alert($(window).height())
app.controller("searchCtrl", function($scope, $firebaseArray, $ionicModal, $state){
	var ref = CMI.database().ref('Invitados');
  $scope.objeInvitados = $firebaseArray(ref);
	$scope.objeInvitados.$loaded(function() {
		console.info($scope.objeInvitados);
	})
  $scope.clickInput = function(){
    $scope.classInput = "inputSearchYourNameTop"
  }

  $scope.leaveInput = function(){
    console.log("baja");
    $scope.classInput = "inputSearchYourName"
  }

  $scope.selectItem = function(item) {
		console.log(item)
    $scope.modal_confirm.show();
	}

  $ionicModal.fromTemplateUrl('templates/modal_confirm/modal_confirm.html', function(modal) {
    $scope.modal_confirm = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: false
  });
})

app.controller("modalCtrl", function($scope, $ionicModal, $state){

  $scope.navigateFood = function() {
    $state.go("food")
  }
})

app.controller("foodCtrl", function($scope, $ionicModal){

  $scope.checkYes = function() {
    $scope.selectYes = "checked"
    $scope.selectNo = "unchecked"
  }

  $scope.checkNo = function() {
    $scope.selectYes = "unchecked"
    $scope.selectNo = "checked"
  }

  $ionicModal.fromTemplateUrl('templates/modal_print/modal_print.html', function(modal) {
    $scope.modal_print = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: false
  });
})
