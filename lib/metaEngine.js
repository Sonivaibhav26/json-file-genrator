let stringEngine = require('./stringEngine'),
    objectEngine = require('./objectEngine'),
    arrayEngine = require('./arrayEngine'),
    numberEngine = require('./numberEngine');

let gen = function (schema) {
    switch (schema.type) {
        case 'String':
            return stringEngine.gen(schema);
            break;
        case 'Object':
            return objectEngine.gen(schema);
            break;
        case 'Array':
            return arrayEngine.gen(schema);
            break;
        case 'Number':
            return numberEngine.gen(schema);
            break;
        default:
            break;
    }
};

module.exports = {
    gen: gen
}