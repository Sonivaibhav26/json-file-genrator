var schema = require('./schema.js'),
    fs = require('fs');

var data = generator(schema);
//createfiles(data);



function generator(schema) {
    switch (schema.type) {
        case 'String':
            return getValueforString(schema.values);
            break;
        case 'Object':
            return getValueforObject(schema);
            break;
        case 'Array':
            return getValueforArray(schema);
            break;
        default:
            break;
    }
}

function getValueforArray(schema) {
    var arrayData = {
        possibleValues: 0,
        values: []
    };
    var combine = function (a) {
        var fn = function (n, src, got, all) {
            if (n == 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return;
            }
            for (var j = 0; j < src.length; j++) {
                fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
            }
            return;
        }
        var all = [];
        for (var i = 0; i < a.length; i++) {
            fn(i, a, [], all);
        }
        all.push(a);
        return all;
    }
    arrayData.values = combine(schema.values);
    arrayData.possibleValues = arrayData.values.length;
    return arrayData;
}

function getValueforString(value) {
    var stringData = {
        possibleValues: 0,
        values: []
    };
    value.split("|");
    stringData.values = value.split("|");
    stringData.possibleValues = value.split("|").length;
    return stringData;
}

function getValueforObject(schema) {
    var object = schema.properties,
        keys = Object.keys(schema.properties),
        generatedObject = {};
    for (var key in schema.properties) {
        if (object.hasOwnProperty(key)) {
            var element = object[key];
            subData = generator(element);
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

function createfiles(data) {
    generatedObjects = Object.keys(data);
    generatedObjects.forEach(function (object) {
        var json = JSON.stringify(data[object]);
        fs.writeFile(object + '.json', json, 'utf8', function (err, data) {
            if (data)
                console.log(data);
            else if (err)
                console.log(err);
        });
    });

}

console.log(data);