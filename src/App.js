import React, {useState, useEffect} from 'react'
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faDollarSign, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {

  const [invoices, setInvoices] = useState([]);
  const [isLoding, setLoading] = useState(false);

  //onComponentMount
  useEffect(() => {
    setInvoices([
      {id:1, total: 80, date: "01/25/2021", vendor: "Bar Bao"}, 
      {id:2, total: 120, date: "02/31/2021", vendor: "Wilson Hardware & Kitchen"}, 
      {id:3, total: 80, date: "01/26/2021", vendor: "Bar Bao"},
      {id:4, total: 80, date: "01/29/2021", vendor: "Bar Bao"},
      {id:5, total: 160, date: "01/27/2021", vendor: "The Lot"},
      {id:6, total: 40, date: "02/22/2021", vendor: "Bar Bao"},
      {id:7, total: 100, date: "02/25/2021", vendor: "Ambar"},
      {id:8, total: 100, date: "02/22/2021", vendor: "Ambar"},
      {id:9, total: 160, date: "02/16/2021", vendor: "The Lot"},
      {id:10, total: 80, date: "02/15/2021", vendor: "Bar Bao"},
      {id:11, total: 80, date: "02/13/2021", vendor: "Bar Bao"},
      {id:12, total: 120, date: "02/07/2021", vendor: "The Lot"},
      {id:13, total: 400, date: "02/01/2021", vendor: "Clerendon Ball Room"},
      {id:14, total: 80, date: "05/09/2021", vendor: "Bar Bao"},
      {id:15, total: 40, date: "04/11/2021", vendor: "Bar Bao"},
      {id:16, total: 140, date: "03/29/2021", vendor: "The Lot"},
      {id:17, total: 320, date: "03/30/2021", vendor: "Clerendon Ball Room"},
    ])
    // setLoading(false)
  }, [])
  
  // OnUpdate
  useEffect(() => {}, [invoices])


  // FUNCTIONS

  const remove = (invoiceId) => {
    let updatedInvoices = invoices.filter(invoice => invoice.id !== invoiceId)
    setInvoices(updatedInvoices)
  }

  // UI

  return (
    <div className="container-fluid vh-100 text-center content-center ">
      <Navbar collapseOnSelect className="p-4 bg-ice2" sticky="top" expand="lg" variant="light">
        <Container>
          <Navbar.Brand className="m-2" href="#home">LATE NIGHT ICE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="m-2" href="#pricing">Pricing</Nav.Link>
              <NavDropdown className="m-2" title="Invoices" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#invoice/pending">Pending</NavDropdown.Item>
                <NavDropdown.Item href="#invoice/payed">Payed</NavDropdown.Item>
                <NavDropdown.Item href="#invoice/all">All</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#invoice/help">Help</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#profile">My Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h2 className="m-4">Pending Invoices</h2>
      {
      isLoding || invoices.length < 1 ? <h1>no Invoices to display</h1> : 
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
                  <tr key={invoice.id}>
                    <th>{invoice.id}</th>
                    <td>{invoice.total}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.vendor}</td>
                    <td><Button className="btn btn-lg btn-success" onClick={() => remove(invoice.id)}><FontAwesomeIcon icon={faThumbsUp}/> Paid</Button></td>
                    <td><Button className="btn btn-lg btn-info" onClick={() => remove(invoice.id)}><FontAwesomeIcon icon={faImage}/> Info</Button></td>
                    <td><Button className="btn btn-lg btn-warning" onClick={() => remove(invoice.id)}><FontAwesomeIcon icon={faDollarSign}/> pay</Button></td>
                    <td><Button className="btn btn-lg btn-danger" onClick={() => remove(invoice.id)}><FontAwesomeIcon icon={faThumbsDown}/> NOK</Button></td>
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
