
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from './pages/HomePage';
import RequestDelivery from'./pages/RequestDelivery';
import RatingPage from './pages/RatingPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerSupport from './pages/CustomerSupport';
import Tracking from './pages/TrackingPage';
import TrackingDataPage from './components/TrackingDataPage';


function App() {


  return (

    <BrowserRouter>
    <ToastContainer />
    <Routes>

    <Route path="/" element={<HomePage />} />
    <Route path="/requestdelivery" element={<RequestDelivery />} />
    <Route path="/review" element={<RatingPage/>}/>

    <Route path="/customersupport" element={<CustomerSupport />} />
    <Route path="/tracking" element={<Tracking />} />
    <Route path="/trackingdata" element={<TrackingDataPage />} />


    </Routes>
    </BrowserRouter>
  );

}

export default App;
