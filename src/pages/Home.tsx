import Navbar from "../layout/Navbar";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Features from "../sections/Features";
import About from "../sections/About";
import Footer from "../sections/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <About />
      <Footer />
    </>
  );
}

export default Home;