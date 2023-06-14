var current_time = document.getElementById("current-time");
var midday = document.getElementById("midday");
var hourInput = document.getElementById("hourInput");
var minuteInput = document.getElementById("minuteInput");
var secondInput = document.getElementById("secondInput");
var ampm = document.getElementById("am/pm");
const setAlarm = document.getElementById("set");
const alarm_container = document.getElementById('alarm-container');

//array of alarms made by user
let alarmArray = [];

//Append zeroes for single digit
var appendZero = (value) => (value < 10 ? "0" + value : value);

//To continuosly update current time and check alarms
function displayTime(){
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var AmPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = appendZero(hours);
    minutes = appendZero(minutes);
    seconds = appendZero(seconds);
    var strTime = hours + ':' + minutes + ':'+seconds +'  '+ AmPm.toUpperCase();
    current_time.innerHTML = strTime;
    alarmOn();
}

//this checks if its time to alert about alarm
function alarmOn(){
    for(let alarm of alarmArray){
        let alarmTime = alarm.hour + ':' + alarm.minute + ':'+ alarm.second +'  '+alarm.AP.toUpperCase();
        if(alarmTime == current_time.innerHTML){
            alert("WAKE UP!!!!!! , Its Time");
        }
    }
     
}

//function to add Alarm 
function addAlarm(){
    let alarmObj = {};
    alarmObj.hour = appendZero(hourInput.value);
    alarmObj.minute = appendZero(minuteInput.value);
    alarmObj.second = appendZero(secondInput.value);
    alarmObj.AP = ampm.value;
    let id =  alarmObj.hour+alarmObj.minute+alarmObj.second+alarmObj.AP;  //unique id for an alarm
    alarmObj.id = id;
    
    alarmArray.push(alarmObj);

    let alarmDiv = document.createElement('div');
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute('id',id);
    alarmDiv.innerHTML = '<span>'+alarmObj.hour+':'+alarmObj.minute+':'+alarmObj.second+' '+alarmObj.AP.toUpperCase()+'</span>';
    
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.setAttribute('data-id',id);
    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteButton.addEventListener('click',(e)=>deleteAlarm(e));
    console.log(deleteButton);
    alarmDiv.appendChild(deleteButton);
    alarm_container.appendChild(alarmDiv);
    hourInput.value ='';
    minuteInput.value = '';
    secondInput.value = '';
    
}


//function to delete an alarm
function deleteAlarm(e){
    let id = e.target.parentElement.getAttribute('data-id');
    let delid = e.target.parentElement.parentElement.getAttribute('id');
    let index = 0;
    for(let alarm of alarmArray){
        if(id == alarm.id){
            break;
        }
        index++;
    }
    alarmArray.splice(index,1);
    let toDelete = document.getElementById(id);
    
    toDelete.remove();
    
}

setInterval(displayTime,1000);

setAlarm.addEventListener('click',addAlarm);

