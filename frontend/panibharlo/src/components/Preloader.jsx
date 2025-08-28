import React from "react";

export default function Preloader() {
  return (
    <div className="loader-wrap">
      <div className="preloader">
        <div className="preloader-close">Preloader Close</div>
        <div id="handle-preloader" className="handle-preloader">
          <div className="animation-preloader">
            <div className="spinner"></div>
            <div className="txt-loading">
              {"acuasafe".split("").map((letter, i) => (
                <span
                  key={i}
                  data-text-preloader={letter}
                  className="letters-loading"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
