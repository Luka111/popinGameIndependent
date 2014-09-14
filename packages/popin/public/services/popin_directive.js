'use strict';
angular.module('mean').directive('popin',function($timeout){
  return {
    restrict:'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'popin/views/popin.html',
    /*link: function(scope,elements,attrs){
      scope.id = parseInt(attrs.id) - 1;
      (function tick(){
        var ngModel = scope.ngModel;
        ngModel.updatePopinCollection(scope.id);
        $timeout(tick,ngModel.collector[scope.id].tickTimeout);
      })();
    }*/
    link: function(scope,elements,attrs){
      scope.id = parseInt(attrs.id) - 1;
      var doTimeout = (function(){
        var _scope = scope;
        var ngModel = scope.ngModel;
        var worker = function(){
          var timeLeft = ngModel.collector[scope.id].tickTimeout;
          if (ngModel.popinWorking === false){
            return;
          }
          if (timeLeft > 0){
            ngModel.collector[scope.id].tickTimeout -= 100;
            $timeout(worker,100);
          }else{
            ngModel.updatePopinCollection(_scope.id);
            doTimeout();
          }
        };
        return worker;
      })();
      doTimeout();
    }
  };
});
