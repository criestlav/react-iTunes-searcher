import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination as PaginationMUI } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function Pagination({ count, currentPage, retrieveItems }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PaginationMUI
        disabled={count === 1 ? true : false}
        onChange={(event, page) => {
          retrieveItems(page);
        }}
        hideNextButton={currentPage === count ? true : false}
        hidePrevButton={currentPage === 1 ? true : false}
        count={count}
        defaultPage={1}
        siblingCount={0}
        boundaryCount={2}
      />
    </div>
  );
}

export default Pagination;
