import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { authService } from "@/services/auth-service";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ password?: string }>({});
    const navigate = useNavigate();

    const validatePassword = (pwd: string) => {
        if (pwd.length < 8) return "Password must be at least 8 characters long";
        if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(pwd)) return "Password must contain at least one lowercase letter";
        if (!/[0-9]/.test(pwd)) return "Password must contain at least one number";
        return "";
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrors({ password: passwordError });
            toast.error("Validation Error", { description: passwordError });
            return;
        }
        setErrors({});

        setLoading(true);

        try {
            await authService.register(email, password, name);
            toast.success("Account created successfully", {
                description: "Please sign in with your new account."
            });
            navigate("/login");
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.detail || "Registration failed. Please try again.";
            toast.error("Registration failed", {
                description: message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your information to create your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors({});
                                }}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Must be at least 8 characters with uppercase, lowercase, and number.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Creating account..." : "Create account"}
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
