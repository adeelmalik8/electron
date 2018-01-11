//handle setupevents as quickly as possible
//const setupEvents = require('./installers/setupEvents')
//if (setupEvents.handleSquirrelEvent()) {
//  // squirrel event handled and app will exit in 1000ms, so don't do anything else
//  return;
//}
const url       = require('url')
const fs = require('fs')
const electron = require('electron')
// Module to control application life.
const app = electron.app
//const ipc  = electron.ipcMain
var path = require('path')
const countdown = require('./assets/js/countdown.js')
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//Adds the main Menu to our app
const ipc  = electron.ipcMain
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let secondWindow

function createWindow () {
    console.log("Hi this is testing app")
  // Create the browser window.
  mainWindow = new BrowserWindow({titleBarStyle: 'hidden',
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
    backgroundColor: '#312450',
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  // and load the index.html of the app.
  //console.log(__dirname)
 // mainWindow.loadURL(`file://${__dirname}/main.html`)
mainWindow.loadURL(
            url.format({
                pathname:path.join(__dirname ,'main.html'),
                protocal:'file',
                slashes: true
            })
     )

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()


  // Show the mainwindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

mainWindow.setMenu(null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow)
app.on('ready',_=>{
    createWindow()
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
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="CenterID"]').value="`+obj.CenterID+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="InputEmail"]').value="`+obj.InputEmail+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="APIKey"]').value="`+obj.APIKey+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="Bucket"]').value="`+obj.Bucket+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="OnlinesServe"]').value="`+obj.OnlinesServe+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="OfflineServer"]').value="`+obj.OfflineServer+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="LogDirectorys"]').value="`+obj.LogDirectorys+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="MasterDirectory"]').value="`+obj.MasterDirectorys+`"`)
                    mainWindow.webContents.executeJavaScript(`document.querySelector('input[name="SlaveDirectory"]').value="`+obj.SlaveDirectory+`"`)
                })
                
            }else{
                console.log("no file")
            }
            
            
          });
     })
     })


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipc.on("countdown-start",_ =>{
    console.log("HI testing Click Count Down");
     countdown(count=>{
           console.log("count,",count)
         mainwindow.webContents.send('countdown',count)
     })

   
})