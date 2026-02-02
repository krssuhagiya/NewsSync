import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Sparkles, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const [query, setQuery] = useState("");
    const [isAiSearching, setIsAiSearching] = useState(false);

    const handleSearch = () => {
        if (!query) return;
        setIsAiSearching(true);
        // Simulate AI thinking
        setTimeout(() => {
            setIsAiSearching(false);
            onOpenChange(false);
            // Navigate or show results would go here
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-primary/20 shadow-2xl shadow-primary/10">
                <div className="bg-gradient-to-br from-background via-background to-primary/5">
                    <DialogHeader className="sr-only">
                        <DialogTitle>AI Search</DialogTitle>
                    </DialogHeader>

                    <Command className="bg-transparent">
                        <div className="flex items-center border-b px-3">
                            <Sparkles className="mr-2 h-5 w-5 text-primary animate-pulse" />
                            <CommandInput
                                placeholder="Ask anything... (e.g., 'Summarize today's top tech news')"
                                className="text-base h-14"
                                value={query}
                                onValueChange={setQuery}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                            />
                        </div>

                        <CommandList className="max-h-[60%]">
                            {isAiSearching ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center p-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="mb-4"
                                    >
                                        <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary" />
                                    </motion.div>
                                    <p className="text-lg font-medium text-foreground">Analyzing query...</p>
                                    <p className="text-sm text-muted-foreground mt-1">Found 1,234 relevant sources</p>
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty>No results found.</CommandEmpty>

                                    <CommandGroup heading="AI Suggestions">
                                        <CommandItem onSelect={() => setQuery("Summarize the latest market trends")}>
                                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                                            <span>Summarize the latest market trends</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => setQuery("Explain the impact of new AI regulations")}>
                                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                                            <span>Explain the impact of new AI regulations</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => setQuery("Top sports highlights from yesterday")}>
                                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                                            <span>Top sports highlights from yesterday</span>
                                        </CommandItem>
                                    </CommandGroup>

                                    <div className="grid grid-cols-2 gap-2 p-2">
                                        <CommandGroup heading="Recent">
                                            <CommandItem>
                                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span>Crypto updates</span>
                                            </CommandItem>
                                            <CommandItem>
                                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span>Weather forecast</span>
                                            </CommandItem>
                                        </CommandGroup>

                                        <CommandGroup heading="Trending">
                                            <CommandItem>
                                                <TrendingUp className="mr-2 h-4 w-4 text-primary" />
                                                <span>Tech Innovation Summit</span>
                                            </CommandItem>
                                            <CommandItem>
                                                <TrendingUp className="mr-2 h-4 w-4 text-primary" />
                                                <span>Global climate report</span>
                                            </CommandItem>
                                        </CommandGroup>
                                    </div>
                                </>
                            )}
                        </CommandList>

                        {!isAiSearching && query && (
                            <div className="p-2 border-t bg-muted/30">
                                <button
                                    onClick={handleSearch}
                                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
                                >
                                    Ask AI Agent <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </Command>
                </div>
            </DialogContent>
        </Dialog>
    );
}
