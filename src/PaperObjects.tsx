import React from "react";

const ramp = (t: number, a: number, b: number) => {
  const p = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return p * p * (3 - 2 * p);
};
const colors = ["#378570", "#c69b3b", "#b7402c", "#365b7e", "#794060"];

export const SceneDefs = () => (
  <defs>
    <radialGradient id="wood" cx="52%" cy="65%" r="74%">
      <stop stopColor="#76501f" />
      <stop offset=".65" stopColor="#49300f" />
      <stop offset="1" stopColor="#201504" />
    </radialGradient>
    <radialGradient id="vignette">
      <stop offset=".4" stopColor="#000" stopOpacity="0" />
      <stop offset="1" stopColor="#000" stopOpacity=".6" />
    </radialGradient>
    <linearGradient id="paper" x2=".8" y2="1">
      <stop stopColor="#ecdfb9" />
      <stop offset=".55" stopColor="#d9cba3" />
      <stop offset="1" stopColor="#c3b58e" />
    </linearGradient>
    <linearGradient id="sky" x2="0" y2="1">
      <stop stopColor="#073c38" />
      <stop offset=".65" stopColor="#24765f" />
      <stop offset="1" stopColor="#caab66" />
    </linearGradient>
    <linearGradient id="beam">
      <stop stopColor="#e8d58a" stopOpacity="0" />
      <stop offset="1" stopColor="#e8d58a" stopOpacity=".75" />
    </linearGradient>
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency=".62"
        numOctaves="3"
        seed="11"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <filter id="labelShadow" x="-40%" y="-40%" width="200%" height="200%">
      <feDropShadow
        dx="12"
        dy="16"
        stdDeviation="4"
        floodColor="#130e05"
        floodOpacity=".5"
      />
    </filter>
    <filter id="objectShadow" x="-30%" y="-30%" width="200%" height="200%">
      <feDropShadow
        dx="28"
        dy="22"
        stdDeviation="3"
        floodColor="#211905"
        floodOpacity=".55"
      />
    </filter>
    <clipPath id="seaClip">
      <path d="M440 135L1480 135 1440 610 480 610Z" />
    </clipPath>
  </defs>
);

export const Paper: React.FC<{ width: number; height: number }> = ({
  width: w,
  height: h,
}) => (
  <g>
    <path
      d={`M0 3L${w} 0 ${w - 3} ${h} 2 ${h - 2}Z`}
      fill="url(#paper)"
      stroke="#b4a786"
      strokeWidth="2"
    />
    <rect
      x="12"
      y="12"
      width={w - 24}
      height={h - 24}
      fill="none"
      stroke="#9b947d"
      opacity=".5"
    />
    {Array.from({ length: 7 }, (_, i) => (
      <path
        key={i}
        d={`M22 ${25 + (i * (h - 43)) / 7}h${w - 44 - (i % 3) * 8}`}
        stroke="#9b947d"
        opacity=".2"
        strokeWidth="3"
      />
    ))}
  </g>
);

export const Machine: React.FC<{ time: number }> = ({ time }) => (
  <g filter="url(#objectShadow)">
    <path
      d="M0 90L100 0 600 35 545 140Z"
      fill="#a79e7e"
      stroke="#4a4534"
      strokeWidth="3"
    />
    <path
      d="M0 90L545 140 530 490 15 435Z"
      fill="#9c9476"
      stroke="#494632"
      strokeWidth="3"
    />
    <path d="M545 140L600 35 580 365 530 490Z" fill="#5c5c45" />
    <path d="M100 57L520 82" stroke="#181c13" strokeWidth="12" />
    <path d="M85 351L442 385" stroke="#201b10" strokeWidth="28" />
    <text
      x="265"
      y="261"
      fontFamily="Georgia,serif"
      fontSize="107"
      letterSpacing="12"
      textAnchor="middle"
      fill="#1d2016"
      transform="rotate(5 265 261)"
    >
      OMNI
    </text>
    <text
      x="272"
      y="307"
      fontFamily="Georgia,serif"
      fontSize="22"
      letterSpacing="7"
      textAnchor="middle"
      fill="#303021"
      transform="rotate(5 272 307)"
    >
      AI VIDEO MODEL
    </text>
    {[colors[2], colors[1], colors[0]].map((c, i) => (
      <g key={c} transform={`translate(558 ${190 + i * 65})`}>
        <path d="M0 0h46v17H0" fill={c} />
        <path d="M43 2v43h-20" stroke="#8d6228" strokeWidth="6" fill="none" />
      </g>
    ))}
    {[
      [25, 120],
      [512, 160],
      [35, 410],
      [500, 455],
    ].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="6" fill="#5d604a" />
        <path d={`M${x - 4} ${y}h8`} stroke="#bbb394" />
      </g>
    ))}
    {time > 1.6 && time < 2.8 && (
      <g
        transform={`translate(250 ${400 - 500 * (1 - ramp(time, 1.6, 2.25))})`}
      >
        <path d="M-100 45h200v55h-200Z" fill="#785018" />
        <path d="M-30 50v-100h60V50" fill="#93601c" />
        <circle cy="-65" r="44" fill="#aa7527" />
      </g>
    )}
  </g>
);

