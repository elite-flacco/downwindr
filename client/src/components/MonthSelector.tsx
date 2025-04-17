import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MonthNames } from "@shared/schema";
import { motion } from "framer-motion";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export default function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-3 font-heading text-ocean-dark flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Select Your Kitesurfing Season:
      </h3>
      <div className="month-selector flex space-x-2 overflow-x-auto py-4 px-3">
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
                className={`month-button min-w-[100px] font-medium px-5 py-3 ${isSelected ? 'active' : 'text-white hover:text-white'}`}
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
