import { useState, useEffect } from "react";
import "./App.css";
import People from "./components/People";
import {
  Grid,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },

    textContent: {
      margin: "10px",
    },
    buttonText: {
      backgroundColor: "Black",
      color: "white",
      margin: "10px",
      textAlign: "center",
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    },
  })
);

function App() {
  const [people, setPeople] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ prev: false, next: true });
  const [charInput, setCharInput] = useState(null);
  const [inputFoucs, setInputFoucs] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const req = await fetch("https://swapi.dev/api/people");
      const res = await req.json();
      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      setLoading(false);
    })();
  }, []);

  const handleSearch = async () => {
    if (!charInput) return;

    const req = await fetch(
      `https://swapi.dev/api/people/?search=${charInput.trim()}`
    );
    const res = await req.json();
    setPeople(res.results);
  };
  const pagination = async (type, { prev, next }) => {
    if (type === "next") {
      const req = await fetch(next);
      const res = await req.json();

      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      return;
    } else {
      if (!prev) return;
      const req = await fetch(prev);
      const res = await req.json();

      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      return;
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Typography variant="title" component="h2">
          StarWars
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          type="text"
          aria-label="Search for character"
          name="characterSearch"
          id="outlined-required"
          placeholder="search character"
          value={charInput !== null ? charInput : ""}
          onChange={(e) => {
            setCharInput(e.target.value);
          }}
          onFocus={(e) => {
            setInputFoucs(true);
          }}
          className={classes.textContent}
        />

        <Button
          aria-label="Search"
          onClick={() => handleSearch()}
          className={classes.buttonText}
        >
          Search
        </Button>
      </Grid>
      {people === null ? (
        <div className="card_list_loading">{loading}</div>
      ) : (
        people.map((item, index) => (
          <People key={index} item={item} index={index} />
        ))
      )}

      {people !== null && people.length === 0 ? (
        <Container className={classes.buttonText}>
          <Typography variant="subtitle" component="h2">
            No data found
          </Typography>
        </Container>
      ) : (
        ""
      )}
      <Button
        onClick={() => pagination("prev", page)}
        style={{ display: page.prev === null ? "none" : "inline-block" }}
        className={classes.buttonText}
      >
        Prev
      </Button>
      <Button
        onClick={() => pagination("next", page)}
        style={{ display: page.next === null ? "none" : "inline-block" }}
        className={classes.buttonText}
      >
        Next
      </Button>
    </Grid>
  );
}

export default App;
