import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkoutVideo } from '@/lib/types';
import { Calendar, Clock, Dumbbell, ExternalLink as External, Share2, ThumbsUp, Flame, ChartBar as BarChart3, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface VideoPlayerProps {
  video: WorkoutVideo;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  
  // Simulate YouTube player events
  useEffect(() => {
    let interval: number | null = null;
    
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
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, video.duration]);
  
  // Update progress bar
  useEffect(() => {
    setProgressPercent((currentTime / video.duration) * 100);
  }, [currentTime, video.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentExercise = () => {
    return video.exercises.find(
      (ex) => currentTime >= ex.startTime && currentTime <= ex.endTime
    );
  };

  const handleAddToCalendar = () => {
    toast.success("Added to your calendar");
  };

  const handleShare = () => {
    toast.success("Workout link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&modestbranding=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-2/3 space-y-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={video.channelThumbnail} alt={video.channelName} />
                  <AvatarFallback>{video.channelName[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{video.channelName}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{Math.floor(video.duration / 60)} minutes</span>
              </div>
              <Badge 
                variant="outline" 
                className={
                  video.intensity === 'high' 
                    ? 'border-red-200 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300' 
                    : video.intensity === 'medium' 
                      ? 'border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300' 
                      : 'border-green-200 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                }
              >
                <Flame className="h-3 w-3 mr-1" />
                {video.intensity} intensity
              </Badge>
            </div>
          </div>
          
          <Tabs defaultValue="exercises">
            <TabsList className="mb-4">
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="exercises" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Exercise Timeline</CardTitle>
                  <CardDescription>
                    Follow along with the exercises in this workout
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="w-full bg-muted rounded-full h-2 relative">
                    <Progress value={progressPercent} className="h-2" />
                    {video.exercises.map((exercise) => {
                      const startPercent = (exercise.startTime / video.duration) * 100;
                      const widthPercent = ((exercise.endTime - exercise.startTime) / video.duration) * 100;
                      const isActive = currentTime >= exercise.startTime && currentTime <= exercise.endTime;
                      
                      return (
                        <div 
                          key={exercise.name + exercise.startTime}
                          className={`absolute h-3 -top-0.5 rounded-full transition-colors ${
                            isActive ? 'bg-primary' : 'bg-primary/30'
                          }`}
                          style={{ 
                            left: `${startPercent}%`, 
                            width: `${widthPercent}%`,
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  <div className="text-sm flex justify-between">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(video.duration)}</span>
                  </div>
                  
                  {getCurrentExercise() && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">
                          Current: {getCurrentExercise()?.name}
                        </h3>
                        <Badge variant="outline">
                          {getCurrentExercise()?.muscleGroup}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {formatTime(getCurrentExercise()?.startTime || 0)} - {formatTime(getCurrentExercise()?.endTime || 0)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {getCurrentExercise()?.difficulty}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {video.exercises.map((exercise, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border ${
                          currentTime >= exercise.startTime && currentTime <= exercise.endTime
                            ? 'bg-primary/5 border-primary/30'
                            : 'bg-card'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{exercise.name}</h4>
                          <span className="text-sm">
                            {formatTime(exercise.startTime)} - {formatTime(exercise.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
                          <span>{exercise.muscleGroup}</span>
                          <Badge variant="outline" className="text-xs">
                            {exercise.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Workout Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="font-medium">Difficulty:</span>
                        <span className="ml-2">
                          {video.intensity === 'high' 
                            ? 'Advanced' 
                            : video.intensity === 'medium' 
                              ? 'Intermediate' 
                              : 'Beginner'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2">{Math.floor(video.duration / 60)} minutes</span>
                      </div>
                      <div className="flex items-start">
                        <Dumbbell className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="font-medium">Equipment needed:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {video.equipmentNeeded.length > 0 ? (
                              video.equipmentNeeded.map((eq) => (
                                <Badge key={eq} variant="outline">
                                  {eq}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                No equipment needed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start">
                        <Flame className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="font-medium">Muscle groups:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {video.muscleGroups.map((group) => (
                              <Badge key={group} variant="secondary">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="font-medium">Recommended for:</span>
                        <span className="ml-2">
                          {video.intensity === 'high' 
                            ? 'Building strength and endurance' 
                            : video.intensity === 'medium' 
                              ? 'Toning and conditioning' 
                              : 'Recovery and mobility'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleAddToCalendar}>
                <Calendar className="h-4 w-4 mr-2" />
                Add to calendar
              </Button>
              <Button variant="outline" className="w-full" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share workout
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a 
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <External className="h-4 w-4 mr-2" />
                  Open on YouTube
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Similar Workouts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {video.muscleGroups.includes('abs') && (
                <div className="flex items-start gap-3">
                  <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src="https://i.ytimg.com/vi/AnYl6Nk9GOA/maxresdefault.jpg"
                      alt="Abs workout"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2">15 Min Abs Workout - No Equipment</h4>
                    <p className="text-xs text-muted-foreground">Chloe Ting • 15 min</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {video.muscleGroups.includes('full-body') && (
                <div className="flex items-start gap-3">
                  <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src="https://i.ytimg.com/vi/ml6cT4AZdqI/maxresdefault.jpg"
                      alt="Full body workout"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2">30 Min Full Body HIIT Workout</h4>
                    <p className="text-xs text-muted-foreground">MadFit • 30 min</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {video.muscleGroups.includes('quads') && (
                <div className="flex items-start gap-3">
                  <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src="https://i.ytimg.com/vi/X0r-OOKb-qw/maxresdefault.jpg"
                      alt="Leg workout"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2">30 Min Lower Body Workout</h4>
                    <p className="text-xs text-muted-foreground">MadFit • 30 min</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}