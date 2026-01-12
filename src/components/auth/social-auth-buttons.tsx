import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Apple, Chrome } from "lucide-react";
import { Link } from "react-router";

type SocialAuthButtonsProps = {
  className?: string;
};

export function SocialAuthButtons({ className }: SocialAuthButtonsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Button variant="outline" className="w-full" asChild>
        <Link to="/auth/google">
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Link>
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link to="/auth/apple">
          <Apple className="mr-2 h-4 w-4" />
          Continue with Apple
        </Link>
      </Button>
    </div>
  );
}
