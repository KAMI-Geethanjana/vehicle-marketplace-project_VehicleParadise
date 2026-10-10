require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./database');

const VEHICLES = [
  // SUVs (6)
  {
    name: 'Land Rover Range Rover Sport 2018', shortName: 'Range Rover Sport', make: 'Land Rover', model: 'Range Rover Sport', year: 2018, price: 53500000, stock_qty: 1, priceDisplay: 'Rs. 53.5M', priceRating: 'Premium Price', location: 'Colombo', mileage: '31,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', condition: 'Used', category: 'SUVs', emissionClass: 'Euro 6', features: ['Sunroof', 'Leather Seats', '4WD', 'Premium Audio'], verified: true, seller: 'P N Auto Holdings', sellerType: 'Premium Dealer', sellerRating: '4.8 / 5',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'], description: 'Luxury SUV in mint condition.', safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    name: 'Toyota Land Cruiser Prado TXL 2016', shortName: 'Toyota Prado TXL', make: 'Toyota', model: 'Prado', year: 2016, price: 38500000, stock_qty: 2, priceDisplay: 'Rs. 38.5M', priceRating: 'Good Price', location: 'Kandy', mileage: '65,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', condition: 'Used', category: 'SUVs', emissionClass: 'Euro 5', features: ['7 Seater', 'Sunroof', '4WD'], verified: true, seller: 'Kandy Auto', sellerType: 'Verified Dealer', sellerRating: '4.7 / 5',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Well maintained Prado.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Honda Vezel RS Sensing 2017', shortName: 'Honda Vezel RS', make: 'Honda', model: 'Vezel', year: 2017, price: 11500000, stock_qty: 2, priceDisplay: 'Rs. 11.5M', priceRating: 'Good Price', location: 'Kurunegala', mileage: '45,000 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'SUV', condition: 'Used', category: 'SUVs', emissionClass: 'Euro 6', features: ['Honda Sensing', 'Cruise Control', 'Push Start'], verified: true, seller: 'Kurunegala Auto', sellerType: 'Dealer verified', sellerRating: '4.6 / 5',
    image: 'https://images.unsplash.com/photo-1568844293986-8d0400ba4791?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Honda Vezel RS Sensing 2017 with advanced safety features.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Toyota Raize HYBRID Z 360 BSM 2024', shortName: 'Toyota Raize', make: 'Toyota', model: 'Raize', year: 2024, price: 14095000, stock_qty: 3, priceDisplay: 'Rs. 14.1M', priceRating: 'Fair Price', location: 'Colombo', mileage: '0 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'SUV', condition: 'Brand New', category: 'SUVs', emissionClass: 'Euro 6', features: ['360 Camera', 'BSM', 'Hybrid System'], verified: true, seller: 'Trans Nitro Global', sellerType: 'Plus Dealer', sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Toyota Raize HYBRID Z 360 BSM 2024 Brand New.', safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    name: 'MG ZS EV Trophy Connect 2022', shortName: 'MG ZS EV', make: 'MG', model: 'ZS', year: 2022, price: 12500000, stock_qty: 1, priceDisplay: 'Rs. 12.5M', priceRating: 'Good Price', location: 'Gampaha', mileage: '18,000 km', fuel: 'Electric', transmission: 'Automatic', bodyType: 'SUV', condition: 'Used', category: 'Electric', emissionClass: 'Zero Emission', features: ['Panoramic Sunroof', '360 Camera'], verified: false, seller: 'Kasun Perera', sellerType: 'Private Seller', sellerRating: '4.0 / 5',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Fully electric MG ZS EV.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Nissan X-Trail Hybrid 2018', shortName: 'Nissan X-Trail', make: 'Nissan', model: 'X-Trail', year: 2018, price: 15200000, stock_qty: 2, priceDisplay: 'Rs. 15.2M', priceRating: 'Fair Price', location: 'Galle', mileage: '52,000 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'SUV', condition: 'Used', category: 'SUVs', emissionClass: 'Euro 6', features: ['7 Seater', 'Power Boot'], verified: true, seller: 'Galle Motors', sellerType: 'Dealer', sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Spacious family SUV.', safetyAndTrust: ['Seller verified']
  },

  // Cars (10)
  {
    name: 'Mercedes Benz E350 E 350e-Premium Plus 2016', shortName: 'Mercedes Benz E350', make: 'Mercedes Benz', model: 'E350', year: 2016, price: 28000000, stock_qty: 1, priceDisplay: 'Rs. 28.0M', priceRating: 'Premium Price', location: 'Colombo', mileage: '81,000 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'Saloon', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Premium Plus', 'Leather Seats', 'Sunroof'], verified: false, seller: 'Private Seller', sellerType: 'Private Seller', sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Mercedes Benz E350 E 350e-Premium Plus.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Suzuki Alto LXI 2015', shortName: 'Suzuki Alto', make: 'Suzuki', model: 'Alto', year: 2015, price: 2400000, stock_qty: 4, priceDisplay: 'Rs. 2.4M', priceRating: 'Great Price', location: 'Kandy', mileage: '78,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Hatchback', condition: 'Used', category: 'Cars', emissionClass: 'Euro 4', features: ['A/C', 'Power Steering'], verified: false, seller: 'Saman Silva', sellerType: 'Private Seller', sellerRating: '4.2 / 5',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Well maintained Suzuki Alto for quick sale.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Mitsubishi eK Wagon M Grade Safety 2023', shortName: 'Mitsubishi eK Wagon', make: 'Mitsubishi', model: 'eK Wagon', year: 2023, price: 7150000, stock_qty: 2, priceDisplay: 'Rs. 7.15M', priceRating: 'Good Price', location: 'Gampaha', mileage: '10,160 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Reconditioned', category: 'Cars', emissionClass: 'Euro 6', features: ['Safety Package', 'Keyless Entry'], verified: true, seller: 'P N Auto', sellerType: 'Premium Dealer', sellerRating: '4.8 / 5',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Mitsubishi eK Wagon M Grade Safety 2023.', safetyAndTrust: ['Seller verified', 'Finance eligible']
  },
  {
    name: 'Nissan Dayz PUSH START 4WAY CAM 2024', shortName: 'Nissan Dayz', make: 'Nissan', model: 'Dayz', year: 2024, price: 7975000, stock_qty: 5, priceDisplay: 'Rs. 7.9M', priceRating: 'Fair Price', location: 'Kandy', mileage: '300 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Brand New', category: 'Cars', emissionClass: 'Euro 6', features: ['Push Start', '4WAY CAM', 'Alloy Wheels'], verified: true, seller: 'Kagayaki Enterprises', sellerType: 'Plus Dealer', sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Nissan Dayz Brand New Hatchback.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Toyota Corolla Axio WXB 2018', shortName: 'Toyota Axio WXB', make: 'Toyota', model: 'Axio', year: 2018, price: 11200000, stock_qty: 3, priceDisplay: 'Rs. 11.2M', priceRating: 'Good Price', location: 'Colombo', mileage: '62,000 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'Saloon', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Safety Sense', 'Push Start'], verified: true, seller: 'Colombo Cars', sellerType: 'Dealer', sellerRating: '4.6 / 5',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Toyota Axio WXB in excellent condition.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Honda Civic EX 2019', shortName: 'Honda Civic', make: 'Honda', model: 'Civic', year: 2019, price: 13500000, stock_qty: 1, priceDisplay: 'Rs. 13.5M', priceRating: 'Fair Price', location: 'Negombo', mileage: '40,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Saloon', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Sunroof', 'Leather Seats'], verified: true, seller: 'Auto Hub', sellerType: 'Dealer', sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1537984822441-cff330075342?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Sporty Honda Civic EX.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Suzuki Wagon R Stingray 2018', shortName: 'Suzuki Wagon R', make: 'Suzuki', model: 'Wagon R', year: 2018, price: 5800000, stock_qty: 5, priceDisplay: 'Rs. 5.8M', priceRating: 'Great Price', location: 'Kurunegala', mileage: '55,000 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Push Start', 'Alloy Wheels'], verified: false, seller: 'Nimal', sellerType: 'Private Seller', sellerRating: '4.1 / 5',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Economical Wagon R Stingray.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Toyota Vitz F Grade 2017', shortName: 'Toyota Vitz', make: 'Toyota', model: 'Vitz', year: 2017, price: 6200000, stock_qty: 2, priceDisplay: 'Rs. 6.2M', priceRating: 'Good Price', location: 'Matara', mileage: '68,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Safety Package'], verified: true, seller: 'Southern Auto', sellerType: 'Dealer', sellerRating: '4.4 / 5',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Toyota Vitz F Grade Safety 2017.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'BMW 320d M Sport 2015', shortName: 'BMW 320d', make: 'BMW', model: '3 Series', year: 2015, price: 16500000, stock_qty: 1, priceDisplay: 'Rs. 16.5M', priceRating: 'Fair Price', location: 'Colombo', mileage: '85,000 km', fuel: 'Diesel', transmission: 'Automatic', bodyType: 'Saloon', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['M Sport Package', 'Sunroof'], verified: true, seller: 'Prestige Cars', sellerType: 'Premium Dealer', sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Luxury BMW 320d M Sport.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Audi A4 1.4 TFSI 2018', shortName: 'Audi A4', make: 'Audi', model: 'A4', year: 2018, price: 18500000, stock_qty: 1, priceDisplay: 'Rs. 18.5M', priceRating: 'Premium Price', location: 'Colombo', mileage: '42,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Saloon', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Virtual Cockpit', 'Leather Seats'], verified: true, seller: 'Prestige Cars', sellerType: 'Premium Dealer', sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Audi A4 in pristine condition.', safetyAndTrust: ['Seller verified']
  },

  // Motorcycles (8)
  {
    name: 'TVS NTORQ 125 2022', shortName: 'TVS NTORQ', make: 'TVS', model: 'NTORQ', year: 2022, price: 520000, stock_qty: 1, priceDisplay: 'Rs. 520,000', priceRating: 'Fair Price', location: 'Matara', mileage: '12,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Scooter', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['Digital Meter', 'Bluetooth'], verified: true, seller: 'Matara Bikes', sellerType: 'Dealer verified', sellerRating: '4.7 / 5',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'TVS NTORQ 125 2022 in excellent condition.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Yamaha FZ-S V3 2021', shortName: 'Yamaha FZ-S', make: 'Yamaha', model: 'FZ-S', year: 2021, price: 680000, stock_qty: 3, priceDisplay: 'Rs. 680,000', priceRating: 'Good Price', location: 'Colombo', mileage: '18,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Motorbike', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['ABS', 'Fuel Injection'], verified: true, seller: 'City Bikes', sellerType: 'Dealer', sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Well maintained Yamaha FZ-S.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Honda Dio ZX 2019', shortName: 'Honda Dio', make: 'Honda', model: 'Dio', year: 2019, price: 350000, stock_qty: 4, priceDisplay: 'Rs. 350,000', priceRating: 'Great Price', location: 'Gampaha', mileage: '28,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Scooter', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['Digital Meter'], verified: false, seller: 'Kamal', sellerType: 'Private Seller', sellerRating: '4.1 / 5',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Honda Dio scooter for quick sale.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Bajaj Pulsar 150 2020', shortName: 'Bajaj Pulsar', make: 'Bajaj', model: 'Pulsar', year: 2020, price: 420000, stock_qty: 2, priceDisplay: 'Rs. 420,000', priceRating: 'Fair Price', location: 'Kurunegala', mileage: '22,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Motorbike', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['Twin Spark'], verified: true, seller: 'Wayamba Motors', sellerType: 'Dealer', sellerRating: '4.3 / 5',
    image: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Reliable Bajaj Pulsar 150.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'KTM Duke 200 2018', shortName: 'KTM Duke', make: 'KTM', model: 'Duke 200', year: 2018, price: 850000, stock_qty: 1, priceDisplay: 'Rs. 850,000', priceRating: 'Premium Price', location: 'Colombo', mileage: '15,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Motorbike', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['ABS', 'Liquid Cooling'], verified: true, seller: 'Sport Bikes LK', sellerType: 'Dealer', sellerRating: '4.8 / 5',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Powerful KTM Duke 200.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Royal Enfield Classic 350 2021', shortName: 'Royal Enfield', make: 'Royal Enfield', model: 'Classic', year: 2021, price: 1100000, stock_qty: 1, priceDisplay: 'Rs. 1.1M', priceRating: 'Fair Price', location: 'Kandy', mileage: '10,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Motorbike', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['ABS', 'Alloy Wheels'], verified: true, seller: 'Heritage Motors', sellerType: 'Dealer', sellerRating: '4.6 / 5',
    image: 'https://images.unsplash.com/photo-1601625983582-7e04df75bc1a?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Classic Royal Enfield 350.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Suzuki Gixxer SF 2020', shortName: 'Suzuki Gixxer', make: 'Suzuki', model: 'Gixxer SF', year: 2020, price: 650000, stock_qty: 2, priceDisplay: 'Rs. 650,000', priceRating: 'Good Price', location: 'Galle', mileage: '20,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Motorbike', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['FI', 'ABS'], verified: false, seller: 'Nuwan', sellerType: 'Private Seller', sellerRating: '4.0 / 5',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Sporty Suzuki Gixxer.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Vespa VXL 125 2019', shortName: 'Vespa VXL', make: 'Vespa', model: 'VXL', year: 2019, price: 580000, stock_qty: 1, priceDisplay: 'Rs. 580,000', priceRating: 'Premium Price', location: 'Colombo', mileage: '14,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Scooter', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['Alloy Wheels'], verified: true, seller: 'Colombo Scooters', sellerType: 'Dealer', sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Stylish Vespa VXL.', safetyAndTrust: ['Seller verified']
  },

  // Vans & Commercial (4)
  {
    name: 'Toyota Hiace KDH 201 2015', shortName: 'Toyota Hiace', make: 'Toyota', model: 'Hiace', year: 2015, price: 12500000, stock_qty: 1, priceDisplay: 'Rs. 12.5M', priceRating: 'Fair Price', location: 'Colombo', mileage: '120,000 km', fuel: 'Diesel', transmission: 'Automatic', bodyType: 'Van', condition: 'Used', category: 'Vans', emissionClass: 'Euro 4', features: ['Dual A/C', 'Adjustable Seats'], verified: true, seller: 'Van Mart', sellerType: 'Dealer', sellerRating: '4.6 / 5',
    image: 'https://images.unsplash.com/photo-1522067160751-24018e69cd17?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Toyota Hiace KDH 201 Dual A/C.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Nissan Caravan NV350 2016', shortName: 'Nissan Caravan', make: 'Nissan', model: 'Caravan', year: 2016, price: 9800000, stock_qty: 2, priceDisplay: 'Rs. 9.8M', priceRating: 'Good Price', location: 'Gampaha', mileage: '110,000 km', fuel: 'Diesel', transmission: 'Automatic', bodyType: 'Van', condition: 'Used', category: 'Vans', emissionClass: 'Euro 4', features: ['A/C', 'Power Shutters'], verified: false, seller: 'Silva Transport', sellerType: 'Private Seller', sellerRating: '4.2 / 5',
    image: 'https://images.unsplash.com/photo-1557025114-11116cdebc7c?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Nissan Caravan for transport business.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Suzuki Every DA17V 2018', shortName: 'Suzuki Every', make: 'Suzuki', model: 'Every', year: 2018, price: 4200000, stock_qty: 3, priceDisplay: 'Rs. 4.2M', priceRating: 'Great Price', location: 'Kurunegala', mileage: '65,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Van', condition: 'Used', category: 'Vans', emissionClass: 'Euro 4', features: ['A/C', 'Power Steering'], verified: true, seller: 'Wayamba Auto', sellerType: 'Dealer', sellerRating: '4.4 / 5',
    image: 'https://images.unsplash.com/photo-1518984950422-901d167909eb?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Economical Suzuki Every mini van.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Toyota TownAce 2014', shortName: 'Toyota TownAce', make: 'Toyota', model: 'TownAce', year: 2014, price: 5500000, stock_qty: 1, priceDisplay: 'Rs. 5.5M', priceRating: 'Fair Price', location: 'Kandy', mileage: '135,000 km', fuel: 'Diesel', transmission: 'Manual', bodyType: 'Commercial', condition: 'Used', category: 'Commercial', emissionClass: 'Euro 3', features: ['Flat Bed', 'A/C'], verified: false, seller: 'Rathnayake', sellerType: 'Private Seller', sellerRating: '4.0 / 5',
    image: 'https://images.unsplash.com/photo-1616422378875-927cb099238c?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Reliable Toyota TownAce truck.', safetyAndTrust: ['Seller unverified']
  }
];

const seedDB = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(VEHICLES);
  console.log('Database seeded with ' + VEHICLES.length + ' robust vehicles!');
  
  process.exit();
};

seedDB();
