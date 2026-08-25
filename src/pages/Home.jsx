import Hero from "../components/sections/Hero/Hero";
import Specialties from "../components/sections/Specialties/Specialties";
import AboutPreview from "../components/sections/AboutPreview/AboutPreview";
import LunchMenu from "../components/sections/LunchMenu/LunchMenu";
import Gallery from "../components/sections/Gallery/Gallery";
import Contact from "../components/sections/Contact/Contact";

function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <AboutPreview />
      <LunchMenu />
      <Gallery />
      <Contact />
    </>
  );
}

export default Home;
