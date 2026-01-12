import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, Link } from "react-router";

type RegisterFormProps = {
  error?: string | null;
  isSubmitting?: boolean;
};

export function RegisterForm({ error, isSubmitting }: RegisterFormProps) {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">Enter your information to get started</p>
      </div>

      <SocialAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or create with email</span>
        </div>
      </div>

      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="register-name">
            Name
          </label>
          <Input id="register-name" name="name" placeholder="John Doe" required minLength={2} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="register-email">
            Email
          </label>
          <Input
            id="register-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="register-password">
            Password
          </label>
          <Input
            id="register-password"
            name="password"
            type="password"
            placeholder="••••••••"
            minLength={8}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="register-confirm-password">
            Confirm Password
          </label>
          <Input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            minLength={8}
            autoComplete="new-password"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </Form>

      <div className="text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
