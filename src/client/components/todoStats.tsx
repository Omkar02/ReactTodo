/**
 * React component that displays statistics about todo items.
 *
 * This component calculates the number of todos in each status category (Todo, In Progress, Done) and displays them visually.
 * It also provides functionality to filter todos based on the selected status.
 *
 * @param {TodoStatsProps} props - Component properties
 * @param {Todo[]} props.todoList - Array of todo objects
 * @param {Filter} props.currFilter - Current filter object (query and field)
 * @param {Function} props.handleFilter - Callback function to trigger filtering
 * @returns {JSX.Element} The rendered todo statistics component
 */
import React from 'react';
import { TodoStatsProps } from '../models/todo';
import { getTodoColor } from '../util';

export default function TodoStats({
    todoList,
    currFilter,
    handleFilter,
}: TodoStatsProps) {
    const stats: Record<string, number> = {
        All: 0,
        Todo: 0,
        'In Progress': 0,
        Done: 0,
    };
    let totalCount = 0;
    todoList.forEach((el) => {
        stats[el.status] += 1;
        totalCount += 1;
    });
    stats['All'] = totalCount;

    const statusCounts: { status: string; count: number }[] = Object.entries(
        stats,
    ).map(([status, count]) => ({ status, count }));

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4">
            {statusCounts.map((el) => (
                <button
                    type="submit"
                    key={el.status}
                    onClick={() =>
                        handleFilter(
                            el.status === 'All' ? '' : el.status,
                            'status',
                        )
                    }
                    className={`${getTodoColor(el.status, 'bg')} m-2 drop-shadow-md 
                    bg-opacity-70 border border-slate-950 w-36 rounded-lg 
                    flex flex-col justify-center items-center text-center
                    ${currFilter.query === (el.status === 'All' ? '' : el.status) ? 'outline outline-offset-2 outline-4' : ''}`}
                >
                    <h3 className="!font-mono !font-normal text-sm lg:!text-lg ">
                        {el.status}
                    </h3>
                    <h2 className="font-mono ">{el.count}</h2>
                </button>
            ))}
        </div>
    );
}
