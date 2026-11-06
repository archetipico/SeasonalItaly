import { copy } from "@/copy";

/**
 * Keep the disclaimer in view on every scroll position.
 * @param props.onRead Bring the reader to the full disclaimer.
 * @returns Banner stuck to the bottom of the viewport.
 */
export function DisclaimerBanner({ onRead }: { onRead: () => void }) {
  return (
    <aside className="banner" role="region" aria-label={copy.disclaimer.label}>
      <p className="banner__text">{copy.disclaimer.banner}</p>
      <button type="button" className="link banner__read" onClick={onRead}>
        {copy.disclaimer.open}
      </button>
    </aside>
  );
}
