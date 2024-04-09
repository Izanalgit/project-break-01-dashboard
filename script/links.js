//Enlaces DOM

const sectionlinkAPP = document.getElementById("longapps");

let linkAPP = document.createElement("article");
linkAPP.id = "links";

sectionlinkAPP.appendChild(linkAPP);

const linksapp = document.getElementById("links");

//Botón NAV
const navlin = document.querySelector("nav");

let linkAppBtn = document.createElement("button");
linkAppBtn.id = "blinks";
linkAppBtn.classList.add("navBtn");

navlin.appendChild(linkAppBtn);

//Estructura DOM

linksapp.innerHTML=(
    `<h3>Biblioteca de Enlaces</h3>
    <div>
        <input type="text" id="linkname" name="linkname" placeholder="Nombre">
        <input type="url" id="linkurl" name="linkurl" placeholder="www.ejemplo.com">
    </div>
    <button id="addLink">Añadir link</button>
    <ul></ul>
    <button id="eraseAll">Limpiar lista</button>`
);

const linkList = document.querySelector("#links ul");
const linkAddBtn = document.getElementById("addLink");
const eraseAll = document.getElementById("eraseAll");

//Almacenamiento
//bag/pocket/chest (demasiados rpgs creo) 
 
let linkBag = [[],[]];
const linkChest = () => localStorage.getItem("linkChest");  //Link localStorage
const linkCheck = () => linkChest()?true:false;             //Check localStorage

//Seguro url correcta
const urlCorrector =(url)=>!url.includes("https://") && !url.includes("http://")?`https://${url}`:url

//Devuelve contenido del localStorage o un mensage de vacio
function takeLinks (){
    if(!linkCheck())return "Aquí saldrá tu lista de links !";

    let linkPocket = JSON.parse(linkChest())

    if(!linkPocket[0].length || !linkPocket[1].length) return "Lista vacia..."

    return linkPocket;
}

//Añade imputs a la memoria volatil
function storageLinkBag (){
    let linkname = document.getElementById("linkname");
    let linkurl = document.getElementById("linkurl");

    //Control campos vacios
    if(!linkname.value || !linkurl.value || linkname.value===" " ||linkurl.value===" "){
        const mensgnull = "Campo vacio"
        
        alert(mensgnull)
        console.log(new Error(mensgnull))
        return;
    }
    
    //Control url valida
    if(!URL.canParse(urlCorrector(linkurl.value))){
        const mensValid = "No es una URL"
            
        alert(mensValid)
        console.log(new Error(mensValid))
        return;
    }
    
    //Control url realista
    const libUrlreal = [".com",".es",".org",".io",".co",".ca",".net",".us"];
    if(!libUrlreal.some((urlfrag)=>linkurl.value.includes(urlfrag))) alert("AVISO: Eso no parece una url eh!");

    //Control linkBag con mensaje vacio inicial
    if(linkBag.length !== 2){
        linkBag = [[],[]];

        linkBag[0][0] = linkname.value;
        linkBag[1][0] = linkurl.value;

        storageLinkChest(linkBag);
    }else{
        
        //Control url repetida
        if(linkBag[1].some((url)=>linkurl.value == url)){ 
            const mensgrepe = "Url repetida"
            
            alert(mensgrepe)
            console.log(new Error(mensgrepe))
            return;
        }

        linkBag[0].push(linkname.value);
        linkBag[1].push(linkurl.value);

        storageLinkChest(linkBag);
    }
}

//Actualiza el localStorage con la memoria volatil
function storageLinkChest (bag){
    localStorage.setItem("linkChest", JSON.stringify(bag));
}

//Elimina url de memoria volatil y actualiza localStorage
function eraseLink (link){

    if(link==="all"){
        linkBag = [[],[]];
    }else{
        linkBag[0].splice(link,1);
        linkBag[1].splice(link,1);
    }
    storageLinkChest(linkBag);
}

//Render

//Render inicial
function initLinkRender (){
    linkBag=takeLinks();
    cleanerLink();
    renderLink();
}

//Render de limpieza
function cleanerLink(){
    linkList.innerHTML=``;
}

//Render lista de links
function renderLink (){
    //Seguro lista urls campos perdidos
    if(linkBag[0].length !== linkBag[1].length){console.log(new Error("ADVERTENCIA: lista comprometida!!"));return;}
    
    //Render lista links con su boton
    for(let link=0 ; link<linkBag[0].length ; link++){
        let newLink = document.createElement("li")
        if(linkBag[0][link].length > 30){
            newLink.innerHTML=( 
                `<div class ="etcDiv">
                    <a href="${urlCorrector(linkBag[1][link])}" target="_blank">${linkBag[0][link]}</a>
                    <span class ="etcDots">...</span>
                </div> 
                <button class="deleteLink">Borrar</button>`
            );
        }else{
            newLink.innerHTML=( 
                `<a href="${urlCorrector(linkBag[1][link])}" target="_blank">${linkBag[0][link]}</a> 
                <button class="deleteLink">Borrar</button>`
            );
        }
        linkList.appendChild(newLink);
    }

    //Evento botones de borrar
    let deleteLinkBtn = document.querySelectorAll(".deleteLink");
    for(let but in deleteLinkBtn){
        if(but<deleteLinkBtn.length){
            deleteLinkBtn[but].addEventListener("click", () =>{
                eraseLink(but);
                cleanerLink();
                renderLink();
        });
        }
    }
    

    //Mensajes de lista sin inicializar
    if(linkBag.length !== 2 ){
        cleanerLink();
        linkList.innerHTML=`<li>${linkBag}</li>`;

    }
     //Mensajes de lista vacia
    if(!linkBag[0].length || !linkBag[1].length){
        linkBag=takeLinks();
        linkList.innerHTML=`<li>${linkBag}</li>`;
    }
}


//Eventos

//Renderizado inicial
initLinkRender();

//Boton añadir
linkAddBtn.addEventListener("click",()=>{
    storageLinkBag();
    cleanerLink();
    renderLink(); 
});

//Boton de borrar todo
eraseAll.addEventListener("click",()=>{
    eraseLink("all");
    cleanerLink();
    renderLink(); 
});