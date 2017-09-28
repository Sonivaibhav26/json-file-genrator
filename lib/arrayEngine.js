function gen(schema) {
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

    //check if array contain any array
    // var arraysToConsider = [];

    // schema.values.forEach((element, elementIndex) => {
    //     var type = typeof (element);
    //     if (type === 'object' && element.type === 'Array') {
    //         var subArrayData = getValueforArray(element);
    //         for (var index = 0; index < subArrayData.possibleValues; index++) {
    //             var newSubArrayToConsider = schema.values;
    //             newSubArrayToConsider[elementIndex] = subArrayData.values[index];
    //             arraysToConsider.push(JSON.parse(JSON.stringify(newSubArrayToConsider)));

    //         }
    //     } else if (elementIndex === schema.values.length - 1 && arraysToConsider.length === 0)
    //         arraysToConsider = schema.values;

    // });
    // arrayData.values = arraysToConsider.map((array) => { return combine(array); });
    // console.log(arrayData);
    arrayData.values = combine(schema.values);
    arrayData.possibleValues = arrayData.values.length;
    return arrayData;
}

module.exports = {
    gen
}