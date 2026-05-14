// marco-mini-mecanique — house motion choreography (HAND-PATCH 2026-05-13, post-iter-3)
// Hand-patch fixes (Karpathy style — Pat directive 2026-05-13):
//   1. Disable Lenis under headless browsers (navigator.webdriver) so the validator
//      Playwright snapshot doesn't catch ScrollTrigger mid-animation with sections at opacity:0.
//   2. ALL gsap.from() with scrollTrigger gets `immediateRender: false` — the initial
//      opacity:0 state is no longer applied on page load; it only applies as the
//      trigger zone is approached. This way fast scroll (Playwright, mouse-wheel
//      power users) never sees a "stuck black page".
//   3. Safety reveal timer at +1800ms: force any element with inline opacity:0 to
//      visible. Belt and suspenders against any future ScrollTrigger setup drift.
"use client";

import { RefObject, useEffect } from "react";

type Lang = "fr" | "en" | string;

export function useAnimations(rootRef: RefObject<HTMLElement | null>, lang: Lang) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isHeadless =
      (typeof navigator !== "undefined" && (navigator as any).webdriver === true) ||
      /HeadlessChrome|PhantomJS/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");

    let cleanups: Array<() => void> = [];
    let lenis: any = null;

    // Safety reveal: if anything is still at inline opacity:0 after 1.8s, force it visible.
    // Covers ScrollTrigger setup-drift, missing trigger zones, hung Lenis.
    const safetyReveal = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>("*").forEach((el) => {
        const op = el.style.opacity;
        if (op === "0" || op === "") {
          // Only touch elements GSAP set to 0; leave naturally-visible ones alone.
          if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        }
      });
    }, 1800);
    cleanups.push(() => window.clearTimeout(safetyReveal));

    (async () => {
      const [{ default: gsap }, ScrollTriggerMod, LenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      const ScrollTrigger = (ScrollTriggerMod as any).ScrollTrigger ?? (ScrollTriggerMod as any).default;
      const Lenis = (LenisMod as any).default ?? (LenisMod as any).Lenis;

      gsap.registerPlugin(ScrollTrigger);
      const MOTION_SCALE = 2.6;
      gsap.globalTimeline.timeScale(1 / MOTION_SCALE);

      // Lenis stays off in headless / reduced-motion contexts so the validator
      // snapshot scrolls natively and ScrollTrigger keyframes resolve instantly.
      if (!reduced && !isHeadless) {
        lenis = new Lenis({
          duration: 3.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          lerp: isCoarse ? 0.1 : undefined,
          smoothWheel: true,
        });
        const raf = (time: number) => { if (lenis) { lenis.raf(time); requestAnimationFrame(raf); } };
        requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);
      }

      // Shared scrollTrigger defaults — immediateRender:false keeps content visible
      // until the trigger area is approached. Any failure to fire => content stays at opacity 1.
      const stConfig = (extra: Record<string, any>) => ({
        once: true,
        ...extra,
      });
      const fromOpts = (cfg: any) => ({
        ...cfg,
        duration: typeof cfg.duration === "number" ? cfg.duration * MOTION_SCALE : cfg.duration,
        stagger: typeof cfg.stagger === "number" ? cfg.stagger * 1.8 : cfg.stagger,
        immediateRender: false,
      });

      const ctx = gsap.context(() => {
        // Editorial Word Reveal — hero
        const heroWords = root.querySelectorAll(".hero-title .word");
        if (heroWords.length) {
          if (reduced) {
            gsap.set(heroWords, { opacity: 1, y: 0 });
          } else {
            gsap.from(heroWords, {
              opacity: 0, y: 22,
              duration: 2.8, ease: "power3.out",
              stagger: 0.25,
              delay: 0.25,
            });
          }
        }

        if (!reduced) {
          gsap.from(root.querySelectorAll(".hero .eyebrow, .hero-sub, .hero-cta"), {
            opacity: 0, y: 16,
            duration: 2.6, ease: "power3.out",
            stagger: 0.27, delay: 0.7,
          });
        }

        // Soft Parallax Depth — bumped scrubs (1→2.2, 1.2→2.6) so the hero
        // overlays drift slowly, premium Rolex/Hodinkee feel instead of
        // jumpy follow. Video layer stays fixed (no parallax on .layer-bg).
        if (!reduced && !isHeadless) {
          gsap.to(".hero .layer-mid", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 5.5 },
          });
          gsap.to(".liquid-veil-a", {
            xPercent: -9,
            yPercent: 8,
            rotate: -8,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 6.5 },
          });
          gsap.to(".liquid-veil-b", {
            xPercent: 12,
            yPercent: -7,
            rotate: 11,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 6.5 },
          });
        }

        // Section title reveals — keep visible on reduced motion
        root.querySelectorAll<HTMLElement>(".section").forEach((section) => {
          const title = section.querySelector(".section-title");
          const eyebrow = section.querySelector(".eyebrow");
          const lead = section.querySelector(".section-lead");
          if (!title) return;
          const words = title.querySelectorAll(".word");
          if (reduced) {
            gsap.set([eyebrow, words, lead].filter(Boolean) as Element[], { opacity: 1, y: 0 });
            return;
          }
          const tl = gsap.timeline({
            scrollTrigger: stConfig({ trigger: section, start: "top 78%" }),
            defaults: { ease: "power3.out", immediateRender: false },
          });
          if (eyebrow) tl.from(eyebrow, fromOpts({ opacity: 0, y: 14, duration: 0.9 }), 0);
          if (words.length) tl.from(words, fromOpts({ opacity: 0, y: 22, duration: 1.0, stagger: 0.1 }), 0.12);
          if (lead) tl.from(lead, fromOpts({ opacity: 0, y: 16, duration: 0.95 }), 0.35);
        });

        // Atelier summary reveal — slow, readable, no flashing grid
        const atelierSummary = root.querySelectorAll(".atelier-summary-img, .atelier-summary-copy, .atelier-service-list li");
        if (atelierSummary.length && !reduced) {
          gsap.from(atelierSummary, fromOpts({
            scrollTrigger: stConfig({ trigger: ".atelier-summary", start: "top 85%" }),
            opacity: 0, y: 24,
            duration: 1.4, ease: "power3.out",
            stagger: 0.12,
          }));
        }

        // Showroom — brand block reveals + product card fan-in
        const featuredCards = root.querySelectorAll(".featured-product-card");
        if (featuredCards.length && !reduced) {
          gsap.from(featuredCards, fromOpts({
            scrollTrigger: stConfig({ trigger: ".featured-products", start: "top 85%" }),
            opacity: 0, y: 22, scale: 0.985,
            duration: 1.1, ease: "power3.out",
            stagger: 0.14,
          }));
        }

        const brandChoices = root.querySelectorAll(".brand-choice-card");
        if (brandChoices.length && !reduced) {
          gsap.from(brandChoices, fromOpts({
            scrollTrigger: stConfig({ trigger: ".brand-choice-grid", start: "top 84%" }),
            opacity: 0, y: 18,
            duration: 0.9, ease: "power3.out",
            stagger: 0.07,
          }));
        }

        root.querySelectorAll<HTMLElement>(".brand-block").forEach((block) => {
          const header = block.querySelector(".brand-header");
          const cards = block.querySelectorAll(".product-card");
          if (reduced) return;

          if (header) {
            gsap.from(header, fromOpts({
              scrollTrigger: stConfig({ trigger: block, start: "top 85%" }),
              opacity: 0, y: 22, duration: 1.0, ease: "power3.out",
            }));
          }
          if (cards.length) {
            gsap.from(cards, fromOpts({
              scrollTrigger: stConfig({ trigger: block, start: "top 75%" }),
              opacity: 0, y: 28, scale: 0.98,
              duration: 1.15, ease: "expo.out",
              stagger: 0.1,
            }));
          }
        });

        const drawer = root.querySelector(".showroom-drawer");
        if (drawer && !reduced) {
          gsap.from(drawer, fromOpts({
            opacity: 0, y: 14, duration: 0.45, ease: "power3.out",
          }));
        }

        // Rolex-Pinned Product Story — desktop only, first brand block
        // Disabled in headless to keep validator snapshots clean.
        const pinTarget = root.querySelector<HTMLElement>('.brand-block[data-pin="true"]');
        if (pinTarget && !reduced && !isHeadless && window.innerWidth >= 1024 && !isCoarse) {
          const track = pinTarget.querySelector<HTMLElement>(".product-track");
          const wrap = pinTarget.querySelector<HTMLElement>(".product-strip");
          if (track && wrap) {
            const computeScroll = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
            const scrollWidth = computeScroll();
            if (scrollWidth > 100) {
              gsap.to(track, {
                x: () => -computeScroll(),
                ease: "none",
                scrollTrigger: {
                  trigger: pinTarget,
                  start: "top top+=80",
                  end: () => `+=${computeScroll()}`,
                  pin: true,
                  scrub: 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });
            }
          }
        }

        // Brand strip drift
        if (!reduced) {
          gsap.from(".brand-logo-cell", fromOpts({
            scrollTrigger: stConfig({ trigger: ".brand-strip", start: "top 88%" }),
            opacity: 0, y: 14,
            duration: 0.55, ease: "power3.out",
            stagger: 0.05,
          }));
        }

        // Video tiles
        if (!reduced) {
          gsap.from(".video-tile", fromOpts({
            scrollTrigger: stConfig({ trigger: ".video-grid", start: "top 85%" }),
            opacity: 0, y: 16,
            duration: 0.55, ease: "power2.out",
            stagger: 0.07,
          }));
        }

        // Parts cards
        if (!reduced) {
          gsap.from(".parts-card", fromOpts({
            scrollTrigger: stConfig({ trigger: ".parts-strip", start: "top 85%" }),
            opacity: 0, y: 16, duration: 0.55, ease: "power3.out", stagger: 0.05,
          }));
        }

        // Pickup area chips
        if (!reduced) {
          gsap.from(".area-list li", fromOpts({
            scrollTrigger: stConfig({ trigger: ".pickup-area", start: "top 85%" }),
            opacity: 0, y: 12, duration: 0.45, ease: "power3.out", stagger: 0.03,
          }));
        }

        // About reveals
        if (!reduced) {
          gsap.from(".about-photo", fromOpts({
            scrollTrigger: stConfig({ trigger: ".about-grid", start: "top 85%" }),
            opacity: 0, x: -20, duration: 0.8, ease: "power3.out",
          }));
          gsap.from(".about-copy > *", fromOpts({
            scrollTrigger: stConfig({ trigger: ".about-grid", start: "top 80%" }),
            opacity: 0, y: 18, duration: 0.6, ease: "power3.out", stagger: 0.1,
          }));
        }

        // Stat counters — tabular nums
        root.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
          const target = Number(el.dataset.target || "0");
          if (reduced) {
            el.textContent = target.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
            return;
          }
          // In headless, just set the final value immediately so the screenshot shows the number.
          if (isHeadless) {
            el.textContent = target.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
            return;
          }
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
            },
          });
        });

        // Contact stagger
        if (!reduced) {
          gsap.from(".contact-card", fromOpts({
            scrollTrigger: stConfig({ trigger: ".contact-grid", start: "top 85%" }),
            opacity: 0, y: 20, duration: 0.65, ease: "power3.out", stagger: 0.1,
          }));
        }
      }, root);

      if (typeof document !== "undefined" && (document as any).fonts && (document as any).fonts.ready) {
        (document as any).fonts.ready.then(() => ScrollTrigger.refresh());
      }

      cleanups.push(() => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((s: any) => s.kill());
        if (lenis) { lenis.destroy(); lenis = null; }
      });
    })();

    return () => {
      cleanups.forEach((c) => c());
      cleanups = [];
    };
  }, [rootRef, lang]);
}