export const Speech: React.FC<{ symbol: string; color: string }> = ({
  symbol,
  color,
}) => (
  <g filter="url(#labelShadow)">
    <path
      d="M-90 0C-100-100 95-100 100-5Q100 50 0 50l-50 55 2-67Q-88 27-90 0Z"
      fill={color}
      stroke="#c5b78f"
      strokeWidth="6"
    />
    <text textAnchor="middle" y="19" fontSize="66" fill="#e2d4ac">
      {symbol}
    </text>
  </g>
);

const Seascape: React.FC<{ time: number }> = ({ time }) => (
  <g clipPath="url(#seaClip)">
    <rect x="430" y="130" width="1060" height="490" fill="url(#sky)" />
    {Array.from({ length: 34 }, (_, i) => (
      <circle
        key={i}
        cx={465 + ((i * 137) % 950)}
        cy={150 + ((i * 71) % 260)}
        r={1 + (i % 2)}
        fill="#c2bd81"
        opacity=".3"
      />
    ))}
    <circle cx="720" cy="275" r="88" fill="#dfcd92" />
    {[
      [-34, 20],
      [25, -25],
      [40, 34],
      [-15, -46],
    ].map(([x, y], i) => (
      <circle
        key={i}
        cx={720 + x}
        cy={275 + y}
        r={12 + i * 3}
        fill="#bcb583"
        opacity=".26"
      />
    ))}
    <path
      d="M430 440L565 384 655 430 760 390 850 427 960 387 1085 442 1200 392 1480 450V610H430Z"
      fill="#58745e"
    />
    <path
      d="M430 473L580 420 690 450 850 415 945 454 1060 427 1210 477 1490 427V620H430Z"
      fill="#325b4f"
    />
    <rect x="430" y="478" width="1080" height="135" fill="#063d43" />
    {Array.from({ length: 23 }, (_, i) => (
      <path
        key={i}
        d={`M${470 + ((i * 107) % 750)} ${488 + i * 5}h${25 + (i % 5) * 24}`}
        stroke="#72a08b"
        opacity=".45"
      />
    ))}
    <path d="M1190 610V484l70-53 88-10 140-10v199Z" fill="#302b16" />
    <path
      d="M1260 431l88-10 140-10"
      fill="none"
      stroke="#74853b"
      strokeWidth="12"
    />
    <g transform="translate(1330 240)">
      <path d="M0 180L14 12h44l14 168Z" fill="#e8d9aa" />
      {[40, 85, 130].map((y) => (
        <path
          key={y}
          d={`M${14 - y * 0.06} ${y}h${44 + y * 0.12}v22H${14 - y * 0.06}Z`}
          fill="#b03923"
        />
      ))}
      <rect
        x="7"
        y="0"
        width="57"
        height="28"
        fill="#bf9a31"
        stroke="#303c21"
        strokeWidth="5"
      />
      <path d="M4 0l31-25L68 0Z" fill="#9f3b22" />
      <path
        d={`M35 13L${35 - 260 * Math.cos(time * 0.9)} -25V66Z`}
        fill="url(#beam)"
      />
    </g>
    {Array.from({ length: 7 }, (_, i) => (
      <g key={i} transform={`translate(${480 + i * 42} ${438 + (i % 2) * 3})`}>
        <rect width="37" height="55" fill={i % 2 ? "#d5c897" : "#f0dfaf"} />
        <path
          d="M-2 0L18-23 39 0Z"
          fill={["#a83b26", "#ba9239", "#2d705f"][i % 3]}
        />
        <path d="M20 7v45" stroke="#a1956c" />
      </g>
    ))}
  </g>
);

