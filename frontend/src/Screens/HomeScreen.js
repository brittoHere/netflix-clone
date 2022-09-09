import React from "react";
import { NavBar, Banner, Row } from "../Components";
import { requests } from "../Api";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className="home__screen-container">
      <NavBar />
      <Banner />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeGrow
      />
      <Row title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      {/* <Row title="Action" fetchUrl={requests.fetchActionMovies} /> */}

      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      {/* <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} /> */}
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default HomeScreen;
