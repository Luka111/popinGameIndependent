'use strict';

angular.module('mean').controller('PopinController', ['$timeout','popinService','KeyboardService', 'Global',
  function($timeout, popinService, KeyboardService, Global) {
    this.global = Global;
    //this.popin = {name:'popin'};
    this.popin = popinService;
    this.gameInit1 = false;
    this.prepareForGame = false;
    this.gameStarts = false;
    this.gameEnds = false;
    this.numberChoice = -1;
    this.multi = 1;
    this.onFireTimer = undefined;

    //Timeout functions
    //...

    this.comboTicking = function(combo){
      var t = this;
      var myCombo = combo;
      var worker = function(){
        if(myCombo !== t.combo){
          return;
        }
        if(t.comboTimeLeft > 0){
          t.comboTimeLeft -= 1 ;
          $timeout(worker,1000);
        }else{
          t.combo = 0;
          t.comboTimeLeft = 0;
          if (t.onFireTimer === undefined){
            t.popin.resetTime();
          }
          return;
        }
      };
      return worker;
    };

    this.prepareGameTicking = function(){
      var t = this;
      var worker = function(){
        if(t.prepareTimeLeft > 0){
          t.prepareTimeLeft -= 1;
          $timeout(worker,1000);
        }else{
          t.prepareForGame = false;
          t.newGame();
          return;
        }
      };
      return worker;
    };

    this.gameTicking = function(){
      var t = this;
      var worker = function(){
        if(t.gameTimeLeft > 0){
          t.gameTimeLeft -= 1;
          $timeout(worker,1000);
        }else{
          t.gameStarts = false;
          t.gameEnds = true;
          t.popin.disablePopinWorking();
          return;
        }
      };
      return worker;
    };

    this.onFireTicking = function(){
      var t = this;
      var worker = function(){
        if(t.onFireTimer > 0){
          t.onFireTimer -= 1;
          $timeout(worker,1000);
        }else{
          t.popin.resetTime();
          t.multi = 1;
          t.onFireTimer = undefined;
          t.combo=0;
          return;
        }
      };
      return worker;
    };

    //...

    this.calculateBonusPoints = function(){
      switch(this.combo){
      case 10:
        this.popin.changeTime(0.9);
        break;
      case 15:
        this.popin.changeTime(0.95);
        break;
      case 5:
        //increase time + double poins = ON FIRE
        this.popin.changeTime(0.777);
        this.multi = 3;
        this.onFireTimer = 7;
        var doTimeout = this.onFireTicking();
        doTimeout();
        break;
      }
    };

    this.collectMe = function(idString){
      if (this.gameStarts === false){
         return;
      }
      var idInt = parseInt(idString) - 1;
      if ((this.numberChoice === -1) || (this.popin.getAllowToPlay(idInt) === false)){
        return;
      }
      var result = this.popin.checkValidation(idInt,this.numberChoice);
      this.score += result*this.multi; //this.multi initially 1, if the player get on fire, multi increases
      if (result>0) { 
        this.inRow ++;
        this.combo ++;
        this.calculateBonusPoints();
        this.comboTimeLeft = 4; //sec
        var doTimeout = this.comboTicking(this.combo);
        doTimeout();
      }else{
        if((this.combo >= 10) && (this.onFireTimer === undefined)){
          this.popin.resetTime();
        }
        this.inRow = 0;
        this.combo = 0;
        this.comboTimeLeft = 0;
      }
      this.popin.disableCollectMe(idInt);
    };

    this.pickParity = function(choice){
      this.numberChoice = choice;
      if (choice === 1){
        this.numberChoiceString = 'Odd';
      }else{
        this.numberChoiceString = 'Even';
      }
      this.gameInit1 = false;
      this.prepareTimeLeft = 5; //sec
      this.prepareForGame = true;
      var doTimeout = this.prepareGameTicking();
      doTimeout();
    };

    this.newGame = function(){
      this.gameStarts = true;
      this.popin.initCollector();
      this.gameTimeLeft = 60; //sec
      var doTimeout = this.gameTicking();
      doTimeout();
    };

    this.initGame = function(){
      KeyboardService.init();
      this.gameEnds = false;
      this.gameInit1 = true;
      this.score = 0;
      this.inRow = 0;
      this.combo = 0;
      this.numberChoice = -1;
      this.startGame();
    };

    this.startGame = function(){
      var self = this;
      KeyboardService.on(function(key){
        self.collectMe(key);
      });
    };

    this.initGame();
  }
]);
