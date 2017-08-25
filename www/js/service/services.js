
app.factory('Invitados', function($http,$rootScope){
  return {
    getInfo : function (modelo) {
      $rootScope.result = []
      var res = $http.post('http://cmi-env.us-east-1.elasticbeanstalk.com/get-invitados', {model : modelo});
      res.success(function(data, status, headers, config) {
        angular.copy(data , $rootScope.result)
        console.info(data)
  		});
  		res.error(function(data, status, headers, config) {
  			alert( "failure message: " + JSON.stringify({data: data}));
  		});
      return $rootScope.result
    }
  }


});

app.factory('sendPrint', function($cordovaPrinter , $ionicModal){
  return {
    getInfo : function (UserData) {
      alert("sendPrint service");
      alert("User Data: " + UserData);
      if (UserData.Nombre.length > 10 ) {
        var printText = '<html style="width:277px; height:390px">'+
                          '<p style="font-size:45px; margin-top:170px !important; padding:0; text-align:center; color:black;" style="line-height: 10px;">'+
                              '<b>'+UserData.Nombre+ '</b>' +
                              '<br>' +
                              '<b style="font-size:25px; color:#9B9B9B;">' +UserData.NombreUnidad+ '</b>' +
                              '<br>' +
                              '<img src="http://www.appcoda.com/wp-content/uploads/2013/12/qrcode.jpg" alt="QR CMI PAGE" height="70" width="70">'+
                          '</p>' +
                        '</html>'
      }else {
        var printText = '<html style="width:277px; height:390px">'+
                          '<p style="font-size:45px; margin-top:200px !important; padding:0; text-align:center; color:black;" style="line-height: 10px;">'+
                              //'<br>' +
                              '<b>'+UserData.Nombre+ '</b>' +
                              '<br>' +
                              '<b style="font-size:25px; color:#9B9B9B;">' +UserData.NombreUnidad+ '</b>' +
                              '<br>' +
                              '<img src="http://www.appcoda.com/wp-content/uploads/2013/12/qrcode.jpg" alt="QR CMI PAGE" height="70" width="70">'+
                          '</p>' +
                        '</html>'
      }


      if($cordovaPrinter.isAvailable()) {
         $cordovaPrinter.print(printText,{duplex: 'none', landscape: false, graystyle: false, border:false})

      } else {
         alert("Printing is not available on device");
      }

      return true;
  }
}


});
