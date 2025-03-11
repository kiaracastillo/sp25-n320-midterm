 import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";
//array cart items
 const cart = [];

const cartButtons = document.querySelectorAll(".add-btn");

const viewReceiptBtn = document.getElementById("view-receipt");

const downloadReceiptBtn = document.getElementById("download-receipt");

cartButtons.forEach((button) => {

button.addEventListener("click", () => {
 const name = button.getAttribute("data-name");

const price = parseFloat(button.getAttribute("data-price"));
    
    const existingItem = cart.find((item) => item.name === name);
 if (existingItem) {
      existingItem.quantity += 1;

} else { cart.push({ name, price, quantity: 1 });
    }
updateButtons();
   
//console.log(cart);

  });
});



export class GeneratePdf {
  pdfDoc;
  position = { y: 20, x: 10,
  };

  margin = { y: 20, x: 10, };

  pageCounter = 1;
  domRef = "";

  
  constructor(domRefId) {
    this.pdfDoc = new jsPDF();
    this.pdfDoc.setFontSize(11);
    if (domRefId) {
      this.domRef = document.querySelector(`#${domRefId}`);
    }
  }

  downloadPdf() {
    this.pdfDoc.save("invoice.pdf");
  }

  getPdfUrl() {
    return this.pdfDoc.output("bloburl") + "#toolbar=1";
  }


  addHeader(text, color = "black") {

    this.pdfDoc.setFontSize(16);
this.pdfDoc.setTextColor(color);
this.pdfDoc.text(text, this.position.x, this.position.y);
    
this.position.y += 8;
    this.pdfDoc.setTextColor("black");

    this.pdfDoc.setFontSize(11);
  }


  addText(text, color = "black") {
    this.pdfDoc.setTextColor(color);

    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.pdfDoc.setTextColor("black");
    this.position.y += 5.5;
  }

  resetPdf() {
    for (let i = this.pageCounter; i > 0; i--) {
      this.pdfDoc.deletePage(i);
    }
    this.pageCounter = 1;

    this.pdfDoc.addPage();

this.showPdf();
  }

  showPdf() {
    if (this.domRef) {
      this.domRef.src = this.getPdfUrl();
    }
  }
}



