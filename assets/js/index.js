/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const electron  = require('electron')
const url       = require('url')
const path      = require('path')

const {app, BrowserWindow}  = electron
const fs = require('fs')

const readhandling = require('./readhandling.js')
const ipc  = electron.ipcMain


let mainWindow 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.s
app.on('ready',_=>{
//    console.log("HI this is testing");
console.log("Hi i am testing electron app");
    mainWindow = new BrowserWindow()
    
    dirname = process.cwd()+"/src";
    //console.log("path to folder is"+dirname)
    mainWindow.loadURL(
            url.format({
                pathname:path.join(dirname ,'main.html'),
                protocal:'file',
                slashes: true
            })
     )
      // Emitted to set menu of teh applciation 
     mainWindow.setMenu(null)
     
     mainWindow.webContents.on('did-finish-load', function() {
         // read file 
         fs.exists('./config.json', (exists) => {
           // console.log(exists ? 'it\'s there' : 'no passwd!');
            if(exists){
                
                fs.readFile("./config.json", 'utf-8', (err, data) => {
                    if(err){
                        console.log("An error ocurred reading the file :" + err.message);
                        return;
                    }
                    // Change how to handle the file content
                        var obj = JSON.parse(data)
                        console.log(obj);
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="CenterID"]').value="`+obj.centerid+`"`)
                })
                
            }else{
                console.log("no file")
            }
            
            
          });
         
     
     })
     
      
      
     // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
})


ipc.on("countdown-start",_ =>{
    console.log("HI testing Click Count Down");
     countdown(count=>{
    //       console.log("count,",count)
         mainWindow.webContents.send('countdown',count)
     })

   
})

