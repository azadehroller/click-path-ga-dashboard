# Roller Analytics Dashboard

A comprehensive analytics dashboard for visualizing user journey and conversion data for the Roller website.

## Features

- **Overview Metrics**: Quick stats on total visitors, conversion rates, session times, and bounce rates
- **Form Submission Journey**: Complete funnel analysis showing the path from landing to form submission
- **Path Exploration**: Visual representation of user paths leading to form conversions (based on GA4 data)
- **Get Started Flow**: Analysis of how users reach and interact with the Get Started page
- **Navigation Patterns**: Insights into how users navigate through the website
- **User Acquisition**: Channel analysis showing traffic sources and their performance
- **High-Converting Paths**: Identification of the most successful user journeys

## Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with React wrapper
- **UI Components**: React for interactive elements
- **Data Storage**: JSON files for persistent data

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Data Sources

The dashboard uses data from multiple sources:

- `src/data/form-submission-flow.json` - Form conversion funnel data
- `src/data/get-started-flow.json` - Get Started page journey data
- `src/data/navigation-patterns.json` - Website navigation analytics
- `src/data/user-acquisition.json` - Traffic channel and acquisition data (from GA4)
- `src/data/path-exploration.json` - User path analysis leading to conversions (from GA4)

All data is based on real Google Analytics 4 exports from the Roller website (Jan 1, 2025 - Sep 25, 2025).

## Dashboard Sections

### 1. Overview Metrics
High-level KPIs with trend indicators

### 2. Form Submission Journey
- Conversion funnel visualization
- Device performance breakdown
- Drop-off analysis
- Step-by-step path exploration to form submission

### 3. Get Started Page Journey
- Traffic sources to Get Started page
- Conversion funnel for onboarding
- Top performing CTAs

### 4. Website Navigation Patterns
- Top pages by traffic
- Page engagement scores (radar chart)
- User flow paths (Sankey-style visualization)
- Scroll depth analysis

### 5. User Acquisition Channels
- Traffic by channel (pie chart)
- Conversion rates by channel
- Social media breakdown
- Geographic distribution
- Weekly trends

### 6. High-Converting User Paths
- Most common successful user journeys
- Conversion rates for each path

## Customization

To update the data:
1. Export your data from Google Analytics 4
2. Update the corresponding JSON files in `src/data/`
3. The dashboard will automatically reflect the new data

## License

© 2025 Roller. All rights reserved.