export type LocationCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Location = {
  id: string;
  name: string;
  description: string;
  address: string;
  categoryId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  tags: string[];
  createdAt: string;
  isFavorite: boolean;
  visitCount: number;
  lastVisited?: string;
};

export const categories: LocationCategory[] = [
  { id: "restaurants", name: "Restaurants", icon: "utensils", color: "#ef4444" },
  { id: "cafes", name: "Cafés", icon: "coffee", color: "#f97316" },
  { id: "bars", name: "Bars", icon: "wine", color: "#8b5cf6" },
  { id: "parks", name: "Parks", icon: "trees", color: "#22c55e" },
  { id: "museums", name: "Museums", icon: "landmark", color: "#3b82f6" },
  { id: "shops", name: "Shopping", icon: "shopping-bag", color: "#ec4899" },
  { id: "hotels", name: "Hotels", icon: "bed", color: "#06b6d4" },
  { id: "gyms", name: "Fitness", icon: "dumbbell", color: "#eab308" },
];

export const tags = [
  { id: "family-friendly", name: "Family Friendly" },
  { id: "pet-friendly", name: "Pet Friendly" },
  { id: "outdoor", name: "Outdoor" },
  { id: "wifi", name: "Free WiFi" },
  { id: "parking", name: "Parking" },
  { id: "accessible", name: "Accessible" },
  { id: "romantic", name: "Romantic" },
  { id: "budget", name: "Budget Friendly" },
  { id: "luxury", name: "Luxury" },
  { id: "vegan", name: "Vegan Options" },
];

