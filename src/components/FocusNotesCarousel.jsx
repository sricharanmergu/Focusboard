import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { FOCUS_NOTES_SLIDES } from '../data/initialData';

export default function FocusNotesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = FOCUS_NOTES_SLIDES.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const currentSlide = FOCUS_NOTES_SLIDES[activeIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${currentSlide.accent} p-5 text-white shadow-sm transition-all duration-300 sm:px-7 sm:py-6`}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {/* Slide Content */}
        <div className="max-w-3xl space-y-1.5" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {currentSlide.badge}
            </span>
            <span className="rounded-full bg-black/15 px-2.5 py-0.5 text-[11px] font-medium text-white/90">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            {currentSlide.title}
          </h2>
          <p className="text-xs leading-relaxed text-white/90 sm:text-sm">
            {currentSlide.description}
          </p>
        </div>

        {/* Navigation Controls & Indicators */}
        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Focus Note"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Focus Note"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Focus Notes slide selector"
          >
            {FOCUS_NOTES_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                    isActive
                      ? 'w-7 bg-white'
                      : 'w-2 bg-white/45 hover:bg-white/75'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
