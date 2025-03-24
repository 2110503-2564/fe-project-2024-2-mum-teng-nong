import Link from "next/link";

interface Props {
    title: string;
    pagehref: string;
}

export default function TopMenuItem({ title, pagehref }: Props) {
    return (
        <Link 
            href={pagehref} 
            className="px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-700"
        >
            {title}
        </Link>
    );
}
