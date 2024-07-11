import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { HashRouter,Routes,Route } from 'react-router-dom';
import CreateUser from './components/CreateUser.js';
import UserDashboard from './components/UserDashboard';
import Nav from './components/Nav';
import EditFitness from './components/EditFitness';


function App() {
  return (
    <div class="container">
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/user-list" element={<UserDashboard />} />
          <Route path="/edit-fitness/:id" element={<EditFitness />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;


