//Rating Confirmation Page
import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => (
  <div style={{ textAlign: 'center' }}>
    <h2>Review Submitted</h2>
    <p>Thank you for using our services!</p>
    <Link to="/" className="link">
    <button className='btn'>Back to Home</button>
    </Link>
  </div>
);

export default ConfirmationPage;