const allTags = tags.map(t => t.id);
const getRandomTags = () => {
  const count = Math.floor(Math.random() * 4) + 1;
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const createLocation = (
  id: string,
  name: string,
  description: string,
  address: string,
  categoryId: string,
  lat: number,
  lng: number,
  rating: number,
  isFavorite: boolean = false
): Location => ({
  id,
  name,
  description,
  address,
  categoryId,
  coordinates: { lat, lng },
  rating,
  tags: getRandomTags(),
  createdAt: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  isFavorite,
  visitCount: Math.floor(Math.random() * 100) + 1,
  lastVisited: Math.random() > 0.3 ? `2024-12-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}` : undefined,
});

export const locations: Location[] = [
  // ===== RESTAURANTS (67) =====
  // France (5)
  createLocation("rest-1", "Le Comptoir du Panthéon", "Charming Parisian bistro with classic French cuisine", "5 Rue Soufflot, 75005 Paris, France", "restaurants", 48.8462, 2.3464, 4.5, true),
  createLocation("rest-2", "Septime", "Michelin-starred neo-bistro", "80 Rue de Charonne, 75011 Paris, France", "restaurants", 48.8531, 2.3800, 4.8, true),
  createLocation("rest-3", "Paul Bocuse Restaurant", "Legendary 3-star Michelin restaurant", "40 Rue de la Plage, 69660 Collonges-au-Mont-d'Or, France", "restaurants", 45.8320, 4.8408, 4.9),
  createLocation("rest-4", "L'Ambroisie", "Three Michelin star French", "9 Place des Vosges, 75004 Paris, France", "restaurants", 48.8555, 2.3660, 4.9),
  createLocation("rest-5", "La Mère Brazier Lyon", "Historic Lyonnaise cuisine", "12 Rue Royale, 69001 Lyon, France", "restaurants", 45.7680, 4.8340, 4.7),
  // USA (8)
  createLocation("rest-6", "The French Laundry", "Three Michelin stars", "6640 Washington St, Yountville, CA 94599, USA", "restaurants", 38.4046, -122.3649, 4.9, true),
  createLocation("rest-7", "Eleven Madison Park", "Fine dining restaurant", "11 Madison Ave, New York, NY 10010, USA", "restaurants", 40.7417, -73.9872, 4.8),
  createLocation("rest-8", "Alinea Chicago", "Three Michelin stars", "1723 N Halsted St, Chicago, IL 60614, USA", "restaurants", 41.9132, -87.6482, 4.9),
  createLocation("rest-9", "Nobu Malibu", "Japanese fine dining", "22706 Pacific Coast Hwy, Malibu, CA 90265, USA", "restaurants", 34.0382, -118.6793, 4.6),
  createLocation("rest-10", "Per Se NYC", "Thomas Keller's NYC outpost", "10 Columbus Circle, New York, NY 10019, USA", "restaurants", 40.7685, -73.9830, 4.8),
  createLocation("rest-11", "Commander's Palace", "New Orleans institution", "1403 Washington Ave, New Orleans, LA 70130, USA", "restaurants", 29.9290, -90.0890, 4.6),
  createLocation("rest-12", "Chez Panisse", "Farm-to-table pioneer", "1517 Shattuck Ave, Berkeley, CA 94709, USA", "restaurants", 37.8795, -122.2690, 4.7),
  createLocation("rest-13", "Le Bernardin", "Seafood temple in NYC", "155 W 51st St, New York, NY 10019, USA", "restaurants", 40.7615, -73.9820, 4.9),
  // Canada (6)
  createLocation("rest-14", "Toqué! Montreal", "Quebec's finest restaurant", "900 Place Jean-Paul-Riopelle, Montreal, QC, Canada", "restaurants", 45.5048, -73.5605, 4.8),
  createLocation("rest-15", "Alo Toronto", "French tasting menu excellence", "163 Spadina Ave, Toronto, ON, Canada", "restaurants", 43.6490, -79.3960, 4.8),
  createLocation("rest-16", "Hawksworth Vancouver", "Contemporary Canadian cuisine", "801 W Georgia St, Vancouver, BC, Canada", "restaurants", 49.2830, -123.1200, 4.7),
  createLocation("rest-17", "Canoe Toronto", "Canadian fine dining with skyline views", "66 Wellington St W, Toronto, ON, Canada", "restaurants", 43.6475, -79.3810, 4.6),
  createLocation("rest-18", "Joe Beef Montreal", "Iconic Montreal steakhouse", "2491 Notre-Dame St W, Montreal, QC, Canada", "restaurants", 45.4790, -73.5850, 4.7),
  createLocation("rest-19", "Langdon Hall", "Country house cuisine", "1 Langdon Dr, Cambridge, ON, Canada", "restaurants", 43.4200, -80.3500, 4.8),
  // Japan (6)
  createLocation("rest-20", "Sukiyabashi Jiro", "Legendary sushi restaurant", "Ginza, Chuo City, Tokyo, Japan", "restaurants", 35.6719, 139.7642, 4.9),
  createLocation("rest-21", "Den Tokyo", "Two Michelin star innovative", "2 Chome-3-18 Jingumae, Shibuya, Tokyo, Japan", "restaurants", 35.6687, 139.7101, 4.8),
  createLocation("rest-22", "Narisawa Tokyo", "Innovative Japanese cuisine", "2-6-15 Minami-Aoyama, Tokyo, Japan", "restaurants", 35.6690, 139.7190, 4.8),
  createLocation("rest-23", "Kikunoi Kyoto", "Traditional kaiseki", "459 Shimokawaracho, Higashiyama, Kyoto, Japan", "restaurants", 34.9960, 135.7810, 4.8),
  createLocation("rest-24", "Kobe Beef Kaiseki 511", "Premium Kobe beef experience", "2-4-5 Shimoyamate-dori, Kobe, Japan", "restaurants", 34.6900, 135.1860, 4.7),
  createLocation("rest-25", "Ichiran Ramen", "Famous tonkotsu ramen chain", "1 Chome-22-7 Jinnan, Shibuya, Tokyo, Japan", "restaurants", 35.6619, 139.6992, 4.5),
  // Italy (4)
  createLocation("rest-26", "Osteria Francescana", "World's best restaurant", "Via Stella 22, Modena, Italy", "restaurants", 44.6471, 10.9252, 4.9),
  createLocation("rest-27", "Pizzeria Da Michele", "Legendary Naples pizza", "Via Cesare Sersale 1, Naples, Italy", "restaurants", 40.8500, 14.2640, 4.6),
  createLocation("rest-28", "La Pergola Rome", "Three Michelin stars", "Via Alberto Cadlolo 101, Rome, Italy", "restaurants", 41.9220, 12.4530, 4.9),
  createLocation("rest-29", "Trattoria Sostanza", "Florence's butter pasta", "Via del Porcellana 25r, Florence, Italy", "restaurants", 43.7720, 11.2460, 4.5),
  // Spain (3)
  createLocation("rest-30", "El Celler de Can Roca", "Three Michelin stars", "Can Sunyer 48, Girona, Spain", "restaurants", 41.9924, 2.8048, 4.9),
  createLocation("rest-31", "Asador Etxebarri", "World's best grilled cuisine", "San Juan Plaza 1, Atxondo, Spain", "restaurants", 43.1310, -2.5970, 4.9),
  createLocation("rest-32", "DiverXO Madrid", "Three Michelin stars", "Calle de Padre Damián 23, Madrid, Spain", "restaurants", 40.4570, -3.6870, 4.8),
  // UK (3)
  createLocation("rest-33", "Dishoom", "Popular Indian restaurant", "12 Upper St Martin's Lane, London, UK", "restaurants", 51.5123, -0.1268, 4.6),
  createLocation("rest-34", "The Fat Duck", "Heston Blumenthal's lab", "High St, Bray, UK", "restaurants", 51.5080, -0.7010, 4.8),
  createLocation("rest-35", "Restaurant Gordon Ramsay", "Three Michelin star London", "68 Royal Hospital Rd, London, UK", "restaurants", 51.4855, -0.1630, 4.8),
  // Russia (5)
  createLocation("rest-36", "White Rabbit Moscow", "Modern Russian cuisine with city views", "Smolenskaya Sq 3, Moscow, Russia", "restaurants", 55.7470, 37.5830, 4.7),
  createLocation("rest-37", "Beluga Restaurant", "Upscale Russian-European", "Petrovka St 3, Moscow, Russia", "restaurants", 55.7630, 37.6150, 4.6),
  createLocation("rest-38", "Palkin St Petersburg", "Historic Russian restaurant since 1785", "Nevsky Prospekt 47, St. Petersburg, Russia", "restaurants", 59.9340, 30.3440, 4.5),
  createLocation("rest-39", "Twins Garden Moscow", "Farm-to-table excellence", "Strasnoy Blvd 8a, Moscow, Russia", "restaurants", 55.7680, 37.6080, 4.8),
  createLocation("rest-40", "Cococo St Petersburg", "Modern Russian gastronomy", "Voznesensky Prospekt 6, St. Petersburg, Russia", "restaurants", 59.9310, 30.3080, 4.6),
  // Afrique de l'Ouest (6)
  createLocation("rest-41", "La Calebasse Dakar", "Fine Senegalese dining", "Route de Ngor, Dakar, Senegal", "restaurants", 14.7450, -17.5130, 4.4),
  createLocation("rest-42", "Le Bushman Café Abidjan", "Ivorian fusion cuisine", "Rue des Jardins, Cocody, Abidjan, Côte d'Ivoire", "restaurants", 5.3590, -3.9870, 4.3),
  createLocation("rest-43", "Buka Restaurant Lagos", "Authentic Nigerian cuisine", "Victoria Island, Lagos, Nigeria", "restaurants", 6.4280, 3.4220, 4.4),
  createLocation("rest-44", "Santana Restaurant Accra", "Ghanaian fine dining", "Oxford St, Osu, Accra, Ghana", "restaurants", 5.5560, -0.1740, 4.3),
  createLocation("rest-45", "Le Djembe Bamako", "Traditional Malian cuisine", "Hippodrome, Bamako, Mali", "restaurants", 12.6530, -7.9920, 4.2),
  createLocation("rest-46", "L'Eau Vive Ouagadougou", "Fine dining in Burkina Faso", "Avenue de la Nation, Ouagadougou, Burkina Faso", "restaurants", 12.3680, -1.5240, 4.3),
  // Afrique du Nord (4)
  createLocation("rest-47", "El Ali Tunis", "Traditional Tunisian cuisine", "Rue Jamaa Zitouna, Tunis, Tunisia", "restaurants", 36.7980, 10.1710, 4.4),
  createLocation("rest-48", "La Maison Arabe Marrakech", "Moroccan gastronomy", "1 Derb Assehbe, Marrakech, Morocco", "restaurants", 31.6310, -7.9890, 4.6),
  createLocation("rest-49", "El Djazair Algiers", "Algerian traditional restaurant", "Rue Didouche Mourad, Algiers, Algeria", "restaurants", 36.7650, 3.0580, 4.3),
  createLocation("rest-50", "Felfela Cairo", "Classic Egyptian dining since 1963", "15 Hoda Shaarawy St, Cairo, Egypt", "restaurants", 30.0480, 31.2420, 4.4),
  // Asie Centrale (4)
  createLocation("rest-51", "Navat Almaty", "Kazakh traditional cuisine", "Dostyk Ave 50, Almaty, Kazakhstan", "restaurants", 43.2380, 76.9450, 4.4),
  createLocation("rest-52", "Caravan Samarkand", "Uzbek plov specialists", "Registan Square, Samarkand, Uzbekistan", "restaurants", 39.6540, 66.9760, 4.5),
  createLocation("rest-53", "Dastorkon Tashkent", "Traditional Uzbek restaurant", "Amir Temur Ave, Tashkent, Uzbekistan", "restaurants", 41.3110, 69.2790, 4.4),
  createLocation("rest-54", "Modern Nomads Ulaanbaatar", "Contemporary Mongolian cuisine", "Seoul Street, Ulaanbaatar, Mongolia", "restaurants", 47.9180, 106.9170, 4.3),
  // Cameroun & Afrique (3)
  createLocation("rest-55", "La Falaise Yaoundé", "Fine dining with panoramic views", "Quartier Bastos, Yaoundé, Cameroon", "restaurants", 3.8860, 11.5021, 4.4, true),
  createLocation("rest-56", "Le Safoutier Douala", "Traditional Cameroonian cuisine", "Rue de la Joie, Douala, Cameroon", "restaurants", 4.0550, 9.7100, 4.3),
  createLocation("rest-57", "Carnivore Restaurant Nairobi", "Famous meat restaurant", "Langata Road, Nairobi, Kenya", "restaurants", -1.3333, 36.7500, 4.4),
  // Reste du monde (10)
  createLocation("rest-58", "Hawker Chan Singapore", "Michelin-starred hawker food", "78 Smith Street, Singapore", "restaurants", 1.2819, 103.8445, 4.5),
  createLocation("rest-59", "Noma Copenhagen", "World-famous Nordic restaurant", "Refshalevej 96, Copenhagen, Denmark", "restaurants", 55.6834, 12.6100, 4.9),
  createLocation("rest-60", "At.mosphere Dubai", "World's highest restaurant", "Burj Khalifa, Dubai, UAE", "restaurants", 25.1972, 55.2744, 4.6),
  createLocation("rest-61", "Indian Accent Delhi", "Modern Indian fine dining", "The Lodhi, New Delhi, India", "restaurants", 28.5930, 77.2190, 4.7),
  createLocation("rest-62", "Central Lima", "World-renowned restaurant", "Santa Isabel 376, Lima, Peru", "restaurants", -12.0464, -77.0428, 4.8),
  createLocation("rest-63", "Don Julio Buenos Aires", "Famous steakhouse", "Guatemala 4699, Buenos Aires, Argentina", "restaurants", -34.5833, -58.4266, 4.7),
  createLocation("rest-64", "Pujol Mexico City", "Modern Mexican fine dining", "Tennyson 133, Mexico City, Mexico", "restaurants", 19.4320, -99.2003, 4.8),
  createLocation("rest-65", "Quay Restaurant Sydney", "Fine dining with harbour views", "Upper Level, Overseas Passenger Terminal, Sydney, Australia", "restaurants", -33.8577, 151.2100, 4.7),
  createLocation("rest-66", "Gaggan Anand Bangkok", "Innovative Indian cuisine", "68/1 Soi Langsuan, Bangkok, Thailand", "restaurants", 13.7400, 100.5416, 4.8),
  createLocation("rest-67", "Jungsik Seoul", "Two Michelin star Korean", "11 Seolleung-ro 158-gil, Gangnam, Seoul, South Korea", "restaurants", 37.5254, 127.0437, 4.8),

  // ===== CAFÉS (58) =====
  // France (4)
  createLocation("cafe-1", "Café de Flore", "Iconic Parisian café with rich literary history", "172 Boulevard Saint-Germain, 75006 Paris, France", "cafes", 48.8541, 2.3326, 4.3, true),
  createLocation("cafe-2", "Boulangerie Poilâne", "Legendary bakery famous for sourdough", "8 Rue du Cherche-Midi, 75006 Paris, France", "cafes", 48.8505, 2.3262, 4.8, true),
  createLocation("cafe-3", "Café Kitsuné", "Trendy coffee shop in Palais Royal", "51 Galerie de Montpensier, 75001 Paris, France", "cafes", 48.8635, 2.3378, 4.3),
  createLocation("cafe-4", "Ladurée Champs-Élysées", "Famous macaron house", "75 Avenue des Champs-Élysées, Paris, France", "cafes", 48.8710, 2.3050, 4.4),
  // USA (6)
  createLocation("cafe-5", "Blue Bottle Coffee", "Artisan coffee roaster", "66 Mint St, San Francisco, CA 94103, USA", "cafes", 37.7825, -122.4046, 4.4),
  createLocation("cafe-6", "Stumptown Coffee", "Portland coffee roaster", "128 SW 3rd Ave, Portland, OR 97204, USA", "cafes", 45.5204, -122.6763, 4.5),
  createLocation("cafe-7", "Tartine Bakery", "Famous San Francisco bakery", "600 Guerrero St, San Francisco, CA 94110, USA", "cafes", 37.7617, -122.4243, 4.6),
  createLocation("cafe-8", "Intelligentsia Coffee", "Chicago specialty coffee", "53 E Randolph St, Chicago, IL 60601, USA", "cafes", 41.8847, -87.6257, 4.5),
  createLocation("cafe-9", "Counter Culture Durham", "Award-winning roaster", "2018 Hillsborough Rd, Durham, NC 27705, USA", "cafes", 35.9960, -78.9240, 4.5),
  createLocation("cafe-10", "La Colombe Philadelphia", "Third-wave pioneer", "1414 S Penn Square, Philadelphia, PA 19102, USA", "cafes", 39.9510, -75.1660, 4.4),
  // Canada (4)
  createLocation("cafe-11", "49th Parallel Coffee Vancouver", "Vancouver roaster", "2902 Main St, Vancouver, BC, Canada", "cafes", 49.2600, -123.1010, 4.5),
  createLocation("cafe-12", "Café Myriade Montreal", "Montreal specialty coffee", "1432 Rue Mackay, Montreal, QC, Canada", "cafes", 45.4970, -73.5780, 4.4),
  createLocation("cafe-13", "Pilot Coffee Toronto", "Toronto roaster", "983 Queen St W, Toronto, ON, Canada", "cafes", 43.6440, -79.4170, 4.5),
  createLocation("cafe-14", "Transcend Coffee Edmonton", "Alberta specialty coffee", "10310 Jasper Ave, Edmonton, AB, Canada", "cafes", 53.5420, -113.5010, 4.4),
  // Russia (3)
  createLocation("cafe-15", "Chistye Prudy Moscow", "Historic Moscow café", "Chistoprudny Blvd, Moscow, Russia", "cafes", 55.7630, 37.6430, 4.3),
  createLocation("cafe-16", "Singer Café St Petersburg", "Café in historic bookstore", "Nevsky Prospekt 28, St. Petersburg, Russia", "cafes", 59.9360, 30.3260, 4.5),
  createLocation("cafe-17", "Double B Coffee Moscow", "Moscow specialty roaster", "Pokrovka St 17, Moscow, Russia", "cafes", 55.7590, 37.6490, 4.4),
  // Japan (4)
  createLocation("cafe-18", "Blue Bottle Coffee Tokyo", "Artisan coffee in Kiyosumi", "1 Chome-4-8 Hirano, Koto City, Tokyo, Japan", "cafes", 35.6803, 139.8003, 4.3),
  createLocation("cafe-19", "Arabica Kyoto", "Famous % Arabica coffee", "87-5 Hoshinocho, Higashiyama, Kyoto, Japan", "cafes", 34.9984, 135.7813, 4.4),
  createLocation("cafe-20", "Fuglen Tokyo", "Norwegian coffee culture", "1-16-11 Tomigaya, Shibuya, Tokyo, Japan", "cafes", 35.6660, 139.6880, 4.4),
  createLocation("cafe-21", "Onibus Coffee", "Nakameguro specialty", "2-14-1 Kamimeguro, Meguro, Tokyo, Japan", "cafes", 35.6440, 139.7000, 4.5),
  // UK (3)
  createLocation("cafe-22", "Monmouth Coffee", "Pioneer of London specialty coffee", "27 Monmouth St, London, UK", "cafes", 51.5140, -0.1267, 4.5),
  createLocation("cafe-23", "Prufrock Coffee", "Award-winning London café", "23-25 Leather Lane, London, UK", "cafes", 51.5200, -0.1092, 4.4),
  createLocation("cafe-24", "Flat White Soho", "Australian-style coffee", "17 Berwick St, London, UK", "cafes", 51.5138, -0.1346, 4.4),
  // Australia (3)
  createLocation("cafe-25", "Patricia Coffee Melbourne", "Standing room only", "493 Little Bourke St, Melbourne, Australia", "cafes", -37.8120, 144.9590, 4.5),
  createLocation("cafe-26", "Single O Sydney", "Specialty coffee roaster", "60-64 Reservoir St, Surry Hills, Australia", "cafes", -33.8850, 151.2120, 4.4),
  createLocation("cafe-27", "The Grounds of Alexandria", "Garden café experience", "7A/2 Huntley St, Alexandria, Australia", "cafes", -33.9100, 151.1940, 4.6),
  // Italy (3)
  createLocation("cafe-28", "Caffè Florian Venice", "Historic Venice café", "Piazza San Marco 57, Venice, Italy", "cafes", 45.4341, 12.3387, 4.5),
  createLocation("cafe-29", "Sant'Eustachio Il Caffè", "Famous Roman espresso", "Piazza di S. Eustachio 82, Rome, Italy", "cafes", 41.8986, 12.4751, 4.6),
  createLocation("cafe-30", "Gilli Florence", "Elegant Florence café", "Piazza della Repubblica, Florence, Italy", "cafes", 43.7710, 11.2540, 4.3),
  // Afrique de l'Ouest (4)
  createLocation("cafe-31", "Terrou-Bi Café Dakar", "Beachfront café experience", "Route de la Corniche, Dakar, Senegal", "cafes", 14.6990, -17.4720, 4.3),
  createLocation("cafe-32", "Vidéo Club Café Abidjan", "Hip Abidjan café", "Zone 4, Abidjan, Côte d'Ivoire", "cafes", 5.3140, -4.0010, 4.2),
  createLocation("cafe-33", "Accra Coffee House", "Specialty coffee in Ghana", "Osu, Accra, Ghana", "cafes", 5.5570, -0.1760, 4.3),
  createLocation("cafe-34", "The Yellow Chilli Lagos", "Nigerian café culture", "Ikeja, Lagos, Nigeria", "cafes", 6.6010, 3.3530, 4.2),
  // Afrique du Nord (3)
  createLocation("cafe-35", "Café des Nattes Sidi Bou Said", "Historic Tunisian café", "Sidi Bou Said, Tunisia", "cafes", 36.8690, 10.3480, 4.5),
  createLocation("cafe-36", "Café Clock Marrakech", "Cultural café in medina", "Derb el Magana, Marrakech, Morocco", "cafes", 31.6290, -7.9850, 4.4),
  createLocation("cafe-37", "Milk Bar Algiers", "Historic Algerian café", "Rue Larbi Ben M'hidi, Algiers, Algeria", "cafes", 36.7730, 3.0610, 4.2),
  // Asie Centrale (4)
  createLocation("cafe-38", "Ritz Coffee Almaty", "Kazakh specialty coffee", "Al-Farabi Ave, Almaty, Kazakhstan", "cafes", 43.2180, 76.9280, 4.3),
  createLocation("cafe-39", "Kukcha Tashkent", "Traditional Uzbek teahouse", "Navoi St, Tashkent, Uzbekistan", "cafes", 41.3150, 69.2810, 4.4),
  createLocation("cafe-40", "Café Amsterdam Bishkek", "European-style café in Kyrgyzstan", "Erkindik Blvd, Bishkek, Kyrgyzstan", "cafes", 42.8740, 74.6000, 4.2),
  createLocation("cafe-41", "Veranda Ulaanbaatar", "Modern Mongolian café", "Peace Ave, Ulaanbaatar, Mongolia", "cafes", 47.9150, 106.9180, 4.3),
  // Cameroun & Afrique (3)
  createLocation("cafe-42", "Café de Flore Yaoundé", "Popular local café", "Avenue Kennedy, Yaoundé, Cameroon", "cafes", 3.8700, 11.5200, 4.1),
  createLocation("cafe-43", "Truth Coffee Cape Town", "Steampunk-themed roastery", "36 Buitenkant St, Cape Town, South Africa", "cafes", -33.9280, 18.4240, 4.5),
  createLocation("cafe-44", "Tomoca Coffee Addis Ababa", "Historic Ethiopian coffee house", "Addis Ababa, Ethiopia", "cafes", 9.0167, 38.7500, 4.5),
  // Reste du monde (16)
  createLocation("cafe-45", "Café Central Vienna", "Historic Viennese coffeehouse", "Herrengasse 14, Vienna, Austria", "cafes", 48.2104, 16.3652, 4.5),
  createLocation("cafe-46", "Tim Wendelboe Oslo", "World champion barista café", "Grüners gate 1, Oslo, Norway", "cafes", 59.9220, 10.7580, 4.6),
  createLocation("cafe-47", "The Coffee Collective Copenhagen", "Nordic specialty", "Jægersborggade 57, Copenhagen, Denmark", "cafes", 55.6910, 12.5530, 4.5),
  createLocation("cafe-48", "Cafe de Paris Seoul", "Fruit dessert café", "41 Myeongdong 8-gil, Seoul, South Korea", "cafes", 37.5628, 126.9854, 4.3),
  createLocation("cafe-49", "Fritz Coffee Company Seoul", "Seoul specialty coffee", "41 Donggyo-ro 46-gil, Mapo-gu, Seoul, South Korea", "cafes", 37.5600, 126.9230, 4.5),
  createLocation("cafe-50", "Roots Coffee Bangkok", "Bangkok specialty roaster", "1096/2 Phahon Yothin Rd, Bangkok, Thailand", "cafes", 13.8150, 100.5610, 4.4),
  createLocation("cafe-51", "Cong Caphe Hanoi", "Retro Vietnamese coffee chain", "27 Nha Tho St, Hanoi, Vietnam", "cafes", 21.0290, 105.8490, 4.3),
  createLocation("cafe-52", "Common Grounds Jakarta", "Jakarta specialty café", "Jl. Kemang Raya 30A, Jakarta, Indonesia", "cafes", -6.2620, 106.8180, 4.4),
  createLocation("cafe-53", "Mandabatmaz Istanbul", "Traditional Turkish coffee", "Olivia Geçidi 1/A, Istanbul, Turkey", "cafes", 41.0315, 28.9742, 4.6),
  createLocation("cafe-54", "Café Pergamino Medellín", "Colombian specialty coffee", "Carrera 37, Medellín, Colombia", "cafes", 6.2100, -75.5700, 4.5),
  createLocation("cafe-55", "Coffee Lab São Paulo", "Brazilian specialty coffee", "R. Fradique Coutinho 1340, São Paulo, Brazil", "cafes", -23.5590, -46.6810, 4.5),
  createLocation("cafe-56", "Flight Coffee Wellington", "Wellington specialty roaster", "14 Dixon St, Wellington, New Zealand", "cafes", -41.2910, 174.7770, 4.4),
  createLocation("cafe-57", "Five Elephant Berlin", "Berlin specialty roaster", "Reichenberger Str. 101, Berlin, Germany", "cafes", 52.4950, 13.4350, 4.4),
  createLocation("cafe-58", "Bonanza Coffee Berlin", "Pioneer of Berlin coffee", "Oderberger Str. 35, Berlin, Germany", "cafes", 52.5400, 13.4100, 4.5),

  // ===== BARS (47) =====
  // France (3)
  createLocation("bar-1", "Harry's New York Bar", "Historic cocktail bar - birthplace of Bloody Mary", "5 Rue Daunou, 75002 Paris, France", "bars", 48.8689, 2.3335, 4.4),
  createLocation("bar-2", "Le Baron Rouge", "Authentic wine bar with cheese platters", "1 Rue Théophile Roussel, 75012 Paris, France", "bars", 48.8491, 2.3785, 4.5, true),
  createLocation("bar-3", "Experimental Cocktail Club", "Speakeasy-style bar", "37 Rue Saint-Sauveur, 75002 Paris, France", "bars", 48.8654, 2.3480, 4.5),
  // USA (6)
  createLocation("bar-4", "Death & Co NYC", "Award-winning cocktail bar", "433 E 6th St, New York, NY 10009, USA", "bars", 40.7260, -73.9850, 4.6),
  createLocation("bar-5", "Please Don't Tell", "Speakeasy cocktail bar", "113 St Marks Pl, New York, NY 10009, USA", "bars", 40.7275, -73.9846, 4.5),
  createLocation("bar-6", "The Aviary Chicago", "Molecular cocktails", "955 W Fulton Market, Chicago, IL 60607, USA", "bars", 41.8866, -87.6522, 4.6),
  createLocation("bar-7", "Smuggler's Cove SF", "Tiki bar in San Francisco", "650 Gough St, San Francisco, CA 94102, USA", "bars", 37.7789, -122.4232, 4.5),
  createLocation("bar-8", "The Dead Rabbit NYC", "Irish pub meets cocktail bar", "30 Water St, New York, NY 10004, USA", "bars", 40.7030, -74.0400, 4.6),
  createLocation("bar-9", "Employees Only NYC", "Prohibition-era speakeasy", "510 Hudson St, New York, NY 10014, USA", "bars", 40.7330, -74.0060, 4.5),
  // Canada (3)
  createLocation("bar-10", "BarChef Toronto", "Molecular cocktails", "472 Queen St W, Toronto, ON, Canada", "bars", 43.6480, -79.4030, 4.5),
  createLocation("bar-11", "Burgundy Lion Montreal", "British gastropub", "2496 Notre-Dame St W, Montreal, QC, Canada", "bars", 45.4790, -73.5860, 4.4),
  createLocation("bar-12", "The Keefer Bar Vancouver", "Chinatown cocktail bar", "135 Keefer St, Vancouver, BC, Canada", "bars", 49.2800, -123.1020, 4.5),
  // Russia (3)
  createLocation("bar-13", "Mendeleev Bar Moscow", "Speakeasy-style bar", "Petrovka St 20/1, Moscow, Russia", "bars", 55.7650, 37.6170, 4.5),
  createLocation("bar-14", "El Copitas St Petersburg", "World-class cocktail bar", "Bolshaya Konyushennaya St 14, St. Petersburg, Russia", "bars", 59.9380, 30.3240, 4.6),
  createLocation("bar-15", "Noor Bar Moscow", "Middle Eastern inspired cocktails", "Tverskaya St 23, Moscow, Russia", "bars", 55.7680, 37.6000, 4.4),
  // UK (3)
  createLocation("bar-16", "The Connaught Bar", "World's best bar", "Carlos Pl, London, UK", "bars", 51.5101, -0.1490, 4.7),
  createLocation("bar-17", "Nightjar London", "Live jazz cocktail bar", "129 City Rd, London, UK", "bars", 51.5277, -0.0888, 4.6),
  createLocation("bar-18", "Swift Soho", "Two-floor cocktail bar", "12 Old Compton St, London, UK", "bars", 51.5130, -0.1320, 4.4),
  // Germany (2)
  createLocation("bar-19", "Hofbräuhaus München", "World-famous beer hall", "Platzl 9, 80331 München, Germany", "bars", 48.1376, 11.5799, 4.4, true),
  createLocation("bar-20", "Buck and Breck Berlin", "Intimate cocktail bar", "Brunnenstraße 177, 10119 Berlin, Germany", "bars", 52.5330, 13.3990, 4.5),
  // Japan (3)
  createLocation("bar-21", "Golden Gai Tokyo", "Tiny bar district", "1 Chome Kabukicho, Shinjuku City, Tokyo, Japan", "bars", 35.6937, 139.7036, 4.4),
  createLocation("bar-22", "Bar High Five Tokyo", "World-famous cocktail bar", "Ginza, Tokyo, Japan", "bars", 35.6721, 139.7655, 4.7),
  createLocation("bar-23", "Gen Yamamoto Tokyo", "Omakase cocktails", "Anniversary Bldg, Azabu-Juban, Tokyo, Japan", "bars", 35.6550, 139.7370, 4.7),
  // Spain (2)
  createLocation("bar-24", "Paradiso Barcelona", "Hidden speakeasy", "Carrer de Rera Palau 4, Barcelona, Spain", "bars", 41.3850, 2.1810, 4.7),
  createLocation("bar-25", "Salmon Guru Madrid", "Creative cocktails", "Calle de Echegaray 21, Madrid, Spain", "bars", 40.4150, -3.7010, 4.5),
  // Afrique de l'Ouest (3)
  createLocation("bar-26", "Le Phare du Port Dakar", "Seaside bar in Senegal", "Port de Dakar, Senegal", "bars", 14.6850, -17.4350, 4.2),
  createLocation("bar-27", "Sky Bar Abidjan", "Rooftop bar with city views", "Sofitel Abidjan, Côte d'Ivoire", "bars", 5.3230, -4.0190, 4.3),
  createLocation("bar-28", "Shisha Lounge Lagos", "Nigerian nightlife spot", "Victoria Island, Lagos, Nigeria", "bars", 6.4310, 3.4270, 4.2),
  // Afrique du Nord (2)
  createLocation("bar-29", "Café M'rabet Tunis", "Historic bar in the medina", "Medina, Tunis, Tunisia", "bars", 36.7990, 10.1700, 4.3),
  createLocation("bar-30", "La Mamounia Bar Marrakech", "Legendary hotel bar", "Avenue Bab Jdid, Marrakech, Morocco", "bars", 31.6210, -7.9980, 4.6),
  // Asie Centrale (3)
  createLocation("bar-31", "Line Brew Almaty", "Craft beer bar in Kazakhstan", "Dostyk Ave, Almaty, Kazakhstan", "bars", 43.2350, 76.9410, 4.3),
  createLocation("bar-32", "Steam Bar Tashkent", "Modern cocktail lounge", "Amir Temur Ave, Tashkent, Uzbekistan", "bars", 41.3120, 69.2800, 4.2),
  createLocation("bar-33", "Grand Khaan Irish Pub Ulaanbaatar", "International bar in Mongolia", "Seoul Street, Ulaanbaatar, Mongolia", "bars", 47.9190, 106.9160, 4.1),
  // Cameroun (2)
  createLocation("bar-34", "La Terrasse Douala", "Popular rooftop bar", "Rue Joss, Douala, Cameroon", "bars", 4.0483, 9.7043, 4.2),
  createLocation("bar-35", "Mami Wata Bar Kribi", "Beachside bar in Kribi", "Kribi Beach, South Region, Cameroon", "bars", 2.9400, 9.9100, 4.3),
  // Reste du monde (12)
  createLocation("bar-36", "Speak Low Shanghai", "Hidden speakeasy bar", "579 Fuxing Middle Rd, Shanghai, China", "bars", 31.2179, 121.4553, 4.5),
  createLocation("bar-37", "Atlas Singapore", "Art deco gin bar", "600 North Bridge Rd, Singapore", "bars", 1.2944, 103.8588, 4.6),
  createLocation("bar-38", "The Old Man Hong Kong", "Ernest Hemingway themed", "37-39 Aberdeen St, Hong Kong", "bars", 22.2830, 114.1530, 4.6),
  createLocation("bar-39", "Charles H Seoul", "Speakeasy in Four Seasons", "97 Saemunan-ro, Seoul, South Korea", "bars", 37.5750, 126.9750, 4.6),
  createLocation("bar-40", "Bamboo Bar Bangkok", "Classic hotel cocktail bar", "48 Oriental Ave, Bangkok, Thailand", "bars", 13.7240, 100.5140, 4.5),
  createLocation("bar-41", "Floreria Atlantico Buenos Aires", "Hidden Buenos Aires bar", "Arroyo 872, Buenos Aires, Argentina", "bars", -34.5950, -58.3780, 4.6),
  createLocation("bar-42", "Licorería Limantour Mexico City", "Mexico City's best cocktails", "Av. Álvaro Obregón 106, Mexico City, Mexico", "bars", 19.4170, -99.1620, 4.6),
  createLocation("bar-43", "Maybe Sammy Sydney", "World's best bar finalist", "115 Harrington St, Sydney, Australia", "bars", -33.8610, 151.2070, 4.6),
  createLocation("bar-44", "The Jerry Thomas Project Rome", "Rome speakeasy", "Vicolo Cellini 30, Rome, Italy", "bars", 41.8960, 12.4700, 4.5),
  createLocation("bar-45", "The Temple Bar Dublin", "Famous Dublin pub", "47-48 Temple Bar, Dublin, Ireland", "bars", 53.3456, -6.2640, 4.2),
  createLocation("bar-46", "Delirium Café Brussels", "2000+ beers", "Impasse de la Fidélité 4A, Brussels, Belgium", "bars", 50.8480, 4.3540, 4.4),
  createLocation("bar-47", "PCO Delhi", "Secret cocktail den", "D-4 South Extension Part II, New Delhi, India", "bars", 28.5680, 77.2230, 4.4),

  // ===== PARKS (52) =====
  // France (2)
  createLocation("park-1", "Luxembourg Gardens", "Beautiful 17th-century garden", "Rue de Médicis, 75006 Paris, France", "parks", 48.8462, 2.3371, 4.8),
  createLocation("park-2", "Tuileries Garden", "Historic public garden by the Louvre", "Place de la Concorde, 75001 Paris, France", "parks", 48.8634, 2.3275, 4.7),
  // USA (6)
  createLocation("park-3", "Central Park NYC", "Iconic urban park", "New York, NY 10024, USA", "parks", 40.7829, -73.9654, 4.8, true),
  createLocation("park-4", "Grand Canyon", "Natural wonder", "Grand Canyon, AZ 86023, USA", "parks", 36.0544, -112.1401, 4.9),
  createLocation("park-5", "Yellowstone", "First US national park", "Yellowstone National Park, WY 82190, USA", "parks", 44.4280, -110.5885, 4.9),
  createLocation("park-6", "Yosemite", "Granite cliffs and waterfalls", "Yosemite National Park, CA 95389, USA", "parks", 37.8651, -119.5383, 4.9),
  createLocation("park-7", "Zion National Park", "Red rock canyons", "Springdale, UT 84767, USA", "parks", 37.2982, -113.0263, 4.8),
  createLocation("park-8", "Acadia National Park", "Maine coastal beauty", "Bar Harbor, ME 04609, USA", "parks", 44.3386, -68.2733, 4.8),
  // Canada (4)
  createLocation("park-9", "Banff National Park", "Canadian Rocky Mountains", "Banff, Alberta, Canada", "parks", 51.4968, -115.9281, 4.9),
  createLocation("park-10", "Stanley Park Vancouver", "Urban oasis", "Vancouver, BC, Canada", "parks", 49.3017, -123.1417, 4.8),
  createLocation("park-11", "Niagara Falls", "Spectacular waterfalls", "Niagara Falls, Ontario, Canada", "parks", 43.0896, -79.0849, 4.7),
  createLocation("park-12", "Jasper National Park", "Rocky Mountain wilderness", "Jasper, Alberta, Canada", "parks", 52.8737, -117.9550, 4.8),
  // Russia (4)
  createLocation("park-13", "Gorky Park Moscow", "Moscow's central park", "Krymsky Val 9, Moscow, Russia", "parks", 55.7310, 37.6010, 4.5),
  createLocation("park-14", "Peterhof Palace Gardens", "Imperial gardens", "St. Petersburg, Russia", "parks", 59.8863, 29.9087, 4.8),
  createLocation("park-15", "Lake Baikal", "World's deepest lake", "Irkutsk Oblast, Russia", "parks", 53.5587, 108.1650, 4.9),
  createLocation("park-16", "Kamchatka Peninsula", "Volcanic wilderness", "Kamchatka Krai, Russia", "parks", 53.0129, 158.6530, 4.8),
  // Japan (3)
  createLocation("park-17", "Shinjuku Gyoen", "Beautiful traditional garden", "11 Naitomachi, Shinjuku City, Tokyo, Japan", "parks", 35.6852, 139.7100, 4.7),
  createLocation("park-18", "Arashiyama Bamboo Grove", "Iconic bamboo forest", "Arashiyama, Ukyo Ward, Kyoto, Japan", "parks", 35.0094, 135.6722, 4.6),
  createLocation("park-19", "Nara Park", "Park with friendly deer", "Nara, Japan", "parks", 34.6851, 135.8048, 4.7),
  // UK (2)
  createLocation("park-20", "Hyde Park London", "Royal park in central London", "Hyde Park, London, UK", "parks", 51.5073, -0.1657, 4.6),
  createLocation("park-21", "Lake District", "Beautiful national park", "Lake District, Cumbria, UK", "parks", 54.4609, -3.0886, 4.8),
  // Afrique de l'Ouest (4)
  createLocation("park-22", "Pendjari National Park", "Wildlife reserve in Benin", "Atakora, Benin", "parks", 11.4160, 1.4810, 4.5),
  createLocation("park-23", "Mole National Park", "Ghana's largest wildlife refuge", "Northern Region, Ghana", "parks", 9.6170, -1.8530, 4.4),
  createLocation("park-24", "Niokolo-Koba National Park", "UNESCO Senegal reserve", "Tambacounda Region, Senegal", "parks", 13.0670, -12.7170, 4.5),
  createLocation("park-25", "Yankari Game Reserve", "Nigerian wildlife park", "Bauchi State, Nigeria", "parks", 9.7500, 10.5000, 4.3),
  // Afrique du Nord (2)
  createLocation("park-26", "Sahara Desert Morocco", "Merzouga dunes", "Merzouga, Morocco", "parks", 31.0990, -3.9990, 4.7),
  createLocation("park-27", "Ichkeul National Park", "UNESCO Tunisia wetland", "Bizerte, Tunisia", "parks", 37.1640, 9.6740, 4.4),
  // Asie Centrale (5)
  createLocation("park-28", "Charyn Canyon", "Kazakhstan's Grand Canyon", "Almaty Region, Kazakhstan", "parks", 43.3510, 79.0810, 4.6),
  createLocation("park-29", "Registan Square Gardens", "Historic Samarkand oasis", "Samarkand, Uzbekistan", "parks", 39.6540, 66.9760, 4.7),
  createLocation("park-30", "Ala Archa National Park", "Alpine park in Kyrgyzstan", "Bishkek, Kyrgyzstan", "parks", 42.5310, 74.4880, 4.5),
  createLocation("park-31", "Gorkhi-Terelj National Park", "Mongolian wilderness", "Ulaanbaatar, Mongolia", "parks", 47.8030, 107.4670, 4.6),
  createLocation("park-32", "Iskanderkul Lake", "Mountain lake in Tajikistan", "Sughd Region, Tajikistan", "parks", 39.0860, 68.3830, 4.5),
  // Cameroun & Afrique (4)
  createLocation("park-33", "Waza National Park", "Premier Cameroon safari", "Far North Region, Cameroon", "parks", 11.3167, 14.6500, 4.6),
  createLocation("park-34", "Mount Cameroon National Park", "Africa's highest peak in West Africa", "Buea, Southwest Region, Cameroon", "parks", 4.2170, 9.1700, 4.6),
  createLocation("park-35", "Masai Mara", "Famous safari destination", "Narok County, Kenya", "parks", -1.5000, 35.0000, 4.9, true),
  createLocation("park-36", "Serengeti", "World-renowned safari park", "Serengeti, Tanzania", "parks", -2.3333, 34.8333, 4.9),
  // Reste du monde (16)
  createLocation("park-37", "Kruger National Park", "Premier safari destination", "Limpopo, South Africa", "parks", -23.9884, 31.5547, 4.8),
  createLocation("park-38", "Table Mountain", "Iconic flat-topped mountain", "Cape Town, South Africa", "parks", -33.9628, 18.4098, 4.8),
  createLocation("park-39", "Iguazu Falls", "Spectacular waterfalls", "Foz do Iguaçu, Brazil", "parks", -25.6953, -54.4367, 4.9),
  createLocation("park-40", "Torres del Paine", "Stunning national park", "Magallanes, Chile", "parks", -50.9423, -73.4068, 4.9),
  createLocation("park-41", "Galápagos Islands", "Unique wildlife archipelago", "Galápagos Islands, Ecuador", "parks", -0.9538, -90.9656, 4.9),
  createLocation("park-42", "Ha Long Bay", "UNESCO limestone karst seascape", "Quang Ninh Province, Vietnam", "parks", 20.9101, 107.1839, 4.8),
  createLocation("park-43", "Gardens by the Bay", "Futuristic nature park", "18 Marina Gardens Dr, Singapore", "parks", 1.2816, 103.8636, 4.8),
  createLocation("park-44", "Great Barrier Reef", "World's largest coral reef", "Queensland, Australia", "parks", -18.2871, 147.6992, 4.9),
  createLocation("park-45", "Uluru", "Sacred sandstone monolith", "NT, Australia", "parks", -25.3444, 131.0369, 4.8),
  createLocation("park-46", "Milford Sound", "Fiord in New Zealand", "Fiordland, New Zealand", "parks", -44.6414, 167.8987, 4.9),
  createLocation("park-47", "Santorini Caldera", "Stunning volcanic island", "Santorini, Greece", "parks", 36.4167, 25.4333, 4.8),
  createLocation("park-48", "Geirangerfjord", "UNESCO World Heritage fjord", "Geiranger, Norway", "parks", 62.1008, 7.0956, 4.9),
  createLocation("park-49", "Wadi Rum", "Mars-like desert landscape", "Aqaba, Jordan", "parks", 29.5833, 35.4333, 4.7),
  createLocation("park-50", "Jeju Island", "Volcanic island paradise", "Jeju Island, South Korea", "parks", 33.4996, 126.5312, 4.7),
  createLocation("park-51", "Plitvice Lakes", "UNESCO cascading lakes", "Croatia", "parks", 44.8654, 15.5820, 4.8),
  createLocation("park-52", "Swiss Alps Jungfrau", "Alpine wonderland", "Jungfrau Region, Switzerland", "parks", 46.5370, 7.9620, 4.8),

  // ===== MUSEUMS (49) =====
  // France (3)
  createLocation("mus-1", "Louvre Museum", "World's largest art museum", "Rue de Rivoli, 75001 Paris, France", "museums", 48.8606, 2.3376, 4.8, true),
  createLocation("mus-2", "Musée d'Orsay", "Impressionist art museum", "1 Rue de la Légion d'Honneur, Paris, France", "museums", 48.8600, 2.3266, 4.9),
  createLocation("mus-3", "Château de Versailles", "Opulent royal palace", "Place d'Armes, Versailles, France", "museums", 48.8049, 2.1204, 4.8),
  // USA (4)
  createLocation("mus-4", "Metropolitan Museum of Art", "World's largest art museum", "1000 5th Ave, New York, NY 10028, USA", "museums", 40.7794, -73.9632, 4.8),
  createLocation("mus-5", "Smithsonian Museums", "Free museums complex", "Washington, DC 20560, USA", "museums", 38.8881, -77.0260, 4.8),
  createLocation("mus-6", "MoMA NYC", "Modern art museum", "11 W 53rd St, New York, NY 10019, USA", "museums", 40.7614, -73.9776, 4.7),
  createLocation("mus-7", "Getty Center LA", "Art and architecture", "1200 Getty Center Dr, Los Angeles, CA 90049, USA", "museums", 34.0780, -118.4740, 4.7),
  // Canada (3)
  createLocation("mus-8", "Royal Ontario Museum Toronto", "Natural history and world cultures", "100 Queens Park, Toronto, ON, Canada", "museums", 43.6677, -79.3948, 4.6),
  createLocation("mus-9", "Montreal Museum of Fine Arts", "Quebec's largest museum", "1380 Sherbrooke St W, Montreal, QC, Canada", "museums", 45.4986, -73.5795, 4.6),
  createLocation("mus-10", "Canadian Museum of History", "Ottawa's premier museum", "100 Laurier St, Gatineau, QC, Canada", "museums", 45.4309, -75.7093, 4.5),
  // Russia (4)
  createLocation("mus-11", "Hermitage Museum", "World's largest art museum", "Palace Square, Saint Petersburg, Russia", "museums", 59.9398, 30.3146, 4.9),
  createLocation("mus-12", "Kremlin Moscow", "Historic fortified complex", "Red Square, Moscow, Russia", "museums", 55.7520, 37.6175, 4.8),
  createLocation("mus-13", "Tretyakov Gallery", "Russian art collection", "Lavrushinsky Lane 10, Moscow, Russia", "museums", 55.7415, 37.6208, 4.7),
  createLocation("mus-14", "Peterhof Palace", "Russian Versailles", "Razvodnaya St 2, Peterhof, Russia", "museums", 59.8863, 29.9087, 4.8),
  // UK (3)
  createLocation("mus-15", "British Museum", "World history museum", "Great Russell St, London, UK", "museums", 51.5194, -0.1270, 4.8, true),
  createLocation("mus-16", "Tate Modern", "Modern art museum", "Bankside, London, UK", "museums", 51.5076, -0.0994, 4.7),
  createLocation("mus-17", "Edinburgh Castle", "Historic Scottish castle", "Castlehill, Edinburgh, UK", "museums", 55.9486, -3.1999, 4.7),
  // Italy (3)
  createLocation("mus-18", "Vatican Museums", "Papal art collection", "Vatican City", "museums", 41.9065, 12.4536, 4.8),
  createLocation("mus-19", "Colosseum", "Ancient Roman amphitheater", "Piazza del Colosseo, Rome, Italy", "museums", 41.8902, 12.4922, 4.8, true),
  createLocation("mus-20", "Uffizi Gallery", "Renaissance art masterpieces", "Piazzale degli Uffizi, Florence, Italy", "museums", 43.7687, 11.2554, 4.8),
  // Afrique de l'Ouest (3)
  createLocation("mus-21", "IFAN Museum Dakar", "West African art collection", "Place Soweto, Dakar, Senegal", "museums", 14.6920, -17.4440, 4.3),
  createLocation("mus-22", "National Museum Lagos", "Nigerian cultural heritage", "Onikan, Lagos, Nigeria", "museums", 6.4430, 3.4050, 4.2),
  createLocation("mus-23", "Kwame Nkrumah Memorial", "Ghana's founding father", "High St, Accra, Ghana", "museums", 5.5480, -0.2060, 4.3),
  // Afrique du Nord (3)
  createLocation("mus-24", "Pyramids of Giza", "Ancient wonder", "Giza, Egypt", "museums", 29.9792, 31.1342, 4.8, true),
  createLocation("mus-25", "Bardo National Museum", "Roman mosaics collection", "Tunis, Tunisia", "museums", 36.8090, 10.1340, 4.5),
  createLocation("mus-26", "Majorelle Garden Museum", "Yves Saint Laurent collection", "Marrakech, Morocco", "museums", 31.6416, -8.0030, 4.6),
  // Asie Centrale (4)
  createLocation("mus-27", "National Museum of Kazakhstan", "Kazakh history and culture", "Nur-Sultan, Kazakhstan", "museums", 51.1280, 71.4300, 4.4),
  createLocation("mus-28", "Registan Complex", "Silk Road architecture", "Samarkand, Uzbekistan", "museums", 39.6540, 66.9760, 4.8),
  createLocation("mus-29", "State History Museum Bishkek", "Kyrgyz heritage", "Ala-Too Square, Bishkek, Kyrgyzstan", "museums", 42.8746, 74.6048, 4.2),
  createLocation("mus-30", "Genghis Khan Statue Complex", "Mongolian history monument", "Tsonjin Boldog, Mongolia", "museums", 47.8070, 107.5270, 4.5),
  // Japan (3)
  createLocation("mus-31", "Senso-ji Temple", "Ancient Buddhist temple", "Asakusa, Tokyo, Japan", "museums", 35.7148, 139.7967, 4.7),
  createLocation("mus-32", "Fushimi Inari Shrine", "Thousands of orange torii", "Fushimi, Kyoto, Japan", "museums", 34.9671, 135.7727, 4.8),
  createLocation("mus-33", "teamLab Borderless", "Immersive digital art", "Odaiba, Tokyo, Japan", "museums", 35.6265, 139.7843, 4.6),
  // China (3)
  createLocation("mus-34", "The Great Wall", "Ancient wonder of the world", "Beijing, China", "museums", 40.4319, 116.5704, 4.9, true),
  createLocation("mus-35", "Forbidden City", "Imperial palace complex", "Beijing, China", "museums", 39.9163, 116.3972, 4.8),
  createLocation("mus-36", "Terracotta Army", "Ancient warrior statues", "Xi'an, China", "museums", 34.3847, 109.2785, 4.8),
  // Reste du monde (13)
  createLocation("mus-37", "Egyptian Museum", "Vast collection of antiquities", "Cairo, Egypt", "museums", 30.0478, 31.2336, 4.6),
  createLocation("mus-38", "Taj Mahal", "Iconic marble mausoleum", "Agra, India", "museums", 27.1751, 78.0421, 4.9, true),
  createLocation("mus-39", "Machu Picchu", "Ancient Incan citadel", "Cusco, Peru", "museums", -13.1631, -72.5450, 4.9, true),
  createLocation("mus-40", "Chichen Itza", "Ancient Mayan pyramid", "Yucatan, Mexico", "museums", 20.6843, -88.5678, 4.8),
  createLocation("mus-41", "Christ the Redeemer", "Iconic Rio statue", "Rio de Janeiro, Brazil", "museums", -22.9519, -43.2105, 4.8),
  createLocation("mus-42", "Acropolis of Athens", "Ancient citadel", "Athens, Greece", "museums", 37.9715, 23.7267, 4.8),
  createLocation("mus-43", "Petra", "Ancient rose-red city", "Petra, Jordan", "museums", 30.3285, 35.4444, 4.9, true),
  createLocation("mus-44", "Angkor Wat", "World's largest religious monument", "Siem Reap, Cambodia", "museums", 13.4125, 103.8670, 4.9),
  createLocation("mus-45", "Sydney Opera House", "Iconic performing arts venue", "Sydney, Australia", "museums", -33.8568, 151.2153, 4.8),
  createLocation("mus-46", "Prague Castle", "Largest ancient castle complex", "Prague, Czech Republic", "museums", 50.0911, 14.4008, 4.7),
  createLocation("mus-47", "Gyeongbokgung Palace", "Main royal palace of Joseon", "Seoul, South Korea", "museums", 37.5796, 126.9770, 4.7),
  createLocation("mus-48", "Borobudur Temple", "Largest Buddhist temple", "Central Java, Indonesia", "museums", -7.6079, 110.2038, 4.8),
  createLocation("mus-49", "Grand Palace Bangkok", "Royal palace complex", "Bangkok, Thailand", "museums", 13.7500, 100.4914, 4.7),

  // ===== SHOPS (53) =====
  // France (2)
  createLocation("shop-1", "Galeries Lafayette", "Art Nouveau department store", "40 Boulevard Haussmann, Paris, France", "shops", 48.8738, 2.3320, 4.2),
  createLocation("shop-2", "Le Bon Marché", "World's oldest department store", "24 Rue de Sèvres, Paris, France", "shops", 48.8510, 2.3254, 4.4),
  // USA (4)
  createLocation("shop-3", "Fifth Avenue NYC", "Famous shopping boulevard", "Fifth Avenue, New York, NY, USA", "shops", 40.7580, -73.9778, 4.5),
  createLocation("shop-4", "Rodeo Drive", "Luxury shopping street", "Rodeo Dr, Beverly Hills, CA 90210, USA", "shops", 34.0674, -118.4003, 4.5),
  createLocation("shop-5", "Pike Place Market", "Historic Seattle market", "85 Pike St, Seattle, WA 98101, USA", "shops", 47.6097, -122.3425, 4.7),
  createLocation("shop-6", "The Grove LA", "Outdoor shopping center", "189 The Grove Dr, Los Angeles, CA 90036, USA", "shops", 34.0720, -118.3580, 4.4),
  // Canada (3)
  createLocation("shop-7", "Eaton Centre Toronto", "Downtown shopping mall", "220 Yonge St, Toronto, ON, Canada", "shops", 43.6544, -79.3807, 4.4),
  createLocation("shop-8", "Granville Island Market Vancouver", "Public market", "1661 Duranleau St, Vancouver, BC, Canada", "shops", 49.2724, -123.1340, 4.6),
  createLocation("shop-9", "Jean-Talon Market Montreal", "Open-air market", "7070 Avenue Henri-Julien, Montreal, QC, Canada", "shops", 45.5370, -73.6150, 4.5),
  // Russia (3)
  createLocation("shop-10", "GUM Moscow", "Historic department store", "Red Square 3, Moscow, Russia", "shops", 55.7550, 37.6215, 4.5),
  createLocation("shop-11", "Gostiny Dvor St Petersburg", "Historic shopping arcade", "Nevsky Prospekt, St. Petersburg, Russia", "shops", 59.9340, 30.3350, 4.4),
  createLocation("shop-12", "Izmailovsky Market Moscow", "Flea market and crafts", "Izmailovo, Moscow, Russia", "shops", 55.7890, 37.7480, 4.3),
  // UK (2)
  createLocation("shop-13", "Harrods London", "Luxury department store", "87-135 Brompton Rd, London, UK", "shops", 51.4994, -0.1633, 4.6),
  createLocation("shop-14", "Borough Market", "Historic food market", "8 Southwark St, London, UK", "shops", 51.5055, -0.0910, 4.6),
  // Japan (4)
  createLocation("shop-15", "Tsukiji Outer Market", "Famous fish market area", "Tsukiji, Tokyo, Japan", "shops", 35.6654, 139.7707, 4.5),
  createLocation("shop-16", "Ginza Six", "Upscale shopping complex", "Ginza, Tokyo, Japan", "shops", 35.6698, 139.7625, 4.4),
  createLocation("shop-17", "Takeshita Street", "Teen fashion paradise", "Harajuku, Tokyo, Japan", "shops", 35.6710, 139.7025, 4.3),
  createLocation("shop-18", "Nishiki Market Kyoto", "Kyoto's kitchen", "Nakagyo, Kyoto, Japan", "shops", 35.0050, 135.7640, 4.5),
  // Afrique de l'Ouest (4)
  createLocation("shop-19", "Sandaga Market Dakar", "Vibrant Senegalese market", "Dakar, Senegal", "shops", 14.6710, -17.4410, 4.2),
  createLocation("shop-20", "Treichville Market Abidjan", "Biggest market in Côte d'Ivoire", "Treichville, Abidjan, Côte d'Ivoire", "shops", 5.3010, -3.9960, 4.1),
  createLocation("shop-21", "Makola Market Accra", "Ghana's largest market", "Central Accra, Ghana", "shops", 5.5530, -0.2110, 4.2),
  createLocation("shop-22", "Balogun Market Lagos", "Nigeria's commercial heart", "Lagos Island, Nigeria", "shops", 6.4530, 3.3950, 4.1),
  // Afrique du Nord (3)
  createLocation("shop-23", "Marrakech Souks", "Traditional market maze", "Marrakech, Morocco", "shops", 31.6310, -7.9860, 4.5),
  createLocation("shop-24", "Khan el-Khalili Cairo", "Historic market", "Cairo, Egypt", "shops", 30.0478, 31.2625, 4.4),
  createLocation("shop-25", "Medina of Tunis", "UNESCO heritage souk", "Tunis, Tunisia", "shops", 36.7990, 10.1700, 4.4),
  // Asie Centrale (4)
  createLocation("shop-26", "Green Bazaar Almaty", "Central Asian market", "Zhibek Zholy, Almaty, Kazakhstan", "shops", 43.2560, 76.9450, 4.3),
  createLocation("shop-27", "Chorsu Bazaar Tashkent", "Historic Uzbek market", "Old City, Tashkent, Uzbekistan", "shops", 41.3260, 69.2340, 4.5),
  createLocation("shop-28", "Osh Bazaar Bishkek", "Kyrgyz trading hub", "Bishkek, Kyrgyzstan", "shops", 42.8720, 74.5870, 4.3),
  createLocation("shop-29", "Narantuul Market Ulaanbaatar", "Mongolian black market", "Ulaanbaatar, Mongolia", "shops", 47.9260, 106.8760, 4.2),
  // Cameroun & Afrique (3)
  createLocation("shop-30", "Marché Central Douala", "Vibrant central market", "Douala, Cameroon", "shops", 4.0500, 9.7028, 4.0),
  createLocation("shop-31", "Artisanat de Foumban", "Traditional crafts market", "Foumban, Cameroon", "shops", 5.7250, 10.9000, 4.4),
  createLocation("shop-32", "V&A Waterfront Cape Town", "Shopping complex", "Cape Town, South Africa", "shops", -33.9036, 18.4206, 4.5),
  // Reste du monde (16)
  createLocation("shop-33", "Chatuchak Weekend Market", "World's largest weekend market", "Bangkok, Thailand", "shops", 13.7999, 100.5502, 4.5),
  createLocation("shop-34", "Myeongdong Seoul", "Popular shopping district", "Seoul, South Korea", "shops", 37.5606, 126.9850, 4.4),
  createLocation("shop-35", "Orchard Road Singapore", "Famous shopping belt", "Singapore", "shops", 1.3050, 103.8318, 4.5),
  createLocation("shop-36", "Grand Bazaar Istanbul", "World's largest covered market", "Istanbul, Turkey", "shops", 41.0106, 28.9680, 4.5),
  createLocation("shop-37", "Dubai Mall", "World's largest shopping mall", "Dubai, UAE", "shops", 25.1976, 55.2793, 4.6),
  createLocation("shop-38", "Temple Street Night Market", "Famous Hong Kong night market", "Hong Kong", "shops", 22.3059, 114.1688, 4.3),
  createLocation("shop-39", "Nanjing Road Shanghai", "Famous shopping street", "Shanghai, China", "shops", 31.2352, 121.4755, 4.4),
  createLocation("shop-40", "Ben Thanh Market HCMC", "Landmark market", "Ho Chi Minh City, Vietnam", "shops", 10.7725, 106.6980, 4.3),
  createLocation("shop-41", "Chandni Chowk Delhi", "Historic market street", "Old Delhi, India", "shops", 28.6505, 77.2303, 4.3),
  createLocation("shop-42", "Queen Victoria Market Melbourne", "Historic market", "Melbourne, Australia", "shops", -37.8075, 144.9568, 4.5),
  createLocation("shop-43", "Mercado de San Juan Mexico City", "Gourmet food market", "Mexico City, Mexico", "shops", 19.4290, -99.1420, 4.4),
  createLocation("shop-44", "San Pedro Market Cusco", "Traditional Andean market", "Cusco, Peru", "shops", -13.5180, -71.9800, 4.3),
  createLocation("shop-45", "Ubud Art Market Bali", "Traditional Balinese crafts", "Ubud, Bali, Indonesia", "shops", -8.5069, 115.2625, 4.4),
  createLocation("shop-46", "Jiufen Old Street Taiwan", "Historic mountain village", "New Taipei City, Taiwan", "shops", 25.1092, 121.8443, 4.5),
  createLocation("shop-47", "Via Montenapoleone Milan", "Luxury fashion street", "Milan, Italy", "shops", 45.4685, 9.1955, 4.5),
  createLocation("shop-48", "La Boqueria Barcelona", "Famous food market", "Barcelona, Spain", "shops", 41.3816, 2.1720, 4.5),
  createLocation("shop-49", "Naschmarkt Vienna", "Vienna's most popular market", "Vienna, Austria", "shops", 48.1990, 16.3630, 4.4),
  createLocation("shop-50", "Paloquemao Market Bogotá", "Bogotá's largest market", "Bogotá, Colombia", "shops", 4.6297, -74.0897, 4.3),
  createLocation("shop-51", "Gold Souk Dubai", "Traditional gold market", "Dubai, UAE", "shops", 25.2867, 55.2979, 4.4),
  createLocation("shop-52", "Spice Bazaar Istanbul", "Historic spice market", "Istanbul, Turkey", "shops", 41.0167, 28.9700, 4.4),
  createLocation("shop-53", "Fremantle Markets Perth", "Heritage market in Western Australia", "Fremantle, Perth, Australia", "shops", -32.0569, 115.7489, 4.4),

  // ===== HOTELS (42) =====
  // France (3)
  createLocation("hotel-1", "Hôtel Plaza Athénée", "Legendary palace hotel", "25 Avenue Montaigne, Paris, France", "hotels", 48.8660, 2.3043, 4.9, true),
  createLocation("hotel-2", "The Ritz Paris", "Legendary luxury hotel", "15 Place Vendôme, Paris, France", "hotels", 48.8678, 2.3289, 4.9),
  createLocation("hotel-3", "Le Bristol Paris", "Historic palace hotel", "112 Rue du Faubourg Saint-Honoré, Paris, France", "hotels", 48.8715, 2.3159, 4.8),
  // USA (4)
  createLocation("hotel-4", "The Plaza NYC", "Iconic luxury hotel", "768 5th Ave, New York, NY 10019, USA", "hotels", 40.7645, -73.9743, 4.7, true),
  createLocation("hotel-5", "The Venetian Las Vegas", "Luxury Vegas resort", "Las Vegas, NV 89109, USA", "hotels", 36.1215, -115.1739, 4.6),
  createLocation("hotel-6", "Four Seasons Beverly Hills", "Luxury LA hotel", "Los Angeles, CA 90048, USA", "hotels", 34.0703, -118.3898, 4.7),
  createLocation("hotel-7", "Waldorf Astoria NYC", "Art Deco landmark", "301 Park Ave, New York, NY 10022, USA", "hotels", 40.7566, -73.9725, 4.6),
  // Canada (3)
  createLocation("hotel-8", "Fairmont Banff Springs", "Castle in the Rockies", "405 Spray Ave, Banff, AB, Canada", "hotels", 51.1670, -115.5620, 4.7),
  createLocation("hotel-9", "Fairmont Le Château Frontenac", "Iconic Quebec City hotel", "1 Rue des Carrières, Quebec City, QC, Canada", "hotels", 46.8117, -71.2038, 4.6),
  createLocation("hotel-10", "Shangri-La Toronto", "Luxury downtown hotel", "188 University Ave, Toronto, ON, Canada", "hotels", 43.6500, -79.3850, 4.6),
  // Russia (3)
  createLocation("hotel-11", "Hotel Metropol Moscow", "Historic luxury hotel", "Teatralny Proezd 2, Moscow, Russia", "hotels", 55.7580, 37.6210, 4.6),
  createLocation("hotel-12", "Grand Hotel Europe St Petersburg", "Imperial elegance", "Mikhailovskaya St 1/7, St. Petersburg, Russia", "hotels", 59.9350, 30.3330, 4.7),
  createLocation("hotel-13", "Four Seasons Moscow", "Luxury near Red Square", "Okhotny Ryad 2, Moscow, Russia", "hotels", 55.7570, 37.6160, 4.8),
  // UK (2)
  createLocation("hotel-14", "The Savoy London", "Iconic luxury hotel", "Strand, London, UK", "hotels", 51.5103, -0.1205, 4.7),
  createLocation("hotel-15", "Claridge's London", "Art deco luxury hotel", "Brook St, London, UK", "hotels", 51.5127, -0.1481, 4.8),
  // Japan (2)
  createLocation("hotel-16", "Park Hyatt Tokyo", "Lost in Translation hotel", "Shinjuku, Tokyo, Japan", "hotels", 35.6864, 139.6902, 4.8, true),
  createLocation("hotel-17", "Aman Tokyo", "Ultra-luxury hotel", "Otemachi, Tokyo, Japan", "hotels", 35.6867, 139.7622, 4.9),
  // Afrique de l'Ouest (3)
  createLocation("hotel-18", "Terrou-Bi Dakar", "Luxury beachfront resort", "Route de la Corniche, Dakar, Senegal", "hotels", 14.6990, -17.4720, 4.4),
  createLocation("hotel-19", "Sofitel Abidjan Ivoire", "Luxury hotel with casino", "Boulevard Hassan II, Abidjan, Côte d'Ivoire", "hotels", 5.3170, -4.0170, 4.4),
  createLocation("hotel-20", "Labadi Beach Hotel Accra", "Ghana's premier hotel", "No 1 La Beach Road, Accra, Ghana", "hotels", 5.5530, -0.1530, 4.3),
  // Afrique du Nord (2)
  createLocation("hotel-21", "La Mamounia Marrakech", "Legendary palace hotel", "Avenue Bab Jdid, Marrakech, Morocco", "hotels", 31.6206, -7.9988, 4.8),
  createLocation("hotel-22", "Four Seasons Resort Tunis", "Mediterranean luxury", "Zone Touristique Gammarth, Tunisia", "hotels", 36.9020, 10.2790, 4.6),
  // Asie Centrale (3)
  createLocation("hotel-23", "The Ritz-Carlton Almaty", "Luxury in Kazakhstan", "Esentai Tower, Almaty, Kazakhstan", "hotels", 43.2180, 76.9260, 4.6),
  createLocation("hotel-24", "Hyatt Regency Tashkent", "Modern Uzbek luxury", "Navoi St 1A, Tashkent, Uzbekistan", "hotels", 41.3110, 69.2800, 4.5),
  createLocation("hotel-25", "Shangri-La Ulaanbaatar", "Mongolian luxury", "Olympic St 19A, Ulaanbaatar, Mongolia", "hotels", 47.9130, 106.9200, 4.5),
  // Cameroun & Afrique (4)
  createLocation("hotel-26", "Hilton Yaoundé", "Luxury hotel in the capital", "Yaoundé, Cameroon", "hotels", 3.8667, 11.5167, 4.5),
  createLocation("hotel-27", "Le Méridien Douala", "Premium beachside hotel", "Douala, Cameroon", "hotels", 4.0500, 9.7000, 4.3),
  createLocation("hotel-28", "Kribi Beach Resort", "Beautiful coastal resort", "Kribi, Cameroon", "hotels", 2.9500, 9.9167, 4.4),
  createLocation("hotel-29", "Giraffe Manor Nairobi", "Unique giraffe experience", "Nairobi, Kenya", "hotels", -1.3780, 36.7450, 4.8),
  // Reste du monde (13)
  createLocation("hotel-30", "Marina Bay Sands Singapore", "Iconic infinity pool", "Singapore", "hotels", 1.2834, 103.8607, 4.7, true),
  createLocation("hotel-31", "Mandarin Oriental Bangkok", "Legendary riverside hotel", "Bangkok, Thailand", "hotels", 13.7241, 100.5140, 4.9),
  createLocation("hotel-32", "Peninsula Shanghai", "Luxury art deco hotel", "Shanghai, China", "hotels", 31.2416, 121.4905, 4.8),
  createLocation("hotel-33", "Mandarin Oriental Hong Kong", "Iconic harbour hotel", "Hong Kong", "hotels", 22.2820, 114.1588, 4.8),
  createLocation("hotel-34", "The Shilla Seoul", "Luxury hotel in Jangchung", "Seoul, South Korea", "hotels", 37.5575, 127.0053, 4.7),
  createLocation("hotel-35", "Burj Al Arab Dubai", "Iconic sail-shaped hotel", "Dubai, UAE", "hotels", 25.1412, 55.1853, 4.7),
  createLocation("hotel-36", "Cape Grace Cape Town", "Waterfront luxury", "Cape Town, South Africa", "hotels", -33.9080, 18.4200, 4.6),
  createLocation("hotel-37", "Park Hyatt Sydney", "Luxury harbour hotel", "Sydney, Australia", "hotels", -33.8573, 151.2092, 4.7),
  createLocation("hotel-38", "Belmond Copacabana Palace", "Legendary beachfront", "Rio de Janeiro, Brazil", "hotels", -22.9669, -43.1779, 4.7),
  createLocation("hotel-39", "Taj Mahal Palace Mumbai", "Historic luxury hotel", "Mumbai, India", "hotels", 18.9217, 72.8332, 4.7),
  createLocation("hotel-40", "Hotel Hassler Roma", "Luxury at Spanish Steps", "Rome, Italy", "hotels", 41.9059, 12.4835, 4.7),
  createLocation("hotel-41", "Soneva Fushi Maldives", "Barefoot luxury resort", "Maldives", "hotels", 5.1100, 73.0700, 4.9),
  createLocation("hotel-42", "Amanjiwo Java", "Temple view luxury", "Borobudur, Indonesia", "hotels", -7.6140, 110.2100, 4.8),

  // ===== GYMS (32) =====
  // France (2)
  createLocation("gym-1", "Ken Club Paris", "Premium fitness club with spa", "Paris, France", "gyms", 48.8556, 2.2755, 4.6),
  createLocation("gym-2", "L'Usine Paris", "Trendy fitness concept", "Paris, France", "gyms", 48.8710, 2.3370, 4.4),
  // USA (5)
  createLocation("gym-3", "Equinox NYC", "Premium fitness club", "897 Broadway, New York, NY 10003, USA", "gyms", 40.7378, -73.9909, 4.3),
  createLocation("gym-4", "Barry's Bootcamp LA", "Intense fitness studio", "Venice, CA 90291, USA", "gyms", 33.9926, -118.4658, 4.4),
  createLocation("gym-5", "SoulCycle NYC", "Spinning fitness studio", "New York, NY 10001, USA", "gyms", 40.7449, -73.9903, 4.3),
  createLocation("gym-6", "CrossFit Games Gym", "Elite CrossFit training", "Los Angeles, CA 90015, USA", "gyms", 34.0340, -118.2700, 4.5),
  createLocation("gym-7", "Dogpound NYC", "Celebrity trainer gym", "New York, NY 10013, USA", "gyms", 40.7250, -74.0050, 4.5),
  // Canada (2)
  createLocation("gym-8", "Equinox Toronto", "Luxury fitness club", "Toronto, Canada", "gyms", 43.6700, -79.3860, 4.4),
  createLocation("gym-9", "Orangetheory Vancouver", "Heart-rate based training", "Vancouver, BC, Canada", "gyms", 49.2780, -123.1200, 4.3),
  // Russia (2)
  createLocation("gym-10", "World Class Moscow", "Premium Russian chain", "Romanov Dvor, Moscow, Russia", "gyms", 55.7570, 37.6130, 4.4),
  createLocation("gym-11", "X-Fit St Petersburg", "Fitness chain", "Nevsky Prospekt, St. Petersburg, Russia", "gyms", 59.9340, 30.3280, 4.2),
  // UK (2)
  createLocation("gym-12", "Third Space London", "Luxury fitness club", "London, UK", "gyms", 51.5050, -0.0196, 4.5),
  createLocation("gym-13", "1Rebel London", "Boutique fitness studio", "London, UK", "gyms", 51.5148, -0.0805, 4.4),
  // Japan (2)
  createLocation("gym-14", "Golds Gym Harajuku", "Popular fitness center", "Tokyo, Japan", "gyms", 35.6702, 139.7027, 4.2),
  createLocation("gym-15", "Anytime Fitness Tokyo", "24-hour gym chain", "Tokyo, Japan", "gyms", 35.6620, 139.7000, 4.1),
  // Afrique de l'Ouest (2)
  createLocation("gym-16", "Body & Soul Dakar", "Senegalese fitness center", "Almadies, Dakar, Senegal", "gyms", 14.7420, -17.5140, 4.1),
  createLocation("gym-17", "The Gym Lagos", "Nigerian fitness facility", "Victoria Island, Lagos, Nigeria", "gyms", 6.4300, 3.4240, 4.2),
  // Afrique du Nord (2)
  createLocation("gym-18", "Gold's Gym Cairo", "International chain in Egypt", "Zamalek, Cairo, Egypt", "gyms", 30.0600, 31.2200, 4.2),
  createLocation("gym-19", "Moving Marrakech", "Moroccan fitness studio", "Gueliz, Marrakech, Morocco", "gyms", 31.6350, -8.0100, 4.1),
  // Asie Centrale (2)
  createLocation("gym-20", "World Class Almaty", "Premium Kazakh gym", "Al-Farabi Ave, Almaty, Kazakhstan", "gyms", 43.2200, 76.9300, 4.3),
  createLocation("gym-21", "Sport Life Tashkent", "Uzbek fitness chain", "Tashkent, Uzbekistan", "gyms", 41.3100, 69.2750, 4.1),
  // Reste du monde (11)
  createLocation("gym-22", "Pure Fitness Hong Kong", "Luxury fitness club", "Hong Kong", "gyms", 22.2840, 114.1520, 4.4),
  createLocation("gym-23", "Pure Fitness Singapore", "Premium fitness club", "Singapore", "gyms", 1.2820, 103.8530, 4.4),
  createLocation("gym-24", "WXY Fitness Seoul", "Premium Korean gym", "Seoul, South Korea", "gyms", 37.5170, 127.0470, 4.3),
  createLocation("gym-25", "Base Bangkok", "CrossFit and functional fitness", "Bangkok, Thailand", "gyms", 13.7220, 100.5690, 4.4),
  createLocation("gym-26", "Fitness First UAE", "Premium fitness chain", "Dubai, UAE", "gyms", 25.1980, 55.2790, 4.3),
  createLocation("gym-27", "F45 Training Sydney", "Functional fitness", "Sydney, Australia", "gyms", -33.8720, 151.2260, 4.3),
  createLocation("gym-28", "Metropolitan Barcelona", "Premium fitness club", "Barcelona, Spain", "gyms", 41.3920, 2.1620, 4.3),
  createLocation("gym-29", "Virgin Active Italy", "Premium fitness", "Milan, Italy", "gyms", 45.4640, 9.1980, 4.3),
  createLocation("gym-30", "Smart Fit São Paulo", "Popular Brazilian chain", "São Paulo, Brazil", "gyms", -23.5610, -46.6560, 4.1),
  createLocation("gym-31", "Virgin Active Cape Town", "Premium fitness chain", "Cape Town, South Africa", "gyms", -33.9050, 18.4180, 4.3),
  createLocation("gym-32", "Sports World Mexico", "Large gym chain", "Mexico City, Mexico", "gyms", 19.3900, -99.1800, 4.1),
];
