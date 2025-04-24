
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
  "New Zealand": "NZ"
};

/**
 * Converts a country name to a flag emoji
 * Using the 'Regional Indicator Symbol' Unicode characters
 */
export function getCountryFlag(country: string): string {
  if (!country) return "";
  
  // Get the country code
  const code = countryToCode[country];
  if (!code) return country; // If no code found, return the country name
  
  // Convert the country code to flag emoji
  // Each regional indicator symbol is 127397 code points after its corresponding ASCII letter
  const codePoints = [...code].map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
