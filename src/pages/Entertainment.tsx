import PageTransition from "@/components/PageTransition";
import { NewsCard } from "@/components/NewsCard";
import { allArticles } from "@/data/mockData";

const Entertainment = () => {
    // Use articles 31-36 for Entertainment
    const entertainmentData = allArticles.slice(30, 36);

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-headline text-4xl font-bold mb-2">Entertainment</h1>
                <p className="text-body text-lg text-muted-foreground mb-8">Movies, music, celebrity news, and culture.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {entertainmentData.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
                            <NewsCard {...article} />
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Entertainment;
