import { useEffect, useMemo, useState } from 'react';
import { Todo, TodoFilterState } from './models/todo';

import TodoInput from './components/todoInput';
import TodoCard from './components/todoCard';
import TodoStats from './components/todoStats';
import Footer from './components/footer';
import Header from './components/header';

function sortTodos(
    todos: Todo[],
    sortBy: string,
    sortDirection: 'asc' | 'desc' = 'asc',
): Todo[] {
    return todos.slice().sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'created_at') {
            comparison =
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime();
        } else if (sortBy === 'title') {
            comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'status') {
            const statusMap: Record<string, number> = {
                Todo: 1,
                'In Progress': 2,
                Done: 3,
            };
            comparison = statusMap[a.status!] - statusMap[b.status!];
        }

        // Reverse for descending sort
        if (sortDirection === 'desc') {
            comparison = comparison * -1;
        }

        return comparison;
    });
}

function App() {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const [sortBy, setSortBy] = useState<string>('created_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const [filter, setFilter]: [
        TodoFilterState,
        React.Dispatch<React.SetStateAction<TodoFilterState>>,
    ] = useState({ query: '', filterKey: '' });

    // ------------------------------ TODO Filter Function ------------------------------
    const filterItems = useMemo(() => {
        return todoList.filter((el: Todo) => {
            const key = filter['filterKey'] as keyof Todo;
            const curVal = el[key] as string;
            if (filter.query && filter.filterKey) {
                return curVal
                    .toLowerCase()
                    .includes(filter['query'].toLowerCase());
            } else {
                return true;
            }
        });
    }, [filter, todoList]);

    const handleFilter = (query: string, filterKey: keyof Todo & string) => {
        setFilter({ query: query, filterKey: filterKey });
    };
    // ---------------------------- TODO Activity Logic --------------------------------------------------

    const handleAdd = (todo: Todo) => {
        setTodoList((preState) => [...preState, todo]);
    };

    const handleUpdate = (id: number, key: string, val: string) => {
        setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
                todo._id === id
                    ? { ...todo, [key]: val, created_at: new Date() }
                    : todo,
            ),
        );
    };

    const handleDelete = (id: number) => {
        setTodoList((prevTodoList) =>
            prevTodoList.filter((todo) => todo._id !== id),
        );
    };

    // ----------------------- Sorting Logic --------------------

    const handleSort = (sortBy: string) => {
        setSortBy(sortBy);
        setTodoList((prevTodos) => sortTodos(prevTodos, sortBy, sortDirection));
    };

    const handleSortDirectionChange = () => {
        setSortDirection((prevDirection) =>
            prevDirection === 'asc' ? 'desc' : 'asc',
        );
    };

    useEffect(() => {
        handleSort(sortBy);
    }, [sortBy, sortDirection]);

    return (
        <div className="flex flex-col justify-between h-svh">
            <div>
                <Header />
                <main className="w-full lg:max-w-6xl mx-auto">
                    <section>
                        {/* ---------------------------TodoTitle--------------------------- */}
                        <h1 className="h1 text-center p-2">Task Manager</h1>
                        <ul
                            className="mx-5 text-center lg:max-w-3xl lg:mx-auto text-xs md:text-sm
                           bg-violet-100 border border-slate-950 rounded-lg px-2 py-1"
                        >
                            <li className="">
                                This user-friendly task manager empowers you to
                                create, update, and delete tasks.
                            </li>
                            <li>
                                Assign titles, descriptions, and statuses for
                                better organization.
                            </li>
                            <li>
                                Filter tasks by status to prioritize your
                                workload and stay on top of things!
                            </li>
                            <li className="bg-red-200 py-1 my-1 italic rounded-lg border border-black">
                                Note: This is a dummy project, use to showcase
                                my skill in React. Please do not add any
                                sensistive information, here. Thanks
                            </li>
                        </ul>
                    </section>
                    {/* ---------------------------TodoStats--------------------------- */}
                    <section className="mt-2 mx-auto lg:max-w-4xl flex justify-center">
                        <TodoStats
                            todoList={todoList}
                            currFilter={filter}
                            handleFilter={handleFilter}
                        />
                    </section>
                    {/* ---------------------------TodoInput--------------------------- */}
                    <section className="mt-2 lg:max-w-4xl mx-auto">
                        <TodoInput handleAdd={handleAdd} />
                    </section>
                    {/* ---------------------------TodoSort--------------------------- */}
                    <section className="mt-3 lg:max-w-4xl mx-auto">
                        <div
                            className="flex flex-wrap text-sm lg:text-base sm:justify-center 
                            items-center px-2 py-1 border border-slate-950 max-w-2xl 
                            md:mx-auto md:rounded-lg shadow-md 
                           bg-stone-100 shadow-zinc-400"
                        >
                            <span className="font-bold">Sort by:</span>
                            {['created_at', 'title', 'status'].map((el) => (
                                <button
                                    key={el}
                                    className={`mx-1 px-2 py-1 border border-slate-950 rounded-lg m-1 w-fit md:w-28 ${el == sortBy ? 'bg-emerald-300' : ' bg-white'}`}
                                    onClick={() => handleSort(el)}
                                >
                                    {el.split('_').join(' ').toUpperCase()}
                                </button>
                            ))}
                            <span className="font-bold">Sort Direction:</span>
                            <button
                                className={`mx-1 p-1 border border-slate-950 rounded-lg m-1 w-20 ${sortDirection == 'asc' ? 'bg-yellow-300' : 'bg-orange-300'}`}
                                onClick={handleSortDirectionChange}
                            >
                                {sortDirection.toUpperCase()}
                            </button>
                        </div>
                    </section>
                    {/* ---------------------------TodoList--------------------------- */}
                    <section className="lg:max-w-4xl mx-auto mt-3">
                        {filterItems.map((el) => (
                            <TodoCard
                                key={el._id}
                                todo={el}
                                handleUpdate={handleUpdate}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default App;
