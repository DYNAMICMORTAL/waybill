import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./client.module.css";
import styless from "../src/app/page.module.css";
import { MdOutlineArrowUpward } from 'react-icons/md';
import jsPDF from 'jspdf';
import { Base64 } from 'js-base64';
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas';

interface DataItem {
  srNo: string;
  date: string;
  toName: string;
  branch: string;
  podNo: string;
  department: string;
  particular: string;
  noOfEnvelopes: string;
  weight: string;
  senderName: string;
  rates: string;
  dpartner:string;
  bluedart: string;
  deliveryDate: string;
}

export default function ClientPage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('/api/data');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateAndOpenPDF = async (pdf: jsPDF) => {
    const pdfDataUri = await pdf.output('datauristring'); // Assuming this is an async operation
    window.open(pdfDataUri, '_blank');
  };
  
  const generatePDF = (item: DataItem) => {
    const pdf = new jsPDF();
      // const imageUrl = 'https://imgur.com/edx5Sb0.png';
      var imgData ='data:image/jpeg;base64,'+ Base64.encode('https://imgur.com/edx5Sb0.png');
      // console.log(imgData)
      pdf.addImage(imgData, 'JPEG', 15, 40, 150, 160);
      pdf.output('datauri')
    // pdf.addImage('https://imgur.com/edx5Sb0.png', 'PNG', 10, 10, 50, 50);
      pdf.setFontSize(10);
      pdf.text(`Invoice #: ${item.srNo}`, 150, 20);
      pdf.text(`Created: ${item.date}`, 150, 30);
      pdf.text(`Delivery Date: ${item.deliveryDate}`, 150, 40);
    
      pdf.setFontSize(12);
      pdf.text(`From:`, 10, 70);
      pdf.text(`${item.senderName}`, 10, 80);
      pdf.text(`Department: ${item.department}`, 10, 90);
      // pdf.text(`Sunnyville, CA 12345`, 10, 100);
    
      pdf.text(`To:`, 150, 70);
      pdf.text(`${item.toName}`, 150, 80);
      pdf.text(`Branch: ${item.branch}`, 150, 90);
      pdf.text(`POD NO: ${item.podNo}`, 150, 100);
    
      // const titles = ['Item', 'Envelopes', 'Weight', 'Rates', 'Partner'];
      // const startX = [10, 50, 90, 130, 150];
      // const titlesStartY = 120; // Unique variable name
      // titles.forEach((title, index) => {
      //   pdf.text(title, startX[index], titlesStartY);
      // });

      // const items = [
      //   { name: item.particular, envelopes: item.noOfEnvelopes, weight: item.weight, rates: item.rates, partner: item.dPartner }
      // ];

      // let startY = 130;
      // items.forEach(item => {
      //   pdf.text(item.name.toString(), 10, startY); // Convert to string to ensure compatibility
      //   pdf.text(item.envelopes.toString(), 50, startY); // Convert to string
      //   pdf.text(item.weight.toString(), 90, startY); // Convert to string
      //   pdf.text(item.rates.toString(), 130, startY); // Convert to string
      //   // pdf.text(item.partner.toString(), 170, startY); // Convert to string, potential source of the error
      //   startY += 10; // Ensure startY is incremented by a number
      // });
      autoTable(pdf, {
        margin: {top: 120},
        theme: 'grid',
        head: [['Item', 'Envelopes', 'Weight', 'Rates', 'Partner']],
        body: [
          [item.particular, item.noOfEnvelopes, item.weight, item.rates, item.dpartner],
        ],
      })
      // const tableColumn = ["Item", "Description", "Quantity", "Unit Price", "Total"];
//   const tableRows = [
//   ["Widget A", "A widget", "10", "$2.00", "$20.00"],
//   ["Widget B", "Another widget", "5", "$3.00", "$15.00"],
//   ["Service C", "A service", "1", "$100.00", "$100.00"]
// ];

// pdf.text('Signature: __________________________', 20, pdf.autoTable.previous.finalY + 40);
const now = new Date();
const dateString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds()}`;
pdf.setTextColor(150);
pdf.setFontSize(10);
const pageHeight = pdf.internal.pageSize.getHeight();
pdf.text(dateString, pdf.internal.pageSize.getWidth() - 60, pageHeight - 10); // Adjust X and Y accordingly
    generateAndOpenPDF(pdf);
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className={styless.title}>Client Dashboard</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Date</th>
            <th>To Name</th>
            <th>Branch</th>
            <th>POD No</th>
            <th>Department</th>
            <th>Particular</th>
            <th>No of Envelopes</th>
            <th>Weight</th>
            <th>Rates</th>
            <th>Bluedart</th>
            <th>Delivery Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.srNo}</td>
              <td>{item.date}</td>
              <td>{item.toName}</td>
              <td>{item.branch}</td>
              <td>{item.podNo}</td>
              <td>{item.department}</td>
              <td>{item.particular}</td>
              <td>{item.noOfEnvelopes}</td>
              <td>{item.weight}</td>
              <td>{item.rates}</td>
              <td>{item.bluedart}</td>
              <td>{item.deliveryDate}</td>
              <td>
                <MdOutlineArrowUpward onClick={() => generatePDF(item)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
