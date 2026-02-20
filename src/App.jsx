import { useCallback, useContext, useState } from "react";
import "./App.css";
import Door from "./Door";
import { InformationContext } from "./InformationContext";

function App() {
  const { DOORS } = useContext(InformationContext);
  const [isLocked, setLocked] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const onScroll = useCallback((event) => {
    const { target } = event;

    const percentage = target.scrollLeft / target.scrollWidth;
    setScrollPercentage(percentage);
  }, []);

  const getClassname = useCallback(() => {
    console.log(scrollPercentage);
    return `door-container-wrapper ${scrollPercentage !== 0 && "can-left "}  ${scrollPercentage !== 1 && "can-right"
      }`;
  }, [scrollPercentage]);
  return (
    <>
      <h1>Wybierz swoją ścieżkę...</h1>
      <div className={getClassname()} onScroll={onScroll}>
        <div className="door-container">
          {DOORS.map((door) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            <Door {...door} {...{ isLocked, setLocked }} />
          ))}
        </div>
      </div>
      <h2>W "Gzowskim", każde drzwi stoją przed tobą otworem</h2>
    </>
  );
}

export default App;
