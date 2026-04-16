'use strict';

var zttqWebSiteApp = angular.module('zttqWebSite', ['ngMaterial', 'ui.router', 'checklist-model', 'jkAngularRatingStars', 'ngSanitize']);


angular.module('zttqWebSite').filter('pgrTrustedHtml', function($sce){
    return function(html){
        return $sce.trustAsHtml(html)
    }
});

/**
 * Click outside !
 */
angular.module('zttqWebSite').directive('offClick', function($document, $parse, $timeout) {
	return {
	  restrict: 'A',
	  compile: function(tElement, tAttrs) {
		var fn = $parse(tAttrs.offClick);
		
		return function(scope, iElement, iAttrs) {
		  function eventHandler(ev) {
			if (iElement[0].contains(ev.target)) {
			  $document.one('click touchend', eventHandler);
			} else {
			  scope.$apply(function() {
				fn(scope);
			  });
			}
		  }
		  scope.$watch(iAttrs.offClickActivator, function(activate) {
			if (activate) {
			  $timeout(function() {
				// Need to defer adding the click handler, otherwise it would
				// catch the click event from ng-click and trigger handler expression immediately
					  $document.one('click touchend', eventHandler);
			  });
			} else {
			  $document.off('click touchend', eventHandler);
			}
		  });
		};
	  }
	};
  });

/**
 * 
 */
function loadingPageConfig($timeout){
	jQuery("#inprogress-image").show();
	jQuery('div[ui-view]').hide();
	$timeout(function() {
		jQuery('div[ui-view]').show();
		jQuery("#inprogress-image").hide();
	}, 500);
}