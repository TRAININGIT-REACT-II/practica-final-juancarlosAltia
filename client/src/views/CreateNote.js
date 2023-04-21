import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import NotesContext from "../context";

function CreateNote() {
    const { state, dispatch } = useContext(NotesContext);
    const [ title, setTitle ] = useState('');
    const [ text, setText ] = useState('');
    const [ token, setToken ] = useState('');

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
            createNote();
            setTitle('');
            setText('');
            //navigate("/notes");
        }
    }

    const createNote = () => {
        let url = '/api/notes'
        // Accedemos a un recurso de la API
        fetch(
          url,
        {
        // Cambiamos el método a POST
        method: "POST",
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
            dispatch({type: 'ADD_NOTE', payload: response})
        )
        .catch(err => console.error(err));
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

export default CreateNote;