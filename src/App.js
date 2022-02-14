import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import NavBar from './components/navBar';
import AllInvoices from "./components/allInvoices"
import InvDetails from './components/invDetails';

import './App.css';
// import Profile from './components/profile';
import NewInvoice from './components/newInoice';


function App() {
  // UI

  return (
    <div className="container-fluid vh-100">
      <NavBar />
      <Router>
        <Routes>
          <Route exact path='/' element={< AllInvoices />}></Route>
          <Route path='/invoice/:id' element={< InvDetails />}></Route>
          <Route path='/profile/:vendor' element={< NewInvoice />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
