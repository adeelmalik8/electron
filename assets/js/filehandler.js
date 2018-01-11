const electron  = require('electron')
const fs = require('fs');
const ipc  = electron.ipcRenderer

document.getElementById('btnsubmit').addEventListener('click',_=>{
    alert("File clicked");
    let stdName  =  document.getElementById('name').value;
    let stdFatherName  =  document.getElementById('fname').value;
    var stdData = {firstName:stdName, lastName:stdFatherName, age:46};
    var StdJson = JSON.stringify(stdData);
   // alert(stdName);
   if (fs.existsSync("adeel.txt")) {
       
       alert("File found");
       
   }else{
       
       fs.writeFile("adeel.txt", StdJson, (err) => 
               
            if (err) {
                alert("An error ocurred updating the file" + err.message);
                console.log(err);
                return;
            }
            alert("The file has been succesfully saved");
        });
        
   }
})

window.ipc = window.ipc || {},
function(n) {
    function (){
    }

}(jQuery);




    