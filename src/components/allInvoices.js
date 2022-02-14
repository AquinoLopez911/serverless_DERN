// invoice obj {
// id: number (pk)
// vender: string (sk)
// total: number
// createdAt: string/date
// paidDate: string/date
// }
import React, {useState, useEffect} from 'react';

import {Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faDollarSign, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import {PUT_URL, GET_INVOICES_URL} from "./../config"
import { Link } from 'react-router-dom';

export default function AllInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //onComponentMount, conponentDidUpdate
  useEffect(() => {
    if(isLoading) {
      console.log("ComponentDIdMount")
      getInvoices();
      setLoading(false)
    } 
  }, [invoices, isLoading])

  // API FUNCTIONS

  // GET ALL
  const getInvoices = async () => {
    const response = await fetch(GET_INVOICES_URL, {
      method: 'GET',
      "Access-Control-Allow-Origin": '*'
    })
    const body = await response.json()
    let invoices = [...body.Items];
    invoices = bSort(invoices, 'id');
    setInvoices(invoices);
  }

  // GET BY ID
  const getInvoiceById = async (id) => {
    console.log("getting invoice data")
    // TO DO !!

  }

  // POST
  // const addInvoice = async (invoice) => {
  //   console.log(invoice)
  //   // TO DO !!

  // }
  
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

    // TO DO DELETE INVOICE IN DATABASE
  }


  // COMPONENTS
  const PayButton = (props) => {
    if(props.invoice.paidDate !== "")  
      return <td><Button className="btn btn-lg btn-success w-100" disabled={true} onClick={() => markPaid(props.invoice, props.i)}><FontAwesomeIcon icon={faThumbsUp}/>&nbsp; PAYED</Button></td>
    else
      return <td><Button className="btn btn-lg btn-primary w-100" disabled={props.invoice.paidDate !== ""} onClick={() => markPaid(props.invoice, props.i)}>PAY</Button></td>
  }

    return(
      <div>
        <h2 className="m-4">Pending Invoices</h2>
        <Button className="btn btn-lg btn-warning" onClick={() => bSort(invoices, 'id')}>Sort By Id</Button>
        {
        isLoading ? 
          <h1>no Invoices to display</h1> : 
          <table className="table table-hover mt-5">
            <thead>
              <tr>
              <th scope="col">description</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAYED DATE</th>
              <th scope="col">VENDOR</th>
              </tr>
            </thead>
            <tbody>
            {
              invoices.map((invoice, i) => {
                if(invoice.paidDate === "") { // bad practice
                  return (
                    <tr key={i}>
                      <th>{invoice.id}</th>
                      <td>{invoice.total}</td>
                      <td>{invoice.paidDate}</td>
                      <td>{invoice.vendor}</td>
                      <PayButton invoice={invoice} i={i} />
                      <td><Link to={`/invoice/${invoice.id}`}><Button className="btn btn-lg btn-info" ><FontAwesomeIcon icon={faImage}/>INFO</Button></Link></td>
                      <td><Button className="btn btn-lg btn-warning" onClick={() => getInvoiceById(invoice.id)}><FontAwesomeIcon icon={faDollarSign}/> pay</Button></td>
                      <td><Button className="btn btn-lg btn-danger" onClick={() => removeInvoiceById(invoice.id)}><FontAwesomeIcon icon={faThumbsDown}/> NOK</Button></td>
                    </tr>
                  )
                }
                return <></>
              })
            }
            </tbody>
          </table>
        }
        <div>
        <td><Link to={`/invoice/create`}><Button className="btn btn-lg btn-info" ><FontAwesomeIcon icon={faImage}/>INFO</Button></Link></td>
        </div>
      </div>
    )

    // helper functions
    
    // least to greatest bubble sort
    function bSort(arr, key) {
      for(let i = 0; i < arr.length; i++ ) {
        for(let j = 0; j < arr.length-i-1; j++) {
          if(arr[j][key] > arr[j+1][key]) {
            let temp = arr[j];
            arr[j] = arr[j+1]
            arr[j+1] = temp;
          }
        }
      }
      return arr;
    }
}