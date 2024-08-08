import express from 'express';
import path from 'path';
import { connection as db } from './config/index.js';

const router = express.Router()
const app = express()
const port = process.env.PORT || 9000

// Middleware
app.use(router, 
    express.static('./static'),
    express.json(),
    express.urlencoded({ 
        extended: true 
    }))

// Endpoint
router.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'));
});

// Display all users
router.get('/users', (req, res) => {
    try {
        const strQry = `
        SELECT userID, userName, userSurname, userAge, userEmail
        FROM Users;
        `;
        db.query(strQry, (err, results) => {
            if (err) throw new Error('Not able to fetch all users');
            res.json({
                status: res.statusCode,
                results
            });
        });
    } catch (e) {
        res.status(404).json({
            msg: e.message
        });
    }
});

// Display a user based on the pk
router.get('/user/:id', (req, res) => {
    try {
        const strQry = `
        SELECT userID, userName, userSurname, userAge, userEmail
        FROM Users
        WHERE userID = ${req.params.id};
        `;
        db.query(strQry, [req.params.id], (err, results) => {
            if (err) throw new Error('Not able to fetch the user');
            if (results.length === 0) {
                res.status(404).send('User not found');
            } else {
                res.json({
                    status: res.statusCode,
                    results
                });
            }
        });
    } catch (e) {
        res.status(404).json({
            msg: e.message
        });
    }
});

// Add a user to the database
router.post('/register', (req, res) => {
    try {
        const { userName, userSurname, userAge, userEmail, userPwd } = req.body;
        const strQry = `
        INSERT INTO Users (userName, userSurname, userAge, userEmail, userPwd)
        VALUES (?, ?, ?, ?, ?);
        `;
        db.query(strQry, [userName, userSurname, userAge, userEmail, userPwd], (err, results) => {
            if (err) throw new Error('Not able to register the user');
            res.status(201).json({
                userID: results.insertId,
                userName,
                userSurname,
                userAge,
                userEmail
            });
        });
    } catch (e) {
        res.status(500).json({
            msg: e.message
        });
    }
});

// Update a user
router.patch('/user/:id', (req, res) => {
    try {
        const strQry = `
        UPDATE Users
        SET ?
        WHERE userID = ?;
        `;
        db.query(strQry, [req.body, req.params.id], (err, results) => {
            if (err) throw new Error('Not able to update the user');
            if (results.affectedRows === 0) {
                res.status(404).send('User not found');
            } else {
                res.json({
                    message: 'User updated'
                });
            }
        });
    } catch (e) {
        res.status(500).json({
            msg: e.message
        });
    }
});

// Delete a user
router.delete('/user/:id', (req, res) => {
    try {
        const strQry = `
        DELETE FROM Users
        WHERE userID = ${req.params.id};
        `;
        db.query(strQry, [req.params.id], (err, results) => {
            if (err) throw new Error('Not able to delete the user');
            if (results.affectedRows === 0) {
                res.status(404).send('User not found');
            } else {
                res.status(204).send();
            }
        });
    } catch (e) {
        res.status(500).json({
            msg: e.message
        });
    }
});

// Display products
router.get('/products', (req, res) => {
    try {
        const strQry = `
        SELECT prodID, prodName, prodQuantity, prodPrice, prodURL, userID
        FROM Products;
        `;
        db.query(strQry, (err, results) => {
            if (err) throw new Error('Not able to fetch all products');
            res.json({
                status: res.statusCode,
                results
            });
        });
    } catch (e) {
        res.status(404).json({
            msg: e.message
        });
    }
});

// Display a product based on the primary key
router.get('/product/:id', (req, res) => {
    try {
        const strQry = `
        SELECT prodID, prodName, prodQuantity, prodPrice, prodURL, userID
        FROM Products
        WHERE prodID = ${req.params.id};
        `;
        db.query(strQry, [req.params.id], (err, results) => {
            if (err) throw new Error('Not able to fetch the product');
            if (results.length === 0) {
                res.status(404).send('Product not found');
            } else {
                res.json({
                    status: res.statusCode,
                    results
                });
            }
        });
    } catch (e) {
        res.status(404).json({
            msg: e.message
        });
    }
});

// Add a product to the database
router.post('/addProduct', (req, res) => {
    try {
        const { prodName, prodQuantity, prodPrice, prodURL, userID } = req.body;
        const strQry = `
        INSERT INTO Products (prodName, prodQuantity, prodPrice, prodURL, userID)
        VALUES (?, ?, ?, ?, ?);
        `;
        db.query(strQry, [prodName, prodQuantity, prodPrice, prodURL, userID], (err, results) => {
            if (err) throw new Error('Not able to add the product');
            res.status(201).json({
                prodID: results.insertId,
                prodName,
                prodQuantity,
                prodPrice,
                prodURL,
                userID
            });
        });
    } catch (e) {
        res.status(500).json({
            msg: e.message
        });
    }
});

// Update a product
router.patch('/product/:id', (req, res) => {
    try {
        const strQry = `
        UPDATE Products
        SET ?
        WHERE prodID = ?;
        `;
        db.query(strQry, [req.body, req.params.id], (err, results) => {
            if (err) throw new Error('Not able to update the product');
            if (results.affectedRows === 0) {
                res.status(404).send('Product not found');
            } else {
                res.json({
                    message: 'Product updated'
                });
            }
        });
    } catch (e) {
        res.status(500).json({
            msg: e.message
        });
    }
});

// Delete a specific product
router.delete('/product/:id', (req, res) => {
    try {
        const strQry = `
        DELETE FROM Products
        WHERE prodID = ?;
        `;
        db.query(strQry, [req.params.id], (err, results) => {
            if (err) throw new Error('Not able to delete the product');
            if (results.affectedRows === 0) {
                res.status(404).send('Product not found');
            } else {
                res.status(204).send();
            }
        });
    } catch (e) {
        res.status(500).json({
            msg: e.message
        });
    }
});

router.get('*', (req, res) => {
    res.json({
        status: 404,
        msg: 'Route not found'
    })
})
app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
})
