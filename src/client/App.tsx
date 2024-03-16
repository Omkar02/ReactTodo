import { useMemo, useState } from 'react';
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

    return (
        <div className="flex flex-col justify-between h-svh">
            <div>
                <Header />
                <main className="w-full lg:max-w-6xl mx-auto">
                    <section>
                        {/* ---------------------------TodoTitle--------------------------- */}
                        <h1 className="h1 text-center p-2">Task Manager</h1>
                        <div className="mx-5 text-center lg:max-w-3xl lg:mx-auto bg-violet-100 border border-slate-950 rounded-lg px-2 py-1">
                            <p className="">
                                This user-friendly task manager empowers you to
                                create, update, and delete tasks.
                            </p>
                            <p>
                                Assign titles, descriptions, and statuses for
                                better organization.
                            </p>
                            <p>
                                Filter tasks by status to prioritize your
                                workload and stay on top of things!
                            </p>
                        </div>
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
                    <section className="mt-2 lg:max-w-4xl mx-auto">
                        <div
                            className="flex justify-center items-center px-2 py-1 border
                           border-slate-950 max-w-2xl mx-auto rounded-lg shadow-inner 
                           bg-zinc-200 shadow-zinc-400"
                        >
                            Sort by:
                            {['created_at', 'title', 'status'].map((el) => (
                                <button
                                    className={`mx-1 p-1 border border-slate-950 rounded-lg m-1 w-28 ${el == sortBy ? 'bg-emerald-300' : ' bg-white'}`}
                                    onClick={() => handleSort(el)}
                                >
                                    {el.split('_').join(' ').toUpperCase()}
                                </button>
                            ))}
                            <span>Sort Direction:</span>
                            <button
                                className={`mx-1 p-1 border border-slate-950 rounded-lg m-1 w-20 ${sortDirection == 'asc' ? 'bg-yellow-300' : 'bg-orange-300'}`}
                                onClick={handleSortDirectionChange}
                            >
                                {sortDirection.toUpperCase()}
                            </button>
                        </div>
                    </section>
                    {/* ---------------------------TodoList--------------------------- */}
                    <section className="lg:max-w-4xl mx-auto mt-2">
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
