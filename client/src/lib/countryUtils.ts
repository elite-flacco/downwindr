
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
