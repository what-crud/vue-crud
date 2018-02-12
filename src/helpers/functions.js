function parseIntIfNumber(str){
    return !/\D/.test(str) ? parseInt(str) : str;
}

export {
    parseIntIfNumber
}