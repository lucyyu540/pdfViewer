
//5. save canvas as new pdf file
export default function downloadPdf() {
    const download = document.getElementById('download');
    download.addEventListener("click", function () {
        var canvas = document.getElementById('canvas');
        const imageData = canvas.toDataURL('image/png');
        const doc = new window.jspdf.jsPD;
        doc.addImage(imageData, 'PNG', canvas.width, canvas.height);
        doc.save("download.pdf");



        // // only jpeg is supported by jsPDF
        // var imgData = canvas.toDataURL("image/jpeg", 1.0);
        // var pdf = new jsPDF();

        // pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.save("download.pdf");
    }, false);
}