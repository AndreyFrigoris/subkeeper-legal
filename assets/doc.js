(function () {
  function parseLocales(markdown) {
    const parts = markdown.split(/<!--\s*locale:([a-z]{2})\s*-->/i);
    const map = {};
    for (let i = 1; i < parts.length; i += 2) {
      const code = parts[i].toLowerCase();
      map[code] = (parts[i + 1] || "").trim();
    }
    if (!Object.keys(map).length) {
      map.en = markdown.trim();
    }
    return map;
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Tiny markdown subset: headings, lists, paragraphs, bold, links.
  function renderMarkdown(md) {
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    const html = [];
    let inList = false;

    function closeList() {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    }

    function inlineFormat(text) {
      return escapeHtml(text)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(
          /\[([^\]]+)\]\((https?:\/\/[^)]+|mailto:[^)]+)\)/g,
          '<a href="$2" rel="noopener noreferrer">$1</a>'
        );
    }

    for (const raw of lines) {
      const line = raw.trimEnd();
      if (!line.trim()) {
        closeList();
        continue;
      }
      const heading = /^(#{1,3})\s+(.*)$/.exec(line);
      if (heading) {
        closeList();
        const level = heading[1].length;
        html.push(`<h${level}>${inlineFormat(heading[2])}</h${level}>`);
        continue;
      }
      if (/^[-*]\s+/.test(line)) {
        if (!inList) {
          html.push("<ul>");
          inList = true;
        }
        html.push(`<li>${inlineFormat(line.replace(/^[-*]\s+/, ""))}</li>`);
        continue;
      }
      closeList();
      html.push(`<p>${inlineFormat(line)}</p>`);
    }
    closeList();
    return html.join("\n");
  }

  async function mountDocument({ source, targetId, defaultLocale }) {
    const target = document.getElementById(targetId);
    const langBar = document.getElementById("langs");
    if (!target) return;

    try {
      const res = await fetch(source, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const locales = parseLocales(text);
      const order = ["en", "uk", "ru"].filter((code) => locales[code]);
      let current = order.includes(defaultLocale) ? defaultLocale : order[0];

      function paint() {
        if (langBar) {
          langBar.innerHTML = order
            .map(
              (code) =>
                `<button type="button" data-locale="${code}" class="${
                  code === current ? "active" : ""
                }">${code.toUpperCase()}</button>`
            )
            .join("");
          langBar.querySelectorAll("button").forEach((btn) => {
            btn.addEventListener("click", () => {
              current = btn.getAttribute("data-locale");
              paint();
            });
          });
        }
        target.innerHTML = renderMarkdown(locales[current] || "");
      }

      paint();
    } catch (error) {
      target.innerHTML = `<p class="err">Failed to load ${source}. ${String(
        error
      )}</p>`;
    }
  }

  window.SubKeeperLegal = { mountDocument };
})();
