import { useEffect } from "react";

import UsersList from "./UI/characters/UsersList";
import AddUser from "./UI/characters/AddUser";
import EditUser from "./UI/characters/EditUser";
import UserDetails from "./UI/characters/UserDetails";

import EpisodesList from "./UI/episodes/EpisodesList";
import AddEpisode from "./UI/episodes/AddEpisode";
import EpisodeDetails from "./UI/episodes/EpisodeDetails";
import EditEpisode from "./UI/episodes/EpisodeEdit";
import AddActorMovie from "./UI/episodes/EpisodeAddCharacter";
import Layout from "./UI/Layout/Layout";
import { loadEpisodes } from "./ducks/episodes/actions";
import { loadCharacters } from "./ducks/characters/actions";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App({ loadEpisodes, loadCharacters }) {
  useEffect(() => {
    loadEpisodes();
    loadCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Layout>
          <Switch>
       
            <Route exact path="/" component={UsersList} />
            <Route exact path="/addUser" component={AddUser} />
            <Route exact path="/users/:userId" component={UserDetails} />
            <Route exact path="/user/edit/:id" component={EditUser} />
            <Route exact path="/episodes" component={EpisodesList} />
            <Route exact path="/addEpisode" component={AddEpisode} />
            <Route
              exact
              path="/episodes/:episodeId"
              component={EpisodeDetails}
            />
            <Route exact path="/episode/edit/:id" component={EditEpisode} />
            <Route
              exact
              path="/episodes/:id/addCharacter"
              component={AddActorMovie}
            />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}
const mapDispatchToProps = {
  loadEpisodes,
  loadCharacters,
};
export default connect(null, mapDispatchToProps)(App);
