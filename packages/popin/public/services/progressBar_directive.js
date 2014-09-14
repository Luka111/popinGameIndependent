'use strict';
angular.module('mean').directive('progressbarfromcurrent',function(){
  return{
    restrict: 'A',
    scope:{
      current: '='
    },
    link: function(scope,element){
      scope.$watch('current',function(){
        element.css('width',scope.current/60 *100 + '%');
      });
    }
  };
});
