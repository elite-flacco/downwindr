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
      <div className="mr-3 whitespace-nowrap">
        <Calendar className="w-3.5 h-3.5 inline mr-1 text-primary" />
        <span className="text-sm font-bold">Season:</span>
      </div>
      
      <Select
        value={selectedMonth.toString()}
        onValueChange={(value) => onMonthChange(parseInt(value))}
      >
        <SelectTrigger className="h-8 text-sm border-slate-200 min-w-[120px] py-1 px-3 focus:ring-primary/30 bg-white">
          <SelectValue placeholder="Select month">
            {MonthNames[selectedMonth - 1]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {MonthNames.map((month, index) => (
            <SelectItem key={index + 1} value={(index + 1).toString()} className="text-sm py-1.5">
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Quick navigation buttons for months */}
      <div className="ml-2 hidden md:flex items-center space-x-1">
        {[1, 4, 7, 10].map((month) => {
          const quarterName = month === 1 ? "Winter" : month === 4 ? "Spring" : month === 7 ? "Summer" : "Autumn";
          return (
            <Button
              key={month}
              variant="ghost"
              size="sm"
              className={`px-2 py-1 h-7 text-xs ${
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
