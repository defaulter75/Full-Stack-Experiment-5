// app.js
const mongoose = require('mongoose');

// Step 1: Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ Connection Error:', err));

// Step 2: Define the Variant Schema
const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number
});

// Step 3: Define the Product Schema (with nested variants)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [variantSchema]
});

// Step 4: Create the Product Model
const Product = mongoose.model('Product', productSchema);

// Step 5: Insert Sample Data
async function insertSampleProducts() {
  await Product.deleteMany({}); // Clear old data

  const products = [
    {
      name: 'T-Shirt',
      price: 25,
      category: 'Clothing',
      variants: [
        { color: 'Red', size: 'M', stock: 50 },
        { color: 'Blue', size: 'L', stock: 30 }
      ]
    },
    {
      name: 'Sneakers',
      price: 75,
      category: 'Footwear',
      variants: [
        { color: 'White', size: '9', stock: 20 },
        { color: 'Black', size: '10', stock: 15 }
      ]
    },
    {
      name: 'Backpack',
      price: 45,
      category: 'Accessories',
      variants: [
        { color: 'Gray', size: 'Standard', stock: 40 }
      ]
    }
  ];

  await Product.insertMany(products);
  console.log('✅ Sample Products Inserted');
}

// Step 6: Run Queries
async function runQueries() {
  console.log('\nAll Products:');
  console.log(await Product.find());

  console.log('\nFilter by Category (Clothing):');
  console.log(await Product.find({ category: 'Clothing' }));

  console.log('\nProject Only Variant Details:');
  console.log(await Product.find({}, { name: 1, 'variants.color': 1, 'variants.size': 1, _id: 0 }));
}

// Step 7: Run Everything
async function main() {
  await insertSampleProducts();
  await runQueries();
  mongoose.connection.close();
}

main();
