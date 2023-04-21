import { v4 as uuidv4 } from 'uuid';

export default function reducer(state, action){
    switch (action.type) {
        case 'SET_CURRENT_NOTE': 
            return {
                ...state,
                currentNote: action.payload
            }
        case 'SET_NOTES': 
            return {
                ...state,
                notes: action.payload
            }
        case 'DELETE_NOTE': 
            const notes = state.notes.filter((note)=>{
                return note.id !== action.payload;
            });
            console.log(notes);

            return {
                ...state,
                notes: notes
            }
        case 'ADD_NOTE':
            const newNote = action.payload;

            const newNotes = [...state.notes, newNote];

            return {
                ...state,
                notes: newNotes
            }
        
        case 'UPDATE_NOTE':
            const note = {
                ...state.currentNote,
                title: action.payload.title,
                text: action.payload.text
            }
            
            const updatedNoteIndex = state.notes.findIndex(
                note => note.id === state.currentNote.id
            ) 

            const upNotes = [
                ...state.notes.slice(0, updatedNoteIndex),
                note,
                ...state.notes.slice(updatedNoteIndex + 1)
            ]

            console.log(upNotes);

            return {
                currentNote: null,
                notes: upNotes
            }

        default:
            return state;
    }
}

export function userReducer(state=null,action){
    switch(action.type){
        case 'LOGGED_IN':
            return action.user
        case 'LOGGED_OUT':
            return null;
        default:
            return state;
    }
}