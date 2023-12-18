import Contact from "../components/Contact/Contact";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Sections from "../components/about/About";


const HomePage = () => {
  return (
    <div className="w-full h-screen">
      <NavBar/>
      <Hero/>
      <Sections/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default HomePage;
