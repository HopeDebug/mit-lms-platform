# Student Dashboard - React + Ant Design

A modern, responsive student dashboard built with React, TypeScript, and Ant Design. This application provides a comprehensive interface for students to view their course information, track progress, manage assignments, and stay updated with announcements.

## 🚀 Features

### Core Features
- **Course Overview**: Display course progress, enrollment count, and duration
- **Progress Analytics**: Visual progress tracking with charts
- **Course Information**: Detailed course details with collapsible sections
- **Assignments & Assessments**: Organized by terms with status tracking
- **Announcements**: Real-time updates from instructors
- **Course Materials**: Easy access to videos, PDFs, and syllabus
- **Contact Instructor**: Direct messaging functionality
- **Recent Activity**: Timeline of student activities

### Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Professional dark theme with orange/tomato accent colors
- **TypeScript**: Full type safety and better development experience
- **Ant Design**: Modern UI components with consistent design
- **Real-time Updates**: Hot module replacement for development

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Ant Design
- **Build Tool**: Vite
- **Styling**: CSS with Ant Design theme customization
- **Icons**: Ant Design Icons
- **Charts**: Custom Progress Chart component

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd student-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### 4. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
student-dashboard/
├── public/                 # Static assets
│   ├── components/         # React components
│   │   ├── EnrolledCourseDashboard.tsx  # Main dashboard component
│   │   └── ProgressChart.tsx            # Progress visualization
│   ├── assets/            # Images and other assets
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🎨 Design System

### Color Scheme
- **Primary**: Orange (#ff8c00) and Tomato (#ff6347)
- **Background**: Dark (#111, #222, #181818)
- **Text**: White and light gray
- **Accents**: Orange and tomato for highlights

### Components
- **Cards**: Used for content organization
- **Collapse**: For expandable sections
- **Progress Bars**: For visual progress tracking
- **Timeline**: For activity history
- **Statistics**: For key metrics display

## 🤝 Collaboration Guidelines

### Git Workflow

1. **Create a new branch** for each feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

3. **Push your branch** to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub for review

### Commit Message Convention

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### Code Style

- Use TypeScript for all new components
- Follow React functional component patterns
- Use Ant Design components consistently
- Maintain the existing color scheme and styling
- Add proper TypeScript interfaces for all data structures

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Desktop**: > 768px
- **Tablet**: 576px - 768px
- **Mobile**: < 576px

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_API_URL=your-api-url
VITE_APP_TITLE=Student Dashboard
```

### Customization

To customize the theme or add new features:

1. **Theme Colors**: Modify the CSS variables in the main component
2. **New Components**: Add them to the `src/components/` directory
3. **Data Structure**: Update the TypeScript interfaces as needed

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: The dev server will automatically try the next available port
2. **Dependencies not found**: Run `npm install` to reinstall dependencies
3. **TypeScript errors**: Make sure all imports are correct and types are defined

### Development Tips

- Use the browser's developer tools to test responsive design
- Check the console for any TypeScript or runtime errors
- Use the React Developer Tools extension for debugging

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend Developer**: [Your Name]
- **UI/UX Designer**: [Team Member Name]
- **Backend Developer**: [Team Member Name]

## 📞 Support

For questions or issues:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the team through the project's communication channel

---

**Happy Coding! 🎉**
