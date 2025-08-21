# URL Shortener Microservice

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![freeCodeCamp](https://img.shields.io/badge/freeCodeCamp-Project-brightgreen.svg)](https://www.freecodecamp.org/)

A modern, elegant URL shortening microservice built with Node.js and Express. Transform long URLs into clean, shareable links with comprehensive validation and a beautiful web interface.

## ✨ Features

**Core Functionality**
- URL shortening with automatic ID generation
- DNS validation for submitted URLs
- Automatic redirection to original URLs
- Duplicate URL detection and reuse
- RESTful API design

**Technical Highlights**
- Input validation and sanitization
- Error handling and user feedback
- Environment-based configuration
- CORS support for cross-origin requests
- Responsive web interface
- Memory-based storage (easily upgradeable to database)

**User Experience**
- Clean, modern web interface
- Real-time form validation
- Loading states and animations
- Mobile-responsive design
- Comprehensive API documentation

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mbalay19/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file to configure your preferred port (default is 3000).

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application in action.

## 📖 API Documentation

### Shorten a URL

**Endpoint:** `POST /api/shorturl`

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url"
}
```

**Success Response:**
```json
{
  "original_url": "https://example.com/very-long-url",
  "short_url": 1
}
```

**Error Response:**
```json
{
  "error": "invalid url"
}
```

### Access Shortened URL

**Endpoint:** `GET /api/shorturl/:id`

**Example:** `GET /api/shorturl/1`

**Response:** Automatic redirect to the original URL

**Error Response:**
```json
{
  "error": "short url not found"
}
```

### URL Validation Rules

The service validates URLs according to these criteria:
- Must include `http://` or `https://` protocol
- Must have a valid, resolvable hostname
- Hostname must respond to DNS lookup
- Must follow standard URL format

## 🏗️ Project Structure

```
url-shortener/
├── server.js              # Main application file
├── package.json           # Project dependencies and scripts
├── .env                   # Environment variables (create from .env.example)
├── views/
│   └── index.html        # Web interface
├── public/               # Static assets (CSS, JS, images)
└── README.md            # Project documentation
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-restart)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Server Configuration
PORT=3000

# Future Database Configuration (when upgrading from memory storage)
# DATABASE_URL=mongodb://localhost:27017/urlshortener
# DB_NAME=urlshortener
```

### Code Architecture

**Server Setup (`server.js`)**
The main application file uses Express.js with several key components:
- **Middleware Configuration:** CORS, body parsing, static file serving
- **URL Validation:** Multi-layer validation including format checking and DNS verification
- **Storage System:** In-memory object storage with easy database migration path
- **Error Handling:** Comprehensive error responses for various failure scenarios

**Frontend Interface (`views/index.html`)**
Modern, responsive web interface featuring:
- **Progressive Enhancement:** Works without JavaScript, enhanced with it
- **Real-time Feedback:** Immediate validation and loading states
- **Accessible Design:** WCAG-compliant color contrast and keyboard navigation
- **Mobile-First:** Responsive design that works on all device sizes

## 🧪 Testing

### Manual Testing

1. **Valid URL Shortening**
   ```bash
   curl -X POST http://localhost:3000/api/shorturl \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.freecodecamp.org"}'
   ```

2. **Invalid URL Handling**
   ```bash
   curl -X POST http://localhost:3000/api/shorturl \
     -H "Content-Type: application/json" \
     -d '{"url": "invalid-url"}'
   ```

3. **Redirection Testing**
   ```bash
   curl -I http://localhost:3000/api/shorturl/1
   ```

### freeCodeCamp Tests

This project is designed to pass all freeCodeCamp URL Shortener Microservice tests:
- ✅ Provides own project (not example URL)
- ✅ POST to `/api/shorturl` returns JSON with `original_url` and `short_url`
- ✅ GET to `/api/shorturl/<short_url>` redirects to original URL
- ✅ Invalid URLs return `{ error: 'invalid url' }`

## 🚀 Deployment

### Platform-Specific Instructions

**Render**
1. Connect your GitHub repository
2. Set build command to `npm install`
3. Set start command to `npm start`
4. Add environment variable `PORT` (Render sets this automatically)

**Railway**
1. Connect your GitHub repository
2. Railway auto-detects Node.js and configures deployment
3. Set environment variables in the dashboard

**Heroku**
1. Install Heroku CLI and login
2. Create new app: `heroku create your-app-name`
3. Deploy: `git push heroku main`
4. Open: `heroku open`

**Replit**
1. Import from GitHub repository
2. Run automatically detects Node.js setup
3. Click "Run" to start the server

### Environment Considerations

- Ensure `PORT` environment variable is properly configured
- Set `NODE_ENV=production` for production deployments
- Consider implementing rate limiting for production use
- Plan database migration for persistent storage needs

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Ensure all freeCodeCamp tests still pass

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🎓 Learning Objectives

This project demonstrates proficiency in:
- **Backend Development:** Express.js server setup and configuration
- **API Design:** RESTful endpoint design and implementation
- **Input Validation:** Multi-layer URL validation and sanitization
- **Error Handling:** Comprehensive error responses and user feedback
- **Frontend Integration:** Modern web interface with API consumption
- **Environment Management:** Configuration through environment variables
- **Documentation:** Professional README and code documentation

## 🔗 Links

- **Live Demo:** [Add your deployed URL here]
- **freeCodeCamp Project:** [URL Shortener Microservice](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)
- **Author:** [@Mbalay19](https://github.com/Mbalay19)

## 🙏 Acknowledgments

- [freeCodeCamp](https://www.freecodecamp.org/) for the project inspiration and learning platform
- [Express.js](https://expressjs.com/) for the robust web framework
- [Inter Font](https://rsms.me/inter/) for the beautiful typography
- The open-source community for continuous inspiration and learning

---

**Built by [Mbalay19](https://github.com/Mbalay19)**
