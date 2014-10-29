function step_partisipatinfo()
{
	var divv = document.getElementById("intro");
	divv.className="steps";
	var divv = document.getElementById("participantinfo");
	divv.className = "steps visible";
}


function step_trials()
{
	var divv = document.getElementById("participantinfo");
	divv.className="steps";
	var divv = document.getElementById("trials");
	divv.className = "steps visible";
}


function step_resume()
{
	var divv = document.getElementById("trials");
	divv.className="steps";
	var divv = document.getElementById("resume");
	divv.className = "steps visible";
}