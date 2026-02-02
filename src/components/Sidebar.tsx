import { TrendingUp, Eye, ChevronRight } from "lucide-react";

const trendingNews = [
  { id: 1, title: "Markets Rally After Fed Announcement", category: "Business", views: "125K" },
  { id: 2, title: "New Vaccine Shows 95% Efficacy in Trials", category: "Health", views: "98K" },
  { id: 3, title: "Electric Vehicle Sales Surge Globally", category: "Technology", views: "87K" },
  { id: 4, title: "International Summit Addresses Security Concerns", category: "World", views: "76K" },
  { id: 5, title: "Cultural Festival Draws Record Attendance", category: "Entertainment", views: "65K" },
];

const mostRead = [
  { id: 1, title: "How to Prepare Your Finances for the New Economy", time: "8 min read" },
  { id: 2, title: "The Rise of Remote Work: A Permanent Shift?", time: "6 min read" },
  { id: 3, title: "Exploring the Future of Sustainable Living", time: "5 min read" },
  { id: 4, title: "Top Travel Destinations for 2025", time: "7 min read" },
];

export function Sidebar() {
  return (
    <aside className="space-y-8">
      {/* Trending News */}
      <div className="bg-surface-subtle rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-headline text-lg font-bold text-headline">Trending Now</h3>
        </div>
        <div className="space-y-4">
          {trendingNews.map((item, index) => (
            <article
              key={item.id}
              className="group cursor-pointer flex items-start gap-3 pb-4 border-b border-subtle last:border-0 last:pb-0"
            >
              <span className="font-headline text-2xl font-bold text-muted-custom/50 group-hover:text-primary transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-body font-medium text-primary uppercase tracking-wide">
                  {item.category}
                </span>
                <h4 className="font-body text-sm font-medium text-headline leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="font-body text-xs text-muted-custom mt-1 flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {item.views} views
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Most Read */}
      <div className="bg-card rounded-lg p-5 border border-subtle">
        <h3 className="font-headline text-lg font-bold text-headline mb-4">Most Read</h3>
        <div className="space-y-3">
          {mostRead.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group flex items-center justify-between gap-2 py-2 hover:bg-surface-subtle rounded transition-colors px-2 -mx-2"
            >
              <div className="min-w-0">
                <h4 className="font-body text-sm font-medium text-headline line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="font-body text-xs text-muted-custom mt-1">{item.time}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-custom flex-shrink-0 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Advertisement Placeholder */}
      <div className="bg-surface-subtle rounded-lg p-6 text-center border border-dashed border-subtle">
        <p className="font-body text-xs text-muted-custom uppercase tracking-wider mb-2">
          Advertisement
        </p>
        <div className="h-60 flex items-center justify-center bg-muted rounded">
          <span className="font-body text-sm text-muted-foreground">Ad Space 300x250</span>
        </div>
      </div>
    </aside>
  );
}
