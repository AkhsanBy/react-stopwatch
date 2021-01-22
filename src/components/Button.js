import React from "react";

export default function Button() {
  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={props.startTimer}>
        Start
      </button>
    </div>
  );
}
