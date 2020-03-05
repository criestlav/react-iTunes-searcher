import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import songsBanner from "../../assets/images/songs-banner.jpg";
import moviesBanner from "../../assets/images/movies-banner.jpg";
import albumsBanner from "../../assets/images/albums-banner.jpg";
import { Link } from "react-router-dom";
import { RoutesLinks } from "../../routes";

const useStyles = makeStyles({
  root: {
    padding: 10
  },
  media: {
    height: 300
  },
  mainContainer: {
    padding: 20,
    justifyContent: "center",
    margin: 0,
    maxWidth: "100%"
  },
  homeLink: {
    textDecoration: "none",
    color: "white"
  }
});
const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.mainContainer} spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Card className={classes.root} onClick={() => {}}>
            <CardActionArea>
              <CardMedia className={classes.media} image={songsBanner} />
              <CardContent
                style={{
                  textAlign: "center",
                  background:
                    "linear-gradient(to right, rgba(208, 208, 83, 1) 0%, rgba(163, 163, 0, 1) 100%)"
                }}
              >
                <Link to={RoutesLinks.SONGS_LINK} className={classes.homeLink}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Songs
                  </Typography>
                </Link>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.media} image={albumsBanner} />
              <CardContent
                style={{
                  textAlign: "center",
                  background:
                    "linear-gradient(to right, rgba(208, 208, 83, 1) 0%, rgba(163, 163, 0, 1) 100%)"
                }}
              >
                {" "}
                <Link to={RoutesLinks.ALBUMS_LINK} className={classes.homeLink}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Albums
                  </Typography>
                </Link>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.media} image={moviesBanner} />
              <CardContent
                style={{
                  textAlign: "center",
                  background:
                    "linear-gradient(to right, rgba(208, 208, 83, 1) 0%, rgba(163, 163, 0, 1) 100%)"
                }}
              >
                {" "}
                <Link to={RoutesLinks.MOVIES_LINK} className={classes.homeLink}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Movies
                  </Typography>
                </Link>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
