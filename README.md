# Pulse Point — Frontend

Frontend for Pulse Point, a platform connecting hospitals with blood donors.
Built with React and Vite, with separate dashboards for donors, hospitals,
and admins.

## Tech Stack

- React 19
- Vite
- React Router (react-router-dom)
- ESLint for linting

## Getting Started

1. Clone the repo and install dependencies:

       git clone https://github.com/404-Fixers/Pulse_Point_FE.git
       cd Pulse_Point_FE
       npm install

2. Run the dev server:

       npm run dev

   Runs at http://localhost:5173 by default. Make sure the backend
   (Pulse_Point_BE) is running locally too, since the frontend talks
   to it directly.

## Available Scripts

| Command | Description |
|---|---|
| npm run dev | Start the Vite dev server with hot reload |
| npm run build | Build for production |
| npm run preview | Preview the production build locally |
| npm run lint | Run ESLint |

## Project Structure

    src/
    ├── components/     # Reusable UI pieces (Button, Card, Navbar, Badge, etc.)
    ├── Layouts/        # Shared page layouts (e.g. DashboardLayout)
    ├── pages/          # Route-level pages
    └── assets/         # Images and static assets

**Pages:**

- LandingPage — public homepage
- AuthPage — login / registration
- DonorDashboard — donor-facing dashboard
- HospitalDashboard — hospital-facing dashboard
- AdminDashboard — admin-facing dashboard
- BloodDrives — blood drive listings

## Contributing

- main — production-ready, protected
- develop — integration branch, protected
- Branch off develop as feature/xxx or fix/xxx, PR back into develop
- Only develop merges into main, at release time

See CONTRIBUTING.md for details.
