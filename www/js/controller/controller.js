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
app.controller("searchCtrl", function($scope ,$firebaseArray,$firebaseObject,$http, $ionicModal, $state , $rootScope, sendPrint){
  var ref = CMI.database().ref('Invitados');
  $rootScope.objeInvitados = $firebaseArray(ref);
  $scope.search = "";

  $scope.$root.objeInvitados.$loaded(function() {
    $scope.filterObj = function (model) {
        if(model != "" && model.length > 2){
          $scope.objFiltered = _.filter($scope.$root.objeInvitados, function(obj) {
           if (obj.Nombre.match(new RegExp('(' + model + ')', 'i'))) {
             return true;
           } else {
             return false;
           }
          });
        }
    }
  })
  //$scope.saveObj.$save(value);
  $scope.logoContent = true;

  $scope.clickInput = function(model){
    $scope.isEmpty = document.getElementById("inputSearch").value;
    if ($scope.isEmpty != "") {
      $scope.classInput = "inputSearchContainerTop"
      $("#logoContentId").addClass("toAnimateUp");
      $("#logoContentId").removeClass("toAnimateDown");
      // $scope.logoContent = false;
    }
    else {
      $scope.classInput = "inputSearchContainer"
      $("#logoContentId").removeClass("toAnimateUp");
      $("#logoContentId").addClass("toAnimateDown");
      // $scope.logoContent = true;
    }
      $scope.filterObj(model);
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
    $scope.modal_confirm.show();
	}

  $scope.confirmRegister = function () {
    angular.forEach($scope.objeInvitados, function(value){
      if (value.Nombre == $rootScope.$root.selectObj.Nombre) {
        value.Registro = "Si";
        $scope.objeInvitados.$save(value);
      }
    });
    $(".inputSearchYourName").val("");
    $scope.modal_confirm.hide();
  }

  $scope.printNameTag = function() {
    alert("printNameTag");
    $scope.sendPrint = sendPrint.getInfo($rootScope.$root.selectObj);
  };

})


app.controller("foodCtrl", function($scope, $firebaseArray, $ionicModal, $state , $rootScope, sendPrint){
  $scope.checkYes = function() {
    $scope.selectYes = "checked"
    $scope.selectNo = "unchecked"
    $rootScope.$root.selectObj.Almuerzo = "Si"
  }

  $scope.checkNo = function() {
    $scope.selectYes = "unchecked"
    $scope.selectNo = "checked"
    $rootScope.$root.selectObj.Almuerzo = "No"
  }

  $scope.saveLunch = function () {
  	$scope.$root.objeInvitados.$loaded(function() {
      angular.forEach($scope.$root.objeInvitados, function(value, key){
        if (value.Nombre == $rootScope.$root.selectObj.Nombre) {
          value.Almuerzo = $rootScope.$root.selectObj.Almuerzo;
          $scope.objeInvitados.$save(value);
        }
      });
  	})
    $scope.showModalPrint();
  }

  $ionicModal.fromTemplateUrl('templates/modal_print/modal_print.html', function(modal) {
    $scope.modal_print = modal;
    }, {
    scope: $scope,
    animation: 'fade',
    focusFirstInput: false
  })

  $scope.showModalPrint = function(){

      sendPrint.getInfo($rootScope.$root.selectObj).then(function () {
        $scope.thanks = true;
        $scope.isPrinting = true;
        $scope.isPrintingWithoutThanks = false;
        $scope.modal_print.show();
        setTimeout(function(){
          $scope.modal_print.hide();
          $state.go("home");
        }, 2000)
      })



  }

  $scope.printNameTag = function() {
    alert("printNameTag");
    $scope.sendPrint = sendPrint.getInfo("DataUsuario");
  };
})

app.controller("info_userCtrl", function($scope, $firebaseObject, $firebaseArray, $state, $ionicModal,$rootScope){
  $scope.nameUser = "";
  $scope.tableChoose = true;
  $scope.info = false;
  $scope.editInfo = false;
  $scope.infoUser = {};
  $scope.selectedInfo = {};
  $scope.selectInfo2 = {};
  if($scope.$root.objeInvitados === undefined){
    var ref = CMI.database().ref('Invitados');
    $rootScope.objeInvitados = $firebaseArray(ref);
    $scope.$root.objeInvitados.$loaded(function() {
      $scope.saveInfo = function(tableChoose, info, editInfo){
        $scope.tableChoose = tableChoose;
        $scope.info = info;
        $scope.editInfo = editInfo;
        window.scrollTo(0,0);
        $rootScope.objeInvitados.$save($scope.selectedInfo)
      }
    })
  }else {
    $scope.$root.objeInvitados.$loaded(function() {
      angular.copy($scope.selectedInfo ,$scope.selectInfo2  )
      $scope.saveInfo = function(tableChoose, info, editInfo){
        $scope.tableChoose = tableChoose;
        $scope.info = info;
        $scope.editInfo = editInfo;
        window.scrollTo(0,0);
        $rootScope.objeInvitados.$save($scope.selectedInfo)
        //d$scope.selectedInfo = clickedInfo;
      }
    })
  }
  $scope.filterObj = function (model) {
    if(model != "" && model.length > 2){
      $scope.$root.nameUser = model
    }
    if(model.length == 0){
        $scope.$root.nameUser = "";
    }

  }

  $scope.clickInfo = function(tableChoose, info, editInfo , clickedInfo){
    $scope.tableChoose = tableChoose;
    $scope.info = info;
    $scope.editInfo = editInfo;
    window.scrollTo(0,0);
    $scope.selectedInfo = clickedInfo;
    angular.copy($scope.selectedInfo ,$scope.selectInfo2  )
  }
  $scope.clickEditInfo = function(tableChoose, info, editInfo){
    $scope.tableChoose = tableChoose;
    $scope.info = info;
    $scope.editInfo = editInfo;
    window.scrollTo(0,0);
    $scope.Nombre = $scope.selectedInfo.Nombre;
    $scope.NombreUnidad = $scope.selectedInfo.NombreUnidad;
    $scope.Email = $scope.selectedInfo.Email;
    _.forEach($scope.objeInvitados , function (value) {
      if (value.Nombre ===   $scope.Nombre) {
        $scope.selectedInfo.Almuerzo = value.Almuerzo
      }
    })
    //d$scope.selectedInfo = clickedInfo;
  }

  $scope.cancelInfo = function(tableChoose, info, editInfo){
    $scope.tableChoose = tableChoose;
    $scope.info = info;
    $scope.editInfo = editInfo;
    window.scrollTo(0,0);
      $scope.selectedInfo.Nombre = $scope.selectInfo2.Nombre
      $scope.selectedInfo.NombreUnidad = $scope.selectInfo2.NombreUnidad
      $scope.selectedInfo.Email = $scope.selectInfo2.Email
      if ($scope.selectedInfo.Almuerzo === "Si") {
        $scope.checkNo()
      }else if ($scope.selectedInfo.Almuerzo === "No") {
        $scope.checkYes();
      }
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
    $scope.selectedInfo.Almuerzo = "Si";
  }

  $scope.checkNo = function() {
    $scope.selectYes = "unchecked"
    $scope.selectNo = "checked"
    $scope.selectedInfo.Almuerzo = "No"
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
app.controller("insert_nameCtrl", function($scope,  $firebaseArray, $state, $ionicModal, $rootScope){

  $scope.sendName = function (name) {
    $rootScope.nameUser = name;
  }

})
