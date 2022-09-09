import React, { useEffect, useState } from "react";
import { exportRowData, requests } from "../Api";
import "./Banner.css";

const Banner = () => {
  const [addReadMore, setAddReadMore] = useState(false);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchRowData = async () => {
      const request = await exportRowData.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchRowData();
  }, []);

  const descriptionTruncate = (string, n) => {
    return string?.length > n
      ? addReadMore
        ? string
        : string.substr(0, n - 1) + "..."
      : string;
  };

  const readMore = () => {
    setAddReadMore(true);
  };

  const readLess = () => {
    setAddReadMore(false);
  };

  console.log(movie);

  return (
    <div
      className="banner__container"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {descriptionTruncate(`${movie?.overview}`, 150)}
          {addReadMore ? (
            <span className="read__more" onClick={() => readLess()}>
              Read Less
            </span>
          ) : (
            <span className="read__less" onClick={() => readMore()}>
              Read More
            </span>
          )}
        </h1>
      </div>
      <div className="banner__fade-bottom" />
    </div>
  );
};

export default Banner;
