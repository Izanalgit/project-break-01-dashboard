//Enlaces DOM
const sectionclkAPP = document.getElementById("shortapps");

let clkApp = document.createElement("article");
clkApp.id = "clockapp";

sectionclkAPP.appendChild(clkApp);

const clockapp = document.getElementById("clockapp");

//Botón NAV
const navclo = document.querySelector("nav");

let clockAppBtn = document.createElement("button");
clockAppBtn.id = "bclockapp";
clockAppBtn.classList.add("navBtn");

navclo.appendChild(clockAppBtn);

//Fecha
const time = () =>{
    let fulldate = new Date();
    const date = {
        hour : fulldate.getHours(),
        minu : fulldate.getMinutes(),
        secs : fulldate.getSeconds(),

        day : fulldate.getDate(),
        mth : fulldate.getMonth(),
        yar : fulldate.getFullYear(),

        fullH : function(){return`${crt(this.hour)} : ${crt(this.minu)} : ${crt(this.secs)}`},
        fullD : function(){return`${crt(this.day)} / ${crt(this.mth)} / ${crt(this.yar)}`}
    }

    return date;
}
//Frases
const phrase = [
    "Es hora de descansar. Apaga y sigue mañana",
    "Buenos días, desayuna fuerte y a darle al código",
    "Echa un rato más pero no olvides comer",
    "Espero que hayas comido",
    "Buenas tardes, el último empujón",
    "Esto ya son horas extras, ... piensa en parar pronto",
    "Buenas noches, es hora de pensar en parar y descansar"
]

//Rangos hora
function phrasetimer(actualhour){
    if (actualhour<7)return 0;      //00-07
    if (actualhour<12)return 1;     //07-12
    if (actualhour<14)return 2;     //12-14
    if (actualhour<16)return 3;     //14-16
    if (actualhour<18)return 4;     //16-18
    if (actualhour<22)return 5;     //18-22
    return 6;                       //22-00
}
//Corrector
const crt = (data) =>data<10?"0"+data:data;

//Render
function cleanerClock(){
    clockapp.innerHTML=``;
}
function renderClock(){
    clockapp.innerHTML=(
        `<div id="timer">
            <h2>${time().fullH()}</h3>
            <h4>${time().fullD()}</h4>
        </div>
        <h4>${phrase[phrasetimer(time().hour)]}</h4>`
    );
}

//Bucle 1s
setInterval(() => {
    cleanerClock();
    renderClock();
},1000);


//Tester de Consola
// console.clear()
// console.log(time().fullH())
// console.log(time().fullD())
// console.log(phrase[phrasetimer(time().hour)])