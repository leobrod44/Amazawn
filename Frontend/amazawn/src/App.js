
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import RequestDelivery from'./pages/RequestDelivery';
import CustomerService from './pages/CustomerSupport';

function App() {


  return (
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<HomePage />} />
    <Route path="/requestdelivery" element={<RequestDelivery />} />
    <Route path="/customerservice" element={<CustomerService />} />

    </Routes>
    </BrowserRouter>
  );

}

export default App;
