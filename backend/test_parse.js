const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const testPdf = path.resolve(__dirname, 'uploads', '99c9b5afd8d9fea0d141dc1a5fb92733');

if (fs.existsSync(testPdf)) {
    console.log('Testing PDF parse on:', testPdf);
    const dataBuffer = fs.readFileSync(testPdf);
    pdfParse(dataBuffer).then(data => {
        console.log('SUCCESS!');
        console.log('Text length:', data.text.length);
        console.log('Preview:', data.text.substring(0, 100));
    }).catch(err => {
        console.error('FAILED TO PARSE:', err);
    });
} else {
    console.error('File not found:', testPdf);
}
