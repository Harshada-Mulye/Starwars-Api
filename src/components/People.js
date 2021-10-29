import React, { useState } from "react";
import { Grid, Card, Button, Container } from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "black",
    },
    buttonDisplay: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 10,
      height: "100%",
      backgroundColor: "black",
      color: "yellow",
      width: "100%",
    },
    cardName: {
      backgroundColor: "black",
      color: "yellow",
    },
    cardContent: {
      backgroundColor: "#D3D3D3",
    },
  })
);
function People({ item, index }) {
  const { name, birth_year, height } = item;
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={12} md={8}>
        <Card className={classes.root}>
          <Button
            className={classes.buttonDisplay}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            data-allow-toggle
          >
            {name}
          </Button>
        </Card>
        {isOpen && (
          <Container className={classes.cardContent}>
            <p tabIndex="0">Name: {name}</p>
            <p tabIndex="0">Year born : {birth_year}</p>
            <p tabIndex="0">Height: {height}</p>
          </Container>
        )}
      </Grid>
    </Grid>
  );
}

export default People;
