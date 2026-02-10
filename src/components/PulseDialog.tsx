import { useState, useEffect, useRef } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Bot, Play, SkipForward, Pause, BarChart2, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PulseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const MOCK_NEWS = [
    {
        id: 1,
        title: "Global Tech Summit 2024 Announces Major AI Breakthroughs",
        summary: "Leading tech companies unveiled new AI models capable of complex reasoning and multimodal understanding, promising a new era of automation.",
        category: "Technology",
        isReading: true,
    },
    {
        id: 2,
        title: "Sustainable Energy Markets See Record Growth in Q3",
        summary: "The global renewable energy sector has outperformed expectations with a 15% increase in adoption rates across developing nations.",
        category: "Business",
        isReading: false,
    },
    {
        id: 3,
        title: "New Space Telescope Captures Detailed Images of Exoplanets",
        summary: "NASA's latest observatory has sent back breathtaking high-res photos of nearby star systems, potentially identifying habitable zones.",
        category: "Science",
        isReading: false,
    },
    {
        id: 4,
        title: "International Film Festival Awards Top Honors",
        summary: "The prestigious Golden Palm was awarded to an independent drama that has captioned audiences worldwide with its storytelling.",
        category: "Entertainment",
        isReading: false,
    },
    {
        id: 5,
        title: "Electric Vehicle Sales Surpass Traditional Autos in Nordic Region",
        summary: "In a historic shift, EVs now make up over 50% of new car sales in Scandinavia, marking a tipping point for green transportation.",
        category: "Automotive",
        isReading: false,
    }
];

export function PulseDialog({ open, onOpenChange }: PulseDialogProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // TTS Logic - Refactored for stability

    // 1. Cleanup on close or unmount
    useEffect(() => {
        if (!open) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        }
        return () => {
            // Only cancel on unmount, not on every re-render of this effect if we were to adding dependencies
        };
    }, [open]);

    // Cleanup on real unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const handleNext = () => {
        setCurrentStoryIndex((prev) => {
            if (prev + 1 >= MOCK_NEWS.length) {
                // Stop at the end
                setIsPlaying(false);
                return prev; // Stay on last one or go back to start? User said "completed, it will not start from begining"
                // Usually stopping at the last one is good.
            }
            return prev + 1;
        });
    };

    const speakStory = (index: number) => {
        window.speechSynthesis.cancel();

        const news = MOCK_NEWS[index];
        const text = `${news.title}. ${news.summary}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance; // Store ref to prevent GC

        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onend = () => {
            handleNext();
        };

        // Ensure we are in playing state when starting a new story
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
    };

    // 2. Handle Story Change
    useEffect(() => {
        if (open) {
            speakStory(currentStoryIndex);
        }
    }, [currentStoryIndex, open]);

    // 3. Handle Play/Pause Toggle
    useEffect(() => {
        if (!open) return;

        if (isPlaying) {
            window.speechSynthesis.resume();

            // Safety check: if we're supposed to be playing but not speaking,
            // the utterance might have been lost or finished. Restart current story.
            // We use a small timeout to let resume take effect first.
            const timeoutId = setTimeout(() => {
                if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
                    speakStory(currentStoryIndex);
                }
            }, 100);

            return () => clearTimeout(timeoutId);
        } else {
            window.speechSynthesis.pause();
        }
    }, [isPlaying, open]);


    const handleSkip = () => {
        // Just changing the index will trigger the effect to speak
        setCurrentStoryIndex((prev) => {
            if (prev + 1 >= MOCK_NEWS.length) {
                return 0; // Loop manually if user clicks skip? Or just stop? 
                // Let's assume skip loops or stops. Usually skip loops or does nothing at end.
                // Let's make skip loop for manual interaction, but auto-play stops.
                return 0;
            }
            return prev + 1;
        });
    };

    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleStoryClick = (index: number) => {
        // Just toggle index, effect handles speech
        if (currentStoryIndex === index) {
            // If clicking same story, toggle play/pause
            handlePlayPause();
        } else {
            setCurrentStoryIndex(index);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-hidden border-l border-primary/20 bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col h-full">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Daily Pulse AI</SheetTitle>
                    </SheetHeader>

                    {/* Top Section - Active Player */}
                    <div className="h-2/5 min-h-[300px] bg-gradient-to-b from-primary/10 via-background to-background p-6 flex flex-col items-center justify-center relative overflow-hidden border-b border-border/40 shrink-0">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                        {/* Live Indicator */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-full border border-primary/20">
                            <Radio className="w-3 h-3 text-primary animate-pulse" />
                            <span className="text-[10px] font-bold tracking-wider uppercase text-primary">Live Pulse</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center w-full">
                            <motion.div
                                animate={isPlaying ? {
                                    scale: [1, 1.05, 1],
                                    boxShadow: ["0 0 20px rgba(59, 130, 246, 0.2)", "0 0 40px rgba(59, 130, 246, 0.4)", "0 0 20px rgba(59, 130, 246, 0.2)"]
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 border-2 border-primary/50 relative"
                            >
                                <Bot className="w-12 h-12 text-primary" />
                                {isPlaying && (
                                    <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
                                )}
                            </motion.div>

                            <div className="max-w-[80%] mb-6">
                                <h3 className="font-headline text-lg font-bold text-foreground mb-1 line-clamp-1">
                                    {MOCK_NEWS[currentStoryIndex].title}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {isPlaying ? "Reading now..." : "Paused"}
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-12 w-12 border-primary/30 hover:bg-primary/10 hover:text-primary transition-all hover:scale-105"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full h-10 w-10 border-primary/30 hover:bg-primary/10 hover:text-primary transition-all hover:scale-105"
                                    onClick={handleSkip}
                                >
                                    <SkipForward className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Audio Wave Visualization */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 h-12 px-4 pb-2 opacity-50">
                            {[...Array(24)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={isPlaying ? { height: ["20%", "80%", "30%"] } : { height: "20%" }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.05,
                                        repeatType: "reverse"
                                    }}
                                    className="w-1 bg-primary/60 rounded-full flex-1"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section - Easy Read List - Fixed Scrolling */}
                    <div className="flex-1 flex flex-col bg-card/30 min-h-0">
                        <div className="p-4 border-b border-border/40 flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10 shrink-0">
                            <h2 className="text-sm font-headline font-semibold flex items-center gap-2">
                                <BarChart2 className="w-4 h-4 text-primary" />
                                Up Next
                            </h2>
                            <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                                {MOCK_NEWS.length} Stories
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-3 pb-8">
                                {MOCK_NEWS.map((news, index) => (
                                    <div
                                        key={news.id}
                                        className={`p-4 rounded-xl transition-all duration-300 border ${index === currentStoryIndex
                                            ? "bg-primary/10 border-primary/40 shadow-sm"
                                            : "bg-background/40 border-border/40 hover:bg-background/60 hover:border-border/80"
                                            } cursor-pointer group`}
                                        onClick={() => handleStoryClick(index)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${index === currentStoryIndex ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                                                }`}>
                                                {news.category}
                                            </span>
                                            {index === currentStoryIndex && isPlaying && (
                                                <span className="flex h-2 w-2 relative mt-1">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                                </span>
                                            )}
                                        </div>
                                        <h3 className={`font-headline text-sm font-semibold mb-2 leading-tight group-hover:text-primary transition-colors ${index === currentStoryIndex ? "text-primary" : "text-foreground"
                                            }`}>
                                            {news.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {news.summary}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
