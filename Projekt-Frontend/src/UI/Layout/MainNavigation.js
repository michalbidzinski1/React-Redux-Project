import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.scss";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}> Bad </div>
      <nav>
        <ul>
          <li>
            <Link to="/episodes">Epizody</Link>
          </li>
          <li>
            <Link to="/">Postacie</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
