import { ScrubText } from "~/components/motion/scrub-text";

const TEXT =
  "Frontier AI is built on expert human judgement. Yet thousands of brilliant engineers across Latin America, Asia, Europe and Canada never hear about the platforms that pay for it, or how to pass their assessments. Credexus closes that gap: one application, honest matching and a human in your corner.";

/** Avenna "Solution" section: a large statement that lights up character by character on scroll. */
export function Mission() {
  return (
    <section className="container-x py-28 sm:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <span className="eyebrow">Why we exist</span>
        <ScrubText
          as="p"
          text={TEXT}
          className="text-foreground mt-8 text-[26px] leading-[1.3] font-medium tracking-tight sm:text-[40px] sm:leading-[1.25]"
        />
      </div>
    </section>
  );
}
