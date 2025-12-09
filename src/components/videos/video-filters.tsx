import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { EQUIPMENT, MUSCLE_GROUPS } from '@/lib/constants';

interface VideoFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    muscleGroups: string[];
    equipment: string[];
    intensity: string[];
    duration: [number, number];
  }) => void;
}

export function VideoFilters({ onFiltersChange }: VideoFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([]);
  const [duration, setDuration] = useState<[number, number]>([0, 60]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, selectedMuscleGroups, selectedEquipment, selectedIntensity, duration);
  };

  const toggleMuscleGroup = (id: string) => {
    const updated = selectedMuscleGroups.includes(id)
      ? selectedMuscleGroups.filter((item) => item !== id)
      : [...selectedMuscleGroups, id];
    
    setSelectedMuscleGroups(updated);
    applyFilters(search, updated, selectedEquipment, selectedIntensity, duration);
  };

  const toggleEquipment = (id: string) => {
    const updated = selectedEquipment.includes(id)
      ? selectedEquipment.filter((item) => item !== id)
      : [...selectedEquipment, id];
    
    setSelectedEquipment(updated);
    applyFilters(search, selectedMuscleGroups, updated, selectedIntensity, duration);
  };

  const toggleIntensity = (id: string) => {
    const updated = selectedIntensity.includes(id)
      ? selectedIntensity.filter((item) => item !== id)
      : [...selectedIntensity, id];
    
    setSelectedIntensity(updated);
    applyFilters(search, selectedMuscleGroups, selectedEquipment, updated, duration);
  };

  const handleDurationChange = (value: number[]) => {
    const newDuration: [number, number] = [value[0], value[1]];
    setDuration(newDuration);
    applyFilters(search, selectedMuscleGroups, selectedEquipment, selectedIntensity, newDuration);
  };

  const applyFilters = (
    search: string,
    muscleGroups: string[],
    equipment: string[],
    intensity: string[],
    duration: [number, number]
  ) => {
    onFiltersChange({
      search,
      muscleGroups,
      equipment,
      intensity,
      duration,
    });
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedMuscleGroups([]);
    setSelectedEquipment([]);
    setSelectedIntensity([]);
    setDuration([0, 60]);
    applyFilters('', [], [], [], [0, 60]);
  };

  const hasActiveFilters = 
    selectedMuscleGroups.length > 0 || 
    selectedEquipment.length > 0 || 
    selectedIntensity.length > 0 || 
    duration[0] > 0 || 
    duration[1] < 60;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search workouts..."
            value={search}
            onChange={handleSearchChange}
            className="w-full"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => {
                setSearch('');
                applyFilters('', selectedMuscleGroups, selectedEquipment, selectedIntensity, duration);
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filtersVisible ? "default" : "outline"}
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="whitespace-nowrap"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge className="ml-2 px-1 py-0 h-5 bg-primary/20 text-primary-foreground">
                {selectedMuscleGroups.length + selectedEquipment.length + selectedIntensity.length +
                  (duration[0] > 0 || duration[1] < 60 ? 1 : 0)}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="whitespace-nowrap"
            >
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      {filtersVisible && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md bg-card">
          {/* Muscle Groups Filter */}
          <div>
            <h3 className="font-medium mb-2">Muscle Groups</h3>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GROUPS.map((group) => (
                <Badge 
                  key={group.id}
                  variant={selectedMuscleGroups.includes(group.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleMuscleGroup(group.id)}
                >
                  {group.name}
                  {selectedMuscleGroups.includes(group.id) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Equipment Filter */}
          <div>
            <h3 className="font-medium mb-2">Equipment</h3>
            <div className="flex flex-wrap gap-2">
              {EQUIPMENT.map((item) => (
                <Badge 
                  key={item.id}
                  variant={selectedEquipment.includes(item.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleEquipment(item.id)}
                >
                  {item.name}
                  {selectedEquipment.includes(item.id) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Intensity Filter */}
          <div>
            <h3 className="font-medium mb-2">Intensity</h3>
            <div className="flex flex-wrap gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <Badge 
                  key={level}
                  variant={selectedIntensity.includes(level) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    level === 'high' 
                      ? 'hover:bg-red-100 hover:text-red-700' 
                      : level === 'medium' 
                        ? 'hover:bg-orange-100 hover:text-orange-700' 
                        : 'hover:bg-green-100 hover:text-green-700'
                  }`}
                  onClick={() => toggleIntensity(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  {selectedIntensity.includes(level) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Duration Filter */}
          <div>
            <h3 className="font-medium mb-2">Duration (minutes)</h3>
            <div className="px-2">
              <Slider
                min={0}
                max={60}
                step={5}
                value={[duration[0], duration[1]]}
                onValueChange={handleDurationChange}
                className="mb-6"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{duration[0]} min</span>
                <span>{duration[1]} min</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}