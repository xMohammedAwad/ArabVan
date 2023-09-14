import React from "react";
import { Parallax } from "react-scroll-parallax";
import { animated, useInView, useSpring } from "react-spring";

const ScrollPath = ({ text, offset }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  const props = useSpring({ strokeDashoffset: inView ? 0 : 1000 });

  return (
    <div ref={ref}>
      <Parallax y={[-20, 20]} tagOuter="figure">
        <svg width="100%" height="800px">
          <animated.path
            id="path"
            d={`M10 80 Q 95 10 180 80 T 360 160 T 540 240 T 720 320 T 900 400`}
            stroke="green"
            fill="transparent"
            strokeWidth="10"
            strokeDasharray="1000"
            strokeDashoffset={props.strokeDashoffset}
          />
          <text fill="white" fontSize="20">
            <textPath href="#path" startOffset="5%">
              {text}
            </textPath>
          </text>
        </svg>
      </Parallax>
    </div>
  );
};

export default ScrollPath;
