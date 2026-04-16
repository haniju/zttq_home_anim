'use strict';

/**
 * 
 */
zttqWebSiteApp.component('zttqVision',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/zttq-vision-tpl.html?v='+zttq_version,
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
            console.log("VISION : changes over loading ...");
            loadingPageConfig($timeout);
        }

        /**
         * 
         */
        this.$doCheck = function(){
            
            
        }
    }
});