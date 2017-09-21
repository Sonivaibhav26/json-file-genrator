let gen = (obj, index) => {
    let modifiedStringifiedObject = '';
    let stringifiedObject = JSON.stringify(obj);

    //now need to handle global changes

    modifiedStringifiedObject = stringifiedObject.replace("_fileNumber", index);
    return modifiedStringifiedObject;
}

module.exports = {
    gen
}