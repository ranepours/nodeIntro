const fs = require('fs');
const process = require('process');
const axios = require('axios');

//handle output
const handleOutput = (text,out) => {
    if(out){
        fs.writeFile(out,text,'utf8',function(err){
            if(err){
                console.log(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        })
    } console.log(text);
}

//read file at path and print it out
const cat = (path,out) => {
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1)
        } handleOutput(data,out);
    })
}

//read page at url and print it out
async function webCat(url,out){
    try{
        let res = await axios.get(url);
        handleOutput(res.data,out);
    } catch(err){
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if(process.argv[2] === "--out"){
    out = process.argv[3];
    path = process.argv[4];
} path = process.argv[2];

if(path.slice(0,4) === "http"){
    webCat(path,out)
} cat(path,out)