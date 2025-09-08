import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Train, AlertTriangle, CircleAlert, ChevronDown, MoveRight } from "lucide-react";

// --------------------------- Mock Rail Topology -----------------------------
const railData = {
  zones: [
    {
      id: "north",
      name: "Northern Zone",
      divisions: [
        {
          id: "delhi",
          name: "Delhi Division",
          sections: [
            {
              id: "delhi-kanpur",
              name: "Delhi–Kanpur Section",
              stations: [
                { id: "delhi", name: "Delhi Jn", x: 260, y: 170 },
                { id: "ghaziabad", name: "Ghaziabad", x: 310, y: 205 },
                { id: "aligarh", name: "Aligarh", x: 360, y: 250 },
                { id: "tundla", name: "Tundla", x: 430, y: 300 },
                { id: "agra", name: "Agra Cantt", x: 400, y: 340 },
                { id: "kanpur", name: "Kanpur Central", x: 530, y: 330 },
                { id: "lucknow", name: "Lucknow", x: 600, y: 300 },
              ],
              links: [
                { a: "delhi", b: "ghaziabad", tracks: 4 },
                { a: "ghaziabad", b: "aligarh", tracks: 3 },
                { a: "aligarh", b: "tundla", tracks: 2 },
                { a: "tundla", b: "kanpur", tracks: 2 },
                { a: "tundla", b: "agra", tracks: 2 },
                { a: "agra", b: "aligarh", tracks: 2 },
                { a: "kanpur", b: "lucknow", tracks: 2 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ------------------------------ Utilities ----------------------------------
function useSection() {
  const zone = railData.zones[0];
  const division = zone.divisions[0];
  const section = division.sections[0];
  return { zone, division, section };
}

function findStation(section, id) {
  return section.stations.find((s) => s.id === id);
}

function buildAdjacency(section) {
  const map = new Map();
  section.stations.forEach((s) => map.set(s.id, []));
  section.links.forEach((l) => {
    map.get(l.a).push({ to: l.b, tracks: l.tracks });
    map.get(l.b).push({ to: l.a, tracks: l.tracks });
  });
  return map;
}

function shortestPath(section, startId, endId) {
  if (!startId || !endId || startId === endId) return [];
  const adj = buildAdjacency(section);
  const q = [startId];
  const prev = new Map([[startId, null]]);
  while (q.length) {
    const cur = q.shift();
    if (cur === endId) break;
    for (const { to } of adj.get(cur) || []) {
      if (!prev.has(to)) {
        prev.set(to, cur);
        q.push(to);
      }
    }
  }
  if (!prev.has(endId)) return [];
  const path = [];
  for (let at = endId; at != null; at = prev.get(at)) path.push(at);
  path.reverse();
  return path;
}

function trackInfoForPath(section, ids) {
  if (!ids || ids.length < 2) return { bottleneck: null, segments: [] };
  const segs = [];
  for (let i = 0; i < ids.length - 1; i++) {
    const a = ids[i];
    const b = ids[i + 1];
    const link = section.links.find(
      (l) => (l.a === a && l.b === b) || (l.a === b && l.b === a)
    );
    if (!link) return { bottleneck: null, segments: [] };
    segs.push({ a, b, tracks: link.tracks });
  }
  const bottleneck = segs.reduce((m, s) => Math.min(m, s.tracks), Infinity);
  return { bottleneck: isFinite(bottleneck) ? bottleneck : null, segments: segs };
}

// ----------------------------- Map Component --------------------------------
function SvgMap({ section, highlightIds }) {
  const lines = section.links.map((l, idx) => {
    const A = findStation(section, l.a);
    const B = findStation(section, l.b);
    return (
      <line
        key={idx}
        x1={A.x}
        y1={A.y}
        x2={B.x}
        y2={B.y}
        stroke="#4b5563"
        strokeOpacity="0.6"
        strokeWidth={2}
      />
    );
  });

  const highlightPoints = useMemo(() => {
    if (!highlightIds || highlightIds.length < 2) return null;
    return highlightIds
      .map((id) => {
        const s = findStation(section, id);
        return `${s.x},${s.y}`;
      })
      .join(" ");
  }, [highlightIds, section]);

  return (
    <svg
      viewBox="0 0 700 520"
      className="w-full h-auto max-w-full rounded-2xl bg-zinc-800/60 ring-1 ring-white/5"
    >
      <path
        d="M100,100 C140,60 220,80 260,120 C300,160 320,140 360,160 C420,190 460,260 520,280 C560,300 600,340 610,370"
        fill="none"
        stroke="#22c55e"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      {lines}
      {highlightPoints && (
        <polyline
          points={highlightPoints}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {section.stations.map((s) => (
        <g key={s.id}>
          <circle cx={s.x} cy={s.y} r={6} className="fill-zinc-200" />
          <text
            x={s.x + 8}
            y={s.y + 4}
            className="hidden sm:block text-[10px] fill-zinc-300 select-none"
          >
            {s.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

// --------------------------- Main Component ---------------------------------
export default function RailDashboard() {
  const { zone, division, section } = useSection();
  const [fromId, setFromId] = useState("delhi");
  const [toId, setToId] = useState("kanpur");

  const pathIds = useMemo(() => shortestPath(section, fromId, toId), [section, fromId, toId]);
  const { bottleneck } = useMemo(() => trackInfoForPath(section, pathIds), [section, pathIds]);

  useEffect(() => {
    if (fromId === toId) {
      const alt = section.stations.find((s) => s.id !== fromId)?.id;
      if (alt) setToId(alt);
    }
  }, [fromId, toId, section.stations]);

  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-100">
      {/* Header */}
      <div className="border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-semibold tracking-tight">Region Selection</h1>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-zinc-800 grid place-items-center">JD</div>
          <span className="text-sm text-zinc-300">John Doe</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-8">
        {/* Left Sidebar */}
        <aside className="md:col-span-3 bg-zinc-900/50 rounded-2xl p-5 ring-1 ring-white/5">
          <h2 className="text-lg font-medium mb-4">Select Region</h2>

          <Label>Zone</Label>
          <Select value={zone.id} disabled>
            <option value={zone.id}>{zone.name}</option>
          </Select>

          <div className="h-4" />
          <Label>Division</Label>
          <Select value={division.id} disabled>
            <option value={division.id}>{division.name}</option>
          </Select>

          <div className="h-4" />
          <Label>Section</Label>
          <Select value={section.id} disabled>
            <option value={section.id}>{section.name}</option>
          </Select>

          <div className="h-6" />
          <h3 className="text-sm font-medium text-zinc-300 mb-3">Stations</h3>

          <Label>From</Label>
          <Select value={fromId} onChange={(e) => setFromId(e.target.value)}>
            {section.stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <div className="h-3" />
          <Label>To</Label>
          <Select value={toId} onChange={(e) => setToId(e.target.value)}>
            {section.stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </aside>

        {/* Map */}
        <main className="md:col-span-6 flex items-center justify-center order-first md:order-none">
          <SvgMap section={section} highlightIds={pathIds} />
        </main>

        {/* Right Sidebar */}
        <aside className="md:col-span-3">
          <div className="bg-zinc-900/50 rounded-2xl p-6 ring-1 ring-white/5">
            <h2 className="text-lg font-medium mb-4">Section Overview</h2>
            <div className="space-y-3">
              <OverviewRow icon={<Train className="h-4 w-4" />} label="Tracks" value="2 main · 1 loop" />
              <OverviewRow icon={<Train className="h-4 w-4" />} label="Active Trains" value="28" />
              <OverviewRow icon={<AlertTriangle className="h-4 w-4" />} label="Congestion Status" value="Moderate" />
              <OverviewRow icon={<CircleAlert className="h-4 w-4" />} label="Incidents" value="None" />
            </div>

            <div className="my-5 h-px bg-white/5" />

            <h3 className="text-sm font-medium text-zinc-300 mb-2">Selected Corridor</h3>
            <div className="text-sm text-zinc-300">
              <div>
                <span className="text-zinc-100 font-medium">From:</span> {findStation(section, fromId)?.name}
              </div>
              <div>
                <span className="text-zinc-100 font-medium">To:</span> {findStation(section, toId)?.name}
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-zinc-800/60 p-3 text-sm">
              {pathIds.length > 1 ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">Tracks between these stations</span>
                    <span className="text-zinc-100 font-semibold">{bottleneck ?? "—"}</span>
                  </div>
                  <div className="text-xs mt-2 text-zinc-400">
                    Path: {pathIds.map((id) => findStation(section, id)?.name).join(" → ")}
                  </div>
                </>
              ) : (
                <div className="text-zinc-400">No continuous path found.</div>
              )}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3 font-medium shadow-lg shadow-indigo-600/20"
          >
            Proceed to Dashboard <MoveRight className="h-4 w-4" />
          </motion.button>
        </aside>
      </div>
    </div>
  );
}

// ----------------------------- UI Bits --------------------------------------
function Label({ children }) {
  return <div className="text-xs uppercase tracking-wide text-zinc-400 mb-1">{children}</div>;
}

function Select({ children, className = "", ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={
          "w-full appearance-none rounded-xl bg-zinc-900/80 ring-1 ring-white/10 focus:ring-indigo-500/50 focus:outline-none px-3 py-2 pr-8 text-sm " +
          className
        }
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
    </div>
  );
}

function OverviewRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-zinc-800/60 px-3 py-2">
      <div className="flex items-center gap-2 text-zinc-300">
        <span className="grid place-items-center h-6 w-6 rounded-md bg-zinc-700/50">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-sm font-semibold text-zinc-100">{value}</div>
    </div>
  );
}
