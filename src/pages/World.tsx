import PageTransition from "@/components/PageTransition";
import { NewsCard } from "@/components/NewsCard";
import { allArticles } from "@/data/mockData";

const World = () => {
    // Use articles 7-12 for World
    const worldNewsData = allArticles.slice(6, 12);

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-headline text-4xl font-bold mb-2">World News</h1>
                <p className="text-body text-lg text-muted-foreground mb-8">Global events, international relations, and stories from around the world.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {worldNewsData.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
                            <NewsCard {...article} />
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default World;
