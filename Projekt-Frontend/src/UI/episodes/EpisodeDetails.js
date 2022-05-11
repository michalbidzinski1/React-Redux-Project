import React from "react";
import classes from "./EpisodeDetails.module.scss";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { deleteEpisode } from "../../ducks/episodes/actions";
const EpisodeDetails = (
  { episode, history, deleteEpisode, characters },
  props
) => {
  const handleClick = (values) => {
    if (window.confirm("Are you sure wanted to delete the episode ?")) {
      deleteEpisode(values);
    }

    history.push("/episodes");
  };

  return (
    <div>
      {episode ? (
        <div className={classes.item}>
          <div className={classes.image}>
            <img src={episode.img} alt="episode" />
          </div>
          <div className={classes.content}>
            <h3 className={classes.title}> Tytuł: {episode.title}</h3>
            <h4> Data wydania: {episode.release_date}</h4>
            <h4> Series: {episode.series} </h4>

            <div>
              <h4> Postacie: </h4>
              {episode.charactersList.map((id) => {
                const character = characters.find(
                  (el) => String(el.id) === String(id)
                );
                if (!character) {
                  return null;
                }

                return (
                  <div key={uuidv4()}>
                    <Link to={`/users/${character.id}`}>{character.name}</Link>
                  </div>
                );
              })}
            </div>

            <div>
              <Link to={`/episodes/${episode.id}/addCharacter`}>
                <button type="button">Dodaj/Usuń postacie</button>
              </Link>
              <button onClick={() => handleClick(episode.id)}>
                Usun epizod
              </button>
              <button
                onClick={() => history.push(`/episode/edit/${episode.id}`)}
              >
                Edytuj epizod
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Ładowanie strony</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    episode: state.episodes.episodes
      ? state.episodes.episodes.find(
          (x) => String(x.id) === props.match.params.episodeId
        )
      : null,
    characters: state.characters.characters,
  };
};
const mapDispatchToProps = {
  deleteEpisode,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EpisodeDetails)
);
