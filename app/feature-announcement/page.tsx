"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

export default function FeatureAnnouncement() {
  const [featureName, setFeatureName] = useState("VideoAI");
  const [description, setDescription] = useState("Analyzes video responses using artificial intelligence to identify sentiments and generate detailed reports.");
  const [availableDate, setAvailableDate] = useState("Available June 2026");
  const [ctaText, setCtaText] = useState("Discover VideoAI now");
  const [ctaUrl, setCtaUrl] = useState("questionpro.com/VideoAI");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [fitMode, setFitMode] = useState<"contain" | "cover">("contain");
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
    const card = cardRef.current;

    // Scale to 1080x1080
    card.style.width = "1080px";
    card.style.height = "1080px";
    card.style.fontSize = "200%";

    await new Promise((r) => setTimeout(r, 300));

    try {
      const canvas = await html2canvas(card, {
        width: 1080,
        height: 1080,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#020b2e",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `QP-NewFeature-${featureName.replace(/\s+/g, "-")}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } finally {
      card.style.width = "540px";
      card.style.height = "540px";
      card.style.fontSize = "";
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#edf2f7]">
      <header className="bg-white border-b border-[#d8e2ef] px-8 py-4 flex items-center justify-between">
        <img src="/QuestionPro-Mainlogo.svg" alt="QuestionPro" className="h-7" />
        <Link href="/" className="text-xs text-[#1b87e6] font-bold uppercase tracking-wider hover:underline">
          Back to templates
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-12 flex gap-10 flex-wrap justify-center">

        {/* FORM */}
        <div className="bg-white border border-[#d8e2ef] rounded-2xl p-7 w-80 flex flex-col gap-5 flex-shrink-0">
          <p className="text-xs font-extrabold tracking-widest text-[#1b3380] uppercase border-b border-[#edf6fd] pb-3">Card Content</p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase">Feature Name</label>
            <input className="bg-[#f7fafd] border border-[#c8d8ea] rounded-lg text-[#1b3380] text-sm px-3 py-2 outline-none focus:border-[#1b87e6]"
              value={featureName} onChange={(e) => setFeatureName(e.target.value)} maxLength={28} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase">Description</label>
            <textarea className="bg-[#f7fafd] border border-[#c8d8ea] rounded-lg text-[#1b3380] text-sm px-3 py-2 outline-none focus:border-[#1b87e6] resize-y min-h-20"
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase">Available Date</label>
            <input className="bg-[#f7fafd] border border-[#c8d8ea] rounded-lg text-[#1b3380] text-sm px-3 py-2 outline-none focus:border-[#1b87e6]"
              value={availableDate} onChange={(e) => setAvailableDate(e.target.value)} />
          </div>

          <p className="text-[10px] font-extrabold tracking-widest text-[#1b87e6] uppercase border-t border-[#edf6fd] pt-3">Screenshot</p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase">Software Screenshot</label>
            <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[#b0c8e0] rounded-lg p-4 text-center cursor-pointer hover:border-[#1b87e6] hover:bg-[#edf6fd] transition-all bg-[#f7fafd]">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
              {screenshot
                ? <img src={screenshot} className="w-full max-h-24 object-cover rounded" alt="" />
                : <p className="text-xs text-[#1b3380] opacity-50">Drag an image or <strong className="text-[#1b87e6] font-bold opacity-100">click to upload</strong></p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase">Image Fit</label>
            <div className="flex gap-2">
              {(["contain", "cover"] as const).map((m) => (
                <button key={m} onClick={() => setFitMode(m)}
                  className={`flex-1 text-[11px] font-bold tracking-wide uppercase py-2 rounded-md border transition-all ${fitMode === m ? "bg-[#1b3380] border-[#1b3380] text-white" : "bg-[#f7fafd] border-[#c8d8ea] text-[#1b3380]"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-extrabold tracking-widest text-[#1b87e6] uppercase border-t border-[#edf6fd] pt-3">Call to Action</p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase">CTA Text</label>
            <input className="bg-[#f7fafd] border border-[#c8d8ea] rounded-lg text-[#1b3380] text-sm px-3 py-2 outline-none focus:border-[#1b87e6]"
              value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase">URL</label>
            <input className="bg-[#f7fafd] border border-[#c8d8ea] rounded-lg text-[#1b3380] text-sm px-3 py-2 outline-none focus:border-[#1b87e6]"
              value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} />
          </div>

          <button onClick={download} disabled={loading}
            className="bg-[#1b3380] hover:bg-[#1b87e6] disabled:opacity-50 text-white text-xs font-extrabold tracking-widest uppercase py-3 rounded-lg transition-all">
            {loading ? "Generating..." : "Download JPG 1080 x 1080"}
          </button>
        </div>

        {/* PREVIEW CARD */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-[10px] font-bold tracking-widest text-[#1b3380] uppercase opacity-45">Preview — LinkedIn 1080 x 1080</p>

          <div ref={cardRef} style={{ width: 540, height: 540, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", flexShrink: 0, boxShadow: "0 20px 60px rgba(27,51,128,0.3)" }}>

            {/* Background */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg, #1b4090 0%, #0d1f5c 35%, #020b2e 100%)" }} />

            {/* Decorative curves */}
            <svg style={{ position: "absolute", top: 0, right: 0, width: 260, height: 300, pointerEvents: "none", zIndex: 2, overflow: "visible" }} viewBox="0 0 260 300">
              <path d="M 260 80 Q 180 140 100 110 Q 40 88 -20 130" stroke="#1b87e6" strokeWidth="1.4" fill="none" opacity="0.5" />
              <path d="M 260 105 Q 180 165 100 135 Q 40 113 -20 155" stroke="#1b87e6" strokeWidth="0.8" fill="none" opacity="0.25" />
              <path d="M 260 58 Q 190 115 110 88 Q 50 68 -20 105" stroke="#1b87e6" strokeWidth="0.5" fill="none" opacity="0.15" />
              <circle cx="168" cy="128" r="10" fill="#ffe433" />
            </svg>

            {/* Top section */}
            <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 40px 18px", flexShrink: 0 }}>
              <img src="/QuestionPro-Mainlogo.svg" alt="QuestionPro" style={{ height: 26, marginBottom: 16, filter: "brightness(0) invert(1)" }} />
              <div style={{ width: "100%", textAlign: "left" }}>
                <div style={{ display: "inline-block", background: "#ffe433", color: "#1b3380", fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", padding: "5px 14px", textTransform: "uppercase", borderRadius: 2, marginBottom: 8 }}>New Feature</div>
                <div style={{ color: "#fff", fontSize: 40, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 8 }}>{featureName || "Feature Name"}</div>
                <div style={{ color: "#edf6fd", fontSize: 11, fontWeight: 400, lineHeight: 1.55, opacity: 0.8, marginBottom: 8, maxWidth: 320 }}>{description || "Feature description"}</div>
                <div style={{ color: "#edf6fd", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5 }}>{availableDate || "Available date"}</div>
              </div>
            </div>

            {/* Screenshot */}
            <div style={{ position: "relative", zIndex: 10, flex: 1, width: "100%", overflow: "hidden", padding: "0 20px", display: "flex", alignItems: "flex-start", justifyContent: "center", minHeight: 0 }}>
              {screenshot
                ? <img src={screenshot} style={{ width: "100%", height: "100%", objectFit: fitMode, objectPosition: "top center", borderRadius: "14px 14px 0 0" }} alt="" />
                : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px dashed rgba(237,246,253,0.15)", borderRadius: "14px 14px 0 0", color: "#edf6fd", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.3, textAlign: "center", padding: 20, lineHeight: 1.5 }}>Upload a software screenshot</div>}
            </div>

            {/* CTA bar */}
            <div style={{ position: "relative", zIndex: 10, flexShrink: 0, background: "transparent", padding: "10px 40px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ display: "inline-block", background: "#ffffff", color: "#1b87e6", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "5px 16px", borderRadius: 100, whiteSpace: "nowrap", textTransform: "uppercase" }}>{ctaText || "CTA Text"}</span>
              <span style={{ color: "#ffffff", fontSize: 10, fontWeight: 500, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{ctaUrl || "URL"}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}