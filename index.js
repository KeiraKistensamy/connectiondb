// importing

import express from 'express'
import path from 'path'
import { connection } from './config/index.js'

// Creating an express app

const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()

// Middleware

app.use(router, express.static('./static'))

// Endpoints

router.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})

router.get('/users', (req, res) => {
    try{
        const strQry = `
        SELECT firstName, lastName, age, emailAdd
        FROM Users;
        `
        db.query(strQry, (err, results) => {
            //'Not able to fetch all users'
            if (err) throw new Error(err)
                res.json({
                    status: res.statusCode,
                    results
                })
        })
    } catch(e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
})

// Endpoint to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Display all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Display a user based on the primary key
app.get('/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Add a user to the database
app.post('/register', (req, res) => {
  const newUser = { id: userId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user
app.patch('/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete a specific user
app.delete('/user/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

// Display all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Display a product based on the primary key
app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Add a product to the database
app.post('/addProduct', (req, res) => {
  const newProduct = { id: productId++, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
app.patch('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Delete a specific product
app.delete('/product/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex > -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});