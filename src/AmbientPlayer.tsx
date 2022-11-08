import "./style.css";
import React, { useRef, useState, useEffect, VideoHTMLAttributes } from "react";

interface AmbientPlayerProps {
  /**
   * @required
   * Array of sources to be used by the video element.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
   * @example
   * [
   *  {
   *    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
   *    type: "video/webm",
   * },
   * {
   *    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
   *    type: "video/mp4",
   * },
   * ]
   */
  sources: {
    src: string | undefined;
    type: string | undefined;
  }[];

  /**
   * @optional
   * Frame extraction interval in milliseconds.
   * @default 5000
   */
  interval?: number;

  /**
   * @optional
   * Props to be passed to the video element.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
   * @example
   * {
   * muted: true,
   * loop: true,
   * }
   */
  videoProps?: VideoHTMLAttributes<HTMLVideoElement>;
}

const AmbientPlayer = ({
  sources,
  interval = 5000,
  videoProps,
}: AmbientPlayerProps) => {
  let canvasRefs = useRef<
    {
      index: number;
      canvas: HTMLCanvasElement;
      context?: CanvasRenderingContext2D | null;
    }[]
  >([]);
  let videoRef = useRef<HTMLVideoElement>(null);
  const extractionInterval = useRef<NodeJS.Timer>();

  const ANIMATION_DURATION = useRef(interval * 0.2).current;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentContextIndex, setCurrentContextIndex] = useState(0);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const startExtractInterval = async () => {
    if (!videoRef.current) return;
    let [clientWidth, clientHeight] = [
      videoRef.current.clientWidth,
      videoRef.current.clientHeight,
    ];

    setCanvasDimensions({
      width: clientWidth,
      height: clientHeight,
    });

    let currentCtxIndex = currentContextIndex;

    extractionInterval.current = setInterval(async () => {
      if (!videoRef.current) return;
      let nextIndex = currentCtxIndex === 0 ? 1 : 0;
      canvasRefs.current[nextIndex].context?.drawImage(
        videoRef.current,
        0,
        0,
        clientWidth,
        clientHeight
      );

      canvasRefs.current[nextIndex].canvas.style.opacity = "1";
      await delay(ANIMATION_DURATION);
      canvasRefs.current[currentCtxIndex].canvas.style.opacity = "0";
      currentCtxIndex = nextIndex;
      setCurrentContextIndex(nextIndex);
    }, interval);
  };

  useEffect(() => {
    if (isPlaying) {
      startExtractInterval();
    } else {
      clearInterval(extractionInterval.current);
    }
    return () => {
      clearInterval(extractionInterval.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (canvasRefs.current.length === 2) {
      canvasRefs.current = canvasRefs.current.map((ref) => {
        return {
          ...ref,
          context: ref.canvas.getContext("2d"),
        };
      });
    }
  }, [canvasRefs]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("playing", () => {
        setIsPlaying(true);
      });
      videoRef.current.addEventListener("pause", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("playing", () => {
          setIsPlaying(true);
        });
        videoRef.current.removeEventListener("pause", () => {
          setIsPlaying(false);
        });
      }
    };
  }, [videoRef]);

  return (
    <div className="ambient-player-container">
      <div className="ambient-player-cinematics">
        <canvas
          ref={(el) => {
            if (el)
              canvasRefs.current.push({
                index: 0,
                canvas: el,
              });
          }}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          style={{ transitionDuration: `${ANIMATION_DURATION}ms` }}
          className="ambient-player-canvas"
        />
        <canvas
          ref={(el) => {
            if (el)
              canvasRefs.current.push({
                index: 1,
                canvas: el,
              });
          }}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          style={{ transitionDuration: `${ANIMATION_DURATION}ms` }}
          className="ambient-player-canvas"
        />
      </div>
      <video ref={videoRef} controls {...videoProps}>
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        <p>Your browser doesn't support HTML video.</p>
      </video>
    </div>
  );
};

export { AmbientPlayer };
