# Disk Scheduling Algorithm Visualizer

An interactive web application for visualizing and understanding disk scheduling algorithms used in operating systems.

## 🚀 Features

### Modern UI/UX
- **Beautiful Home Page**: Modern gradient design with animated hero section
- **Interactive Algorithm Cards**: Hover effects and visual icons for each algorithm
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience

### 2D Visualization
- **Chart.js Integration**: Interactive 2D line charts showing disk head movement
- **Dual Visualization Modes**: 
  - **1D Track View**: Traditional horizontal track visualization
  - **2D Chart View**: Modern line chart with step-by-step progression
- **Real-time Updates**: Live visualization as you step through the algorithm
- **Interactive Tooltips**: Hover to see detailed information about each step

### Supported Algorithms
1. **FCFS (First Come First Serve)** - Services requests in arrival order
2. **SSTF (Shortest Seek Time First)** - Always moves to nearest request
3. **SCAN (Elevator Algorithm)** - Moves back and forth across the disk
4. **LOOK** - SCAN variant that only goes as far as the last request
5. **C-SCAN (Circular SCAN)** - Treats disk as circular, no return service
6. **C-LOOK** - LOOK variant with circular behavior

### Interactive Controls
- **Step-by-step Navigation**: Previous/Next buttons to control visualization
- **Auto Play**: Automatic progression through the algorithm
- **Real-time Statistics**: Total seek time, current position, and progress tracking
- **Algorithm Selection**: Easy switching between different algorithms
- **Custom Parameters**: Set initial head position, requests, and direction

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Chart.js** - Powerful charting library for 2D visualizations
- **Framer Motion** - Animation library for smooth transitions
- **CSS-in-JS** - Scoped styling with styled-jsx

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Disk-Scheduler
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Getting Started
1. **Home Page**: Learn about different disk scheduling algorithms
2. **Visualization**: Click "Start Visualization" to begin
3. **Configure**: Set your algorithm, head position, and requests
4. **Explore**: Use the toggle to switch between 1D and 2D views
5. **Control**: Use Previous/Next buttons or Auto Play to step through

### Example Input
- **Head Position**: 50
- **Requests**: 98, 183, 37, 122, 14, 124, 65, 67
- **Algorithm**: SSTF
- **Direction**: Right (for SCAN/LOOK algorithms)

## 🎨 UI Improvements

### Home Page Enhancements
- **Hero Section**: Animated disk visualization with gradient text
- **Algorithm Cards**: Modern cards with icons, colors, and hover effects
- **Statistics Display**: Key metrics prominently displayed
- **Call-to-Action**: Clear navigation to visualization

### Visualization Page Improvements
- **Modern Layout**: Clean, organized interface with proper spacing
- **Algorithm Selector**: Grid layout with descriptions
- **Visualization Toggle**: Easy switching between 1D and 2D modes
- **Enhanced Controls**: Better button styling and icons
- **Statistics Panel**: Real-time metrics in card format

### 2D Chart Features
- **Line Chart**: Shows head movement over time
- **Multiple Datasets**: 
  - Head movement path (blue line)
  - Request points (pink dots)
  - Current position (red diamond)
- **Interactive Tooltips**: Detailed information on hover
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Chart updates with transitions

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── AlgorithmCard.jsx      # Algorithm information cards
│   ├── HeadMovement.jsx       # 1D track visualization
│   └── HeadMovement2D.jsx     # 2D chart visualization
├── pages/
│   ├── Home.jsx              # Home page with algorithm info
│   └── Visualize.jsx         # Main visualization page
├── App.jsx                   # Main app component
└── main.jsx                  # App entry point
```

### Key Components

#### HeadMovement2D.jsx
- Uses Chart.js for 2D line chart visualization
- Shows head movement path, request points, and current position
- Interactive tooltips and responsive design
- Real-time updates based on current step

#### AlgorithmCard.jsx
- Modern card design with hover effects
- Color-coded for different algorithms
- Icons and descriptions for better UX

#### Visualize.jsx
- Dual visualization mode support
- Enhanced UI with modern styling
- Improved algorithm selection interface
- Better control panel with icons

## 🎓 Educational Value

This application is perfect for:
- **Computer Science Students** learning about operating systems
- **System Administrators** understanding disk I/O optimization
- **Software Engineers** studying algorithm efficiency
- **Educators** teaching disk scheduling concepts

## 🚀 Future Enhancements

- [ ] Add more disk scheduling algorithms
- [ ] Performance comparison between algorithms
- [ ] Export visualization as images/videos
- [ ] Multiple disk simulation
- [ ] Real-time request generation
- [ ] Algorithm performance metrics

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for educational purposes**

