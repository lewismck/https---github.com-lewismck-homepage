//Used for both clocks so have greater scope
var today=new Date();
var h=today.getHours();
var m=today.getMinutes();
var s=today.getSeconds();
m = checkTime(m);
s = checkTime(s);
var greeting = "";
if(h < 12){
	greeting = "Good Morning";
}
if(h > 11){
	greeting = "Good Afternoon";
}
if(h > 17){
	greeting= "Good Evening";
}
if(h > 20){
	greeting = "It's Night Time";
}

//start the regular clock
function startTime() {
    document.getElementById('time').innerHTML = h+":"+m+":"+s +"<br> <br>" + greeting;
    var t = setTimeout(function(){startTime()},500);
	backgroundSwitch(h);
}

//Prefix 0 to numbers < 10
function checkTime(i) {
    if (i<10) {i = "0" + i};  
    return i;
}

//fuzzy clock totally scrappy no thought put into this 
//but hey I'll make it neat soon I've got videogames to play
function fuzzyTime() {
	var newH = 0;
	//keep h 12 hour
	if(h > 11){
		newH = h-12;
	}
	else{
		newH = h;
	}
	
	if(m < 15){
		document.getElementById('time').innerHTML = "About: "+newH+" o'clock"+"<br> <br>" + greeting;
	}
	if(m > 14){
		document.getElementById('time').innerHTML = "About: quarter past "+newH+"<br> <br>" + greeting;
	}
	if(m > 29){

		document.getElementById('time').innerHTML = "About: half past "+newH+"<br> <br>" + greeting;
	}
	if(m > 44){
		var nextH = newH+1
		document.getElementById('time').innerHTML = "About: quarter to "+nextH+"<br> <br>" + greeting;
	}
	
	var t = setTimeout(function(){fuzzyTime()},500);
	backgroundSwitch(h);
	
}

//background switcher
function backgroundSwitch(i){
	var brighton = 'url("stylesheets/b.jpg")';
	var morning = 'url("stylesheets/a.jpg")';
	var evening = 'url("stylesheets/c.jpg")';
	
	if(i < 18){
		document.body.style.background = morning
	}
	else if(i > 17){	
		document.body.style.background = evening;
	}
	else{ //pointless but the image is there.
		document.body.style.background = brighton;
	}

}

//Set the clock to regular - called if local 'clock' storage is empty.
function chooseTime(){
    var d=new Date();
    var h=d.getHours();
	backgroundSwitch(h);
	//console.log("test");
	populateStorage('clock','regular');
	
}

//method to fill storage
function populateStorage(id, value){
	localStorage.setItem(id, value);
}

//check the local storage and set clock accordingly
function checkStorage(){
	if(!localStorage.getItem('clock')){
		chooseTime();
	}
	if(localStorage.getItem('clock') == "fuzzy"){
		fuzzyTime();
	}
	if(localStorage.getItem('clock') == "regular"){
		startTime();
	}
}

//clear all local storage
function clearStorage(){
	localStorage.clear();
}

//switch the current clock to the alternative
function switchClock(){
	if(localStorage.getItem('clock') == 'fuzzy'){
		populateStorage('clock','regular');
		//startTime();
		location.reload();
	}
	else if(localStorage.getItem('clock') == 'regular'){
		populateStorage('clock','fuzzy');
		//fuzzyTime();
		location.reload();
	}
}