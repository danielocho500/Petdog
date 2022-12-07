var inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: 'Monitorear Agente'
            },
            {
                value: '2',
                name: 'Agregar agente de moniitoreo'
            },
            {
                value: '0',
                name: 'Cerrar Programa'
            }
        ]
    }
]

const menu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white );
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(questions);
    
    return opcion;
}

const pause = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const input = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const confirm = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const addAgent = async () => {
    console.clear();

    let ipRegex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
    
    const questions = [{
        type: 'input',
        name: 'ip',
        message: 'Agrega la ip a monitorear',
        validate(value){
            if(ipRegex.test(value))
                return true
            else 
                return 'Agrega una IP válida'
        }
    },
    {
        type: 'input',
        name: 'community',
        message: 'Agrega la comunidad',
        validate( value ) {
            if( value.length === 0 ) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'alias',
        message: 'Agrega el Alias del equipo',
        validate( value ) {
            if( value.length === 0 ) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }
    ]

    const {ip, community, alias} = await inquirer.prompt(questions);

    return {ip, community, alias}
}

const selectAgent = async (choices) => {
    console.clear();

    console.log(choices)

    const {agent} = await inquirer.prompt([
        {
            type: "list",
            message: "Selecciona el Agente",
            name: "agent",
            choices,
            validate(value){
                return true;
            }
        }
    ])

    return agent.split(' ')[0];
}   

const subMenu = async () => {
    console.clear()

    const options = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: '1',
                    name: 'Ver estado agente'
                },
                {
                    value: '2',
                    name: 'Consultar OOID Especifico'
                },
                {
                    value: '3',
                    name: 'Ver historial'
                },
                {
                    value: '4',
                    name: 'Modificar Agente'
                },
                {
                    value: '0',
                    name: 'Cerrar Programa'
                }
            ]
        }
    ]   

    const {opcion} = await inquirer.prompt(options);
    
    return opcion;
}

const searchOoid = async () => {
    console.clear();

    const regExOoid = new RegExp(/^([0-2])((\.0)|(\.[1-9][0-9]*))*$/)

    const {opcion} = await inquirer.prompt([{
        type: "input",
        name: "opcion",
        message: "Ingresa el ooid: ",
        validate( value ) {
            if( !regExOoid.test(value)) {
                return 'Por favor ingrese un ooid valido';
            }
            return true;
        }
    }])
    
    return opcion;
}

module.exports = {
    menu,
    pause,
    input,
    confirm,
    addAgent,
    selectAgent,
    subMenu,
    searchOoid
}