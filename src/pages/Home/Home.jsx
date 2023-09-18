import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, Flip } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import "./Home.css";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger, Flip);
class Item {
  // Initialize DOM and style related properties
  // Various elements within this item
  DOM = {
    // Main DOM element
    el: null,
    // .title-wrap element
    titleWrap: null,
    // .title--up
    titleUp: null,
    // .title--down
    titleDown: null,
    // .content elements
    content: null,
    // svg element
    svg: null,
    // This is the mask element, it can be either a circle or a path SVG element.
    // We will be animating the 'radius' attribute for circle or the 'd' attribute for path.
    mask: null,
    // image element
    image: null,
  };
  // flipstate saves the current state of title elements
  flipstate = null;

  /**
   * Sets up the necessary elements and data for an Item instance.
   * @param {HTMLElement} DOM_el - The DOM element that represents the item.
   */
  constructor(DOM_el) {
    // Assign DOM elements
    this.DOM.el = DOM_el;
    this.DOM.titleWrap = this.DOM.el.querySelector(".title-wrap");
    this.DOM.titleUp = this.DOM.titleWrap.querySelector(".title--up");
    this.DOM.titleDown = this.DOM.titleWrap.querySelector(".title--down");
    this.DOM.content = [...this.DOM.el.querySelectorAll(".content")];
    this.DOM.svg = this.DOM.el.querySelector(".content__img");
    this.DOM.mask = this.DOM.svg.querySelector(".mask");
    this.DOM.image = this.DOM.svg.querySelector("image");

    // Save current state
    this.flipstate = Flip.getState([this.DOM.titleUp, this.DOM.titleDown]);

    // Change layout
    this.DOM.content[1].prepend(this.DOM.titleUp, this.DOM.titleDown);

    // Check if the mask element is a circle or a path
    const isCircle = this.DOM.mask.tagName.toLowerCase() === "circle";

    // Create the Flip.from that we'll pass into the ScrollTrigger animation property
    const flip = Flip.from(this.flipstate, {
      ease: "none",
      simple: true,
    })
      .fromTo(
        this.DOM.mask,
        {
          attr: isCircle
            ? { r: this.DOM.mask.getAttribute("r") }
            : { d: this.DOM.mask.getAttribute("d") },
        },
        {
          ease: "none",
          attr: isCircle
            ? { r: this.DOM.mask.dataset.valueFinal }
            : { d: this.DOM.mask.dataset.valueFinal },
        },
        0
      )
      // Also scale up the image element
      .fromTo(
        this.DOM.image,
        {
          transformOrigin: "50% 50%",
          filter: "brightness(100%)",
        },
        {
          ease: "none",
          scale: isCircle ? 1.2 : 1,
          filter: "brightness(150%)",
        },
        0
      );

    ScrollTrigger.create({
      trigger: this.DOM.titleWrap,
      ease: "none",
      start: "clamp(top bottom-=10%)",
      end: "+=40%",
      scrub: true,
      animation: flip,
    });
  }
}

