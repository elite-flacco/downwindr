import * as countries from "i18n-iso-countries";
import flags from "country-flag-emoji-json";
import enLocale from "i18n-iso-countries/langs/en.json" assert { type: "json" };

// Initialize the countries library with English locale
countries.registerLocale(enLocale);

// Map countries to regions
const countryRegions: Record<string, string> = {
  // Europe
  'Spain': 'europe',
  'Greece': 'europe',
  'Italy': 'europe',
  'France': 'europe',
  'Portugal': 'europe',
  'Croatia': 'europe',

  // Asia
  'Philippines': 'asia',
  'Thailand': 'asia',
  'Vietnam': 'asia',
  'Indonesia': 'asia',
  'Sri Lanka': 'asia',

  // Americas
  'Brazil': 'americas',
  'Mexico': 'americas',
  'United States': 'americas',
  'USA': 'americas',
  'Dominican Republic': 'americas',
  'Aruba': 'americas',
  'Caribbean Netherlands': 'americas',

  // Africa
  'Egypt': 'africa',
  'Morocco': 'africa',
  'South Africa': 'africa',
  'Cape Verde': 'africa',
  'Tanzania': 'africa',
  'Mauritius': 'africa',

  // Oceania
  'Australia': 'oceania',
  'New Zealand': 'oceania',
  'Fiji': 'oceania',
};

// Map of country names to their ISO 3166-1 alpha-2 codes
const countryToCode: { [key: string]: string } = {
  "Spain": "ES",
  "Portugal": "PT",
  "Brazil": "BR",
  "Greece": "GR",
  "Morocco": "MA",
  "Egypt": "EG",
  "Cape Verde": "CV",
  "Dominican Republic": "DO",
  "Vietnam": "VN",
  "Philippines": "PH",
  "Thailand": "TH",
  "Indonesia": "ID",
  "Australia": "AU",
  "United States": "US",
  "USA": "US", // Alternative name for United States
  "Mexico": "MX",
  "Italy": "IT",
  "South Africa": "ZA",
  "France": "FR",
  "Germany": "DE",
  "United Kingdom": "GB",
  "Ireland": "IE",
  "China": "CN",
  "Japan": "JP",
  "India": "IN",
  "Canada": "CA",
  "New Zealand": "NZ",
  // Missing countries from spots data:
  "Aruba": "AW",
  "Caribbean Netherlands": "BQ",
  "Croatia": "HR",
  "Mauritius": "MU",
  "Sri Lanka": "LK",
  "Tanzania": "TZ"
};

// Type definition for the flag format we'll return
export type CountryFlag = {
  code: string;
  url: string;
};

/**
 * Returns a country flag object with code and image URL
 * @param country The country name
 * @returns A CountryFlag object or null if country not found
 */
export function getSpotRegion(country: string): string {
  return countryRegions[country] || 'other';
}

export function getCountryFlag(country: string): CountryFlag | null {
  if (!country) return null;

  const code = countryToCode[country];
  if (!code) return null;

  const lowerCode = code.toLowerCase();
  return {
    code: code,
    url: `https://flagcdn.com/w20/${lowerCode}.png`
  };
}