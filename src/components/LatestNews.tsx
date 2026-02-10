import { NewsCard } from "./NewsCard";
import { allArticles } from "@/data/mockData";
import { useArticles } from "@/hooks/useNews";
import { formatDistanceToNow } from "date-fns";

export function LatestNews() {
  const { data: articles, isLoading, error } = useArticles();

  // Use API data if available, otherwise fallback to mock data (or show loading)
  // Determine which data to show
  const displayArticles = (articles && articles.length > 0)
    ? articles
    : allArticles.slice(36, 42);

  if (isLoading) {
    return <div className="py-8 text-center">Loading latest news...</div>;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-headline">
            Latest News
          </h2>
          <div className="w-16 h-1 bg-primary mt-2 rounded-full" />
        </div>
        <a
          href="/top-stories"
          className="font-body text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View All →
        </a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayArticles.map((article, index) => {
          // Map API data to NewsCard props
          // Check if it's API data (has _id) or mock data (has id)
          const isApi = '_id' in article;

          const props = isApi ? {
            id: article._id,
            image: article.imageUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=250&fit=crop",
            category: article.category,
            title: article.title,
            summary: article.shortDescription,
            author: article.author || "Unknown",
            time: article.createdAt ? formatDistanceToNow(new Date(article.createdAt), { addSuffix: true }) : "Just now"
          } : {
            id: article.id,
            image: article.image || article.imageUrl,
            category: article.category,
            title: article.title,
            summary: article.summary || article.shortDescription,
            author: article.author,
            time: article.time || article.publishedAt
          };

          return (
            <div key={props.id} style={{ animationDelay: `${index * 50}ms` }}>
              <NewsCard {...props} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
