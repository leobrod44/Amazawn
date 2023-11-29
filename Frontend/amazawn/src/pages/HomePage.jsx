import { Link } from "react-router-dom";
import Header from "../components/Header";
import HOMPAGE from "../assets/images/HOMPAGE.png";
import support from "../assets/images/support.png";
import "../styling/HomePage.css";
import Footer from "../components/Footer";
const HomePage = () => {
  return (
    <div className="container-page">
      <nav>
        <Header />
      </nav>

      <section className="centered">
        <div className="shipping-content">
          <div className="shipping-image">
            <img src={HOMPAGE} alt="Shipping" className="shipping-image" />
          </div>
          <div className="shipping-text">
            <h3 className="text-title">Let's Get Shipping</h3>
            <div className="line-div2">
              <div className="green-line2"></div>
            </div>
            <p className="pvalue">Start shipping your packages.</p>
            <Link to="/requestdelivery" className="btn">
              Ship Now
            </Link>
          </div>
        </div>
      </section>

      <section className="centered">
        <div className="support-content">
          <div className="text-container">
            <h3 className="text-title">Support</h3>
            <div className="line-div2">
              <div className="green-line2"></div>
            </div>
            <p className="pvalue">We're here for all your needs.</p>
            <p className="pvalue">
              Reach out to us with any questions or concerns.
            </p>
            <Link to="/CustomerSupport" className="btn">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="support-image">
          <img src={support} alt="support" className="shipping-image" />
        </div>
      </section>

      <section className="about-us">
        <div className="about-us-content">
          <h3 className="aboutush3"> About Us</h3>
          <div className="line-div">
            <div className="green-line"></div>
          </div>
          <p className="aboutusp">Explore what makes us unique.</p>

          <div className="cards">
            <div className="card">
              <h5 className="card-title">Seamless Experience</h5>
              <p>
                {" "}
                Unlike our competitors, Amazawn integrates all parts of the
                delivery process into one seamless chain, improving efficiency
                and user experience.
              </p>
            </div>

            <div className="card">
              <h5 className="card-title">Transparency</h5>
              <p>
                Providing transparency at every stage of the service through
                detailed quotations, live tracking, and continuous feedback.{" "}
              </p>
            </div>

            <div className="card">
              <h5 className="card-title">Live Tracking</h5>
              <p>
                Monitor your package's location with our accurate and easy to
                use tracking service.{" "}
              </p>
            </div>

            <div className="card">
              <h5 className="card-title">Home Pickup</h5>
              <p>
                We will pickup your package at your door, so you don't have to
                travel to the post office.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
