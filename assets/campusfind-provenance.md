# CampusFind screenshot provenance

`campusfind-search.png` shows the actual CampusFind LK lost-item search interface from the existing compiled React frontend in `D:/POS new system/CampusFind-LK/frontend/dist`, served read-only on localhost port 8774. Captured for the portfolio on 13 November 2026 (Asia/Colombo).

The browser used a synthetic Demo Student identity and two synthetic notebook reports. Every API request was intercepted and fulfilled with local mock responses; all other external requests were blocked. No backend, real account, database, message, or live record was accessed. No application source files were changed. The screenshot is a UI preview, not evidence of functioning backend search or authenticated integration.

The actual form was used to enter `notebook`, choose `Books`, enter `Library`, and submit Search. The rendered screen contains the two supplied report fixtures. Screenshot inspected at 1440px viewport width; original aspect ratio preserved.

Relevant source: `frontend/src/pages/lost-items/LostItems.jsx` implements keyword, category, location, lost-date, and status controls, validation before queries, loading/error/empty states, and report cards. `frontend/src/services/lostItemService.js` sends the filters as API query parameters. `frontend/src/utils/validation.js` validates search length, location length, category/status values, and dates. These source capabilities describe the search feature; the screenshot alone does not verify server filtering.

Capture command: `npx --offline --yes --package @playwright/cli playwright-cli -s=campus-capture run-code ...` using `page.route`, synthetic localStorage values, form controls, and `page.screenshot({path:'assets/campusfind-search.png',fullPage:true})` from the portfolio checkout. Initial exact-label lookup for Category timed out; rerun using the observed combobox role succeeded. No backend tests were run.
