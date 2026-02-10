import { Clock } from "lucide-react";
import { useArticles } from "@/hooks/useNews";
import { formatDistanceToNow } from "date-fns";

const mockSecondaryArticles = [
  {
    id: 1,
    category: "Politics",
    title: "Senate Passes Landmark Climate Bill After Marathon Session",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    category: "Economy",
    title: "Federal Reserve Signals Potential Rate Cuts in Coming Months",
    time: "3 hours ago",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    category: "Health",
    title: "New Study Reveals Promising Results for Alzheimer's Treatment",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
  },
];

export function HeroSection() {
  const { data: articles, isLoading } = useArticles();

  // Determine main and secondary articles
  // Ideally, backend would support "featured" flag, but for now take first as main, next 3 as secondary

  const hasApiData = articles && articles.length > 0;

  const mainArticle = hasApiData ? articles[0] : null;
  const secondaryApiArticles = hasApiData ? articles.slice(1, 4) : [];

  // Fallback if no API data
  // If API data exists but < 4, we might show fewer secondary

  // Use mock data if API returns nothing (to avoid empty section)
  const showMock = !hasApiData && !isLoading;

  if (isLoading) return <div className="py-8 text-center">Loading headlines...</div>;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <article className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={mainArticle?.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop"}
                alt="Breaking news featured image"
                className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="category-badge-breaking mb-3">
                  {mainArticle?.category || "Breaking News"}
                </span>
                <h1 className="font-headline text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                  {mainArticle?.title || "Global Leaders Convene for Historic Climate Summit as Temperatures Reach Record Highs"}
                </h1>
                <p className="font-body text-gray-200 text-base md:text-lg mb-4 line-clamp-2 max-w-3xl">
                  {mainArticle?.shortDescription || "World leaders gather in Geneva to address the escalating climate crisis, with new commitments expected to reshape global environmental policy for the next decade."}
                </p>
                <div className="flex items-center gap-4 text-gray-300 text-sm font-body">
                  <span>By {mainArticle?.author || "Sarah Mitchell"}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {mainArticle?.createdAt ? formatDistanceToNow(new Date(mainArticle.createdAt), { addSuffix: true }) : "45 minutes ago"}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Secondary Articles */}
        <div className="space-y-4">
          {(showMock ? mockSecondaryArticles : secondaryApiArticles).map((article, index) => {
            const isApi = '_id' in article;
            const mapped = isApi ? {
              id: article._id,
              category: article.category,
              title: article.title,
              time: formatDistanceToNow(new Date(article.createdAt), { addSuffix: true }),
              image: article.imageUrl || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop"
            } : article;

            return (
              <article
                key={mapped.id}
                className="group cursor-pointer flex gap-4 p-3 rounded-lg hover:bg-surface-subtle transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-lg">
                  <img
                    src={mapped.image}
                    alt={mapped.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="category-badge-default mb-2">
                    {mapped.category}
                  </span>
                  <h3 className="font-headline text-base md:text-lg font-semibold text-headline leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                    {mapped.title}
                  </h3>
                  <p className="font-body text-xs text-muted-custom mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {mapped.time}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  );
}
