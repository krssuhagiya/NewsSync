import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: number;
  image: string;
  category: string;
  title: string;
  summary: string;
  author: string;
  time: string;
}

export function NewsCard({ id, image, category, title, summary, author, time }: NewsCardProps) {
  return (
    <Link to={`/article/${id}`}>
      <article className="group cursor-pointer bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in h-full flex flex-col">
        <div className="relative overflow-hidden h-48 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 category-badge-default bg-background/90 backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-headline text-lg font-semibold text-headline leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-body text-sm text-body line-clamp-2 mb-4 flex-grow">
            {summary}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-custom font-body mt-auto">
            <span>{author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {time}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