const Character = () => (
  <g filter="url(#objectShadow)">
    <path
      d="M-26-105Q-42-178 0-184 50-180 31-106"
      fill="#332c22"
      stroke="#e4d7b4"
      strokeWidth="6"
    />
    <ellipse cy="-142" rx="25" ry="31" fill="#c49156" />
    <path d="M-23-159Q0-189 27-153" fill="#30291e" />
    <path
      d="M-38-113H35l9 93h-88Z"
      fill="#caa42e"
      stroke="#e4cf94"
      strokeWidth="5"
    />
    <path d="M-18-17v51M20-17v51" stroke="#393d30" strokeWidth="13" />
    <path d="M-27 35h22m10 0h23" stroke="#ad3522" strokeWidth="13" />
  </g>
);

const Train = () => (
  <g filter="url(#objectShadow)">
    <path
      d="M-70-35h125v50H-70Z"
      fill="#272c25"
      stroke="#ddc898"
      strokeWidth="5"
    />
    <path
      d="M-73-49h12v25h-12M25-65h40v45H25Z"
      fill="#242820"
      stroke="#d7c493"
      strokeWidth="4"
    />
    <rect x="32" y="-58" width="23" height="22" fill="#cda43b" />
    <path d="M-69 0H58" stroke="#b13a24" strokeWidth="10" />
    {[-48, -11, 27, 59].map((x) => (
      <circle
        key={x}
        cx={x}
        cy="23"
        r="14"
        fill="#25261e"
        stroke="#c1a465"
        strokeWidth="4"
      />
    ))}
  </g>
);
const Rocket = () => (
  <g filter="url(#objectShadow)">
    <path
      d="M0-115Q35-80 25-10L0 15-25-10Q-35-80 0-115"
      fill="#e3d5ac"
      stroke="#bcb18c"
      strokeWidth="3"
    />
    <path d="M0-115l20 36h-40Z" fill="#b63d26" />
    <circle cy="-52" r="12" fill="#316c84" />
    <path d="M-25-28l-25 44 26-9M25-28l25 44-26-9" fill="#b9422b" />
    <path d="M-12 13L0 47 13 13" fill="#cda038" />
  </g>
);
const Computer = () => (
  <g filter="url(#objectShadow)">
    <path
      d="M-55-85h110v87H-55Z"
      fill="#c3ba8c"
      stroke="#e4d9b0"
      strokeWidth="5"
    />
    <rect x="-43" y="-72" width="86" height="56" rx="3" fill="#16402c" />
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M-32 ${-58 + i * 12}h${47 - i * 9}`}
        stroke="#9ac37a"
        strokeWidth="3"
      />
    ))}
    <path d="M-57 6h114l14 25H-70Z" fill="#d7cda6" />
    {Array.from({ length: 9 }, (_, i) => (
      <path
        key={i}
        d={`M${-53 + i * 13} 14v9`}
        stroke="#8d927a"
        strokeWidth="6"
      />
    ))}
  </g>
);

const FilmCard: React.FC<{ index: number; colored: number }> = ({
  index,
  colored,
}) => (
  <g>
    <path
      d="M0 0Q100 15 205 0V210Q105 228 0 210Z"
      fill="url(#paper)"
      stroke="#9c9577"
      strokeWidth="3"
    />
    {Array.from({ length: 17 }, (_, i) => (
      <g key={i}>
        <rect x={5 + i * 12} y="5" width="6" height="7" fill="#7b7d61" />
        <rect x={5 + i * 12} y="202" width="6" height="7" fill="#7b7d61" />
      </g>
    ))}
    <text x="10" y="35" fontSize="13" fill="#444a36">
      镜头 {index + 1}
    </text>
    <text x="195" y="37" textAnchor="end" fontSize="25" fill="#af4b30">
      {[1920, 1965, 1995, 2035][index]}
    </text>
    <rect
      x="12"
      y="48"
      width="180"
      height="143"
      fill="#d6cba8"
      stroke="#aaa184"
    />
    <g opacity={1 - colored} stroke="#a59e7f" fill="none">
      <path d="M25 150l40-30 40 27 40-65 30 60M25 165h140M50 70v110m90-110v110" />
      <circle cx="85" cy="100" r="20" />
    </g>
    <g opacity={colored}>
      <rect
        x="12"
        y="48"
        width="180"
        height="143"
        fill={["#cb872d", "#29869b", "#317da5", "#211e42"][index]}
      />
      <circle cx="165" cy="75" r="17" fill="#e3c777" />
      <path
        d="M12 145l35-20 40 22 30-35 75 39v40H12Z"
        fill={["#49371e", "#c4ae47", "#e3c782", "#144c50"][index]}
      />
      {index === 0 && (
        <path d="M30 141h90l-15-10-30 2-30-18h-20l22 28-25 8" fill="#28281f" />
      )}
      {index === 1 && (
        <g transform="translate(120 150) rotate(30) scale(.45)">
          <Rocket />
        </g>
      )}
      {index === 2 &&
        [0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={32 + i * 28}
            y={112 - (i % 3) * 19}
            width="18"
            height={55 + (i % 3) * 19}
            fill="#e1d4ac"
          />
        ))}
      {index === 3 &&
        [0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${70 + i * 36} 164v-65l-12 9m12-9l12 9`}
            fill="none"
            stroke="#8e63b1"
            strokeWidth="8"
          />
        ))}
    </g>
  </g>
);

