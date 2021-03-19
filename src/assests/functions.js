function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const convertedLink = (str) => {
    return str.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
}

export {
    isEmpty,
    convertedLink
}