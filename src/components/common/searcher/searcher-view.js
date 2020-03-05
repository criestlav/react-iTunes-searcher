import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    background:
      "linear-gradient(to left, rgba(208, 208, 83, 1) 0%, rgba(163, 163, 0, 1) 100%)",
    marginLeft: 0,
    width: "100%"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%"
  }
}));

function Searcher({ search, searching }) {
  const classes = useStyles();

  const [value, setValue] = useState("");

  const keyPress = async e => {
    if (e.keyCode !== 13) return;
    search(value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>
      <InputBase
        disabled={searching}
        onKeyDown={e => keyPress(e)}
        placeholder="Search…"
        onChange={e => {
          setValue(e.target.value);
        }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}

export default Searcher;