export const Book: React.FC<{
  time: number;
  opening: number;
  detail: number;
}> = ({ time: t, opening: o, detail }) => {
  const flat = t < 8;
  const film = (t < 31.5 ? ramp(t, 14, 15.5) : ramp(t, 35.8, 36.6)) * o;
  const props = (t < 31.5 ? ramp(t, 16, 18.5) : ramp(t, 36, 36.8)) * o;
  const colored = ramp(t, 19.3, 21.1);
  const labels = [
    "◎世界观·故事",
    "⌛ 时间跨度",
    "▦ 时代背景",
    "✎ 画面风格",
    "♪ 节奏·声音",
  ];
  return (
    <g>
      <path
        d="M430 780L1510 780 1860 540 1050 585Z"
        fill="#110f06"
        opacity=".48"
      />
      <path
        d="M480 590L1440 590 1570 845 350 845Z"
        fill="#123a43"
        stroke="#101f20"
        strokeWidth="12"
      />
      <path
        d="M490 591L1430 591 1548 820 373 820Z"
        fill="#e5d6b1"
        stroke="#b5a77f"
        strokeWidth="3"
      />
      {flat ? (
        <>
          <path
            d="M480 590L1440 590 1335 395 580 395Z"
            fill="url(#paper)"
            stroke="#183a3e"
            strokeWidth="12"
          />
          {colors.map((c, i) => (
            <path
              key={c}
              d="M490 610L1430 610 1530 805 390 805Z"
              fill={c}
              opacity={ramp(t, 6.2 + i * 0.11, 6.45 + i * 0.11)}
              transform={`translate(0 ${-i * 14})`}
            />
          ))}
        </>
      ) : (
        <g
          transform={`translate(0 ${610 * (1 - o)}) scale(1 ${Math.max(0.001, o)})`}
        >
          <path
            d="M440 135L1480 135 1440 610 480 610Z"
            fill="url(#paper)"
            stroke="#14343b"
            strokeWidth="16"
          />
          <g opacity={detail}>
            <Seascape time={t} />
          </g>
        </g>
      )}
      {!flat && (
        <g
          opacity={detail}
          transform={`translate(0 ${620 * (1 - detail)}) scale(1 ${Math.max(0.001, detail)})`}
        >
          <path
            d="M480 609Q500 560 545 603Q585 558 625 603Q669 553 710 603Q755 560 800 603Q848 558 895 603Q940 560 985 603Q1030 558 1075 603Q1120 560 1165 603Q1210 558 1255 603Q1300 560 1345 603Q1400 560 1440 603V650H480Z"
            fill="#367e5c"
            stroke="#8faf81"
            strokeWidth="4"
          />
          <path d="M480 630h960v28H480" fill="#b49d59" />
          {Array.from({ length: 33 }, (_, i) => (
            <path
              key={i}
              d={`M${490 + i * 28} 634l7 14 7-14`}
              stroke="#567441"
              fill="none"
              strokeWidth="5"
            />
          ))}
        </g>
      )}
      <g
        opacity={film}
        transform={`translate(510 ${735 - film * 180}) scale(1 ${Math.max(0.001, film)})`}
      >
        {[0, 1, 2, 3].map((i) => (
          <g
            key={i}
            transform={`translate(${i * 207} ${(i % 2) * 7}) skewY(${i % 2 ? -3 : 3})`}
            filter="url(#labelShadow)"
          >
            <FilmCard index={i} colored={colored} />
          </g>
        ))}
      </g>
      <g opacity={props}>
        <g transform={`translate(610 ${810 - props * 46}) scale(${props})`}>
          <Train />
        </g>
        <g transform={`translate(810 ${820 - props * 40}) scale(${props})`}>
          <Rocket />
        </g>
        <g transform={`translate(1050 ${820 - props * 30}) scale(${props})`}>
          <Computer />
        </g>
        <g transform="translate(1270 755)" stroke="#799678" strokeWidth="5">
          <path d="M0 55V-45M0-35h35M0-6h28" />
          <path
            d="M0-45l45 15-45 10"
            fill="#b74729"
            stroke="#cbbd8e"
            strokeWidth="3"
          />
        </g>
      </g>
      <g
        opacity={detail}
        transform={`translate(${1060 + 370 * ramp(t, 13, 15)} ${710 + 90 * ramp(t, 13, 15)}) scale(${detail * 0.9})`}
      >
        <Character />
      </g>
      {t > 22 && (
        <g
          opacity={props * ramp(t, 22, 23.2)}
          transform="translate(440 775)"
          filter="url(#objectShadow)"
        >
          <path
            d="M-45 25l15-75 80-30 10 70Z"
            fill="#67305f"
            stroke="#d6c49c"
            strokeWidth="4"
          />
          <ellipse cx="18" cy="-32" rx="57" ry="42" fill="#6c2a60" />
          <path d="M-40 43h100v25H-40Z" fill="#676a45" />
          {Array.from({ length: 24 }, (_, i) => (
            <path
              key={i}
              d={`M${-85 + i * 8} -100v${10 + Math.abs(Math.sin(i + t * 4)) * 28}`}
              stroke="#bc8dad"
              strokeWidth="3"
            />
          ))}
        </g>
      )}
      {!flat && (
        <g opacity={1 - o}>
          <path
            d="M480 590L1440 590 1570 825 350 825Z"
            fill="#123641"
            stroke="#071f27"
            strokeWidth="12"
          />
          <path
            d="M490 612L1430 612 1526 800 393 800Z"
            fill="none"
            stroke="#b39a54"
            strokeWidth="2"
          />
          <path
            d="M500 622L1420 622 1509 789 410 789Z"
            fill="none"
            stroke="#8d844e"
            strokeWidth="2"
          />
          <text
            x="960"
            y="728"
            fontSize="64"
            textAnchor="middle"
            fill="#c5a853"
            transform="translate(0 185) scale(1 .74)"
          >
            视频生成提示词
          </text>
        </g>
      )}
      {colors.map((c, i) => (
        <path key={c} d={`M${440 + i * 220} 834h65l10 32h-69Z`} fill={c} />
      ))}
      {t > 9 &&
        labels.map((text, i) => (
          <g
            key={text}
            opacity={ramp(t, 9 + i * 0.2, 9.6 + i * 0.2)}
            transform={`translate(${350 + i * 253} ${825 + (i % 2) * 11}) rotate(${[9, 4, -2, -5, -9][i]})`}
            filter="url(#labelShadow)"
          >
            <path d="M-6 0h224l-5 87H0Z" fill="url(#paper)" />
            <path d="M0 0h215" stroke={colors[i]} strokeWidth="6" />
            <text
              x="107"
              y="56"
              textAnchor="middle"
              fontSize="29"
              fill={colors[i]}
            >
              {text}
            </text>
            {t > 25 && (
              <text
                x="195"
                y="8"
                fontSize="53"
                fill="#ad3824"
                opacity={ramp(t, 25 + i * 0.12, 25.4 + i * 0.12)}
              >
                ✓
              </text>
            )}
          </g>
        ))}
    </g>
  );
};