export default function Home() {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
    script.async = true;
    document.body.appendChild(script);

    preloadFonts("qsy7khk").then(() => {
      document.body.classList.remove("loading");
      initSmoothScrolling();
      [...document.querySelectorAll(".content-wrap")].forEach((element) => {
        new Item(element);
      });
    });
  }, []);

  const initSmoothScrolling = () => {
    let lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);
  };

  const preloadFonts = (id) => {
    return new Promise((resolve) => {
      WebFont.load({
        typekit: {
          id: id,
        },
        active: resolve,
      });
    });
  };

  // Render the HTML here
  return (
    <div ref={ref}>
      <main className="home-main">
        <div className="intro">
          <h1 className="intro__title">
            <span className="intro__title-pre">
              <span>Adventures</span>
              Begin Here
            </span>
          </h1>
          <span className="intro__info">
            Scroll slowly and <span>enjoy</span> the animations
          </span>
        </div>
        <div className="content-wrap">
          <div className="content">
            <div className="title-wrap">
              <span className="title title--up">Memories</span>
              <span className="title title--down">Abound</span>
            </div>
          </div>
          <div className="content content--layout content--layout-1">
            <svg
              className="content__img content__img--1"
              width="896"
              height="1344"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 896 1344"
            >
              <defs>
                <filter id="displacementFilter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.03"
                    numOctaves="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="50"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <mask id="circleMask">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    data-value-final="820"
                    fill="white"
                    className="mask"
                    style={{ filter: "url(#displacementFilter)" }}
                  />
                </mask>
              </defs>
              <image
                xlinkHref="/assets/img/1.jpg"
                width="896"
                height="1344"
                mask="url(#circleMask)"
              />
            </svg>
            <Link className="home-cta" to={"/vans"}>
              View All Vans
            </Link>

            <p className="content__text">
              Make each voyage unforgettable with 360-degree views and
              photogenic backdrops.
            </p>
          </div>
        </div>

        <div className="content-wrap">
          <div className="content">
            <div className="title-wrap">
              <span className="title title--up">Luxury </span>
              <span className="title title--down">Interiors</span>
            </div>
          </div>
          <div className="content content--layout content--layout-3">
            <svg
              className="content__img content__img--3"
              width="1000"
              height="560"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1000 560"
            >
              <defs>
                <filter id="displacementFilter3">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="80"
                    result="displacement"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <mask id="pathMask">
                  <path
                    d="M 0 280 Q 500 280 1000 280 Q 500 280 0 280"
                    data-value-final="M 0 280 Q 500 800 1000 280 Q 500 -200 0 280"
                    fill="white"
                    className="mask"
                    style={{ filter: "url(#displacementFilter3)" }}
                  />
                </mask>
              </defs>
              <image
                xlinkHref="/assets/img/3.jpg"
                width="1000"
                height="560"
                mask="url(#pathMask)"
              />
            </svg>
            <Link className="home-cta" to={"/vans"}>
              View All Vans
            </Link>

            <p className="content__text">
              All of our vans have been customized with top-of-the-line
              amenities to ensure your comfort and convenience on the road.
              Enjoy premium seating, advanced technology, and high-end finishes
              throughout your travels.
            </p>
          </div>
        </div>

        <div className="content-wrap">
          <div className="content">
            <div className="title-wrap">
              <span className="title title--up">Endless </span>
              <span className="title title--down">Adventures</span>
            </div>
          </div>
          <div className="content content--layout content--layout-2">
            <svg
              className="content__img content__img--2"
              width="1000"
              height="450"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1000 450"
            >
              <defs>
                <filter id="displacementFilter2">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.1"
                    numOctaves="1"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    result="displacement"
                    scale="100"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                  <feMorphology
                    operator="dilate"
                    radius="2"
                    result="morph"
                    in="displacement"
                  />
                </filter>
                <mask id="circleMask2">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    data-value-final="950"
                    fill="white"
                    className="mask"
                    style={{ filter: "url(#displacementFilter2)" }}
                  />
                </mask>
              </defs>
              <image
                xlinkHref="/assets/img/4.jpg"
                width="1000"
                height="450"
                mask="url(#circleMask2)"
              />
            </svg>
            <Link className="home-cta" to={"/vans"}>
              View All Vans
            </Link>

            <p className="content__text">
              Rent one of our versatile vans and take your adventures further
              than you ever imagined. Explore new places, meet interesting
              people, and create lifelong memories.
            </p>
          </div>
        </div>

        <div className="content-wrap">
          <div className="content">
            <div className="title-wrap">
              <span className="title title--up">Outdoor </span>
              <span className="title title--down">Inspiration</span>
            </div>
          </div>
          <div className="content content--layout content--layout-4">
            <svg
              className="content__img content__img--4"
              width="1400"
              height="560"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1400 560"
            >
              <defs>
                <filter id="displacementFilter4">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.5"
                    numOctaves="1"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="50"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <mask id="circleMask4">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    data-value-final="770"
                    fill="white"
                    className="mask"
                    style={{ filter: "url(#displacementFilter4)" }}
                  />
                </mask>
              </defs>
              <image
                xlinkHref="/assets/img/2.jpg"
                width="1400"
                height="560"
                mask="url(#circleMask4)"
              />
            </svg>
            <Link className="home-cta" to={"/vans"}>
              View All Vans
            </Link>

            <p className="content__text">
              Our vans are perfectly equipped to help you maximize every outdoor
              experience
            </p>
          </div>
        </div>
        <div className="content-wrap">
          <div className="content">
            <div className="title-wrap">
              <span className="title title--up">Culinary </span>
              <span className="title title--down">Discovery</span>
            </div>
          </div>
          <div className="content content--layout content--layout-5">
            <svg
              className="content__img content__img--5"
              width="680"
              height="920"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 680 920"
            >
              <defs>
                <filter id="displacementFilter5">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.1"
                    numOctaves="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="150"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <mask id="circleMask5">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    data-value-final="580"
                    fill="white"
                    className="mask"
                    style={{ filter: "url(#displacementFilter5)" }}
                  />
                </mask>
              </defs>
              <image
                xlinkHref="/assets/img/5.jpg"
                width="680"
                height="920"
                mask="url(#circleMask5)"
              />
            </svg>
            <Link className="home-cta" to={"/vans"}>
              View All Vans
            </Link>

            <p className="content__text">
              Explore diverse cuisines, local eateries and hidden gems as you
              travel across varied landscapes.
            </p>
          </div>
        </div>
        <div className="content-wrap">
          <div className="content">
            <div className="title-wrap">
              <span className="title title--up">Fire</span>
              <span className="title title--down">Storm</span>
            </div>
          </div>
          <div className="content content--layout content--layout-6">
            <svg
              className="content__img content__img--6"
              width="1000"
              height="1000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1000 1000"
            >
              <defs>
                <filter id="displacementFilter6">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.01"
                    numOctaves="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    result="displacement"
                    scale="150"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                  <feGaussianBlur in="displacement" stdDeviation="10" />
                </filter>
                <mask id="circleMask6">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    data-value-final="720"
                    fill="white"
                    className="mask"
                    style={{ filter: "url(#displacementFilter6)" }}
                  />
                </mask>
              </defs>
              <image
                xlinkHref="/assets/img/6.jpg"
                width="1000"
                height="1000"
                mask="url(#circleMask6)"
              />
            </svg>
            <Link className="home-cta" to={"/vans"}>
              View All Vans
            </Link>

            <p className="content__text">
              Connect with like-minded travelers and bring people together
              through shared van adventures.
            </p>
          </div>
        </div>
        <div className="content-wrap">
          <div className="content">
            <div className="title-wrap">
              <span className="title title--up">Memories </span>
              <span className="title title--down">Abound</span>
            </div>
          </div>
          <div className="content content--layout content--layout-7">
            <svg
              className="content__img content__img--7"
              width="1400"
              height="560"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1400 560"
            >
              <defs>
                <filter id="displacementFilter7">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.03"
                    numOctaves="1"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="120"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <mask id="circleMask7">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    data-value-final="770"
                    fill="white"
                    className="mask"
                    style={{ filter: "url(#displacementFilter7)" }}
                  />
                </mask>
              </defs>
              <image
                xlinkHref="/assets/img/7.jpg"
                width="1400"
                height="560"
                mask="url(#circleMask7)"
              />
            </svg>
            <Link className="home-cta" to={"/vans"}>
              View All Vans
            </Link>

            <p className="content__text">
              Make each voyage unforgettable with 360-degree views and
              photogenic backdrops.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
