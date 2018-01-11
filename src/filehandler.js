const electron  = require('electron')
var fs = require('fs');
const ipc  = electron.ipcRenderer
const ipcMain  = electron.ipcMain
document.getElementById('btnsubmit').addEventListener('click',_=>{
   
    let stdName  =  document.getElementById('name').value;
    let stdFatherName  =  document.getElementById('fname').value;
    var stdData = {firstName:stdName, lastName:stdFatherName, age:46};
    var StdJson = JSON.stringify(stdData);
   // alert(stdName);
   if (fs.existsSync("adeel.txt")) {
    
   }else{
       fs.writeFile("adeel.txt", StdJson, (err) => {
            if (err) {
                alert("An error ocurred updating the file" + err.message);
                console.log(err);
                return;
            }

            alert("The file has been succesfully saved");
        });
   }
})


ipc.on('query', function (event, value) {
  console.log(value);
     console.log("The file has been succesfully saved");
  //document.querySelector('input[name="name"').value = "adeel islam"
});

    