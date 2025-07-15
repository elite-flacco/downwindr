import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MonthNames } from "@shared/schema";
import { Calendar, ChevronDown } from "lucide-react";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export default function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Calendar className="w-4 h-4 text-primary" />
      </div>
      
      <div className="flex items-center gap-2">
        <Select
          value={selectedMonth.toString()}
          onValueChange={(value) => onMonthChange(parseInt(value))}
        >
          <SelectTrigger className="h-8 text-sm border-slate-200 min-w-[120px] w-auto py-2 px-3 focus:ring-primary/30 bg-white">
            <SelectValue placeholder="Select month">
              {MonthNames[selectedMonth - 1]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {MonthNames.map((month, index) => (
              <SelectItem key={index + 1} value={(index + 1).toString()} className="text-sm py-2">
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Season Quick Buttons */}
        <div className="flex items-center gap-1">
          {[
            { season: "Spring", emoji: "🌸", months: [3, 4, 5] },
            { season: "Summer", emoji: "☀️", months: [6, 7, 8] },
            { season: "Autumn", emoji: "🍂", months: [9, 10, 11] },
            { season: "Winter", emoji: "❄️", months: [12, 1, 2] }
          ].map(({ season, emoji, months }) => {
            const isActive = months.includes(selectedMonth);
            return (
              <Button
                key={season}
                variant="outline"
                size="sm"
                className={`rounded-full transition-all ${
                  isActive ? 'bg-primary text-white' : ''
                }`}
                onClick={() => onMonthChange(months[0])}
                title={`${season} (${months.join(', ')})`}
              >
                <span className={`${isActive ? 'text-white' : 'text-slate-400'}`}>{emoji}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
