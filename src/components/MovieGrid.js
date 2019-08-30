import React from "react";
import "../assets/styles/movie-grid.css";
import Preview from "./MoviePreview";
import MovieTile from './MovieTile'

class MovieGrid extends React.Component {
  state = {
    movies: [],
    upperList : [],
    lowerList : [],
    clickedItemID :0,
  };

  componentDidMount = () => {
    this.setState({
      movies: Object.values(this.props.moviesData).map(movie => ({
        EventTitle: movie.EventTitle,
        EventCode: movie.EventCode,
        ShowDate: movie.ShowDate,
        EventGenre: movie.EventGenre,
        EventLanguage: movie.EventLanguage,
        TrailerURL: movie.TrailerURL,
        wtsCount: movie.wtsCount,
        dwtsCount: movie.dwtsCount,
        maybeCount: movie.maybeCount,
        totalVotes: movie.totalVotes,
        wtsPerc: movie.wtsPerc
      }))
    },()=>{
      this.setState({
        upperList : this.state.movies
      })
      console.log(this.state.movies)
    });
  };

  handleClick = clickedItemID => {
    let columns =
      Math.floor(
        window.innerWidth / document.getElementsByClassName("box")[0].getBoundingClientRect().width
      ) || 1;
    let splitAt =Math.floor(clickedItemID / columns) * columns;
    let upperList = this.state.movies.slice(0,(splitAt));
    let lowerList = this.state.movies.slice(splitAt,(this.state.movies.length));
    this.setState({
      clickedItemID,
      upperList,
      lowerList,
      loading : false
    });

 
  };

  render() {
    return (
      <div className="movies-grid" id="movies-grid">
        {this.state.upperList.map((item, index) => {
          return (
            <MovieTile item={item} index={index} handleClick={this.handleClick} />
          );
        })}
      {this.state.lowerList.length&& 
      <Preview movie={this.state.movies[this.state.clickedItemID]} item={this.state.clickedItemID} handleClick={this.handleClick}/>
      }

    {this.state.lowerList.map((item, index) => {
          return (
            <MovieTile  item={item} index={index+this.state.upperList.length} handleClick={this.handleClick}/>
          )})}
      </div>
    );
  }
}

export default MovieGrid;
