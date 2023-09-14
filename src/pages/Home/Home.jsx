import { Link } from "react-router-dom";
import "./Home.css";
import ScrollPath from "../../components/ScrollPath";
import Checkout from "../Checkout/Checkout";
import About from "../About/About";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="home-container">
        <h1>You got the travel plans, we got the travel vans.</h1>
        <p>
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>

        <ScrollPath text="About Our Vans" offset={true} />
        <section>
          <About />
        </section>
        <ScrollPath text="Images" />
        <section
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          <img src="/assets/images/van1.png" alt="Van 1" />
          <img src="/assets/images/van1.png" alt="Van 2" />
          <img src="/assets/images/van1.png" alt="Van 3" />
        </section>
        <ScrollPath text="Our Amazing Rent System" />
        <section>
          {/* Add content about your rent system here */}
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </section>

        <ScrollPath text="Rent Form" />
        <section>
          <Checkout />
        </section>

        <ScrollPath text="Contact Us" />
        <section>
          <Checkout />
        </section>

        <Link to="vans">Find your van</Link>
      </div>
    </ParallaxProvider>
  );
}
