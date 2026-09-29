export const VEHICLES = [
  {
    id: 'v1',
    name: '2021 Toyota Corolla Altis',
    shortName: '2021 Toyota Corolla',
    make: 'Toyota',
    model: 'Corolla Altis',
    year: 2021,
    price: 8900000,
    priceDisplay: 'Rs. 8.9M',
    priceRating: 'Super Price',
    location: 'Colombo',
    mileage: '42,000 km',
    fuel: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    condition: 'Used',
    category: 'Cars',
    emissionClass: 'Euro 6',
    features: ['Sunroof', 'Leather Seats', 'Cruise Control', 'Lane Departure Alert', 'Alloy Wheels'],
    verified: true,
    seller: 'Premium Auto Hub',
    sellerType: 'Dealer verified',
    sellerRating: '4.8 / 5',
    image: '/hero_supercar.png',
    gallery: [
      '/hero_supercar.png',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Well maintained, single owner. Full service history available. Equipped with lane departure alert, cruise control, leather seats, and original alloy wheels.',
    safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    id: 'v2',
    name: '2020 Honda Vezel Z Sensing',
    shortName: '2020 Honda Vezel',
    make: 'Honda',
    model: 'Vezel',
    year: 2020,
    price: 10200000,
    priceDisplay: 'Rs. 10.2M',
    priceRating: 'Fair Price',
    location: 'Kandy',
    mileage: '51,000 km',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'SUV',
    condition: 'Used',
    category: 'SUVs',
    emissionClass: 'Euro 6',
    features: ['Honda Sensing', 'LED Headlights', 'Climate Control', 'Half-Leather', 'Alloy Wheels'],
    verified: true,
    seller: 'City Motors Lanka',
    sellerType: 'Verified dealer',
    sellerRating: '4.6 / 5',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Honda Sensing package, LED headlights, dual climate control, half-leather interior, 17-inch alloy wheels, mint condition.',
    safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    id: 'v3',
    name: '2019 BMW 3 Series 320i',
    shortName: '2019 BMW 3 Series',
    make: 'BMW',
    model: '3 Series',
    year: 2019,
    price: 18500000,
    priceDisplay: 'Rs. 18.5M',
    priceRating: 'Good Price',
    location: 'Galle',
    mileage: '29,000 km',
    fuel: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    condition: 'Used',
    category: 'Cars',
    emissionClass: 'Euro 6d-TEMP',
    features: ['Sunroof', 'Memory Seats', 'iDrive', 'Harman Kardon Audio', 'Leather Seats'],
    verified: true,
    seller: 'Island Wheels',
    sellerType: 'Dealer verified',
    sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Luxury line, iDrive system with touchpad, Harman Kardon sound system, sunroof, electric memory seats.',
    safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    id: 'v4',
    name: '2022 Nissan Leaf ZE1 EV',
    shortName: '2022 Nissan Leaf',
    make: 'Nissan',
    model: 'Leaf',
    year: 2022,
    price: 12800000,
    priceDisplay: 'Rs. 12.8M',
    priceRating: 'Super Price',
    location: 'Colombo',
    mileage: '18,000 km',
    fuel: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    condition: 'Used',
    category: 'Electric',
    emissionClass: 'Zero Emission',
    features: ['ProPilot', 'e-Pedal', 'Heated Seats', 'Navigation System'],
    verified: true,
    seller: 'Premium Auto Hub',
    sellerType: 'Verified dealer',
    sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '100% battery health, ProPilot assistance, e-Pedal technology, zero emissions, home charger included.',
    safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    id: 'v5',
    name: '2018 Toyota Prius S Safety',
    shortName: '2018 Toyota Prius',
    make: 'Toyota',
    model: 'Prius',
    year: 2018,
    price: 7400000,
    priceDisplay: 'Rs. 7.4M',
    priceRating: 'High Price',
    location: 'Colombo',
    mileage: '65,000 km',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    condition: 'Used',
    category: 'Cars',
    emissionClass: 'Euro 6',
    features: ['Toyota Safety Sense', 'Head-up Display', 'Blind Spot Monitor', 'Keyless Entry'],
    verified: false,
    seller: 'Kasun Perera',
    sellerType: 'Private seller',
    sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Toyota Safety Sense, Head-up display, blind spot monitor, excellent fuel economy 25km/l.',
    safetyAndTrust: ['Seller verified']
  },
  {
    id: 'v6',
    name: '2021 Suzuki Wagon R FX',
    shortName: '2021 Suzuki Wagon R',
    make: 'Suzuki',
    model: 'Wagon R',
    year: 2021,
    price: 6200000,
    priceDisplay: 'Rs. 6.2M',
    priceRating: 'Fair Price',
    location: 'Kandy',
    mileage: '31,000 km',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    condition: 'Used',
    category: 'Cars',
    emissionClass: 'Euro 6',
    features: ['Keyless Entry', 'Push Start', 'Seat Heaters', 'Power Windows'],
    verified: true,
    seller: 'City Motors Lanka',
    sellerType: 'Dealer verified',
    sellerRating: '4.7 / 5',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Mild hybrid tech, keyless entry, push start, seat heaters, pristine city car.',
    safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    id: 'v7',
    name: '2020 Mercedes-Benz C-Class C200',
    shortName: '2020 Mercedes-Benz C-Class',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2020,
    price: 18500000,
    priceDisplay: 'Rs. 18.5M',
    priceRating: 'Good Price',
    location: 'Galle',
    mileage: '24,000 km',
    fuel: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    condition: 'Used',
    category: 'Cars',
    emissionClass: 'Euro 6d',
    features: ['AMG Line', 'Digital Cockpit', 'Ambient Lighting', 'Panoramic Roof', 'Leather Seats'],
    verified: true,
    seller: 'Island Wheels',
    sellerType: 'Dealer verified',
    sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'AMG line interior, digital cockpit display, 64-color ambient lighting, Panoramic roof.',
    safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    id: 'v8',
    name: '2019 Yamaha FZ V3 FI',
    shortName: '2019 Yamaha FZ',
    make: 'Yamaha',
    model: 'FZ',
    year: 2019,
    price: 1900000,
    priceDisplay: 'Rs. 1.9M',
    priceRating: 'Fair Price',
    location: 'Kurunegala',
    mileage: '18,000 km',
    fuel: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Motorcycle',
    condition: 'Used',
    category: 'Motorcycles',
    emissionClass: 'Euro 4',
    features: ['ABS', 'Tubeless Tires', 'Digital Meter'],
    verified: false,
    seller: 'Kasun Perera',
    sellerType: 'Private seller',
    sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Single owner, ABS braking, new tubeless tires, well maintained with regular service history.',
    safetyAndTrust: ['Seller verified']
  }
];

export const CATEGORIES = [
  { name: 'Cars', icon: 'Car' },
  { name: 'SUVs', icon: 'Shield' },
  { name: 'Vans', icon: 'Truck' },
  { name: 'Motorcycles', icon: 'Bike' },
  { name: 'Electric', icon: 'Zap' },
  { name: 'Commercial', icon: 'Box' }
];

export const DEALERS = [
  {
    id: 'd1',
    name: 'Premium Auto Hub',
    verified: true,
    city: 'Colombo',
    established: 2014,
    description: 'Quality inspected vehicles with transparent pricing and support.',
    listingsCount: 24,
    rating: '4.8 / 5',
    hours: 'Mon–Sat 9:00 AM – 6:00 PM'
  },
  {
    id: 'd2',
    name: 'City Motors Lanka',
    verified: true,
    city: 'Colombo',
    established: 2017,
    description: 'Specialists in Japanese reconditioned imports and luxury sedans.',
    listingsCount: 24,
    rating: '4.6 / 5',
    hours: 'Mon–Sat 9:00 AM – 6:30 PM'
  },
  {
    id: 'd3',
    name: 'Island Wheels',
    verified: true,
    city: 'Colombo',
    established: 2012,
    description: 'European luxury vehicle dealership with full warranty packages.',
    listingsCount: 24,
    rating: '4.9 / 5',
    hours: 'Mon–Sat 8:30 AM – 6:00 PM'
  }
];

export const CHATS = [
  {
    id: 'c1',
    dealer: 'Premium Auto Hub',
    verified: true,
    snippet: 'Is the Corolla still available?',
    messages: [
      { sender: 'them', text: 'Hello! Yes, the 2021 Corolla is available for viewing.' },
      { sender: 'them', text: 'Would you like to schedule a test drive?' }
    ]
  },
  {
    id: 'c2',
    dealer: 'Kasun Perera',
    verified: false,
    snippet: 'Thanks for your enquiry.',
    messages: [
      { sender: 'them', text: 'Thanks for your enquiry regarding the 2018 Prius.' }
    ]
  },
  {
    id: 'c3',
    dealer: 'City Motors',
    verified: true,
    snippet: 'New listing recommendation',
    messages: [
      { sender: 'them', text: 'We just listed a mint 2020 Honda Vezel in Kandy.' }
    ]
  }
];
