import React, { useContext, useEffect, useRef, useState } from "react";
import NotesContext from "../context";

export default function EditNote(){
    const { state, dispatch } = useContext(NotesContext);
    const [ title, setTitle ] = useState(state.currentNote.title);
    const [ text, setText ] = useState(state.currentNote.content);
    const [ token, setToken ] = useState('');
    //const navigate = useNavigate();

    let titleRef = useRef();
    let textRef = useRef();

    useEffect(() => {
        titleRef.current.focus();
        setToken(JSON.parse(localStorage.getItem('user')).token);
    }, []);

    //Añadimos el valor
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeText = (event) => {
        setText(event.target.value);
    }
    //Guardamos la nota
    const handleSubmit = (event) => {
        //Evita navegacion
        event.preventDefault();
        if(!title || title == '' || !text || text == ''){
            alert('campo vacío')
        }else {

        let url = '/api/notes/' + state.currentNote.id
        // Accedemos a un recurso de la API
        fetch(
          url,
        {
        // Cambiamos el método a POST
        method: "PUT",
        // Modificamos la cabecera
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        'api-token': token, 
        },
        body: JSON.stringify({
          // En un caso real, estos datos vienen de
          // un formulario.
            title: title,
            content: text,
        }),
        })
        // Obtenemos la respuesta
        .then(res => res.json())
        .then(response => 
            dispatch({type: 'UPDATE_NOTE', payload: {title: title, content: text}})
          /* setUser(response),
          localStorage.setItem('token', response.token) */
        )
        .catch(err => console.error(err));

       
        setTitle('');
        setText(''); 
        //navigate("/notes");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} action="submit">
                <label>Título</label>
                <input type="text" ref={titleRef} onChange={handleChangeTitle} value={title}></input>
                <label>Nota</label>
                <input type="text" ref={textRef} onChange={handleChangeText} value={text}></input>
                <button>+</button>
            </form>
        </div>
    )
}
