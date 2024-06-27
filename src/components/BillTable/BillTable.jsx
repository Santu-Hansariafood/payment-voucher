import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import InvoiceModal from './InvoiceModal'; // Import the InvoiceModal component

const BillTable = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const billsPerPage = 10;

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/balance');
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredBills = bills.filter(bill =>
    bill.productFormData.employeeName?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = (bill) => {
    const { productFormData, inputFormData, summaryData, rows } = bill;

    let tableHtml = `
      <table class="table-auto w-full border-collapse border border-gray-200">
        <tr><th colspan="2" class="bg-gray-200 p-2">Product Form Data</th></tr>
        <tr><td class="border p-2">Product Name</td><td class="border p-2">${productFormData.productName || ''}</td></tr>
        <tr><td class="border p-2">Party Name</td><td class="border p-2">${productFormData.partyName || ''}</td></tr>
        <tr><td class="border p-2">Party Company Name</td><td class="border p-2">${productFormData.partyCompanyName || ''}</td></tr>
        <tr><td class="border p-2">Select Date</td><td class="border p-2">${new Date(productFormData.selectDate).toLocaleDateString() || ''}</td></tr>
        <tr><td class="border p-2">Work Description</td><td class="border p-2">${productFormData.workDescription || ''}</td></tr>
        <tr><td class="border p-2">Reject Lorry No</td><td class="border p-2">${productFormData.rejectLorryNo || ''}</td></tr>
        <tr><th colspan="2" class="bg-gray-200 p-2">Input Form Data</th></tr>
        <tr><td class="border p-2">Lorry Number</td><td class="border p-2">${inputFormData.lorryNumber || ''}</td></tr>
        <tr><td class="border p-2">Reg From</td><td class="border p-2">${inputFormData.regFrom || ''}</td></tr>
        <tr><td class="border p-2">Loading</td><td class="border p-2">${inputFormData.loading || ''}</td></tr>
        <tr><td class="border p-2">Unloading</td><td class="border p-2">${inputFormData.unloading || ''}</td></tr>
        <tr><td class="border p-2">Balance</td><td class="border p-2">${inputFormData.balance || ''}</td></tr>
        <tr><td class="border p-2">Net Weight</td><td class="border p-2">${inputFormData.netWeight || ''}</td></tr>
        <tr><td class="border p-2">New Lorry No</td><td class="border p-2">${inputFormData.newLorryNo || ''}</td></tr>
        <tr><td class="border p-2">New Weight</td><td class="border p-2">${inputFormData.newWeight || ''}</td></tr>
        <tr><td class="border p-2">Send To</td><td class="border p-2">${inputFormData.sendTo || ''}</td></tr>
        <tr><td class="border p-2">AC</td><td class="border p-2">${inputFormData.ac || ''}</td></tr>
        <tr><td class="border p-2">Labour</td><td class="border p-2">${inputFormData.labour || ''}</td></tr>
        <tr><td class="border p-2">Transport</td><td class="border p-2">${inputFormData.transport || ''}</td></tr>
      </table>
      <br>
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th class="border p-2">Particular</th>
            <th class="border p-2">Bags</th>
            <th class="border p-2">Rate</th>
            <th class="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>
              <td class="border p-2">${row.particular || ''}</td>
              <td class="border p-2">${row.bags || ''}</td>
              <td class="border p-2">${row.rate || ''}</td>
              <td class="border p-2">${row.amount || ''}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <br>
      <table class="table-auto w-full border-collapse border border-gray-200">
        <tbody>
          <tr>
            <td class="border p-2"><strong>Grand Total:</strong></td>
            <td class="border p-2">${summaryData.grandTotal || ''}</td>
          </tr>
          <tr>
            <td class="border p-2"><strong>Receivable Amount:</strong></td>
            <td class="border p-2">${summaryData.receivableAmount || ''}</td>
          </tr>
          <tr>
            <td class="border p-2"><strong>Balance Amount:</strong></td>
            <td class="border p-2">${summaryData.grandTotal - summaryData.receivableAmount}</td>
          </tr>
        </tbody>
      </table>
    `;

    Swal.fire({
      title: 'View Bill',
      html: tableHtml,
      width: '80%',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: 'Close'
    });
  };

  const handleEdit = (bill) => {
    Swal.fire({
      title: 'Edit Bill',
      html: `
        <input type="text" id="employeeName" class="swal2-input" value="${bill.productFormData.employeeName || ''}">
        <input type="text" id="partyName" class="swal2-input" value="${bill.productFormData.partyName || ''}">
        <input type="text" id="partyCompanyName" class="swal2-input" value="${bill.productFormData.partyCompanyName || ''}">
        <input type="date" id="selectDate" class="swal2-input" value="${bill.productFormData.selectDate || ''}">
        <input type="text" id="workDescription" class="swal2-input" value="${bill.productFormData.workDescription || ''}">
        <input type="text" id="rejectLorryNo" class="swal2-input" value="${bill.productFormData.rejectLorryNo || ''}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          employeeName: document.getElementById('employeeName').value,
          partyName: document.getElementById('partyName').value,
          partyCompanyName: document.getElementById('partyCompanyName').value,
          selectDate: document.getElementById('selectDate').value,
          workDescription: document.getElementById('workDescription').value,
          rejectLorryNo: document.getElementById('rejectLorryNo').value,
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProductFormData = result.value;

        const updatedBill = {
          ...bill,
          productFormData: updatedProductFormData,
        };

        axios.put(`http://localhost:3000/api/balance/${bill._id}`, updatedBill)
          .then(() => {
            setBills(prevBills =>
              prevBills.map(b => (b._id === bill._id ? updatedBill : b))
            );
          })
          .catch(error => {
            console.error('Error updating bill:', error);
          });
      }
    });
  };

  const handleDelete = (billId) => {
    Swal.fire({
      title: 'Are you sure you want to delete this bill?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/api/balance/${billId}`)
          .then(() => {
            setBills(prevBills => prevBills.filter(b => b._id !== billId));
          })
          .catch(error => {
            console.error('Error deleting bill:', error);
          });
      }
    });
  };

  const handleViewInvoice = (bill) => {
    setSelectedBill(bill);
    setShowInvoiceModal(true);
  };

  const closeInvoiceModal = () => {
    setShowInvoiceModal(false);
    setSelectedBill(null);
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Bill Table</h1>
        <input
          type="text"
          placeholder="Search by Employee Name"
          value={search}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Employee Name</th>
            <th className="border p-2">Grand Total</th>
            <th className="border p-2">Receivable Amount</th>
            <th className="border p-2">Balance Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBills.map((bill, index) => (
            <tr key={index}>
              <td className="border p-2">{bill.productFormData.employeeName}</td>
              <td className="border p-2">{bill.summaryData.grandTotal}</td>
              <td className="border p-2">{bill.summaryData.receivableAmount}</td>
              <td className="border p-2">{bill.summaryData.grandTotal - bill.summaryData.receivableAmount}</td>
              <td className="border p-2 flex">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleView(bill)}
                >
                  <FaEye />
                </button>
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => handleEdit(bill)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDelete(bill._id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => handleViewInvoice(bill)}
                >
                  View Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="mt-4">
        <ul className="flex justify-center">
          {Array(Math.ceil(filteredBills.length / billsPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''} mx-1`}
              >
                <a onClick={() => paginate(index + 1)} className="page-link p-2 cursor-pointer">
                  {index + 1}
                </a>
              </li>
            ))}
        </ul>
      </nav>
      {showInvoiceModal && selectedBill && (
        <InvoiceModal bill={selectedBill} onClose={closeInvoiceModal} />
      )}
    </div>
  );
};

export default BillTable;
