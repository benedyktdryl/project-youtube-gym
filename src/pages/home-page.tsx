import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Dumbbell,
  MessageSquare,
  MonitorPlay,
  MoveRight,
  Sparkles,
  Trophy
} from 'lucide-react';
import { MOCK_VIDEOS } from '@/lib/mock-data';

export function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                  Your Smart YouTube Workout Planner
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  TrainFlow creates personalized workout plans using YouTube videos based on your goals, available equipment, and schedule.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4">
                <Button asChild className="px-8 text-base">
                  <Link to="/register">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="px-8 text-base">
                  <Link to="/chat">
                    Try the AI Assistant
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -top-12 -left-12 z-0 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute -bottom-12 -right-12 z-0 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <img
                  src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Woman doing home workout"
                  className="relative z-10 rounded-xl object-cover aspect-[4/3] w-full sm:w-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything You Need for Your Workout Journey
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TrainFlow helps you create personalized workout plans with AI, manages your schedule, and keeps you motivated.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-2 bg-primary/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Assistant</h3>
              <p className="text-center text-muted-foreground">
                Chat with our AI to create personalized workout plans based on your goals and preferences.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-2 bg-primary/10 rounded-full">
                <MonitorPlay className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">YouTube Integration</h3>
              <p className="text-center text-muted-foreground">
                Access thousands of workout videos from top YouTube fitness creators all in one place.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Calendar</h3>
              <p className="text-center text-muted-foreground">
                Organize your workout schedule and sync with Google Calendar for easy tracking.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-2 bg-primary/10 rounded-full">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Personalized Plans</h3>
              <p className="text-center text-muted-foreground">
                Get workout recommendations based on your available equipment, fitness level, and goals.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-2 bg-primary/10 rounded-full">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Equipment Filters</h3>
              <p className="text-center text-muted-foreground">
                Find workouts that match exactly what you have available at home or in the gym.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card transition-all hover:shadow-md">
              <div className="p-2 bg-primary/10 rounded-full">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="text-center text-muted-foreground">
                Track your workout consistency and celebrate your fitness achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Workouts Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Popular Workouts
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover trending workout videos from top fitness creators on YouTube
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {MOCK_VIDEOS.slice(0, 3).map((video) => (
              <div key={video.id} className="group relative overflow-hidden rounded-lg bg-card">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="sm" className="rounded-full">
                      Watch Now
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src={video.channelThumbnail} 
                      alt={video.channelName} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm">{video.channelName}</span>
                  </div>
                  <h3 className="font-semibold line-clamp-2 mb-1">{video.title}</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <span>{Math.floor(video.duration / 60)} min</span>
                    <span className="mx-2">•</span>
                    <span>{video.intensity} intensity</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/videos">
                Browse all workouts <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                How TrainFlow Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our simple 3-step process to get you started with personalized workout plans
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16 mt-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Tell Us Your Goals</h3>
              <p className="text-center text-muted-foreground">
                Chat with our AI assistant about your fitness goals, available equipment, and schedule preferences.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Get Your Plan</h3>
              <p className="text-center text-muted-foreground">
                Receive a personalized workout plan with curated YouTube videos tailored to your specific needs.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Track Your Progress</h3>
              <p className="text-center text-muted-foreground">
                Follow your workout calendar, complete exercises, and track your fitness journey over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Loved by Fitness Enthusiasts
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our users have to say about their experience with TrainFlow
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col p-6 bg-background rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User avatar" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-muted-foreground">Fitness Beginner</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "TrainFlow made it so easy to find workouts I can do at home with minimal equipment. The AI suggestions are spot on and I love being able to plan my week in advance."
              </p>
            </div>
            <div className="flex flex-col p-6 bg-background rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User avatar" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">David M.</h4>
                  <p className="text-sm text-muted-foreground">Gym Enthusiast</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I've been following fitness YouTubers for years, but TrainFlow helps me organize all their content into a structured plan. Game changer for my workout consistency!"
              </p>
            </div>
            <div className="flex flex-col p-6 bg-background rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User avatar" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Emma K.</h4>
                  <p className="text-sm text-muted-foreground">Busy Professional</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As someone with a packed schedule, I love that TrainFlow helps me find shorter workouts that still target the right muscle groups. The calendar integration is perfect for my lifestyle."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Transform Your Workout Routine?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join TrainFlow today and start your journey to a more organized and effective fitness plan.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/register">
                  Start Free
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="text-base">
                <Link to="/chat">
                  Try the AI Assistant
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                FAQ
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about TrainFlow
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl divide-y divide-border mt-12">
            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>Is TrainFlow free to use?</span>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground">
                  TrainFlow offers a free plan with limited features. Premium plans start at $5.99/month with additional features like advanced AI recommendations, unlimited workout plans, and Google Calendar integration.
                </p>
              </details>
            </div>
            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>Do I need any special equipment?</span>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground">
                  Not at all! TrainFlow can recommend workouts based on whatever equipment you have available, including no-equipment options. Just tell our AI assistant what you have access to, and we'll find suitable workouts.
                </p>
              </details>
            </div>
            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>Can I integrate TrainFlow with my calendar?</span>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground">
                  Yes! TrainFlow seamlessly integrates with Google Calendar, allowing you to sync your workout schedule with your personal calendar for better planning and reminders.
                </p>
              </details>
            </div>
            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>How does the AI assistant work?</span>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground">
                  Our AI assistant analyzes your fitness goals, available equipment, schedule, and current physical condition to recommend the most suitable workout videos from YouTube. It can also adjust plans based on your feedback and progress.
                </p>
              </details>
            </div>
            <div className="py-4">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>Can I use TrainFlow on my mobile device?</span>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground">
                  Absolutely! TrainFlow is fully responsive and works great on all devices including smartphones, tablets, and desktop computers. We also offer mobile apps for iOS and Android for an enhanced experience.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}