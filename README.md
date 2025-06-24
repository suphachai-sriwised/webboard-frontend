# Webboard Frontend

A modern web forum application built with Next.js 15, React 19, and TypeScript. This application provides a platform for users to create posts, engage in discussions, and manage their content across different communities.

## 🚀 Features

### Authentication
- **Simple Login System**: Username-based authentication with JWT tokens
- **Token Management**: Automatic token expiration handling and cleanup
- **Protected Routes**: Automatic redirection to login for unauthenticated users

### Post Management
- **Create Posts**: Users can create posts with title, content, and community selection
- **View Posts**: Browse all posts with pagination and filtering
- **Post Details**: Detailed view with comments section
- **Search & Filter**: Search posts by content or filter by community categories

### User Experience
- **Personal Dashboard**: "Our Blog" section for managing user's own posts
- **Edit & Delete**: Full CRUD operations for user's posts
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Dynamic content updates without page refresh

### Communities
Support for multiple community categories:
- Community
- History
- Food
- Pets
- Health
- Fashion
- Exercise
- Others

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Frontend**: React 19.0.0 with TypeScript
- **Styling**: Tailwind CSS 4.0
- **Fonts**: Geist Sans & Geist Mono from Google Fonts
- **Build Tool**: Turbopack (Next.js)

## 📁 Project Structure

```
webboard-frontend/
├── app/                          # Next.js App Router directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page (redirects to /posts)
│   ├── favicon.ico              # App icon
│   ├── context.ts               # React context (if needed)
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── posts/
│       ├── page.tsx            # Main posts feed
│       ├── api.ts              # API functions for posts
│       ├── types.ts            # TypeScript interfaces
│       ├── [id]/
│       │   └── page.tsx        # Individual post detail page
│       └── our/
│           └── page.tsx        # User's personal posts management
├── public/                      # Static assets
│   ├── signin-logo.svg         # Login page logo
│   └── *.svg                   # Various icons
├── package.json                # Dependencies and scripts
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Backend API server running on `http://localhost:3001`

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd webboard-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🔌 API Integration

The application connects to a backend API server at `http://localhost:3001` with the following endpoints:

### Authentication
- `POST /auth/login` - User login with username

### Posts
- `GET /posts` - Fetch all posts
- `GET /posts/search?q={query}` - Search posts
- `GET /posts/{id}` - Get specific post with comments
- `POST /posts` - Create new post
- `POST /posts/{id}/comments` - Add comment to post

## 🎨 UI Components & Features

### Navigation
- **Header**: App branding, user profile, and authentication controls
- **Sidebar**: Navigation links to Home and Our Blog sections
- **Responsive**: Automatically hidden on login page

### Post Components
- **Post Cards**: Display post preview with author, timestamp, and community
- **Modal Forms**: Create and edit posts with form validation
- **Comment System**: Threaded comments with user avatars
- **Search Bar**: Real-time search with community filtering

### Authentication Flow
- **Login Page**: Simple username input with branded design
- **Token Storage**: JWT tokens stored in localStorage
- **Auto-logout**: Expired tokens automatically cleared

## 🔒 Security Features

- JWT token validation and expiration checking
- Client-side token cleanup for expired sessions
- Protected routes with automatic redirects
- Input validation on forms

## 🎯 Key Pages

### `/login`
- Clean, branded login interface
- Username-only authentication
- Automatic redirect after successful login

### `/posts` (Home)
- Main feed with all community posts
- Search and filter functionality
- Create new post modal
- Post preview cards with click-to-view details

### `/posts/[id]`
- Detailed post view with full content
- Comments section with add/reply functionality
- Back navigation to main feed

### `/posts/our`
- Personal dashboard for user's posts
- Edit and delete functionality
- Same search/filter capabilities as main feed

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Considerations
- Ensure backend API is accessible from production environment
- Update API base URL if different from `localhost:3001`
- Configure proper CORS settings on backend

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is part of an interview assignment and is for demonstration purposes.

## 🐛 Known Issues & Future Improvements

- Edit post functionality in "Our Blog" section needs backend implementation
- Delete post functionality needs backend API endpoint
- Real-time notifications for new comments
- Image upload support for posts
- User profile management
- Email notifications for post interactions

---

**Note**: This application requires a compatible backend API server to function properly. Ensure the backend is running on `http://localhost:3001` before starting the frontend application.