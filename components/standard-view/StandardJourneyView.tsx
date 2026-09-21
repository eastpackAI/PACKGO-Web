"use client";

import { useEffect } from "react";
import { AssetPlaceholder } from "@/components/lobby/AssetPlaceholder";
import { IndustryQuickNav } from "@/components/lobby/IndustryQuickNav";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { getIndustryById } from "@/config/industries";
import { journeySteps } from "@/config/story";
import type { JourneyStepId } from "@/lib/types";

export function StandardJourneyView() {
  const {
    selectedIndustry,
    activeJourneyStep,
    setActiveJourneyStep,
    setViewMode,
    prefersReducedMotion,
  } = useExperience();
  const industry = getIndustryById(selectedIndustry);

  useEffect(() => {
    const sections = journeySteps
      .map((step) => document.getElementById(`journey-${step.id}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const stepId = visible?.target.getAttribute("data-step-id") as JourneyStepId | null;
        if (stepId) setActiveJourneyStep(stepId);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [selectedIndustry, setActiveJourneyStep]);

  const goToStep = (stepId: JourneyStepId) => {
    setActiveJourneyStep(stepId);
    document.getElementById(`journey-${stepId}`)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="standard-view">
      <section className="standard-hero" aria-labelledby="standard-title">
        <div className="standard-hero__backdrop" style={{ "--industry-accent": industry.accent } as React.CSSProperties} />
        <div className="standard-hero__copy">
          <span className="eyebrow">标准视图</span>
          <h1 id="standard-title">{industry.title}</h1>
          <p>{industry.overview}</p>
          <div className="standard-hero__actions">
            <button type="button" onClick={() => goToStep("solution")}>开始浏览</button>
            <button type="button" className="is-quiet" onClick={() => setViewMode("spatial")}>返回空间视图</button>
          </div>
          <ol className="hero-step-list" aria-label="浏览路径概览">
            {journeySteps.map((step) => <li key={step.id}>{step.number} {step.label}</li>)}
          </ol>
        </div>
        <AssetPlaceholder asset={industry.placeholderAsset} />
      </section>

      <IndustryQuickNav variant="standard" />

      <div className="journey-layout">
        <nav className="journey-map" aria-label={`${industry.title}浏览路径`}>
          <span>{industry.shortTitle}浏览路径</span>
          <ol>
            {journeySteps.map((step) => (
              <li key={step.id} className={activeJourneyStep === step.id ? "is-active" : undefined}>
                <button type="button" aria-current={activeJourneyStep === step.id ? "step" : undefined} onClick={() => goToStep(step.id)}>
                  <span>{step.number}</span>
                  {step.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="journey-sections">
          {journeySteps.map((step) => (
            <section
              key={step.id}
              id={`journey-${step.id}`}
              data-step-id={step.id}
              className="journey-section"
              aria-labelledby={`journey-title-${step.id}`}
            >
              <div className="journey-section__number">{step.number}</div>
              <div>
                <span className="eyebrow">{step.label}</span>
                <h2 id={`journey-title-${step.id}`}>{step.title}</h2>
                <p>{step.description}</p>
                <div className="journey-placeholder">
                  <span>内容占位</span>
                  <p>{step.placeholder}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
