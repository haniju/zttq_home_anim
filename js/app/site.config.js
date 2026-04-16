'use strict';


/**
 * force sending cookies 
 * This is simply a partner header to the withCredentials parameter passed in the AJAX request.  
 * It’s saying that credentials are allowed to be passed through this request and response.
 */
angular.module('zttqWebSite').config(function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
});

/**
 * 
 */
angular.module('zttqWebSite').config(function($stateProvider, $urlRouterProvider) {
  //parent state (avec parent view) -> objectif est de partager les élements de controller parent
  $stateProvider
  //HOME PAGE
  .state('home',{
    url:'/home',
    views : {
      '':{
        component : 'zttqHome'
      },
      
    },
    //load data and bind them to component
    resolve :{
      
    }
  })
  
  .state('contact',{
    url:'/contact',
    views : {
      '':{
        component : 'zttqContact'
      },
    },
    //load data and bind them to component
    resolve :{
    }
  })
  
  .state('proposition',{
    url:'/proposition',
    views : {
      '':{
        component : 'zttqProposition'
      },
    },
    //load data and bind them to component
    resolve :{
    }
  })

  .state('vision',{
    url:'/vision',
    views : {
      '':{
        component : 'zttqVision'
      },
    },
    //load data and bind them to component
    resolve :{
    }
  })

  .state('mentions',{
    url:'/mentions-legales',
    views : {
      '':{
        component : 'zttqMentionsLegales'
      },
    },
    //load data and bind them to component
    resolve :{
    }
  })

  .state('faq',{
    url:'/faq',
    views : {
      '':{
        component : 'zttqFaq'
      },
    },
    //load data and bind them to component
    resolve :{
    }
  })

  ;

});


angular.module('zttqWebSite').run(['$transitions', '$state', '$http', '$timeout', 'zttqService', '$mdDialog',
  function($transitions, $state, $http, $timeout, zttqService, $mdDialog){ 
    //jQuery('div[ui-view]').hide();
    $state.go('home'); //make a transition to exercices state when app starts
    
  }
]);