import { LayoutDashboard, Plus, List, Home, CheckSquare, PanelLeftClose, Check, Square, Trash2 } from "lucide-react";
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

function ListPanel({lists = initialLists}){
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

function TaskPage({lists = {lists}, setLists={setLists}, onToggleTask={onToggleTask}, onDeleteTask={onDeleteTask}}) {
  const {id} = useParams();
  const list = lists.find((item) => item.id == id);
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask ={
      id: Date.now(),
      text: newTaskText,
      completed: false,
    }

    const newLists = lists.map( (item) => {
      if (item.id == id) {
        return {
          ...item,
          tasks: [...item.tasks, newTask]
        }
      }
      return item;
    })

    setLists(newLists)
    setNewTaskText("");
  }

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
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="flex-1 bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex-shrink-0"
        >
          <Plus className="h-5 w-5"/>
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {list.tasks.length === 0 ? (
          <p className="text-gray-400 p-4">No tasks in this list!</p>
        ) :(
          list.tasks.map((task) => (
            <div 
              key={task.id} 
              
              className="bg-gray-800 p-4 rounded-lg flex items-center"
              >
                {task.completed ? (
                    <Check 
                      onClick={() => onToggleTask(list.id, task.id)} 
                      className="h-5 w-5 mr-4 cursor-pointer text-gray-400 flex-none"/>
                  ) : (
                    <Square 
                      onClick={() => onToggleTask(list.id, task.id)} 
                      className="h-5 w-5 mr-4  cursor-pointer hover:text-green-400 text-gray-400 flex-none"/>
                  )}
                <span
                  className={task.completed ? ("line-through text-gray-500 flex-auto") : ("flex-auto")}
                >{task.text}</span>
                <button 
                  className="flex-none"
                  onClick={() => onDeleteTask(list.id, task.id)}
                >
                  <Trash2 className="h-5 w-5 mr-4 hover:text-red-600 cursor-pointer"/>
                </button>
              </div>
          ))
        )
      }
      </div>
    </>
  );
}

function MainContent({lists = {lists}, setLists={setLists}, onToggleTask={onToggleTask}, onDeleteTask={onDeleteTask}}){
  return(
    <main className="flex-1 p-8 bg-gray-950 text-white">
      <Routes>
        <Route path="/" element={<h1>Welcome Home</h1>}/>
        <Route path="/tasks" element={<h1>Your Tasks</h1>}/>
        <Route path="/list/:id" element={<TaskPage lists={lists} setLists={setLists} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask}/>}/>
      </Routes>
    </main>
  );
}

const initialLists = [
  {
    id: 1, 
    name:"Work Tasks",
    tasks: [
      {id: 101, text: "Prepare presentation", completed: false},
      {id: 102, text: "Email Mr. Li", completed: true},
    ]
  },
  {
    id: 2, 
    name: "Study Goals",
    tasks: [
      { id: 201, text: 'Read Chapter 4 of React docs', completed: false},
      { id: 202, text: 'Complete tutorial on `useEffect`', completed: false},
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
      { id: 401, text: 'Morning Run', completed: false},
    ]
  },
];

export default function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [lists, setLists] = useState(initialLists);

  const togglePanel= () => {
    setIsPanelOpen( (prev) => !prev);
  };

  const handleToggleTask = (listId, taskId) => {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id == listId) {
          const newTasks = list.tasks.map((task) => {
            if (task.id == taskId) {
              return {...task, completed: !task.completed};
            }
            return task;
          })
          return {...list, tasks: newTasks };
        }
        return list;
      })
    })
  }

  const handleDeleteTask = (listId, taskId) => {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id == listId) {
          const newTasks = list.tasks.filter((task) => task.id !== taskId);
          return {...list, tasks: newTasks};
        }
        return list;
      })
    })
  }

  return(
    <div className="min-h-screen flex flex-row">
      <IconSidebar onTogglePanel={togglePanel}/>
      {isPanelOpen && <ListPanel lists={lists}/>}
      <MainContent lists={lists} setLists={setLists} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask}/>
    </div>

  )
}