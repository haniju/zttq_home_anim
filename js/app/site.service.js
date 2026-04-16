'use strict';

angular.module('zttqWebSite').config(['zttqServiceProvider', 
  function(zttqServiceProvider){
    zttqServiceProvider.config(ZTTQ_REST_API);
  }
]);

angular.module('zttqWebSite').provider('zttqService',function(){
  var baseUrl = '';
  this.config=function(url){
    baseUrl = url;
  }

  this.$get = ['$http','$log', '$state', '$transitions', function($http, $log, $state){
    var oDataService = {};

    
    // 
    oDataService.login = function(credentials){
    //   var url = baseUrl + "login";
    //   return $http.post(url, credentials);
    }
    
    
    return oDataService;
  }];
});
