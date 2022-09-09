import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";
import { exportRowData } from "../Api";

const Row = ({ title, fetchUrl, isLargeGrow = false }) => {
  const [movies, setMovies] = useState([]);
  console.log(movies);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [emptyData, setEmptyData] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [hovered, setHovered] = useState();

  useEffect(() => {
    if (trailerUrl) {
      document.body.classList.add("overlay");
    } else {
      document.body.classList.remove("overlay");
    }

    if (emptyData === true) {
      document.body.classList.add("overlay__empty");
    } else {
      document.body.classList.remove("overlay__empty");
    }
  }, [trailerUrl, emptyData]);

  const showDescription = (movie) => {
    setHovered(movie?.id);
  };

  const hideDescription = () => {
    setHovered("");
  };

  const playTrailer = (movie) => {
    setMovieId(movie?.id);

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          let urlParamsHere = urlParams.get("v");
          setTrailerUrl(urlParamsHere);
          setEmptyData(false);
        })
        .catch((err) => {
          console.log(err);
          setEmptyData(true);
        });
    }
  };

  const closeEmptyData = () => {
    setEmptyData(false);
  };

  const modalClose = () => {
    setTrailerUrl("");
  };

  const imagesBaseUrl = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "500vh",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    const rowData = async () => {
      const request = exportRowData.get(fetchUrl);
      request
        .then((res) => {
          setMovies(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
      return request;
    };
    rowData();
  }, [fetchUrl]);
  console.log(movies);
  return (
    <div className="row__container">
      <h2>{title}</h2>
      <div className="movie__posters-container">
        {movies.map((movie, key) => {
          const rowImagesNormal = `${imagesBaseUrl}${movie.backdrop_path}`;
          const rowImagesLarge = `${imagesBaseUrl}${movie.poster_path}`;
          return (
            <div
              className={
                hovered === movie?.id
                  ? isLargeGrow === true
                    ? "large__hover__items"
                    : "hover__items"
                  : null
              }
              key={key}
            >
              <img
                onMouseOver={() => showDescription(movie)}
                onMouseOut={() => hideDescription()}
                onClick={() => playTrailer(movie)}
                key={movie.id}
                className={`movie__poster ${
                  isLargeGrow && "movie__poster-large"
                }`}
                src={isLargeGrow ? rowImagesLarge : rowImagesNormal}
                alt={movie.name}
              />

              {movie?.id && (
                <div className="hover__items-container">
                  <div className="row__items-btn">
                    <button className="thumb__btn">Play</button>
                    <button className="thumb__btn">+</button>
                  </div>

                  <div className="poster__contents">
                    <p>{movie?.original_name}</p>
                  </div>
                </div>
              )}

              {movieId === movie?.id && emptyData && (
                <div className="video__screen-container">
                  <div className="video__screen-div">
                    <p className="no__video-description">
                      Sorry we release the trailer soon. Enjoy the other shows
                      you love.
                    </p>
                  </div>

                  <div>
                    <i
                      onClick={() => closeEmptyData()}
                      className="fa-solid fa-xmark close__icon"
                    ></i>
                  </div>
                </div>
              )}

              {movieId === movie?.id && trailerUrl && (
                <div className="video__screen-container">
                  <div className="video__screen-div">
                    <YouTube
                      className="video__screen"
                      videoId={trailerUrl}
                      opts={opts}
                    />
                    <i
                      onClick={() => modalClose()}
                      className="fa-solid fa-xmark close__icon"
                    ></i>
                    <div>
                      <div className="popup__video-btns">
                        <button className="design__btn">Play</button>
                        <button className="design__btn">My List</button>
                      </div>
                      <div className="movie__description">
                        <p className="overview__size">{movie?.overview}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
