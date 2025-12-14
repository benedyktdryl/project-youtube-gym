import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

type UserProfileProps = {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
};

export function UserProfile({ user }: UserProfileProps) {
  const fetcher = useFetcher();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState('');

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (fetcher.state === 'idle') {
      if (fetcher.data?.ok) {
        toast.success('Profile updated successfully');
      }
      if (fetcher.data?.error) {
        toast.error(fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    fetcher.submit(formData, { method: 'post', action: '/profile' });
  };

  const isSubmitting = fetcher.state !== 'idle';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
              <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full" type="button">
              Change Picture
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <fetcher.Form method="post" onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself and your fitness goals"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => toast.info('Changes discarded')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </fetcher.Form>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account settings and preferences</CardDescription>
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
                <input type="checkbox" id="notify-workouts" className="h-4 w-4" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notify-reminders" className="flex-1">
                  Workout reminders
                  <p className="text-sm text-muted-foreground">
                    Get reminders for your scheduled workouts
                  </p>
                </Label>
                <input type="checkbox" id="notify-reminders" className="h-4 w-4" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notify-features" className="flex-1">
                  New features and updates
                  <p className="text-sm text-muted-foreground">
                    Stay informed about new features and platform updates
                  </p>
                </Label>
                <input type="checkbox" id="notify-features" className="h-4 w-4" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
