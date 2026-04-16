'use strict';

/**
 * Zttq Web Site Header
 */
zttqWebSiteApp.component('zttqHeader',{
    templateUrl : PGR_RESOURCE_RELATIVE_URL + '/html/zttq-header-tpl.html?v='+zttq_version,
    bindings : {
        transition : '<'
    },
    controller : function($state, zttqService){
        var ctrl = this;
        this.pgrHtmlTemplates = PGR_RESOURCE_RELATIVE_URL+'html/';
        
     
        

        /**
         * 
         */
        this.$onChanges = function(){
            console.log("HEADER : changes over loading ...")
        }

        /**
         * 
         */
        this.$doCheck = function(){
            
            
        }

        this.goTo = function(state){
            $state.go(state);
        }
    }
});