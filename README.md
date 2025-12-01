# On-Site Co

Static HTML pages for On-Site Co content, including a beachhead strategy overview, a TCO calculator, and metallurgy market research materials. A unified `index.html` now provides tabbed navigation across the three experiences with shared styling and JavaScript.

## Repository contents
- `index.html` – tabbed experience that aggregates the three standalone pages.
- `assets/styles.css` – shared styling for the unified workspace.
- `assets/app.js` – base JavaScript that powers tab switching, charts, and AI helper actions.
- `Beachhead_Strategy_Auto_Heat_Treat.html` – beachhead strategy deck for automotive heat treat.
- `Beachhead_TCO_Calculator.html` – calculator comparing Endogas and Maat CO total cost of ownership assumptions.
- `CO_Metallurgy_Market_Research.html` – market research summary for metallurgical applications.

## Local preview
1. Clone or download the repository.
2. From the project root, start a simple local server so relative asset paths resolve correctly:
   ```bash
   python -m http.server 8000
   ```
3. Open http://localhost:8000 in a browser and navigate to `index.html` for the unified experience (or any of the standalone HTML files).

## GitHub Pages deployment
GitHub Pages can host these static HTML files without any build step.

1. Push the latest commits to the repository.
2. In GitHub, go to **Settings → Pages** and set **Source** to **Deploy from branch**.
3. Choose the branch that holds the HTML files (e.g., `work`) and set the folder to **/** (root), then click **Save**.
4. Wait for the Pages deployment to complete (the status banner in **Settings → Pages** will show when it is live).
5. Access the published files at `https://<your-username>.github.io/on-site-co/Beachhead_Strategy_Auto_Heat_Treat.html` (and similarly for the other HTML files).

