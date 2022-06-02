import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-evenly">
                        <i data-test="noteItemBtn" className="fa-duotone fa-file-pen mx-2 edit" onClick={()=>{updateNote(note)}}></i>
                        <i data-test="noteItemBtn" className="fa-duotone fa-circle-trash mx-2 del" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem