import {useLocation, useParams, useHistory } from "react-router-dom";
import Form from "../components/Form";

/**
 * Una página que te dice hola :)
 */
const Signin = () => {
  const params = useParams();
  const history = useHistory();
  const { state } = useLocation();

  // Método para volver atrás
  const back = () => {
    history.goBack();
  };

  return (
    <section>
      <Form value={{sign: true}}/>
    </section>
  );
};

export default Signin;
