export function getTodoColor(status: string, colorFor: string) {
    switch (true) {
        case status === 'Todo':
            return colorFor === 'gradient' ? 'from-rose-50' : 'bg-rose-500';

        case status === 'In Progress':
            return colorFor === 'gradient' ? 'from-orange-50' : 'bg-orange-500';

        case status === 'Done':
            return colorFor === 'gradient'
                ? 'from-emerald-50'
                : 'bg-emerald-500';

        default:
            return colorFor === 'gradient' ? 'from-zinc-300' : 'bg-zinc-300';
    }
}
