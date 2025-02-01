# Devlab Quiz App

A modern React quiz application built with React and Vite, providing an interactive learning experience for web development concepts.

## Features

- Interactive quiz interface with multiple-choice questions
- Timer for each question
- Progress tracking
- Score calculation
- Detailed results summary
- Confetti celebration for completion
- Fallback questions when API is unavailable
- Mobile-responsive design

## Tech Stack

- React 18+ with Hooks
- Vite for development and building
- CSS3 for styling
- RESTful API integration
- Hot Module Replacement (HMR)
- ESLint configuration

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## Project Structure

```
src/
  ├── components/
  │   ├── Quiz.jsx
  │   ├── AnswerSection.jsx
  │   ├── ProgressTracker.jsx
  │   ├── ResultsSummary.jsx
  │   ├── Confetti.jsx
  │   └── LoadingSpinner.jsx
  ├── styles/
  │   └── QuizStyle.css
  └── App.jsx
```

## Author

Charu Sarswat

## License

MIT License

Copyright (c) 2024 Charu Sarswat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
