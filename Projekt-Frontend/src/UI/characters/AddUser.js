import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import classes from "./AddUser.module.scss";
import { addUser } from "../../ducks/characters/actions";
import { withRouter } from "react-router";
import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  birthday: Yup.date().required("Required"),
  img: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
});
const UserForm = ({ addUser, history }) => {
  const handleSubmit = (values) => {
    addUser(values);
    history.push("/");
  };
  return (
    <div className={classes.form}>
      <h3>Add Character</h3>
      <Formik
        initialValues={{
          name: "",
          birthday: "",
          status: "",
          img: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
        validationSchema={userSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              className={classes.input}
              name="name"
              placeholder="name"
            ></Field>
            {touched.name && errors.name && <div>{errors.name}</div>}
            <Field
              className={classes.input}
              name="birthday"
              placeholder="birthday"
              type="date"
            ></Field>
            {touched.birthday && errors.birthday && (
              <div>{errors.birthday}</div>
            )}

            <Field
              className={classes.input}
              name="img"
              placeholder="img"
              type="url"
            ></Field>
            {touched.img && errors.img && <div>{errors.img}</div>}
            <Field className={classes.input} name="status" as="select">
              <option defaultValue disabled value="">
                Status
              </option>
              <option value="Alive"> Alive </option>
              <option value="Dead"> Dead </option>
            </Field>
            {touched.status && errors.status && <div>{errors.status}</div>}
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
    characters: state.characters.characters,
  };
};

const mapDispatchToProps = {
  addUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserForm)
);
