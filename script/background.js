const bgLib = [
    "./../assets/imgs/m1.png",
    "./../assets/imgs/m2.png",
    "./../assets/imgs/m3.png",
    "./../assets/imgs/m4.png",
    "./../assets/imgs/m5.png",
    "./../assets/imgs/m6.png",
    "./../assets/imgs/m7.png",
    "./../assets/imgs/m8.png",
    "./../assets/imgs/m9.png",
    "./../assets/imgs/m10.png",
    "./../assets/imgs/m11.png",
    "./../assets/imgs/m12.png"
];

// const randomBackground = (lib) => Math.trunc((Math.random() * lib.length));
let counter = 0;

setInterval(() => {
    counter++;
    if (counter >= bgLib.length) counter = 0;
    document.body.style.backgroundImage = `url("${bgLib[counter]}")`;
    
    // document.body.style.backgroundImage = `url("${bgLib[randomBackground(bgLib)]}")`;
},2000);

//en random no se aprecia caer el codigo como en las pelis, por eso le he puesto un counter y en orden