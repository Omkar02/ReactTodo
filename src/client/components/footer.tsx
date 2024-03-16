interface Technology {
    name: string;
    logoSrc: string; // Placeholder for logo image URL
}

const technologies: Technology[] = [
    { name: 'React', logoSrc: 'React-icon.svg' },
    { name: 'TypeScript', logoSrc: 'ts-logo-128.svg' },
    { name: 'Vite', logoSrc: 'Vitejs-logo.svg' },
    { name: 'Tailwind CSS', logoSrc: 'tailwindcss-mark.svg' },
];

export default function Footer() {
    return (
        <footer
            className="m-0 w-full bg-zinc-800 text-xs md:text-base
            text-white text-center p-4 flex items-center justify-between"
        >
            <div className="text-left text-blue-200">
                <p>Made by Omkar Joshi</p>
                <p>
                    GitHub Link:{' '}
                    <a
                        href="https://github.com/Omkar02/ReactTodo"
                        className="underline text-blue-400"
                    >
                        ReactTodo
                    </a>
                </p>
            </div>

            <div className="flex items-center">
                {technologies.map((tech) => (
                    <img
                        key={tech.name}
                        src={tech.logoSrc}
                        alt={tech.name}
                        className="w-5 h-5 lg:w-8 lg:h-8 mr-2"
                    />
                ))}
            </div>
        </footer>
    );
}
