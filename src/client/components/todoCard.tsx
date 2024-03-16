import { TodoCardProps } from '../models/todo';
import { AiOutlineClose } from 'react-icons/ai';
import { getTodoColor } from '../util';

export default function TodoCard({
    todo,
    handleUpdate,
    handleDelete,
}: TodoCardProps) {
    const stateFlow = ['Todo', 'In Progress', 'Done'];

    const handleStatusChange = (currStatus: string) => {
        const currStatusIndex = stateFlow.indexOf(currStatus);
        let newStatus;
        if (currStatusIndex + 1 > stateFlow.length - 1) {
            newStatus = 0;
        } else {
            newStatus = currStatusIndex + 1;
        }

        handleUpdate(todo._id, 'status', stateFlow[newStatus]);
    };
    return (
        <div
            className={`mx-5 rounded-lg bg-gradient-to-r to-zinc-50 ${getTodoColor(todo.status, 'gradient')} shadow-lg overflow-hidden 
            relative border border-zinc-900 mb-2`}
        >
            <div
                className={`flex justify-between items-center bg-zinc-100 opacity-80 px-3 py-1`}
            >
                <h3
                    className={`!opacity-100 ${todo.status === 'Done' ? 'line-through' : ''}`}
                >
                    {todo.title}
                </h3>
                <div className="flex flex-col">
                    <button
                        onClick={() => handleStatusChange(todo.status)}
                        className={`px-2 py-1 rounded-lg border border-slate-900 w-[5.5rem] lg:w-24 
                    drop-shadow-lg ${getTodoColor(todo.status, 'bg')} 
                    md:hover:scale-110 text-xs lg:text-sm transition-transform transform-gpu duration-300`}
                    >
                        {todo.status}
                    </button>
                    <p className="text-xs text-center">Tap to toggle</p>
                </div>
            </div>
            <div
                className={`${todo.status === 'Done' ? 'line-through' : ''} max-h-fit px-3 py-2`}
            >
                {todo.description}
            </div>
            <div className="bg-zinc-800 w-full flex justify-between px-3 items-center">
                <p className="text-white text-xs lg:text-sm font-mono">
                    {todo.created_at?.toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                    })}
                </p>
                <button
                    onClick={() => handleDelete(todo._id)}
                    className={`p-1 my-1 rounded-md bg-red-500 hover:bg-fuchsia-500
                    drop-shadow-lg md:hover:scale-110 transition-transform transform-gpu 
                    duration-300`}
                >
                    <AiOutlineClose />
                </button>
            </div>
        </div>
    );
}
