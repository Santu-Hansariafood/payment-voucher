import React from 'react';

const SummaryInput = ({ grandTotal, receivableAmount, balanceAmount, handleChange }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md bg-white w-4/5 mx-auto space-y-4">
      <h2 className='text-center text-xl font-semibold'>Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="grandTotal">Grand Total</label>
          <input
            type="number"
            id="grandTotal"
            name="grandTotal"
            className="w-full p-2 border border-gray-300 rounded"
            value={grandTotal}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="receivableAmount">Receivable Amount</label>
          <input
            type="number"
            id="receivableAmount"
            name="receivableAmount"
            className="w-full p-2 border border-gray-300 rounded"
            value={receivableAmount}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="balanceAmount">Balance Amount</label>
          <input
            type="number"
            id="balanceAmount"
            name="balanceAmount"
            className="w-full p-2 border border-gray-300 rounded"
            value={balanceAmount}
            onChange={handleChange}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryInput;
