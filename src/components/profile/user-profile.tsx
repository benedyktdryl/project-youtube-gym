import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User } from '@/lib/types';
import { MOCK_USER } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  bio: z.string().optional(),
});

export function UserProfile() {
  const [user, setUser] = useState<User>(MOCK_USER);
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: '',
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    // Update user data (in a real app, this would be an API call)
    setUser({
      ...user,
      name: values.name,
      email: values.email,
    });
    
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Update your profile picture
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full">
              Change Picture
            </Button>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your account details
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Tell us a bit about yourself and your fitness goals"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Email Notifications</h3>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-workouts" className="flex-1">
                  New workout recommendations
                  <p className="text-sm text-muted-foreground">
                    Receive emails when we have new workout suggestions for you
                  </p>
                </Label>
                <input 
                  type="checkbox" 
                  id="notify-workouts" 
                  className="h-4 w-4"
                  defaultChecked
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-reminders" className="flex-1">
                  Workout reminders
                  <p className="text-sm text-muted-foreground">
                    Get reminders for your scheduled workouts
                  </p>
                </Label>
                <input 
                  type="checkbox" 
                  id="notify-reminders" 
                  className="h-4 w-4"
                  defaultChecked
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-features" className="flex-1">
                  New features and updates
                  <p className="text-sm text-muted-foreground">
                    Stay informed about new features and platform updates
                  </p>
                </Label>
                <input 
                  type="checkbox" 
                  id="notify-features" 
                  className="h-4 w-4"
                  defaultChecked
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Connected Accounts</h3>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    Sync your workout schedule with Google Calendar
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">YouTube Account</p>
                  <p className="text-sm text-muted-foreground">
                    Connect to access your saved playlists and subscriptions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-red-500">Danger Zone</h3>
            <Separator className="bg-red-200" />
            <div className="pt-2">
              <Button variant="destructive">
                Delete Account
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                This will permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}