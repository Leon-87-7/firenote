# Notes App

A modern, responsive notes application built with React and Firebase that supports multiple users and priority-based organization.

## Live Demo

🚀 [View Live Application](https://firenote-gray.vercel.app/)

## Features

### Core Functionality
- ✨ Create, edit, and manage notes with rich text support
- 👥 Multi-user support with individual note collections
- 🎯 Priority-based organization (High, Medium, Low)
- 💾 Firebase Firestore backend with localStorage fallback
- 📱 Fully responsive design for mobile and desktop

### User Experience
- 🎨 Dark/Light theme toggle with custom DaisyUI themes
- ⚡ Real-time save indicators
- 📋 Intuitive mobile-first navigation
- 🖥️ Desktop sidebar layout with split-panel editing

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, DaisyUI
- **Backend**: Firebase Firestore
- **Routing**: React Router
- **State Management**: React Context API
- **Icons**: Phosphor React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── pages/              # Route components
├── assets/             # Static assets
└── App.jsx             # Main application component
```

## Development Milestones

### v1.0 - Core Notes Functionality
- Basic note creation and editing
- Local storage persistence
- Responsive UI design
- Mobile/desktop routing

### v2.0 - Priority System
- Priority levels (High, Medium, Low)
- Priority-based sorting

### v2.1 - Cloud Storage
- Firebase Firestore integration
- Real-time data synchronization

### v3.0 - Multi-User Support
- User management system
- Individual user note collections
- User-specific UI flows

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
