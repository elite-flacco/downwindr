import { Button } from "@/components/ui/button";
import { MonthNames } from "@shared/schema";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export default function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3 font-heading text-slate-700 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-primary" />
        Select your kitesurfing season
      </h3>
      <div className="month-selector flex space-x-2 overflow-x-auto py-2 px-2">
        {MonthNames.map((monthName, index) => {
          const monthNumber = index + 1;
          const isSelected = selectedMonth === monthNumber;
          
          return (
            <motion.div
              key={monthNumber}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                className={`month-button min-w-[90px] font-medium px-4 py-2 ${
                  isSelected 
                    ? 'active' 
                    : 'text-slate-500 hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => onMonthChange(monthNumber)}
              >
                {monthName}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
