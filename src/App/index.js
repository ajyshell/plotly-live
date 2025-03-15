import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";

function App() {
  const plotRef = useRef();
  let cnt = 0;

  useEffect(() => {
    initPlot();
    setTimeout(() => {
      liveData();
    }, 1000);

    return () => {
      if (plotRef) {
        Plotly.purge(plotRef);
      }
    };
  }, []);

  function rand() {
    return Math.random();
  }

  function liveData() {
    var interval = setInterval(function () {
      Plotly.extendTraces(
        "plotDiv",
        {
          y: [[rand()]],
        },
        [0]
      );

      if (++cnt === 100) clearInterval(interval);
    }, 300);
  }

  function initPlot() {
    Plotly.newPlot("plotDiv", [
      {
        y: [1, 2, 3, 4, 5].map(rand),
        mode: "lines",
        line: { color: "#80CAF6" },
        layout: { width: 100, height: 200 },
      },
    ]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h3>Plot - Live</h3>
      <div ref={plotRef} id="plotDiv"></div>
    </div>
  );
}

export default App;
