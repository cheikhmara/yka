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
//import SelectList from './Components/Pdi/form/SelectList';
import CreateEvaluation from './Components/Pdi/CreateEvaluation';
import CreateEvaluationClasse from './Components/Pdi/CreateEvaluationClasse';
import EvaluationClasse from './Components/Pdi/EvaluationClasse';

function App() {
  return (
    <div className="App">
      <TokenAuthContext>
        {/*<SelectList />*/}
        <Menu2 />
        <Routes>
          <Route path="/" element={<Eleve />} />
          {/*<Route path="/note" element={<Note />} />
          <Route path="/classe" element={<Classe />} />*/}
          <Route path="/eleve" element={<Eleve />} />
          <Route path="/pdi" element={<Pdi />} />
          <Route path="/evaluations/create" element={<EvaluationClasse />} />
          {/*<Route path="/evaluations/create" element={<CreateEvaluationClasse />} />
          <Route path="/evaluation/create" element={<CreateEvaluation />} />
          <Route path="/evaluation" element={<Evaluation />} />
          */}
        </Routes>
      </TokenAuthContext>

    </div>
  ); 
}

export default App;
