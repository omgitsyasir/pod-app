import { SquareMousePointer } from "lucide-react";
import { useState } from 'react';

export default function Adder({setItemList, itemList}){
    const [inputText, setInputText] = useState('');
    const handAddItem = () => {
        if (inputText.trim() === '') return;
        setItemList( (prevList) => {
            return [...prevList, inputText];
        });
        setInputText('');
    };
    return(
        <div className="flex flex-col items-center justify-center p-24">
            <h1 className="text-white text-3xl font-bold mb-4">
                { inputText || 'Click Me'}
            </h1>
            <div className="flex items-center gap-2">
                <button 
                    onClick={ handAddItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    <SquareMousePointer className="h-5 w-5"/>
                </button>
                <input
                    type="text"
                    className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
            </div>

            <div className="h-6 mt-4">
                {itemList.length > 0 && (
                    <span className="text-gray-400">
                        Items in lister: {itemList.length}
                    </span>)}

            </div>
            
        </div>
    )
}