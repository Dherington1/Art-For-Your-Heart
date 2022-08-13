const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Kids' },
    { name: 'Professional' },
    { name: 'Favorites' },
  
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Glitter',
      category: categories[0]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'glitter.jpeg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Glue',
      category: categories[0]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'glue.jpeg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Paint Droppers',
      category: categories[0]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'paint-drop.jpeg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Paint with brush',
      category: categories[0]._id,
      description:
      'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'paintWbrush.jpeg',
      price: 15.99,
      quantity: 30
    },
    {
      name: 'Safety Scissors',
      category: categories[0]._id,
      description:
      'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'safety.jpeg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Tissue Paper',
      category: categories[0]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'tissue-paper.jpeg',
      price: 5.99,
      quantity: 1000
    },
    {
      name: 'Paint',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'paint.jpeg',
      price: 39.99,
      quantity: 30
    },
    {
      name: 'Book',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'book.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Brown Paper',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'brown-paper.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Bruhes',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'brushes.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Canvas Stand',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'canvas-stand.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Color Pallet',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'color-pallet.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Colored Pencils',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'colored-pencils.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Little Paints',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'little-paint.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Paint Holder',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'paint-thing.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'White Canvas',
      category: categories[2]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'white-canvas.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Shovels',
      category: categories[2]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'shovel.jpeg',
      price: 12.99,
      quantity: 1000
    },
    {
      name: 'Safety Scissors',
      category: categories[2]._id,
      description:
      'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'safety.jpeg',
      price: 9.99,
      quantity: 100
    },

  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});