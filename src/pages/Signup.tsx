import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

const Signup = () => {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
                <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-xl shadow-lg border border-border">
                    <div className="text-center">
                        <h2 className="text-3xl font-headline font-bold">Create an account</h2>
                        <p className="mt-2 text-muted-foreground">Enter your details to register</p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="m@example.com" type="email" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>

                            <Button className="w-full font-bold" type="submit">
                                Create Account
                            </Button>
                        </form>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Signup;
