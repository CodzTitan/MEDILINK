/**
 * MEDILINK Micro-Backend API
 * Simple Node.js / Express Server deployed to Render.com
 * Handles optional SMS Refill reminders & Supabase proxy routes.
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'MEDILINK API Engine',
    timestamp: new Date().toISOString()
  });
});

// Trigger SMS Refill Reminder API Endpoint (Simulated)
app.post('/api/notify-refill', (req, res) => {
  const { patientPhone, patientName, refillDueDate, prescriptionId } = req.body;

  if (!patientPhone) {
    return res.status(400).json({ error: 'patientPhone is required' });
  }

  console.log(`[SMS SERVICE] Triggering Refill SMS to ${patientPhone}: "Hi ${patientName}, your medicine refill for Rx #${prescriptionId} is due on ${refillDueDate}. Visit any nearest partner pharmacy for instant digital verification."`);

  res.json({
    success: true,
    message: `Refill notification SMS queued for ${patientPhone}`,
    rxId: prescriptionId
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 MEDILINK Express API listening on port ${PORT}`);
});
