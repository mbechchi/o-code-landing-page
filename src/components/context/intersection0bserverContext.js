import React, { useEffect, useState } from "react";
import { useIntersection } from "react-use";

const IntersectionContext = React.createContext({ inView: true });

const IntersectionContextConsumer = IntersectionContext.Consumer;

const IntersectionObserverProvider = ({
  children,
  reset = false, // trigger once if false
  ...rest
}) => {
  const [inView, setInView] = useState(false);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0
  });

  useEffect(() => {
    const inViewNow = intersection && intersection.intersectionRatio > 0;
    if (inViewNow) {
      return setInView(inViewNow);
    } else if (reset) {
      return setInView(false);
    }
  }, [intersection, reset]);

  return (
    <IntersectionContext.Provider value={{ inView }}>
      <div ref={intersectionRef} {...rest}>{children}</div>
    </IntersectionContext.Provider>
  );
};

export { IntersectionContext, IntersectionContextConsumer, IntersectionObserverProvider }
