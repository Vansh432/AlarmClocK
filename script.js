console.log("here Alarm clock");
// set the date section-->
//set date class and  element-->
let Hours = document.getElementById('Hours');
let Minutes = document.getElementById('Minutes');
let Seconds = document.getElementById('Seconds');
let AMorPM = document.getElementById('AMorPM');
let stopAlarm=document.getElementById('stopAlarm');
let audio = new Audio('despair-metal-trailer-109943.mp3');
let arrAlarm = [];


//set full formate of data-->
const dayDetails = document.getElementById('dayDetails');
dayDetails.innerText = new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
console.log(Hours.innerText + " " + Minutes + " " + Seconds);



//unsing setInterval for update the date after each 1sec. 
setInterval(() => {
    const date = new Date();
    Hours.innerText = date.getHours();
    Minutes.innerText = date.getMinutes();
    Seconds.innerText = date.getSeconds();
    AMorPM.innerText = Hours.innerText >= 12 ? 'PM' : 'AM';
    for (let i = 0; i < arrAlarm.length; i++) {
        if (arrAlarm[i].Hours == date.getHours() && arrAlarm[i].Minutes == date.getMinutes() && arrAlarm[i].Seconds == date.getSeconds()) {
           stopAlarm.style.display="inline";
           audio.play();
           deleteAlarm(i);
        }
    }

}, 1000);

//play Alarm Musics-->
function stopMusic(){
   audio.pause();
   stopAlarm.style.display="none";
}



// set Alarm sections-->
let HoursInput = document.getElementById('HoursInput');
let minutesInput = document.getElementById('minutesInput');
let secondsInput = document.getElementById('secondsInput');
let AM = document.getElementById('AM');
let PM = document.getElementById('PM');
let setvalue = document.getElementById('setvalue');


//set the alarm on click-->
setvalue.addEventListener('click', (e) => {
    e.preventDefault();
    let x = HoursInput.value;
    let y = minutesInput.value;
    let z = secondsInput.value;
    if (x < 0 || x > 24 || x == "") {

        alert("Enter the correct Hours between  0-23 (included)");
        return;
    }
    if (y < 0 || y > 60 || y == "") {
        alert("Enter the correct Minutes between 0-60 (included)");
        return;
    }
    if (z < 0 || z > 60 || z == "") {
        alert("Enter the correct Seconds 0-60 (included)");
        return;
    }
    let timeformat = 'AM';
    if (x >= 12) {
        timeformat = 'PM';
    }

    HoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';

    obj = {
        "Hours": x,
        "Minutes": y,
        "Seconds": z,
        "timefor": timeformat
    }
    arrAlarm.push(obj);
    pushAlarmList(arrAlarm);
});


//upcioming Alarms-->
let upcomingAlarm=document.getElementById('upcomingAlarm');



//push the alarm in the array-->
function pushAlarmList(arrAlarm) {
    upcomingAlarm.innerHTML = "";
  
    if (arrAlarm.length == 0) {
        upcomingAlarm.innerHTML = " <h3 >No Alarm Set</h3>";
        return;
    }
    let index = 0;
    for (let i = 0; i < arrAlarm.length; i++) {
        upcomingAlarm.innerHTML += `<h3>${arrAlarm[i].Hours} : ${arrAlarm[i].Minutes} : ${arrAlarm[i].Seconds} ${arrAlarm[i].timefor}  <button id="deletAlarm" onclick="deleteAlarm(${index++})">Delete</button></h3>
    `;
    }
}



// delete the alarm clock-->
function deleteAlarm(ind) {
    arrAlarm.splice(ind, 1);
    pushAlarmList(arrAlarm);
}




