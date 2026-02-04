import { useState } from "react";
import { Search, User, Menu, X, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { SearchDialog } from "./SearchDialog";
import { PulseDialog } from "./PulseDialog";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Top Stories", href: "/top-stories" },
  { label: "World", href: "/world" },
  { label: "Business", href: "/business" },
  { label: "Technology", href: "/technology" },
  { label: "Sports", href: "/sports" },
  { label: "Entertainment", href: "/entertainment" },
  // Pulse removed from here to be handled separately
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pulseOpen, setPulseOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-subtle">
        {/* Top bar with date */}
        <div className="bg-surface-subtle py-1.5 px-4 hidden md:block">
          <div className="container mx-auto">
            <p className="text-xs text-muted-custom font-body">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Main navbar */}
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-headline font-bold text-xl">N</span>
              </div>
              <span className="font-headline text-2xl font-bold text-headline tracking-tight group-hover:text-primary transition-colors">
                NewsSync
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-body text-sm font-medium transition-colors relative group ${location.pathname === link.href ? "text-primary" : "text-body hover:text-primary"
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              ))}

              {/* Pulse Link - Special Treatment */}
              <button
                onClick={() => setPulseOpen(true)}
                className="font-body text-sm font-medium transition-colors relative group text-body hover:text-primary flex items-center gap-1.5"
              >
                <Radio className="w-4 h-4 animate-pulse text-primary" />
                Pulse
                <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all w-0 group-hover:w-full" />
              </button>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-body hover:text-primary hover:bg-secondary"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-body hover:text-primary hover:bg-secondary"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-body hover:text-primary hover:bg-secondary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-subtle animate-fade-in">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`font-body text-base font-medium transition-colors py-2 ${location.pathname === link.href ? "text-primary" : "text-body hover:text-primary"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setPulseOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="font-body text-base font-medium transition-colors py-2 text-body hover:text-primary text-left flex items-center gap-2"
                >
                  <Radio className="w-4 h-4 text-primary" />
                  Pulse
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <PulseDialog open={pulseOpen} onOpenChange={setPulseOpen} />
    </>
  );
}
