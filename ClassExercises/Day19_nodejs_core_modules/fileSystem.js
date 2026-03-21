const fs= require("fs").promises;
const fileOpration = async ()=>{
    try{
    const message="Node.js is simply awesome";
    fs.writeFile("feedback.txt",message);
    console.log("Data written successfully.");
    console.log("Reading file...");
    const data = await fs.readFile("feedback.txt","utf-8")
    console.log(data);
    
    }
    catch(error){
         console.log(error);
    }
}
fileOpration();