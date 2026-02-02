import { NewsCard } from "./NewsCard";
import { allArticles } from "@/data/mockData";

export function LatestNews() {
  // Use articles 37-42 (Home Top Stories)
  // Or reuse Top Stories 1-6? Let's use 37-42 as they were specifically designed for home
  // Wait, I added unique ones for Home in mockData (37-42).
  const latestNews = allArticles.slice(36, 42);

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
        {latestNews.map((article, index) => (
          <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
            <NewsCard {...article} />
          </div>
        ))}
      </div>
    </section>
  );
}
