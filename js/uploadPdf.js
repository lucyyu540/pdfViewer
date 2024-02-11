//import { jsPDF } from "jspdf";
//1. import pdf file
//2. render on canvas

const pdfjsLib = window.pdfjsLib;
console.log(pdfjsLib);
const pdfjsLibPromise = window.pdfjsLibPromise;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

//choose file event
function handleInput() {
    const inputElement = document.getElementById('upload');
    inputElement.addEventListener('change', async function () {
        const file = this.files[0];
        const arrayBuffer = await file.arrayBuffer();

        const pdf = await loadPDF(arrayBuffer);
        renderPage(pdf, 1);

        hide_drop_here();
        // const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        // loadingTask.promise.then(
        //     function (pdf) {
        //         console.log('Pdf loaded');

        //         const pageNumber = 1;
        //         pdf.getPage(pageNumber).then(function (page) {
        //             console.log('page loaded');
        //             const scale = 1.5;
        //             const viewport = page.getViewport({ scale: scale });

        //             const canvas = document.getElementById('canvas');
        //             const context = canvas.getContext('2d');
        //             canvas.height = viewport.height;
        //             canvas.width = viewport.width;

        //             const renderContext = {
        //                 canvasContext: context,
        //                 viewport, viewport
        //             };
        //             const renderTask = page.render(renderContext);
        //             renderTask.promise.then(function () {
        //                 console.log('page rendered');
        //             })
        //         })
        //     },
        //     function (reason) {
        //         console.error(reason)
        //     })
    }, false)
}
//on drop event
function handleDrop() {
    const el = document.getElementById('dragNDrop');

    el.addEventListener('drop', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('file dropped!');
        console.log(e.dataTransfer.files[0]);
        const file = e.dataTransfer.files[0]
        const arrayBuffer = await file.arrayBuffer();

        const pdf = await loadPDF(arrayBuffer);
        renderPage(pdf, 1);

        hide_drop_here();
    })
    el.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

}

function hide_drop_here() {
      //drop files here text remove
      const text = document.getElementById('drop_text');
      //text.parentElement.removeChild(text);
      text.style.display = 'none';
}


//////////////////////////////////////////////////////////////

//load and return PDFDoc
//pdfDoc: f() getPage, numPages, 
function loadPDF(arrayBuffer) {
    return new Promise(function (resolve, reject) {
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        loadingTask.promise.then(
            function (pdf) {
                console.log('Pdf loaded');
                resolve(pdf);
            },
            function (reason) {
                console.error(reason);
                reject(reason);
            });
    });
}

//render PDF onto canvas element
export function renderPage(pdf, pageNumber) {
    return new Promise(function(resolve, reject) {
        pdf.getPage(pageNumber)
            .then(function (page) {
                console.log('page loaded');
                const scale = 1.5;
                document.getElementById("scale").value = scale * 100;

                document.getElementById('pageNumber').textContent = `${pageNumber}/${pdf.numPages}`
                const viewport = page.getViewport({ scale: scale });
                const canvas = document.getElementById('canvas');
                canvas.style.display = 'block';
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport, viewport
                };
                const renderTask = page.render(renderContext);
                renderTask.promise
                    .then(function () {
                        resolve();
                    })
                    .catch(function(err) {
                        console.error(err);
                        reject(err.message);
                    })
            })
            .catch(function(err) {
                console.error(err);
                reject(err.message);
            })
    });

}

handleDrop();
handleInput();