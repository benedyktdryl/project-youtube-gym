import { useState, useEffect } from 'react';
import { Check as CheckIcon, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  EQUIPMENT,
  DAYS_OF_WEEK,
  WORKOUT_GOALS
} from '@/lib/constants';
import { UserPreferences } from '@/lib/types';
import { useUserPreferences } from '@/lib/hooks/use-user-preferences';

export function PreferencesForm() {
  const { preferences: userPrefs, loading, updatePreferences } = useUserPreferences();
  const [localPreferences, setLocalPreferences] = useState<Partial<UserPreferences>>({
    goal: 'general-fitness',
    preferredDuration: 30,
    preferredIntensity: 'medium',
    availableEquipment: [],
    preferredDays: [],
  });
  const [openEquipment, setOpenEquipment] = useState(false);
  const [openDays, setOpenDays] = useState(false);

  useEffect(() => {
    if (userPrefs) {
      setLocalPreferences({
        goal: userPrefs.goal,
        preferredDuration: userPrefs.preferredDuration,
        preferredIntensity: userPrefs.preferredIntensity,
        availableEquipment: userPrefs.availableEquipment,
        preferredDays: userPrefs.preferredDays,
      });
    }
  }, [userPrefs]);

  const handleSavePreferences = async () => {
    await updatePreferences(localPreferences);
  };

  const toggleEquipment = (id: string) => {
    setLocalPreferences((prev) => {
      const equipment = prev.availableEquipment || [];
      if (equipment.includes(id)) {
        return {
          ...prev,
          availableEquipment: equipment.filter((item) => item !== id),
        };
      } else {
        return {
          ...prev,
          availableEquipment: [...equipment, id],
        };
      }
    });
  };

  const toggleDay = (day: string) => {
    setLocalPreferences((prev) => {
      const days = prev.preferredDays || [];
      if (days.includes(day)) {
        return {
          ...prev,
          preferredDays: days.filter((d) => d !== day),
        };
      } else {
        return {
          ...prev,
          preferredDays: [...days, day],
        };
      }
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Loading preferences...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fitness Goals</CardTitle>
          <CardDescription>
            Set your primary fitness goal and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Goal</label>
            <Select
              value={localPreferences.goal}
              onValueChange={(value) => setLocalPreferences({ ...localPreferences, goal: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your primary fitness goal" />
              </SelectTrigger>
              <SelectContent>
                {WORKOUT_GOALS.map((goal) => (
                  <SelectItem key={goal.id} value={goal.id}>
                    {goal.name} - {goal.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Workout Duration</label>
            <Select
              value={localPreferences.preferredDuration?.toString()}
              onValueChange={(value) => setLocalPreferences({ ...localPreferences, preferredDuration: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred workout duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Intensity</label>
            <Select
              value={localPreferences.preferredIntensity}
              onValueChange={(value) => setLocalPreferences({
                ...localPreferences,
                preferredIntensity: value as 'low' | 'medium' | 'high'
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - For beginners or recovery days</SelectItem>
                <SelectItem value="medium">Medium - Balanced intensity</SelectItem>
                <SelectItem value="high">High - Maximum effort workouts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Equipment & Schedule</CardTitle>
          <CardDescription>
            Tell us about your available equipment and preferred workout days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Available Equipment</label>
            <p className="text-sm text-muted-foreground mb-2">
              Select the equipment you have access to for your workouts
            </p>

            <Popover open={openEquipment} onOpenChange={setOpenEquipment}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openEquipment}
                  className="w-full justify-between"
                >
                  {(localPreferences.availableEquipment?.length || 0) > 0
                    ? `${localPreferences.availableEquipment?.length} selected`
                    : "Select equipment..."}
                  <Dumbbell className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search equipment..." />
                  <CommandEmpty>No equipment found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {EQUIPMENT.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => toggleEquipment(item.id)}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              (localPreferences.availableEquipment || []).includes(item.id)
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50"
                            )}
                          >
                            {(localPreferences.availableEquipment || []).includes(item.id) && (
                              <CheckIcon className="h-3 w-3" />
                            )}
                          </div>
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="pt-2 flex flex-wrap gap-1">
              {(localPreferences.availableEquipment || []).map((id) => {
                const equipment = EQUIPMENT.find((e) => e.id === id);
                return equipment ? (
                  <div
                    key={id}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                  >
                    {equipment.name}
                    <button
                      className="ml-1 rounded-full outline-none"
                      onClick={() => toggleEquipment(id)}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Workout Days</label>
            <p className="text-sm text-muted-foreground mb-2">
              Select the days you prefer to workout
            </p>

            <Popover open={openDays} onOpenChange={setOpenDays}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDays}
                  className="w-full justify-between"
                >
                  {(localPreferences.preferredDays?.length || 0) > 0
                    ? `${localPreferences.preferredDays?.length} days selected`
                    : "Select days..."}
                  <Dumbbell className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {DAYS_OF_WEEK.map((day) => (
                        <CommandItem
                          key={day}
                          onSelect={() => toggleDay(day)}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              (localPreferences.preferredDays || []).includes(day)
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50"
                            )}
                          >
                            {(localPreferences.preferredDays || []).includes(day) && (
                              <CheckIcon className="h-3 w-3" />
                            )}
                          </div>
                          {day}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="pt-2 flex flex-wrap gap-1">
              {(localPreferences.preferredDays || []).map((day) => (
                <div
                  key={day}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                >
                  {day}
                  <button
                    className="ml-1 rounded-full outline-none"
                    onClick={() => toggleDay(day)}
                  >
                    <span className="sr-only">Remove</span>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSavePreferences}>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
