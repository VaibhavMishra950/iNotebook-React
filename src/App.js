import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (cls, messege, iconCls)=>{
      setAlert({
        cls: cls,
        msg: messege,
        iconCls: iconCls
      });
      setTimeout(() => {
        setAlert(null)
      }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <div className="container">
          <Alert alert={alert}/>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
