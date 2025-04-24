
// Map of country names to their flag emojis
const countryFlags: { [key: string]: string } = {
  "Spain": "🇪🇸",
  "Portugal": "🇵🇹",
  "Brazil": "🇧🇷",
  "Greece": "🇬🇷",
  "Morocco": "🇲🇦",
  "Egypt": "🇪🇬",
  "Cape Verde": "🇨🇻",
  "Dominican Republic": "🇩🇴",
  "Vietnam": "🇻🇳",
  "Philippines": "🇵🇭",
  "Thailand": "🇹🇭",
  "Indonesia": "🇮🇩",
  "Australia": "🇦🇺",
  "United States": "🇺🇸",
  "Mexico": "🇲🇽",
  "Italy": "🇮🇹",
  "South Africa": "🇿🇦",
  // Add other countries from the database
  "France": "🇫🇷",
  "Germany": "🇩🇪",
  "United Kingdom": "🇬🇧",
  "Ireland": "🇮🇪",
  "China": "🇨🇳",
  "Japan": "🇯🇵",
  "India": "🇮🇳",
  "Canada": "🇨🇦",
  "New Zealand": "🇳🇿"
};

// Function to get country flag emoji
export function getCountryFlag(country: string): string {
  // Check if country exists in our mapping
  if (country && countryFlags[country]) {
    return countryFlags[country];
  }
  // Default flag if country not found
  return "🏳️";
}
