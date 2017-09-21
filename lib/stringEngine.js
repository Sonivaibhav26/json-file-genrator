let _ = require('lodash');

let gen = schema => {
    let stringData = dataObj(),
        value = schema.values;

    if (value.includes("|")) {
        stringData.values = value.split("|");
        stringData.possibleValues = stringData.values.length;
        return stringData;
    } else if (value.includes("{{}}")) {
        if (schema.pattern && Object.keys(schema.pattern).length > 0) {
            return resolvePattern(schema, stringData);
        } else {
            stringData.values.push(value.replace("{{}}", ""));
            stringData.possibleValues = stringData.values.length;
            return stringData;
        }

    } else {
        stringData.values.push(value);
        stringData.possibleValues = stringData.values.length;
        return stringData;
    }

}

let dataObj = () => { return { possibleValues: 0, values: [] }; };

let genrateStringWithRange = (string) => { return (x) => string.replace("{{}}", x) };

let resolvePattern = (schema, dataObj) => {
    let { values, pattern } = schema;
    if (pattern.type === 'Number') {
        if (pattern.range) {
            if (pattern.range === '.') {
                dataObj.values.push(values.replace("{{}}", `_fileNumber`));
                dataObj.possibleValues = dataObj.values.length;
                return dataObj;
            }

            let elementsToConsider = _.range(pattern.range[0], pattern.range[1]);
            dataObj.values = elementsToConsider.map(genrateStringWithRange(values));
            dataObj.possibleValues = dataObj.values.length;
            return dataObj;
        }
    }


}



module.exports = {
    gen
}