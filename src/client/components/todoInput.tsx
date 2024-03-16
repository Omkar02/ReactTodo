import { Todo, TodoInputProps } from '../models/todo';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdReturnRight } from 'react-icons/io';

export default function TodoInput({ handleAdd }: TodoInputProps) {
    const [takeNote, setTakeNote] = useState(false);
    const notesTitle = useRef<HTMLInputElement | null>(null);
    const [task, setTask] = useState<Todo>({
        _id: Date.now() + Math.floor(Math.random() * 1000),
        title: '',
        description: '',
        status: 'Todo',
        created_at: '',
    });
    const [textAreaHeight, setTextAreaHeight] = useState(50);

    const handleUserInput = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    const handleUserSumit = (
        event:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        task['created_at'] = new Date();
        // Handle form submission here
        handleAdd(task);
        // console.log('Task submitted:', task);

        setTask({
            _id: Date.now() + Math.floor(Math.random() * 1000),
            title: '',
            description: '',
            status: 'Todo',
            created_at: '',
        });
        handleTakeNote(false);
    };

    const handleTextAreaResize = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const newHeight = event.target.value ? event.target.scrollHeight : 20; // Reset to initial height if empty
        setTextAreaHeight(newHeight);
    };

    const handleTakeNote = (val: boolean) => {
        setTakeNote(val);
        if (!val) {
            // reset to original form
            setTask({
                _id: Date.now() + Math.floor(Math.random() * 1000),
                title: '',
                description: '',
                status: 'Todo',
                created_at: '',
            });
        }
    };

    useEffect(() => {
        // following effect is use to always focus on the title
        // this is added for convinence so in one click user can
        // start on adding the title and so on....
        notesTitle.current && notesTitle.current.focus();
    }, [takeNote]);

    return (
        <>
            <div
                className={`${takeNote ? 'hidden' : ''}  mx-5 rounded-lg bg-zinc-50 shadow-lg 
                px-4 py-2 relative border-2 border-zinc-300`}
            >
                <div
                    className="w-full bg-zinc-50 text-xl lg:text-2xl 
                    px-2 py-1 focus:outline-none text-zinc-500"
                    onClick={() => handleTakeNote(true)}
                >
                    Take a note ...
                </div>
            </div>
            <form
                onSubmit={handleUserSumit}
                className={`${takeNote ? '' : 'hidden'} mx-5 rounded-lg bg-zinc-50 shadow-lg px-4 py-2 
                relative border border-zinc-200`}
            >
                <div className="">
                    <input
                        ref={notesTitle}
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        placeholder="Title"
                        onChange={handleUserInput}
                        required
                        className="w-full bg-zinc-50 text-2xl lg:text-3xl 
                        px-2 py-1 focus:outline-none font-bold"
                    />
                </div>

                <textarea
                    id="description"
                    name="description"
                    value={task.description}
                    placeholder="Take a note..."
                    onChange={handleUserInput}
                    style={{ height: `${textAreaHeight}px` }}
                    onInput={handleTextAreaResize}
                    className="resize-none w-full text-pretty px-2 py-1 
                        focus:outline-none bg-zinc-50"
                />
                <div className="absolute bottom-2 right-2 opacity-70 hover:opacity-90">
                    <button
                        type="reset"
                        className="bg-zinc-100 hover:bg-red-500 
                            border border-slate-950 text-xl rounded-lg px-2 py-1
                            focus:outline-none shadow-md "
                        onClick={() => handleTakeNote(false)}
                    >
                        <IoMdClose />
                    </button>
                    <button
                        type="submit"
                        className="bg-green-400 hover:bg-emerald-400 
                            border border-slate-950 text-xl rounded-lg px-2 py-1
                            focus:outline-none shadow-md mx-2"
                        onClick={handleUserSumit}
                    >
                        <IoMdReturnRight />
                    </button>
                </div>
            </form>
        </>
    );
}
