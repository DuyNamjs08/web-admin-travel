import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";

function ProgessBar({data}) {
  return (
    <div>
      <ChangingProgressProvider values={[0,data ? data : 0 ]}>
        {(value) => (
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "butt",
              trailColor: "#eee",
            })}
          />
        )}
      </ChangingProgressProvider>
    </div>
  );
}

export default ProgessBar;
