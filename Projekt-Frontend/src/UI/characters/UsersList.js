import React from "react";
import { connect } from "react-redux";
import { loadCharacters } from "../../ducks/characters/actions";
import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../episodes/Card";
import classes from "./UsersList.module.scss";
const UsersList = ({ characters, loading }, props) => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("name");
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: "name",
        birthday: "birthday",
        id: "id",
        Dead: "status",
        Alive: "status",
      };
      const sortProperty = types[type];
      if (types[type] === "status") {
        if (type === "Alive") {
          const filtered = [...characters].filter(
            (character) => character.status === "Alive"
          );
          setData(filtered);
        } else if (type === "Dead") {
          const filtered = [...characters].filter(
            (character) => character.status === "Dead"
          );
          setData(filtered);
        }
      } else {
        const sorted = [...characters].sort((a, b) =>
          ("" + a[sortProperty]).localeCompare("" + b[sortProperty])
        );
        setData(sorted);
      }
    };

    sortArray(sortType);
  }, [characters, sortType]);

  return (
    <div className={classes.item}>
      <div>
        <button
          className={classes.button}
          onClick={() => history.push("/addUser")}
        >
          Dodaj postać
        </button>
      </div>
      <select
        className={classes.select}
        defaultValue="Sort"
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="name">Alfabetycznie A-Z</option>
        <option value="birthday">wg. daty rosnąco</option>
        <option value="id">wg. id (chronologicznie) </option>
      </select>
      <select
        className={classes.select}
        defaultValue="Sort"
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="All">Wyświetl wszystkie</option>
        <option value="Dead">Dead</option>
        <option value="Alive">Alive</option>
      </select>

      {data &&
        data.map((character) => (
          <Card key={character.id}>
            <div className={classes.image}>
              <img src={character.img} alt={character.name} />
            </div>

            <div className={classes.content} key={character.id}>
              <Link to={`users/${character.id}`}> {character.name} </Link>
              <div> {character.birthday} </div>
              <div> {character.status} </div>
            </div>
          </Card>
        ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    characters: state.characters.characters,
    loading: state.characters.loading,
  };
};
const mapDispatchToProps = {
  loadCharacters,
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
