import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export class ScrollSmoother {
  private lenis: Lenis;
  private isPaused = false;

  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    this.lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      this.lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
  }

  static create(_options: any) {
    return new ScrollSmoother();
  }

  static refresh(_force?: boolean) {
    ScrollTrigger.refresh();
  }

  paused(state?: boolean) {
    if (state === undefined) {
      return this.isPaused;
    }
    this.isPaused = state;
    if (state) {
      this.lenis.stop();
    } else {
      this.lenis.start();
    }
    return this;
  }

  scrollTop(val?: number) {
    if (val === undefined) {
      return this.lenis.scroll;
    }
    this.lenis.scrollTo(val, { immediate: true });
    return this;
  }

  scrollTo(target: any, smooth?: boolean, _position?: string) {
    this.lenis.scrollTo(target, {
      immediate: !smooth,
    });
    return this;
  }
}

export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          DS
        </a>
        <a
          href="mailto:dhruv22133@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          dhruv22133@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
