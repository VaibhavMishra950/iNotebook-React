import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {

    try {
      let url = `${host}/api/notes/fetchAllNotes`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      
    }

  }


  // Add a note
  const addNote = async (title, description, tag) => {

    let url = `${host}/api/notes/addNote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const data = await response.json();
    console.log(data);
    getNotes();
  }

  // Delete a note
  const deleteNote = async (id) => {
    // TODO: API Call
    let url = `${host}/api/notes/deleteNote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const data = await response.json();
    console.log(data);

    getNotes();
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    let url = `${host}/api/notes/updateNote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    // eslint-disable-next-line
    const data = await response.json();

    getNotes();
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )

}

export default NoteState;