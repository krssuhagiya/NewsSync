import PageTransition from "@/components/PageTransition";
import { NewsCard } from "@/components/NewsCard";
import { allArticles } from "@/data/mockData";

const Sports = () => {
    // Use articles 25-30 for Sports
    const sportsData = allArticles.slice(24, 30);

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-headline text-4xl font-bold mb-2">Sports</h1>
                <p className="text-body text-lg text-muted-foreground mb-8">Scores, match highlights, and player interviews.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sportsData.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
                            <NewsCard {...article} />
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Sports;
