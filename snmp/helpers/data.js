const fs = require('fs');

const readFile = () => {
    return new Promise((res, rej) => {
        fs.readFile('./data.json', 'utf-8', (err, jsonString) => {
            if(err){
                rej(false);
            }
            else{
                try{
                    const data = JSON.parse(jsonString);
                    res(data);
                }
                catch(error){
                    console.log("No se pudo convertir el archivo")
                    rej(false);
                }
            }
        });
    })
}

const writeFile = (obj) => {
    const jsonString = JSON.stringify(obj);
    
    fs.writeFile('./data.json', jsonString,'utf-8',(err) => {
        if(err){
            return false;
        }
    })
}

const saveHistory = (ip, status) => {
    return new Promise ((res, rej) => {
        const timeNow = Date.now();

        readFile()
        .then(data => {
            data[ip].history = {
                ...data[ip].history,
                [timeNow]: status
            }

            writeFile(data);

            res();
        })
    });
}

module.exports = {
    readFile,
    writeFile,
    saveHistory
}