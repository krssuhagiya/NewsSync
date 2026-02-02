import PageTransition from "@/components/PageTransition";

const Pulse = () => {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-headline text-4xl font-bold mb-6">My Pulse</h1>
                <p className="text-body text-lg">Personalized news feed and interests.</p>
            </div>
        </PageTransition>
    );
};

export default Pulse;
