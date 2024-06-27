import React from "react";

const ProductForm = ({ data, handleChange, employees }) => {
  console.log('Employees:', employees);

  return (
    <form className="p-4 border border-gray-300 rounded-md shadow-md bg-white w-4/5 mx-auto space-y-4">
      <h2 className='text-center text-xl font-semibold'>Work Description</h2>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
          <label className="block mb-2 text-gray-700" htmlFor="workDescription">
            Work Description
          </label>
          <input
            type="text"
            id="workDescription"
            name="workDescription"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.workDescription}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <label className="block mb-2 text-gray-700" htmlFor="employeeName">
            Employee Name
          </label>
          <select
            id="employeeName"
            name="employeeName"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.employeeName}
            onChange={handleChange}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={`${employee.firstname} ${employee.lastname}`}>
                {employee.firstname} {employee.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <label className="block mb-2 text-gray-700" htmlFor="productName">
            Product Name
          </label>
          <select
            id="productName"
            name="productName"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.productName}
            onChange={handleChange}
          >
            <option value="Maize">Maize</option>
            <option value="Soya">Soya</option>
            <option value="Broken Rice">Broken Rice</option>
            <option value="Paddy">Paddy</option>
          </select>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <label className="block mb-2 text-gray-700" htmlFor="partyName">
            Party Name
          </label>
          <input
            type="text"
            id="partyName"
            name="partyName"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.partyName}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <label className="block mb-2 text-gray-700" htmlFor="partyCompanyName">
            Party Company Name
          </label>
          <input
            type="text"
            id="partyCompanyName"
            name="partyCompanyName"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.partyCompanyName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <label className="block mb-2 text-gray-700" htmlFor="selectDate">
            Select Date
          </label>
          <input
            type="date"
            id="selectDate"
            name="selectDate"
            className="w-full p-2 border border-gray-300 rounded"
            value={data.selectDate}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
