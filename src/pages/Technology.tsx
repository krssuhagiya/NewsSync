import PageTransition from "@/components/PageTransition";
import { NewsCard } from "@/components/NewsCard";
import { allArticles } from "@/data/mockData";

const Technology = () => {
    // Use articles 19-24 for Technology
    const techData = allArticles.slice(18, 24);

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-headline text-4xl font-bold mb-2">Technology</h1>
                <p className="text-body text-lg text-muted-foreground mb-8">Innovation, gadgets, software, and tech trends.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techData.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
                            <NewsCard {...article} />
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Technology;
