
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
})
