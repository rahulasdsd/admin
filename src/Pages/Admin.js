// Admin.js
import React, { useEffect, useState, useRef } from 'react';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const Admin = () => {
  const [orders, setOrders] = useState([]);
  const orderRefs = useRef({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

   const downloadPDF = async (orderId) => {
    const input = orderRefs.current[orderId];
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`order-${orderId}.pdf`);
  };

  return (
    <div className="admin-container">
      <h1>Orders Management</h1>
     
      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="user-info">
              <h3>{order.name}</h3>
              <p>{order.mobile}</p>
              <p>{order.address}</p>
              <p>Total: ₹{order.total.toFixed(2)}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <div className="list-container">

              <h4>Products:</h4>
              <table>
                  <div  className="list-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              {order.orders.map((item, index) => (
                <div key={index}>


                    <tbody>
                      <td>
                        <img src={item.image} alt={item.productName} width="80" />
                      </td>
                      <td>
                        <h5>{item.productName}</h5>
                      </td>
                      <td>
                        <p>Price: ₹{item.price.toFixed(2)}</p>
                      </td>
                      <td>
                        <p>Quantity: {item.quantity}</p>
                      </td>

                    </tbody>
                    </div>
                    ))}
                  </div>

                </table>
             
            </div>
             <button
              onClick={() => downloadPDF(order._id)}
              style={{
                marginTop: '10px',
                backgroundColor: 'green',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;