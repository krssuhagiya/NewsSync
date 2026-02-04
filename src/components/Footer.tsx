import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  categories: [
    { label: "World", href: "#" },
    { label: "Business", href: "#" },
    { label: "Technology", href: "#" },
    { label: "Sports", href: "#" },
    { label: "Entertainment", href: "#" },
    { label: "Science", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-12">
      {/* Newsletter section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline text-xl font-bold mb-2">Stay Informed</h3>
              <p className="font-body text-background/70 text-sm">
                Get the latest news delivered directly to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 font-body text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-medium text-sm rounded-lg transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-headline font-bold text-xl">N</span>
              </div>
              <span className="font-headline text-xl font-bold text-background">NewsSync</span>
            </a>
            <p className="font-body text-sm text-background/70 mb-6 max-w-xs">
              Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of global events.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-headline text-sm font-bold uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-headline text-sm font-bold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-headline text-sm font-bold uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-background/50">
            © {new Date().getFullYear()} NewsSync. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Privacy
            </a>
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Terms
            </a>
            <a href="#" className="font-body text-xs text-background/50 hover:text-background transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
