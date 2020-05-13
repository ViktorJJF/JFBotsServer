const hbs = require("hbs");

hbs.registerHelper("getAnio", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("capitalizar", texto => {
    let palabras = texto.split(" ");
    palabras.forEach((palabra, idx) => {
        palabras[idx] =
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    return palabras.join(" ");
});


hbs.registerHelper("if_eq", function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});


hbs.registerHelper("isPair", function (number) {
    return parseInt(number) % 2 === 0 ? true : false;
});