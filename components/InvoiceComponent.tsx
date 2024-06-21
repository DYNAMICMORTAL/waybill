import React from 'react';

// Define interfaces for the props and nested objects
interface InvoiceItem {
  description: string;
  price: number;
}

interface InvoiceDetails {
  logo: string;
  number: string;
  created: string;
  due: string;
  sender: {
    name: string;
    address: string;
    city: string;
  };
  client: {
    name: string;
    email: string;
  };
  items: InvoiceItem[];
  total: number;
}

interface InvoiceComponentProps {
  invoiceDetails: InvoiceDetails;
}

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({ invoiceDetails }) => {
  return (
    <div className="invoice-box">
      <table cellPadding="0" cellSpacing="0">
        <tr className="top">
          <td colSpan={2}>
            <table>
              <tr>
                <td className="title">
                  <img src={invoiceDetails.logo} alt="Company Logo" style={{ height: '100px' }} />
                </td>
                <td>
                  Invoice #: {invoiceDetails.number}<br />
                  Created: {invoiceDetails.created}<br />
                  Due: {invoiceDetails.due}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <tr className="information">
          <td colSpan={2}>
            <table>
              <tr>
                <td>
                  {invoiceDetails.sender.name}<br />
                  {invoiceDetails.sender.address}<br />
                  {invoiceDetails.sender.city}
                </td>
                <td>
                  {invoiceDetails.client.name}<br />
                  {invoiceDetails.client.email}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <tr className="heading">
          <td>Item</td>
          <td>Price</td>
        </tr>
        
        {invoiceDetails.items.map((item, index) => (
          <tr className="item" key={index}>
            <td>{item.description}</td>
            <td>${item.price}</td>
          </tr>
        ))}
        
        <tr className="total">
          <td></td>
          <td>Total: ${invoiceDetails.total}</td>
        </tr>
      </table>
    </div>
  );
};

export default InvoiceComponent;