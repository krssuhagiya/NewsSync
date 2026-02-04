import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, Share2, Bookmark } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { allArticles } from "@/data/mockData";
import { NewsCard } from "@/components/NewsCard";

const ArticleDetails = () => {
    const { id } = useParams();
    const article = allArticles.find((a) => a.id === Number(id));

    if (!article) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Article not found</h2>
                <Link to="/" className="text-primary hover:underline">Return to Home</Link>
            </div>
        );
    }

    // Get random related articles (excluding current)
    const relatedArticles = allArticles
        .filter((a) => a.id !== article.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return (
        <PageTransition>
            <article className="min-h-screen bg-background pb-12">
                {/* Navigation Bar for Article */}
                <div className="border-b sticky top-[73px] bg-background/95 backdrop-blur z-40">
                    <div className="container mx-auto px-4 h-12 flex items-center justify-between">
                        <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" /> Back to News
                        </Link>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bookmark className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[400px] w-full">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12">
                        <div className="container mx-auto">
                            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded mb-4">
                                {article.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-white mb-6 leading-tight max-w-4xl">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">By {article.author}</p>
                                        <p className="text-xs opacity-80">Senior Journalist</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Published</p>
                                        <p className="text-xs opacity-80">{article.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div
                                className="prose prose-lg md:prose-xl max-w-none font-body text-body-foreground
                  prose-headings:font-headline prose-headings:font-bold prose-headings:text-headline
                  prose-p:leading-relaxed prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            <div className="mt-12 pt-8 border-t">
                                <h3 className="font-headline text-2xl font-bold mb-6">About the Author</h3>
                                <div className="flex items-center gap-4 bg-muted/30 p-6 rounded-xl">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{article.author}</h4>
                                        <p className="text-muted-foreground">Senior Tech Correspondent covering AI, robotics, and future tech.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24">
                                <h3 className="font-headline text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-primary rounded-full" />
                                    Related Stories
                                </h3>
                                <div className="space-y-6">
                                    {relatedArticles.map((item) => (
                                        <div key={item.id} className="group cursor-pointer">
                                            <Link to={`/article/${item.id}`}>
                                                <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <span className="absolute top-2 left-2 text-xs font-bold bg-background/90 px-2 py-1 rounded">
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <h4 className="font-headline font-semibold leading-snug group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {item.time}
                                                </p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {/* Newsletter Box */}
                                <div className="mt-8 bg-primary/5 p-6 rounded-xl border border-primary/10">
                                    <h4 className="font-bold mb-2">Subscribe to NewsSync</h4>
                                    <p className="text-sm text-muted-foreground mb-4">Get the latest headlines delivered to your inbox.</p>
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-3 py-2 rounded-md border bg-background mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                    <Button className="w-full">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default ArticleDetails;
