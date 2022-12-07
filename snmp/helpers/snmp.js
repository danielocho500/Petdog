var snmp = require ("net-snmp");

const verEstado = (ip, community, oid) => {
    return new Promise((res,rej) => {
        var session = snmp.createSession (ip, community); 

        session.get ([oid], function (error, varbinds) {
            if (error) {
                console.log("No se pudo conectar con el agente");
                rej();
            } else {
                res(varbinds[0].value)
            }
            session.close ();
        });
    })
}

module.exports = {
    verEstado
}
