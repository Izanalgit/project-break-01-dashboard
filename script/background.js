const bgLib = [
    "./assets/imgs/m1.png",
    "./assets/imgs/m2.png",
    "./assets/imgs/m3.png",
    "./assets/imgs/m4.png",
    "./assets/imgs/m5.png",
    "./assets/imgs/m6.png",
    "./assets/imgs/m7.png",
    "./assets/imgs/m8.png",
    "./assets/imgs/m9.png",
    "./assets/imgs/m10.png",
    "./assets/imgs/m11.png",
    "./assets/imgs/m12.png"
];

// const randomBackground = (lib) => Math.trunc((Math.random() * lib.length));
let counter = 0;

setInterval(() => {
    counter++;
    if (counter >= bgLib.length) counter = 0;
    document.body.style.background = `black url("${bgLib[counter]}")`;
    
    // document.body.style.background = `black url("${bgLib[randomBackground(bgLib)]}")`;
},400);


//Evento botones NAV

const navButtons = document.querySelectorAll(".navBtn");

const homeBtn = document.getElementById("homeBtn");
homeBtn.style.display="none";

const allarticles = document.querySelectorAll("article");

//Botones Apps
for(let but in navButtons){
    if(but<navButtons.length){
        navButtons[but].addEventListener("click", () =>{
            
            homeBtn.style.display="block";

            let actualArt = navButtons[but].id.slice(1);
            let actualApp = document.getElementById(actualArt);
            actualApp.style.display="flex";
        
            for(let artcl of allarticles){
                if(artcl.id!==actualArt){
                    artcl.style.display="none";
                }
            }
    });
    }
}

//Boton Home
homeBtn.addEventListener("click",()=>{
    homeBtn.style.display="none";
    for(let artcl of allarticles)artcl.style.display="flex";
})