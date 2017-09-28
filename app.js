var schema = require('./schema.js'),
    generator = require('./lib/metaEngine'),
    postProcessor = require('./lib/postProcessor.js'),
    fs = require('fs');

var data = generator.gen(schema);
createfiles(data);

function createfiles(data) {
    generatedObjects = Object.keys(data);
    generatedObjects.forEach(function (object, $index) {
        let fileName = schema.fileNamePrefix + $index;
        let fileContentWrite = postProcessor.gen(data[object], $index);

        fs.writeFile(fileName + '.json', fileContentWrite, 'utf8', function (err, data) {
            if (data)
                console.log(data);
            else if (err)
                console.log(err);
        });
    });

}