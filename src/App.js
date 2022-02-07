import React, {useState, useEffect} from 'react'
import NavBar from './components/navBar';


import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faDollarSign, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import {PUT_URL, GET_INVOICES_URL} from "./config"

function App() {

  const [invoices, setInvoices] = useState([]);
  const [isLoding, setLoading] = useState(true);

  //onComponentMount, conponentDidUpdate
  useEffect(() => {
    if(isLoding) {
      let Invoices = getInvoices();
      setInvoices(invoices)
      setLoading(false)
    }
    console.log(invoices, "from useEffect componentDIdUpdate")
  }, [invoices])


  // API FUNCTIONS

  // GET ALL
  const getInvoices = async () => {
    const response = await fetch(GET_INVOICES_URL, {
      method: 'GET',
      "Access-Control-Allow-Origin": '*'
    })
    const body = await response.json()
    const invoices = [...body.Items]; 
    setInvoices(invoices)
  }

  // GET BY ID
  const getInvoiceById = async (id) => {
    console.log("getting invoice data")
    // TO DO !!

  }

  // POST
  const addInvoice = async () => {

    // TO DO !!

  }
  
  // PUT
  const markPaid = async (_invoice, i) => {
    // pass object to be updated to backend
    await fetch(PUT_URL, {
      method: 'PUT',
      headers: {
        "origin": 'http://localhost:3000',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_invoice),
    })
    .then((res) => { 
      res.json().then((data) => {
        let updatedInvoices = [...invoices]
        updatedInvoices[i] = JSON.parse(data.body)
        setInvoices(updatedInvoices);
      })
    })
  }
  
  // DELETE BY ID
  const removeInvoiceById = (invoiceId) => {
    let updatedInvoices = invoices.filter(invoice => invoice.id !== invoiceId)
    setInvoices(updatedInvoices)
  }

  // UI

  return (
    <div className="container-fluid vh-100 text-center content-center ">
      <NavBar />
      <h2 className="m-4">Pending Invoices</h2>
      {
      isLoding ? <h1>no Invoices to display</h1> : 
        <table className="table table-hover mt-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TOTAL</th>
              <th scope="col">DATE</th>
              <th scope="col">VENDOR</th>
            </tr>
          </thead>
          <tbody>
            {
              invoices.map((invoice, i) => {
                return (
                  <tr key={i}>
                    <th>{invoice.id}</th>
                    <td>{invoice.total}</td>
                    <td>{invoice.paidDate}</td>
                    <td>{invoice.vendor}</td>
                    <td><Button className="btn btn-lg btn-success" onClick={() => markPaid(invoice, i)}><FontAwesomeIcon icon={faThumbsUp}/> Paid</Button></td>
                    <td><Button className="btn btn-lg btn-info" onClick={() => getInvoiceById(invoice.id)}><FontAwesomeIcon icon={faImage}/> Info</Button></td>
                    <td><Button className="btn btn-lg btn-warning" onClick={() => getInvoiceById(invoice.id)}><FontAwesomeIcon icon={faDollarSign}/> pay</Button></td>
                    <td><Button className="btn btn-lg btn-danger" onClick={() => removeInvoiceById(invoice.id)}><FontAwesomeIcon icon={faThumbsDown}/> NOK</Button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </div>
  );
}

export default App;
