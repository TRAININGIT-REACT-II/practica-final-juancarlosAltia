import { useEffect, useState,useContext, useReducer } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import About from "./views/About";
import NotesContext from "./context";
import reducer from "./reducer";
import Nav from "./components/Nav";
import NotesList from "./views/NotesList";
import CreateNote from "./views/CreateNote";
import EditNote from "./views/EditNote";
import Signin from "./views/Signin";
import "./style.css"
import { useSelector } from "react-redux/es/exports";
import { Provider } from 'react-redux';

// Componente principal de la aplicación.
const App = ({ store }) => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
   //Inicializamos el estado inicial
  const initialState = useContext(NotesContext);
   //Pasamos al use reducer el estado inicial para 
  const [state,dispatch] = useReducer(reducer, initialState);
  const user = useSelector((state) => state);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {

      console.log(user);
     
  }, [user]);


  // Mostramos la aplicación
  return (

      <Router>
        <h1>TrainingNotes</h1>
        <div id="modals"></div>
        {/* modifica el valor del contexto */}
        <NotesContext.Provider value={{state,dispatch}}>  
        <Nav />
          {state.currentNote === null ? (
          <> 
            <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/about">
                  <About/>
                </Route>
            {user && user.isLoggedIn === false ? (<>
              <Route path="/signin">
                  <Signin />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </>) : (<>
              <Route path="/create">
                  <BrowserRouter>
                    <CreateNote />
                  </BrowserRouter>  
                </Route>
                <Route path="/notes">
                  <NotesList/>
                </Route>
              </>)}
                
                
                
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
          </>
        ) : <EditNote/>}
        </NotesContext.Provider>
      </Router>

  );
};

export default App;
