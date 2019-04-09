var contractAddress="0x9126De6912b97138BC9F24caF2133A355b8601FA"; //ropsten v3

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
						//console.log("Error: you must be on Ethereum Mainnet to use this website.");
					}
				}
			});*/
            // Acccounts now exposed
			mainUpdate();
			fastUpdate();
            //web3.eth.sendTransaction({/* ... */});
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
        ////////console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

/* PAST EVENT LOG */

var timeLaunch = 1554742266;
var launchBlock = 5365910;
var blockSpan = 14; //14s blocks on ETH mainnet
var startBlock = 0;
var ranLog = false;

function checkBlock(){
	web3.eth.getBlockNumber(function (error, result){
		////console.log("block number is " + result);
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
	//////////console.log(d);
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}

/* VARIABLES */

var m_account = "waiting for web3";

var a_pot = 0;
var a_leader = "";
var a_leaderReward = 0;
var a_throneReward = 0;
var a_bid = 0;
var a_number = 0;
var a_share = 0;

var c_minNumber = 300;
var c_maxNumber = 3000;

var b_timerStart;
var b_timerEnd;

var d_end = true;

var f_ether = 0;
var f_number = 0;
var a_plannedReward = 0;

var doc_pot = document.getElementById('pot');
var doc_timer = document.getElementById('timer');
var doc_leader = document.getElementById('leader');
var doc_leaderReward = document.getElementById('leaderreward');
var doc_throneReward = document.getElementById('thronereward');
var doc_bid = document.getElementById('bid');
var doc_number = document.getElementById('number');
var doc_plannedReward = document.getElementById('plannedreward');
var doc_action = document.getElementById('action');

document.getElementById('fieldNumber').value = Math.floor((Math.random() * 2700) + 300);
	
/* UPDATE */
/*
function initUpdate(){
	mainUpdate();
	fastUpdate();
}	
*/
function mainUpdate(){
	updateEthAccount();
	updatePot();
	updateLeader();
	updateLeaderReward();
	updateThroneReward();
	updateBid();
	updateNumber();
	updateTimerStart();
	updateTimerEnd();
	updateShare();
	updateText();
	setTimeout(mainUpdate, 4000);
}

function fastUpdate(){
	updateTimer();
	updateFieldEther();
	updateFieldNumber();
	updatePlannedReward();
	setTimeout(fastUpdate, 200);
}

//Updates all text from web3 calls

function updateText(){
	doc_pot.innerHTML = a_pot;
	doc_leader.innerHTML = a_leader;	
	doc_leaderReward.innerHTML = parseFloat(a_pot * a_leaderReward / 100).toFixed(4);
	doc_throneReward.innerHTML = parseFloat(a_pot * a_throneReward / 100).toFixed(4);
	doc_bid.innerHTML = a_bid;
	doc_number.innerHTML = a_number;
	if(d_end == false) {
		doc_action.innerHTML = '<button class="btn btn-lg btn-info" onclick="webBid()">BID</button>';
	} else {
		doc_action.innerHTML = '<button class="btn btn-lg btn-info" onclick="webEnd()">END</button>';
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
		
/* WEB3 CALLS */

//Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

//TimerStart
function updateTimerStart(){
	timerStart(function(result){
		b_timerStart = result;
	});
}

//TimerEnd
function updateTimerEnd(){
	timerEnd(function(result){
		b_timerEnd = result;
	});
}

//Local timer update
function updateTimer(){
	var _blocktime = (new Date()).getTime(); //current "blocktime" in milliseconds
	var _timer = b_timerEnd - (_blocktime / 1000);
	
	if(_timer > 0){
		var _hours = Math.floor(_timer / 3600);
		if(_hours < 10) { _hours = "0" + _hours }
		var _minutes = Math.floor((_timer % 3600) / 60);
		if(_minutes < 10) { _minutes = "0" + _minutes }
		var _seconds = parseFloat((_timer % 3600) % 60).toFixed(0);
		if(_seconds < 10) { _seconds = "0" + _seconds }
			
		doc_timer.innerHTML = _hours + ":" + _minutes + ":" + _seconds;
		d_end = false;
		
	} else {
		doc_timer.innerHTML = "Game Over!"
		d_end = true;
		
	}
}

//Current pot
function updatePot(){
	pot(function(result) {
		a_pot = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current bid
function updateBid(){
	bid(function(result) {
		a_bid = formatEthValue(web3.fromWei(result,'ether'));
	});
}

//Current number
function updateNumber(){
	number(function(result) {
		a_number = result;
	});
}

//Current leader
function updateLeader(){
	leader(function(result) {
		a_leader = "0x" + result.substring(26, 66);
	});
}

//Current rewards
function updateLeaderReward(){
	shareToWinner(function(result) {
		a_leaderReward = result;
	});
}

function updateThroneReward(){
	shareToThrone(function(result) {
		a_throneReward = result;
	});
}

//Current share
function updateShare(){
	ComputeShare(function(result) {
		a_share = result;
	});
}

//Reward estimation
function updatePlannedReward(){
	a_plannedReward = (parseFloat(a_pot) + parseFloat(f_ether)) * (a_share - 1) / 100; //-1 to account for tx lag. Better estimate too low than too high
	if(a_plannedReward < 0) { a_plannedReward = 0; }
	doc_plannedReward.innerHTML = parseFloat(a_plannedReward).toFixed(4);
}

/* LOCAL FIELD INPUT */

//Number input on bid
function updateFieldNumber(){
	f_number = document.getElementById('fieldNumber').value;
	if(f_number < c_minNumber){
		f_number = c_minNumber;
	}
	if(f_number > c_maxNumber){
		f_number = c_maxNumber;
	}
}

//Ether input on bid
function updateFieldEther(){
	f_ether = document.getElementById('fieldEther').value;
	if(f_ether <= a_bid){
		f_ether = parseFloat(a_bid + 0.001).toFixed(3);
		document.getElementById('fieldEther').value = f_ether;
	}
}

/* WEB3 TRANSACTIONS */

//Bid
function webBid(){
	var weitospend = web3.toWei(f_ether,'ether');
	Bid(f_number, weitospend, function(){
	});
}

//End
function webEnd(){
	End(function(){
	});
}

/* CONTRACT ABI */

abiDefinition=[{"constant": false,"inputs": [{"name": "_number","type": "uint256"}],"name": "Bid","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "End","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "EscapeHatch","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "number","type": "uint256"},{"indexed": false,"name": "pot","type": "uint256"},{"indexed": false,"name": "winnerShare","type": "uint256"}],"name": "GameBid","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "leaderReward","type": "uint256"},{"indexed": false,"name": "throneReward","type": "uint256"},{"indexed": false,"name": "number","type": "uint256"}],"name": "GameEnd","type": "event"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": true,"inputs": [],"name": "bid","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "leader","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "number","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "pot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "shareToThrone","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "shareToWinner","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "timerEnd","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "timerStart","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}]

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

function Bid(_number,eth,callback){


    var outputData = myContract.Bid.getData(_number);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            console.log('Bid ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function End(callback){

    var outputData = myContract.End.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('End ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function EscapeHatch(callback){

    var outputData = myContract.EscapeHatch.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('EscapeHatch ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function bid(callback){

    var outputData = myContract.bid.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('bid ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeShare(callback){

    var outputData = myContract.ComputeShare.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('ComputeShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function leader(callback){

    var outputData = myContract.leader.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('leader ',result);
            callback(result)
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function number(callback){

    var outputData = myContract.number.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('number ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function pot(callback){

    var outputData = myContract.pot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('pot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function shareToThrone(callback){

    var outputData = myContract.shareToThrone.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('shareToThrone ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function shareToWinner(callback){

    var outputData = myContract.shareToWinner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('shareToWinner ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function timerEnd(callback){

    var outputData = myContract.timerEnd.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('timerEnd ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            console.log('transaction failed with ',error.message)
        }
    });
}


function timerStart(callback){

    var outputData = myContract.timerStart.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            console.log('timerStart ',web3.toDecimal(result));
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
			//////console.log(result);
			var i = 0;
			if(result.length > 0){ //check if we have events, if not stop the loop
				p_keepUpdating = true;
				for(i = 0; i < 40; i++){ //loop through only 40 events at most
					if(i < result.length){ //make sure there's enough events
						if(checkHash(result[i].transactionHash, result[i].event) != 0) {
							startBlock = result[i].blockNumber; //store the last blocknumber to start next loop
							dateLog(result[i].blockNumber);
							if(result[i].event == "GameBid"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " bid " + formatEthValue(web3.fromWei(result[i].args.eth,'ether')) + " ETH and choose the number " + result[i].args.number + ". They stand to win " + formatEthValue(web3.fromWei(result[i].args.pot,'ether') * result[i].args.winnerShare / 100) + " ETH.";								
							} else if(result[i].event == "GameEnd"){
								eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " wins " + formatEthValue(web3.fromWei(result[i].args.leaderReward,'ether')) + " ETH! " + formatEthValue(web3.fromWei(result[i].args.throneReward,'ether')) + " ETH goes to the SnailThrone. MAGIC NUMBER = " + result[i].args.number;		
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
			////////console.log("problem!");
		}
	});
}

/* Events */

var gamebidEvent = myContract.GameBid();
gamebidEvent.watch(function(error, result){
    if(!error){
		////////////////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result.args.player) + " bid " + formatEthValue(web3.fromWei(result.args.eth,'ether')) + " ETH and choose the number " + result.args.number + ". They stand to win " + formatEthValue(web3.fromWei(result.args.pot,'ether') * result.args.winnerShare / 100) + " ETH.";	
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var gameendEvent = myContract.GameEnd();
gameendEvent.watch(function(error, result){
    if(!error){
		//////////console.log(result);
		if(checkHash(result.transactionHash, result.event) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result.args.player) + " wins " + formatEthValue(web3.fromWei(result.args.leaderReward,'ether')) + " ETH! " + formatEthValue(web3.fromWei(result.args.throneReward,'ether')) + " ETH goes to the SnailThrone. MAGIC NUMBER = " + result.args.number;	
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});	
