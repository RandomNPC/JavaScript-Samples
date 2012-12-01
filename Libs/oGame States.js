﻿//		***********GAME STATE RELATED VARIABLES ********************
//these variables keep track of the state of the game for gameplay logic*****
function GameStates() {
	function Moods() {
		this.Fearful = false;		//bool for determining if we should use fearful portrait
		this.Excited = true;			//bool for determining if we should use Excited portrait
		this.Celebrate = false;		//bool for determining if we should use Celebrate portrait
		this.Confused = false;		//bool for determining if we should use Confused portrait
		this.Dead = false;			//bool for determining if we should use Dead portrait
		this.OMG = false;
	}
	this.mood = new Moods();


	function Hand() {
		this.selected = [5];
		this.selected[0] = false;		//these hand selected bools are needed for drawing.
		this.selected[1] = false;		//if we click on a card, we want to move it slightly
		this.selected[2] = false;		//from the default position
		this.selected[3] = false;
		this.selected[4] = false;
		
		this.used = [5];
		this.used[0] = false;			//tells us if a card was used in making a value, so it can't be used again
		this.used[1] = false;
		this.used[2] = false;
		this.used[3] = false;
		this.used[4] = false;
	}
	this.hand = new Hand();


	function Logic() {
		//math logic for cards variable
		this.isIdle = true;
		this.pickAcard = true;
		this.pickAsign = false;
		this.merge = false;
		this.ASF = false;
		this.ABB = false;
		this.answerSoFar = 0;
		this.answerBeingBuilt = 0;
		this.answered = false;
		this.cardSelected = false;

		this.makeTermActive = false;		//bool for telling us if in makeTerm mode

		this.inDivision = false;			//bools for the buttons
		this.inAddition = false;			//
		this.inSubtraction = false;		//
		this.inMultiplication = false;	//mmk
	}
	this.logic = new Logic();


	function PlayerData() {
		this.panicked = false;			//bool for telling us if panic button was pressed this equation

		this.additionBonus = false;
		this.subtractionBonus = false;
		this.multiplyBonus = false;
		this.divideBonus = false;

		this.numAdditions = 0;
		this.numSubtractions = 0;
		this.numMultiplies = 0;
		this.numDivisions = 0;

		this.deckEmpty = false;
	}
	this.playerData = new PlayerData();


	function Location() {
		this.atStartupScreen = true;	//bool for telling us what screen we are in startup screen, which shows our logos
		this.atTitleScreen = false;		//bool for at title screen, true means, show title and play title music
		this.atGameScreen = false;		//bool for at game screen, do the game loop for this portion
		this.atGameOverScreen = false;	//oh so sad, true if you just phail hard
		this.atEndScreen = false;
	}
	this.location = new Location();


	function TimeState() {
		this.outOfTime = false;
		this.timeRemaining = 99;
		this.tensTime = 9;
		this.onesTime = 9;

		this.started = false;
		this.clockTimer = 0;
		this.followTime = false;
	}
	this.time = new TimeState();


	function Splash() {
		this.startupTimer = 0;
		this.showEdward = false;
		this.showVMichial = true;
		this.showFranciaGarcia = false;
		this.showJYC = false;
		this.showCodeForGood = false;
	}
	this.splash = new Splash();


	this.player1 = new Player();
	this.player1.initializePlayer();
	
	this.clickedAcard = function(cardChoice){
						if (!this.hand.selected1 && !this.hand.used1 && !this.player1.myHand[cardChoice].disabled) {
							if (this.logic.pickAcard) {
								if (!this.logic.ASF && !this.logic.ABB) {
									this.logic.answerBeingBuilt = 0;
									this.logic.ABB = true;
									this.logic.answerBeingBuilt = this.player1.myHand[cardChoice].myValue;
									this.logic.cardSelected = true;
									this.logic.makeTermActive = true;
									this.logic.pickAcard = false;
									this.logic.pickAsign = true;
									this.hand.selected[cardChoice] = true;
									this.hand.used[cardChoice] = true;
									msg.selectOperationDialog = true;
									if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
									this.logic.inAddition = true;
									this.logic.inSubtraction = true;
									this.logic.inDivision = true;
									this.logic.inMultiplication = true;
								}
								else if (this.logic.ASF && !this.logic.ABB) {
									this.logic.answerBeingBuilt = 0;
									this.logic.ABB = true;
									this.logic.answerBeingBuilt = this.player1.myHand[cardChoice].myValue;
									this.logic.cardSelected = true;
									this.logic.makeTermActive = true;
									this.logic.pickAcard = false;
									this.logic.pickAsign = true;
									this.hand.selected[cardChoice] = true;
									this.hand.used[cardChoice] = true;
									msg.selectOperationDialog = true;
									if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
									this.logic.inAddition = true;
									this.logic.inSubtraction = true;
									this.logic.inDivision = true;
									this.logic.inMultiplication = true;
								}
								else if (!this.logic.ASF && this.logic.ABB) {
									if (this.logic.inAddition || this.logic.inSubtraction || this.logic.inDivision || this.logic.inMultiplication) {
										if (!this.hand.used1) {
											if (this.logic.inAddition) {
												this.logic.answerBeingBuilt += this.player1.myHand[cardChoice].myValue;
												this.logic.cardSelected = true;
												this.logic.makeTermActive = true;
												this.hand.selected[cardChoice] = true;
												this.hand.used[cardChoice] = true;
												this.logic.pickAcard = false;
												this.logic.pickAsign = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
											else if (this.logic.inSubtraction) {
												this.logic.answerBeingBuilt -= this.player1.myHand[cardChoice].myValue;
												this.logic.cardSelected = true;
												this.hand.selected[cardChoice] = true;
												this.hand.used[cardChoice] = true;
												this.logic.pickAcard = false;
												this.logic.pickAsign = true;
												this.logic.makeTermActive = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
											else if (this.logic.inDivision) {
												this.logic.answerBeingBuilt /= this.player1.myHand[cardChoice].myValue;
												this.logic.answerBeingBuilt = Math.floor(this.logic.answerBeingBuilt);
												this.logic.answerSoFar = Math.floor(this.logic.answerSoFar);
												this.logic.cardSelected = true;
												this.hand.selected[cardChoice] = true;
												this.hand.used[cardChoice] = true;
												this.logic.pickAcard = false;
												this.logic.makeTermActive = true;
												this.logic.pickAsign = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
											else if (this.logic.inMultiplication) {
												this.logic.answerBeingBuilt *= this.player1.myHand[cardChoice].myValue;
												this.logic.cardSelected = true;
												this.hand.selected[cardChoice] = true;
												this.hand.used[cardChoice] = true;
												this.logic.makeTermActive = true;
												this.logic.pickAcard = false;
												this.logic.pickAsign = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
										}
									}
								}
								else if (this.logic.ASF && this.logic.ABB) {
									if (this.logic.inAddition || this.logic.inSubtraction || this.logic.inDivision || this.logic.inMultiplication) {
										if (!this.hand.used1) {
											if (this.logic.inAddition) {
												this.logic.answerBeingBuilt += this.player1.myHand[cardChoice].myValue;
												this.logic.makeTermActive = true;
												this.logic.cardSelected = true;
												this.hand.selected[cardChoice] = true;
												this.hand.used[cardChoice] = true;
												this.logic.pickAcard = false;
												this.logic.pickAsign = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
											else if (this.logic.inSubtraction) {
												this.logic.answerBeingBuilt -= this.player1.myHand[cardChoice].myValue;
												this.logic.cardSelected = true;
												this.hand.selected[cardChoice] = true;
												this.hand.used[cardChoice] = true;
												this.logic.makeTermActive = true;
												this.logic.pickAcard = false;
												this.logic.pickAsign = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
											else if (this.logic.inDivision) {
												this.logic.answerBeingBuilt /= this.player1.myHand[cardChoice].myValue;
												this.logic.answerBeingBuilt = Math.floor(this.logic.answerBeingBuilt);
												this.logic.cardSelected = true;
												this.hand.selected[cardChoice] = true;
												this.logic.makeTermActive = true;
												this.hand.used[cardChoice] = true;
												this.logic.pickAcard = false;
												this.logic.pickAsign = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.answerSoFar = Math.floor(this.logic.answerSoFar);
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
											else if (this.logic.inMultiplication) {
												this.logic.answerBeingBuilt *= this.player1.myHand[cardChoice].myValue;
												this.logic.cardSelected = true;
												this.hand.selected[cardChoice] = true;
												this.logic.makeTermActive = true;
												this.hand.used[cardChoice] = true;
												this.logic.pickAcard = false;
												this.logic.pickAsign = true;
												msg.selectOperationDialog = true;
												if (msg.selectCardDialog) { msg.selectCardDialog = false; msg.cardTimer = 0; }
												this.logic.inAddition = true;
												this.logic.inSubtraction = true;
												this.logic.inDivision = true;
												this.logic.inMultiplication = true;
											}
										}
									}
								}

							}
						}
	}
}