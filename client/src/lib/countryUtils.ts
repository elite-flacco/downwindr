
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
  "South Africa": "🇿🇦",
  // Add more countries as needed
};

export function getCountryFlag(country: string): string {
  return countryFlags[country] || "🏳️";
}
