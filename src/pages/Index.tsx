import { HeroSection } from "@/components/HeroSection";
import { LatestNews } from "@/components/LatestNews";
import { Sidebar } from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <main>
          <HeroSection />

          {/* Main Content with Sidebar */}
          <div className="container mx-auto px-4">
            <div className="divider-line mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LatestNews />
              </div>
              <div className="lg:col-span-1">
                <Sidebar />
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Index;
