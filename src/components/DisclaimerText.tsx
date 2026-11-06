import { copy } from "@/copy";

/**
 * Print the full disclaimer under its named sections.
 * @returns Disclaimer sections.
 */
export function DisclaimerText() {
  return (
    <div className="legal">
      {copy.disclaimer.sections.map((section) => (
        <section key={section.title}>
          <h3 className="legal__title">{section.title}</h3>
          <p>{section.text}</p>
        </section>
      ))}
    </div>
  );
}
