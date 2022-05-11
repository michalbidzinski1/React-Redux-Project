import React from "react";
import { deleteUser } from "../../ducks/characters/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./UserDetails.module.scss";
const UserDetails = ({ user, history, deleteUser }, props) => {
  const handleClick = (id) => {
    if (window.confirm("Are you sure wanted to delete the character ?")) {
      deleteUser(id);
    }
    history.push("/");
  };
  return (
    <div>
      {user ? (
        <div className={classes.item}>
          <div className={classes.image}>
            <img src={user.img} alt="user" />
          </div>
          <div className={classes.content}>
            <h3 className={classes.title}> Nazwa: {user.name}</h3>
            <h4>Datus urodzenia: {user.birthday}</h4>
            <h4> Status: {user.status} </h4>

            <button onClick={() => history.push(`/user/edit/${user.id}`)}>
              Edytuj
            </button>
            <div>
              <button onClick={() => handleClick(user.id)}>Usuń</button>
            </div>
          </div>
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
          (x) => String(x.id) === props.match.params.userId
        )
      : null,
  };
};
const mapDispatchToProps = {
  deleteUser,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDetails)
);
