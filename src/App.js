import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entry from './components/Entry/Entry';
import BillTable from './components/BillTable/BillTable';
import Header from './components/common/Header/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/bills" element={<BillTable />} />
      </Routes>
    </Router>
  );
};

export default App;
