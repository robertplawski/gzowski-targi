import { useCallback, useContext, useState } from "react";
import Door from "../Door";
import { InformationContext } from "../InformationContext";
import { Fade } from "react-awesome-reveal";

// dwa okienka teoria i praktyka

function Doors() {
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
    <Fade>
      <h1>Wybierz swoją ścieżkę kariery...</h1>
      <div className={getClassname()} onScroll={onScroll}>
        <div className="door-container">
          {DOORS.map((door) => (
            <Door
              key={`door${door.url}`}
              {...door}
              {...{ isLocked, setLocked }}
            />
          ))}
        </div>
      </div>
      <h2>W "Gzowskim", każde drzwi stoją przed tobą otworem</h2>
    </Fade>
  );
}

export default Doors;
