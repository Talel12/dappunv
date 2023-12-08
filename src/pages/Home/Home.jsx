import React from "react";
import Header from "../../components/header";
import Features from "../../components/features";
import About from "../../components/about";
import Contact from "../../components/contact";
import Emploi from "./Emploi";
import Stage from "./Stage";

const Home = ({ landingPageData }) => {
  return (
    <div>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <Emploi />
      <Stage />
      <About data={landingPageData.About} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default Home;
