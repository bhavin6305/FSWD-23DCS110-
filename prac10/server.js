import express from "express";
import fs from "fs";
import path from "path";


const app=express();
const PORT=5000;

const logfilePath=path.join(process.cwd(),"error.log");

app.get('/log',(req,res)=>{
    fs.readFile(logfilePath, "utf8", (err,data)=>{
        if(err){
            console.error("Error reading file:", err.message);

            if(err.code==="ENOENT"){
                return res.status(404).send("<h2>Log file not found</h2>");
            }
           
            return res.status(500).send("<h1>Unable to read log file</h1>");
        }
        res.send(`
            <html>
                <head>
                    <title>Error Logs</title>
                    <style>
                     body { font-family: monospace; background: green; color: #eef; padding: 20px; }
            pre { background: #1e1d1e; padding: 15px; border-radius: 5px; overflow-x: auto; }
                    
                    </style>
                </head>

                <body>
                    <h2>Server Error Logs</h2>
                    <pre>${data}</pre>

                </body>
            </html>

            `);
    });
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}/log`);
})