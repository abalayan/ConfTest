var BigramsEas = ['th','he','in','er','an','re','nd','at','on','nt','ha','es','st','en','ed','to','it','ou','ea'];
var BigramsHard =  ['hi','is','or','ti','as','te','et','ng','of','al','de','se','le','sa','si','ar','ve','ra','ld','ur','qi'];
var Seqs = [];

//console.log(Seqs);

//generate Data
BigramsEas = randomizearray(BigramsEas);
BigramsHard = randomizearray(BigramsHard);

BigramsEasSeqs = makeSequenseArray(BigramsEas,6,200);
BigramsHardSeqs = makeSequenseArray(BigramsHard,6,200);

//console.log(BigramsEasSeqs);
//console.log(BigramsHardSeqs);

i=0;
j=0;
while(i<50 && j<50)
{
	Seqs.push([BigramsEasSeqs[i],BigramsHardSeqs[i],"EH","",""]);
	i++;
	j++;
}

while(i<100)
{
	Seqs.push([BigramsEasSeqs[i],BigramsEasSeqs[i+50],"EE","",""]);
	i++;
}

while(j<100)
{
	Seqs.push([BigramsHardSeqs[j],BigramsHardSeqs[j+50],"HH","",""]);
	j++;
}

while(i<150 && j<150)
{
	Seqs.push([BigramsHardSeqs[i],BigramsEasSeqs[i],"HE","",""]);
	i++;
	j++;
}

Seqs = randomizearray(Seqs);

/*
var Seqs = [
	["dsdsdssdsadf","E","",""],
	["fgdffssdsadf","H","",""],
	["fgdffssdsadf","E","",""],
	["fgdffssdsadf","H","",""],
	["fgdffssdsadf","E","",""],
	["fghgffsfsadf","E","",""],
	["fdddddsdsadf","H","",""],
	["fgdffssdsadf","H","",""],
]*/
//END of generate Data



//Start Trials
var trialId = 0; 
var seqDiv=document.getElementById("currseq");
var questDiv=document.getElementById("questdseq");
var typeDiv=document.getElementById("typedseq");



function generateSequens(word,colorindex)
{
	colorindex = typeof colorindex !== 'undefined' ? colorindex : 0;
	n="";
	for (var i = 0; i<word.length; i++) 
	{
		
		if(i==colorindex)
		{
			n+="<font color='green'>"+word[i]+"</font>";	
		}
		else
		{
			n+=word[i];	
		}
		
		//console.log(n);
	};
	return n;
}

var curcharIndex = 0;
var errors = [];
var typestring = "";
var typetimes = "";

function dealWithKeyboard(e)
{

	typedchar = String.fromCharCode(e.charCode);
	
	var time = new Date().getTime();

	if(Seqs[trialId][0][curcharIndex]==typedchar)
	{
		typeDiv.innerHTML+=typedchar;
		curcharIndex++;
		seqDiv.innerHTML=generateSequens(Seqs[trialId][0],curcharIndex);
	}

	typestring+=typedchar+"";
	typetimes+=time+",";


	if(curcharIndex==12)//seq typed
	{
		curcharIndex=0;
		Seqs[trialId][3]=typestring;
		Seqs[trialId][4]=typetimes;
		console.log(Seqs[trialId]);
		trialId++;		
		seqDiv.innerHTML=generateSequens(Seqs[trialId][0],curcharIndex);
		typeDiv.innerHTML="";
		typestring="";
		typetimes="";

		

		if(trialId%2==0)
		{

			seqDiv.innerHTML="";
			typeDiv.innerHTML="";
			formHTML = 
			formHTML="<form name='questions'>";
			formHTML+="<input type='radio' name='ques' value='yes'>Yes<br>";
			formHTML+="<input type='radio' name='ques' value='no'>No</form>";
			formHTML+="<button id='answ' onclick='gonnext()'>Next »</button>";
			questDiv.innerHTML = formHTML;
		}

	}

	if(Seqs.length==trialId)//end of all trials
	{
		//TODO - ի՞նչ անել այսեղ
	}

}

//End of Trials



//Flow finctions
function step_partisipatinfo()
{
	var divv = document.getElementById("intro");
	divv.className="steps";
	var divv = document.getElementById("participantinfo");
	divv.className = "steps visible";
}

//TODO remove later
step_trials();
function step_trials()
{
	var divv = document.getElementById("participantinfo");
	divv.className="steps";
	var divv = document.getElementById("trials");
	divv.className = "steps visible";
	nextTrial();
	
}

function nextTrial()
{
	seqDiv.innerHTML=generateSequens(Seqs[trialId][0]);
	window.addEventListener("keypress", dealWithKeyboard, false);	
}

function gonnext()
{
	console.log(document.forms["questions"]["ques"].value);
	questDiv.innerHTML="";
	nextTrial();
}

function step_resume()
{
	var divv = document.getElementById("trials");
	divv.className="steps";
	var divv = document.getElementById("resume");
	divv.className = "steps visible";
}


//Helper functions
function randomizearray(t){
    var tt= t;
    var n = 0;
    var a = "";
    var b = "";
    var i = 0;
    for (i=0; i <= t.length-1; i++){
		n = Math.floor(Math.random()*t.length);
        a = tt[i];
        b = tt[n];
        tt[i] = b;
		tt[n] = a; 
	}
	return tt; 
}

function makeSequenseArray(inputarray,seqLen,number)
{
	
	var outputarray = [];
	while(1)
	{
		var i=0;
		var ofset=0;
		
		while(ofset<inputarray.length-seqLen)
		{
			while(i<inputarray.length-ofset-seqLen)
			{
				seq="";
				h=0;
				while(h<seqLen)
				{
					seq+=inputarray[i+ofset+h];
					h++;
				}
				
				if(outputarray.length==number)
				{
					return outputarray;
				}
				else
				{
					if(seq)
					{
						if(outputarray.indexOf(seq)<0)
							{
								outputarray.push(seq);
							}
					}
					
				}
				
				i++;
			}
			i=0;

			ofset++;
		}
		inputarray = randomizearray(inputarray);
	}
	
	return outputarray;

}

