var contractAddress="0xA1E413d638360F7eAE58b9cc77f984E2Fcce7AbD"; //Ropsten v9

//-- WEB3 DETECTION --//
var web3;

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
			/*web3.version.getNetwork(function(error, result) {
				if (!error) {
					if (result != "1") {
						////console.log("Error: you must be on Ethereum Mainnet to use this website.");
					}
				}
			});*/
            // Acccounts now exposed
            //web3.eth.sendTransaction({/* ... */});
			mainUpdate();
			fastUpdate();
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
		mainUpdate();
		fastUpdate();
    }
    // Non-dapp browsers...
    else {
        //////////console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

//-- MODAL --//

var modal = document.getElementById('modal_copy');
var modalContent=document.getElementById('modal_internal')

window.onclick = function(event) {
    if (event.target == modal) {
        removeModal()
    }
}
function removeModal(){
        modalContent.innerHTML=""
        modal.style.display = "none";
}

function displayModalMessage(){
    modal.style.display = "block";
    modalContent.textContent = "copied link to clipboard";
    setTimeout(removeModal,2000)
}

//-- REFERRAL --//

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function copyRef() {
  copyText.value = playerreflinkdoc.textContent;
  copyText.style.display="block"
  copyText.select();
  document.execCommand("Copy");
  copyText.style.display="none"
  displayModalMessage();
  //alert("Copied the text: " + copyText.value);
}

var playerreflinkdoc = document.getElementById('playerreflink'); 
var a_refLink = window.location.protocol + '//' + window.location.host + window.location.pathname + "?ref=" + web3.eth.accounts[0];
var copyText = document.getElementById("copytextthing"); 

/* PAST EVENT LOG */

var timeLaunch = 1554742266;
var launchBlock = 5365910;
var blockSpan = 14; //14s blocks on ETH mainnet
var startBlock = 0;
var ranLog = false;

function checkBlock(){
	web3.eth.getBlockNumber(function (error, result){
		//////console.log("block number is " + result);
		startBlock = parseInt(result - (172800 / blockSpan)); //~2 days
		if(startBlock < launchBlock) { startBlock = launchBlock };
	});
}

checkBlock();

/* UTILITIES */

//Truncates value to 4 decimals
function formatEthValue(_value){
    return parseFloat(parseFloat(_value).toFixed(4));
}

//Truncates ETH address to first 8 numbers, and add etherscan link
function formatEthAdr(adr){
	var _smallAdr = adr.substring(0, 10);
	var _stringLink = '<a href="https://etherscan.io/address/' + adr + '" target="_blank">' + _smallAdr + '</a>';
	return _stringLink;
}

//Adds spaces between integers
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//Conversion of Date to hh:mm:ss
var datetext;

function date24() {
	d = new Date();
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}	

//Get timestamp for log
function dateLog(_blockNumber) {
	d = new Date((timeLaunch + ((_blockNumber - launchBlock) * blockSpan)) * 1000);
	////////////console.log(d);
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}

//Convert ID to Lord name
function idKingToName(_id){
	switch(_id){
		case 0: return "Blue";
		case 1: return "Red";
		case 2: return "Green";
		case 3: return "Purple";
	}
}

/* VARIABLES */

var m_account = "waiting for web3";
//var no_ref = "0xABF3E252006D805Cce3C7219A929B83465F2a46e";

var a_thronePot = 0;

var a_troiChest = 0;
var a_troiReward = 0;

var a_doomReward = 0;
var a_doomLeader = "";
var a_doomTimer;
var a_doomBid = 0;

var a_bonus = 0;
var a_lastFroot = 0;

var a_dailyReward = 0;
var a_dailyLeader = "";
var a_dailyTimer;
var a_dailyBid = 0;

var a_troiSize = 0;
var a_ethPerDay = 0;

var a_frootReward = 0;
var a_totalBonus = 0;

var a_playerBalance = 0;

var a_kingCost = [0.02, 0.02, 0.02, 0.02];
var a_kingOwner = ["", "", "", ""];

var a_playerSnail = 0;
var c_secondsPerDay = 86400;
var c_snailReq = 420;

var f_buy = 0;
var f_troiGrow = 0;

var a_helpBox = 0;

var doc_thronePot = document.getElementById('thronepot');
var doc_troiChest = document.getElementById('troichest');
var doc_doomReward = document.getElementById('doomreward');
var doc_doomLeader = document.getElementById('doomleader');
var doc_doomTimer = document.getElementById('doomtimer');
var doc_doomBid = document.getElementById('doombid');
var doc_bonus = document.getElementById('bonus');
var doc_dailyReward = document.getElementById('dailyreward');
var doc_dailyLeader = document.getElementById('dailyleader');
var doc_dailyTimer = document.getElementById('dailytimer');
var doc_dailyBid = document.getElementById('dailybid');
var doc_troiSize = document.getElementById('troisize');
var doc_ethPerDay = document.getElementById('ethperday');
var doc_frootReward = document.getElementById('frootreward');
var doc_totalBonus = document.getElementById('totalbonus');
var doc_playerBalance = document.getElementById('playerbalance');
var doc_troiGrow = document.getElementById('troigrow');
var doc_lastFroot = document.getElementById('lastfroot');
var doc_helpBox = document.getElementById('helpbox');

var doc_kingCost = [
document.getElementById('kingCost0'),
document.getElementById('kingCost1'),
document.getElementById('kingCost2'),
document.getElementById('kingCost3')
];

var doc_kingOwner = [
document.getElementById('kingOwner0'),
document.getElementById('kingOwner1'),
document.getElementById('kingOwner2'),
document.getElementById('kingOwner3')
];

var doc_helpBox = [
document.getElementById('helpBox0'),
document.getElementById('helpBox1'),
document.getElementById('helpBox2'),
document.getElementById('helpBox3'),
document.getElementById('helpBox4'),
document.getElementById('helpBox5'),
document.getElementById('helpBox6'),
document.getElementById('helpBox7'),
];
	
/* UPDATE */
/*
function initUpdate(){
	mainUpdate();
	fastUpdate();
}	
*/
function mainUpdate(){
	updateEthAccount();
	updateThronePot();
	updateTroiChest();
	updateDoomReward();
	updateDoomLeader();
	updateDoomTimer();
	updateDoomBid();
	updateBonus();
	updateDailyReward();
	updateDailyLeader();
	updateDailyTimer();
	updateDailyBid();
	updateTroiSize();
	updateTroiReward();
	updateEthPerDay();
	updateFrootReward();
	updateTotalBonus();
	updatePlayerBalance();
	updateReferral();
	updateLastFroot();
	updateSnail();
	runLoop(checkKingCost);
	runLoop(checkKingOwner);
	updateText();
	setTimeout(mainUpdate, 4000);
}

function fastUpdate(){
	localupdateDoomTimer();
	localupdateDailyTimer();
	localupdateFieldBuy();
	localupdateTroiGrow();
	setTimeout(fastUpdate, 200);
}

//Updates all text from web3 calls

function updateText(){
	doc_thronePot.innerHTML = a_thronePot;
	doc_troiChest.innerHTML = a_troiChest;
	doc_doomReward.innerHTML = a_doomReward;	
	
	doc_doomBid.innerHTML = a_doomBid;
	doc_dailyReward.innerHTML = a_dailyReward;	
	
	doc_dailyBid.innerHTML = a_dailyBid;
	doc_troiSize.innerHTML = a_troiSize;
	doc_ethPerDay.innerHTML = a_ethPerDay;
	doc_frootReward.innerHTML = parseFloat(a_frootReward).toFixed(6);
	doc_totalBonus.innerHTML = a_totalBonus;
	doc_playerBalance.innerHTML = parseFloat(a_playerBalance).toFixed(6);
	doc_lastFroot.innerHTML = computeLastFroot();
	
	for(i = 0; i < 4; i++){
		doc_kingCost[i].innerHTML = a_kingCost[i];
		if(a_kingOwner[i] == m_account){
			doc_kingOwner[i].innerHTML = 'YOU!';
		} else {
			doc_kingOwner[i].innerHTML = formatEthAdr(a_kingOwner[i]);
		}
	}
	
	if(a_doomLeader == m_account){
		doc_doomLeader.innerHTML = 'YOU!';
	} else {
		doc_doomLeader.innerHTML = formatEthAdr(a_doomLeader);
	}
	
	if(a_dailyLeader == m_account){
		doc_dailyLeader.innerHTML = 'YOU!';
	} else {
		doc_dailyLeader.innerHTML = formatEthAdr(a_dailyLeader);
	}
	
	_bonus = parseFloat((a_bonus / c_secondsPerDay)).toFixed(3);
	if(_bonus < 1){
		doc_bonus.innerHTML = '<h1>' + _bonus + '%</h1>';
	} else if (_bonus > 4){
		doc_bonus.innerHTML = '<h1 class="pulsepermafast">' + _bonus + '%</h1>';
	} else {
		doc_bonus.innerHTML = '<h1 class="pulseperma">' + _bonus + '%</h1>';
	}
}

//Changes u_updateLog to true, manual choice in case event watching fails
function startLogging(){
	u_updateEvent = true;
}

//Update log every few seconds if player chose to
function updateLog(){
	if(u_updateEvent == true || p_keepUpdating == true){
		runLog();
	}
}

//Change help box
function changeHelpBox(_direction){
	if(_direction == 0 && a_helpBox > 0){
		doc_helpBox[a_helpBox].style.display = "none";
		a_helpBox -= 1;
		doc_helpBox[a_helpBox].style.display = "block";
	} else if(_direction == 1 && a_helpBox < 7){
		doc_helpBox[a_helpBox].style.display = "none";
		a_helpBox += 1;
		doc_helpBox[a_helpBox].style.display = "block";
	}
} 

//Status of referral link for player
function updateReferral(){
	if(a_playerSnail >= c_snailReq){
		a_refLink = window.location.protocol + '//' + window.location.host + window.location.pathname + "?ref=" + web3.eth.accounts[0];
		playerreflinkdoc.innerHTML = a_refLink;
	} else {
		playerreflinkdoc.textContent = "INACTIVE (not enough snails)";
	}
}

//Compute last Froot
function computeLastFroot(){
	var _now = Math.round((new Date()).getTime() / 1000);
	var _timeSinceLast = parseFloat(_now - a_lastFroot);
	
	var	_numhours = Math.floor(_timeSinceLast / 3600);
	var _numminutes = Math.floor((_timeSinceLast % 3600) / 60);
	//var _numseconds = (_timeSinceLast % 3600) % 60;
	var _plantString = "";			
	if(_numhours > 0) {
		_plantString = _numhours + " hours ";
		if(_numhours == 1) {
			_plantString = _numhours + " hour ";
		}
	} 
	if(_numminutes > 1) {
		_plantString += _numminutes + " minutes";
	} else if(_numminutes == 1) {
		_plantString += _numminutes + " minute";
	}
	if(_numhours == 0 && _numminutes == 0){
		_plantString = "less than a minute";
	}
	
	return _plantString;		
}
		
/* WEB3 CALLS */

//Snails from SnailThrone
function updateSnail(){
	GetSnail(m_account, function(result) {
		a_playerSnail = result;
	});
}

//Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

//Current player balance
function updatePlayerBalance(){
	GetMyBalance(function(result) {
		a_playerBalance = web3.fromWei(result,'ether');
	});
}
	
//Current Troi Size for player
function updateTroiSize(){
	GetTroi(m_account, function(result) {
		a_troiSize = result;
	});
}

//Current Troi Reward (= ETH cost for one Troi)
function updateTroiReward(){
	troiReward(function(result) {
		a_troiReward = web3.fromWei(result,'ether');
	});
}

//ETH per day for player Troi Size
function updateEthPerDay(){
	a_ethPerDay = parseFloat((a_troiSize * a_troiReward) / 100).toFixed(6);
}

//Update Last Froot
function updateLastFroot(){
	GetMyLastHarvest(function(result) {
		a_lastFroot = result;
	});
}

//Global bonus
function updateBonus(){
	ComputeBonus(function(result) {
		a_bonus = result;
	});
}

//Total bonus
function updateTotalBonus(){
	var _now = Math.round((new Date()).getTime() / 1000);
	a_totalBonus = parseFloat((((_now - a_lastFroot) + a_bonus) / c_secondsPerDay)).toFixed(3);
}

//Number of Troi for ETH used
function localupdateTroiGrow(){
	a_troiGrow = parseFloat(f_buy / a_troiReward).toFixed(0);
	doc_troiGrow.innerHTML = a_troiGrow;
}

//Froot Reward
function updateFrootReward(){
	ComputeHarvest(function(result) {
		a_frootReward = web3.fromWei(result,'ether');
	});
}
	
//Local timer update
function localupdateDoomTimer(){
	var _blocktime = (new Date()).getTime(); //current "blocktime" in milliseconds
	var _timer = a_doomTimer - (_blocktime / 1000);
	
	if(_timer > 0){
		var _hours = Math.floor(_timer / 3600);
		if(_hours < 10) { _hours = "0" + _hours }
		var _minutes = Math.floor((_timer % 3600) / 60);
		if(_minutes < 10) { _minutes = "0" + _minutes }
		var _seconds = parseFloat((_timer % 3600) % 60).toFixed(0);
		if(_seconds < 10) { _seconds = "0" + _seconds }
			
		doc_doomTimer.innerHTML = _hours + ":" + _minutes + ":" + _seconds;
	} else {
		doc_doomTimer.innerHTML = "THE DOOMCLOCK RINGS!"
	}
}

function localupdateDailyTimer(){
	var _blocktime = (new Date()).getTime(); //current "blocktime" in milliseconds
	var _timer = a_dailyTimer - (_blocktime / 1000);
	
	if(_timer > 0){
		var _hours = Math.floor(_timer / 3600);
		if(_hours < 10) { _hours = "0" + _hours }
		var _minutes = Math.floor((_timer % 3600) / 60);
		if(_minutes < 10) { _minutes = "0" + _minutes }
		var _seconds = parseFloat((_timer % 3600) % 60).toFixed(0);
		if(_seconds < 10) { _seconds = "0" + _seconds }
			
		doc_dailyTimer.innerHTML = _hours + ":" + _minutes + ":" + _seconds;
	} else {
		doc_dailyTimer.innerHTML = "Daily reward available!"
	}
}

//Current throne pot
function updateThronePot(){
	thronePot(function(result) {
		a_thronePot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current pot
function updateTroiChest(){
	troiChest(function(result) {
		a_troiChest = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current bid
function updateBid(){
	bid(function(result) {
		a_bid = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current DoomTimer
function updateDoomTimer(){
	doomclockTimer(function(result){
		a_doomTimer = result;
	});
}

//Current DoomReward
function updateDoomReward(){
	a_doomReward = parseFloat(a_troiChest * 0.04).toFixed(4);
}

//Current DoomLeader
function updateDoomLeader(){
	doomclockLeader(function(result) {
		a_doomLeader = "0x" + result.substring(26, 66);
	});
}

//Current DoomBid
function updateDoomBid(){
	doomclockCost(function(result) {
		a_doomBid = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current DailyTimer
function updateDailyTimer(){
	dailyTimer(function(result){
		a_dailyTimer = result;
	});
}

//Current DailyReward
function updateDailyReward(){
	a_dailyReward = parseFloat(a_troiChest * 0.02).toFixed(4);
}

//Current DailyLeader
function updateDailyLeader(){
	dailyLeader(function(result) {
		a_dailyLeader = "0x" + result.substring(26, 66);
	});
}

//Current DailyBid
function updateDailyBid(){
	dailyMax(function(result) {
		a_dailyBid = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Loop function for Kings
function runLoop(_loop){
	for(i = 0; i < 4; i++){
		_loop(i);
	}
}
	
//Check king cost
function checkKingCost(_id){
	GetKingCost(_id, function(result) {
		a_kingCost[_id] = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Check king owner
function checkKingOwner(_id){
	GetKingOwner(_id, function(result) {
		a_kingOwner[_id] = "0x" + result.substring(26, 66);
	});
}


/* LOCAL FIELD INPUT */

//Ether input on GrowTroi
function localupdateFieldBuy(){
	f_buy = document.getElementById('fieldBuy').value;
}

/* WEB3 TRANSACTIONS */

//GrowTroi
function webGrowTroi(){
	var _ref = getQueryVariable('ref');
	var weitospend = web3.toWei(f_buy,'ether');
	GrowTroi(_ref, weitospend, function(){
	});
}

//HarvestFroot
function webHarvestFroot(){
	HarvestFroot(function(){
	});
}

//WithdrawBalance
function webWithdrawBalance(){
	WithdrawBalance(function(){
	});
}

//BecomeKing
function webBecomeKing(_id){
	var weitospend = web3.toWei(a_kingCost[_id]);
	BecomeKing(_id, weitospend, function(){
	});
}

/* CONTRACT ABI */


abiDefinition=[{"constant": true,"inputs": [],"name": "GetMyBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeHarvest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetKingCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetTroi","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeBonus","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "doomclockTimer","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_adr","type": "address"}],"name": "GetSnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_id","type": "uint256"}],"name": "GetKingOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "dailyTimer","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "BecomeKing","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "GetMyLastHarvest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "doomclockLeader","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "dev","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "troiChest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "StartGame","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_ref","type": "address"}],"name": "GrowTroi","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "dailyLeader","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "troiReward","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyReferrer","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lastBonus","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "HarvestFroot","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "dailyMax","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameActive","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "doomclockCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "size","type": "uint256"}],"name": "GrewTroi","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "NewLeader","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "size","type": "uint256"}],"name": "HarvestedFroot","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "king","type": "uint256"}],"name": "BecameKing","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "ResetClock","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "leader","type": "address"},{"indexed": false,"name": "king","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "Doomed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WonDaily","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "PaidThrone","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedChest","type": "event"}]

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);


function GetMyBalance(callback){
    var outputData = myContract.GetMyBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeHarvest(callback){
    var outputData = myContract.ComputeHarvest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeHarvest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetKingCost(_id,callback){
    var outputData = myContract.GetKingCost.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetKingCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetTroi(adr,callback){
    var outputData = myContract.GetTroi.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetTroi ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeBonus(callback){
    var outputData = myContract.ComputeBonus.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeBonus ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function doomclockTimer(callback){
    var outputData = myContract.doomclockTimer.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('doomclockTimer ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetSnail(_adr,callback){
    var outputData = myContract.GetSnail.getData(_adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetSnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetKingOwner(_id,callback){
    var outputData = myContract.GetKingOwner.getData(_id);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetKingOwner ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function dailyTimer(callback){
    var outputData = myContract.dailyTimer.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('dailyTimer ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeKing(_id,eth,callback){
    var outputData = myContract.BecomeKing.getData(_id);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('BecomeKing ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyLastHarvest(callback){
    var outputData = myContract.GetMyLastHarvest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyLastHarvest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function doomclockLeader(callback){
    var outputData = myContract.doomclockLeader.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('doomclockLeader ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function dev(callback){
    var outputData = myContract.dev.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('dev ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function troiChest(callback){
    var outputData = myContract.troiChest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('troiChest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function WithdrawBalance(callback){
    var outputData = myContract.WithdrawBalance.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('WithdrawBalance ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function StartGame(eth,callback){
    var outputData = myContract.StartGame.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('StartGame ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GrowTroi(_ref,eth,callback){
    var outputData = myContract.GrowTroi.getData(_ref);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('GrowTroi ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function dailyLeader(callback){
    var outputData = myContract.dailyLeader.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('dailyLeader ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function troiReward(callback){
    var outputData = myContract.troiReward.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('troiReward ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyReferrer(callback){
    var outputData = myContract.GetMyReferrer.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyReferrer ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function lastBonus(callback){
    var outputData = myContract.lastBonus.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lastBonus ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function thronePot(callback){
    var outputData = myContract.thronePot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('thronePot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function HarvestFroot(callback){
    var outputData = myContract.HarvestFroot.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('HarvestFroot ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function dailyMax(callback){
    var outputData = myContract.dailyMax.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('dailyMax ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function gameActive(callback){
    var outputData = myContract.gameActive.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('gameActive ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function doomclockCost(callback){
    var outputData = myContract.doomclockCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('doomclockCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}




/* EVENT WATCH */

//Store transaction hash and event name for each event, and check before executing result, as web3 events fire twice (metamask?)
var store_hash = [];
var store_event = [];

function checkHash(txhash, eventname) {
	var i = 0;
	var _name = false;
	do {
		if(store_hash[i] == txhash) {
			if(store_event[i] == eventname) {
				return 0;
			}
		}
		i++;
	}
	while(i < store_event.length);
	
	//Add new tx hash and event name
	store_hash.push(txhash);
	store_event.push(eventname);
	
	//Remove first entry if there's more than 8 entries saved
	if(store_hash.length > 8){
		store_hash.shift();
	}
	if(store_event.length > 8){
		store_event.shift();
	}
}

/* EVENTS */

var logboxscroll = document.getElementById('logboxscroll');
var eventlogdoc = document.getElementById("eventlog");

function runLog(){
	ranLog = true;
	myContract.allEvents({ fromBlock: startBlock, toBlock: 'latest' }).get(function(error, result){
		if(!error){
			////////console.log(result);
			var i = 0;
			if(result.length > 0){ //check if we have events, if not stop the loop
				p_keepUpdating = true;
				for(i = 0; i < 40; i++){ //loop through only 40 events at most
					if(i < result.length){ //make sure there's enough events
						if(checkHash(result[i].transactionHash, result[i].event) != 0) {
							startBlock = result[i].blockNumber; //store the last blocknumber to start next loop
							dateLog(result[i].blockNumber);
							if(result[i].event == "WithdrewBalance"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " withdrew " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH to their wallet.";								
							} else if(result[i].event == "NewLeader"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " leads the Daily with " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH.";		
							} else if(result[i].event == "HarvestedFroot"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " harvested Froot from their " + result[i].args.size + " Troi. Reward: " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH.";
							} else if(result[i].event == "BecameKing"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] All hail " + formatEthAdr(result[i].args.player) + ", crowned " + idKingToName(web3.toDecimal(result[i].args.king)) + " King for " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH.";			
							} else if(result[i].event == "ResetClock"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " reset the Doomclock! Your Troi remains safe for another day. Next reset: " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH.";
							} else if(result[i].event == "Doomed"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] THE DOOMCLOCK RINGS! Troi production lowers by 10%. Doomleader " + formatEthAdr(result[i].args.leader) + " and Purple King " + formatEthAdr(result[i].args.king) + "earn " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH.";
							} else if(result[i].event == "WonDaily"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " wins the daily reward of " + + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH!";
							} else if(result[i].event == "GrewTroi"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " grew their Troi with " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH, and now owns " + web3.toDecimal(result[i].args.size) + " Troi.";							
							} else if(result[i].event == "PaidThrone"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " paid tribute to the SnailThrone! " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH has been sent.";										
							} else if(result[i].event == "BoostedChest"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " makes a generous " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH donation to the troiChest.";
							}
							logboxscroll.scrollTop = logboxscroll.scrollHeight;
						}
					}	
				}
			} else {
				p_keepUpdating = false;
			}
		}
		else{
			//////////console.log("problem!");
		}
	});
}

/* Events */

var withdrewbalanceEvent = myContract.WithdrewBalance();
withdrewbalanceEvent.watch(function(error, result){
    if(!error){
		//////////////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " withdrew " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH to their wallet.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var newleaderEvent = myContract.NewLeader();
newleaderEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " leads the Daily with " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH.";	
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});	

var harvestedfrootEvent = myContract.HarvestedFroot();
harvestedfrootEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " harvested Froot from their " + result.args.size + " Troi. Reward: " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});	

var becamekingEvent = myContract.BecameKing();
becamekingEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] All hail " + formatEthAdr(result.args.player) + ", crowned " + idKingToName(web3.toDecimal(result.args.king)) + " King for " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});	

var resetclockEvent = myContract.ResetClock();
resetclockEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " reset the Doomclock! Your Troi remains safe for another day. Next reset: " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var doomedEvent = myContract.Doomed();
doomedEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] THE DOOMCLOCK RINGS! Troi production lowers by 10%. Doomleader " + formatEthAdr(result.args.leader) + " and Purple King " + formatEthAdr(result.args.king) + "earn " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var wondailyEvent = myContract.WonDaily();
wondailyEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " wins the daily reward of " + + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var grewtroiEvent = myContract.GrewTroi();
grewtroiEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " grew their Troi with " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH, and now own " + web3.toDecimal(result.args.size) + " Troi.";	
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});					

var paidthroneEvent = myContract.PaidThrone();
paidthroneEvent.watch(function(error, result){
    if(!error){
		//////////////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " paid tribute to the SnailThrone! " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH has been sent.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var boostedchestEvent = myContract.BoostedChest();
boostedchestEvent.watch(function(error, result){
    if(!error){
		//////////////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " makes a generous " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH donation to the troiChest.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});
