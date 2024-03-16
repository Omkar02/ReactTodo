export interface Todo {
    _id: number;
    title: string;
    description: string;
    status: string;
    created_at: Date | string;
}

export interface TodoInputProps {
    handleAdd: (todo: Todo) => void;
}

export interface TodoCardProps {
    todo: Todo;
    handleUpdate: (id: number, key: string, val: string) => void;
    handleDelete: (id: number) => void;
}

export interface TodoStatsProps {
    todoList: Array<Todo>;
    currFilter: TodoFilterState;
    handleFilter: (query: string, filterKey: keyof Todo & string) => void;
}

export interface TodoFilterState {
    query: string;
    filterKey: string;
}
