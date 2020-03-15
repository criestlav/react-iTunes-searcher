import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Searcher from "../common/searcher";
import { ItunesService } from "../../services";
import LoadingSpinner from "../common/loading-spinner";
import Item from "../common/item";
import { Config } from "../../config";
import Pagination from "../common/pagination";

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
function Albums() {
  const classes = useStyles();
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allAlbums, setAllAlbums] = useState([]);
  const [albumsList, setAlbumsList] = useState([]);
  const [searching, setSearching] = useState(false);

  const retrieveItems = page => {
    setCurrentPage(page);
    setAlbumsList(
      allAlbums.slice(
        Config.ITEMS_PER_PAGE * (page - 1),
        Config.ITEMS_PER_PAGE * page
      )
    );
  };

  const search = async query => {
    try {
      setPages(0);
      setSearching(true);
      const result = await ItunesService.get(query, "album");
      setAllAlbums(result.data.results);
      setAlbumsList(result.data.results.slice(0, Config.ITEMS_PER_PAGE));
      setPages(Math.ceil(result.data.results.length / Config.ITEMS_PER_PAGE));
      setSearching(false);
    } catch (error) {
      console.log(error);
      setSearching(false);
    }
  };

  const albums = albumsList.reduce((albums, album) => {
    const _album = {};
    _album.id = album.collectionId;
    _album.title = album.artistName;
    _album.subtitle = album.collectionName;
    _album.image = album.artworkUrl100
      ? album.artworkUrl100
      : album.artworkUrl60
      ? album.artworkUrl60
      : album.artworkUrl30;
    albums.push(
      <Grid key={_album.id} item xs={12} sm={6} md={3}>
        <Item key={_album.id} item={_album} />
      </Grid>
    );
    return albums;
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
        {!searching && albums.length !== 0 && (
          <>
            <Grid container className={classes.resultsContainer} spacing={2}>
              {albums}
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

export default Albums;
