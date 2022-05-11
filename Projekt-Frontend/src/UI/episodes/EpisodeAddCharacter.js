import { Form, Formik } from "formik";
import { connect } from "react-redux";
import classes from "./EpisodeAddCharacter.module.scss";
import { withRouter } from "react-router";
import { updateEpisode } from "../../ducks/episodes/actions";
const AddActorToMovie = (
  { history, updateEpisode, episode, characters },
  props
) => {
  const handleSubmit = (values) => {
    updateEpisode(values);
    history.push(`/episodes/${episode.id}`);
  };

  return (
    <div>
      {episode ? (
        <div className={classes.form}>
          <h3>Dodaj postacie do epizodu</h3>
          <Formik
            initialValues={{
              id: episode.id,
              title: episode.title,
              release_date: episode.release_date,
              series: episode.series,
              img: episode.img,
              charactersList: episode.charactersList,
            }}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <Form>
                <h3>Lista postaci: </h3>

                {characters.map((char) => (
                  <button
                    type="button"
                    className={classes.button}
                    key={char.id}
                    name={char.id}
                    value={char.id}
                    onClick={() => {
                      const oldData = values.charactersList;

                      if (!Array.isArray(oldData)) return;
                      const isExist = oldData?.includes(char.id);

                      if (isExist) {
                        alert(
                          "Użytkownik jest już w bazie, aby go usunąć kliknij zatwierdź"
                        );
                        const newData = oldData?.filter((i) => i !== char.id);
                        setFieldValue("charactersList", newData);
                        return;
                      }
                      if (isExist) return;
                      const newData = oldData?.concat(char.id);

                      setFieldValue("charactersList", newData);
                    }}
                  >
                    {char.name}
                  </button>
                ))}

                <button
                  className={classes.buttonadd}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Zatwierdz
                </button>
                <button
                  className={classes.butonno}
                  onClick={() => history.push(`/episodes/${episode.id}`)}
                >
                  Anuluj
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>Ładowanie</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    episode: state.episodes.episodes
      ? state.episodes.episodes.find(
          (x) => String(x.id) === props.match.params.id
        )
      : null,
    characters: state.characters.characters,
  };
};

const mapDispatchToProps = {
  updateEpisode,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddActorToMovie)
);
