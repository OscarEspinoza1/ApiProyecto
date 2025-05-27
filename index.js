const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); 
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'foodchainuser',
  host: process.env.DB_HOST || 'dpg-d0qgi0buibrs73ejekc0-a.ohio-postgres.render.com',
  database: process.env.DB_NAME || 'food_chains',
  password: process.env.DB_PASS || 'mKWJnwEei5hGpwL1k0dMSnsNsqwUUJBy',
  port: process.env.PG_PORT || 5432,
  dburl: process.env.DB_URL || 'postgresql://foodchainsuser:mKWJnwEei5hGpwL1k0dMSnsNsqwUUJBy@dpg-d0qgi0buibrs73ejekc0-a.ohio-postgres.render.com/food_chains',
  ssl: {
    rejectUnauthorized: false 
  }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('/api-docs'); // Redirige a Swagger UI
  });

// Swagger configuración
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Cadenas de Comida',
        version: '1.0.0',
        description: 'Documentación Swagger para Cadenas de Comida',
    },
    servers: [{ url: `https://apiproyecto-apfi.onrender.com` }],
};
const options = {
    swaggerDefinition,
    apis: ['./index.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CRUD Restaurantes

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Obtiene todos los restaurantes
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 *       500:
 *         description: Error del servidor
 */
app.get('/api/restaurants', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM restaurants');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Obtiene un restaurante por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del restaurante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurante encontrado
 *       404:
 *         description: Restaurante no encontrado
 *       500:
 *         description: Error del servidor
 */
app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM restaurants WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Crea un nuevo restaurante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Restaurante creado
 *       500:
 *         description: Error del servidor
 */
app.post('/api/restaurants', async (req, res) => {
    const { name, address, phone } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO restaurants (name, address, phone) VALUES ($1, $2, $3) RETURNING *',
            [name, address, phone]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Actualiza un restaurante por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurante actualizado
 *       500:
 *         description: Error del servidor
 */
app.put('/api/restaurants/:id', async (req, res) => {
    const { name, address, phone } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE restaurants SET name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *',
            [name, address, phone, req.params.id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Elimina un restaurante por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurante eliminado
 *       500:
 *         description: Error del servidor
 */
app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM restaurants WHERE id = $1', [req.params.id]);
        res.json({ message: 'Restaurante eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CRUD Menús

/**
 * @swagger
 * /api/restaurants/{id}/menus:
 *   get:
 *     summary: Obtiene los menús de un restaurante por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de menús
 *       500:
 *         description: Error del servidor
 */
app.get('/api/restaurants/:id/menus', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM menus WHERE restaurant_id = $1', [req.params.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/restaurants/{id}/menus:
 *   post:
 *     summary: Crea un nuevo menú para un restaurante
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Menú creado
 *       500:
 *         description: Error del servidor
 */
app.post('/api/restaurants/:id/menus', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO menus (restaurant_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.params.id, name, description, price]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: Actualiza un menú por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Menú actualizado
 *       500:
 *         description: Error del servidor
 */
app.put('/api/menus/:id', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE menus SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
            [name, description, price, req.params.id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: Elimina un menú por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menú eliminado
 *       500:
 *         description: Error del servidor
 */
app.delete('/api/menus/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM menus WHERE id = $1', [req.params.id]);
        res.json({ message: 'Menú eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
