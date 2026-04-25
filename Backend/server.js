// server.js
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

let items = [];
const instanceId = uuidv4();

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { name, price, manufacturer, category, description } = req.body;
  if (name && price && manufacturer && category) {
    items.push({ name, price, manufacturer, category, description });
    res.status(201).json({ ok: true });
  } else {
    res.status(400).json({ error: 'Wszystkie pola są wymagane: nazwa, cena, producent, kategoria' });
  }
});

// Usuwanie produktu po indeksie (id = index w tablicy)
app.delete('/items/:id', (req, res) => {
  const idx = parseInt(req.params.id, 10);
  if (!isNaN(idx) && idx >= 0 && idx < items.length) {
    items.splice(idx, 1);
    res.json({ ok: true });
  } else {
    res.status(404).json({ error: 'Nie znaleziono produktu' });
  }
});

app.get('/stats', (req, res) => {
  // Dodatkowe statystyki
  const count = items.length;
  const manufacturers = [...new Set(items.map(i => i.manufacturer))];
  const categories = [...new Set(items.map(i => i.category))];
  const avgPrice = count > 0 ? (items.reduce((sum, i) => sum + parseFloat(i.price), 0) / count).toFixed(2) : 0;
  res.json({
    count,
    instanceId: process.env.INSTANCE_ID || 'unknown',
    manufacturers,
    categories,
    avgPrice
  });
});

app.listen(3000);
