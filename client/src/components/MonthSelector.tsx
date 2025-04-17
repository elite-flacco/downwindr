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
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3 font-heading">Select Month for Best Conditions:</h3>
        <div className="month-selector flex space-x-2 overflow-x-auto pb-2">
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
                  variant={isSelected ? "default" : "outline"}
                  className={`min-w-[100px] ${isSelected ? 'bg-primary text-white' : 'bg-neutral-light text-neutral-dark'}`}
                  onClick={() => onMonthChange(monthNumber)}
                >
                  {monthName}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
