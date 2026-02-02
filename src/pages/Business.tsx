import PageTransition from "@/components/PageTransition";
import { NewsCard } from "@/components/NewsCard";
import { allArticles } from "@/data/mockData";

const Business = () => {
    // Use articles 13-18 for Business
    const businessData = allArticles.slice(12, 18);

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-headline text-4xl font-bold mb-2">Business & Finance</h1>
                <p className="text-body text-lg text-muted-foreground mb-8">Market updates, corporate news, and economic analysis.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessData.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
                            <NewsCard {...article} />
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Business;
