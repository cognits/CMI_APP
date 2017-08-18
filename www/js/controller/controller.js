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
app.controller("searchCtrl", function($scope, $firebaseArray, $ionicModal, $state , $rootScope){
	var ref = CMI.database().ref('Invitados');
  $rootScope.selectObj={};
  $scope.objeInvitados = $firebaseArray(ref);
	$scope.objeInvitados.$loaded(function() {
		console.info($scope.objeInvitados);
	})
  $scope.clickInput = function(){
    $scope.isEmpty = document.getElementById("inputSearch").value;
    if ($scope.isEmpty != "") {
      $scope.classInput = "inputSearchContainerTop"
    }
    else {
      $scope.classInput = "inputSearchContainer"
    }
  }

  $scope.leaveInput = function(){
    console.log("baja");
    $scope.classInput = "inputSearchYourName"
  }
  $ionicModal.fromTemplateUrl('templates/modal_confirm/modal_confirm.html', function(modal) {
    $scope.modal_confirm = modal;
  }, {
      scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: false
  });
  $scope.selectItem = function(item) {
		$rootScope.selectObj = item;
    console.info($rootScope.selectObj)
    $scope.modal_confirm.show();
	}
  $scope.confirmRegister = function () {
    angular.forEach($scope.objeInvitados, function(value, key){
      if (value.Nombre == $scope.selectObj.Nombre) {
        value.Registro = "Si";
        $scope.objeInvitados.$save(value);
      }
    });
    $scope.modal_confirm.hide()
  }
})


app.controller("foodCtrl", function($scope, $ionicModal, $state , $rootScope){
  $scope.global = $rootScope;
  console.info($scope.global)
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
    scope: $scope,
    animation: 'fade',
    focusFirstInput: false
  });



  $scope.showModalPrint = function(){
    $scope.thanks = true;
    $scope.isPrinting = true;
    $scope.isPrintingWithoutThanks = false;
    $scope.modal_print.show();
    setTimeout(function(){
      $scope.modal_print.hide();
      $state.go("home");
    }, 2000)
  }

})

app.controller("info_userCtrl", function($scope, $state, $ionicModal){
  $scope.tableChoose = true;
  $scope.info = false;
  $scope.editInfo = false;
  $scope.clickInfo = function(tableChoose, info, editInfo){
    $scope.tableChoose = tableChoose;
    $scope.info = info;
    $scope.editInfo = editInfo;
    window.scrollTo(0,0);
  }

  $scope.clickBack = function(){
    if ($scope.tableChoose == true) {
      $scope.info = false;
      $scope.editInfo = false;
      $state.go("insert_name")
    }

    if ($scope.info == true) {
      $scope.tableChoose = true;
      $scope.info = false;
      $scope.editInfo = false;
    }

    if ($scope.editInfo == true) {
      $scope.tableChoose = false;
      $scope.info = true;
      $scope.editInfo = false;
    }
  }

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
    scope: $scope,
    animation: 'fade',
    focusFirstInput: false
  });


  $scope.showModalPrint = function(){
    $scope.thanks = false;
    $scope.isPrinting = false;
    $scope.isPrintingWithoutThanks = true;
    $scope.modal_print.show();
    setTimeout(function(){
      $scope.modal_print.hide();
    }, 2000)
  }


})
