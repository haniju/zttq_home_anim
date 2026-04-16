'use strict';

/**
 *
 */
 zttqWebSiteApp.component('zttqHomeSectionA',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/home/zttq-home-section-a-tpl.html?v='+zttq_version,
    bindings : {
        transition : '<'
    },
    controller : function($controller, $state, zttqService){
        var ctrl = this;
        angular.element(window.document.body).ready(function () {
            // Your function that runs after all DOM is loaded
            animeInit1();
            chatAnimA();
            // chatAnimA2();
            // chatAnimB();
        });
    }
});

/**
 * 
 */
 zttqWebSiteApp.component('zttqHomeSectionA2',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/home/zttq-home-section-a2-tpl.html?v='+zttq_version,
    bindings : {
        transition : '<'
    },
    controller : function($controller, $state, zttqService){
        var ctrl = this; 
        angular.element(window.document.body).ready(function () {
            chatAnimA2();
        });    
    }
});


/**
 * 
 */
 zttqWebSiteApp.component('zttqHomeSectionB',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/home/zttq-home-section-b-tpl.html?v='+zttq_version,
    bindings : {
        transition : '<'
    },
    controller : function($controller, $state, zttqService){
        var ctrl = this;
        angular.element(window.document.body).ready(function () {
            chatAnimB();
        });
    }
});

/**
 * 
 */
 zttqWebSiteApp.component('zttqHomeSectionSplash',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/home/zttq-home-section-splash-tpl.html?v='+zttq_version,
    bindings : {
        transition : '<'
    },
    controller : function($controller, $state, zttqService){
        var ctrl = this;
    }
});