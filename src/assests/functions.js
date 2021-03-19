function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const convertedLink = (str) => {
    try {
        return str.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
    } catch {
        return
    }
}

export {
    isEmpty,
    convertedLink
}