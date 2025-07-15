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
    <div className="flex items-center">
      <div className="mr-4 whitespace-nowrap">
        <Calendar className="w-4 h-4 inline mr-2 text-primary" />
        <span className="text-sm font-bold">Season:</span>
      </div>
      
      <Select
        value={selectedMonth.toString()}
        onValueChange={(value) => onMonthChange(parseInt(value))}
      >
        <SelectTrigger className="h-8 text-sm border-slate-200 min-w-[120px] py-2 px-4 focus:ring-primary/30 bg-white">
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
      
      {/* Quick navigation buttons for months */}
      <div className="ml-4 hidden md:flex items-center space-x-2">
        {[1, 4, 7, 10].map((month) => {
          const quarterName = month === 1 ? "Winter" : month === 4 ? "Spring" : month === 7 ? "Summer" : "Autumn";
          return (
            <Button
              key={month}
              variant="ghost"
              size="sm"
              className={`px-4 py-2 h-8 text-xs ${
                (selectedMonth >= month && selectedMonth < month + 3) || (month === 10 && (selectedMonth >= 10 || selectedMonth === 12))
                  ? 'bg-primary/10 text-theme-text'
                  : 'text-theme-text'
              }`}
              onClick={() => onMonthChange(month)}
            >
              {quarterName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
