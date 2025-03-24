export default function Companies() {
    const companies = [
        { name: "Tech Corp", detail: "Leading provider of AI solutions." },
        { name: "HealthPlus", detail: "Innovative healthcare technology." },
        { name: "EcoEnergy", detail: "Renewable energy solutions for the future." },
    ];

    return (
        <main className="mt-14 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">Companies</h1>
            <div className="w-full max-w-md space-y-4">
                {companies.map((company, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-lg bg-white">
                        <h2 className="text-xl font-semibold text-black">{company.name}</h2>
                        <p className="text-gray-600">{company.detail}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}