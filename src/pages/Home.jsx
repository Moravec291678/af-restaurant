import Hero from "../components/sections/Hero/Hero";
import Specialties from "../components/sections/Specialties/Specialties";
import AboutPreview from "../components/sections/AboutPreview/AboutPreview";
import LunchMenu from "../components/sections/LunchMenu/LunchMenu";
import Gallery from "../components/sections/Gallery/Gallery";
import Contact from "../components/sections/Contact/Contact";
import ScrollReveal from "../components/ScrollReveal";

function Home() {
  return (
    <>
      <Hero />

      <ScrollReveal>
        <Specialties />
      </ScrollReveal>
      <ScrollReveal>
        <AboutPreview />
      </ScrollReveal>

      <ScrollReveal>
        <LunchMenu />
      </ScrollReveal>

      <ScrollReveal>
        <Gallery />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </>
  );
}

export default Home;
