import { LayoutDashboard, Plus, List, Home, CheckSquare, PanelLeftClose } from "lucide-react";
import { Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';

import Adder from './pages/Adder.jsx';
import Lister from './pages/Lister.jsx';

function IconSidebar({ onTogglePanel }){
  return (
    <nav className="w-20 bg-gray-900 text-white p-4 flex flex-col items-center gap-4">
      <button 
        onClick={onTogglePanel}
        className="p-2 rounded-lg hover:bg-gray-700">
        <PanelLeftClose className="w-6 h-6"/>
      </button>
      <Link to="/" className="p-2 rounded-lg hover:bg-gray-700">
        <Home className="h-6 w-6"/>
      </Link>
      <Link to="/tasks" className="p-2 rounded-lg hover:bg-gray-700">
        <CheckSquare className="h-6 w-6"/>
      </Link>
    </nav>
  );
}

function ListPanel(){
  return(
    <div className="w-55 bg-gray-800 text-white p-4">
      <h2 className="font-bold text-lg mb-4">Lists</h2>
      <ul>
        <li className="p-2 rounded-lg hover:bg-gray-700">Work Tasts</li>
        <li className="p-2 rounded-lg hover:bg-gray-700">Study Goals</li>
      </ul>
    </div>
  );
}

function MainContent(){
  return(
    <main className="flex-1 p-8 bg-gray-950 text-white">
      <Routes>
        <Route path="/" element={<h1>Welcome Home</h1>}/>
        <Route path="/tasks" element={<h1>Your Tasks</h1>}/>
      </Routes>
    </main>
  );
}

export default function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const togglePanel= () => {
    setIsPanelOpen( (prev) => !prev);
  };

  return(
    <div className="min-h-screen flex flex-row">
      <IconSidebar onTogglePanel={togglePanel}/>
      {isPanelOpen && <ListPanel/>}
      <MainContent/>
    </div>

  )
}