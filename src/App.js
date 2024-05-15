import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import Classe from './Components/Classe';
import Eleve from './Components/Eleves/Eleve';
import Evaluation from './Components/Evaluation';
import { TokenAuthContext } from './useAuth';
import Menu2 from './Components/Menu2';
import Note from './Components/Notes/Note';
import Pdi from './Components/Pdi/Pdi';

function App() {
  return (
    <div className="App">
      <TokenAuthContext>
        <Menu2 />
        <Routes>
          <Route path="/pdi" element={<Pdi />} />
          <Route path="/note" element={<Note />} />
          <Route path="/classe" element={<Classe />} />
          <Route path="/" element={<Eleve />} />
          <Route path="/eleve" element={<Eleve />} />
          <Route path="/evaluation" element={<Evaluation />} />
        </Routes>
      </TokenAuthContext>

    </div>
  ); 
}

export default App;
