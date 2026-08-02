# notavibe — frontend

The notavibe frontend: front door + app screens (discovery, search, project
pages, portals). Self-contained and static — no build step, served over `http`.

## Run it locally

```bash
# from the repo root
node serve.js
# → http://localhost:4321

# or, serving this folder directly:
python3 -m http.server 4321 --directory frontend
```

## Structure

```
frontend/
├─ index.html                 # entry
├─ scripts/                   # screens + runtime
│  ├─ runtime.js              #   rendering runtime
│  ├─ voltagent-adapter.js    #   maps VoltAgent primitives → the screens' component API
│  ├─ screens.js · app.js · hifi.js · frontdoor.js · search.js
├─ styles/hashicorp-tokens.css
├─ design-system/voltagent/   # VoltAgent design-system bundle (components + tokens)
├─ content/                   # bundled content (MVP feature spec)
├─ design-notes/              # hashicorp.DESIGN.md
└─ thumbnail.webp
```

## Design systems

Built on **VoltAgent** components with **HashiCorp** design tokens. (notavibe's
own brand system — Terminal Craft — lives in the `design` repo; aligning this
frontend to it is a separate track.)
