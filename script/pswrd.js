//Valores
const minpwd = 12; //quieres bajarlo, lo se
const maxpwd = 50;

let eventSecure = true;

//Enlaces DOM
const sectionpswAPP = document.getElementById("shortapps");

let pswApp = document.createElement("article");
pswApp.id = "pswrdapp";

sectionpswAPP.appendChild(pswApp);

const pswrdapp = document.getElementById("pswrdapp");

//Botón NAV
const navpwd = document.querySelector("nav");

let pswAppBtn = document.createElement("button");
pswAppBtn.id = "bpswrdapp";
pswAppBtn.classList.add("navBtn");

navpwd.appendChild(pswAppBtn);

//Esctructura DOM

pswrdapp.innerHTML = (
    `<h3>Generador de contraseñas</h3>
    <p>Derermina el tamaño con un valor entre ${minpwd} y ${maxpwd} :</p>
    <div id="pswimput" class="SlcWithBtn">
        <input type="number" placeholder="${minpwd}" id="pswlength" min="${minpwd}" max="${maxpwd}">
        <button id="setlength" class="epicBtn"></button>
    </div>
    <span id="paswd"></span>`
);

const setlength = document.getElementById("setlength");
const paswd = document.getElementById("paswd");

//Libreria generador pwds

const libPaswd = [
    ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    ["1","2","3","4","5","6","7","8","9","0"],
    ['!','@','#','$','%','^','&','*','(',')','-','_','=','+','?','¿','¡']
];

//Generador de pwds

const selector = (lib) => Math.trunc((Math.random() * lib.length));

const genchar = () => {
    const actuallib = libPaswd[selector(libPaswd)];
    return actuallib[selector(actuallib)];
}

function generator (pwdLength){

    let check = true;
    let secure = 0;
    while(check){
        
        let pwd = "";
        check = false;
        secure++;

        for (let i=0 ; i<pwdLength ; i++){
            pwd += genchar();
        }

        for (let lib of libPaswd){
            if(!lib.some(char=>pwd.includes(char))) check = true;
        }
        //Solo he tenido que cerrar el navegador una vez ;P
        if(secure >= 999){
            alert("no trastees con un while!");
            return "admin1234"
        }

        //mola ver la consola si bajas de 5 el minpwd
        //console.log(pwd);

        if (!check) return pwd;
    }
    
}

//Render
function cleanerPwd(){
    paswd.innerHTML=``;
}

function renderPwd (){
    let lngt = document.getElementById("pswlength");
    if((lngt.value >= minpwd) && (lngt.value <= maxpwd)){//Seguro rango pasw correcto
        // paswd.innerHTML=`${generator(lngt.value)}`;
        eventSecure = false;//Seguro cola de eventos
        thaHackPasRenderPro(generator(lngt.value),10);
    }else{
        alert("Trasteando el rango de la pasword?");
        paswd.innerHTML= "admin1234"
    }
}

//Event render

setlength.addEventListener("click",(()=>{
    if(eventSecure){//Seguro cola de eventos
        cleanerPwd();
        renderPwd();
    }    
}))

pswlength.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && eventSecure) {
        event.preventDefault();
        cleanerPwd();
        renderPwd();
    }
  });
  

//Ida de olla >;P

function thaHackPasRenderPro (pasword,repes){
    let borningPas = "";
    

    const timer = (ms) => new Promise((res) => setTimeout(res, ms))//Esta pasada no es mia, stackoverflow

    async function thaMagic () { 
        
        for (let char = 0; char < pasword.length; char++) {
            paswd.innerHTML=borningPas;
        
            for (let repe=0;repe<=repes;repe++){
                
                paswd.innerHTML=(
                    `<span style="color:greenyellow">${borningPas}</span><span style="color:white">${genchar()}</span>`
                );
                await timer(100);
                
            }
            borningPas += pasword.charAt(char);
            await timer(100);
        }
        paswd.innerHTML=pasword;
        eventSecure = true;//Seguro cola de eventos
    }
    thaMagic();
    //Codigo propio original:
    // for (let char=0;char<pasword.length;char++){
        
    //     paswd.innerHTML=borningPas;
        
    //     for (let repe=0;repe<=repes;repe++){
            
    //         paswd.innerHTML=`${borningPas}${genchar()}`
            
    //     }
    //     borningPas += pasword.charAt(char);   
    // }
    // paswd.innerHTML=pasword;

    //Evento copia de la contraseña
    paswd.addEventListener("click",()=>{
        navigator.clipboard.writeText(pasword);
        alert("Contraseña copiada!");
    })
}
