//Handles the paste logic
function pasteHandler(event) {
    event.preventDefault();
    // $("#instructions").empty();
    var text = (event.originalEvent || event.clipboardData.getData('text/plain'));
    // insert text manually
    analyzeResume(text);

}

//Handles the drag & drop logic
function dropHandler(ev) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file
        if (ev.dataTransfer.items[0].kind === 'file') {
            //Get a copy of the file that was dropped
            var resumeFile = ev.dataTransfer.items[0].getAsFile();
            console.log('Filename ' + resumeFile.name);
            //prepare the PDF file for parsing
            processFile(resumeFile);
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);

        }
    }
}

function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    $('#drop-zone').css("background-color", "gray");
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function dragLeaveHandler(ev) {
    $('#drop-zone').css("background-color", "white");
}

//Converts the file to the proper format before being passed to the getTextFromPDF function
function processFile(file) {
    // Open the file as base64 using FileReader API
    var fileReader = new FileReader();
    // Onload of file read the file contents
    fileReader.onload = function (fileLoadedEvent) {
        DataURI = fileLoadedEvent.target.result;
        //Must be converted to binary to work with PDF.js
        var binary = convertDataURIToBinary(DataURI);
        //Now pass the converted binary to the getTextFromPDF function
        getTextFromPDF(binary);
    };
    //Convert from PDF to base64
    fileReader.readAsDataURL(file);
}

//Thank you Stackoverflow, this is the format that pdf.js expects the file to be in
var BASE64_MARKER = ';base64,';
function convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}


// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';

// Gets the text from a PDF file using the pdf.js library
function getTextFromPDF(pdfData) {

    var loadingTask = pdfjsLib.getDocument({ data: pdfData });

    loadingTask.promise.then(function (pdf) {
        console.log('PDF loaded');

        var numPages = pdf.numPages;
        var countPromises = []; // collecting all page promises

        for (var i = 1; i <= numPages; i++) {
            var page = pdf.getPage(i);
            countPromises.push(page.then(function (page) { // add page promise
                var textContent = page.getTextContent();
                return textContent.then(function (text) { // return content promise
                    return text.items.map(function (s) { return s.str; }).join(''); // value page text 
                });
            }));
        }
        // Wait for all pages and join text
        return Promise.all(countPromises).then(function (texts) {
            console.log(texts.join(''));
            var resumeText = texts.join('');
            analyzeResume(resumeText);
            return resumeText;
        });

    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });

}