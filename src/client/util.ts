export function getTodoColor(status: string, colorFor: string) {
    /**
     * Assigns a CSS class representing a color based on the provided todo status and color preference.
     *
     * This function takes two arguments:
     *   - `status` (string): The status of the todo item (e.g., "Todo", "In Progress", "Done").
     *   - `colorFor` (string): Specifies whether to return a gradient or background color class ("gradient" or "bg").
     *
     * Based on the combination of `status` and `colorFor`, the function returns a corresponding CSS class string.
     *
     * @param {string} status - The status of the todo item
     * @param {string} colorFor - The type of color preference ("gradient" or "bg")
     * @returns {string} CSS class string representing the desired color
     */

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
