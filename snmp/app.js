const { readFile, writeFile, saveHistory } = require("./helpers/data.js");
const { menu, pause, addAgent, confirm, selectAgent, subMenu, searchOoid} = require("./helpers/inquirer.js");
const { oidNames } = require("./helpers/oids.js");
const { verEstado } = require("./helpers/snmp.js");
require('colors');

const main = async () => {
    let opt = '';

    opt = await menu();

    switch(opt){
        case '1':

            readFile()
                .then(async (data) => {
                    let options = [];
                    let keys = Object.keys(data);

                    keys.forEach(key => {
                        options.push(`${key} - ${data[key].alias}`)
                    })

                    let agent = await selectAgent(options)

                    let option = await subMenu();

                    switch(option){
                        case '1':
                            const status = {}

                            for (const key of Object.keys(oidNames)){
                                try{
                                    const value = await verEstado(agent, data[agent].community, oidNames[key])
                                    status[key] = value
                                }
                                catch{
                                    await pause();
                                    return main();
                                }
                            }

                            console.log(status);
                            await pause();

                            await saveHistory(agent,status);                            

                            return main();
                            break;
                        case '2':
                            
                            const ooid = await searchOoid();
                            let value;
                            try{
                                value = await verEstado(agent, data[agent].community, ooid)
                            }
                            catch{
                                console.log("No se encontro el ooid")
                            }
                            

                            console.log("valor: "+value)
                            await pause();

                            return main();
                            break;
                        case '3':

                            const history = data[agent].history

                            Object.keys(history).forEach(time => {
                                const DateTime = new Date(Number(time))
                                const year = DateTime.getFullYear();
                                const month = DateTime.getMonth();
                                const day = DateTime.getDay();
                                const hour = DateTime.getHours();
                                const minute = DateTime.getMinutes();
                                console.log(`${day}-${month}-${year} ${hour}:${minute}`.green);
                                console.log(history[time])
                            })


                            await pause();

                            return main();
                            break;
                    }
                })
            break;
        case '2':

            readFile()
                .then(async (data) => {
                    const {ip, community, alias} = await addAgent();

                    const isCorrect = await confirm(`Seguro que desea añadir el agente con IP ${ip}, comunidad ${community} y alias ${alias}`);
            
                    if(!isCorrect)
                        return main();

                    if(ip in data){
                        pause('El agente ya se encuentra registrado');
                    }
                    else{
                        data[ip] = {
                            community,
                            alias,
                            history: {}
                        }

                        writeFile(data);

                        pause('Agente Registrado');
                    }
                    
                    return main();
                })
            
            break;
        case '0':
            pause('Cerrando Programa')
            break;
    }
}


main();