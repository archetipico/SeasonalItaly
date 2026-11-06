import type { RefObject } from "react";
import { copy } from "@/copy";
import { DisclaimerText } from "@/components/DisclaimerText";
import type { Disclosure } from "@/components/useDisclosure";

/**
 * Drop the full disclaimer from the top of the page like a curtain. CSS takes it out of the tab order while closed.
 * @param props.disclaimer Open state, shared with the cover notice and the fixed banner.
 * @param props.titleRef Ref for the heading, which takes focus when the banner opens the curtain.
 * @returns Curtain.
 */
export function DisclaimerCurtain({
  disclaimer,
  titleRef,
}: {
  disclaimer: Disclosure;
  titleRef: RefObject<HTMLHeadingElement>;
}) {
  return (
    <div id="disclaimer" className={disclaimer.isOpen ? "curtain is-open" : "curtain"}>
      <div className="curtain__clip">
        <div className="curtain__inner">
          <h2 ref={titleRef} className="curtain__title" tabIndex={-1}>{copy.disclaimer.title}</h2>
          <DisclaimerText />
          <button type="button" className="pill" onClick={disclaimer.close}>
            {copy.disclaimer.close}
          </button>
        </div>
      </div>
    </div>
  );
}
