
const http = require('http');
const path = require("path");
const fs  = require('fs');
const monent = require('moment');
function getPage(page){
    const filePath = path.join(__dirname, page);
    return fs.readFileSync(filePath);
}

function handleFiles(req, res){
    const fileType = path.extname(req.url) || '.html';
    if (fileType === '.html'){
     res.setHeader('Content-Type', 'text/html');
     res.writeHead(200);
     if (req.url === '/'){
         res.write(getPage('index.html'));
     }else{
         res.write(getPage(`${req.url}.html`));
     }
     res.end();
    }else if(fileType === '.css') {
     res.setHeader('Content-Type', 'text/css');
     res.writeHead(200);
     res.write(getPage(req.url));
     res.end();

     }else{
     res.writeHead(404);
     res.end();
    }
}
function getData(url){
    let data;
    if (url === '/apis/users'){
        data = [{ name: 'Tola '}, { name: 'John'}];
    }else if(url === '/apis/posts'){
        data = [{
            title: 'A',
             publishedDate: monent().startOf('day').fromNow()
        },
        {
            title: 'B',
            publishedDate: monent().set('month', 1).startOf('day').fromNow()
        }
    ]
    }
    return data;
}
function handleAPIs(req, res){
    let data = getData(req.url);
    if (data){
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
    }else{
        res.writeHead(404);
    }
    res.end();
}

http.createServer((req,res)=>{
    if (req.url.startsWith('/apis/')){
        handleAPIs(req, res);
    }else{
        handleFiles(req,res);
    }
}).listen(3000);





































// const { sayHello, calculateVat } = require('./utils');





// sayHello();
// const vat7 = calculateVat(100,7);
// console.log(vat7);

// console.log(__filename, __dirname);

// //Path 
// const path = require("path");
// //for to get file name
// console.log("This is a file name: ",path.basename(__filename));
// //for to get dir name or folder
// console.log("This folder :", path.dirname(__filename));
// //surname of file 
// console.log("This extension name: ", path.extname(__filename));
// //return object of file
// console.log(path.parse(__filename));

// // Join alot of file together
// console.log(path.join(__dirname, 'utils.js'));


// //File Systems
// const fs = require('fs');
// //for to create or write file with writeFileSync ทำมันตอนนั้นเลย

// //fs.writeFileSync(path.join(__dirname, 'data.txt'), 'Hello')

// //writeFileUnsync
// //fs.writeFile(path.join(__dirname, 'datas.txt'), 'Hello Writing', ()=>{
// //    console.log("Finished writing file");
// //});
// //use function for to writing file 

// console.log(fs.readFileSync(path.join(__dirname, 'datas.txt'), 'utf-8'));

// //OS Method

// const os = require('os');
// console.log(os.cpus());
// console.log(os.hostname());
// console.log(os.homedir());
// console.log(os.uptime())
// console.log(os.platform());

// //Events 
// const events = require('events');
// const EventEmitter = events.EventEmitter;
// const connect = new EventEmitter();
// connect.on('online', ()=>{
//     console.log('A new user has connected');
// }); 

// connect.emit('online');

// var encode = require( 'hashcode' ).hashCode;
// var hash = encode().value( "my string value" );
// console.log("This is a hash codes: ",hash);