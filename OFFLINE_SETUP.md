# TCA Student Hub - Offline Application

This is a complete offline-capable React application that has been converted from a base44-dependent app to a fully self-contained system with Electron desktop support.

## Key Changes Made

### 1. **Removed Base44 Dependencies**
   - Removed `@base44/sdk` and `@base44/vite-plugin`
   - Created `offlineClient.js` - a complete replacement for base44 that uses localStorage for data persistence
   - All data is stored locally on the device

### 2. **Offline Functionality**
   - All data is stored in browser's localStorage
   - No internet connection required
   - All features work offline:
     - User authentication
     - Student management
     - Exam creation and taking
     - Grades and results
     - Payments tracking
     - Course management
     - Materials and assignments

### 3. **Desktop Application (Electron)**
   - Full Electron integration for Windows/Mac/Linux
   - Can be packaged as `.exe` installer
   - Runs as a native desktop application
   - All offline features work in desktop version

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Install Dependencies

```bash
npm install
```

This installs:
- React and dependencies
- Electron for desktop app
- electron-builder for creating installers
- uuid for ID generation
- All UI and utility libraries

## Running the Application

### Web Version (Development)

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Web Version (Production Build)

```bash
npm run build
npm run preview
```

### Desktop Version (Development)

In one terminal, start the dev server:
```bash
npm run dev
```

In another terminal, launch Electron:
```bash
npm run electron
```

Or run both together:
```bash
npm run electron-dev
```

## Creating EXE Installer

### Build Windows Installer

```bash
npm run electron-build-installer
```

This will create:
- `dist/TCA Student Hub Setup 1.0.0.exe` - The installer
- `dist/TCA Student Hub 1.0.0.exe` - Portable version
- `dist/` - Other platform files

The installer will:
- Install the application in Program Files
- Create Start Menu shortcuts
- Create Desktop shortcut
- Allow custom installation directory
- Handle uninstall properly

### Customize Installer

Edit the `build` section in `package.json` to customize:
- Product name
- Application ID
- Icon
- Installation options
- Directory locations

## Offline Data Management

### Available Entities (Local Storage)

The application stores the following entity types:
- `User` - System users (admin, staff, students)
- `Student` - Student profiles
- `Course` - Courses
- `Exam` - Examinations
- `ExamQuestion` - Exam questions
- `StudentExamAttempt` - Student exam attempts
- `StudentGrade` - Grades
- `Payment` - Payment records
- `StudentCourse` - Course enrollments
- `Material` - Course materials
- `Assignment` - Assignments
- `StudentAssignment` - Student assignment submissions
- `Notification` - Notifications
- `PaymentMethod` - Payment methods
- `StudentCard` - Student ID cards

### Data Export/Import

```javascript
import { base44 } from '@/api/base44Client';

// Export all data
const backup = await base44.exportAllData();
const jsonString = JSON.stringify(backup);
// Save to file

// Import data
const backup = JSON.parse(jsonString);
await base44.importData(backup);
```

### Clear All Data

```javascript
await base44.clearAllData();
```

## Default Credentials

On first run, a default admin user is created:
- **Email**: `admin@tca.edu`
- **Password**: (offline mode - just enter the email to login)

## Architecture

### File Structure

```
src/
  api/
    base44Client.js       # Legacy compatibility wrapper
    offlineClient.js      # Main offline data service
  components/            # React components
  pages/                 # Page components
  lib/                   # Utilities and helpers
  utils/                 # Helper functions
electron.js            # Electron main process
preload.js            # Electron preload script
vite.config.js        # Vite build config
package.json          # Dependencies and scripts
```

### Offline Client API

#### Authentication
```javascript
const user = await base44.auth.me();           // Get current user
await base44.auth.login(email, password);      // Login
await base44.auth.logout();                    // Logout
await base44.auth.register(userData);          // Register user
```

#### Entity Operations
```javascript
// List all records (with optional sorting)
const students = await base44.entities.Student.list('-created_date');

// Get single record
const student = await base44.entities.Student.get(id);

// Create record
const newStudent = await base44.entities.Student.create({ name: '...' });

// Update record
const updated = await base44.entities.Student.update(id, { name: '...' });

// Delete record
await base44.entities.Student.delete(id);

// Filter records
const filtered = base44.entities.Student.filter({ status: 'active' });
```

## Building for Different Platforms

### Windows (x64)
```bash
npm run electron-build-installer
```

### Mac
```bash
npm run electron-build -- --mac
```

### Linux
```bash
npm run electron-build -- --linux
```

## Troubleshooting

### Electron doesn't start
- Ensure Vite dev server is running on port 5173
- Check for port conflicts: `npm run dev`

### Installer won't create
- Ensure you have Windows Build Tools installed
- Try building on Windows/Mac for respective platforms

### Data not persisting
- Check browser localStorage limits (usually 5-10MB)
- For large data, consider database migration

### Port 5173 already in use
```bash
npx kill-port 5173
npm run dev
```

## Development Notes

- All imports of base44 automatically use the new offlineClient
- localStorage data persists across sessions
- Session data (current user) stored in sessionStorage
- No external API calls required
- All features are self-contained

## License

Internal use only

## Support

For issues or questions about the conversion from base44 to offline mode, refer to:
1. `src/api/offlineClient.js` - Main implementation
2. `src/api/base44Client.js` - Compatibility wrapper
3. This README

