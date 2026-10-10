require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./database');

const RIYASEWANA_VEHICLES = [
  // Sri Lankan Popular Cars
  {
    name: 'Toyota Aqua S Grade 2014', shortName: 'Toyota Aqua', make: 'Toyota', model: 'Aqua', year: 2014, price: 5400000, stock_qty: 3, priceDisplay: 'Rs. 5,400,000', priceRating: 'Great Price', location: 'Maharagama', mileage: '85,000 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Used', category: 'Cars', emissionClass: 'Euro 5', features: ['Push Start', 'Multifunction'], verified: true, seller: 'Riyasewana Seller', sellerType: 'Private Seller', sellerRating: '4.3 / 5',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Toyota Aqua S grade mint condition.', safetyAndTrust: ['Finance eligible']
  },
  {
    name: 'Honda Fit GP5 2015', shortName: 'Honda Fit GP5', make: 'Honda', model: 'Fit', year: 2015, price: 6200000, stock_qty: 2, priceDisplay: 'Rs. 6,200,000', priceRating: 'Fair Price', location: 'Malabe', mileage: '72,000 km', fuel: 'Hybrid', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Used', category: 'Cars', emissionClass: 'Euro 5', features: ['Cruise Control', 'Alloy Wheels'], verified: false, seller: 'Nuwan', sellerType: 'Private Seller', sellerRating: '4.1 / 5',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Honda Fit GP5 S Package.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Suzuki Swift RS 2018', shortName: 'Suzuki Swift', make: 'Suzuki', model: 'Swift', year: 2018, price: 7800000, stock_qty: 4, priceDisplay: 'Rs. 7,800,000', priceRating: 'Good Price', location: 'Nugegoda', mileage: '45,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Safety Package', 'Paddle Shift'], verified: true, seller: 'Auto Mart', sellerType: 'Dealer verified', sellerRating: '4.8 / 5',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Suzuki Swift RS Turbo.', safetyAndTrust: ['Seller verified']
  },
  {
    name: 'Nissan Leaf G Grade 2013', shortName: 'Nissan Leaf', make: 'Nissan', model: 'Leaf', year: 2013, price: 2900000, stock_qty: 2, priceDisplay: 'Rs. 2,900,000', priceRating: 'Great Price', location: 'Kelaniya', mileage: '92,000 km', fuel: 'Electric', transmission: 'Automatic', bodyType: 'Hatchback', condition: 'Used', category: 'Electric', emissionClass: 'Zero Emission', features: ['Seat Heaters', 'Reverse Camera'], verified: false, seller: 'Pathum', sellerType: 'Private Seller', sellerRating: '3.9 / 5',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Nissan Leaf EV for daily use. 7 bars remaining.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Toyota Premio F EX 2017', shortName: 'Toyota Premio', make: 'Toyota', model: 'Premio', year: 2017, price: 15800000, stock_qty: 1, priceDisplay: 'Rs. 15.8M', priceRating: 'Premium Price', location: 'Colombo 6', mileage: '38,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'Saloon', condition: 'Used', category: 'Cars', emissionClass: 'Euro 6', features: ['Beige Interior', 'Electric Seats'], verified: true, seller: 'Prestige Auto', sellerType: 'Premium Dealer', sellerRating: '4.9 / 5',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Toyota Premio highest grade F EX package.', safetyAndTrust: ['Seller verified']
  },
  
  // Sri Lankan Popular SUVs
  {
    name: 'Micro Kyron 2.0 2012', shortName: 'Micro Kyron', make: 'Micro', model: 'Kyron', year: 2012, price: 3800000, stock_qty: 2, priceDisplay: 'Rs. 3,800,000', priceRating: 'Great Price', location: 'Kurunegala', mileage: '120,000 km', fuel: 'Diesel', transmission: 'Manual', bodyType: 'SUV', condition: 'Used', category: 'SUVs', emissionClass: 'Euro 3', features: ['4WD', 'Alloy Wheels'], verified: false, seller: 'Kamal', sellerType: 'Private Seller', sellerRating: '4.0 / 5',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Micro Kyron Jeep.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Hyundai Tucson 2016', shortName: 'Hyundai Tucson', make: 'Hyundai', model: 'Tucson', year: 2016, price: 10500000, stock_qty: 1, priceDisplay: 'Rs. 10.5M', priceRating: 'Fair Price', location: 'Dehiwala', mileage: '60,000 km', fuel: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', condition: 'Used', category: 'SUVs', emissionClass: 'Euro 5', features: ['Panoramic Roof', 'Leather'], verified: true, seller: 'Dehiwala Car Sale', sellerType: 'Dealer', sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Hyundai Tucson fully loaded.', safetyAndTrust: ['Seller verified']
  },

  // Popular Vans & Commercial
  {
    name: 'Toyota KDH 200 Super GL 2010', shortName: 'Toyota KDH', make: 'Toyota', model: 'Hiace', year: 2010, price: 8200000, stock_qty: 1, priceDisplay: 'Rs. 8.2M', priceRating: 'Good Price', location: 'Gampaha', mileage: '180,000 km', fuel: 'Diesel', transmission: 'Automatic', bodyType: 'Van', condition: 'Used', category: 'Vans', emissionClass: 'Euro 4', features: ['Dual A/C', 'Rotatable Seats'], verified: true, seller: 'Gampaha Vans', sellerType: 'Dealer', sellerRating: '4.4 / 5',
    image: 'https://images.unsplash.com/photo-1522067160751-24018e69cd17?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Toyota KDH Super GL original van.', safetyAndTrust: ['Finance eligible']
  },
  {
    name: 'Mahindra Bolero Maxi Truck 2018', shortName: 'Mahindra Bolero', make: 'Mahindra', model: 'Bolero', year: 2018, price: 2800000, stock_qty: 3, priceDisplay: 'Rs. 2,800,000', priceRating: 'Fair Price', location: 'Dambulla', mileage: '95,000 km', fuel: 'Diesel', transmission: 'Manual', bodyType: 'Commercial', condition: 'Used', category: 'Commercial', emissionClass: 'Euro 4', features: ['Flat Bed', 'Heavy Duty Springs'], verified: false, seller: 'Sunil', sellerType: 'Private Seller', sellerRating: '4.2 / 5',
    image: 'https://images.unsplash.com/photo-1616422378875-927cb099238c?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Bolero maxi truck for business.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Bajaj RE 4 Stroke 2019', shortName: 'Bajaj Three Wheeler', make: 'Bajaj', model: 'RE', year: 2019, price: 950000, stock_qty: 5, priceDisplay: 'Rs. 950,000', priceRating: 'Great Price', location: 'Panadura', mileage: '42,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Commercial', condition: 'Used', category: 'Commercial', emissionClass: 'Euro 3', features: ['Modified Audio', 'Alloy Wheels'], verified: true, seller: 'Panadura Motors', sellerType: 'Dealer', sellerRating: '4.1 / 5',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Bajaj Tuk Tuk modified.', safetyAndTrust: ['Seller verified']
  },

  // Popular Bikes
  {
    name: 'Honda CB Hornet 160R 2018', shortName: 'Honda Hornet', make: 'Honda', model: 'Hornet', year: 2018, price: 460000, stock_qty: 2, priceDisplay: 'Rs. 460,000', priceRating: 'Good Price', location: 'Katunayake', mileage: '30,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Motorbike', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 4', features: ['Disc Brakes', 'Digital Meter'], verified: false, seller: 'Kasun', sellerType: 'Private Seller', sellerRating: '4.5 / 5',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Honda Hornet in pristine condition.', safetyAndTrust: ['Seller unverified']
  },
  {
    name: 'Bajaj Discover 125 2016', shortName: 'Bajaj Discover', make: 'Bajaj', model: 'Discover', year: 2016, price: 210000, stock_qty: 4, priceDisplay: 'Rs. 210,000', priceRating: 'Great Price', location: 'Horana', mileage: '55,000 km', fuel: 'Petrol', transmission: 'Manual', bodyType: 'Motorbike', condition: 'Used', category: 'Motorcycles', emissionClass: 'Euro 3', features: ['Self Start'], verified: false, seller: 'Amila', sellerType: 'Private Seller', sellerRating: '3.8 / 5',
    image: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?auto=format&fit=crop&w=800&q=80', gallery: [], description: 'Bajaj Discover for urgent sale.', safetyAndTrust: ['Seller unverified']
  }
];

const seedAdditional = async () => {
  await connectDB();
  await Product.insertMany(RIYASEWANA_VEHICLES);
  console.log(`Added ${RIYASEWANA_VEHICLES.length} new Riyasewana-style vehicles to the DB!`);
  
  const count = await Product.countDocuments();
  console.log(`Total vehicles in database now: ${count}`);
  
  process.exit();
};

seedAdditional();
