"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = useState<"buy" | "rent">("buy");
  const [suburb, setSuburb] = useState("");
  const [propType, setPropType] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    const base = tab === "buy" ? "/buy" : "/rent";
    const params = new URLSearchParams();
    if (suburb) params.set("suburb", suburb);
    if (propType) params.set("type", propType);
    if (price) params.set("price", price);
    router.push(params.toString() ? `${base}?${params}` : base);
  };

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.14)" }}
    >
      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        {(["buy", "rent"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${tab === t ? "text-white border-b-2" : "text-white/50 hover:text-white/80"}`}
            style={tab === t ? { borderColor: "#FBF9F3" } : {}}
          >
            {t === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>
      {/* Inputs */}
      <div className="p-4 flex flex-col sm:flex-row gap-3">
        <input
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Suburb or postcode..."
          className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium outline-none"
          style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "#ffffff" }}
        />
        <select
          value={propType}
          onChange={(e) => setPropType(e.target.value)}
          className="rounded-lg px-4 py-2.5 text-sm font-medium outline-none"
          style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: propType ? "#ffffff" : "rgba(255,255,255,0.5)" }}
        >
          <option value="">Property Type</option>
          <option value="house">House</option>
          <option value="unit">Unit / Apartment</option>
          <option value="townhouse">Townhouse</option>
          <option value="land">Land</option>
          <option value="rural">Rural</option>
        </select>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-lg px-4 py-2.5 text-sm font-medium outline-none"
          style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: price ? "#ffffff" : "rgba(255,255,255,0.5)" }}
        >
          <option value="">Any Price</option>
          {tab === "buy" ? (
            <>
              <option value="0-500k">Up to $500k</option>
              <option value="500k-800k">$500k – $800k</option>
              <option value="800k-1.2m">$800k – $1.2M</option>
              <option value="1.2m-2m">$1.2M – $2M</option>
              <option value="2m+">$2M+</option>
            </>
          ) : (
            <>
              <option value="0-400">Up to $400/wk</option>
              <option value="400-600">$400 – $600/wk</option>
              <option value="600-900">$600 – $900/wk</option>
              <option value="900+">$900+/wk</option>
            </>
          )}
        </select>
        <button
          onClick={handleSearch}
          className="px-6 py-2.5 text-sm font-medium transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: "#5BC2E7", color: "#FBF9F3" }}
        >
          Search Properties
        </button>
      </div>
    </div>
  );
}
