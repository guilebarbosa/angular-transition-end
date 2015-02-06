(function(){
  'use strict';
 
  var TransitionEnd = function() {
    var transitions = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd otransitionend',
        'transition'       : 'transitionend'
      },
      el = document.createElement('angular'),
      transition;

    for(var t in transitions){
      if(el.style[t] !== undefined){
        transition = transitions[t];
      }
    }
    
    return function transitionEnd(element, callback) {
      var $element = angular.element(element);

      if (!$element || !callback) {
        throw Error('You must pass in an element and a callback');
      }

      $element.on(transition, callback);

      return function doCancel() {
        $element.off(transition, callback);
      }
    }
  };

  angular.module('gbTransitionEnd', [])
    .factory('transitionEnd', TransitionEnd);

}());
