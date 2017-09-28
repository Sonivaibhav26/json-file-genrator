let stringEngine = require('./stringEngine'),
    objectEngine = require('./objectEngine'),
    arrayEngine = require('./arrayEngine'),
    numberEngine = require('./numberEngine');


let router = function (schema) {
    switch (schema.type) {
        case 'String':
            return stringEngine.gen(schema);
            break;
        case 'Object':
            return gen(schema);
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



let gen = (schema) => {
    var object = schema.properties,
        keys = Object.keys(schema.properties),
        generatedObject = {};
    for (var key in schema.properties) {
        if (object.hasOwnProperty(key)) {
            var element = object[key];
            subData = router(element);
            if (subData === {}) {
                generatedObject[key] = subData;
            }
            else if (subData.possibleValues === 1) {
                generatedObject[key] = subData.values[0];
            } else if (subData.possibleValues > 1) {
                for (var index = 0; index < subData.possibleValues; index++) {
                    var element = subData.values[index];
                    generatedObject['#' + index + '_' + key] = element;
                }
            } else {
                var objectData = processDuplicates(subData);
                if (objectData.possibleValues === 1) {
                    generatedObject[key] = objectData.values[0];
                } else {
                    for (var index = 0; index < objectData.possibleValues; index++) {
                        var element = objectData.values[index];
                        generatedObject['#' + index + '_' + key] = element;
                    }
                }
            }

        }
        if (key === keys[keys.length - 1]) {
            return generatedObject;
        }

    }

}

function processDuplicates(generatedObject) {
    var createdObject = {},
        keysToDuplicate = [];

    var objectData = {
        possibleValues: 0,
        values: []
    };

    for (var key in generatedObject) {
        if (generatedObject.hasOwnProperty(key) && key.startsWith('#')) {
            keysToDuplicate.push(key);
        } else
            createdObject[key] = generatedObject[key];
    }
    objectData.values.push(createdObject);
    keysToDuplicate.forEach(function (x) {
        var checker = [];
        objectData.values.forEach(function (currentObject, index) {
            var key = x.substring(x.indexOf('_') + 1, x.length);
            if (currentObject.hasOwnProperty(key)) {
                var newObject = JSON.parse(JSON.stringify(currentObject));
                newObject[key] = generatedObject[x];
                //check if already exist
                if (!checkIfAlreadyExist(checker, newObject)) {
                    objectData.values.push(newObject);
                    checker.push(newObject);
                }
            } else {
                currentObject[key] = generatedObject[x];
            }
        });
    });

    objectData.possibleValues = objectData.values.length;
    return objectData;
}


function checkIfAlreadyExist(createdArray, createdObject) {
    for (var index = 0; index < createdArray.length; index++) {
        var element = createdArray[index];
        if (JSON.stringify(createdObject) === JSON.stringify(element)) {
            return true;
        }

    }
    return false;
}

module.exports = {
    gen
}