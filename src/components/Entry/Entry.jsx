import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ProductForm from '../ProductForm/ProductForm';
import InputForm from '../InputForm/InputForm';
import InputTable from '../InputTable/InputTable';
import Swal from 'sweetalert2';
import AdditionalInputForm from '../AdditionalInputForm/AdditionalInputForm';
import SummaryInput from '../SummaryInput/SummaryInput';

const Entry = () => {
  const initialProductFormData = {
    productName: '',
    partyName: '',
    partyCompanyName: '',
    selectDate: '',
    workDescription: '',
    rejectLorryNo: '',
    employeeName: '',
  };

  const initialInputFormData = {
    lorryNumber: '',
    regFrom: '',
    loading: '',
    unloading: '',
    balance: '',
    netWeight: '',
    newLorryNo: '',
    newWeight: '',
    sendTo: '',
    ac: '',
    acPartyCompany: ''
  };

  const initialRows = [
    { particular: 'JALPANI + Tea', bags: '', rate: '', amount: '' },
    { particular: 'REFILLING(Paking)', bags: '', rate: '', amount: '' },
    { particular: 'SUTULI', bags: '', rate: '', amount: '' },
    { particular: 'FOODING(lunch)', bags: '', rate: '', amount: '' },
    { particular: 'GODOWN LED light +Holder', bags: '', rate: '', amount: '' },
    { particular: 'BIKE oil', bags: '', rate: '', amount: '' },
  ];

  const [productFormData, setProductFormData] = useState(initialProductFormData);
  const [inputFormData, setInputFormData] = useState(initialInputFormData);
  const [rows, setRows] = useState(initialRows);
  const [summaryData, setSummaryData] = useState({
    grandTotal: '',
    receivableAmount: '',
    balanceAmount: ''
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const total = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
    setSummaryData((prevSummaryData) => ({
      ...prevSummaryData,
      grandTotal: total,
      balanceAmount: total - (parseFloat(prevSummaryData.receivableAmount) || 0)
    }));
  }, [rows]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://main-server-2kc5.onrender.com/api/employees');
        const data = await response.json();
        setEmployees(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
  };

  const handleInputFormChange = (e) => {
    const { name, value } = e.target;
    setInputFormData((prevInputFormData) => {
      const newInputFormData = { ...prevInputFormData, [name]: value };

      if (name === 'loading' || name === 'unloading') {
        const loading = parseFloat(newInputFormData.loading) || 0;
        const unloading = parseFloat(newInputFormData.unloading) || 0;
        newInputFormData.balance = loading - unloading;
      }

      return newInputFormData;
    });
  };

  const handleAdditionalInputFormChange = (e) => {
    const { name, value } = e.target;
    setInputFormData({ ...inputFormData, [name]: value });
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    if (field === 'bags' || field === 'rate') {
      const bags = parseFloat(newRows[index].bags) || 0;
      const rate = parseFloat(newRows[index].rate) || 0;
      newRows[index].amount = bags * rate;
    }
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { particular: '', bags: '', rate: '', amount: 0 }]);
  };

  const handleSummaryChange = (e) => {
    const { name, value } = e.target;
    setSummaryData((prevSummaryData) => {
      const newSummaryData = { ...prevSummaryData, [name]: value };

      if (name === 'grandTotal' || name === 'receivableAmount') {
        const grandTotal = parseFloat(newSummaryData.grandTotal) || 0;
        const receivableAmount = parseFloat(newSummaryData.receivableAmount) || 0;
        newSummaryData.balanceAmount = grandTotal - receivableAmount;
      }

      return newSummaryData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      productFormData,
      inputFormData,
      rows,
      summaryData,
    };
    console.log('Data submitted:', dataToSubmit);
  
    try {
      const response = await fetch('https://main-server-2kc5.onrender.com/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
  
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Your data has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        handleCancel();
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem submitting your data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem submitting your data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  const handleCancel = () => {
    setProductFormData(initialProductFormData);
    setInputFormData(initialInputFormData);
    setRows(initialRows);
    setSummaryData({
      grandTotal: '',
      receivableAmount: '',
      balanceAmount: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8 p-4">
      <ProductForm data={productFormData} handleChange={handleProductFormChange} employees={employees} />
      <InputForm data={inputFormData} handleChange={handleInputFormChange} />
      <AdditionalInputForm data={inputFormData} handleChange={handleAdditionalInputFormChange} />
      <InputTable rows={rows} handleInputChange={handleInputChange} handleAddRow={handleAddRow} />
      <SummaryInput
        grandTotal={summaryData.grandTotal}
        receivableAmount={summaryData.receivableAmount}
        balanceAmount={summaryData.balanceAmount}
        handleChange={handleSummaryChange}
      />
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <Link to="/bills" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Go to Bill List
        </Link>
      </div>
    </div>
  );
};

export default Entry;
