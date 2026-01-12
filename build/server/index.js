import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter, useRouteLoaderData, Link, useFetcher, useLocation, Outlet, createCookieSessionStorage, redirect, UNSAFE_withComponentProps, useLoaderData, Meta, Links, ScrollRestoration, Scripts, UNSAFE_withErrorBoundaryProps, useRouteError, isRouteErrorResponse, Form, useActionData, useNavigation, useSearchParams } from "react-router";
import { useTheme as useTheme$1 } from "next-themes";
import { Toaster as Toaster$1, toast } from "sonner";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import React__default, { createContext, useState, useEffect, useContext, useRef, useMemo } from "react";
import { Dumbbell, Github, Heart, Sun, Moon, Menu, User, Settings, LogOut, X, Home, MessageSquare, Calendar, Video, ArrowRight, MonitorPlay, Sparkles, Trophy, MoveRight, ChevronDown, Chrome, Apple, Clock, Flame, CircleCheck, Bot, Loader2, Send, ArrowLeft, Check, Plus, Play, Bookmark, Filter, ChartBar, ThumbsUp, Share2, ExternalLink, ChevronLeft } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon, CheckIcon, DotFilledIcon, Cross2Icon, MagnifyingGlassIcon, CaretSortIcon, ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { createRemoteJWKSet, jwtVerify, importPKCS8, SignJWT } from "jose";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Command as Command$1 } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as SelectPrimitive from "@radix-ui/react-select";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext) {
  let status = responseStatusCode;
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");
    const readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          status = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme$1();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function useSession() {
  const data2 = useRouteLoaderData("root");
  return {
    user: (data2 == null ? void 0 : data2.user) ?? null,
    isAuthenticated: Boolean(data2 == null ? void 0 : data2.user)
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "w-full border-t bg-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-6 px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Dumbbell, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-lg", children: "TrainFlow" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Your AI-powered YouTube workout planner for personalized fitness routines" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Product" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/features",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "Features"
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/pricing",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "Pricing"
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/faq",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "FAQ"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Resources" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/blog",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "Blog"
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/tutorials",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "Tutorials"
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/support",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "Support"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/about",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "About"
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/contact",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "Contact"
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/terms",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: "Terms"
              }
            ) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " TrainFlow. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://github.com",
            target: "_blank",
            rel: "noreferrer",
            className: "text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "GitHub" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground flex items-center", children: [
          "Made with ",
          /* @__PURE__ */ jsx(Heart, { className: "h-3 w-3 mx-1 text-red-500" }),
          " by TrainFlow Team"
        ] })
      ] })
    ] })
  ] }) });
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const initialState = {
  theme: "system",
  setTheme: () => null
};
const ThemeProviderContext = createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "trainflow-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = window.localStorage.getItem(storageKey);
    return stored || defaultTheme;
  });
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root2 = window.document.documentElement;
    root2.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root2.classList.add(systemTheme);
      return;
    }
    root2.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme2) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, theme2);
      }
      setTheme(theme2);
    }
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === void 0) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
function ThemeToggle() {
  const { setTheme } = useTheme();
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", className: "rounded-full", children: [
      /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("light"), children: "Light" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("dark"), children: "Dark" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("system"), children: "System" })
    ] })
  ] });
}
function Header({ onMenuClick }) {
  var _a;
  const { user, isAuthenticated } = useSession();
  const logoutFetcher = useFetcher();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: `sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 w-full items-center justify-between px-4 md:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          isAuthenticated && /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", onClick: onMenuClick, className: "md:hidden", children: [
            /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Dumbbell, { className: "h-6 w-6 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-xl hidden sm:inline-block", children: "TrainFlow" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          isAuthenticated ? /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "relative h-8 w-8 rounded-full", children: /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: (user == null ? void 0 : user.avatarUrl) ?? void 0, alt: user == null ? void 0 : user.name }),
              /* @__PURE__ */ jsx(AvatarFallback, { children: (_a = user == null ? void 0 : user.name) == null ? void 0 : _a[0] })
            ] }) }) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-start gap-2 p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1 leading-none", children: [
                (user == null ? void 0 : user.name) && /* @__PURE__ */ jsx("p", { className: "font-medium", children: user.name }),
                (user == null ? void 0 : user.email) && /* @__PURE__ */ jsx("p", { className: "w-[200px] truncate text-sm text-muted-foreground", children: user.email })
              ] }) }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/profile", children: [
                /* @__PURE__ */ jsx(User, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "Profile" })
              ] }) }),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/settings", children: [
                /* @__PURE__ */ jsx(Settings, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "Settings" })
              ] }) }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  onClick: () => logoutFetcher.submit(null, { method: "post", action: "/logout" }),
                  children: [
                    /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Log out" })
                  ]
                }
              )
            ] })
          ] }) : location.pathname !== "/login" && location.pathname !== "/register" ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Sign in" }) }),
            /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Sign up" }) })
          ] }) : null
        ] })
      ] })
    }
  );
}
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { isAuthenticated } = useSession();
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname && isOpen && window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname, setIsOpen, isOpen]);
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/videos", label: "Videos", icon: Video },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings }
  ];
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpen && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
        onClick: () => setIsOpen(false),
        "aria-label": "Close menu"
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r bg-card p-4 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 md:shadow-none md:pt-16",
          isOpen ? "translate-x-0" : "-translate-x-full"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between md:hidden", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Menu" }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => setIsOpen(false), children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsx(ScrollArea, { className: "h-[calc(100vh-8rem)] py-4", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-1", children: links.map((link) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: link.href,
              className: cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname === link.href ? "bg-accent text-accent-foreground" : "transparent"
              ),
              children: [
                /* @__PURE__ */ jsx(link.icon, { className: "mr-3 h-4 w-4" }),
                link.label
              ]
            },
            link.href
          )) }) })
        ]
      }
    )
  ] });
}
function Layout() {
  const { isAuthenticated } = useSession();
  const [sidebarOpen, setSidebarOpen] = React__default.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, { onMenuClick: () => setSidebarOpen(!sidebarOpen) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1", children: [
      isAuthenticated && /* @__PURE__ */ jsx(Sidebar, { isOpen: sidebarOpen, setIsOpen: setSidebarOpen }),
      /* @__PURE__ */ jsx(
        "main",
        {
          className: cn(
            "flex-1 min-w-0 transition-all duration-200 ease-in-out",
            isAuthenticated && "md:pl-64"
          ),
          children: /* @__PURE__ */ jsx("div", { className: "container mx-auto py-6 px-4 md:px-6", children: /* @__PURE__ */ jsx(Outlet, {}) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: cn(isAuthenticated && "md:pl-64"), children: /* @__PURE__ */ jsx(Footer, {}) }),
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
}
const globalForPrisma = globalThis;
const pool = globalForPrisma.pool ?? new Pool({
  connectionString: process.env.DATABASE_URL
});
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg(pool) });
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
}
const sessionSecret = process.env.SESSION_SECRET || "dev-secret";
const sessionMaxAge = 60 * 60 * 24 * 7;
const storage = createCookieSessionStorage({
  cookie: {
    name: "__trainflow_session",
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production"
  }
});
const USER_SESSION_KEY = "userId";
async function getSession(request) {
  const cookie = request.headers.get("cookie");
  return storage.getSession(cookie);
}
async function getUserId(request) {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return typeof userId === "string" ? userId : null;
}
async function getUser(request) {
  const userId = await getUserId(request);
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, avatarUrl: true }
  });
  if (!user) {
    const session = await getSession(request);
    session.unset(USER_SESSION_KEY);
    throw redirect("/login", {
      headers: { "Set-Cookie": await storage.commitSession(session) }
    });
  }
  return user;
}
async function requireUserId(request, redirectTo = "/login") {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect(redirectTo);
  }
  return userId;
}
async function requireUser(request) {
  const user = await getUser(request);
  if (!user) {
    throw redirect("/login");
  }
  return user;
}
async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}
function setUserSession(session, userId) {
  session.set(USER_SESSION_KEY, userId);
}
async function destroyUserSession(request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
async function commitSession(session) {
  return storage.commitSession(session);
}
async function loader$c({
  request
}) {
  const user = await getUser(request);
  return {
    user
  };
}
const root = UNSAFE_withComponentProps(function Root() {
  useLoaderData();
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "min-h-screen bg-background text-foreground",
      children: [/* @__PURE__ */ jsx(ThemeProvider, {
        defaultTheme: "system",
        storageKey: "trainflow-theme",
        children: /* @__PURE__ */ jsx(Layout, {})
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useRouteError();
  let title = "Something went wrong";
  let description = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    title = error.statusText || title;
    description = error.data || description;
  } else if (error instanceof Error) {
    description = error.message;
  }
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "min-h-screen bg-background text-foreground flex items-center justify-center",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "max-w-lg space-y-4 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold",
          children: title
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: String(description)
        })]
      }), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: root,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const MOCK_VIDEOS = [
  {
    id: "1",
    title: "30 Min Full Body HIIT Workout",
    youtubeId: "ml6cT4AZdqI",
    channelName: "MadFit",
    channelThumbnail: "https://yt3.googleusercontent.com/ytc/APkrFKZUSQCHhrlwCAXuEkzxOXD50HLoNs6Pm9TKMTGiAw=s176-c-k-c0x00ffffff-no-rj",
    duration: 1800,
    thumbnailUrl: "https://i.ytimg.com/vi/ml6cT4AZdqI/maxresdefault.jpg",
    equipmentNeeded: ["mat"],
    muscleGroups: ["full-body", "cardio"],
    intensity: "high",
    exercises: [
      {
        name: "Jumping Jacks",
        startTime: 120,
        endTime: 150,
        muscleGroup: "cardio",
        difficulty: "beginner"
      },
      {
        name: "Squats",
        startTime: 180,
        endTime: 210,
        muscleGroup: "quads",
        difficulty: "beginner"
      },
      {
        name: "Push-ups",
        startTime: 240,
        endTime: 270,
        muscleGroup: "chest",
        difficulty: "intermediate"
      }
    ]
  },
  {
    id: "2",
    title: "20 Min Arm Workout with Dumbbells",
    youtubeId: "UyTR2EjTAXU",
    channelName: "Pamela Reif",
    channelThumbnail: "https://yt3.googleusercontent.com/ytc/APkrFKaXBBAlwy4iuLJVzgYHDtlTnUmV4XwO5u_P7qKZKA=s176-c-k-c0x00ffffff-no-rj",
    duration: 1200,
    thumbnailUrl: "https://i.ytimg.com/vi/UyTR2EjTAXU/maxresdefault.jpg",
    equipmentNeeded: ["dumbbells"],
    muscleGroups: ["biceps", "triceps", "shoulders"],
    intensity: "medium",
    exercises: [
      {
        name: "Bicep Curls",
        startTime: 90,
        endTime: 120,
        muscleGroup: "biceps",
        difficulty: "beginner"
      },
      {
        name: "Overhead Press",
        startTime: 180,
        endTime: 210,
        muscleGroup: "shoulders",
        difficulty: "intermediate"
      },
      {
        name: "Tricep Extensions",
        startTime: 300,
        endTime: 330,
        muscleGroup: "triceps",
        difficulty: "beginner"
      }
    ]
  },
  {
    id: "3",
    title: "15 Min Abs Workout",
    youtubeId: "AnYl6Nk9GOA",
    channelName: "Chloe Ting",
    channelThumbnail: "https://yt3.googleusercontent.com/ytc/APkrFKb3JO87LkWT5LPLJXzs_2mOcfINB7B42yNY5arSIQ=s176-c-k-c0x00ffffff-no-rj",
    duration: 900,
    thumbnailUrl: "https://i.ytimg.com/vi/AnYl6Nk9GOA/maxresdefault.jpg",
    equipmentNeeded: ["mat"],
    muscleGroups: ["abs"],
    intensity: "medium",
    exercises: [
      {
        name: "Crunches",
        startTime: 60,
        endTime: 90,
        muscleGroup: "abs",
        difficulty: "beginner"
      },
      {
        name: "Plank",
        startTime: 150,
        endTime: 180,
        muscleGroup: "abs",
        difficulty: "intermediate"
      },
      {
        name: "Russian Twists",
        startTime: 240,
        endTime: 270,
        muscleGroup: "abs",
        difficulty: "intermediate"
      }
    ]
  },
  {
    id: "4",
    title: "30 Min Lower Body Workout",
    youtubeId: "X0r-OOKb-qw",
    channelName: "MadFit",
    channelThumbnail: "https://yt3.googleusercontent.com/ytc/APkrFKZUSQCHhrlwCAXuEkzxOXD50HLoNs6Pm9TKMTGiAw=s176-c-k-c0x00ffffff-no-rj",
    duration: 1800,
    thumbnailUrl: "https://i.ytimg.com/vi/X0r-OOKb-qw/maxresdefault.jpg",
    equipmentNeeded: ["mat", "dumbbells"],
    muscleGroups: ["quads", "hamstrings", "glutes"],
    intensity: "high",
    exercises: [
      {
        name: "Squats",
        startTime: 120,
        endTime: 150,
        muscleGroup: "quads",
        difficulty: "beginner"
      },
      {
        name: "Lunges",
        startTime: 210,
        endTime: 240,
        muscleGroup: "quads",
        difficulty: "intermediate"
      },
      {
        name: "Deadlifts",
        startTime: 300,
        endTime: 330,
        muscleGroup: "hamstrings",
        difficulty: "intermediate"
      }
    ]
  }
];
[
  {
    id: "1",
    date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - (/* @__PURE__ */ new Date()).getDay() + 1)),
    // Monday
    videos: [MOCK_VIDEOS[0]],
    isCompleted: true
  },
  {
    id: "2",
    date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - (/* @__PURE__ */ new Date()).getDay() + 2)),
    // Tuesday
    videos: [],
    isCompleted: false
  },
  {
    id: "3",
    date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - (/* @__PURE__ */ new Date()).getDay() + 3)),
    // Wednesday
    videos: [MOCK_VIDEOS[2]],
    isCompleted: false
  },
  {
    id: "4",
    date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - (/* @__PURE__ */ new Date()).getDay() + 4)),
    // Thursday
    videos: [],
    isCompleted: false
  },
  {
    id: "5",
    date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - (/* @__PURE__ */ new Date()).getDay() + 5)),
    // Friday
    videos: [MOCK_VIDEOS[1], MOCK_VIDEOS[3]],
    isCompleted: false
  },
  {
    id: "6",
    date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - (/* @__PURE__ */ new Date()).getDay() + 6)),
    // Saturday
    videos: [],
    isCompleted: false
  },
  {
    id: "7",
    date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - (/* @__PURE__ */ new Date()).getDay() + 7)),
    // Sunday
    videos: [],
    isCompleted: false
  }
];
function HomePage() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("section", { className: "w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-card", children: /* @__PURE__ */ jsx("div", { className: "container px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none", children: "Your Smart YouTube Workout Planner" }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[600px] text-muted-foreground md:text-xl", children: "TrainFlow creates personalized workout plans using YouTube videos based on your goals, available equipment, and schedule." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 min-[400px]:gap-4", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "px-8 text-base", children: /* @__PURE__ */ jsxs(Link, { to: "/register", children: [
            "Get Started ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, className: "px-8 text-base", children: /* @__PURE__ */ jsx(Link, { to: "/chat", children: "Try the AI Assistant" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -left-12 z-0 h-24 w-24 rounded-full bg-primary/20 blur-2xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-12 -right-12 z-0 h-24 w-24 rounded-full bg-primary/20 blur-2xl" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            alt: "Woman doing home workout",
            className: "relative z-10 rounded-xl object-cover aspect-[4/3] w-full sm:w-[500px]"
          }
        )
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-12 md:py-24 lg:py-32 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center space-y-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary", children: "Features" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl", children: "Everything You Need for Your Workout Journey" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "TrainFlow helps you create personalized workout plans with AI, manages your schedule, and keeps you motivated." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-full", children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "AI Assistant" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Chat with our AI to create personalized workout plans based on your goals and preferences." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-full", children: /* @__PURE__ */ jsx(MonitorPlay, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "YouTube Integration" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Access thousands of workout videos from top YouTube fitness creators all in one place." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-full", children: /* @__PURE__ */ jsx(Calendar, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Smart Calendar" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Organize your workout schedule and sync with Google Calendar for easy tracking." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-full", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Personalized Plans" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Get workout recommendations based on your available equipment, fitness level, and goals." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-full", children: /* @__PURE__ */ jsx(Dumbbell, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Equipment Filters" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Find workouts that match exactly what you have available at home or in the gym." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-primary/10 rounded-full", children: /* @__PURE__ */ jsx(Trophy, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Progress Tracking" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Track your workout consistency and celebrate your fitness achievements." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-12 md:py-24 lg:py-32 bg-muted/50", children: /* @__PURE__ */ jsxs("div", { className: "container px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center space-y-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl", children: "Popular Workouts" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "Discover trending workout videos from top fitness creators on YouTube" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12", children: MOCK_VIDEOS.slice(0, 3).map((video) => /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-lg bg-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "aspect-video overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: video.thumbnailUrl,
              alt: video.title,
              className: "object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", className: "rounded-full", children: "Watch Now" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: video.channelThumbnail,
                alt: video.channelName,
                className: "w-8 h-8 rounded-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: video.channelName })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold line-clamp-2 mb-1", children: video.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              Math.floor(video.duration / 60),
              " min"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "•" }),
            /* @__PURE__ */ jsxs("span", { children: [
              video.intensity,
              " intensity"
            ] })
          ] })
        ] })
      ] }, video.id)) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-10", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "rounded-full", children: /* @__PURE__ */ jsxs(Link, { to: "/videos", children: [
        "Browse all workouts ",
        /* @__PURE__ */ jsx(MoveRight, { className: "ml-2 h-4 w-4" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-12 md:py-24 lg:py-32 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center space-y-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary", children: "Process" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl", children: "How TrainFlow Works" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "Our simple 3-step process to get you started with personalized workout plans" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16 mt-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground", children: "1" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Tell Us Your Goals" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Chat with our AI assistant about your fitness goals, available equipment, and schedule preferences." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground", children: "2" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Get Your Plan" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Receive a personalized workout plan with curated YouTube videos tailored to your specific needs." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground", children: "3" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Track Your Progress" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground", children: "Follow your workout calendar, complete exercises, and track your fitness journey over time." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-12 md:py-24 lg:py-32 bg-card", children: /* @__PURE__ */ jsxs("div", { className: "container px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center space-y-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary", children: "Testimonials" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl", children: "Loved by Fitness Enthusiasts" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "See what our users have to say about their experience with TrainFlow" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mt-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-6 bg-background rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                alt: "User avatar",
                className: "w-12 h-12 rounded-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Sarah J." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Fitness Beginner" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: '"TrainFlow made it so easy to find workouts I can do at home with minimal equipment. The AI suggestions are spot on and I love being able to plan my week in advance."' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-6 bg-background rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                alt: "User avatar",
                className: "w-12 h-12 rounded-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "David M." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Gym Enthusiast" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: `"I've been following fitness YouTubers for years, but TrainFlow helps me organize all their content into a structured plan. Game changer for my workout consistency!"` })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-6 bg-background rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                alt: "User avatar",
                className: "w-12 h-12 rounded-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Emma K." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Busy Professional" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: '"As someone with a packed schedule, I love that TrainFlow helps me find shorter workouts that still target the right muscle groups. The calendar integration is perfect for my lifestyle."' })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-12 md:py-24 lg:py-32 bg-primary/5", children: /* @__PURE__ */ jsx("div", { className: "container px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center space-y-4 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl", children: "Ready to Transform Your Workout Routine?" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "Join TrainFlow today and start your journey to a more organized and effective fitness plan." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 min-[400px]:gap-4", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "text-base", children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Start Free" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, size: "lg", className: "text-base", children: /* @__PURE__ */ jsx(Link, { to: "/chat", children: "Try the AI Assistant" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-12 md:py-24 lg:py-32 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center space-y-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary", children: "FAQ" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "Find answers to common questions about TrainFlow" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl divide-y divide-border mt-12", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer items-center justify-between font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Is TrainFlow free to use?" }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 transition-transform group-open:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "TrainFlow offers a free plan with limited features. Premium plans start at $5.99/month with additional features like advanced AI recommendations, unlimited workout plans, and Google Calendar integration." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer items-center justify-between font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Do I need any special equipment?" }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 transition-transform group-open:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Not at all! TrainFlow can recommend workouts based on whatever equipment you have available, including no-equipment options. Just tell our AI assistant what you have access to, and we'll find suitable workouts." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer items-center justify-between font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Can I integrate TrainFlow with my calendar?" }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 transition-transform group-open:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Yes! TrainFlow seamlessly integrates with Google Calendar, allowing you to sync your workout schedule with your personal calendar for better planning and reminders." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer items-center justify-between font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "How does the AI assistant work?" }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 transition-transform group-open:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Our AI assistant analyzes your fitness goals, available equipment, schedule, and current physical condition to recommend the most suitable workout videos from YouTube. It can also adjust plans based on your feedback and progress." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer items-center justify-between font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Can I use TrainFlow on my mobile device?" }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 transition-transform group-open:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Absolutely! TrainFlow is fully responsive and works great on all devices including smartphones, tablets, and desktop computers. We also offer mobile apps for iOS and Android for an enhanced experience." })
        ] }) })
      ] })
    ] }) })
  ] });
}
const _index = UNSAFE_withComponentProps(function IndexRoute() {
  return /* @__PURE__ */ jsx(HomePage, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index
}, Symbol.toStringTag, { value: "Module" }));
function SocialAuthButtons({ className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-3", className), children: [
    /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/auth/google", children: [
      /* @__PURE__ */ jsx(Chrome, { className: "mr-2 h-4 w-4" }),
      "Continue with Google"
    ] }) }),
    /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/auth/apple", children: [
      /* @__PURE__ */ jsx(Apple, { className: "mr-2 h-4 w-4" }),
      "Continue with Apple"
    ] }) })
  ] });
}
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
function LoginForm({ error, isSubmitting }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Welcome back" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Enter your credentials to sign in" })
    ] }),
    /* @__PURE__ */ jsx(SocialAuthButtons, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-full border-t" }) }),
      /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "Or sign in with email" }) })
    ] }),
    /* @__PURE__ */ jsxs(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "login-email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "login-email",
            name: "email",
            type: "email",
            placeholder: "name@example.com",
            required: true,
            className: "w-full",
            autoComplete: "email"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "login-password", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "login-password",
            name: "password",
            type: "password",
            placeholder: "••••••••",
            required: true,
            minLength: 6,
            className: "w-full",
            autoComplete: "current-password"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: error }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Signing in..." : "Sign in" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/register", className: "text-primary hover:underline", children: "Sign up" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-2 font-medium", children: "Demo Account" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 rounded-md p-3 space-y-1", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Email:" }),
            " demo@trainflow.com"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Password:" }),
            " Demo123!"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Pre-loaded with sample workouts and preferences" })
      ] })
    ] })
  ] });
}
async function loader$b({
  request
}) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/dashboard");
  }
  return null;
}
async function action$7({
  request
}) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return Response.json({
      error: "Email and password are required"
    }, {
      status: 400
    });
  }
  let user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user && email === "demo@trainflow.com") {
    const passwordHash = await bcrypt.hash("Demo123!", 10);
    user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: "Demo User",
        avatarUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
        preferences: {
          create: {
            goal: "general-fitness",
            preferredDuration: 30,
            preferredIntensity: "medium",
            availableEquipment: ["mat", "dumbbells", "resistance-bands"],
            preferredDays: ["monday", "wednesday", "friday"]
          }
        }
      }
    });
  }
  if (!user) {
    return Response.json({
      error: "Invalid credentials"
    }, {
      status: 401
    });
  }
  if (!user.passwordHash) {
    return Response.json({
      error: "This account uses social sign in. Please continue with Google or Apple."
    }, {
      status: 401
    });
  }
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return Response.json({
      error: "Invalid credentials"
    }, {
      status: 401
    });
  }
  return createUserSession(user.id, "/dashboard");
}
const login = UNSAFE_withComponentProps(function LoginRoute() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const oauthError = searchParams.get("oauthError");
  const oauthErrorMessage = oauthError === "oauth_failed" ? "Social sign in failed. Please try again." : oauthError === "invalid_state" ? "Social sign in expired. Please try again." : oauthError === "missing_code" ? "Social sign in was cancelled. Please try again." : null;
  const errorMessage = (actionData == null ? void 0 : actionData.error) ?? oauthErrorMessage;
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-[80vh] flex items-center justify-center py-12",
    children: /* @__PURE__ */ jsx(LoginForm, {
      error: errorMessage,
      isSubmitting: navigation.state === "submitting"
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  default: login,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
function RegisterForm({ error, isSubmitting }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Create an account" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Enter your information to get started" })
    ] }),
    /* @__PURE__ */ jsx(SocialAuthButtons, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-full border-t" }) }),
      /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "Or create with email" }) })
    ] }),
    /* @__PURE__ */ jsxs(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "register-name", children: "Name" }),
        /* @__PURE__ */ jsx(Input, { id: "register-name", name: "name", placeholder: "John Doe", required: true, minLength: 2 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "register-email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "register-email",
            name: "email",
            type: "email",
            placeholder: "name@example.com",
            autoComplete: "email",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "register-password", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "register-password",
            name: "password",
            type: "password",
            placeholder: "••••••••",
            minLength: 8,
            autoComplete: "new-password",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "register-confirm-password", children: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "register-confirm-password",
            name: "confirmPassword",
            type: "password",
            placeholder: "••••••••",
            minLength: 8,
            autoComplete: "new-password",
            required: true
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: error }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Creating account..." : "Create account" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Sign in" })
    ] }) })
  ] });
}
async function loader$a({
  request
}) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/dashboard");
  }
  return null;
}
async function action$6({
  request
}) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  if (!name || !email || !password || !confirmPassword) {
    return Response.json({
      error: "All fields are required"
    }, {
      status: 400
    });
  }
  if (password !== confirmPassword) {
    return Response.json({
      error: "Passwords do not match"
    }, {
      status: 400
    });
  }
  const existing = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (existing) {
    if (!existing.passwordHash) {
      return Response.json({
        error: "This email is linked to social sign in. Please continue with Google or Apple."
      }, {
        status: 409
      });
    }
    return Response.json({
      error: "Email already registered"
    }, {
      status: 409
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name
    }
  });
  await prisma.userPreference.create({
    data: {
      userId: user.id,
      goal: "general-fitness",
      preferredDuration: 30,
      preferredIntensity: "medium",
      availableEquipment: [],
      preferredDays: []
    }
  });
  return createUserSession(user.id, "/dashboard");
}
const register = UNSAFE_withComponentProps(function RegisterRoute() {
  const actionData = useActionData();
  const navigation = useNavigation();
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-[80vh] flex items-center justify-center py-12",
    children: /* @__PURE__ */ jsx(RegisterForm, {
      error: actionData == null ? void 0 : actionData.error,
      isSubmitting: navigation.state === "submitting"
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  default: register,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const OAUTH_STATE_KEY = "oauth_state";
const OAUTH_NONCE_KEY = "oauth_nonce";
const OAUTH_REDIRECT_KEY = "oauth_redirect";
const GOOGLE_ISSUER = "https://accounts.google.com";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
const APPLE_ISSUER = "https://appleid.apple.com";
const APPLE_AUTH_URL = "https://appleid.apple.com/auth/authorize";
const APPLE_TOKEN_URL = "https://appleid.apple.com/auth/token";
const APPLE_JWKS_URL = "https://appleid.apple.com/auth/keys";
function isOAuthMockEnabled() {
  return process.env.OAUTH_MOCK === "true" || process.env.NODE_ENV === "test";
}
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for OAuth.`);
  }
  return value;
}
function parseProvider(provider) {
  if (provider === "google" || provider === "apple") {
    return provider;
  }
  throw new Response("Not found", { status: 404 });
}
function getOrigin(request) {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  if (!host) {
    return url.origin;
  }
  const protocol = forwardedProto ?? url.protocol.replace(":", "");
  return `${protocol}://${host}`;
}
function safeRedirectPath(value) {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return null;
}
function getParam(params, key) {
  if (params instanceof URLSearchParams) {
    return params.get(key);
  }
  const value = params.get(key);
  return typeof value === "string" ? value : null;
}
function normalizeName(value) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
function fallbackNameFromEmail(email) {
  var _a;
  if (!email) return "TrainFlow User";
  const prefix = (_a = email.split("@")[0]) == null ? void 0 : _a.replace(/[._-]+/g, " ").trim();
  return prefix ? prefix.replace(/\b\w/g, (char) => char.toUpperCase()) : "TrainFlow User";
}
function getRedirectUri(request, provider) {
  const origin = getOrigin(request);
  return `${origin}/auth/callback/${provider}`;
}
async function getAppleClientSecret() {
  const clientId = requireEnv("APPLE_CLIENT_ID");
  const teamId = requireEnv("APPLE_TEAM_ID");
  const keyId = requireEnv("APPLE_KEY_ID");
  const privateKey = requireEnv("APPLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1e3);
  const key = await importPKCS8(privateKey, "ES256");
  return new SignJWT({}).setProtectedHeader({ alg: "ES256", kid: keyId }).setIssuer(teamId).setIssuedAt(now).setExpirationTime(now + 60 * 60).setAudience(APPLE_ISSUER).setSubject(clientId).sign(key);
}
async function buildAuthUrl(request, provider, state, nonce) {
  if (provider === "google") {
    const clientId2 = requireEnv("GOOGLE_CLIENT_ID");
    const redirectUri2 = getRedirectUri(request, provider);
    const url2 = new URL(GOOGLE_AUTH_URL);
    url2.searchParams.set("client_id", clientId2);
    url2.searchParams.set("redirect_uri", redirectUri2);
    url2.searchParams.set("response_type", "code");
    url2.searchParams.set("scope", "openid email profile");
    url2.searchParams.set("state", state);
    url2.searchParams.set("nonce", nonce);
    url2.searchParams.set("prompt", "select_account");
    return url2;
  }
  const clientId = requireEnv("APPLE_CLIENT_ID");
  const redirectUri = getRedirectUri(request, provider);
  const url = new URL(APPLE_AUTH_URL);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code id_token");
  url.searchParams.set("response_mode", "form_post");
  url.searchParams.set("scope", "name email");
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", nonce);
  return url;
}
async function exchangeGoogleCode(code, request) {
  const clientId = requireEnv("GOOGLE_CLIENT_ID");
  const clientSecret = requireEnv("GOOGLE_CLIENT_SECRET");
  const redirectUri = getRedirectUri(request, "google");
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    })
  });
  if (!response.ok) {
    throw new Error("Google token exchange failed.");
  }
  const payload = await response.json();
  if (!(payload == null ? void 0 : payload.id_token)) {
    throw new Error("Google id_token missing.");
  }
  return payload.id_token;
}
async function exchangeAppleCode(code, request) {
  const clientId = requireEnv("APPLE_CLIENT_ID");
  const redirectUri = getRedirectUri(request, "apple");
  const clientSecret = await getAppleClientSecret();
  const response = await fetch(APPLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    })
  });
  if (!response.ok) {
    throw new Error("Apple token exchange failed.");
  }
  const payload = await response.json();
  if (!(payload == null ? void 0 : payload.id_token)) {
    throw new Error("Apple id_token missing.");
  }
  return payload.id_token;
}
async function verifyGoogleToken(idToken, expectedNonce) {
  const clientId = requireEnv("GOOGLE_CLIENT_ID");
  const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URL));
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: GOOGLE_ISSUER,
    audience: clientId
  });
  if (expectedNonce && payload.nonce !== expectedNonce) {
    throw new Error("Invalid Google nonce.");
  }
  return {
    providerUserId: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : null,
    name: normalizeName(typeof payload.name === "string" ? payload.name : null),
    avatarUrl: typeof payload.picture === "string" ? payload.picture : null
  };
}
async function verifyAppleToken(idToken, expectedNonce) {
  const clientId = requireEnv("APPLE_CLIENT_ID");
  const jwks = createRemoteJWKSet(new URL(APPLE_JWKS_URL));
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: APPLE_ISSUER,
    audience: clientId
  });
  if (expectedNonce && payload.nonce !== expectedNonce) {
    throw new Error("Invalid Apple nonce.");
  }
  return {
    providerUserId: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : null,
    name: null,
    avatarUrl: null
  };
}
async function findOrCreateUser(profile2, provider) {
  const identity = await prisma.userIdentity.findUnique({
    where: {
      provider_providerUserId: {
        provider,
        providerUserId: profile2.providerUserId
      }
    },
    include: { user: true }
  });
  if (identity) {
    return identity.user;
  }
  if (!profile2.email) {
    throw new Error("Email not provided by OAuth provider.");
  }
  let user = await prisma.user.findUnique({
    where: { email: profile2.email }
  });
  const displayName = normalizeName(profile2.name) ?? fallbackNameFromEmail(profile2.email);
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: profile2.email,
        name: displayName,
        avatarUrl: profile2.avatarUrl
      }
    });
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name || displayName,
        avatarUrl: user.avatarUrl ?? profile2.avatarUrl
      }
    });
  }
  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      goal: "general-fitness",
      preferredDuration: 30,
      preferredIntensity: "medium",
      availableEquipment: [],
      preferredDays: []
    }
  });
  await prisma.userIdentity.create({
    data: {
      provider,
      providerUserId: profile2.providerUserId,
      email: profile2.email,
      userId: user.id
    }
  });
  return user;
}
function getMockProfile(provider) {
  const suffix = provider === "google" ? "google" : "apple";
  return {
    providerUserId: `${suffix}-mock-user`,
    email: `mock-${suffix}@trainflow.dev`,
    name: `${provider === "google" ? "Google" : "Apple"} Tester`,
    avatarUrl: null
  };
}
async function redirectWithError(session, errorCode) {
  const cookie = await commitSession(session);
  return redirect(`/login?oauthError=${errorCode}`, {
    headers: { "Set-Cookie": cookie }
  });
}
async function startOAuthFlow(request, providerParam) {
  const provider = parseProvider(providerParam);
  const session = await getSession(request);
  const state = randomBytes(16).toString("hex");
  const nonce = randomBytes(16).toString("hex");
  session.set(OAUTH_STATE_KEY, state);
  session.set(OAUTH_NONCE_KEY, nonce);
  const redirectTo = safeRedirectPath(new URL(request.url).searchParams.get("redirectTo"));
  if (redirectTo) {
    session.set(OAUTH_REDIRECT_KEY, redirectTo);
  }
  if (isOAuthMockEnabled()) {
    const callbackUrl = new URL(getRedirectUri(request, provider));
    callbackUrl.searchParams.set("code", "mock");
    callbackUrl.searchParams.set("state", state);
    const cookie2 = await commitSession(session);
    return redirect(callbackUrl.toString(), { headers: { "Set-Cookie": cookie2 } });
  }
  const authUrl = await buildAuthUrl(request, provider, state, nonce);
  const cookie = await commitSession(session);
  return redirect(authUrl.toString(), { headers: { "Set-Cookie": cookie } });
}
async function handleOAuthCallback(request, providerParam, params) {
  var _a, _b;
  const provider = parseProvider(providerParam);
  const session = await getSession(request);
  const expectedState = session.get(OAUTH_STATE_KEY);
  const expectedNonce = session.get(OAUTH_NONCE_KEY);
  const redirectTo = session.get(OAUTH_REDIRECT_KEY) ?? "/dashboard";
  session.unset(OAUTH_STATE_KEY);
  session.unset(OAUTH_NONCE_KEY);
  session.unset(OAUTH_REDIRECT_KEY);
  const state = getParam(params, "state");
  const code = getParam(params, "code");
  const rawUser = getParam(params, "user");
  if (!state || !expectedState || state !== expectedState) {
    return redirectWithError(session, "invalid_state");
  }
  if (!code) {
    return redirectWithError(session, "missing_code");
  }
  try {
    let profile2;
    if (isOAuthMockEnabled() && code === "mock") {
      profile2 = getMockProfile(provider);
    } else if (provider === "google") {
      const idToken = await exchangeGoogleCode(code, request);
      profile2 = await verifyGoogleToken(idToken, expectedNonce ?? null);
    } else {
      const idToken = await exchangeAppleCode(code, request);
      profile2 = await verifyAppleToken(idToken, expectedNonce ?? null);
      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser);
          const firstName = normalizeName(((_a = parsed == null ? void 0 : parsed.name) == null ? void 0 : _a.firstName) ?? null);
          const lastName = normalizeName(((_b = parsed == null ? void 0 : parsed.name) == null ? void 0 : _b.lastName) ?? null);
          const combined = [firstName, lastName].filter(Boolean).join(" ");
          profile2.name = normalizeName(combined) ?? profile2.name;
        } catch {
        }
      }
    }
    profile2.name = normalizeName(profile2.name) ?? fallbackNameFromEmail(profile2.email);
    const user = await findOrCreateUser(profile2, provider);
    setUserSession(session, user.id);
    const cookie = await commitSession(session);
    return redirect(redirectTo, { headers: { "Set-Cookie": cookie } });
  } catch (error) {
    console.error(error);
    return redirectWithError(session, "oauth_failed");
  }
}
async function loader$9({
  request,
  params
}) {
  return startOAuthFlow(request, params.provider);
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
async function loader$8({
  request,
  params
}) {
  const searchParams = new URL(request.url).searchParams;
  return handleOAuthCallback(request, params.provider, searchParams);
}
async function action$5({
  request,
  params
}) {
  const formData = await request.formData();
  return handleOAuthCallback(request, params.provider, formData);
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
function mapWorkoutVideo(video, scheduledId) {
  return {
    id: video.id,
    youtubeId: video.youtubeId,
    title: video.title,
    channelName: video.channelName,
    channelThumbnail: video.channelThumbnail,
    thumbnailUrl: video.thumbnailUrl,
    duration: video.duration,
    intensity: video.intensity,
    muscleGroups: video.muscleGroups,
    equipmentNeeded: video.equipmentNeeded,
    exercises: video.exercises ?? [],
    scheduledId
  };
}
function toWorkoutDays(workouts) {
  const grouped = /* @__PURE__ */ new Map();
  for (const workout of workouts) {
    const dayKey = workout.scheduledDate.toISOString().split("T")[0];
    let day = grouped.get(dayKey);
    if (!day) {
      day = {
        id: dayKey,
        date: workout.scheduledDate,
        videos: [],
        isCompleted: workout.isCompleted
      };
      grouped.set(dayKey, day);
    }
    day.videos.push(mapWorkoutVideo(workout.video, workout.id));
    day.isCompleted = day.isCompleted && workout.isCompleted;
  }
  return Array.from(grouped.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
}
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "h3",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const data = [
  { name: "Mon", workouts: 30 },
  { name: "Tue", workouts: 40 },
  { name: "Wed", workouts: 45 },
  { name: "Thu", workouts: 20 },
  { name: "Fri", workouts: 50 },
  { name: "Sat", workouts: 60 },
  { name: "Sun", workouts: 20 }
];
function ActivityChart() {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Weekly Activity" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Your workout minutes for the last 7 days" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "pb-4", children: /* @__PURE__ */ jsx("div", { className: "h-[200px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data, margin: { top: 5, right: 5, left: -20, bottom: 0 }, children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "workoutGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "hsl(var(--chart-1))", stopOpacity: 0.3 }),
        /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "hsl(var(--chart-1))", stopOpacity: 0 })
      ] }) }),
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", strokeOpacity: 0.2, vertical: false }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "name",
          tickLine: false,
          axisLine: false,
          style: { fontSize: "12px" }
        }
      ),
      /* @__PURE__ */ jsx(YAxis, { tickLine: false, axisLine: false, style: { fontSize: "12px" } }),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          content: ({ active, payload }) => {
            if (active && payload && payload.length) {
              return /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-background p-2 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[0.70rem] uppercase text-muted-foreground", children: "Day" }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-xs", children: payload[0].payload.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[0.70rem] uppercase text-muted-foreground", children: "Minutes" }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-xs", children: payload[0].value })
                ] })
              ] }) });
            }
            return null;
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Area,
        {
          type: "monotone",
          dataKey: "workouts",
          stroke: "hsl(var(--chart-1))",
          strokeWidth: 2,
          fillOpacity: 1,
          fill: "url(#workoutGradient)"
        }
      )
    ] }) }) }) })
  ] });
}
function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className
}) {
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: title }),
      icon
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: value }),
      (description || trend) && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center", children: [
        trend && /* @__PURE__ */ jsxs(
          "span",
          {
            className: cn(
              "mr-1 flex items-center",
              trend === "up" && "text-emerald-500",
              trend === "down" && "text-red-500"
            ),
            children: [
              trend === "up" ? "↑" : trend === "down" ? "↓" : "→",
              trendValue && /* @__PURE__ */ jsx("span", { className: "ml-1", children: trendValue })
            ]
          }
        ),
        description
      ] })
    ] })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function UpcomingWorkouts({ workouts }) {
  const upcomingWorkouts = workouts.map((day) => ({ ...day, date: new Date(day.date) })).filter((day) => !day.isCompleted && day.videos.length > 0).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3);
  if (upcomingWorkouts.length === 0) {
    return /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Upcoming Workouts" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Your scheduled workouts for the week" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "You have no upcoming workouts scheduled." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/chat", children: "Plan a workout" }) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Upcoming Workouts" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Your scheduled workouts for the week" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "px-0", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: upcomingWorkouts.map((day) => /* @__PURE__ */ jsxs("div", { className: "px-6 py-2 hover:bg-muted/50 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 mr-2 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: format(day.date, "EEEE, MMM d") })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "ml-2", children: [
          day.videos.length,
          " ",
          day.videos.length === 1 ? "video" : "videos"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: day.videos.map((video) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-3 ml-6 text-sm text-muted-foreground",
          children: [
            /* @__PURE__ */ jsx(Video, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: video.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3 mr-1" }),
              /* @__PURE__ */ jsxs("span", { children: [
                Math.floor(video.duration / 60),
                " min"
              ] })
            ] })
          ]
        },
        video.id
      )) })
    ] }, day.id)) }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: "border-t px-6 py-4", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "ml-auto", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/calendar", children: [
      "View calendar ",
      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
    ] }) }) })
  ] });
}
function WelcomeCard() {
  var _a;
  const { user } = useSession();
  const getTimeOfDay = () => {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };
  return /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "text-2xl", children: [
        "Good ",
        getTimeOfDay(),
        ", ",
        ((_a = user == null ? void 0 : user.name) == null ? void 0 : _a.split(" ")[0]) || "there",
        "!"
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Ready to create your personalized workout plan?" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-muted-foreground", children: "Let our AI assistant help you build a workout routine that fits your goals, equipment, and schedule." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/chat", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "mr-2 h-4 w-4" }),
          "Start planning"
        ] }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/videos", children: [
          "Browse videos ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }) })
      ] })
    ] })
  ] });
}
function DashboardPage() {
  const { workoutDays } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Dashboard" }),
    /* @__PURE__ */ jsx(WelcomeCard, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(
        StatsCard,
        {
          title: "Weekly Workouts",
          value: "4/5",
          description: "Completed this week",
          icon: /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          trend: "up",
          trendValue: "25%"
        }
      ),
      /* @__PURE__ */ jsx(
        StatsCard,
        {
          title: "Active Minutes",
          value: "138",
          description: "Total this week",
          icon: /* @__PURE__ */ jsx(Flame, { className: "h-4 w-4 text-muted-foreground" }),
          trend: "up",
          trendValue: "12%"
        }
      ),
      /* @__PURE__ */ jsx(
        StatsCard,
        {
          title: "Completed Workouts",
          value: "23",
          description: "Since joining",
          icon: /* @__PURE__ */ jsx(CircleCheck, { className: "h-4 w-4 text-muted-foreground" })
        }
      ),
      /* @__PURE__ */ jsx(
        StatsCard,
        {
          title: "Most Trained",
          value: "Abs",
          description: "This month",
          icon: /* @__PURE__ */ jsx(Dumbbell, { className: "h-4 w-4 text-muted-foreground" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsx(ActivityChart, {}) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx(UpcomingWorkouts, { workouts: workoutDays }) })
    ] })
  ] });
}
async function loader$7({
  request
}) {
  const userId = await requireUserId(request);
  const upcoming = await prisma.scheduledWorkout.findMany({
    where: {
      userId,
      scheduledDate: {
        gte: new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0))
      }
    },
    include: {
      video: true
    },
    orderBy: {
      scheduledDate: "asc"
    },
    take: 10
  });
  const workoutDays = toWorkoutDays(upcoming).map((day) => ({
    ...day,
    date: day.date.toISOString()
  }));
  return {
    workoutDays
  };
}
const dashboard = UNSAFE_withComponentProps(DashboardPage);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const EQUIPMENT = [
  { id: "mat", name: "Yoga Mat", icon: "yoga" },
  { id: "dumbbells", name: "Dumbbells", icon: "dumbbell" },
  { id: "resistance-bands", name: "Resistance Bands", icon: "cable" },
  { id: "kettlebell", name: "Kettlebell", icon: "kettlebell" },
  { id: "pull-up-bar", name: "Pull-up Bar", icon: "bar-chart-horizontal" },
  { id: "bench", name: "Bench", icon: "sofa" },
  { id: "foam-roller", name: "Foam Roller", icon: "cylinder" },
  { id: "jump-rope", name: "Jump Rope", icon: "cable-car" }
];
const MUSCLE_GROUPS = [
  { id: "abs", name: "Abs", icon: "hexagon" },
  { id: "back", name: "Back", icon: "align-vertical-space-around" },
  { id: "biceps", name: "Biceps", icon: "arm" },
  { id: "chest", name: "Chest", icon: "shirt" },
  { id: "glutes", name: "Glutes", icon: "circle" },
  { id: "hamstrings", name: "Hamstrings", icon: "stretching" },
  { id: "quads", name: "Quads", icon: "square" },
  { id: "shoulders", name: "Shoulders", icon: "mountain" },
  { id: "triceps", name: "Triceps", icon: "arm" },
  { id: "full-body", name: "Full Body", icon: "activity" },
  { id: "cardio", name: "Cardio", icon: "heart-pulse" }
];
const WORKOUT_GOALS = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    description: "Burn calories and reduce body fat",
    icon: "flame"
  },
  {
    id: "muscle-gain",
    name: "Muscle Gain",
    description: "Build strength and increase muscle mass",
    icon: "dumbbell"
  },
  {
    id: "endurance",
    name: "Endurance",
    description: "Improve stamina and cardiovascular health",
    icon: "heart-pulse"
  },
  {
    id: "flexibility",
    name: "Flexibility",
    description: "Enhance mobility and prevent injuries",
    icon: "stretching"
  },
  {
    id: "toning",
    name: "Toning",
    description: "Define muscles without significant bulk",
    icon: "hammer"
  }
];
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const CHAT_SUGGESTIONS = [
  "I want to lose weight and tone my arms",
  "I only have dumbbells and a yoga mat",
  "I can workout on Monday, Wednesday, and Friday",
  "My legs are sore from yesterday's workout",
  "I need a 20-minute workout for today"
];
function ChatInterface() {
  const { user } = useSession();
  const { messages: initialMessages } = useLoaderData();
  const fetcher = useFetcher();
  const [messages, setMessages] = useState(
    () => initialMessages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      timestamp: new Date(message.createdAt)
    }))
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    setMessages(
      initialMessages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
        timestamp: new Date(message.createdAt)
      }))
    );
  }, [initialMessages]);
  useEffect(() => {
    var _a, _b;
    if (fetcher.state === "idle" && ((_a = fetcher.data) == null ? void 0 : _a.messages)) {
      setMessages((prev) => [
        ...prev,
        ...fetcher.data.messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          timestamp: new Date(message.createdAt)
        }))
      ]);
      setInput("");
    }
    if (fetcher.state === "idle" && ((_b = fetcher.data) == null ? void 0 : _b.error)) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.state, fetcher.data]);
  useEffect(() => {
    var _a;
    const messageCount = messages.length;
    if (messageCount > 0) {
      (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);
  const isSubmitting = fetcher.state !== "idle";
  const handleSendMessage = () => {
    if (!input.trim()) return;
    const formData = new FormData();
    formData.append("message", input.trim());
    fetcher.submit(formData, { method: "post", action: "/chat" });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };
  const displayMessages = useMemo(
    () => messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
    [messages]
  );
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col h-[calc(100vh-13rem)]", children: /* @__PURE__ */ jsxs(Card, { className: "flex-1 flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
      displayMessages.map((message) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`,
          children: [
            message.role === "assistant" && /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 mr-2", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: "/bot-avatar.png", alt: "AI Assistant" }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `px-4 py-2 rounded-lg max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`,
                children: [
                  /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: message.content }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                ]
              }
            ),
            message.role === "user" && /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 ml-2", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: (user == null ? void 0 : user.avatarUrl) || void 0, alt: (user == null ? void 0 : user.name) || "User" }),
              /* @__PURE__ */ jsx(AvatarFallback, { children: ((user == null ? void 0 : user.name) || "U")[0] })
            ] })
          ]
        },
        message.id
      )),
      isSubmitting && /* @__PURE__ */ jsxs("div", { className: "flex justify-start mb-4", children: [
        /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 mr-2", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: "/bot-avatar.png", alt: "AI Assistant" }),
          /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 rounded-lg bg-muted flex items-center", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm", children: "Thinking..." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
    ] }),
    messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-3 rounded-full mb-4", children: /* @__PURE__ */ jsx(Dumbbell, { className: "h-8 w-8 text-primary" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "TrainFlow Assistant" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground mb-6 max-w-md", children: "I'll help you create a personalized workout plan based on your goals, available equipment, and schedule." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 justify-center max-w-md", children: CHAT_SUGGESTIONS.map((suggestion) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => handleSuggestionClick(suggestion),
          children: suggestion
        },
        suggestion
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 border-t", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
      /* @__PURE__ */ jsx(
        Textarea,
        {
          placeholder: "Type your message...",
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: handleKeyDown,
          className: "min-h-10 resize-none",
          rows: 1,
          disabled: isSubmitting
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "icon",
          onClick: handleSendMessage,
          disabled: !input.trim() || isSubmitting,
          className: "shrink-0",
          children: [
            /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Send message" })
          ]
        }
      )
    ] }) })
  ] }) });
}
function ChatPage() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "AI Assistant" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Tell our AI assistant about your fitness goals, available equipment, and schedule. We'll create a personalized workout plan for you." }),
    /* @__PURE__ */ jsx(ChatInterface, {})
  ] });
}
async function loader$6({
  request
}) {
  const userId = await requireUserId(request);
  const messages = await prisma.chatMessage.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  const mapped = messages.map((message) => ({
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt.toISOString()
  }));
  return {
    messages: mapped
  };
}
async function action$4({
  request
}) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const content = String(formData.get("message") ?? "").trim();
  if (!content) {
    return Response.json({
      error: "Message content is required"
    }, {
      status: 400
    });
  }
  const userMessage = await prisma.chatMessage.create({
    data: {
      userId,
      role: "user",
      content
    }
  });
  const assistantMessage = await prisma.chatMessage.create({
    data: {
      userId,
      role: "assistant",
      content: "I logged your update. Want me to adjust your plan or schedule a new session?"
    }
  });
  const payload = [{
    id: userMessage.id,
    role: userMessage.role,
    content: userMessage.content,
    createdAt: userMessage.createdAt.toISOString()
  }, {
    id: assistantMessage.id,
    role: assistantMessage.role,
    content: assistantMessage.content,
    createdAt: assistantMessage.createdAt.toISOString()
  }];
  return Response.json({
    messages: payload
  });
}
const chat = UNSAFE_withComponentProps(ChatPage);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: chat,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
function CalendarView({ workoutDays }) {
  var _a;
  const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
  const fetcher = useFetcher();
  const parsedWorkouts = useMemo(
    () => workoutDays.map((day) => ({
      ...day,
      date: new Date(day.date)
    })),
    [workoutDays]
  );
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const toggleWorkoutCompleted = (scheduledId) => {
    if (!scheduledId) return;
    fetcher.submit({ workoutId: scheduledId, intent: "toggle-complete" }, { method: "post" });
  };
  const pendingId = (_a = fetcher.formData) == null ? void 0 : _a.get("workoutId");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Training Calendar" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
          format(startDate, "MMMM d"),
          " - ",
          format(addDays(startDate, 6), "MMMM d, yyyy")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            onClick: () => setCurrentDate(addDays(currentDate, -7)),
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            onClick: () => setCurrentDate(addDays(currentDate, 7)),
            children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6", children: weekDates.map((date) => {
      const day = parsedWorkouts.find((d) => isSameDay(new Date(d.date), date));
      const hasWorkout = day && day.videos.length > 0;
      const isPendingToggle = pendingId && (day == null ? void 0 : day.videos.some((video) => video.scheduledId === pendingId));
      return /* @__PURE__ */ jsx(
        Card,
        {
          className: cn(
            "overflow-hidden transition-all duration-200 hover:shadow-md",
            hasWorkout ? "border-primary/50 border-2" : "border-muted",
            (day == null ? void 0 : day.isCompleted) ? "bg-green-50 dark:bg-green-950" : "",
            !hasWorkout ? "border-dashed" : ""
          ),
          children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: format(date, "dd") }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: format(date, "EEEE") })
              ] }),
              hasWorkout && /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: cn(
                    "h-8 w-8 rounded-full",
                    (day == null ? void 0 : day.isCompleted) ? "text-green-500" : "text-muted-foreground"
                  ),
                  onClick: () => {
                    var _a2;
                    return toggleWorkoutCompleted((_a2 = day == null ? void 0 : day.videos[0]) == null ? void 0 : _a2.scheduledId);
                  },
                  disabled: isPendingToggle,
                  children: /* @__PURE__ */ jsx(
                    Check,
                    {
                      className: cn("h-6 w-6", (day == null ? void 0 : day.isCompleted) ? "fill-green-500" : "")
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3 min-h-[120px]", children: !hasWorkout ? /* @__PURE__ */ jsx("div", { className: "h-full flex flex-col items-center justify-center text-center pt-4", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3 mr-1" }),
              "Add workout"
            ] }) }) : day.videos.map((video) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "p-3 rounded-lg border bg-background/50",
                  day.isCompleted ? "opacity-50" : ""
                ),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx(Video, { className: "h-2.5 w-2.5 mr-1" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: video.channelName }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center text-xs text-muted-foreground ml-auto", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "h-2.5 w-2.5 mr-1" }),
                      Math.floor(video.duration / 60),
                      " min"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium line-clamp-2 leading-tight", children: video.title })
                ]
              },
              video.scheduledId ?? video.id
            )) })
          ] })
        },
        date.toISOString()
      );
    }) })
  ] });
}
function CalendarPage() {
  const { workoutDays } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Calendar" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "View and manage your workout schedule. Mark completed workouts and stay on track with your fitness goals." }),
    /* @__PURE__ */ jsx(CalendarView, { workoutDays })
  ] });
}
async function loader$5({
  request
}) {
  const userId = await requireUserId(request);
  const workouts = await prisma.scheduledWorkout.findMany({
    where: {
      userId
    },
    include: {
      video: true
    },
    orderBy: {
      scheduledDate: "asc"
    }
  });
  const workoutDays = toWorkoutDays(workouts).map((day) => ({
    ...day,
    date: day.date.toISOString()
  }));
  return {
    workoutDays
  };
}
async function action$3({
  request
}) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "toggle-complete") {
    const workoutId = String(formData.get("workoutId") ?? "");
    if (!workoutId) {
      return Response.json({
        error: "Workout id is required"
      }, {
        status: 400
      });
    }
    const existing = await prisma.scheduledWorkout.findFirst({
      where: {
        id: workoutId,
        userId
      }
    });
    if (!existing) {
      return Response.json({
        error: "Workout not found"
      }, {
        status: 404
      });
    }
    const updated = await prisma.scheduledWorkout.update({
      where: {
        id: workoutId
      },
      data: {
        isCompleted: !existing.isCompleted,
        completedAt: existing.isCompleted ? null : /* @__PURE__ */ new Date()
      }
    });
    return Response.json({
      workoutId: updated.id,
      isCompleted: updated.isCompleted
    });
  }
  return Response.json({
    error: "Unsupported action"
  }, {
    status: 400
  });
}
const calendar = UNSAFE_withComponentProps(CalendarPage);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: calendar,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
function VideoCard({ video }) {
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved videos" : "Added to saved videos");
  };
  const handleAddToCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Added to calendar");
  };
  return /* @__PURE__ */ jsx(Card, { className: "overflow-hidden group h-full flex flex-col hover:shadow-md transition-all", children: /* @__PURE__ */ jsxs(Link, { to: `/videos/${video.id}`, className: "block h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: video.thumbnailUrl,
          alt: video.title,
          className: "w-full h-full object-cover transition-transform group-hover:scale-105"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity", children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "secondary", className: "rounded-full", children: /* @__PURE__ */ jsx(Play, { className: "h-5 w-5" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3 mr-1" }),
        Math.floor(video.duration / 60),
        ":",
        (video.duration % 60).toString().padStart(2, "0")
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex-grow", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-2", children: [
        /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: video.channelThumbnail, alt: video.channelName }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: video.channelName[0] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold line-clamp-2 leading-tight", children: video.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: video.channelName })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 mt-3", children: [
        video.muscleGroups.map((group) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: group }, group)),
        /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "outline",
            className: `text-xs ${video.intensity === "high" ? "border-red-200 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" : video.intensity === "medium" ? "border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300" : "border-green-200 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"}`,
            children: [
              video.intensity,
              " intensity"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "px-4 py-3 border-t flex justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Dumbbell, { className: "h-3 w-3 mr-1" }),
        video.equipmentNeeded.length > 0 ? video.equipmentNeeded.join(", ") : "No equipment"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            size: "icon",
            variant: "ghost",
            className: "h-7 w-7 rounded-full",
            onClick: handleSave,
            children: [
              /* @__PURE__ */ jsx(Bookmark, { className: `h-4 w-4 ${isSaved ? "fill-primary" : ""}` }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Save" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            size: "icon",
            variant: "ghost",
            className: "h-7 w-7 rounded-full",
            onClick: handleAddToCalendar,
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to calendar" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
function VideoFilters({ onFiltersChange }) {
  const [search, setSearch] = useState("");
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedIntensity, setSelectedIntensity] = useState([]);
  const [duration, setDuration] = useState([0, 60]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    applyFilters(
      e.target.value,
      selectedMuscleGroups,
      selectedEquipment,
      selectedIntensity,
      duration
    );
  };
  const toggleMuscleGroup = (id) => {
    const updated = selectedMuscleGroups.includes(id) ? selectedMuscleGroups.filter((item) => item !== id) : [...selectedMuscleGroups, id];
    setSelectedMuscleGroups(updated);
    applyFilters(search, updated, selectedEquipment, selectedIntensity, duration);
  };
  const toggleEquipment = (id) => {
    const updated = selectedEquipment.includes(id) ? selectedEquipment.filter((item) => item !== id) : [...selectedEquipment, id];
    setSelectedEquipment(updated);
    applyFilters(search, selectedMuscleGroups, updated, selectedIntensity, duration);
  };
  const toggleIntensity = (id) => {
    const updated = selectedIntensity.includes(id) ? selectedIntensity.filter((item) => item !== id) : [...selectedIntensity, id];
    setSelectedIntensity(updated);
    applyFilters(search, selectedMuscleGroups, selectedEquipment, updated, duration);
  };
  const handleDurationChange = (value) => {
    const newDuration = [value[0], value[1]];
    setDuration(newDuration);
    applyFilters(search, selectedMuscleGroups, selectedEquipment, selectedIntensity, newDuration);
  };
  const applyFilters = (search2, muscleGroups, equipment, intensity, duration2) => {
    onFiltersChange({
      search: search2,
      muscleGroups,
      equipment,
      intensity,
      duration: duration2
    });
  };
  const clearAllFilters = () => {
    setSearch("");
    setSelectedMuscleGroups([]);
    setSelectedEquipment([]);
    setSelectedIntensity([]);
    setDuration([0, 60]);
    applyFilters("", [], [], [], [0, 60]);
  };
  const hasActiveFilters = selectedMuscleGroups.length > 0 || selectedEquipment.length > 0 || selectedIntensity.length > 0 || duration[0] > 0 || duration[1] < 60;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Search workouts...",
            value: search,
            onChange: handleSearchChange,
            className: "w-full"
          }
        ),
        search && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "absolute right-0 top-0 h-full",
            onClick: () => {
              setSearch("");
              applyFilters(
                "",
                selectedMuscleGroups,
                selectedEquipment,
                selectedIntensity,
                duration
              );
            },
            children: [
              /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Clear search" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: filtersVisible ? "default" : "outline",
            onClick: () => setFiltersVisible(!filtersVisible),
            className: "whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Filter, { className: "h-4 w-4 mr-2" }),
              "Filters",
              hasActiveFilters && /* @__PURE__ */ jsx(Badge, { className: "ml-2 px-1 py-0 h-5 bg-primary/20 text-primary-foreground", children: selectedMuscleGroups.length + selectedEquipment.length + selectedIntensity.length + (duration[0] > 0 || duration[1] < 60 ? 1 : 0) })
            ]
          }
        ),
        hasActiveFilters && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: clearAllFilters,
            className: "whitespace-nowrap",
            children: "Clear all"
          }
        )
      ] })
    ] }),
    filtersVisible && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md bg-card", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Muscle Groups" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: MUSCLE_GROUPS.map((group) => /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: selectedMuscleGroups.includes(group.id) ? "default" : "outline",
            className: "cursor-pointer",
            onClick: () => toggleMuscleGroup(group.id),
            children: [
              group.name,
              selectedMuscleGroups.includes(group.id) && /* @__PURE__ */ jsx(X, { className: "h-3 w-3 ml-1" })
            ]
          },
          group.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Equipment" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: EQUIPMENT.map((item) => /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: selectedEquipment.includes(item.id) ? "default" : "outline",
            className: "cursor-pointer",
            onClick: () => toggleEquipment(item.id),
            children: [
              item.name,
              selectedEquipment.includes(item.id) && /* @__PURE__ */ jsx(X, { className: "h-3 w-3 ml-1" })
            ]
          },
          item.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Intensity" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["low", "medium", "high"].map((level) => /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: selectedIntensity.includes(level) ? "default" : "outline",
            className: `cursor-pointer ${level === "high" ? "hover:bg-red-100 hover:text-red-700" : level === "medium" ? "hover:bg-orange-100 hover:text-orange-700" : "hover:bg-green-100 hover:text-green-700"}`,
            onClick: () => toggleIntensity(level),
            children: [
              level.charAt(0).toUpperCase() + level.slice(1),
              selectedIntensity.includes(level) && /* @__PURE__ */ jsx(X, { className: "h-3 w-3 ml-1" })
            ]
          },
          level
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Duration (minutes)" }),
        /* @__PURE__ */ jsxs("div", { className: "px-2", children: [
          /* @__PURE__ */ jsx(
            Slider,
            {
              min: 0,
              max: 60,
              step: 5,
              value: [duration[0], duration[1]],
              onValueChange: handleDurationChange,
              className: "mb-6"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              duration[0],
              " min"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              duration[1],
              " min"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function VideosPage() {
  const { videos: videos2 } = useLoaderData();
  const [filters, setFilters] = useState({
    search: "",
    muscleGroups: [],
    equipment: [],
    intensity: [],
    duration: [0, 60]
  });
  const filteredVideos = useMemo(() => {
    return videos2.filter((video) => {
      if (filters.search && !video.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.muscleGroups.length > 0 && !filters.muscleGroups.some((group) => video.muscleGroups.includes(group))) {
        return false;
      }
      if (filters.equipment.length > 0 && !filters.equipment.every(
        (eq) => video.equipmentNeeded.includes(eq) || eq === "none" && video.equipmentNeeded.length === 0
      )) {
        return false;
      }
      if (filters.intensity.length > 0 && !filters.intensity.includes(video.intensity)) {
        return false;
      }
      const videoDurationInMinutes = Math.floor(video.duration / 60);
      if (videoDurationInMinutes < filters.duration[0] || videoDurationInMinutes > filters.duration[1]) {
        return false;
      }
      return true;
    });
  }, [videos2, filters]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Browse Videos" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Discover workout videos from top YouTube fitness creators, filtered to match your preferences." }),
    /* @__PURE__ */ jsx(VideoFilters, { onFiltersChange: setFilters }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredVideos.length > 0 ? filteredVideos.map((video) => /* @__PURE__ */ jsx(VideoCard, { video }, video.id)) : /* @__PURE__ */ jsx("div", { className: "col-span-full text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No videos match your filters. Try adjusting your search criteria." }) }) })
  ] });
}
async function loader$4({
  request
}) {
  await requireUser(request);
  const videos2 = await prisma.workoutVideo.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return {
    videos: videos2.map(mapWorkoutVideo)
  };
}
const videos = UNSAFE_withComponentProps(VideosPage);
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: videos,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function VideoPlayer({ video }) {
  var _a, _b, _c, _d, _e;
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= video.duration) {
            setIsPlaying(false);
            return video.duration;
          }
          return newTime;
        });
      }, 1e3);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, video.duration]);
  useEffect(() => {
    setProgressPercent(currentTime / video.duration * 100);
  }, [currentTime, video.duration]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const getCurrentExercise = () => {
    return video.exercises.find((ex) => currentTime >= ex.startTime && currentTime <= ex.endTime);
  };
  const handleAddToCalendar = () => {
    toast.success("Added to your calendar");
  };
  const handleShare = () => {
    toast.success("Workout link copied to clipboard");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "relative aspect-video bg-black rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        width: "100%",
        height: "100%",
        src: `https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&modestbranding=1`,
        title: video.title,
        frameBorder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 flex-wrap md:flex-nowrap", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-2/3 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: video.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 mr-2", children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: video.channelThumbnail, alt: video.channelName }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: video.channelName[0] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: video.channelName })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 mr-1 text-muted-foreground" }),
              /* @__PURE__ */ jsxs("span", { children: [
                Math.floor(video.duration / 60),
                " minutes"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: "outline",
                className: video.intensity === "high" ? "border-red-200 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" : video.intensity === "medium" ? "border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300" : "border-green-200 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
                children: [
                  /* @__PURE__ */ jsx(Flame, { className: "h-3 w-3 mr-1" }),
                  video.intensity,
                  " intensity"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Tabs, { defaultValue: "exercises", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "mb-4", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "exercises", children: "Exercises" }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "overview", children: "Overview" })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "exercises", className: "space-y-4", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Exercise Timeline" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Follow along with the exercises in this workout" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full bg-muted rounded-full h-2 relative", children: [
                /* @__PURE__ */ jsx(Progress, { value: progressPercent, className: "h-2" }),
                video.exercises.map((exercise) => {
                  const startPercent = exercise.startTime / video.duration * 100;
                  const widthPercent = (exercise.endTime - exercise.startTime) / video.duration * 100;
                  const isActive = currentTime >= exercise.startTime && currentTime <= exercise.endTime;
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `absolute h-3 -top-0.5 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-primary/30"}`,
                      style: {
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`
                      }
                    },
                    exercise.name + exercise.startTime
                  );
                })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: formatTime(currentTime) }),
                /* @__PURE__ */ jsx("span", { children: formatTime(video.duration) })
              ] }),
              getCurrentExercise() && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-primary/10 border border-primary/20", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "font-semibold", children: [
                    "Current: ",
                    (_a = getCurrentExercise()) == null ? void 0 : _a.name
                  ] }),
                  /* @__PURE__ */ jsx(Badge, { variant: "outline", children: (_b = getCurrentExercise()) == null ? void 0 : _b.muscleGroup })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    formatTime(((_c = getCurrentExercise()) == null ? void 0 : _c.startTime) || 0),
                    " -",
                    " ",
                    formatTime(((_d = getCurrentExercise()) == null ? void 0 : _d.endTime) || 0)
                  ] }),
                  /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: (_e = getCurrentExercise()) == null ? void 0 : _e.difficulty })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: video.exercises.map((exercise) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `p-3 rounded-lg border ${currentTime >= exercise.startTime && currentTime <= exercise.endTime ? "bg-primary/5 border-primary/30" : "bg-card"}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-medium", children: exercise.name }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
                        formatTime(exercise.startTime),
                        " - ",
                        formatTime(exercise.endTime)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-1 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsx("span", { children: exercise.muscleGroup }),
                      /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: exercise.difficulty })
                    ] })
                  ]
                },
                `${exercise.name}-${exercise.startTime}-${exercise.endTime}`
              )) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "overview", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Workout Details" }) }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(ChartBar, { className: "h-5 w-5 mr-2 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Difficulty:" }),
                  /* @__PURE__ */ jsx("span", { className: "ml-2", children: video.intensity === "high" ? "Advanced" : video.intensity === "medium" ? "Intermediate" : "Beginner" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 mr-2 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Duration:" }),
                  /* @__PURE__ */ jsxs("span", { className: "ml-2", children: [
                    Math.floor(video.duration / 60),
                    " minutes"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(Dumbbell, { className: "h-5 w-5 mr-2 text-muted-foreground mt-0.5" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Equipment needed:" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: video.equipmentNeeded.length > 0 ? video.equipmentNeeded.map((eq) => /* @__PURE__ */ jsx(Badge, { variant: "outline", children: eq }, eq)) : /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "No equipment needed" }) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(Flame, { className: "h-5 w-5 mr-2 text-muted-foreground mt-0.5" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Muscle groups:" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: video.muscleGroups.map((group) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: group }, group)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(ThumbsUp, { className: "h-5 w-5 mr-2 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Recommended for:" }),
                  /* @__PURE__ */ jsx("span", { className: "ml-2", children: video.intensity === "high" ? "Building strength and endurance" : video.intensity === "medium" ? "Toning and conditioning" : "Recovery and mobility" })
                ] })
              ] })
            ] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/3 space-y-4", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Actions" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs(Button, { className: "w-full", onClick: handleAddToCalendar, children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 mr-2" }),
              "Add to calendar"
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full", onClick: handleShare, children: [
              /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4 mr-2" }),
              "Share workout"
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: `https://www.youtube.com/watch?v=${video.youtubeId}`,
                target: "_blank",
                rel: "noopener noreferrer",
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-2" }),
                  "Open on YouTube"
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Similar Workouts" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
            video.muscleGroups.includes("abs") && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-12 rounded overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://i.ytimg.com/vi/AnYl6Nk9GOA/maxresdefault.jpg",
                  alt: "Abs workout",
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium line-clamp-2", children: "15 Min Abs Workout - No Equipment" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Chloe Ting • 15 min" })
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
            ] }),
            video.muscleGroups.includes("full-body") && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-12 rounded overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://i.ytimg.com/vi/ml6cT4AZdqI/maxresdefault.jpg",
                  alt: "Full body workout",
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium line-clamp-2", children: "30 Min Full Body HIIT Workout" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "MadFit • 30 min" })
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
            ] }),
            video.muscleGroups.includes("quads") && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-12 rounded overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://i.ytimg.com/vi/X0r-OOKb-qw/maxresdefault.jpg",
                  alt: "Leg workout",
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium line-clamp-2", children: "30 Min Lower Body Workout" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "MadFit • 30 min" })
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function VideoDetailPage() {
  const { video } = useLoaderData();
  if (!video) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Video not found" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "The video you're looking for does not exist or has been removed." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/videos", children: [
        /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4 mr-2" }),
        "Back to videos"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "mr-4", children: /* @__PURE__ */ jsxs(Link, { to: "/videos", children: [
        /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
        "Back"
      ] }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold truncate", children: "Video Details" })
    ] }),
    /* @__PURE__ */ jsx(VideoPlayer, { video })
  ] });
}
async function loader$3({
  request,
  params
}) {
  await requireUser(request);
  if (!params.id) {
    throw redirect("/videos");
  }
  const video = await prisma.workoutVideo.findUnique({
    where: {
      id: params.id
    }
  });
  if (!video) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  return {
    video: mapWorkoutVideo(video)
  };
}
const videos_$id = UNSAFE_withComponentProps(VideoDetailPage);
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: videos_$id,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
function UserProfile({ user }) {
  const fetcher = useFetcher();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState("");
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);
  useEffect(() => {
    var _a, _b;
    if (fetcher.state === "idle") {
      if ((_a = fetcher.data) == null ? void 0 : _a.ok) {
        toast.success("Profile updated successfully");
      }
      if ((_b = fetcher.data) == null ? void 0 : _b.error) {
        toast.error(fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data]);
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetcher.submit(formData, { method: "post", action: "/profile" });
  };
  const isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs(Card, { className: "w-full md:w-1/3", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Profile Picture" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Update your profile picture" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-32 w-32", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: user.avatarUrl ?? void 0, alt: user.name }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "text-3xl", children: user.name[0] })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", type: "button", children: "Change Picture" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "flex-1", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Personal Information" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Update your account details" })
        ] }),
        /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", onSubmit, children: [
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  name: "name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "bio", children: "Bio" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "bio",
                  name: "bio",
                  value: bio,
                  onChange: (e) => setBio(e.target.value),
                  placeholder: "Tell us a bit about yourself and your fitness goals"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => toast.info("Changes discarded"),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Saving..." : "Save Changes" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Account Settings" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Manage your account settings and preferences" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Email Notifications" }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "notify-workouts", className: "flex-1", children: [
              "New workout recommendations",
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Receive emails when we have new workout suggestions for you" })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: "notify-workouts", className: "h-4 w-4", defaultChecked: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "notify-reminders", className: "flex-1", children: [
              "Workout reminders",
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Get reminders for your scheduled workouts" })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: "notify-reminders", className: "h-4 w-4", defaultChecked: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "notify-features", className: "flex-1", children: [
              "New features and updates",
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Stay informed about new features and platform updates" })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: "notify-features", className: "h-4 w-4", defaultChecked: true })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function ProfilePage() {
  const { user } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Profile" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage your personal information and account settings." }),
    /* @__PURE__ */ jsx(UserProfile, { user })
  ] });
}
async function loader$2({
  request
}) {
  const userId = await requireUserId(request);
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true
    }
  });
  if (!user) {
    throw new Response("User not found", {
      status: 404
    });
  }
  return {
    user
  };
}
async function action$2({
  request
}) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!name || !email) {
    return Response.json({
      error: "Name and email are required"
    }, {
      status: 400
    });
  }
  const existing = await prisma.user.findFirst({
    where: {
      email,
      NOT: {
        id: userId
      }
    }
  });
  if (existing) {
    return Response.json({
      error: "Email already in use"
    }, {
      status: 409
    });
  }
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      email
    }
  });
  return Response.json({
    ok: true
  });
}
const profile = UNSAFE_withComponentProps(ProfilePage);
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: profile,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(Command$1.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(CaretSortIcon, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function PreferencesForm({ preferences }) {
  var _a, _b, _c, _d, _e;
  const fetcher = useFetcher();
  const [localPreferences, setLocalPreferences] = useState(
    preferences ?? {
      goal: "general-fitness",
      preferredDuration: 30,
      preferredIntensity: "medium",
      availableEquipment: [],
      preferredDays: []
    }
  );
  const [openEquipment, setOpenEquipment] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  useEffect(() => {
    if (preferences) {
      setLocalPreferences({
        goal: preferences.goal,
        preferredDuration: preferences.preferredDuration,
        preferredIntensity: preferences.preferredIntensity,
        availableEquipment: preferences.availableEquipment,
        preferredDays: preferences.preferredDays
      });
    }
  }, [preferences]);
  useEffect(() => {
    var _a2;
    if (fetcher.state === "idle" && ((_a2 = fetcher.data) == null ? void 0 : _a2.ok)) {
      toast.success("Preferences updated successfully");
    }
  }, [fetcher.state, fetcher.data]);
  const handleSavePreferences = async () => {
    const formData = new FormData();
    formData.append("goal", localPreferences.goal || "general-fitness");
    formData.append("preferredDuration", String(localPreferences.preferredDuration ?? 30));
    formData.append(
      "preferredIntensity",
      localPreferences.preferredIntensity ?? "medium"
    );
    for (const item of localPreferences.availableEquipment || []) {
      formData.append("availableEquipment", item);
    }
    for (const day of localPreferences.preferredDays || []) {
      formData.append("preferredDays", day);
    }
    fetcher.submit(formData, { method: "post", action: "/settings" });
  };
  const toggleEquipment = (id) => {
    setLocalPreferences((prev) => {
      const equipment = prev.availableEquipment || [];
      if (equipment.includes(id)) {
        return {
          ...prev,
          availableEquipment: equipment.filter((item) => item !== id)
        };
      }
      return {
        ...prev,
        availableEquipment: [...equipment, id]
      };
    });
  };
  const toggleDay = (day) => {
    setLocalPreferences((prev) => {
      const days = prev.preferredDays || [];
      if (days.includes(day)) {
        return {
          ...prev,
          preferredDays: days.filter((d) => d !== day)
        };
      }
      return {
        ...prev,
        preferredDays: [...days, day]
      };
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Fitness Goals" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Set your primary fitness goal and preferences" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Primary Goal" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: localPreferences.goal,
              onValueChange: (value) => setLocalPreferences({ ...localPreferences, goal: value }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select your primary fitness goal" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: WORKOUT_GOALS.map((goal) => /* @__PURE__ */ jsxs(SelectItem, { value: goal.id, children: [
                  goal.name,
                  " - ",
                  goal.description
                ] }, goal.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Preferred Workout Duration" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: (_a = localPreferences.preferredDuration) == null ? void 0 : _a.toString(),
              onValueChange: (value) => setLocalPreferences({
                ...localPreferences,
                preferredDuration: Number.parseInt(value)
              }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select preferred workout duration" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "10", children: "10 minutes" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "15", children: "15 minutes" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "20", children: "20 minutes" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "30", children: "30 minutes" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "45", children: "45 minutes" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "60", children: "60 minutes" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Preferred Intensity" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: localPreferences.preferredIntensity,
              onValueChange: (value) => setLocalPreferences({
                ...localPreferences,
                preferredIntensity: value
              }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select preferred intensity" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "low", children: "Low - For beginners or recovery days" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "medium", children: "Medium - Balanced intensity" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "high", children: "High - Maximum effort workouts" })
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Equipment & Schedule" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Tell us about your available equipment and preferred workout days" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Available Equipment" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Select the equipment you have access to for your workouts" }),
          /* @__PURE__ */ jsxs(Popover, { open: openEquipment, onOpenChange: setOpenEquipment, children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                "aria-expanded": openEquipment,
                className: "w-full justify-between",
                children: [
                  (((_b = localPreferences.availableEquipment) == null ? void 0 : _b.length) || 0) > 0 ? `${(_c = localPreferences.availableEquipment) == null ? void 0 : _c.length} selected` : "Select equipment...",
                  /* @__PURE__ */ jsx(Dumbbell, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
              /* @__PURE__ */ jsx(CommandInput, { placeholder: "Search equipment..." }),
              /* @__PURE__ */ jsx(CommandEmpty, { children: "No equipment found." }),
              /* @__PURE__ */ jsx(CommandList, { children: /* @__PURE__ */ jsx(CommandGroup, { children: EQUIPMENT.map((item) => /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => toggleEquipment(item.id), children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      (localPreferences.availableEquipment || []).includes(item.id) ? "bg-primary text-primary-foreground" : "opacity-50"
                    ),
                    children: (localPreferences.availableEquipment || []).includes(item.id) && /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" })
                  }
                ),
                item.name
              ] }, item.id)) }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2 flex flex-wrap gap-1", children: (localPreferences.availableEquipment || []).map((id) => {
            const equipment = EQUIPMENT.find((e) => e.id === id);
            return equipment ? /* @__PURE__ */ jsxs(
              "div",
              {
                className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                children: [
                  equipment.name,
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      className: "ml-1 rounded-full outline-none",
                      onClick: () => toggleEquipment(id),
                      type: "button",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" }),
                        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "×" })
                      ]
                    }
                  )
                ]
              },
              id
            ) : null;
          }) })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Preferred Workout Days" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Select the days you prefer to workout" }),
          /* @__PURE__ */ jsxs(Popover, { open: openDays, onOpenChange: setOpenDays, children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                "aria-expanded": openDays,
                className: "w-full justify-between",
                children: [
                  (((_d = localPreferences.preferredDays) == null ? void 0 : _d.length) || 0) > 0 ? `${(_e = localPreferences.preferredDays) == null ? void 0 : _e.length} days selected` : "Select days...",
                  /* @__PURE__ */ jsx(Dumbbell, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsx(Command, { children: /* @__PURE__ */ jsx(CommandList, { children: /* @__PURE__ */ jsx(CommandGroup, { children: DAYS_OF_WEEK.map((day) => /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => toggleDay(day), children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    (localPreferences.preferredDays || []).includes(day) ? "bg-primary text-primary-foreground" : "opacity-50"
                  ),
                  children: (localPreferences.preferredDays || []).includes(day) && /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" })
                }
              ),
              day
            ] }, day)) }) }) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2 flex flex-wrap gap-1", children: (localPreferences.preferredDays || []).map((day) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              children: [
                day,
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "ml-1 rounded-full outline-none",
                    onClick: () => toggleDay(day),
                    type: "button",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" }),
                      /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "×" })
                    ]
                  }
                )
              ]
            },
            day
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { onClick: handleSavePreferences, disabled: fetcher.state !== "idle", children: fetcher.state === "submitting" ? "Saving..." : "Save Preferences" }) })
    ] })
  ] });
}
function SettingsPage() {
  const { preferences } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Settings" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Customize your workout preferences and account settings." }),
    /* @__PURE__ */ jsx(PreferencesForm, { preferences })
  ] });
}
async function loader$1({
  request
}) {
  const userId = await requireUserId(request);
  const preferences = await prisma.userPreference.findUnique({
    where: {
      userId
    }
  });
  if (!preferences) {
    const created = await prisma.userPreference.create({
      data: {
        userId,
        goal: "general-fitness",
        preferredDuration: 30,
        preferredIntensity: "medium",
        availableEquipment: [],
        preferredDays: []
      }
    });
    const mapped2 = {
      userId,
      goal: created.goal,
      preferredDuration: created.preferredDuration,
      preferredIntensity: created.preferredIntensity,
      availableEquipment: created.availableEquipment,
      preferredDays: created.preferredDays
    };
    return {
      preferences: mapped2
    };
  }
  const mapped = {
    userId,
    goal: preferences.goal,
    preferredDuration: preferences.preferredDuration,
    preferredIntensity: preferences.preferredIntensity,
    availableEquipment: preferences.availableEquipment,
    preferredDays: preferences.preferredDays
  };
  return {
    preferences: mapped
  };
}
async function action$1({
  request
}) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const goal = String(formData.get("goal") ?? "general-fitness");
  const preferredDuration = Number(formData.get("preferredDuration") ?? 30);
  const preferredIntensity = String(formData.get("preferredIntensity") ?? "medium");
  const availableEquipment = formData.getAll("availableEquipment").map(String);
  const preferredDays = formData.getAll("preferredDays").map(String);
  await prisma.userPreference.upsert({
    where: {
      userId
    },
    update: {
      goal,
      preferredDuration,
      preferredIntensity,
      availableEquipment,
      preferredDays
    },
    create: {
      userId,
      goal,
      preferredDuration,
      preferredIntensity,
      availableEquipment,
      preferredDays
    }
  });
  return Response.json({
    ok: true
  });
}
const settings = UNSAFE_withComponentProps(SettingsPage);
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: settings,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  request
}) {
  return destroyUserSession(request);
}
async function action({
  request
}) {
  return destroyUserSession(request);
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BDvI8onZ.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/index-CG2tBcAL.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Cs1PczB1.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/index-CG2tBcAL.js", "/assets/index-8V5sW5dS.js", "/assets/use-session-CAfctDMA.js", "/assets/button-2kN9vI-c.js", "/assets/dumbbell-MKOk05DG.js", "/assets/createLucideIcon-ZHaiEafU.js", "/assets/avatar-X4ELhkyb.js", "/assets/index-BbagpMBJ.js", "/assets/react-icons.esm-CuUG2HrL.js", "/assets/index-7D1CkNbU.js", "/assets/index-Cyv6LhMU.js", "/assets/index-D_7rmV-C.js", "/assets/x-BR7bTkbL.js", "/assets/message-square-ClUYAYvQ.js", "/assets/calendar-CK0swYr5.js", "/assets/video-io9FFjZ7.js"], "css": ["/assets/root-6GTKZYf8.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-BRewo-Hp.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/button-2kN9vI-c.js", "/assets/arrow-right-Dpl26Lxc.js", "/assets/message-square-ClUYAYvQ.js", "/assets/createLucideIcon-ZHaiEafU.js", "/assets/calendar-CK0swYr5.js", "/assets/dumbbell-MKOk05DG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-CfxKbxRa.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/social-auth-buttons-DWQH4F-a.js", "/assets/button-2kN9vI-c.js", "/assets/input-frNUzdEI.js", "/assets/createLucideIcon-ZHaiEafU.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/register": { "id": "routes/register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/register-C0GaQExw.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/social-auth-buttons-DWQH4F-a.js", "/assets/button-2kN9vI-c.js", "/assets/input-frNUzdEI.js", "/assets/createLucideIcon-ZHaiEafU.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth.$provider": { "id": "routes/auth.$provider", "parentId": "root", "path": "auth/:provider", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/auth._provider-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth.callback.$provider": { "id": "routes/auth.callback.$provider", "parentId": "root", "path": "auth/callback/:provider", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/auth.callback._provider-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-B-ObkB5g.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/card-D_zTbTWx.js", "/assets/button-2kN9vI-c.js", "/assets/badge-CcneRe4A.js", "/assets/calendar-CK0swYr5.js", "/assets/format-_s3r-PTC.js", "/assets/video-io9FFjZ7.js", "/assets/clock-BlPiYlHH.js", "/assets/arrow-right-Dpl26Lxc.js", "/assets/use-session-CAfctDMA.js", "/assets/message-square-ClUYAYvQ.js", "/assets/flame-CLnHOq0y.js", "/assets/createLucideIcon-ZHaiEafU.js", "/assets/dumbbell-MKOk05DG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/chat": { "id": "routes/chat", "parentId": "root", "path": "chat", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/chat-C2AdiYAe.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/avatar-X4ELhkyb.js", "/assets/button-2kN9vI-c.js", "/assets/card-D_zTbTWx.js", "/assets/textarea-DbplKXTV.js", "/assets/constants-S6oLSfrn.js", "/assets/use-session-CAfctDMA.js", "/assets/index-8V5sW5dS.js", "/assets/createLucideIcon-ZHaiEafU.js", "/assets/dumbbell-MKOk05DG.js", "/assets/index-CG2tBcAL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/calendar": { "id": "routes/calendar", "parentId": "root", "path": "calendar", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/calendar-5v9TuTFt.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/button-2kN9vI-c.js", "/assets/card-D_zTbTWx.js", "/assets/format-_s3r-PTC.js", "/assets/createLucideIcon-ZHaiEafU.js", "/assets/arrow-right-Dpl26Lxc.js", "/assets/check-BMig6kXl.js", "/assets/plus-BYTYPCK7.js", "/assets/video-io9FFjZ7.js", "/assets/clock-BlPiYlHH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/videos": { "id": "routes/videos", "parentId": "root", "path": "videos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/videos-wo-blade.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/avatar-X4ELhkyb.js", "/assets/badge-CcneRe4A.js", "/assets/button-2kN9vI-c.js", "/assets/card-D_zTbTWx.js", "/assets/index-8V5sW5dS.js", "/assets/createLucideIcon-ZHaiEafU.js", "/assets/clock-BlPiYlHH.js", "/assets/dumbbell-MKOk05DG.js", "/assets/plus-BYTYPCK7.js", "/assets/input-frNUzdEI.js", "/assets/index-D_7rmV-C.js", "/assets/index-BbagpMBJ.js", "/assets/index-D_Dh5jkw.js", "/assets/constants-S6oLSfrn.js", "/assets/x-BR7bTkbL.js", "/assets/index-CG2tBcAL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/videos.$id": { "id": "routes/videos.$id", "parentId": "root", "path": "videos/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/videos._id-BRNKJytG.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/button-2kN9vI-c.js", "/assets/avatar-X4ELhkyb.js", "/assets/badge-CcneRe4A.js", "/assets/card-D_zTbTWx.js", "/assets/index-CG2tBcAL.js", "/assets/index-BbagpMBJ.js", "/assets/index-Cyv6LhMU.js", "/assets/index-7D1CkNbU.js", "/assets/index-8V5sW5dS.js", "/assets/clock-BlPiYlHH.js", "/assets/flame-CLnHOq0y.js", "/assets/createLucideIcon-ZHaiEafU.js", "/assets/dumbbell-MKOk05DG.js", "/assets/calendar-CK0swYr5.js", "/assets/plus-BYTYPCK7.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile": { "id": "routes/profile", "parentId": "root", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-Cd67O8dL.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/avatar-X4ELhkyb.js", "/assets/button-2kN9vI-c.js", "/assets/card-D_zTbTWx.js", "/assets/input-frNUzdEI.js", "/assets/index-CG2tBcAL.js", "/assets/separator-ChsJKev0.js", "/assets/textarea-DbplKXTV.js", "/assets/index-8V5sW5dS.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "root", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-BfECFOAc.js", "imports": ["/assets/chunk-EPOLDU6W-S4mOtG1C.js", "/assets/button-2kN9vI-c.js", "/assets/card-D_zTbTWx.js", "/assets/react-icons.esm-CuUG2HrL.js", "/assets/index-BbagpMBJ.js", "/assets/index-7D1CkNbU.js", "/assets/index-CG2tBcAL.js", "/assets/index-D_7rmV-C.js", "/assets/index-8V5sW5dS.js", "/assets/index-D_Dh5jkw.js", "/assets/separator-ChsJKev0.js", "/assets/constants-S6oLSfrn.js", "/assets/dumbbell-MKOk05DG.js", "/assets/check-BMig6kXl.js", "/assets/createLucideIcon-ZHaiEafU.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-7d8ef4bd.js", "version": "7d8ef4bd", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/auth.$provider": {
    id: "routes/auth.$provider",
    parentId: "root",
    path: "auth/:provider",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/auth.callback.$provider": {
    id: "routes/auth.callback.$provider",
    parentId: "root",
    path: "auth/callback/:provider",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/chat": {
    id: "routes/chat",
    parentId: "root",
    path: "chat",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/calendar": {
    id: "routes/calendar",
    parentId: "root",
    path: "calendar",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/videos": {
    id: "routes/videos",
    parentId: "root",
    path: "videos",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/videos.$id": {
    id: "routes/videos.$id",
    parentId: "root",
    path: "videos/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
