import { copy } from "@/copy";

/**
 * Close the page with the site name and its few links.
 * @returns Page footer.
 */
export function Footer() {
  return (
    <footer className="foot">
      <div>
        <p className="foot__brand">
          <span className="fleuron" aria-hidden>❦</span> {copy.brand}
        </p>
        <p className="foot__tagline">{copy.footer.tagline}</p>
      </div>
      <nav className="foot__links" aria-label={copy.footer.label}>
        <a href="#top">{copy.footer.backToTop}</a>
        <a href="https://archetipico.github.io" aria-label={copy.footer.homeTitle}>{copy.footer.home}</a>
      </nav>
    </footer>
  );
}
