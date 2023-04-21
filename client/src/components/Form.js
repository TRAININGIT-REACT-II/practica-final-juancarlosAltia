import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../actions";
import NotesContext from "../context";
import rootReducer from "../user";
import { useDispatch, useSelector} from "react-redux";
import { createBrowserHistory } from "history";


const Form = (sign) => {
  // Alamcenamos el estado del formulario
  const [formState, setFormState] = useState({ user: "", psw: "" });
  const { state, dispatch } = useContext(NotesContext);
  const dispatchUser = useDispatch();
  const store = useSelector(state => state.user);
  const history = createBrowserHistory();
  // Obtenemos la API de react-router para modificar las rutas
  //const history = useHistory();

  // Actualizamos el estado
  const onChange = (key) => (e) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });
  };

  const loadNotes = () => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    let url = '/api/notes'
        // Accedemos a un recurso de la API
        fetch(
          url,
        {
        // Cambiamos el método a POST
        method: "GET",
        // Modificamos la cabecera
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        'api-token': token, 
        }
        })
        // Obtenemos la respuesta
        .then(res => res.json())
        .then(response => 
          dispatch({type: 'SET_NOTES', payload: response})
          /* setUser(response),
          localStorage.setItem('token', response.token) */
        )
        .catch(err => console.error(err));
  }

  // Modificamos la URL cuando se envía el formulario
  const onSubmit = (event) => {
    event.preventDefault()
    let url = '/api/register'
    if(!sign.value.sign){
      url = '/api/login'
    }
    // Accedemos a un recurso de la API
    fetch(
      url,
    {
    // Cambiamos el método a POST
    method: "POST",
    // Modificamos la cabecera
    headers: {
    "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      // En un caso real, estos datos vienen de
      // un formulario.
      username: formState.user,
      password: formState.psw,
    }),
    })
    // Obtenemos la respuesta
    .then(res => res.json())
    .then(response => 
      dispatchUser(login(response)),
      history.push("/home")
      /* setUser(response),
      localStorage.setItem('token', response.token) */
    )
    .catch(err => console.error(err));
    // El método push agregar una nueva URL al histórico
    loadNotes();
    //history.push(`/notes`);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="user">Usuario</label>
      <input
        id="user"
        type="text"
        value={formState.name}
        onChange={onChange("user")}
        placeholder="Usuario"
      />
      <label htmlFor="psw">Contraseña</label>
      <input
        id="psw"
        type="text"
        value={formState.psw}
        onChange={onChange("psw")}
        placeholder="Contraseña"
      />
      {!sign.value.sign && <button>Iniciar Sesión</button>}
      {sign.value.sign && <button>Registrarse</button>}
    </form>
  );
};

export default Form;
