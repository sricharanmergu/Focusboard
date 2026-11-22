

## Folder Structure
```text
focusboard/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
├── README.md
├── AI_USAGE.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── data/
    │   └── initialData.js
    ├── hooks/
    │   └── useLocalStorageTasks.js
    └── components/
        ├── Sidebar.jsx
        ├── StatsOverview.jsx
        ├── FocusNotesCarousel.jsx
        ├── TaskList.jsx
        ├── TaskFormModal.jsx
        └── DeleteConfirmModal.jsx
```

## Getting Started Locally
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Create a production build:**
   ```bash
   npm run build
   ```

## Deploy to Vercel in 60 Seconds
1. Push this `focusboard` folder to a public GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically detects **Vite** (`Build Command: npm run build`, `Output Directory: dist`). Click **Deploy**.

## State Management Architecture
- **Single Source of Truth (`useLocalStorageTasks`):** All task state resides in a dedicated custom hook backed by `window.localStorage` (`focusboard_tasks_v1`). Sample data only seeds on initial load when no saved key exists, ensuring user edits persist safely across page refreshes.
- **Immutable State Updates:** Create, edit, inline status updates, and delete operations use functional `setTasks` updates without mutating arrays or objects in place.
- **Derived Values (`useMemo`):** Overview totals, completion percentages, status tab badges, and combined search/status/priority filtered results are computed declaratively from `tasks`.
