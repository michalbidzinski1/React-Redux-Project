import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { withRouter } from "react-router";
import { updateEpisode } from "../../ducks/episodes/actions";
import classes from "./AddEpisode.module.scss";
const EditEpisode = ({ history, updateEpisode, episode }, props) => {
  const EpisodeSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too Long!")
      .required("Required"),
    release_date: Yup.date().required("Required"),
    img: Yup.string().required("Required"),
    series: Yup.string().required("Required"),
  });
  const handleSubmit = (values) => {
    updateEpisode(values);
    history.push(`/episodes/${episode.id}`);
  };

  return (
    <div className={classes.form}>
      <button className={classes.button} onClick={() => history.goBack()}>
        Wróć
      </button>
      {episode ? (
        <div>
          <h3>Edytuj Epizod</h3>
          <Formik
            initialValues={{
              id: episode.id,
              title: episode.title,
              release_date: episode.release_date,
              series: episode.series,
              img: episode.img,
              charactersList: episode.charactersList,
            }}
            validationSchema={EpisodeSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  className={classes.input}
                  name="title"
                  placeholder="title"
                ></Field>
                {touched.title && errors.title && <div>{errors.title}</div>}
                <Field
                  className={classes.input}
                  name="release_date"
                  placeholder="release_date"
                  type="date"
                ></Field>

                {touched.release_date && errors.release_date && (
                  <div>{errors.release_date}</div>
                )}
                <Field
                  className={classes.input}
                  name="img"
                  placeholder="img"
                  type="url"
                ></Field>
                {touched.img && errors.img && <div>{errors.img}</div>}
                <Field
                  className={classes.input}
                  name="series"
                  as="select"
                  placeholder="Serial"
                >
                  <option value=""> </option>
                  <option value="Breaking Bad"> Breaking Bad </option>
                  <option value="Better Call Saul"> Better Call Saul </option>
                </Field>
                {touched.series && errors.series && <div>{errors.series}</div>}
                <button className={classes.button} type="submit">
                  Zatwierdz
                </button>
              </Form>
            )}
          </Formik>
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
          (x) => String(x.id) === props.match.params.id
        )
      : null,
  };
};

const mapDispatchToProps = {
  updateEpisode,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditEpisode)
);
