import { Link } from "react-router-dom";

const NotFound = () => (
  <section aria-labelledby="notfound-title">
    <h3 id="notfound-title">Woops! Parece que no hay nada por aquí</h3>
    <Link to="/">Voler a la página de inicio</Link>
  </section>
);

export default NotFound;
