import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const InputTable = ({ rows, handleInputChange, handleAddRow }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md bg-white w-4/5 mx-auto space-y-4">
      <h2 className="text-center text-xl font-semibold">Expenses Summary</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Particulars</th>
            <th className="px-4 py-2">Bags</th>
            <th className="px-4 py-2">Rate (Rs.)</th>
            <th className="px-4 py-2">Amount (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  className="w-full px-2 py-1 border rounded"
                  value={row.particular}
                  onChange={(e) =>
                    handleInputChange(index, "particular", e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded"
                  value={row.bags}
                  onChange={(e) =>
                    handleInputChange(index, "bags", e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded"
                  value={row.rate}
                  onChange={(e) =>
                    handleInputChange(index, "rate", e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddRow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <IoIosAddCircleOutline className="mr-2" />
          Add More
        </button>
      </div>
    </div>
  );
};

export default InputTable;
