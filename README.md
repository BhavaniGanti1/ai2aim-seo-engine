# AI2AIM Marketing Analytics Dashboard

A stunning, fully functional marketing analytics dashboard built with React, Vite, and Tailwind CSS.

## Features

- 📊 **Real-time Analytics** - Live data visualization with interactive charts
- 🎯 **Campaign Management** - Track and manage marketing campaigns
- 👥 **Audience Insights** - Demographics, engagement, and behavior analytics
- 📈 **Performance Reports** - Comprehensive reporting and export capabilities
- 🌙 **Cyberpunk Design** - Modern dark theme with neon accents

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Sidebar.jsx   # Navigation sidebar
│   ├── Header.jsx    # Top header bar
│   ├── KPICard.jsx   # KPI metric cards
│   └── ChartCard.jsx # Chart container component
├── pages/            # Page components
│   ├── Dashboard.jsx # Main dashboard
│   ├── Analytics.jsx # Analytics page
│   ├── Campaigns.jsx # Campaign management
│   ├── Audience.jsx  # Audience insights
│   └── Reports.jsx   # Reports & exports
├── data/             # Mock data
│   └── mockData.js   # Sample data for charts
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Design System

### Colors

- **Void** `#0a0a0f` - Deepest background
- **Obsidian** `#12121a` - Card backgrounds
- **Neon Cyan** `#00f5ff` - Primary accent
- **Neon Magenta** `#ff00ff` - Secondary accent
- **Neon Lime** `#39ff14` - Success states
- **Solar Orange** `#ff6b35` - Warning states
- **Plasma Purple** `#8b5cf6` - Tertiary accent

### Typography

- **Display**: Orbitron (headings)
- **Body**: JetBrains Mono (content)

## License

MIT

