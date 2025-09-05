export type Color = "green" | "yellow" | "red";
export type Mode = "rest" | "exercise";

const COLOR_HEX: Record<Color, string> = {
  green: "#22c55e",
  yellow: "#fbbf24",
  red: "#ef4444",
};

export interface VitalsInput {
  mode: Mode;        // "rest" | "exercise"
  age?: number;
  hr?: number;       // bpm
  rr?: number;       // breaths/min
  spo2?: number;     // %
  coreTempC?: number;// ℃
  skinTempDeltaC?: number;
  skinTempMinutes?: number;
}

export interface VitalsOutputItem {
  metric: string;
  color: Color;
  hex: string;
  label: string;     // '정상/주의/경고'
  message: string;
}

function label(c: Color) {
  return c === "green" ? "정상" : c === "yellow" ? "주의" : "경고";
}
function hex(c: Color) { return COLOR_HEX[c]; }

function classifyRestingHR(hr: number): Color {
  if (hr < 50 || hr > 120) return "red";
  if (hr < 60 || hr > 100) return "yellow";
  return "green";
}
function classifyRR(rr: number): Color {
  if (rr <= 11 || rr >= 25) return "red";
  if (rr >= 19 && rr <= 24) return "yellow";
  return "green";
}
function classifySpO2(s: number): Color {
  if (s <= 90) return "red";
  if (s <= 94) return "yellow";
  return "green";
}
function classifyCoreTemp(t: number): Color {
  if (t >= 38.0 || t <= 35.0) return "red";
  if (t >= 37.5 || t < 36.1) return "yellow";
  return "green";
}
function classifySkinTemp(deltaC: number, minutes = 0): Color {
  const a = Math.abs(deltaC);
  if (a >= 1.5 && minutes >= 30) return "red";
  if (a >= 0.7) return "yellow";
  return "green";
}
function classifyHRExercise(hr: number, age: number): Color {
  const hrMax = 220 - age;
  const pct = hr / hrMax;
  if (pct > 0.90) return "red";
  if (pct >= 0.77) return "yellow";
  if (pct >= 0.50) return "green";
  return "yellow"; // too low: suggest warm-up
}

export function evaluateVitals(v: VitalsInput): VitalsOutputItem[] {
  // 입력값 검증 및 안전한 처리
  if (!v || typeof v !== 'object') {
    return [];
  }

  const out: VitalsOutputItem[] = [];

  try {
    if (v.hr != null && typeof v.hr === 'number') {
      const color = v.mode === "exercise" && v.age != null && typeof v.age === 'number'
        ? classifyHRExercise(v.hr, v.age)
        : classifyRestingHR(v.hr);
      out.push({
        metric: "HR", color, hex: hex(color), label: label(color),
        message: color === "green" ? "심박 정상 범위"
               : color === "yellow" ? "심박 주의: 휴식/호흡 조절"
               : "심박 경고: 즉시 중단/의료 도움"
      });
    }

    if (v.rr != null && typeof v.rr === 'number') {
      const color = classifyRR(v.rr);
      out.push({ metric: "RR", color, hex: hex(color), label: label(color),
        message: color === "green" ? "호흡 정상"
               : color === "yellow" ? "호흡 빠름" : "호흡 이상" });
    }

    if (v.spo2 != null && typeof v.spo2 === 'number') {
      const color = classifySpO2(v.spo2);
      out.push({ metric: "SpO₂", color, hex: hex(color), label: label(color),
        message: color === "green" ? "산소포화도 정상"
               : color === "yellow" ? "산소포화도 낮음" : "산소포화도 매우 낮음" });
    }

    if (v.coreTempC != null && typeof v.coreTempC === 'number') {
      const color = classifyCoreTemp(v.coreTempC);
      out.push({ metric: "CoreTemp", color, hex: hex(color), label: label(color),
        message: color === "green" ? "체온 정상"
               : color === "yellow" ? "미열/저체온 경향" : "발열/저체온 경고" });
    }

    if (v.skinTempDeltaC != null && typeof v.skinTempDeltaC === 'number') {
      const color = classifySkinTemp(v.skinTempDeltaC, v.skinTempMinutes ?? 0);
      out.push({ metric: "SkinΔT", color, hex: hex(color), label: label(color),
        message: color === "green" ? "피부온 정상"
               : color === "yellow" ? "피부온 변동 주의" : "피부온 비정상 지속" });
    }
  } catch (error) {
    console.warn('Vitals evaluation error:', error);
    return [];
  }

  return out;
}

// Tiny demo usage (for Vue/React)
export function demoEvaluate() {
  return evaluateVitals({ mode: "rest", hr: 105, spo2: 93, coreTempC: 37.6 });
}
