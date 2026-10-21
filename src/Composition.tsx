import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "@fontsource/noto-serif-sc/700.css";
import { Book, Machine, Paper, SceneDefs, Speech } from "./PaperObjects";
import { captions } from "./timeline";

const ease = (t: number, a: number, b: number) => {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

export const PopupBook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const comparison = ease(t, 26, 28) * (1 - ease(t, 32.5, 34));
  const machineVisible = t < 3.7 || (t > 26 && t < 34);
  const opening =
    t < 8
      ? 0
      : t < 31.5
        ? ease(t, 8.5, 10)
        : t < 35
          ? 1 - ease(t, 31.5, 32.4)
          : ease(t, 35, 36.1);
  const detail = t < 31.5 ? ease(t, 11.3, 12.6) : ease(t, 35.6, 36.5);
  const camera = 1 + 0.12 * ease(t, 15, 17) - 0.12 * ease(t, 24, 26);
  const subtitle = captions.find((c) => t >= c.start && t < c.end);
  return (
    <AbsoluteFill style={{ backgroundColor: "#352008" }}>
      <Audio src={staticFile("reference-audio.m4a")} />
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          fontFamily: '"Noto Serif SC", SimSun, serif',
          fontWeight: 700,
        }}
      >
        <SceneDefs />
        <rect width="1920" height="1080" fill="url(#wood)" />
        {Array.from({ length: 74 }, (_, i) => (
          <path
            key={i}
            d={`M0 ${i * 16} Q 580 ${i * 16 + 12} 1920 ${i * 16 - 8}`}
            stroke="#a67635"
            opacity={0.035 + (i % 3) * 0.009}
            fill="none"
            strokeWidth={1 + (i % 2)}
          />
        ))}
        <rect width="1920" height="1080" fill="url(#vignette)" />
        <g
          transform={`translate(${960 - 960 * camera} ${450 - 450 * camera}) scale(${camera})`}
        >
          {t >= 31.4 && (
            <g>
              {Array.from({ length: 38 }, (_, i) => {
                const p = ease(
                  t,
                  31.4 + (i % 7) * 0.055,
                  33.3 + (i % 5) * 0.12,
                );
                const x = 280 + ((i * 397) % 1500);
                const y = 610 + ((i * 131) % 300);
                return (
                  <g
                    key={i}
                    opacity={p}
                    transform={`translate(${960 + (x - 960) * p} ${-230 + (y + 230) * p}) rotate(${((i * 61) % 150) - 75}) scale(${0.55 + (i % 4) * 0.1})`}
                  >
                    <Paper width={160} height={100} />
                  </g>
                );
              })}
            </g>
          )}
          {machineVisible && (
            <g
              transform={`translate(${t < 3.7 ? 640 : 180} ${t < 3.7 ? 180 : 340}) scale(${t < 3.7 ? 1 : 0.64})`}
              opacity={t < 3.7 ? 1 - ease(t, 3.25, 3.7) : ease(t, 26, 27)}
            >
              <Machine time={t} />
              {t < 1.7 && (
                <g
                  transform={`translate(${230 - 140 * ease(t, 0.4, 1.4)} ${180 - 310 * ease(t, 0.4, 1.4)}) rotate(4)`}
                >
                  <Paper width={360} height={210} />
                  <text
                    x="180"
                    y="105"
                    textAnchor="middle"
                    fontSize="30"
                    fill="#3d301a"
                  >
                    海边、女孩、电影感
                  </text>
                </g>
              )}
              {t > 1.7 && (
                <g transform="translate(80 480) skewX(-25) scale(1 .6)">
                  <Paper width={300} height={160} />
                  <circle
                    cx="235"
                    cy="85"
                    r="42"
                    fill="none"
                    stroke="#a83326"
                    strokeWidth="7"
                  />
                  <path
                    d="M210 60l50 50m0-50l-50 50"
                    stroke="#a83326"
                    strokeWidth="7"
                  />
                </g>
              )}
              {t > 28 && (
                <g transform="translate(45 300) rotate(-4)">
                  <Paper width={370} height={100} />
                  <text x="185" y="66" textAnchor="middle" fontSize="47">
                    平均水平
                  </text>
                </g>
              )}
            </g>
          )}
          {t >= 3.55 && (
            <g
              opacity={ease(t, 3.55, 3.95)}
              transform={`translate(${comparison * 530} ${comparison * 80}) scale(${1 - comparison * 0.32})`}
            >
              <Book time={t} opening={opening} detail={detail} />
              {t < 8.5 && (
                <>
                  <g transform="translate(170 690) rotate(-9)">
                    <Paper width={210} height={125} />
                    <text x="105" y="85" textAnchor="middle" fontSize="56">
                      我
                    </text>
                  </g>
                  <g transform="translate(1560 690) rotate(8)">
                    <Paper width={220} height={125} />
                    <text
                      x="110"
                      y="75"
                      textAnchor="middle"
                      fontSize="32"
                      fill="#4d4277"
                    >
                      ✦Gemini
                    </text>
                  </g>
                  {[
                    ["◎", 240, 530, "#176950", 3.8],
                    ["▦", 270, 390, "#a53620", 4.5],
                    ["♪", 230, 230, "#702b62", 5.2],
                    ["⌛", 1640, 540, "#b28a25", 4.2],
                    ["✎", 1650, 340, "#16466a", 5.5],
                  ].map(([s, x, y, c, start], i) => (
                    <g
                      key={i}
                      opacity={
                        ease(t, Number(start), Number(start) + 0.4) *
                        (1 - ease(t, 6.4, 7))
                      }
                      transform={`translate(${x} ${Number(y) + Math.sin(t * 2 + i) * 8})`}
                    >
                      <Speech symbol={String(s)} color={String(c)} />
                    </g>
                  ))}
                </>
              )}
            </g>
          )}
          {t > 28.5 && t < 32 && (
            <text
              x="670"
              y="650"
              textAnchor="middle"
              fontSize="135"
              fill="#b83325"
              stroke="#ead9ad"
              strokeWidth="4"
              paintOrder="stroke"
              opacity={ease(t, 28.5, 29)}
            >
              ≠
            </text>
          )}
        </g>
        <rect
          width="1920"
          height="1080"
          filter="url(#grain)"
          opacity=".12"
          style={{ mixBlendMode: "multiply" }}
        />
        {subtitle && (
          <g transform="translate(960 1020) rotate(-1)">
            <path
              d={`M${-subtitle.text.length * 24 - 28} -40 L${subtitle.text.length * 24 + 25} -44 l7 76 L${-subtitle.text.length * 24 - 22} 37 Z`}
              fill="#f6f0d9"
              filter="url(#labelShadow)"
            />
            <text textAnchor="middle" y="13" fontSize="39" fill="#202318">
              {subtitle.text}
            </text>
          </g>
        )}
        <rect
          width="1920"
          height="1080"
          fill="#000"
          opacity={interpolate(t, [37.35, 38.2], [0, 0.92], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const MyComposition = () => (
  <Composition
    id="PopupBook"
    component={PopupBook}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={1146}
  />
);
