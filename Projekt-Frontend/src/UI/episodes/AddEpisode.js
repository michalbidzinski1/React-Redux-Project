import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import classes from "./AddEpisode.module.scss";
import { addEpisode } from "../../ducks/episodes/actions";
import { withRouter } from "react-router";
import * as Yup from "yup";
const EpisodeForm = ({ episodes, addEpisode, history }, props) => {
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
    addEpisode(values);
    history.push("/episodes");
  };
  return (
    <div className={classes.form}>
      <h3 className={classes.h3}>Add Episode</h3>
      <Formik
        initialValues={{
          title: "",
          release_date: "",
          series: "",
          img: "",
          charactersList: [],
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
              <option defaultValue disabled value="">
                Serial
              </option>
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
  );
};

const mapStateToProps = (state) => {
  return {
    episodes: state.episodes,
  };
};

const mapDispatchToProps = {
  addEpisode,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EpisodeForm)
);
