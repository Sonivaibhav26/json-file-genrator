function gen(value) {
    let numberData = {
        possibleValues: 0,
        values: []
    };

    if (value.values !== '$') {
        numberData.possibleValues = 1;
        numberData.values.push(value.values);
        return numberData;
    }
}

module.exports = {
    gen
}