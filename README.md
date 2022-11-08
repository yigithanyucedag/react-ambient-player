# React Ambient Player

[![npm version](https://img.shields.io/npm/v/react-ambient-player.svg?style=flat-square)](https://www.npmjs.com/package/react-ambient-player)
[![npm downloads](https://img.shields.io/npm/dm/react-ambient-player.svg?style=flat-square)](https://www.npmjs.com/package/react-ambient-player)

![Screenshot](docs/preview.png)

Video player backlight changing according to video content

## Installation

```
npm install react-ambient-player
```

## Usage

```typescript jsx
import React from "react";
import AmbientPlayer from "react-ambient-player";

const App = () => {
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
};

export default App;
```

## Props

| Name       | Type                                    | Default     | Description                                       |
| ---------- | --------------------------------------- | ----------- | ------------------------------------------------- |
| sources    | `Array<{ src: string; type: string; }>` | `undefined` | Array of sources to be used by the video element. |
| interval   | `number`                                | `5000`      | Frame extraction interval in milliseconds.        |
| videoProps | `VideoHTMLAttributes<HTMLVideoElement>` | `undefined` | Props to be passed to the video element.          |

## License

MIT

## Author

<table>
<tr>
    <td align="center">
        <a href="https://github.com/yigithanyucedag">
            <img src="https://avatars.githubusercontent.com/u/25598773?v=4" width="100;" alt="yigithanyucedag"/>
            <br />
            <sub><b>Yiğithan</b></sub>
        </a>
    </td></tr>
</table>
