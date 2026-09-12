import Hero from "./home/HeroSection/Hero"
import Welcome from "./home/WelcomeSection/Welcome"
import Service from "./home/ServiceSection/Service"
import Project from "./home/ProjectCarousel/Project"
import Support from "./home/SupportSection/Support"
import Involved from "./home/Involved/Involved"
import Event from "./home/Event/Event"
import Blog from "./home/BlogSection/Blog"
import Newsletter from "./home/Newsletter/Newsletter"
import Testimonials from "./home/Testimonials/Testimonials"



export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Service />
      <Project />
      <Support />
      <Involved />
      <Event />
      <Blog />
      <Newsletter />
      <Testimonials />
    </>
  );
}
