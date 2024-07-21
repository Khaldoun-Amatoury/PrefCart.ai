import Footer from "./Footer.jsx";
import Hero from "./Hero.jsx";
import OpeningTimes from "./OpeningTimes/OpeningTimes.jsx";
import Carousel from "./Carousel/Carousel.jsx";
import Testimonial from "./Testimonial.jsx";
import Contact from "./Contact.tsx";
import BarcodeScanner from "./Barcode.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <OpeningTimes />
      {/* <Testimonial testimonials={testimonials} /> */}
      <Testimonial />
      <Contact />
      <BarcodeScanner />
      <Footer />
    </>
  );
}
