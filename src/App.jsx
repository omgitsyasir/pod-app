import { LayoutDashboard, Plus, List, Home, CheckSquare, PanelLeftClose } from "lucide-react";
import { Routes, Route, Link, useParams} from 'react-router-dom';
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

function ListPanel({lists = mockLists}){
  return(
    <div className="w-55 bg-gray-800 text-white p-4">
      <h2 className="font-bold text-lg mb-4">Lists</h2>
      <ul>
        {lists.map((list) => (
          <li key={list.id} className="p-2 rounded-lg hover:bg-gray-700">
            <Link 
              to={`/list/${list.id}`}
              className="block p-2 rounded-lg hover:bg-gray-700"
              >{list.name}
            </Link></li>
        ))}
      </ul>
    </div>
  );
}

function TaskPage({lists = lists}) {
  const {id} = useParams();
  const list = lists.find((item) => item.id == id)
  if(!list){
    return(
      <h1>List Not Found!</h1>
    )
  }
  return(
    <>
      <h1 className="text-3xl font-bold p-4">
        {list.name}
      </h1>
      <div className="flex flex-col gap-3">
        {list.tasks.length === 0 ? (
          <p className="text-gray-400 p-4">No tasks in this list!</p>
        ) :(
          list.tasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-gray-800 p-4 rounded-lg flex items-center"
              >
                <CheckSquare className="h-5 w-5 mr-4  text-gray-400"/>
                <span>{task.text}</span>
              </div>
          ))
        )
      }
      </div>
    </>
  );
}

function MainContent({lists = mockLists}){
  return(
    <main className="flex-1 p-8 bg-gray-950 text-white">
      <Routes>
        <Route path="/" element={<h1>Welcome Home</h1>}/>
        <Route path="/tasks" element={<h1>Your Tasks</h1>}/>
        <Route path="/list/:id" element={<TaskPage lists={lists}/>}/>
      </Routes>
    </main>
  );
}

const mockLists = [
  {
    id: 1, 
    name:"Work Tasks",
    tasks: [
      {id: 101, text: "Prepare presentation"},
      {id: 102, text: "Email Mr. Li"},
    ]
  },
  {
    id: 2, 
    name: "Study Goals",
    tasks: [
      { id: 201, text: 'Read Chapter 4 of React docs' },
      { id: 202, text: 'Complete tutorial on `useEffect`' },
    ]
  },
  {
    id: 3, 
    name: "Travel Plans",
    tasks: [],
  },
  {
    id: 4, 
    name: "Daily To-Dos",
    tasks: [
      { id: 401, text: 'Morning Run' },
    ]
  },
];

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