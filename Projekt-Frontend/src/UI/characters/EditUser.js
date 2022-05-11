import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import classes from "./AddUser.module.scss";
import { withRouter } from "react-router";
import * as Yup from "yup";
import { updateUser } from "../../ducks/characters/actions";
const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  birthday: Yup.date().required("Required"),
  img: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
});
const UserForm = ({ updateUser, history, user }) => {
  const handleSubmit = (values) => {
    updateUser(values);
    history.push("/");
  };
  return (
    <div className={classes.form}>
      <button className={classes.button} onClick={() => history.goBack()}>
        Wróć
      </button>
      {user ? (
        <div>
          <h3>Edytuj postać</h3>

          <Formik
            initialValues={{
              id: user.id,
              name: user.name,
              birthday: user.birthday,
              status: user.status,
              img: user.img,
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
                ></Field>
                {touched.img && errors.img && <div>{errors.img}</div>}
                <Field className={classes.input} name="status" as="select">
                  <option value=""> Brak informacji </option>
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    user: state.characters.characters
      ? state.characters.characters.find(
          (x) => String(x.id) === props.match.params.id
        )
      : null,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserForm)
);
