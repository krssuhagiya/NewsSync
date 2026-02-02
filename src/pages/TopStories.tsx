import PageTransition from "@/components/PageTransition";
import { NewsCard } from "@/components/NewsCard";
import { allArticles } from "@/data/mockData";

const TopStories = () => {
    // Use first 6 articles for Top Stories
    const topStoriesData = allArticles.slice(0, 6);

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-headline text-4xl font-bold mb-2">Top Stories</h1>
                <p className="text-body text-lg text-muted-foreground mb-8">Latest breaking news and top headlines from around the globe.</p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topStoriesData.map((article, index) => (
                        <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
                            <NewsCard {...article} />
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default TopStories;
