import React from "react";
import Axios from "axios";
import styled from "styled-components";
import GameComponent from "./components/GameComponent";
import GameInfoComponent from "./components/MovieInfoComponent";
import Pagination from "./components/Pagination";
import JSONDATA from "./JSON/Game.json";

export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: red;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  height: 90px;
`;
const Body = styled.div`
  background-color: black;
`;
const Searchbody = styled.div`
  display: flex;
  align-items: center;
  margin-left: 130px;
`;
const SearchBox = styled.div`
  position: relative;
`;
const SearchInput = styled.input`
  width: 80px;
  height: 80px;
  background: none;
  border: 4px solid rgb(1, 192, 255);
  border-radius: 50px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 2;
  font-size: 20px;
  color: white;
  outline: none;
  transition: 0.5s;
  &:hover {
    width: 310px;
    margin-right: -2px;
    background: #black;
    border-radius: 60px;
    padding-left: 10px;
  }
  &:active {
    background: rgb(1, 192, 255);
  }
`;
const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translate(-50%, -50%);
  font-size: 26px;
  transition: 0.2s;
  &:hover {
    opacity: 0;
    z-index: -1;
  }
`;

const SortIn = styled.div`
  font-size: 20px;
  font-family: "Maven Pro";
  font-weight: 10;
  font-style: serif;
  color: grey;
  margin-right: 180px;
  &:hover {
    opacity: 60%;
  }
`;

const MovieImage = styled.img`
  width: 200px;
  height: 70px;
  padding-left: 60px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 25px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 250px;
  height: 100px;
  margin: 150px;
  opacity: 50%;
  margin-bottom: 240px;
`;

class GameApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      movieList: [],
      selectedMovie: undefined,
      timeoutId: undefined,
      currentPage: 1,
      postPerPage: 3,
      searchTerm: ""
    };
  }
  changeselect = (event) => {
    this.setState({ selectedMovie: event });
    console.log(
      "the selected movie is " +
        this.state.selectedMovie +
        " and id is " +
        event
    );
  };
  selectnone = () => {
    console.log("the closed movie ID was " + this.state.selectedMovie);
    this.setState({ selectedMovie: "" });
  };

  componentDidMount() {
    const self = this;
    async function fetchMyAPI() {
      let url = `https://www.omdbapi.com/?s=Game&apikey=a9118a3a`;
      console.log(url);
      const response = await Axios.get(url);
      console.log(url);

      self.setState({ movieList: response.data.Search });
    }
    fetchMyAPI();
  }
  render() {
  
    const fetchData = async (searchString) => {
      let url = "";

      if (searchString !== "") {
        url = `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`;
        console.log("Clicked");
      } else {
        url = `https://www.omdbapi.com/?s=avenger&apikey=a9118a3a`;
        console.log(url);
      }
      const response = await Axios.get(url);
      console.log(url);
      console.log(response);
      this.setState({ movieList: response.data.Search });
    };
    const onTextChange = (e) => {
      this.setState({ selectedMovie: "" });
      clearTimeout(this.state.timeoutId);
      this.setState({ searchQuery: e.target.value });
      const timeout = setTimeout(() => fetchData(e.target.value), 1000);
      this.setState({ timeoutId: timeout });
    };
    var selectType = React.createRef();

    const selectone = (value) => {
      console.log(value);
      if (value === "asc") {
        this.state.movieList.sort((a, b) => {
          console.log("asc attended");
          return a.Title.localeCompare(b.Title);
        });
        this.setState({ movieList: [...this.state.movieList] });
        console.log(this.state.movieList);
      } else if (value === "dsc") {
        this.state.movieList.sort((a, b) => {
          console.log("dsc attended");
          return b.Title.localeCompare(a.Title);
        });
        this.setState({ movieList: [...this.state.movieList] });
        console.log(this.state.movieList);
      } else if (value === "rasc") {
        this.state.movieList.sort((a, b) => {
          console.log("asc Year attended");
          return a.Year.localeCompare(b.Year);
        });
        this.setState({ movieList: [...this.state.movieList] });
        console.log(this.state.movieList);
      } else if (value === "rdsc") {
        this.state.movieList.sort((a, b) => {
          console.log("dsc Year attended");
          return b.Year.localeCompare(a.Year);
        });
        this.setState({ movieList: [...this.state.movieList] });
        console.log(this.state.movieList);
      }
    };
    const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
    const currentPost = this.state.movieList.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pagenumber) => this.setState({ currentPage: pagenumber });
    const check = () => console.log(this.selectedMovie);
    return (
      <Container>
        <Header>
          <AppName>
            <MovieImage src="logo.png" />
          </AppName>
       
                      
          <Searchbody>
            <SearchBox>
              <SearchIcon src="search-icon.svg" />
              <SearchInput
                value={this.state.searchQuery}
                onChange={onTextChange}
              />
            </SearchBox>
          </Searchbody>

          <SortIn>
            <label>Sort By: </label>
            <select
              ref={selectType}
              onClick={(event) => selectone(event.target.value)}
            >
              <option value=""> </option>
              <option value="asc">Name-ascending</option>
              <option value="dsc">Name-descending</option>
              <option value="rasc">Year-ascending</option>
              <option value="rdsc">Year-descending</option>
            </select>
          </SortIn>
        </Header>
        <Body>
          {this.state.selectedMovie && (
            <GameInfoComponent
              selectedMovie={this.state.selectedMovie}
              onMovieSelect={this.selectnone}
            />
          )}

          <MovieListContainer>
            {currentPost?.length ? (
              currentPost.map((movie, index) => (
                <GameComponent
                  key={index}
                  movie={movie}
                  selectedMovie={this.state.selectedMovie}
                  onMovieSelect={this.changeselect}
                  check={this.check}
                />
              ))
            ) : (
              <Placeholder src="logo.png" />
            )}
          </MovieListContainer>
          <Pagination
            postsPerPage={this.state.postPerPage}
            totalPosts={this.state.movieList.length}
            paginate={paginate}
          ></Pagination>
        </Body>
      </Container>
    );
  }
}
export default GameApp;
