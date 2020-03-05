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
function Songs() {
  const classes = useStyles();

  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsList, setSongsList] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(false);

  const retrieveItems = page => {
    setCurrentPage(page);
    setSongsList(
      allSongs.slice(
        Config.ITEMS_PER_PAGE * (page - 1),
        Config.ITEMS_PER_PAGE * page
      )
    );
  };

  const search = async query => {
    try {
      setPages(0);
      setSearching(true);
      setError(false);
      const result = await ItunesService.get(query, "song");
      setAllSongs(result.data.results);
      setSongsList(result.data.results.slice(0, Config.ITEMS_PER_PAGE));
      setPages(Math.ceil(result.data.results.length / Config.ITEMS_PER_PAGE));
      setSearching(false);
    } catch (error) {
      console.log(error);
      setSearching(false);
      setError(true);
    }
  };

  const songs = songsList.reduce((songs, song) => {
    const _song = {};
    _song.id = song.trackId;
    _song.title = song.trackName;
    _song.subtitle = song.collectionName;
    _song.image = song.artworkUrl100
      ? song.artworkUrl100
      : song.artworkUrl60
      ? song.artworkUrl60
      : song.artworkUrl30;
    songs.push(
      <Grid key={_song.id} item xs={12} sm={6} md={3}>
        <Item key={_song.id} item={_song} />
      </Grid>
    );
    return songs;
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
        {!searching && songs.length !== 0 && (
          <>
            <Grid container className={classes.resultsContainer} spacing={2}>
              {songs}
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

export default Songs;
