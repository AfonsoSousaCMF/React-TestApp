import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationButtons = (props) => {
  const classes = useStyles();
  const [pages, setPages] = useState([]);

  return (
    <div className={classes.root}>
      <Pagination count={pages.count} showFirstButton showLastButton />
    </div>
  )
}

export default PaginationButtons
