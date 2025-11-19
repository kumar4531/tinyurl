# TinyURL - URL Shortener

A simple and efficient URL shortening service built with Node.js, Express, and MongoDB - a bit.ly clone.

## Features

- ✨ Shorten long URLs into compact links
- 🔗 Automatic redirect to original URLs
- 📊 Track click statistics for each shortened URL
- 🚀 Fast and lightweight
- 💾 MongoDB storage with Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tinyurl
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tinyurl
BASE_URL=http://localhost:3000
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### 1. Shorten URL
**POST** `/api/shorten`

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url"
}
```

**Response:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url",
  "shortUrl": "http://localhost:3000/abc1234",
  "shortCode": "abc1234"
}
```

### 2. Get URL Statistics
**GET** `/api/stats/:shortCode`

**Response:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url",
  "shortUrl": "http://localhost:3000/abc1234",
  "shortCode": "abc1234",
  "clicks": 42,
  "createdAt": "2025-11-19T10:30:00.000Z"
}
```

### 3. Redirect to Original URL
**GET** `/:shortCode`

Redirects to the original URL and increments the click counter.

### 4. Health Check
**GET** `/`

**Response:**
```json
{
  "message": "TinyURL API is running",
  "endpoints": {
    "shorten": "POST /api/shorten",
    "stats": "GET /api/stats/:shortCode",
    "redirect": "GET /:shortCode"
  }
}
```

## Testing with cURL

### Shorten a URL:
```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://www.google.com"}'
```

### Get statistics:
```bash
curl http://localhost:3000/api/stats/abc1234
```

### Test redirect:
```bash
curl -L http://localhost:3000/abc1234
```

## Project Structure

```
tinyurl/
├── src/
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── models/
│   │   └── Url.js           # URL schema/model
│   ├── routes/
│   │   └── urlRoutes.js     # API routes
│   └── server.js            # Express server setup
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **nanoid** - Unique ID generator
- **valid-url** - URL validation
- **dotenv** - Environment configuration
- **cors** - Cross-origin resource sharing

## Error Handling

The API handles common errors:
- Invalid URL format
- Missing required fields
- URL not found (404)
- Database connection issues
- Server errors (500)

## License

MIT

## Author

Your Name

---

**Note:** Make sure MongoDB is running before starting the application.
