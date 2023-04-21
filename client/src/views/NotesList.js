import React, { useContext, useEffect, useState } from "react";
import NotesContext from "../context";
import Modal from "../components/Modal"




const NotesList =() => {
    const { state } = useContext(NotesContext);
    const { dispatch } = useContext(NotesContext);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const deleteNote = () => setDelete(true);
    const [showModal, setShowModal] = useState(false);
    const [delet, setDelete] = useState(false);
    const [id, setId] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('user')).token);
    }, []);

    const onClickDelete = (note) =>{
        setId(note.id);
        openModal();
    }
    useEffect(() => {
        if(delet){  
            dispatch({ type: 'DELETE_NOTE', payload: id}) 
            let url = '/api/notes/' + id
            // Accedemos a un recurso de la API
            fetch(
            url,
            {
            // Cambiamos el método a POST
            method: "DELETE",
            // Modificamos la cabecera
            headers: {
            'api-token': token, 
            }
            })
            // Obtenemos la respuesta
            .then(res => res.json())
            .then(response => 
            console.log(response)
            /* setUser(response),
            localStorage.setItem('token', response.token) */
            )
            .catch(err => console.error(err)); 
            closeModal();
            setDelete(false);
            console.log(state);
        }
        
      }, [delet]);
   
    return (
        <div className="notes-container">
            {state && state.notes.map((note, i)=>{
                return <div className="note" >
                    <button className="edit" onClick={()=> dispatch({ type: 'SET_CURRENT_NOTE', payload: note})}>✏️</button>
                    <button className="delete" onClick={() => onClickDelete(note)}>🗑️</button>
                    <Modal show={showModal} onClose={closeModal} onDelete={deleteNote}>
                        <h3>Estás a punto de eliminar la  nota {note.title}</h3>
                        <p>¿Estás seguro de que deseas eliminarla?</p>
                        
                    </Modal>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            })}
        </div>
    )
}

export default NotesList;