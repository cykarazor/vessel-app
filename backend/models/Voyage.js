const mongoose = require('mongoose');

const CargoSchema = new mongoose.Schema({
  type: String,
  quantityUnit: { type: String, enum: ['MT', 'KG'] },
  total: Number,
  rateUSD: Number
});

const VoyageSchema = new mongoose.Schema({
  vesselName: String,
  voyageNumber: String,
  departureDate: Date,
  departurePort: String,
  departureCountry: String,   // <-- Added
  arrivalDate: Date,
  arrivalPort: String,
  arrivalCountry: String,     // <-- Added
  cargo: CargoSchema,
  agent: String,              // <-- Added
  consignee: String,          // <-- Added
  remarks: String
});

module.exports = mongoose.model('Voyage', VoyageSchema);
