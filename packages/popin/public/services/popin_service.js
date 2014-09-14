'use strict';
angular.module('mean').service('popinService',function(){

  this.popinWorking = true;
  this.initMinTime = 1500; //static, doesnt change
  this.minTime = 1500;
  this.initMaxTime = 2500; //static, doesnt change
  this.maxTime = 2500;

  this.updatePopinCollection = function(id){
    this.collector[id].tickTimeout = this.minTime + parseInt(Math.random()*(this.maxTime - this.minTime));
    this.collector[id].magicNumber = parseInt(Math.random()*10);
    this.collector[id].allowToPlay = true;
    this.collector[id].choseClass = 'grid-elem-'+0;
  };

  this.resetTime = function(){
    this.minTime = this.initMinTime;
    this.maxTime = this.initMaxTime;
  };

  this.changeTime = function(m){
    this.minTime *= m;
    this.maxTime *= m;
  };
 
  this.disableCollectMe = function (id){
    this.collector[id].allowToPlay = false;
  };
  
  this.getAllowToPlay = function(id){
    return this.collector[id].allowToPlay;
  };
  
  this.checkValidation = function(id,numberChoice){
    if (this.collector[id].magicNumber % 2 === numberChoice % 2){
      this.collector[id].choseClass = 'grid-elem-'+1;
      return 10;
    }else{
      this.collector[id].choseClass = 'grid-elem-'+2;
      return -10;
    }
  };

  this.disablePopinWorking = function(){
    this.popinWorking = false;
  };

  this.initCollector = function(){
    this.popinWorking = true;
    this.collector = [];
    for(var i=0; i<9; i++){
      this.collector[i] = {};
      this.updatePopinCollection(i);
    }
  };

});
