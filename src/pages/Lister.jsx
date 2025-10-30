export default function Lister({itemList}){
    return(
        <div className="flex items-center justify-center p-24">
            <h1 className="text-white text-3xl font-bold">
                My List
            </h1>
            {itemList.length === 0 ? (
                <p className="text-gray-400">Your list is empty. Go add some items!</p>
            ) : (
                <ul className="bg-gray-800 rounded-lg p-4 flex flx-col gap-2">
                    {itemList.map((item, index) => (
                        <li
                            key={index}
                            className="text-white bg-gray-700 p-3 rounded"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}