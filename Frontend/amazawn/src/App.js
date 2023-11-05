
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import RequestDelivery from'./pages/RequestDelivery';
import CustomerSupport from './pages/CustomerSupport';
import Tracking from './pages/Tracking';

function App() {


  return (
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<HomePage />} />
    <Route path="/requestdelivery" element={<RequestDelivery />} />
    <Route path="/customersupport" element={<CustomerSupport />} />
    <Route path="/tracking" element={<Tracking />} />

    </Routes>
    </BrowserRouter>
  );

}

export default App;
