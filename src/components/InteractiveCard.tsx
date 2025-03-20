'use client'
export default function InteractiveCard ({ children, venueName }: { children: React.ReactNode, venueName: string }) {

    function onCardSelected(event: React.MouseEvent) {
        alert("You Select " + venueName);
    }

    function onCardMouseAction(event: React.SyntheticEvent) {
        const cardElement = event.currentTarget as HTMLElement;

        if (event.type === 'mouseover') {
            cardElement.classList.remove('bg-white', 'shadow-lg');
            cardElement.classList.add('bg-neutral-200', 'shadow-2xl');
        } else {
            cardElement.classList.remove('bg-neutral-200', 'shadow-2xl');
            cardElement.classList.add('bg-white', 'shadow-lg');
        }
    }

    return (
        <div 
            className="w-full h-[300px] rounded-lg bg-white shadow-lg"
            onMouseOver={(e) => onCardMouseAction(e)}
            onMouseOut={(e) => onCardMouseAction(e)}
        >
            {children}
        </div>
    );
}
