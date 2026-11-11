ORBIT — Cloudflare Pages project

WHAT'S INCLUDED
- Full-page space/anime-inspired color themes and custom wallpaper upload
- Built-in search-results interface (requires a search API backend)
- Bookmarks and local browsing history
- Music search shortcut to YouTube Music
- Orbit AI panel (requires a secure AI backend)
- Quick links and responsive layout

DEPLOY
1. Extract this ZIP.
2. In Cloudflare Pages, upload the extracted folder (or connect its Git repository).
3. Set the build command to blank and the output directory to the project root.
4. The site works as a homepage immediately.

IMPORTANT LIMITS
A Cloudflare-hosted website cannot become a standalone browser engine or force every website into an iframe. Many sites block embedding. Orbit opens those sites in regular browser tabs. It does not bypass school filters, network restrictions, or website security.

OPTIONAL LIVE SEARCH AND AI
The front-end calls /api/search and /api/ai. Those endpoints are intentionally not faked. To enable them, add Cloudflare Pages Functions and configure server-side secrets for your chosen search and AI providers. Never put private API keys in index.html. The included UI explains when a service is not configured.

MUSIC
Orbit Music searches YouTube Music and opens provider results. Playback and catalog access are controlled by YouTube Music and the user's account/region.
