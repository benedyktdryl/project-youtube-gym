import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, Link } from "react-router";

type LoginFormProps = {
  error?: string | null;
  isSubmitting?: boolean;
};

export function LoginForm({ error, isSubmitting }: LoginFormProps) {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Enter your credentials to sign in</p>
      </div>

      <SocialAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or sign in with email</span>
        </div>
      </div>

      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="login-email">
            Email
          </label>
          <Input
            id="login-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="w-full"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="login-password">
            Password
          </label>
          <Input
            id="login-password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </Form>

      <div className="text-center space-y-3">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>

        <div className="pt-3 border-t">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Demo Account</p>
          <div className="bg-muted/50 rounded-md p-3 space-y-1">
            <p className="text-xs">
              <span className="font-medium">Email:</span> demo@trainflow.com
            </p>
            <p className="text-xs">
              <span className="font-medium">Password:</span> Demo123!
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Pre-loaded with sample workouts and preferences
          </p>
        </div>
      </div>
    </div>
  );
}
