# Sub Keeper — Legal

Public legal documents for **Sub Keeper** (store listings + transparency).

Canonical copies also live in the app repo at `keeper_app/legal/` and are shown in-app under **Settings → Legal information**.

| Document | Markdown | Public page |
|----------|----------|-------------|
| Privacy Policy | [`privacy_policy.md`](privacy_policy.md) | [/privacy.html](privacy.html) |
| Terms of Use | [`terms_of_use.md`](terms_of_use.md) | [/terms.html](terms.html) |
| About | [`about.md`](about.md) | [/about.html](about.html) |
| License (these docs) | [`LICENSE`](LICENSE) | CC BY 4.0 |
| AdMob app-ads.txt | [`app-ads.txt`](app-ads.txt) | [/app-ads.txt](https://subkeeper.app/app-ads.txt) |

Each Markdown file contains **EN / UK / RU** sections separated by `<!-- locale:xx -->` markers (same format as the mobile app).

`app-ads.txt` is **not** an in-app legal document. It lives only in this repo (GitHub Pages root) so AdMob can verify publisher `pub-5308769401439593`. Do not copy it into `keeper_app/legal/`.

## Play Console / store URL

Privacy for store listings:

```text
https://subkeeper.app/privacy.html
```

AdMob authorized sellers (developer website in the Play listing must be `https://subkeeper.app`):

```text
https://subkeeper.app/app-ads.txt
```

## Sync workflow (when product changes)

1. Update Markdown in **`keeper_app/legal/`** (in-app source).
2. Copy the same four files into this repo (`privacy_policy.md`, `terms_of_use.md`, `about.md`, `LICENSE` if needed).
3. Commit & push this repo so GitHub Pages updates.
4. Bump “Last updated” dates inside the locale sections.

`app-ads.txt` is independent of that sync: edit it only here, then push. Confirm `https://subkeeper.app/app-ads.txt` returns 200 `text/plain`.

Do **not** invent store-only legal text that is missing from the app copy (or vice versa).

## App code license

The Flutter app source / binaries are **not** covered by the CC BY license in this repository. See `LICENSE` in the main application repository.
