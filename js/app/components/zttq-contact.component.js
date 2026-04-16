'use strict';

/**
 * 
 */
zttqWebSiteApp.component('zttqContact',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/zttq-contact-tpl.html?v='+zttq_version,
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
            console.log("CONTACT : changes over loading ...");
            loadingPageConfig($timeout);
        }

        /**
         * 
         */
        this.$doCheck = function(){
            
            
        }
    }
});