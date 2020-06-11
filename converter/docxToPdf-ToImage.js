//import useful module
const docxConverter = require('docx-pdf');
const path = require('path');
const pdf = require('pdf-poppler');

/**
 * convert docxFile to pdf
 * INPUTS= (address and name my file, address and name out put file, cbFunc)
 */
docxConverter('wordFile.docx', 'pdfFile.pdf', function (err, result) {
    if(err) 
    {
        console.log(err);
    }
    console.log('result' + result);

    /**
     * after convert to pdf will pdf convert to image
     */
    let file = 'pdfFile.pdf'//my name File
    //crated object and use in convert method in pdf module.
    let opts = {
        format: 'png',
        out_dir: path.dirname(file),
        out_prefix: "myImage",
        page: null
    }
    
    pdf.convert(file, opts)
        .then(function res() {
            console.log('Successfully converted');
        })
        .catch(function error() {
            console.log("khataee rokh dade");
            console.error(error);
        })
});