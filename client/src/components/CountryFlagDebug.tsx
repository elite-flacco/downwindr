import { useState } from "react";
import { getCountryFlag } from "@/lib/countryUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Create a component to debug country flags
export default function CountryFlagDebug() {
  const countries = [
    "Spain",
    "Portugal", 
    "Brazil",
    "Greece",
    "Morocco",
    "Egypt",
    "Cape Verde",
    "Dominican Republic",
    "Vietnam",
    "Philippines",
    "Thailand", 
    "Indonesia",
    "Australia",
    "United States",
    "Mexico",
    "Italy",
    "South Africa"
  ];

  return (
    <Card className="w-full max-w-md mx-auto my-4">
      <CardHeader>
        <CardTitle>Country Flag Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {countries.map(country => (
            <div key={country} className="flex items-center justify-between p-2 border-b">
              <span>{country}</span>
              <span className="text-lg">{getCountryFlag(country)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}