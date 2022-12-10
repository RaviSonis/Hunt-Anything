import React from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Trailer = styled.button`
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  color: rgb(1, 192, 255);
  cursor: pointer;
  font-family: "Basier circle", -apple-system, system-ui, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 305px;
  padding: 10px;
  width: 25%;
  &:hover {
    background-color: rgb(1, 192, 255);
    color: #fff;
  }
`;
const Close = styled.span`
  font-size: 10px;
  font-weight: 60;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
class GameInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInfo: "",
      trailerInfo: "",
    };
  }

  componentDidMount() {
    var selectedMovie = this.props.selectedMovie;
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`
    ).then((response) => this.setState({ movieInfo: response.data }));
    console.log("Clicked");
  }
  render() {
    var { selectedMovie } = this.props.selectedMovie;
    const {
      Title,
      Year,
      Type,
      Poster,
      imdbRating,
      Language,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Actors,
      Plot,
    } = this.state.movieInfo;
    console.log("the popup is of " + this.props.selectedMovie);
    console.log("The selected movie before render is " + { selectedMovie });
    const openInNewTab = (url) => {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    };
    const onClickUrl = (url) => {
      return () => openInNewTab(url);
    };
    return (
      <Container>
        {this.state.movieInfo ? (
          <>
            <CoverImage src={Poster} alt={Title} />
            <InfoColumn>
              <MovieName>
                {Type}: <span>{Title}</span>
              </MovieName>
              <MovieInfo>
                IMDB Rating: <span>{imdbRating}</span>
              </MovieInfo>
              <MovieInfo>
                Year: <span>{Year}</span>
              </MovieInfo>
              <MovieInfo>
                Language: <span>{Language}</span>
              </MovieInfo>
              <MovieInfo>
                Rated: <span>{Rated}</span>
              </MovieInfo>
              <MovieInfo>
                Released: <span>{Released}</span>
              </MovieInfo>
              <MovieInfo>
                Runtime: <span>{Runtime}</span>
              </MovieInfo>
              <MovieInfo>
                Genre: <span>{Genre}</span>
              </MovieInfo>
              <MovieInfo>
                Director: <span>{Director}</span>
              </MovieInfo>
              <MovieInfo>
                Actors: <span>{Actors}</span>
              </MovieInfo>
              <MovieInfo>
                Plot: <span>{Plot}</span>
              </MovieInfo>

              <Trailer
                class="button-81"
                onClick={onClickUrl(
                  `https://www.youtube.com/results?search_query=${Title}+trailer`
                )}
              >
                Trailer
              </Trailer>
            </InfoColumn>
            <Close onClick={() => this.props.onMovieSelect()}>X</Close>
          </>
        ) : (
          "Loading..."
        )}
      </Container>
    );
  }
}
export default GameInfoComponent;
