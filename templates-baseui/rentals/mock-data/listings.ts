export type PropertyType =
  | "apartment"
  | "house"
  | "villa"
  | "studio"
  | "loft"
  | "cottage";

export type Listing = {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  pricePerNight: number;
  propertyType: PropertyType;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  guests: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
  };
  isFavorite: boolean;
  isNew: boolean;
  instantBook: boolean;
};

const propertyTypes: PropertyType[] = [
  "apartment",
  "house",
  "villa",
  "studio",
  "loft",
  "cottage",
];

const amenitiesList = [
  "WiFi",
  "Kitchen",
  "Washer",
  "Dryer",
  "Air conditioning",
  "Heating",
  "TV",
  "Parking",
  "Pool",
  "Hot tub",
  "Gym",
  "Fireplace",
  "Balcony",
  "Garden",
  "Beach access",
  "Pet friendly",
];

const cities = [
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.006 },
  { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393 },
  { name: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378 },
  { name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194 },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
  { name: "Miami", country: "USA", lat: 25.7617, lng: -80.1918 },
  { name: "Seattle", country: "USA", lat: 47.6062, lng: -122.3321 },
  { name: "Montreal", country: "Canada", lat: 45.5017, lng: -73.5673 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { name: "Yaoundé", country: "Cameroon", lat: 3.848, lng: 11.5021 },
  { name: "Douala", country: "Cameroon", lat: 4.0511, lng: 9.7679 },
  { name: "Buea", country: "Cameroon", lat: 4.1529, lng: 9.2417 },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
  { name: "Abuja", country: "Nigeria", lat: 9.0765, lng: 7.3986 },
  { name: "Accra", country: "Ghana", lat: 5.6037, lng: -0.187 },
  { name: "Dakar", country: "Senegal", lat: 14.7167, lng: -17.4677 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  {
    name: "Johannesburg",
    country: "South Africa",
    lat: -26.2041,
    lng: 28.0473,
  },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
  { name: "Marrakech", country: "Morocco", lat: 31.6295, lng: -7.9811 },
  { name: "Tunis", country: "Tunisia", lat: 36.8065, lng: 10.1815 },
  { name: "Abidjan", country: "Côte d'Ivoire", lat: 5.36, lng: -4.0083 },
  { name: "Kigali", country: "Rwanda", lat: -1.9441, lng: 30.0619 },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.145, lng: 38.7667 },
  { name: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lng: 39.2083 },
  { name: "Kampala", country: "Uganda", lat: 0.3476, lng: 32.5825 },
  { name: "Luanda", country: "Angola", lat: -8.8383, lng: 13.2344 },
  { name: "Kinshasa", country: "DRC", lat: -4.4419, lng: 15.2663 },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
  { name: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428 },
  { name: "Bogotá", country: "Colombia", lat: 4.711, lng: -74.0721 },
  { name: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693 },
  { name: "Quito", country: "Ecuador", lat: -0.1807, lng: -78.4678 },
  { name: "Caracas", country: "Venezuela", lat: 10.4806, lng: -66.9036 },
  { name: "Montevideo", country: "Uruguay", lat: -34.9011, lng: -56.1645 },
  { name: "La Paz", country: "Bolivia", lat: -16.5, lng: -68.15 },
  { name: "Asunción", country: "Paraguay", lat: -25.2637, lng: -57.5759 },
  { name: "Medellín", country: "Colombia", lat: 6.2476, lng: -75.5658 },
  { name: "Cartagena", country: "Colombia", lat: 10.391, lng: -75.4794 },
  { name: "Cusco", country: "Peru", lat: -13.5319, lng: -71.9675 },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.139, lng: 101.6869 },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },
  { name: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842 },
  { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297 },
  { name: "Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },
  { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
  { name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
  { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Taipei", country: "Taiwan", lat: 25.033, lng: 121.5654 },
  { name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", country: "India", lat: 28.6139, lng: 77.209 },
  { name: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946 },
  { name: "Kathmandu", country: "Nepal", lat: 27.7172, lng: 85.324 },
  { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612 },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125 },
  { name: "Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282 },
  { name: "Vientiane", country: "Laos", lat: 17.9757, lng: 102.6331 },
  { name: "Yangon", country: "Myanmar", lat: 16.8661, lng: 96.1951 },
];

const titles = [
  "Cozy Modern Apartment",
  "Luxury Downtown Loft",
  "Charming Historic House",
  "Beachfront Villa",
  "Stylish Studio in Center",
  "Spacious Family Home",
  "Elegant Penthouse",
  "Rustic Countryside Cottage",
  "Minimalist Urban Retreat",
  "Boutique City Apartment",
  "Seaside Paradise",
  "Mountain View Escape",
  "Artistic Loft Space",
  "Traditional Family Villa",
  "Contemporary Design Home",
  "Quaint Garden Cottage",
  "Luxury Skyline View",
  "Peaceful Garden House",
  "Modern Minimalist Flat",
  "Historic Character Home",
];

const descriptions = [
  "Beautifully designed space perfect for your stay",
  "Experience luxury and comfort in this stunning property",
  "A unique blend of modern amenities and classic charm",
  "Perfect location with easy access to all attractions",
  "Spacious and well-appointed for a memorable stay",
  "Stylish accommodation in the heart of the city",
  "Peaceful retreat with all the comforts of home",
  "Elegant property with attention to every detail",
  "Contemporary living space with premium finishes",
  "Charming accommodation in a prime location",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomPrice(): number {
  return Math.floor(Math.random() * 400) + 50;
}

function createListing(
  id: string,
  cityIndex: number,
  titleIndex: number
): Listing {
  const city = cities[cityIndex % cities.length];
  const propertyType = getRandomElement(propertyTypes);
  const bedrooms =
    propertyType === "studio" ? 0 : Math.floor(Math.random() * 4) + 1;
  const beds = bedrooms === 0 ? 1 : bedrooms + Math.floor(Math.random() * 2);
  const bathrooms = Math.max(1, bedrooms - Math.floor(Math.random() * 2));
  const guests = beds * 2;
  const pricePerNight = getRandomPrice();
  const rating = 4 + Math.random() * 1;
  const reviewCount = Math.floor(Math.random() * 200) + 10;
  const isSuperhost = Math.random() > 0.7;
  const hostName = `Host ${String.fromCharCode(
    65 + (id.charCodeAt(id.length - 1) % 26)
  )}`;

  const latOffset = (Math.random() - 0.5) * 0.1;
  const lngOffset = (Math.random() - 0.5) * 0.1;

  return {
    id,
    title: titles[titleIndex % titles.length],
    description: getRandomElement(descriptions),
    address: `${Math.floor(Math.random() * 200) + 1} Main Street`,
    city: city.name,
    country: city.country,
    coordinates: {
      lat: city.lat + latOffset,
      lng: city.lng + lngOffset,
    },
    pricePerNight,
    propertyType,
    bedrooms,
    beds,
    bathrooms,
    guests,
    rating,
    reviewCount,
    images: Array.from(
      { length: 5 },
      () =>
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"
    ),
    amenities: getRandomElements(
      amenitiesList,
      Math.floor(Math.random() * 8) + 4
    ),
    host: {
      name: hostName,
      avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${hostName}`,
      isSuperhost,
    },
    isFavorite: Math.random() > 0.8,
    isNew: Math.random() > 0.9,
    instantBook: Math.random() > 0.5,
  };
}

export const listings: Listing[] = Array.from({ length: 150 }, (_, i) => {
  const cityIndex = i % cities.length;
  return createListing(`listing-${i + 1}`, cityIndex, i);
});

export const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: "Apartment",
  house: "House",
  villa: "Villa",
  studio: "Studio",
  loft: "Loft",
  cottage: "Cottage",
};
