const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const indexDom = fs.readFileSync("./index.html","utf8");

const server = http.createServer((req,res)=>{

    let filePath = "."+req.url;
    if (filePath === "./"){
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(indexDom, "utf-8");
        res.end();
        console.log("DOM : index page loaded.")
    }else if(filePath.includes("?page=")){
        let posi = req.url.indexOf("=");
        let page = req.url.slice(posi+1)
        
        let eventBut =`
            <script>
                document.getElementById("${"b"+page}").click();
            </script>
        `;
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(indexDom, "utf-8");
        res.write(eventBut, "utf-8");
        res.end();
        console.log(`DOM : loaded with ${page} parameter.`);
    }else{
        let extension = path.extname(filePath);
        let file;
        let fileStream;
        switch (extension){
            case ".js":
                file = fs.readFileSync(filePath,"utf8");
                res.writeHead(200, {"Content-Type": "text/javascript; charset=utf-8"});
                res.end(file, "utf-8");
                console.log(`Script : ${filePath} loaded.`);
                break;
            case ".css":
                file = fs.readFileSync(filePath,"utf8");
                res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
                res.end(file, "utf-8");
                console.log(`Style : ${filePath} loaded.`);
                break;
            case ".png":
                fileStream = fs.createReadStream(filePath);
                return fileStream.pipe(res);
            case ".ico":
                fileStream = fs.createReadStream(filePath);
                return fileStream.pipe(res);
        }
    }

})

server.listen(0,()=>{
    console.log(`Server running on http://localhost:${server.address().port}`)
})
