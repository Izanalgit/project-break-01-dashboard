let bgLib = [];
for(let imgs=0;imgs<50;imgs++){
 bgLib.push(`./assets/imgs/m-${imgs}.png`)
}

// const randomBackground = (lib) => Math.trunc((Math.random() * lib.length));
let counter = 0;

setInterval(() => {
    counter++;
    if (counter >= bgLib.length) counter = 0;
    document.body.style.background = `black url("${bgLib[counter]}")`;
    
    // document.body.style.background = `black url("${bgLib[randomBackground(bgLib)]}")`;
},100);


//Evento botones NAV
const mainDOM = document.querySelector("main");

const navButtons = document.querySelectorAll(".navBtn");
const homeBtn = document.getElementById("homeBtn");

const allarticles = document.querySelectorAll("article");

//Botones Apps
for(let but in navButtons){
    if(but<navButtons.length){
        navButtons[but].addEventListener("click", () =>{
            
            mainDOM.classList.add("centerApps");
            homeBtn.classList.remove("hidden");

            let actualArt = navButtons[but].id.slice(1);
            let actualApp = document.getElementById(actualArt);
            actualApp.style.display="flex";

            let containerApp = document.querySelector(`#shortapps:has(> #${actualApp.id})`);
            containerApp?
            mainDOM.classList.add("centerShortApp"):
            mainDOM.classList.remove("centerShortApp");

            for(let artcl of allarticles){
                if(artcl.id!==actualArt){
                    artcl.style.display="none";
                }
            }

            //Efecto Active
            let lastBtn = document.getElementsByClassName("active");
            if(lastBtn[0])lastBtn[0].classList.remove("active");
            navButtons[but].classList.add("active");
    });
    }
}

//Boton Home
homeBtn.addEventListener("click",()=>{
    mainDOM.classList.remove("centerApps");
    homeBtn.classList.add("hidden");
    mainDOM.classList.remove("centerShortApp");
    for(let artcl of allarticles)artcl.style.display="flex";
    
    let lastBtn = document.getElementsByClassName("active");
    if(lastBtn[0])lastBtn[0].classList.remove("active");
})