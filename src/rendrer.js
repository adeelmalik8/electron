const electron  = require('electron')
var fs = require('fs');
const ipc  = electron.ipcRenderer
document.getElementById('saveconfig').addEventListener('click',_=>{
  //  console.log("countdown-start ")
//  /  var centerId = document.getElementById('centerid').value
  //  console.log(centerId)
    // ipc.send('countdown-start')
   // let inputEmail  =  document.getElementById('inputemail').value
   // console.log(inputEmail)
  //  let APIKey  =  document.getElementById('apikey').value;
  //  let Bucket  =  document.getElementById('bucket').value;
//    let OnlinesServe  =  document.getElementById('OnlinesServe').value;
//    let OfflineServer  =  document.getElementById('OfflineServer').value;
//    let LogDirectorys  =  document.getElementById('LogDirectorys').value;
//    let MasterDirectory  =  document.getElementById('MasterDirectory').value;
//    let SlaveDirectory  =  document.getElementById('SlaveDirectory').value;
     /////
     
   //reset values    
//    document.getElementById('CenterID').value = ''
//    document.getElementById('InputEmail').value = ''
//    document.getElementById('APIKey').value = ''
//    document.getElementById('Bucket').value = ''
//    document.getElementById('OnlinesServe').value = ''
//    document.getElementById('OfflineServer').value = ''
//    document.getElementById('LogDirectorys').value = ''
//    document.getElementById('MasterDirectory').value = ''
//    document.getElementById('SlaveDirectory').value = ''
    var stdData = {CenterID:centerId, InputEmail:inputEmail, APIKey:APIKey,Bucket:Bucket,OnlinesServe:OnlinesServe,OfflineServer:OfflineServer,LogDirectorys:LogDirectorys,MasterDirectory:MasterDirectory,SlaveDirectory:SlaveDirectory};
    var StdJson = JSON.stringify(stdData);

       fs.writeFile("config.json", StdJson, (err) => {
            if (err) {
                alert("An error ocurred updating the file" + err.message);
                console.log(err);
                return;
            }

            alert("The file has been succesfully saved");
        });
  // }
    
})
// ipc.on('countdownobj',(evt,obj)=>{
//     //console.log(countobj);
//     console.log("event file");
// })
ipc.on('countdown',(evt,count)=>{
    document.getElementById('count').innerHTML = count
    console.log("adeel islam ")
    // fs.writeFile("adeel.txt", "MUhammad Adeel islam", (err) => {
    //     if(err){
    //         console.log("An error ocurred creating the file "+ err.message)
    //     }
                    
    //     console.log("The file has been succesfully saved");
    // });

    
})

ipc.on('setfiledata',(evt,count)=>{
console.log("Hu testing ");
    //document.getElementById('count').innerHTML = count
    // fs.writeFile("adeel.txt", "MUhammad Adeel islam", (err) => {
    //     if(err){
    //         console.log("An error ocurred creating the file "+ err.message)
    //     }
                    
         console.log("The file has been adeel  succesfully saved");
    // });

    
})



    