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
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

class MovieComponent extends React.Component {
constructor(props) {
  super(props)

  this.state = {
    movieInfo:""
  }
}
componentDidMount() {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`,
    ).then((response) => this.setState.movieInfo (response.data));
  }

  render() {
  const { selectedMovie } = this.props;


  return (
      
    <Container>
      {this.state.movieInfo ? (
        <>
          <CoverImage src={this.state.movieInfo?.Poster} alt={this.state.movieInfo?.Title} />
          <InfoColumn>
            <MovieName>
              {this.state.movieInfo?.Type}: <span>{this.state.movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{this.state.movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{this.state.movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{this.state.movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{this.state.movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{this.state.movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{this.state.movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{this.state.movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{this.state.movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{this.state.movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{this.state.movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => this.props.onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
}
export default MovieInfoComponent;
