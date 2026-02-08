# Bloom Period Tracker

Bloom is a private and supportive period tracking companion that helps users track their menstrual cycles, symptoms, and provides personalized insights. The app emphasizes user privacy by storing all data locally on the device, ensuring that sensitive health information remains secure.

Project is open-source and available on GitHub.

## MVP Features
- Period Logging - start/end dates with flow intensity (light, medium, heavy)
- Cycle Calendar - visual month view with period dais highlighted, prediction marked
- Cycle Predictions - based on user's historical data (not generic 28-day assumption)
- Symptom Tracking - cramps, headaches, mood, bloating, fatigue, breast tenderness
- Pain Management Advice - contextual tips when pain is logged
- Anomaly Alerts - Flag irregular cycles, missed periods, unusually long/heavy periods
- Reminder/Alarms - Period aproaching, log reminder, take medication, etc.
- User Profile - age, typical cycle length, health notes
- Data Privacy - all local, with export/import option (for doctor visits, or switching devices)
- PWA Install - works offline, installable on mobile
- Light/Dark Mode - user preference for UI theme

Important Notes:
- Smartwatch integration (stress, weight) is very limited via web/PWA - this would require native app development.
- Push notifications work in PWAs on Android, but are limited on iOS.

## Tech Stack
- React with TypeScript for the frontend
- Vite for development and build tooling
- LocalStorage for data persistence (with export/import functionality)
- Tailwind for styling
- Radix UI for accessible components

## Extra-features (Post-MVP)
- Cycle Insights - personalized tips based on logged symptoms and cycle patterns
- Community Support - anonymous forums or chat groups for users to connect
- Health Data Integration - sync with Apple Health or Google Fit for more comprehensive tracking
- Google Calendar Sync - export cycle predictions to user's calendar
- Google Calendar Import - import events from user's calendar
- Google Calendar Notifications - send notifications based on calendar events (period predictions, reminders, etc.)
- Google Calendar Sync - two-way sync with user's calendar for cycle predictions and reminders
- Smartwatch Integration - sync with wearable devices for passive data collection (stress, weight, sleep)
- AI Chatbot - provide personalized advice and answer user questions based on their data
- Customizable Reminders - allow users to set personalized reminders for various aspects of their cycle and health management
- Data Visualization - advanced charts and graphs to help users understand their cycle patterns and symptoms
- Multi-language Support - offer the app in multiple languages to reach a wider audience
- Accessibility Enhancements - ensure the app is fully accessible to users with disabilities, including screen reader support and keyboard navigation
- Export to PDF - allow users to export their cycle data and insights in a PDF format for easy sharing with healthcare providers
- Integration with Telehealth Services - connect users with healthcare professionals for virtual consultations based on their cycle data and symptoms