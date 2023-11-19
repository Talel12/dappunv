import React from "react";
import Header from "../../components/header";
import Features from "../../components/features";
import About from "../../components/about";
import Contact from "../../components/contact";

const Home = ({ landingPageData }) => {
  return (
    <div>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default Home;
