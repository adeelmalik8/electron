/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const electron  = require('electron')
const url  = require('url')
const path  = require('path')

const {app, BrowserWindow}  = electron

let mainWindow 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.s
app.on('ready',_=>{
//    console.log("HI this is testing");
    mainWindow = new BrowserWindow()
    console.log(__dirname)
    
    mainWindow.loadURL(
            url.format({
                pathname:path.join(__dirname,'main.html'),
                protocal:'file',
                slashes: true
            })
     )
      // Emitted to set menu of teh applciation 
     mainWindow.setMenu(null)
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
         mainwindow.webContents.send('countdown',count)
     })

   
})



