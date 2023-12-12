import Contact from "../components/Contact/Contact";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Sections from "../components/sections/Sections";


const HomePage = () => {
  return (
    <>
      <NavBar/>
      <Hero/>
      <Sections/>
      <Contact/>
      <Footer/>
    </>
  );
};

export default HomePage;
