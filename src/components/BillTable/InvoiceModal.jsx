import React from "react";
import Swal from "sweetalert2";
import HANS from "../../Image/Hansaria-Logo.png";

const InvoiceModal = ({ bill }) => {
  const { productFormData, inputFormData, summaryData, rows } = bill;

  const printInvoice = () => {
    const printContents = document.getElementById("invoice-content").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const invoiceHtml = `
    <div id="invoice-content" style="padding: 20px; font-family: Arial, sans-serif; font-size: 10px; width: 100%; margin: auto;">
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        #invoice-content {
          width: 100%;
          max-width: 800px;
          margin: auto;
          border: 1px solid #ccc;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 100px;
        }
        .header .date {
          text-align: right;
        }
        .section-title {
          font-size: 1.2em;
          font-weight: bold;
          border-bottom: 2px solid #333;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        .info-table, .items-table, .summary-table {
          width: 100%;
          margin-bottom: 20px;
          border-collapse: collapse;
        }
        .info-table td, .items-table td, .items-table th, .summary-table td {
          padding: 8px;
          border: 1px solid #ccc;
        }
        .items-table th {
          background-color: #f0f0f0;
        }
        .summary-table td {
          font-weight: bold;
        }
        @media print {
          body {
            margin: 0;
          }
          #invoice-content {
            width: 210mm;
            height: 297mm;
            padding: 20mm;
            box-sizing: border-box;
          }
        }
      </style>
      <div class="header">
        <img src="${HANS}" alt="Hansaria Logo" />
        <div class="date">
          <strong>Date:</strong> ${formatDate(productFormData.selectDate)}
        </div>
      </div>
      <div style="margin-bottom: 20px;">
        <h2 class="section-title">Work Description</h2>
        <p>${productFormData.workDescription || ""}</p>
        <table class="info-table">
          <tbody>
            <tr>
              <td><strong>Product Name:</strong></td>
              <td>${productFormData.productName || ""}</td>
              <td><strong>Employee Name:</strong></td>
              <td>${productFormData.employeeName || ""}</td>
            </tr>
            <tr>
              <td><strong>Party Company:</strong></td>
              <td>${productFormData.partyCompanyName || ""}</td>
              <td><strong>Party Name:</strong></td>
              <td>${productFormData.partyName || ""}</td>
            </tr>
            <tr>
              <td><strong>Reject Lorry Number:</strong></td>
              <td>${productFormData.rejectLorryNo || ""}</td>
              <td><strong>Work Description:</strong></td>
              <td>${productFormData.workDescription || ""}</td>
            </tr>
            <tr>
              <td><strong>Lorry Number:</strong></td>
              <td>${inputFormData.lorryNumber || ""}</td>
              <td><strong>Reg From:</strong></td>
              <td>${inputFormData.regFrom || ""}</td>
            </tr>
            <tr>
              <td><strong>Loading:</strong></td>
              <td>${inputFormData.loading || ""}</td>
              <td><strong>Unloading:</strong></td>
              <td>${inputFormData.unloading || ""}</td>
            </tr>
            <tr>
              <td><strong>Balance:</strong></td>
              <td>${inputFormData.balance || ""}</td>
              <td><strong>Net Weight:</strong></td>
              <td>${inputFormData.netWeight || ""}</td>
            </tr>
            <tr>
              <td><strong>New Lorry No:</strong></td>
              <td>${inputFormData.newLorryNo || ""}</td>
              <td><strong>New Weight:</strong></td>
              <td>${inputFormData.newWeight || ""}</td>
            </tr>
            <tr>
              <td><strong>Send To:</strong></td>
              <td>${inputFormData.sendTo || ""}</td>
              <td><strong>AC:</strong></td>
              <td>${inputFormData.ac || ""}</td>
            </tr>
            <tr>
              <td><strong>Labour:</strong></td>
              <td>${inputFormData.labour || ""}</td>
              <td><strong>Transport:</strong></td>
              <td>${inputFormData.transport || ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="section-title">Items</h2>
      <table class="items-table">
        <thead>
          <tr>
            <th>Particular</th>
            <th>Bags</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(
            (row) => `
              <tr>
                <td>${row.particular || ""}</td>
                <td>${row.bags || ""}</td>
                <td>${row.rate || ""}</td>
                <td>${row.amount || ""}</td>
              </tr>`
          ).join("")}
        </tbody>
      </table>
      <h2 class="section-title">Summary</h2>
      <table class="summary-table">
        <tbody>
          <tr>
            <td><strong>Grand Total:</strong></td>
            <td>${summaryData.grandTotal || ""}</td>
          </tr>
          <tr>
            <td><strong>Receivable Amount:</strong></td>
            <td>${summaryData.receivableAmount || ""}</td>
          </tr>
          <tr>
            <td><strong>Balance Amount:</strong></td>
            <td>${summaryData.balanceAmount || ""}</td>
          </tr>
          <tr>
            <td><strong>Transport Amount:</strong></td>
            <td>${summaryData.transportAmount || ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  Swal.fire({
    title: "Payment Voucher",
    html: invoiceHtml,
    showCancelButton: true,
    confirmButtonText: "Print",
    cancelButtonText: "Close",
    width: "80%",
    customClass: {
      popup: 'invoice-modal'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      printInvoice();
    }
  });

  return null;
};

export default InvoiceModal;
