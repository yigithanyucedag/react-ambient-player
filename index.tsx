import React from "react";
import AmbientPlayer from "./src/AmbientPlayer";

export default function index() {
  return (
    <AmbientPlayer
      sources={[
        {
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
          type: "video/webm",
        },
        {
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          type: "video/mp4",
        },
      ]}
    />
  );
}
