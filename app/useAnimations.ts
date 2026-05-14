// marco-mini-mecanique — GLAMMBOX signature motion pass
// Source recipe checked against Fred AI School + GLAMMBOX core examples:
// - Lenis smooth scroll
// - GSAP fromTo only, not gsap.from flash states
// - clip-path heading reveals
// - horizontal signature image/text pairing
// - scroll-scrub parallax, no brightness/filter darkening
"use client";

import { RefObject, useEffect } from "react";

type Lang = "fr" | "en" | string;

export function useAnimations(rootRef: RefObject<HTMLElement | null>, _lang: Lang) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHeadless =
      (typeof navigator !== "undefined" && (navigator as any).webdriver === true) ||
      /HeadlessChrome|PhantomJS/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");

    if (reduced) {
      root.classList.add("motion-fallback");
      return;
    }

    let cleanup = () => {};
    let mounted = true;

    (async () => {
      const [{ default: gsap }, ScrollTriggerMod, LenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (!mounted) return;

      const ScrollTrigger = (ScrollTriggerMod as any).ScrollTrigger ?? (ScrollTriggerMod as any).default;
      const Lenis = (LenisMod as any).default ?? (LenisMod as any).Lenis;
      gsap.registerPlugin(ScrollTrigger);

      let rafId = 0;
      let lenis: any = null;

      if (!isHeadless) {
        lenis = new Lenis({ duration: 1.55, smoothWheel: true, wheelMultiplier: 0.85 });
        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);
      }

      const ctx = gsap.context(() => {
        // Hero — same word reveal family as Fred/GLAMMBOX, slower and readable.
        const heroWords = gsap.utils.toArray<HTMLElement>(".hero-title .word");
        if (heroWords.length) {
          gsap.fromTo(
            heroWords,
            { y: 58, opacity: 0, clipPath: "inset(35% 0 35% 0)" },
            { y: 0, opacity: 1, clipPath: "inset(0% 0 0% 0)", duration: 1.65, stagger: 0.18, ease: "power3.out" }
          );
        }

        gsap.fromTo(
          root.querySelectorAll(".hero .eyebrow, .hero-sub, .hero-cta"),
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.35, stagger: 0.16, delay: 0.35, ease: "power3.out" }
        );

        // GLAMMBOX section heading recipe: clip reveal, reversible on scroll.
        gsap.utils.toArray<HTMLElement>(".section-title").forEach((heading) => {
          gsap.fromTo(
            heading,
            { y: 28, opacity: 0, clipPath: "inset(0 0 18% 0)" },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.25,
              ease: "power3.out",
              scrollTrigger: { trigger: heading, start: "top 82%", toggleActions: "play reverse play reverse" },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".eyebrow, .section-lead").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.25,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play reverse play reverse" },
            }
          );
        });

        // Signature horizontal pair: image left → final, text right → final.
        // No brightness, no darkening, no flash.
        [
          { wrap: ".atelier-summary", image: ".atelier-summary-img", text: ".atelier-summary-copy" },
          { wrap: ".about-grid", image: ".about-photo", text: ".about-copy" },
        ].forEach(({ wrap, image, text }) => {
          const section = root.querySelector<HTMLElement>(wrap);
          const img = section?.querySelector<HTMLElement>(image);
          const copy = section?.querySelector<HTMLElement>(text);
          if (!section || !img || !copy) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "center center",
              scrub: 1.35,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(img, { xPercent: -18, y: 0, opacity: 0.96 }, { xPercent: 0, y: 0, opacity: 1, ease: "none" }, 0)
            .fromTo(copy, { xPercent: 18, y: 0, opacity: 0.96 }, { xPercent: 0, y: 0, opacity: 1, ease: "none" }, 0);
        });

        gsap.utils.toArray<HTMLElement>(".atelier-service-list li, .featured-product-card, .brand-choice-card, .video-tile, .area-list li, .contact-card").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 42, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.35,
              ease: "power3.out",
              delay: (i % 8) * 0.035,
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play reverse play reverse" },
            }
          );
        });

        // Product/media parallax: light horizontal drift only. Never darkens images.
        gsap.utils.toArray<HTMLElement>(".featured-img, .product-img, .video-poster, .parts, .map-card").forEach((el, i) => {
          gsap.fromTo(
            el,
            { xPercent: i % 2 ? 3 : -3 },
            {
              xPercent: i % 2 ? -3 : 3,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.8, invalidateOnRefresh: true },
            }
          );
        });

        // Very soft decorative veil movement; slow, not flashy.
        gsap.utils.toArray<HTMLElement>(".liquid-veil-a, .liquid-veil-b").forEach((el, i) => {
          gsap.to(el, {
            xPercent: i ? 10 : -10,
            yPercent: i ? -6 : 6,
            rotate: i ? 7 : -7,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 3.5 },
          });
        });

        // Stat counters stay simple and readable.
        root.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
          const target = Number(el.dataset.target || "0");
          if (isHeadless) {
            el.textContent = target.toLocaleString("fr-CA");
            return;
          }
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString("fr-CA"); },
          });
        });
      }, root);

      if ((document as any).fonts?.ready) {
        (document as any).fonts.ready.then(() => ScrollTrigger.refresh());
      }

      cleanup = () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((s: any) => s.kill());
        if (rafId) cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    })().catch(() => {
      root.classList.add("motion-fallback");
    });

    return () => {
      mounted = false;
      cleanup();
    };
  }, [rootRef]);
}
