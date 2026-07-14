# Sub Keeper — Legal

Public legal documents for **Sub Keeper** (store listings + transparency).

Canonical copies also live in the app repo at `keeper_app/legal/` and are shown in-app under **Settings → Legal information**.

| Document | Markdown | Public page |
|----------|----------|-------------|
| Privacy Policy | [`privacy_policy.md`](privacy_policy.md) | [/privacy.html](privacy.html) |
| Terms of Use | [`terms_of_use.md`](terms_of_use.md) | [/terms.html](terms.html) |
| About | [`about.md`](about.md) | [/about.html](about.html) |
| License (these docs) | [`LICENSE`](LICENSE) | CC BY 4.0 |

Each Markdown file contains **EN / UK / RU** sections separated by `<!-- locale:xx -->` markers (same format as the mobile app).

## Play Console / store URL

Use the **Privacy Policy** page:

```text
https://andreyfrigoris.github.io/subkeeper-legal/privacy.html
```

(After GitHub Pages is enabled on this repo.)

Later you may point `https://subkeeper.app/privacy` at the same content.

## Sync workflow (when product changes)

1. Update Markdown in **`keeper_app/legal/`** (in-app source).
2. Copy the same four files into this repo (`privacy_policy.md`, `terms_of_use.md`, `about.md`, `LICENSE` if needed).
3. Commit & push this repo so GitHub Pages updates.
4. Bump “Last updated” dates inside the locale sections.

Do **not** invent store-only legal text that is missing from the app copy (or vice versa).

## App code license

The Flutter app source / binaries are **not** covered by the CC BY license in this repository. See `LICENSE` in the main application repository.
