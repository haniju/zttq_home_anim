'use strict';

/**
 * Zttq Web Site Home page
 */
zttqWebSiteApp.component('zttqHome',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/zttq-home-tpl.html?v='+zttq_version,
    bindings : {
        transition : '<'
    },
    controller : function($state, zttqService, $timeout){
        var ctrl = this;
        this.pgrHtmlTemplates = PGR_RESOURCE_RELATIVE_URL+'html/';
        
        /**
         * 
         */
        this.$onChanges = function(){
            console.log("HOME : changes over loading ...");
            loadingPageConfig($timeout);

        }

        /**
         * 
         */
        this.$doCheck = function(){
            
            
        }
    }
});