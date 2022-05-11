import React from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadEpisodes } from "../../ducks/episodes/actions";
import Card from "./Card.js";
import classes from "./EpisodeList.module.scss";
const EpisodesList = ({ episodes, loading, history }, props) => {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("title");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        title: "title",
        release_date: "release_date",
        charactersList: "charactersList",
        titleDESC: "title",
        BreakingBad: "series",
        BetterCallSaul: "series",
      };
      const sortProperty = types[type];
      if (sortProperty === "series") {
        if (type === "BreakingBad") {
          const filtered = [...episodes].filter(
            (episode) => episode.series === "Breaking Bad"
          );
          setData(filtered);
        } else {
          const filtered = [...episodes].filter(
            (episode) => episode.series !== "Breaking Bad"
          );
          setData(filtered);
        }
      } else if (sortProperty === "title") {
        if (type === "titleDESC") {
          const sorted = [...episodes].sort(
            (a, b) =>
              ("" + a[sortProperty]).localeCompare("" + b[sortProperty]) * -1
          );

          setData(sorted);
        } else {
          const sorted = [...episodes].sort((a, b) =>
            ("" + a[sortProperty]).localeCompare("" + b[sortProperty])
          );
          setData(sorted);
        }
      } else if (sortProperty === "charactersList") {
        const sorted = [...episodes].sort(
          (a, b) => a.charactersList.length - b.charactersList.length
        );

        setData(sorted);
      } else {
        const sorted = [...episodes].sort((a, b) =>
          ("" + a[sortProperty]).localeCompare("" + b[sortProperty])
        );
        setData(sorted);
      }
    };

    sortArray(sortType);
  }, [episodes, sortType]);

  return (
    <div className={classes.item}>
      <div>
        <button
          className={classes.button}
          onClick={() => history.push("/addEpisode")}
        >
          Dodaj epizod
        </button>
      </div>

      <select
        className={classes.select}
        defaultValue="Sort"
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="title">Alfabetycznie A-Z</option>
        <option value="titleDESC">Afabetycznie Z-A</option>
        <option value="release_date">wg. daty rosnąco</option>
        <option value="charactersList">wg. postaci rosnąco </option>
      </select>
      <select
        className={classes.select}
        defaultValue="Sort"
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="All">Wyświetl wszystkie</option>
        <option value="BreakingBad">Breaking Bad</option>
        <option value="BetterCallSaul">Better Call Saul</option>
      </select>

      {data &&
        data.map((episode) => (
          <Card key={episode.id}>
            <div className={classes.image}>
              <img src={episode.img} alt={episode.title} />
            </div>

            <div className={classes.content} key={episode.id}>
              <Link to={`episodes/${episode.id}`}> {episode.title} </Link>
              <div> {episode.release_date} </div>
              <div> {episode.series} </div>
              <div>
                {" "}
                Liczba postaci w odcinku: {episode.charactersList.length}{" "}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    episodes: state.episodes.episodes,
    loading: state.episodes.loading,
  };
};
const mapDispatchToProps = {
  loadEpisodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodesList);
