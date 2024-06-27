import React from "react";

const InputForm = ({ data, handleChange }) => {
  return (
    <form className="p-4 border border-gray-300 rounded-md shadow-md bg-white w-4/5 mx-auto space-y-4">
      <h2 className="text-center text-xl font-semibold">Rejection</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="lorryNumber">
            Lorry Number
          </label>
          <input
            type="text"
            id="lorryNumber"
            name="lorryNumber"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.lorryNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="regFrom">
            REG From
          </label>
          <input
            type="text"
            id="regFrom"
            name="regFrom"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.regFrom}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="loading">
            Loading
          </label>
          <input
            type="number"
            id="loading"
            name="loading"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.loading}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="unloading">
            Unloading
          </label>
          <input
            type="number"
            id="unloading"
            name="unloading"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.unloading}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="balance">
            Balance
          </label>
          <input
            type="text"
            id="balance"
            name="balance"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.balance}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700" htmlFor="netWeight">
            Net Weight
          </label>
          <input
            type="text"
            id="netWeight"
            name="netWeight"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.netWeight}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default InputForm;
