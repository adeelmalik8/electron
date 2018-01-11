const electron  = require('electron')
const fs  = require('fs')

const app  = electron.app
const BrowserWindow = electron.BrowserWindow
const countdown = require('./countdown.js')
const setfiledata = require('./setfiledata.js')

const ipc  = electron.ipcMain

let mainwindow
app.on("ready",_ =>{
console.log("Hi i am testing electron app");
   mainwindow = new BrowserWindow({
        height:400,
        width:400
    })
    console.log(__dirname);
    let fileUrl  = __dirname +"/test.html";
    mainwindow.loadURL('file://'+fileUrl);
    //countdown()
    mainwindow.on("closed",_ =>{
        console.log("Application is closing");
        mainwindow = null
    });

    // file reading
mainwindow.webContents.on('did-finish-load', function() {
  //         console.log("Hi testing");
mainwindow.webContents.executeJavaScript(`document.querySelector('input[name="name"]').value="Adeel islam"`, function (result) {
  console.log(result)
})
       // if (fs.existsSync("adeel.txt")) {
          fs.readFile("config.json", 'utf-8', (err, data) => {
            if(err){
                console.log("An error ocurred reading the file :" + err.message);
                return;
            }

            // Change how to handle the file content
            var obj = JSON.parse(data)
            console.log(obj);
            // mainwindow.webContents.send('SetFileData',obj)
             mainwindow.webContents.executeJavaScript(`
                var ipcRenderer = require('electron').ipcRenderer;
                var value = " document.getElementById('name').value =obj.firstName"
                ipcRenderer.send('query', value);
            `);
            //   mainwindow.webContents.executeJavaScript(
            //      'console.log("hello");',
            //      result => {
            //         document.querySelector('input[name="name"]').value="Adeel islam"
            //      console.log('...finished');
            //  });
                    // window.webContents.executeJavaScript(`document.querySelector('input[name="name"]').value`="Adeel islam")
            // document.getElementById('name').value =obj.firstName;
            // document.getElementById('fname').value =obj.lastName;
            //console.log("The file content is : " + data);
        });
         console.log("File Found");
    // }else{
    //     console.log("File Not Found");
    // }
 });
});

ipc.on('query', function (event, value) {
 // console.log(value);
  // mainwindow.webContents.send('SetFileData',value)
    setfiledata(value=>{
         //  console.log(value)
          mainwindow.webContents.send('setfiledata',value)
      })

});


ipc.on("countdown-start",_ =>{
    console.log("HI testing Click Count Down");
     countdown(count=>{
    //       console.log("count,",count)
         mainwindow.webContents.send('countdown',count)
     })

   
})



