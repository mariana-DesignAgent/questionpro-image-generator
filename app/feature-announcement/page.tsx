"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import domtoimage from "dom-to-image";

type FitMode = "contain" | "cover";

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

function FormField({ label, value, onChange }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold tracking-[0.09em] uppercase text-[#1b3380]">{label}</label>
      <input
        className="bg-[#f7fafd] border border-[#c8d8ea] rounded-[7px] text-[#1b3380] text-[13px] px-3 py-[9px] outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function FeatureAnnouncement() {
  const [featureName, setFeatureName] = useState("VideoAI");
  const [description, setDescription] = useState(
    "Analyzes video responses using artificial intelligence to identify sentiments and generate detailed reports."
  );
  const [availableDate, setAvailableDate] = useState("Available June 2026");
  const [ctaText, setCtaText] = useState("Discover VideoAI now");
  const [ctaUrl, setCtaUrl] = useState("questionpro.com/VideoAI");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [fitMode, setFitMode] = useState<FitMode>("contain");
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setScreenshot(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function download() {
    if (!cardRef.current) return;
    setLoading(true);
    try {
      const { offsetWidth, offsetHeight } = cardRef.current;
      const dataUrl = await domtoimage.toJpeg(cardRef.current, {
        width: offsetWidth * 2,
        height: offsetHeight * 2,
        style: {
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`,
          transform: "scale(2)",
          transformOrigin: "top left",
        },
        quality: 0.95,
      });
      const link = document.createElement("a");
      link.download = `QP-NewFeature-${featureName.replace(/\s+/g, "-")}.jpg`;
      link.href = dataUrl;
      link.click();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#edf2f7]">
      <header className="bg-white border-b border-[#d8e2ef] px-8 py-4 flex items-center justify-between">
        <img src="/QuestionPro-Mainlogo.svg" alt="QuestionPro" className="h-7" />
        <Link
          href="/"
          className="text-[#1b87e6] text-xs font-bold tracking-wider uppercase hover:underline"
        >
          Back to templates
        </Link>
      </header>

      <div className="max-w-[1100px] mx-auto px-8 py-12 flex gap-10 flex-wrap justify-center">

        {/* Form panel */}
        <div className="bg-white border border-[#d8e2ef] rounded-[14px] p-[26px] w-[300px] flex flex-col gap-4 shrink-0">
          <p className="text-[11px] font-extrabold tracking-widest uppercase text-[#1b3380] pb-3 border-b-2 border-[#edf6fd] m-0">
            Card Content
          </p>

          <FormField label="Feature Name" value={featureName} onChange={setFeatureName} />
          <FormField label="Available Date" value={availableDate} onChange={setAvailableDate} />

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.09em] uppercase text-[#1b3380]">Description</label>
            <textarea
              className="bg-[#f7fafd] border border-[#c8d8ea] rounded-[7px] text-[#1b3380] text-[13px] px-3 py-[9px] outline-none resize-y min-h-[80px] font-[inherit]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <p className="text-[10px] font-extrabold tracking-widest uppercase text-[#1b87e6] border-t border-[#edf6fd] pt-3 m-0">
            Screenshot
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.09em] uppercase text-[#1b3380]">
              Software Screenshot
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-[1.5px] border-dashed border-[#b0c8e0] rounded-lg p-4 text-center cursor-pointer bg-[#f7fafd]"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
              {screenshot ? (
                <img src={screenshot} className="w-full max-h-[90px] object-cover rounded-[5px]" alt="" />
              ) : (
                <p className="text-xs text-[#1b3380] opacity-55 m-0">Click to upload</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.09em] uppercase text-[#1b3380]">Image Fit</label>
            <div className="flex gap-2">
              {(["contain", "cover"] as FitMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setFitMode(m)}
                  className={`flex-1 text-[11px] font-bold tracking-[0.05em] uppercase py-2 rounded-md border cursor-pointer transition-colors ${
                    fitMode === m
                      ? "bg-[#1b3380] border-[#1b3380] text-white"
                      : "bg-[#f7fafd] border-[#c8d8ea] text-[#1b3380]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-extrabold tracking-widest uppercase text-[#1b87e6] border-t border-[#edf6fd] pt-3 m-0">
            Call to Action
          </p>

          <FormField label="CTA Text" value={ctaText} onChange={setCtaText} />
          <FormField label="URL" value={ctaUrl} onChange={setCtaUrl} />

          <button
            onClick={download}
            disabled={loading}
            className={`rounded-lg text-white text-xs font-extrabold tracking-wider uppercase py-[13px] px-5 w-full cursor-pointer transition-colors border-none ${
              loading ? "bg-[#aaaaaa] cursor-not-allowed" : "bg-[#1b3380] hover:bg-[#142660]"
            }`}
          >
            {loading ? "Generating..." : "Download JPG 1080 × 1080"}
          </button>
        </div>

        {/* Card preview */}
        <div className="flex flex-col gap-2.5 items-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#1b3380] opacity-45 m-0">
            Preview — LinkedIn 1080 × 1080
          </p>

          <div
            ref={cardRef}
            className="w-[540px] h-[540px] overflow-hidden relative shrink-0 shadow-[0_20px_60px_rgba(27,51,128,0.3)] flex flex-col"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(170deg, #1b4090 0%, #0d1f5c 35%, #020b2e 100%)" }}
            />

            {/* Decorative curves */}
            <svg
              className="absolute top-0 right-0 w-[260px] h-[300px] pointer-events-none z-[2] overflow-visible"
              viewBox="0 0 260 300"
            >
              <path d="M 260 80 Q 180 140 100 110 Q 40 88 -20 130" stroke="#1b87e6" strokeWidth="1.4" fill="none" opacity="0.5" />
              <path d="M 260 105 Q 180 165 100 135 Q 40 113 -20 155" stroke="#1b87e6" strokeWidth="0.8" fill="none" opacity="0.25" />
              <path d="M 260 58 Q 190 115 110 88 Q 50 68 -20 105" stroke="#1b87e6" strokeWidth="0.5" fill="none" opacity="0.15" />
              <circle cx="168" cy="128" r="10" fill="#ffe433" />
            </svg>

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center px-10 pt-7 pb-[18px] shrink-0">
              <img
                src="/QuestionPro-Mainlogo.svg"
                alt="QuestionPro"
                className="h-[26px] mb-4 brightness-0 invert"
              />
              <div className="w-full text-left">
                <div className="inline-block bg-[#ffe433] text-[#1b3380] text-[9px] font-extrabold tracking-[0.14em] py-[5px] px-[14px] uppercase rounded-sm mb-2">
                  New Feature
                </div>
                <div className="text-white text-[40px] font-extrabold leading-none tracking-[-0.02em] mb-2">
                  {featureName || "Feature Name"}
                </div>
                <div className="text-[#edf6fd] text-[11px] font-normal leading-[1.55] opacity-80 mb-2 max-w-[320px]">
                  {description || "Feature description"}
                </div>
                <div className="text-[#edf6fd] text-[9px] font-bold tracking-[0.12em] uppercase opacity-50">
                  {availableDate || "Available date"}
                </div>
              </div>
            </div>

            {/* Screenshot area */}
            <div className="relative z-10 flex-1 w-full overflow-hidden px-5 flex items-start justify-center min-h-0">
              {screenshot ? (
                <img
                  src={screenshot}
                  className="w-full h-full rounded-t-[14px]"
                  style={{ objectFit: fitMode, objectPosition: "top center" }}
                  alt=""
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center border-[1.5px] border-dashed border-white/15 rounded-t-[14px] text-[#edf6fd] text-[10px] font-bold tracking-[0.06em] uppercase opacity-30 text-center p-5 leading-relaxed">
                  Upload a software screenshot
                </div>
              )}
            </div>

            {/* CTA bar */}
            <div className="relative z-10 shrink-0 px-10 pt-2.5 pb-3.5 flex items-center justify-center gap-3.5">
              <span className="inline-block bg-white text-[#1b87e6] text-[10px] font-bold tracking-[0.06em] py-[5px] px-4 rounded-full whitespace-nowrap uppercase">
                {ctaText || "CTA Text"}
              </span>
              <span className="text-white text-[10px] font-medium tracking-[0.03em] whitespace-nowrap">
                {ctaUrl || "URL"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
