/**
 * Reusable Vanilla JS Social Bar Component
 * * Features:
 * - Scoped styling via explicit CSS isolation
 * - Config-driven borders, thematic color schemes, and placements
 * - Support for FontAwesome icons, raw inline SVGs, and text fallbacks
 * - Public API context exposed for global theme toggles
 */

(function () {
  // 1. Inject Component Scoped Styles dynamically to keep index.html clean.
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --sb-bg-color: rgba(255, 255, 255, 0.95);
      --sb-text-color: #333333;
      --sb-icon-color: #555555;
      --sb-hover-bg: rgba(0, 0, 0, 0.05);
      --sb-border-color: #dddddd;
      --sb-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    html[data-theme="dark"] {
      --sb-bg-color: rgba(30, 30, 30, 0.95);
      --sb-text-color: #e0e0e0;
      --sb-icon-color: #b0b0b0;
      --sb-hover-bg: rgba(255, 255, 255, 0.08);
      --sb-border-color: #444444;
      --sb-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    /* Target wrapper explicitly to isolate configuration borders */
    #social-bar {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background-color: var(--sb-bg-color);
      box-shadow: var(--sb-shadow);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: 30px;
      padding: 6px 16px;
      margin: 15px auto;
      transition: all 0.3s ease;
      max-width: 90%;
      box-sizing: border-box;
    }

    #social-bar.sb-placement-top {
      top: 0;
    }

    #social-bar.sb-placement-bottom {
      bottom: 0;
    }

    .social-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .social-list li {
      margin: 0;
      padding: 0;
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 14px;
      color: var(--sb-text-color);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      border-radius: 20px;
      transition: background-color 0.2s ease, transform 0.2s ease;
      gap: 8px;
    }

    .social-link i, .social-link svg {
      font-size: 1.15rem;
      color: var(--sb-icon-color);
      width: 1.2em;
      height: 1.2em;
      display: inline-block;
      transition: color 0.2s ease;
    }

    /* Keep SVGs perfectly scalable within layout limits */
    .social-link svg {
      fill: currentColor;
    }

    .social-link:hover, .social-link:focus {
      background-color: var(--sb-hover-bg);
      transform: translateY(-2px);
      outline: none;
    }

    /* Mobile Responsive Adaptation */
    @media (max-width: 480px) {
      #social-bar {
        border-radius: 12px;
        width: calc(100% - 30px);
        padding: 10px;
      }
      .social-list {
        flex-direction: column;
        width: 100%;
        gap: 4px;
      }
      .social-link {
        width: 100%;
        box-sizing: border-box;
        justify-content: flex-start;
        padding: 8px 12px;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize lifecycle when document is ready
  document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("social-bar-wrapper");
    if (!wrapper) return;

    const configFile = wrapper.getAttribute("data-config") || "social-config.json";

    fetch(configFile)
      .then(response => {
        if (!response.ok) throw new Error(`Could not fetch config from ${configFile}`);
        return response.json();
      })
      .then(config => renderSocialBar(wrapper, config))
      .catch(err => console.error("Social Bar Initialization Failed:", err));
  });

  function renderSocialBar(wrapper, config) {
    // 2. Set the global initialization theme attribute on HTML root
    const currentTheme = config.theme || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    // 3. Build Container structural shell
    const section = document.createElement("section");
    section.id = "social-bar";
    section.className = `social-bar sb-placement-${config.placement || 'bottom'}`;

    // Apply configuration lineStyle border styles
    if (config.lineStyle) {
      section.style.borderWidth = config.lineStyle.width || "1px";
      section.style.borderStyle = config.lineStyle.style || "solid";
      // Sets a fallback standard rule property while letting CSS properties take visual overrides if declared
      section.style.borderColor = "var(--sb-border-color)";
    }

    const ul = document.createElement("ul");
    ul.className = "social-list";

    // 4. Loop through each item in configuration JSON array
    config.socials.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "social-link";
      a.href = item.url;
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
      a.setAttribute("aria-label", item.name);

      // Handle custom icon logic or standard text fallbacks
      if (item.icon && item.icon.value) {
        if (item.icon.type === "fa") {
          const iconEl = document.createElement("i");
          // Handle space variations gracefully if user puts complete classes
          iconEl.className = item.icon.value;
          a.appendChild(iconEl);
        } else if (item.icon.type === "svg") {
          const div = document.createElement("div");
          div.innerHTML = item.icon.value.trim();
          const svgEl = div.querySelector("svg");
          if (svgEl) a.appendChild(svgEl);
        }
        
        // Tooltip visualization trick via title attribute for clarity
        a.title = item.name;
      } else {
        // Fallback to clear, text-only label if no icon configured
        a.textContent = item.name;
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    wrapper.appendChild(section);

    // 5. Place wrapper elements cleanly mapping to configuration specifications
    if (config.placement === "top") {
      document.body.insertAdjacentElement("afterbegin", wrapper);
    } else {
      document.body.insertAdjacentElement("beforeend", wrapper);
    }

    // 6. Expose public tiny API runtime options globally
    window.SocialBar = {
      toggleTheme: () => {
        const activeTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", activeTheme);
      }
    };
  }
})();