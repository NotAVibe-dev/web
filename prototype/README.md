# notavibe — MVP clickable prototype

A self-contained, static clickable prototype of the notavibe MVP (front door +
app screens). No build step, no backend — open it and click through.

> **Reference, not production, and not the canonical brand.** This is skinned in
> **borrowed** design systems (VoltAgent components + HashiCorp tokens) chosen to
> move fast. notavibe's real brand is **Terminal Craft** (see the `design` repo).
> Don't ship any of this as-is.

## Run it locally

Any static file server works (the page uses `fetch()` on itself, so `file://`
won't do — serve over `http://`):

```bash
# from this folder
python3 -m http.server 8090
# then open http://localhost:8090
```

## Structure

```
prototype/
├─ index.html                 # entry — open this
├─ scripts/                   # the prototype's screens + runtime
│  ├─ runtime.js              #   DesignCompose runtime (was support.js)
│  ├─ voltagent-adapter.js    #   maps VoltAgent primitives → the screens' component API
│  ├─ screens.js · app.js · hifi.js · frontdoor.js · search.js
├─ styles/hashicorp-tokens.css
├─ design-system/voltagent/   # the VoltAgent design-system bundle (the live skin)
├─ content/                   # bundled copy (MVP feature spec)
├─ design-notes/              # hashicorp.DESIGN.md
└─ thumbnail.webp
```

Renamed from the original flat export (`_ds/…uuid…`, `notavibe-*.js?v=N`,
`Notavibe MVP Prototype.dc.html`) into the layout above; the unused Together AI
bundle was dropped. All internal paths were updated to match.
