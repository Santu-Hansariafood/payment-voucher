// AdditionalInputForm.js
import React from 'react';

const AdditionalInputForm = ({ data, handleChange }) => {
  return (
    <form className="p-4 border border-gray-300 rounded-md shadow-md bg-white w-4/5 mx-auto space-y-4">
      <h2 className='text-center text-xl font-semibold'>Godown Loading / Palti</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="newLorryNo">New Lorry No</label>
          <input
            type="text"
            id="newLorryNo"
            name="newLorryNo"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.newLorryNo}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="newWeight">New Weight</label>
          <input
            type="text"
            id="newWeight"
            name="newWeight"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.newWeight}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="sendTo">Send To</label>
          <input
            type="text"
            id="sendTo"
            name="sendTo"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.sendTo}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="ac">AC</label>
          <input
            type="text"
            id="ac"
            name="ac"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.ac}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="acPartyCompany">A/C Party Company</label>
          <input
            type="text"
            id="acPartyCompany"
            name="acPartyCompany"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.acPartyCompany}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default AdditionalInputForm;
