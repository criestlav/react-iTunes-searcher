import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Searcher from "../common/searcher";
import { ItunesService } from "../../services";
import LoadingSpinner from "../common/loading-spinner";
import Item from "../common/item";
import Pagination from "../common/pagination";
import { Config } from "../../config";

const useStyles = makeStyles({
  mainContainer: {
    justifyContent: "center",
    marginTop: 40
  },
  resultsContainer: {
    padding: 20,
    justifyContent: "center",
    margin: 0,
    maxWidth: "100%"
  },
  paginationContainer: {
    flexDirection: "row-reverse",
    paddingRight: 20,
    marginBottom: 40
  }
});

function Movies() {
  const classes = useStyles();
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [searching, setSearching] = useState(false);

  const retrieveItems = page => {
    setCurrentPage(page);
    setMoviesList(
      allMovies.slice(
        Config.ITEMS_PER_PAGE * (page - 1),
        Config.ITEMS_PER_PAGE * page
      )
    );
  };
  const search = async query => {
    try {
      setPages(0);

      setSearching(true);
      const result = await ItunesService.get(query, "movie");
      setAllMovies(result.data.results);
      setMoviesList(result.data.results.slice(0, Config.ITEMS_PER_PAGE));
      setPages(Math.ceil(result.data.results.length / Config.ITEMS_PER_PAGE));
      setSearching(false);
    } catch (error) {
      console.log(error);
      setSearching(false);
    }
  };

  const movies = moviesList.reduce((movies, movie) => {
    const _movie = {};
    _movie.id = movie.trackId;
    _movie.title = movie.trackName;
    _movie.subtitle = movie.collectionName;
    _movie.image = movie.artworkUrl100
      ? movie.artworkUrl100
      : movie.artworkUrl60
      ? movie.artworkUrl60
      : movie.artworkUrl30;
    movies.push(
      <Grid key={_movie.id} item xs={12} sm={6} md={3}>
        <Item key={_movie.id} item={_movie} />
      </Grid>
    );
    return movies;
  }, []);

  return (
    <>
      <div>
        <Grid container className={classes.mainContainer}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <Searcher search={search} searching={searching} />
          </Grid>
        </Grid>
        {searching && (
          <Grid container className={classes.mainContainer}>
            <Grid item xs={12} sm={6} md={6} style={{ textAlign: "center" }}>
              <LoadingSpinner />
            </Grid>
          </Grid>
        )}
        {!searching && movies.length !== 0 && (
          <>
            <Grid container className={classes.resultsContainer} spacing={2}>
              {movies}
            </Grid>
            <Grid container className={classes.paginationContainer} spacing={2}>
              <Pagination
                count={pages}
                currentPage={currentPage}
                retrieveItems={retrieveItems}
              />
            </Grid>
          </>
        )}
      </div>
    </>
  );
}

export default Movies;
