'use strict';

/**
 * 
 */
zttqWebSiteApp.component('zttqProposition',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/zttq-proposition-tpl.html?v='+zttq_version,
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
            console.log("PROPOSITION : changes over loading ...");
            loadingPageConfig($timeout);
        }

        /**
         * 
         */
        this.$doCheck = function(){
            
            
        }
    }
});