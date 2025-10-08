# Manpower App

A modern web application for booking local manpower services in Kerala, built for the **Hack4Ease** vibe coding hackathon at **Evolvia**, organized by **IEDC CEV** and **Tinkerhub CEV**.

## Team Information

**Team Name:** TEAM

**Team Members:**
- Sourav K
- Hanin Thaha C K

## Project Overview

This platform connects users with trusted local service providers for essential household and outdoor services such as coconut plucking, tank & well cleaning, housekeeping, and chauffeur services. The application features a modern, responsive interface with user authentication, service selection, and order management capabilities.

## Features

- User authentication (registration and login)
- Service browsing and selection
- Order placement and tracking
- User dashboard for managing orders
- Responsive design with dark mode support
- Real-time order status updates
- Secure payment processing integration

## Tech Stack

**Frontend:**
- Next.js 15.2.4 (React 19)
- TypeScript
- Tailwind CSS
- Radix UI components
- Framer Motion for animations
- Lucide React for icons
- React Hook Form for form management
- Zod for validation

**Backend:**
- Next.js API Routes
- MongoDB for database
- Jose for JWT authentication
- bcryptjs for password hashing

**Additional Tools:**
- SWR for data fetching
- Sonner for toast notifications
- Recharts for data visualization
- next-themes for theme management

## AI-Assisted Development Prompts

This project was developed with AI assistance. Below are the key prompts used during development:

### 1. Initial Project Setup
```
Create a Next.js application for a manpower services booking platform targeting Kerala users. 
Include authentication, service listings, and order management. Use TypeScript, Tailwind CSS, 
and MongoDB.
```

### 2. Authentication System
```
Implement a complete authentication system with user registration and login. Use JWT tokens 
for session management, bcryptjs for password hashing, and create API routes for /api/auth/register, 
/api/auth/login, /api/auth/logout, and /api/auth/me.
```

### 3. UI Components
```
Set up a component library using Radix UI primitives. Create reusable components including buttons, 
cards, forms, dialogs, and navigation. Implement a navbar with authentication state and dark mode toggle.
```

### 4. Service Selection Interface
```
Create a service selector component that displays available manpower services (coconut plucking, 
tank & well cleaning, housekeeping, chauffeur services). Make it visually appealing with icons 
and descriptions.
```

### 5. Order Management
```
Build an order placement flow with form validation using React Hook Form and Zod. Create API 
routes for handling order creation and retrieval. Include an orders page to display user's 
booking history.
```

### 6. Database Integration
```
Set up MongoDB connection with proper connection pooling for Next.js. Create database schemas 
for users, services, and orders. Implement CRUD operations with proper error handling.
```

### 7. Landing Page
```
Design a modern landing page showcasing the services with hero section, features highlights, 
testimonials, and call-to-action buttons. Include responsive design and smooth animations.
```

### 8. Form Components
```
Create login and registration form components with proper validation, error handling, and 
user feedback. Include password strength indicators and real-time validation.
```

### 9. Styling and Theme
```
Implement a cohesive design system with consistent spacing, typography, and color palette. 
Add dark mode support using next-themes and ensure all components are accessible.
```

### 10. Order Success Flow
```
Create an order success page with confirmation details and next steps. Add route transitions 
for smooth navigation between pages.
```

## Local Setup Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sou6av/manpower-app.git
   cd manpower-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **Environment Variable Details:**
   - `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/manpower-app` for local MongoDB or MongoDB Atlas connection string)
   - `JWT_SECRET`: A secure random string for JWT token signing (generate using `openssl rand -base64 32`)
   - `NEXT_PUBLIC_APP_URL`: The base URL of your application

4. **Set up MongoDB Database**

   If using MongoDB Atlas:
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database user with read/write permissions
   - Whitelist your IP address or allow access from anywhere (0.0.0.0/0)
   - Copy the connection string and replace `<password>` with your database user password

   If using local MongoDB:
   - Ensure MongoDB service is running
   - Use connection string: `mongodb://localhost:27017/manpower-app`

5. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Project Structure

```
manpower-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── orders/       # Order management endpoints
│   │   └── services/     # Service endpoints
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── order/            # Order placement pages
│   ├── orders/           # Orders listing page
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── orders/           # Order-related components
│   ├── services/         # Service components
│   └── ui/               # UI component library
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database connection
│   ├── utils.ts          # Helper functions
│   └── validators.ts     # Validation schemas
├── public/               # Static assets
└── styles/               # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Troubleshooting

**MongoDB Connection Issues:**
- Verify your `MONGODB_URI` is correct in `.env.local`
- Check MongoDB service is running (for local installations)
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify database user credentials are correct

**Port Already in Use:**
- Change the port by running: `npm run dev -- -p 3001`

**Build Errors:**
- Clear Next.js cache: Delete `.next` folder and run `npm run dev` again
- Verify all dependencies are installed: `npm install`

**Authentication Issues:**
- Ensure `JWT_SECRET` is set in `.env.local`
- Check browser cookies are enabled
- Clear browser cache and cookies for localhost

## Features Overview

### User Authentication
- Secure registration with password hashing
- JWT-based session management
- Protected routes and API endpoints
- Logout functionality

### Service Booking
- Browse available services
- View detailed service descriptions
- Select service and fill booking form
- Receive order confirmation

### Order Management
- View all placed orders
- Track order status
- Access order history
- Download invoices

### User Experience
- Responsive design for all devices
- Dark mode support
- Smooth page transitions
- Toast notifications for user feedback
- Form validation with helpful error messages

## Contributing

This project was created for the Hack4Ease hackathon. If you'd like to contribute or have suggestions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is created for educational purposes as part of the Hack4Ease hackathon.

## Acknowledgments

- **IEDC CEV** and **Tinkerhub CEV** for organizing the Hack4Ease hackathon
- **Evolvia** event organizers
- All open-source libraries and tools used in this project
- The local manpower service providers who inspired this solution

## Contact

For questions or feedback about this project:
- Sourav K
- Hanin Thaha C K

---

Built with dedication for Hack4Ease Vibe Coding Hackathon at Evolvia
