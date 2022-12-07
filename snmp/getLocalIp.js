const { internalIpV4 } = require("internal-ip")

const getLocalIp = async () => {
    const ip = await internalIpV4();
    return getLocalIp;
}

module.exports = {
    getLocalIp
}