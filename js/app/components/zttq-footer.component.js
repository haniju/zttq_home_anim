'use strict';

/**
 * Zttq Web Site Footer
 */
zttqWebSiteApp.component('zttqFooter',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/zttq-footer-tpl.html?v='+zttq_version,
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
            console.log("FOOTER : changes over loading ...");
            //$timeout(function() {jQuery('div[ui-view]').show();}, 100);
        }

        /**
         * 
         */
        this.$doCheck = function(){
            
            
        }
    }
});