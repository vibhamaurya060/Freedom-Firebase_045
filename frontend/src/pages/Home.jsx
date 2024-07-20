import Footer from "../componets/Footer";
import AppNavbar from "../componets/AppNavBar";

import MagicBanner from "../componets/Carousel";

import WelcomeSection from "../componets/WelcomSection";
import VideosSection from "../componets/vedioSection";
import Service from "../componets/Service";
import EventsPage from "../componets/Container";
import BoookEvents from "./BookEvents";

export const Home = () => {
  return (
    <>
      <AppNavbar />
      <MagicBanner />
      <WelcomeSection />
      <EventsPage />
      <Service />
      <VideosSection />

      <Footer />
    </>
  );
};
