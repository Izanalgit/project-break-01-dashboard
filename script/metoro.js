//APIKEY
const apiKey = "4f01b093cae44f84915164736240504";
const apiRoot = "https://api.weatherapi.com/v1/";

let citypersist = "";

//Enlaces DOM
const sectionmetAPP = document.getElementById("longapps");

let metApp = document.createElement("article");
metApp.id = "metoro";

sectionmetAPP.appendChild(metApp);

const metoroapp = document.getElementById("metoro");

//Estructura DOM

//DOM inicial del input de ciudad
const domSelCit = (
    `<div id="slectCity">
        <h4>Introduce tu ciudad:</h4>
        <input type="text" id="cities" name="cities">
        <button id="slctCitBtn" class="epicBtn"></button>
    </div>`
);


//Fetch: seleccionar ciudad + DOM pais
const getCity = async () => {
    let handsupCity =`${apiRoot}search.json?key=${apiKey}&q=${cities.value}&lang=es`;

    try {
        const response = await fetch(handsupCity);
        if (!response.ok) {
            alert(`ERROR: Fallo de conexión`);
            throw new Error(response.status);
        }
        const data = await response.json();
        if (data=="") {
            alert(`ERROR: No se encuentra "${cities.value}" ...`);
            cities.value = "";
            throw new Error("Conexion donne but City not found!");
        }
        renderSelectCit(data);
    } catch (error) {
        console.log(error);
    }
  };


//Fetch: seleccionar pais + DOM meteorologia
const getCountry = async (urlcity) => {
    let handsupCity =`${apiRoot}forecast.json?key=${apiKey}&q=${urlcity}&aqi=no&lang=es`;

    try {
        const response = await fetch(handsupCity);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        renderMeteoro(data);
    } catch (error) {
        console.log(error);
    }
  };

//Render 

//Render inicial
function initMetoroRender (){
    metoroapp.innerHTML=(
        `<h3>Estación meteorológica</h3>
        ${domSelCit}`
    );
    
    let cities = document.getElementById("cities");
    let slctCitBtn = document.getElementById("slctCitBtn");

    //Funcionalidad boton pais  
    slctCitBtn.addEventListener("click",()=>getCity());
    //Funcionalidad Enter pais    
    cities.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            getCity();
        }
    });
}

//Render: selección de ciudades
function renderSelectCit (city){
    //DOM Selector de ciudad -> HIDDE
    let slectCity = document.getElementById("slectCity");
    slectCity.style.display="none";

    //DOM Selector de pais
    let domSelCon = document.createElement("div");
    domSelCon.id="slectContry" 
    domSelCon.innerHTML = (
        `<h4>Selecciona el país:</h4>
        <select id="contries"></select>
        <button id="slctConBtn" class="epicBtn"></button>`
    );

    metoroapp.appendChild(domSelCon);
    
    let contries = document.getElementById('contries');
    
    //Relleno del selector con el objeto promesa "city" (stackoverflow: ese precioso generador de option)
    let optionList = contries.options;
    city.forEach((option) => {
        option.country==="Spain"?
        optionList.add(new Option("ESPAÑA", option.url)): //El buen meme jajaja
        optionList.add(new Option(option.country, option.url))
    });

    //Funcionalidad boton pais
    const slctConBtn = document.getElementById("slctConBtn");  
    slctConBtn.addEventListener("click",()=>{
        citypersist = contries.value;
        getCountry(citypersist);
    });
}

//Render: DOM con el objeto promesa "API de url_city"
function  renderMeteoro (city){
   
    //Enlaces al objeto
    const pais = city.location.country;
    const ciudad = city.location.name;
    const clima = city.current.condition.text;
    const imggen = city.current.condition.icon;
    const tmpgen = city.current.temp_c;
    const precip = city.current.precip_mm;
    const humedd = city.current.humidity;
    const viento = city.current.wind_kph;
    const previs = city.forecast.forecastday[0].hour;

    //DOM Selector de pais -> HIDDE
    let slectContry = document.getElementById("slectContry");
    slectContry.style.display="none";

    //DOM Info API Meteorologia
    //Clima actual
    let domMetoro = document.createElement("div");
    domMetoro.id="metorologia" 
    domMetoro.innerHTML = (
        `<div id="climaTitle">
            <h2>${ciudad}</h2>
            <h3>(${pais})</h3>
            <img src="${imggen}" alt="imagen clima">
        </div>   
        <div id="climaActual">
            <h3>${clima}</h3>
            <h4>Temperatura : ${tmpgen}ºC</h4>
            <h4>Precipitaciones : ${precip}mm</h4>
            <h4>Humedad : ${humedd}%</h4>
            <h4>Viento : ${viento}km/h</h4>
        </div>
        <div id="climaPrevision"></div>
        <button id="restCitBtn">Nueva ciudad</button>`
    );
    metoroapp.appendChild(domMetoro);

    //Clima prevision
    const climaPrevision = document.getElementById("climaPrevision");
    previs.forEach((hour)=>{
        let hours = document.createElement("div");
        hours.classList.add("horaprev");
        hours.innerHTML =(
            `<img src="${hour.condition.icon}" alt="imagen clima">
            <p>${hour.time.slice(11)}</p>
            <p>${hour.temp_c} ºC</p>`
        );
        climaPrevision.appendChild(hours);
    })

    //Funcionalidad boton reinicio ciudad
    const restCitBtn = document.getElementById("restCitBtn");  
    restCitBtn.addEventListener("click",()=>{
        initMetoroRender ();
        citypersist =  "";
    });
}

//Eventos

initMetoroRender ();
//Un if de localStorage con la ciudad?? -> func mirar localstorage 
//-> parametro en initrender para el if -> func borrar del localstorage en restCitBtn

//un refresh del utlimo fetch y rerender?? -> set interval con renderMeteoro([localStorage?]) cada hora 
setInterval(() => {
    if(citypersist){
        let metorologiaAutoRender = document.getElementById("metorologia");
        metorologiaAutoRender.remove();
        getCountry(citypersist);
    }
},300000);//faltaria un localstorage??
