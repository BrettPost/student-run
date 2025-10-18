# StudentRun - React Frontend

A modern, interactive React application for tracking student running progress and classroom management.

## Features

### 🏠 Homepage
- Welcome dashboard with navigation to all sections
- Statistics overview showing active classrooms, students, and achievements
- Quick access to main features

### 🏫 Classroom Management
- View all teachers and their classrooms
- Add new teachers with grade assignments
- Navigate to individual classroom student lists
- Clean, card-based interface for easy navigation

### 👥 Student Management
- View all students in a specific classroom
- Add new students to classrooms
- Track individual student progress with visual progress bars
- Quick access to detailed student views

### 📊 Student Details
- Comprehensive student information display
- Interactive lap tracking with increment/decrement buttons
- Progress visualization with color-coded progress bars
- Achievement tracking and rewards
- Quick action buttons for common tasks

### 🏆 Progress Roadmap
- Visual achievement roadmap showing milestones
- Customizable achievements and rewards
- Class-wide progress statistics
- Interactive progress tracking across all students

## Technology Stack

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the client directory:
```bash
cd StudentRun/studentrun.client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `https://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx   # Main navigation component
│   ├── LoadingSpinner.jsx
│   └── ProgressBar.jsx
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── ClassroomsPage.jsx
│   ├── StudentsPage.jsx
│   ├── StudentDetailsPage.jsx
│   └── ProgressPage.jsx
├── App.jsx             # Main application component
├── App.css            # Custom styles
└── index.css          # Global styles with Tailwind
```

## Key Features

### Interactive Design
- Smooth animations and transitions
- Responsive design for all screen sizes
- Intuitive navigation with breadcrumbs
- Real-time progress updates

### Data Management
- Mock data for development
- State management with React hooks
- Form validation and error handling
- Optimistic UI updates

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast color schemes
- Focus management

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code quality and consistency. All components follow React best practices with:
- Functional components with hooks
- Proper prop validation
- Clean, readable code structure
- Consistent naming conventions

## Customization

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Update routing in `App.jsx`
4. Add navigation items in `Navigation.jsx`

### Styling
- Uses Tailwind CSS for all styling
- Custom CSS in `App.css` and `index.css`
- Responsive design patterns
- Consistent color scheme throughout

## Future Enhancements

- Real API integration
- User authentication
- Data persistence
- Advanced analytics
- Mobile app version
- Offline support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the StudentRun application suite.