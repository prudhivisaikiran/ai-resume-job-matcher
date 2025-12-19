const pdfParse = require('pdf-parse');

console.log('Type of pdfParse:', typeof pdfParse);
console.log('Is pdfParse a function?', typeof pdfParse === 'function');
console.log('Exports:', pdfParse);

if (typeof pdfParse !== 'function') {
    if (pdfParse.default && typeof pdfParse.default === 'function') {
        console.log('It has a default export!');
    }
}
