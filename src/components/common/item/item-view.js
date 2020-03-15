import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    padding: 10
  },
  media: {
    height: 140
  },
  content: {
    height: 200
  }
});

function Item({ item }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={item.image} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {item.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Item;
