import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62938c8a677bf02241e78cca",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to College",
          "description": "Leave For College on 10 AM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        },
        {
          "_id": "62942d03fda6f156617d8101",
          "user": "62934a59c682e53a93f660a6",
          "title": "Go to Home",
          "description": "Leave For Home on 5 PM",
          "tag": "Primary",
          "date": "2022-05-29T15:08:58.308Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;