export interface Deal {
  id: string;
  dealName: string;
  dealInitial: string;
  dealColor: string;
  client: string;
  stage: "Negotiation" | "Proposal Sent" | "Qualified" | "Discovery";
  value: number;
  owner: string;
  ownerInitials: string;
  expectedClose: string;
}

const stages: Deal["stage"][] = ["Negotiation", "Proposal Sent", "Qualified", "Discovery"];
const owners = [
  { name: "Alex Ray", initials: "AR" },
  { name: "Mina Swan", initials: "MS" },
  { name: "John Kim", initials: "JK" },
  { name: "Sarah Lee", initials: "SL" },
];

const colors = [
  "bg-[#6e3ff3]",
  "bg-linear-to-b from-[#375dfb] to-[#213795]",
  "bg-linear-to-b from-[#3fc3f3] to-[#36258d]",
  "bg-linear-to-b from-[#e255f2] to-[#313a8c]",
  "bg-[#35b9e9]",
  "bg-linear-to-b from-[#22c55e] to-[#15803d]",
  "bg-linear-to-b from-[#f97316] to-[#c2410c]",
  "bg-linear-to-b from-[#ec4899] to-[#9d174d]",
  "bg-linear-to-b from-[#8b5cf6] to-[#6d28d9]",
  "bg-linear-to-b from-[#14b8a6] to-[#0d9488]",
  "bg-linear-to-b from-[#f43f5e] to-[#be123c]",
  "bg-linear-to-b from-[#0ea5e9] to-[#0284c7]",
];

const dealTemplates = [
  { name: "TechCorp Upgrade", client: "TechCorp Inc." },
  { name: "Fintra Expansion", client: "Fintra Group" },
  { name: "Nova Redesign", client: "Nova Studios" },
  { name: "Aether Integration", client: "AetherSoft" },
  { name: "Cloudify Migration", client: "Cloudify Systems" },
  { name: "DataFlow Setup", client: "DataFlow Inc." },
  { name: "Nexus Platform", client: "Nexus Corp" },
  { name: "Synergy Solutions", client: "Synergy Labs" },
  { name: "Quantum Analytics", client: "Quantum Tech" },
  { name: "Vertex Dashboard", client: "Vertex AI" },
  { name: "Pulse Monitoring", client: "Pulse Health" },
  { name: "Aurora Marketing", client: "Aurora Media" },
  { name: "Stellar CRM", client: "Stellar Systems" },
  { name: "Horizon Payments", client: "Horizon Finance" },
  { name: "Summit ERP", client: "Summit Group" },
  { name: "Atlas Logistics", client: "Atlas Transport" },
  { name: "Prism Analytics", client: "Prism Data" },
  { name: "Echo Platform", client: "Echo Networks" },
  { name: "Cipher Security", client: "Cipher Labs" },
  { name: "Forge Development", client: "Forge Studio" },
  { name: "Beacon Tracking", client: "Beacon Systems" },
  { name: "Zen Wellness", client: "Zen Health" },
  { name: "Nimbus Cloud", client: "Nimbus Tech" },
  { name: "Spark Automation", client: "Spark Industries" },
  { name: "Terra Mapping", client: "Terra Geo" },
  { name: "Flux Streaming", client: "Flux Media" },
  { name: "Core Banking", client: "Core Financial" },
  { name: "Apex Training", client: "Apex Academy" },
  { name: "Orbit Satellite", client: "Orbit Space" },
  { name: "Cascade Pipeline", client: "Cascade Data" },
  { name: "Vortex Gaming", client: "Vortex Entertainment" },
  { name: "Helix Biotech", client: "Helix Sciences" },
  { name: "Luna Retail", client: "Luna Commerce" },
  { name: "Mosaic Design", client: "Mosaic Creative" },
  { name: "Phoenix Recovery", client: "Phoenix Systems" },
  { name: "Glacier Storage", client: "Glacier Cloud" },
  { name: "Ember Analytics", client: "Ember Insights" },
  { name: "Tide Shipping", client: "Tide Logistics" },
  { name: "Quartz Reporting", client: "Quartz BI" },
  { name: "Breeze Travel", client: "Breeze Booking" },
  { name: "Comet Delivery", client: "Comet Express" },
  { name: "Sapphire Finance", client: "Sapphire Bank" },
  { name: "Thunder Gaming", client: "Thunder Studios" },
  { name: "Crystal Clear", client: "Crystal Vision" },
  { name: "Matrix Solutions", client: "Matrix Corp" },
  { name: "Omega Integration", client: "Omega Systems" },
  { name: "Delta Transport", client: "Delta Logistics" },
  { name: "Alpha Launch", client: "Alpha Ventures" },
  { name: "Beta Testing", client: "Beta Labs" },
  { name: "Gamma Research", client: "Gamma Institute" },
];

function getRandomDate(startMonth: number, endMonth: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = Math.floor(Math.random() * (endMonth - startMonth + 1)) + startMonth;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${months[month]} ${day.toString().padStart(2, "0")}, 2025`;
}

export const deals: Deal[] = dealTemplates.map((template, index) => {
  const owner = owners[index % owners.length];
  const stage = stages[index % stages.length];
  const color = colors[index % colors.length];
  const value = Math.floor(Math.random() * 40000) + 5000;
  const initial = template.name.split(" ").map(w => w[0]).join("").slice(0, 2);

  return {
    id: (index + 1).toString(),
    dealName: template.name,
    dealInitial: initial,
    dealColor: color,
    client: template.client,
    stage,
    value,
    owner: owner.name,
    ownerInitials: owner.initials,
    expectedClose: getRandomDate(3, 8),
  };
});
