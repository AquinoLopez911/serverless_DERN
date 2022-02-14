import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GET_INVOICES_URL } from "../config"

export default function InvDetails () {
    // deconstructing params 
    const {
        id 
    } = useParams()

    const [invoice, setInvoice] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        if(isLoading) {
            getInvoiceById()
            setIsLoading(false)
        }
    }, [invoice, isLoading]);

    const getInvoiceById = async () => {
        await fetch(`${GET_INVOICES_URL}/invoice/${id}`, {
            method: 'GET',
            "Access-Control-Allow-Origin": '*',
        }).then( (response) => {
            return response.json();
        }).then( (data) => {
            setInvoice({...data[0]});
        }).catch( (error) => {
              console.log(error)
        })
    }

    return (
        <div className='mt-5 invoice-border '>
            <div className="d-flex justify-content-around">
                <div>
                    <h1 className='pt-5 pb-5'>INVOICE</h1>
                    <p className='p-0 m-0'>Late Night Ice</p>
                    <p className='p-0 m-0'>705 Gentle Breeze Ct</p>
                    <p className='p-0 m-0'>Herndon, VA 20170</p>
                    <p className='p-0 m-0'>(703)-939-4695</p>
                    <p className='p-0 m-0'>aquinoLopeza911@gmail.com</p>
                </div>
                <div>
                    <h1 className='pt-5 pb-5'>LNI</h1>
                    {
                        invoice.paidDate !== "" ? <p className='m-0'>{new Date().toLocaleDateString("en-US")}</p> : <p className='m-0'>payment due</p>
                    }
                    <p className='m-0'>invoice {id}</p>
                </div>
            </div>
            <div className="d-flex justify-content-around">
                    <h4 className='pt-5'>BILL TO</h4>
                    <h4 className='pt-5'>SHIP TO</h4>
            </div>    
            <div className='div-bar-ice-70'></div>
            <div className="d-flex justify-content-around">
                <div>
                    <p className='p-0 m-0'>{invoice.vendor}</p>
                    <p className='p-0 m-0'>address pkwy</p>
                    <p className='p-0 m-0'>(703)-000-0000</p>
                    <p className='p-0 m-0'>{invoice.vendor}@gmail.com</p>
                </div>
                <div>
                    <p className='p-0 m-0'>{invoice.vendor}</p>
                    <p className='p-0 m-0'>address pkwy</p>
                    <p className='p-0 m-0'>(703)-000-0000</p>
                    <p className='p-0 m-0'>{invoice.vendor}@gmail.com</p>
                </div>
            </div>
            <div className='invoiceDetailTable'>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">DATE</th>
                        <th scope="col">VENDOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='item'>
                            <th>{invoice.id}</th>
                            <td>{invoice.total}</td>
                            <td>{invoice.createdAt}</td>
                            <td>{invoice.vendor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}