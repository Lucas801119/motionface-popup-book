# 立体书：约束越多，作品越能脱颖而出

使用 Remotion、React 和 SVG 复刻的可编辑纸艺动画。包含 OMNI 机器、对话气泡、书册展开、灯塔海景、时代分镜、纸偶、镜头对照和散纸转场。

参考片段：[Motionface 页面](https://motionface.cc/?recording=ad1b3f0a-1770-4743-a28f-9a7ad9c378af)。详细拆解与差异见 [参考分析](docs/参考分析.md)，实际检查结果见 [验证记录](docs/验证记录.md)。

![复刻代表帧](docs/preview.jpg)

## 运行

安装 Node.js（版本范围见 package.json），在仓库根目录运行：

```powershell
npm ci
npm run dev
```

在终端打印的 Studio 地址打开 `PopupBook`。字体随依赖打包，音轨在 `public/reference-audio.m4a`，运行不需要参考视频临时地址或网站凭证。

## 检查与渲染

```powershell
npm run check
npm run build
npm run render -- --port=3107
npm run still -- --port=3108
```

视频输出到仓库的同级目录 `../outputs/popup-book.mp4`，静帧输出到 `../outputs/poster.png`。同级交付目录用于保持源码和生成产物分离。如需自行指定路径：

```powershell
npx remotion render src/index.ts PopupBook ./output.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --port=3107
```

首次渲染时 Remotion 会下载 Chrome Headless Shell。渲染端口与 Studio 分离，以避免启动页复用影响 composition 获取。

组合规格为 1920×1080、30 fps、1146 帧（38.2 秒），来源是参考文件 ffprobe 输出。

## 文件

- `src/Composition.tsx`：主镜头、转场、字幕、音轨和组合注册。
- `src/PaperObjects.tsx`：可编辑的纸艺图形、书页、人物和道具。
- `src/timeline.ts`：中文字幕和显示时间。
- `public/reference-audio.m4a`：参考音轨。
- `package-lock.json`：锁定依赖。
- `docs/`：参考分析、验证证据与代表帧。

## 复刻范围

本实现以 React/SVG 重建画面，没有嵌入原视频。构图、配色、叙事顺序与音轨对应参考；三维材质、折纸透视、纸偶细节和复杂灯光是程序化近似，不宣称像素级一致。音轨保留原权利，未附加开放许可；字体许可随 Fontsource 依赖提供。

绑定脚本和授权凭证不存入公开仓库。
