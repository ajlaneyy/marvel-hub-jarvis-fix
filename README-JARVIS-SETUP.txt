MARVEL HUB - JARVIS FIX

WHAT THIS FIXES
The old HTML used claude.use("sample"), which is not a real browser-side Claude connection. This package replaces it with a Netlify Function that calls Claude server-side.

IMPORTANT
A manual drag-and-drop deploy of static files does not reliably build/deploy Netlify Functions. Deploy this folder through a Git-connected Netlify site (recommended) or a build environment that runs Netlify's build. Do not just upload config.js or index.html alone.

FILES
- index.html: your tracker with the Jarvis call fixed
- netlify/functions/jarvis.mjs: server-side Claude endpoint
- netlify.toml: tells Netlify where the site and function are
- config.js: your Supabase public config, if present; not used by this Jarvis fix

DEPLOY
1. Upload the contents of this ZIP to a GitHub repository (the index.html and netlify.toml must be at the repository root, and the function must be at netlify/functions/jarvis.mjs).
2. In Netlify, import/connect that GitHub repository and deploy it.
3. In Netlify: Site configuration (or Site settings) > Environment variables, add ANTHROPIC_API_KEY with your own Claude API key as the value. Do not put the secret in HTML or config.js.
4. Trigger a new deploy after setting the variable.
5. Test the Jarvis tab. If it fails, open Netlify > Functions > jarvis > logs.

SECURITY
Never share your Anthropic API key in chat or commit it to GitHub. Store it only as a Netlify environment variable. This function currently has no user authentication or rate limiting; consider adding those before sharing the site publicly because visitors could otherwise consume API credits.

This package fixes Jarvis only. It does not implement account login or shared cloud progress sync.
