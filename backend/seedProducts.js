require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./database');

const VEHICLES = [
  {
    "name": "2019 Mercedes-Benz GLE 250d 4MATIC",
    "shortName": "Mercedes-Benz GLE",
    "make": "Mercedes-Benz",
    "model": "GLE",
    "year": 2019,
    "price": 38500000,
    "priceDisplay": "Rs. 38.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "42,000 km",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "4MATIC All-Wheel Drive",
      "Panoramic Sunroof",
      "Burmester Sound",
      "Air Suspension"
    ],
    "image": "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
    "description": "Mercedes-Benz GLE 250d 4MATIC luxury SUV in polar white, full DIMO service records, panoramic roof and air suspension.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Mercedes-AMG GT S Coupe Bi-Turbo",
    "shortName": "Mercedes-AMG GT S",
    "make": "Mercedes-Benz",
    "model": "AMG GT S",
    "year": 2020,
    "price": 62000000,
    "priceDisplay": "Rs. 62.0M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "14,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "4.0L Bi-Turbo V8",
      "AMG Performance Exhaust",
      "Yellow Brake Calipers",
      "Panamericana Grill"
    ],
    "image": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    "description": "Matte grey Mercedes-AMG GT S Coupe with yellow performance brake calipers, handcrafted 515 HP V8 biturbo engine.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Mercedes-AMG GT R Coupe V8",
    "shortName": "Mercedes-AMG GT R",
    "make": "Mercedes-Benz",
    "model": "AMG GT R",
    "year": 2021,
    "price": 68000000,
    "priceDisplay": "Rs. 68.0M",
    "priceRating": "Premium Price",
    "location": "Colombo",
    "mileage": "9,500 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "Panamericana Front Grill",
      "577 HP V8 Biturbo",
      "Carbon Ceramic Brakes",
      "Active Aerodynamics"
    ],
    "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    "description": "Stunning crimson red Mercedes-AMG GT R Coupe with signature Panamericana grille, carbon ceramic brakes, DIMO maintained.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 BMW 5 Series 520d M Sport",
    "shortName": "BMW 5 Series",
    "make": "BMW",
    "model": "5 Series",
    "year": 2020,
    "price": 24500000,
    "priceDisplay": "Rs. 24.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "34,000 km",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "M Sport Package",
      "BMW Live Cockpit Professional",
      "Harmon Kardon Audio",
      "Sunroof"
    ],
    "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    "description": "Alpine white BMW 5 Series M Sport with iconic BMW kidney grille, laser headlights, Prestige Automobile history.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 BMW M3 Competition 3.0 Twin-Turbo",
    "shortName": "BMW M3 Competition",
    "make": "BMW",
    "model": "M3 Competition",
    "year": 2021,
    "price": 48000000,
    "priceDisplay": "Rs. 48.0M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "16,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "503 HP S58 Twin-Turbo",
      "Carbon Fiber Roof",
      "M Carbon Bucket Seats",
      "Laserlight Headlamps"
    ],
    "image": "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80",
    "description": "Black Sapphire BMW M3 Competition with carbon fiber roof, track package, 0-100 km/h in 3.8s.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2019 BMW 4 Series 420i Gran Coupe M Sport",
    "shortName": "BMW 4 Series",
    "make": "BMW",
    "model": "4 Series",
    "year": 2019,
    "price": 18500000,
    "priceDisplay": "Rs. 18.5M",
    "priceRating": "Good Price",
    "location": "Galle",
    "mileage": "38,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "Estoril Blue Metallic",
      "Frameless Doors",
      "M Aerodynamics",
      "Electric Leather Seats"
    ],
    "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    "description": "BMW 420i Gran Coupe M Sport in Estoril blue, sleek 4-door coupe styling with spacious boot.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Toyota Camry 2.5 VVT-i Hybrid",
    "shortName": "Toyota Camry Hybrid",
    "make": "Toyota",
    "model": "Camry",
    "year": 2021,
    "price": 22500000,
    "priceDisplay": "Rs. 22.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "24,000 km",
    "fuel": "Hybrid",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "Toyota Safety Sense 2.5",
      "JBL Premium Audio",
      "Leather Memory Seats",
      "Dual Zone Climate"
    ],
    "image": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
    "description": "Toyota Camry 2.5 Hybrid luxury sedan in dark metallic grey, exceptional fuel efficiency with executive comfort.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Toyota RAV4 2.5 Hybrid AWD-i",
    "shortName": "Toyota RAV4 Hybrid",
    "make": "Toyota",
    "model": "RAV4",
    "year": 2021,
    "price": 26500000,
    "priceDisplay": "Rs. 26.5M",
    "priceRating": "Good Price",
    "location": "Kandy",
    "mileage": "29,000 km",
    "fuel": "Hybrid",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "Electronic All-Wheel Drive",
      "Panoramic Glass Roof",
      "Power Tailgate",
      "Toyota Safety Sense"
    ],
    "image": "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80",
    "description": "Toyota RAV4 Hybrid AWD in silver metallic, Sri Lanka's favorite premium family SUV with Toyota agent service records.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Volkswagen Polo 1.0 TSI Highline",
    "shortName": "Volkswagen Polo",
    "make": "Volkswagen",
    "model": "Polo",
    "year": 2020,
    "price": 7800000,
    "priceDisplay": "Rs. 7.8M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "32,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Hatchback",
    "category": "Cars",
    "features": [
      "1.0L Turbo TSI Engine",
      "7-Speed DSG Automatic",
      "Apple CarPlay & Android Auto",
      "Alloy Wheels"
    ],
    "image": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    "description": "Volkswagen Polo 1.0 TSI Highline in blue metallic, German engineering with excellent city agility and fuel economy.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Nissan Juke 1.0 DiG-T Tekna",
    "shortName": "Nissan Juke",
    "make": "Nissan",
    "model": "Juke",
    "year": 2021,
    "price": 13500000,
    "priceDisplay": "Rs. 13.5M",
    "priceRating": "Fair Price",
    "location": "Gampaha",
    "mileage": "26,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "ProPILOT Driver Assist",
      "Bose Personal Plus Audio",
      "Two-Tone Body Styling",
      "19-inch Diamond Alloys"
    ],
    "image": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
    "description": "Nissan Juke Tekna SUV in silver with bold V-motion grille, 360 camera, Bose headrest speakers, fully loaded.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2019 Nissan GT-R Premium R35 3.8L V6 Twin-Turbo",
    "shortName": "Nissan GT-R R35",
    "make": "Nissan",
    "model": "GT-R",
    "year": 2019,
    "price": 52000000,
    "priceDisplay": "Rs. 52.0M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "18,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "565 HP VR38DETT Engine",
      "ATTESA E-TS All-Wheel Drive",
      "Brembo Monoblock Brakes",
      "Bose Audio"
    ],
    "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "description": "Legendary \"Godzilla\" Nissan GT-R R35 Premium in pearl white with iconic quad round taillights, pristine collector condition.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Ford Expedition Limited 4WD",
    "shortName": "Ford Expedition",
    "make": "Ford",
    "model": "Expedition",
    "year": 2020,
    "price": 42000000,
    "priceDisplay": "Rs. 42.0M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "36,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "3.5L EcoBoost V6 Twin-Turbo",
      "ControlTrac 4WD",
      "8-Passenger Leather Seating",
      "B&O Sound System"
    ],
    "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    "description": "Ford Expedition Limited full-size American 4WD SUV in Oxford white, massive cabin space with heavy-duty towing capacity.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Ford F-150 Lariat 4x4 SuperCrew",
    "shortName": "Ford F-150 Lariat",
    "make": "Ford",
    "model": "F-150",
    "year": 2021,
    "price": 36000000,
    "priceDisplay": "Rs. 36.0M",
    "priceRating": "Good Price",
    "location": "Kurunegala",
    "mileage": "31,000 km",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "FX4 Off-Road Package",
      "Twin-Panel Moonroof",
      "12-inch SYNC 4 Touchscreen",
      "Power Tailgate"
    ],
    "image": "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80",
    "description": "Ford F-150 Lariat SuperCrew 4x4 in velocity blue with chrome grille, ultimate utility with luxury leather interior.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2019 Land Rover Range Rover Sport SDV6",
    "shortName": "Range Rover Sport",
    "make": "Land Rover",
    "model": "Range Rover Sport",
    "year": 2019,
    "price": 46000000,
    "priceDisplay": "Rs. 46.0M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "38,000 km",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "Terrain Response 2",
      "Electronic Air Suspension",
      "Meridian Surround Sound",
      "Matrix LED Headlights"
    ],
    "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "description": "Range Rover Sport SDV6 in Santorini black with Range Rover bonnet lettering, air suspension and SML records.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2018 Honda CR-V 2.0 i-VTEC AWD",
    "shortName": "Honda CR-V",
    "make": "Honda",
    "model": "CR-V",
    "year": 2018,
    "price": 17500000,
    "priceDisplay": "Rs. 17.5M",
    "priceRating": "Good Price",
    "location": "Kandy",
    "mileage": "49,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "Real Time AWD",
      "Honda Sensing Suite",
      "Power Moonroof",
      "Leather Interior"
    ],
    "image": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    "description": "Honda CR-V 2.0 i-VTEC in taffeta white with prominent Honda chrome grille, reliable Japanese AWD family SUV.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 Tesla Model 3 Long Range Dual Motor",
    "shortName": "Tesla Model 3",
    "make": "Tesla",
    "model": "Model 3",
    "year": 2022,
    "price": 21500000,
    "priceDisplay": "Rs. 21.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "15,000 km",
    "fuel": "Electric",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Electric",
    "features": [
      "Dual Motor All-Wheel Drive",
      "580 km Pure EV Range",
      "Autopilot Hardware",
      "15-inch Touchscreen"
    ],
    "image": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    "description": "Pearl white Tesla Model 3 Long Range with glass roof, all-black premium interior, home wall charger included.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 Tesla Model S Plaid AWD",
    "shortName": "Tesla Model S Plaid",
    "make": "Tesla",
    "model": "Model S",
    "year": 2022,
    "price": 49500000,
    "priceDisplay": "Rs. 49.5M",
    "priceRating": "Premium Price",
    "location": "Colombo",
    "mileage": "11,000 km",
    "fuel": "Electric",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Electric",
    "features": [
      "1,020 HP Tri-Motor AWD",
      "0-100 km/h in 2.1s",
      "Yoke Steering",
      "Cinematic Gaming Screen"
    ],
    "image": "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1200&q=80",
    "description": "Deep metallic blue Tesla Model S Plaid, the quickest accelerating production sedan in the world, with Tesla showroom pedigree.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2023 Tesla Roadster 2.0 Founders Edition",
    "shortName": "Tesla Roadster",
    "make": "Tesla",
    "model": "Roadster",
    "year": 2023,
    "price": 95000000,
    "priceDisplay": "Rs. 95.0M",
    "priceRating": "Premium Price",
    "location": "Colombo",
    "mileage": "2,000 km",
    "fuel": "Electric",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Electric",
    "features": [
      "All-Wheel Drive Supercar",
      "Removable Glass Roof",
      "Over 1,000 km Range",
      "SpaceX Thruster Package"
    ],
    "image": "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    "description": "Glacier white Tesla Roadster 2.0 hypercar displayed in official Tesla gallery, revolutionary electric performance.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Audi RS 7 Sportback 4.0 TFSI Quattro",
    "shortName": "Audi RS 7",
    "make": "Audi",
    "model": "RS 7",
    "year": 2021,
    "price": 54000000,
    "priceDisplay": "Rs. 54.0M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "19,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "591 HP Twin-Turbo V8",
      "Quattro Sport Differential",
      "Bang & Olufsen 3D Sound",
      "RS Sport Exhaust"
    ],
    "image": "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=80",
    "description": "Audi RS 7 Sportback in Nardo grey with embossed \"RS 7 Sportback\" badge and honeycomb singleframe grille.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Audi A5 Sportback 40 TFSI S-Line",
    "shortName": "Audi A5 Sportback",
    "make": "Audi",
    "model": "A5",
    "year": 2020,
    "price": 21500000,
    "priceDisplay": "Rs. 21.5M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "33,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "S-Line Exterior Package",
      "Matrix LED with Dynamic Indicators",
      "Virtual Cockpit Plus",
      "Sunroof"
    ],
    "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    "description": "Ibis white Audi A5 Sportback 4-door coupe with S-Line styling, digital virtual cockpit, and agent service history.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Porsche Panamera Turbo 4.0L V8",
    "shortName": "Porsche Panamera Turbo",
    "make": "Porsche",
    "model": "Panamera",
    "year": 2020,
    "price": 64000000,
    "priceDisplay": "Rs. 64.0M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "22,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "542 HP 4.0L V8 Twin-Turbo",
      "Adaptive Air Suspension",
      "Deployable Rear Spoiler",
      "Sport Chrono Package"
    ],
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "description": "Jet black Porsche Panamera Turbo with active deployable rear spoiler and full Porsche Centre Colombo service history.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Ford Mustang GT 5.0 V8 Steeda Edition",
    "shortName": "Ford Mustang GT",
    "make": "Ford",
    "model": "Mustang",
    "year": 2020,
    "price": 32000000,
    "priceDisplay": "Rs. 32.0M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "21,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "5.0L Coyote V8 Engine",
      "Steeda Performance Package",
      "Active Valve Exhaust",
      "Brembo 6-Piston Brakes"
    ],
    "image": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    "description": "Magnetic grey Ford Mustang GT with Steeda windshield banner and pony grille emblem, pure American V8 sound.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Chevrolet Camaro SS 6.2L V8",
    "shortName": "Chevrolet Camaro SS",
    "make": "Chevrolet",
    "model": "Camaro",
    "year": 2020,
    "price": 29500000,
    "priceDisplay": "Rs. 29.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "19,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "455 HP 6.2L LT1 V8",
      "Dual-Mode Performance Exhaust",
      "Brembo Performance Brakes",
      "Bose Audio"
    ],
    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    "description": "Riverside blue metallic Chevrolet Camaro SS with black hood scoop, Chevrolet bowtie grille badge and roaring V8.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Ferrari LaFerrari V12 Hybrid Hypercar",
    "shortName": "Ferrari LaFerrari",
    "make": "Ferrari",
    "model": "LaFerrari",
    "year": 2021,
    "price": 280000000,
    "priceDisplay": "Rs. 280M",
    "priceRating": "Premium Price",
    "location": "Colombo",
    "mileage": "3,800 km",
    "fuel": "Hybrid",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "950 HP 6.3L V12 + HY-KERS",
      "Carbon Fiber Monocoque",
      "Formula 1 Inspired Cockpit",
      "Collector Masterpiece"
    ],
    "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    "description": "Rosso Corsa Ferrari LaFerrari hypercar with legendary Prancing Horse badge, ultimate pinnacle of automotive engineering.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 KTM RC 390 ABS Sport",
    "shortName": "KTM RC 390",
    "make": "KTM",
    "model": "RC 390",
    "year": 2021,
    "price": 2450000,
    "priceDisplay": "Rs. 2.45M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "8,500 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "373cc Single Cylinder Engine",
      "WP Apex Suspension",
      "ByBre Brakes with Bosch ABS",
      "Clip-On Handlebars"
    ],
    "image": "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1200&q=80",
    "description": "White & orange KTM RC 390 track-focused sport motorcycle with iconic trellis frame, carefully maintained with service book.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Ducati SuperSport 950 Rosso",
    "shortName": "Ducati SuperSport",
    "make": "Ducati",
    "model": "SuperSport 950",
    "year": 2021,
    "price": 4950000,
    "priceDisplay": "Rs. 4.95M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "6,200 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "937cc Testastretta 11° Engine",
      "Ducati Quick Shift Up/Down",
      "Brembo M4-32 Monobloc Brakes",
      "Riding Modes"
    ],
    "image": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    "description": "Ducati SuperSport 950 in racing Rosso red, Italian superbike design with daytime running LED and full dealer records.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Harley-Davidson LiveWire All-Electric",
    "shortName": "Harley-Davidson LiveWire",
    "make": "Harley-Davidson",
    "model": "LiveWire",
    "year": 2021,
    "price": 6800000,
    "priceDisplay": "Rs. 6.8M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "4,500 km",
    "fuel": "Electric",
    "transmission": "Automatic",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "Revelation Electric Motor",
      "0-100 km/h in 3.0s",
      "Showa Separate Function Big Piston Suspension",
      "DC Fast Charge"
    ],
    "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    "description": "Orange & black Harley-Davidson LiveWire groundbreaking electric motorcycle, instantaneous torque with futuristic design.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2019 Harley-Davidson Softail Standard 107",
    "shortName": "Harley Softail Standard",
    "make": "Harley-Davidson",
    "model": "Softail Standard",
    "year": 2019,
    "price": 5200000,
    "priceDisplay": "Rs. 5.2M",
    "priceRating": "Good Price",
    "location": "Negombo",
    "mileage": "12,000 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "Milwaukee-Eight 107 V-Twin",
      "Classic Spoke Wheels",
      "Dual Shotgun Exhaust",
      "Low-Slung Solo Seat"
    ],
    "image": "https://images.unsplash.com/photo-1558980663-3685c1d673c4?auto=format&fit=crop&w=1200&q=80",
    "description": "Vivid black Harley-Davidson Softail cruiser with authentic Milwaukee-Eight 1746cc V-twin engine and custom chrome touches.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1558980663-3685c1d673c4?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Harley-Davidson Street Bob 114",
    "shortName": "Harley Street Bob",
    "make": "Harley-Davidson",
    "model": "Street Bob",
    "year": 2020,
    "price": 5800000,
    "priceDisplay": "Rs. 5.8M",
    "priceRating": "Fair Price",
    "location": "Galle",
    "mileage": "9,800 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "Milwaukee-Eight 114 Engine",
      "Mini-Ape Handlebars",
      "Digital Gauge Instrumentation",
      "Blacked-Out Styling"
    ],
    "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    "description": "Harley-Davidson Street Bob 114 bobber motorcycle in gloss black, raw highway power with deep signature rumble.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Kawasaki Ninja ZX-6R Lime Green",
    "shortName": "Kawasaki Ninja ZX-6R",
    "make": "Kawasaki",
    "model": "Ninja ZX-6R",
    "year": 2021,
    "price": 3850000,
    "priceDisplay": "Rs. 3.85M",
    "priceRating": "Good Price",
    "location": "Kurunegala",
    "mileage": "7,400 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "636cc Inline-4 Engine",
      "Kawasaki Quick Shifter (KQS)",
      "Showa SFF-BP Fork",
      "Ninja Racing Graphics"
    ],
    "image": "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80",
    "description": "Lime green Kawasaki Ninja ZX-6R super sport bike with Ninja decals, race-proven handling and exhilarating power.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "Prestige Auto Hub",
    "sellerType": "Dealer verified",
    "sellerRating": "4.9 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Mercedes-Benz GLE 300d 4MATIC AMG Line",
    "shortName": "Mercedes-Benz GLE 300d",
    "make": "Mercedes-Benz",
    "model": "GLE",
    "year": 2021,
    "price": 43000000,
    "priceDisplay": "Rs. 43.0M",
    "priceRating": "Good Price",
    "location": "Kandy",
    "mileage": "28,000 km",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "4MATIC All-Wheel Drive",
      "Panoramic Sunroof",
      "Burmester Sound",
      "Air Suspension"
    ],
    "image": "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
    "description": "Mercedes-Benz GLE 250d 4MATIC luxury SUV in polar white, full DIMO service records, panoramic roof and air suspension.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Mercedes-AMG GT S Coupe Edition 50",
    "shortName": "Mercedes-AMG GT S",
    "make": "Mercedes-Benz",
    "model": "AMG GT S",
    "year": 2021,
    "price": 66000000,
    "priceDisplay": "Rs. 66.0M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "11,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "4.0L Bi-Turbo V8",
      "AMG Performance Exhaust",
      "Yellow Brake Calipers",
      "Panamericana Grill"
    ],
    "image": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    "description": "Matte grey Mercedes-AMG GT S Coupe with yellow performance brake calipers, handcrafted 515 HP V8 biturbo engine.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 BMW 5 Series 530e iPerformance M Sport",
    "shortName": "BMW 530e M Sport",
    "make": "BMW",
    "model": "5 Series",
    "year": 2021,
    "price": 27500000,
    "priceDisplay": "Rs. 27.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "22,000 km",
    "fuel": "Hybrid",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "M Sport Package",
      "BMW Live Cockpit Professional",
      "Harmon Kardon Audio",
      "Sunroof"
    ],
    "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    "description": "Alpine white BMW 5 Series M Sport with iconic BMW kidney grille, laser headlights, Prestige Automobile history.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 BMW M3 Competition xDrive",
    "shortName": "BMW M3 Competition",
    "make": "BMW",
    "model": "M3 Competition",
    "year": 2022,
    "price": 52000000,
    "priceDisplay": "Rs. 52.0M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "12,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "503 HP S58 Twin-Turbo",
      "Carbon Fiber Roof",
      "M Carbon Bucket Seats",
      "Laserlight Headlamps"
    ],
    "image": "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80",
    "description": "Black Sapphire BMW M3 Competition with carbon fiber roof, track package, 0-100 km/h in 3.8s.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 BMW 4 Series 430i Coupe M Sport",
    "shortName": "BMW 430i Coupe",
    "make": "BMW",
    "model": "4 Series",
    "year": 2020,
    "price": 21500000,
    "priceDisplay": "Rs. 21.5M",
    "priceRating": "Good Price",
    "location": "Negombo",
    "mileage": "31,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "Estoril Blue Metallic",
      "Frameless Doors",
      "M Aerodynamics",
      "Electric Leather Seats"
    ],
    "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    "description": "BMW 420i Gran Coupe M Sport in Estoril blue, sleek 4-door coupe styling with spacious boot.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Toyota Camry 2.5 G Luxury",
    "shortName": "Toyota Camry G",
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "price": 19800000,
    "priceDisplay": "Rs. 19.8M",
    "priceRating": "Good Price",
    "location": "Gampaha",
    "mileage": "38,000 km",
    "fuel": "Hybrid",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "Toyota Safety Sense 2.5",
      "JBL Premium Audio",
      "Leather Memory Seats",
      "Dual Zone Climate"
    ],
    "image": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
    "description": "Toyota Camry 2.5 Hybrid luxury sedan in dark metallic grey, exceptional fuel efficiency with executive comfort.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 Toyota RAV4 Adventure 2.5 Hybrid AWD",
    "shortName": "Toyota RAV4 Adventure",
    "make": "Toyota",
    "model": "RAV4",
    "year": 2022,
    "price": 28500000,
    "priceDisplay": "Rs. 28.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "18,000 km",
    "fuel": "Hybrid",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "Electronic All-Wheel Drive",
      "Panoramic Glass Roof",
      "Power Tailgate",
      "Toyota Safety Sense"
    ],
    "image": "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80",
    "description": "Toyota RAV4 Hybrid AWD in silver metallic, Sri Lanka's favorite premium family SUV with Toyota agent service records.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2019 Volkswagen Polo GT TSI Turbo",
    "shortName": "Volkswagen Polo GT",
    "make": "Volkswagen",
    "model": "Polo",
    "year": 2019,
    "price": 7200000,
    "priceDisplay": "Rs. 7.2M",
    "priceRating": "Good Price",
    "location": "Kurunegala",
    "mileage": "44,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Hatchback",
    "category": "Cars",
    "features": [
      "1.0L Turbo TSI Engine",
      "7-Speed DSG Automatic",
      "Apple CarPlay & Android Auto",
      "Alloy Wheels"
    ],
    "image": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    "description": "Volkswagen Polo 1.0 TSI Highline in blue metallic, German engineering with excellent city agility and fuel economy.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Nissan Juke N-Connecta AWD",
    "shortName": "Nissan Juke AWD",
    "make": "Nissan",
    "model": "Juke",
    "year": 2020,
    "price": 12800000,
    "priceDisplay": "Rs. 12.8M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "34,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "ProPILOT Driver Assist",
      "Bose Personal Plus Audio",
      "Two-Tone Body Styling",
      "19-inch Diamond Alloys"
    ],
    "image": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
    "description": "Nissan Juke Tekna SUV in silver with bold V-motion grille, 360 camera, Bose headrest speakers, fully loaded.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Nissan GT-R Nismo Edition R35",
    "shortName": "Nissan GT-R Nismo",
    "make": "Nissan",
    "model": "GT-R",
    "year": 2021,
    "price": 58000000,
    "priceDisplay": "Rs. 58.0M",
    "priceRating": "Fair Price",
    "location": "Colombo",
    "mileage": "12,500 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "565 HP VR38DETT Engine",
      "ATTESA E-TS All-Wheel Drive",
      "Brembo Monoblock Brakes",
      "Bose Audio"
    ],
    "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "description": "Legendary \"Godzilla\" Nissan GT-R R35 Premium in pearl white with iconic quad round taillights, pristine collector condition.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Ford Expedition Platinum MAX 4WD",
    "shortName": "Ford Expedition Platinum",
    "make": "Ford",
    "model": "Expedition",
    "year": 2021,
    "price": 45000000,
    "priceDisplay": "Rs. 45.0M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "27,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "3.5L EcoBoost V6 Twin-Turbo",
      "ControlTrac 4WD",
      "8-Passenger Leather Seating",
      "B&O Sound System"
    ],
    "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    "description": "Ford Expedition Limited full-size American 4WD SUV in Oxford white, massive cabin space with heavy-duty towing capacity.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 Ford F-150 Tremor Off-Road 4x4",
    "shortName": "Ford F-150 Tremor",
    "make": "Ford",
    "model": "F-150",
    "year": 2022,
    "price": 39500000,
    "priceDisplay": "Rs. 39.5M",
    "priceRating": "Good Price",
    "location": "Galle",
    "mileage": "21,000 km",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "FX4 Off-Road Package",
      "Twin-Panel Moonroof",
      "12-inch SYNC 4 Touchscreen",
      "Power Tailgate"
    ],
    "image": "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80",
    "description": "Ford F-150 Lariat SuperCrew 4x4 in velocity blue with chrome grille, ultimate utility with luxury leather interior.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Land Rover Range Rover Sport HSE Dynamic",
    "shortName": "Range Rover Sport HSE",
    "make": "Land Rover",
    "model": "Range Rover Sport",
    "year": 2020,
    "price": 49500000,
    "priceDisplay": "Rs. 49.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "31,000 km",
    "fuel": "Diesel",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "Terrain Response 2",
      "Electronic Air Suspension",
      "Meridian Surround Sound",
      "Matrix LED Headlights"
    ],
    "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "description": "Range Rover Sport SDV6 in Santorini black with Range Rover bonnet lettering, air suspension and SML records.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2019 Honda CR-V 1.5 VTEC Turbo 7-Seater",
    "shortName": "Honda CR-V Turbo",
    "make": "Honda",
    "model": "CR-V",
    "year": 2019,
    "price": 18900000,
    "priceDisplay": "Rs. 18.9M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "41,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "SUV",
    "category": "SUVs",
    "features": [
      "Real Time AWD",
      "Honda Sensing Suite",
      "Power Moonroof",
      "Leather Interior"
    ],
    "image": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    "description": "Honda CR-V 2.0 i-VTEC in taffeta white with prominent Honda chrome grille, reliable Japanese AWD family SUV.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Tesla Model 3 Standard Range Plus",
    "shortName": "Tesla Model 3 SR+",
    "make": "Tesla",
    "model": "Model 3",
    "year": 2021,
    "price": 18500000,
    "priceDisplay": "Rs. 18.5M",
    "priceRating": "Good Price",
    "location": "Negombo",
    "mileage": "27,000 km",
    "fuel": "Electric",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Electric",
    "features": [
      "Dual Motor All-Wheel Drive",
      "580 km Pure EV Range",
      "Autopilot Hardware",
      "15-inch Touchscreen"
    ],
    "image": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    "description": "Pearl white Tesla Model 3 Long Range with glass roof, all-black premium interior, home wall charger included.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Tesla Model S Long Range Plus AWD",
    "shortName": "Tesla Model S Long Range",
    "make": "Tesla",
    "model": "Model S",
    "year": 2020,
    "price": 38000000,
    "priceDisplay": "Rs. 38.0M",
    "priceRating": "Premium Price",
    "location": "Colombo",
    "mileage": "29,000 km",
    "fuel": "Electric",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Electric",
    "features": [
      "1,020 HP Tri-Motor AWD",
      "0-100 km/h in 2.1s",
      "Yoke Steering",
      "Cinematic Gaming Screen"
    ],
    "image": "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1200&q=80",
    "description": "Deep metallic blue Tesla Model S Plaid, the quickest accelerating production sedan in the world, with Tesla showroom pedigree.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2020 Audi RS 7 Sportback Carbon Black",
    "shortName": "Audi RS 7 Carbon",
    "make": "Audi",
    "model": "RS 7",
    "year": 2020,
    "price": 51000000,
    "priceDisplay": "Rs. 51.0M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "24,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Sedan",
    "category": "Cars",
    "features": [
      "591 HP Twin-Turbo V8",
      "Quattro Sport Differential",
      "Bang & Olufsen 3D Sound",
      "RS Sport Exhaust"
    ],
    "image": "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=80",
    "description": "Audi RS 7 Sportback in Nardo grey with embossed \"RS 7 Sportback\" badge and honeycomb singleframe grille.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2019 Ford Mustang GT Premium 5.0 V8",
    "shortName": "Ford Mustang GT Premium",
    "make": "Ford",
    "model": "Mustang",
    "year": 2019,
    "price": 29000000,
    "priceDisplay": "Rs. 29.0M",
    "priceRating": "Good Price",
    "location": "Kandy",
    "mileage": "29,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "5.0L Coyote V8 Engine",
      "Steeda Performance Package",
      "Active Valve Exhaust",
      "Brembo 6-Piston Brakes"
    ],
    "image": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    "description": "Magnetic grey Ford Mustang GT with Steeda windshield banner and pony grille emblem, pure American V8 sound.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2021 Chevrolet Camaro SS 1LE Track Package",
    "shortName": "Chevrolet Camaro 1LE",
    "make": "Chevrolet",
    "model": "Camaro",
    "year": 2021,
    "price": 31500000,
    "priceDisplay": "Rs. 31.5M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "16,000 km",
    "fuel": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Coupe",
    "category": "Cars",
    "features": [
      "455 HP 6.2L LT1 V8",
      "Dual-Mode Performance Exhaust",
      "Brembo Performance Brakes",
      "Bose Audio"
    ],
    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    "description": "Riverside blue metallic Chevrolet Camaro SS with black hood scoop, Chevrolet bowtie grille badge and roaring V8.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 KTM RC 390 GP Special Edition",
    "shortName": "KTM RC 390 GP",
    "make": "KTM",
    "model": "RC 390",
    "year": 2022,
    "price": 2650000,
    "priceDisplay": "Rs. 2.65M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "5,000 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "373cc Single Cylinder Engine",
      "WP Apex Suspension",
      "ByBre Brakes with Bosch ABS",
      "Clip-On Handlebars"
    ],
    "image": "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1200&q=80",
    "description": "White & orange KTM RC 390 track-focused sport motorcycle with iconic trellis frame, carefully maintained with service book.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 Ducati SuperSport 950 S Ohlins",
    "shortName": "Ducati SuperSport S",
    "make": "Ducati",
    "model": "SuperSport 950",
    "year": 2022,
    "price": 5400000,
    "priceDisplay": "Rs. 5.4M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "4,200 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "937cc Testastretta 11° Engine",
      "Ducati Quick Shift Up/Down",
      "Brembo M4-32 Monobloc Brakes",
      "Riding Modes"
    ],
    "image": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    "description": "Ducati SuperSport 950 in racing Rosso red, Italian superbike design with daytime running LED and full dealer records.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  },
  {
    "name": "2022 Kawasaki Ninja ZX-6R KRT Edition",
    "shortName": "Kawasaki Ninja KRT",
    "make": "Kawasaki",
    "model": "Ninja ZX-6R",
    "year": 2022,
    "price": 4100000,
    "priceDisplay": "Rs. 4.1M",
    "priceRating": "Good Price",
    "location": "Colombo",
    "mileage": "5,500 km",
    "fuel": "Petrol",
    "transmission": "Manual",
    "bodyType": "Motorcycle",
    "category": "Motorcycles",
    "features": [
      "636cc Inline-4 Engine",
      "Kawasaki Quick Shifter (KQS)",
      "Showa SFF-BP Fork",
      "Ninja Racing Graphics"
    ],
    "image": "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80",
    "description": "Lime green Kawasaki Ninja ZX-6R super sport bike with Ninja decals, race-proven handling and exhilarating power.",
    "condition": "Used",
    "emissionClass": "Euro 6",
    "verified": true,
    "seller": "City Motors Lanka",
    "sellerType": "Dealer verified",
    "sellerRating": "4.8 / 5",
    "gallery": [
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80"
    ],
    "safetyAndTrust": [
      "Seller verified",
      "Finance eligible"
    ],
    "stock_qty": 2
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(VEHICLES);
    console.log('✅ MongoDB database seeded with ' + VEHICLES.length + ' vehicles perfectly matched to photos!');

    // Clear only the admin user or create if not exists
    await User.deleteOne({ email: 'admin@vehicleparadise.com' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = new User({
      full_name: 'System Admin',
      email: 'admin@vehicleparadise.com',
      password_hash: hashedPassword,
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('✅ Admin user created: admin@vehicleparadise.com / admin123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
};

seedDB();
