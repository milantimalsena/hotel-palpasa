require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { connectDb } = require('./config/db');
const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');

const adminAuthRoutes = require('./routes/adminAuthRoutes');
const adminReservationRoutes = require('./routes/adminReservationRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || true,
		credentials: true,
	})
);

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/reservations', adminReservationRoutes);
app.use('/api/reservations', reservationRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

async function start() {
	await connectDb(process.env.MONGODB_URI);
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Backend listening on http://localhost:${port}`);
	});
}

start().catch((err) => {
	// eslint-disable-next-line no-console
	console.error('Failed to start server:', err);
	process.exit(1);
});
