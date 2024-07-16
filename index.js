import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static("public"));
app.use((bodyParser.urlencoded({extended:true})));

app.get("/",(req,res)=>{
    res.sendFile(_dirname + "/public/home.html");
})
app.post("/submit",async(req,res)=>{
    var url = await req.body["url"];
    var qrimg = qr.image(url,{ type: 'png' });
    res.type('png');
    qrimg.pipe(res);
});


app.listen(3000,()=>{
    console.log("listening for port 3000");
});