import { defineTool } from "@lovable.dev/mcp-js";

const SERVICES = [
  { id: "supply-install", name: "Supply & Installation", description: "Supply and installation of fire extinguishers, hydrants, sprinklers, alarms, PA and fire doors." },
  { id: "amc", name: "Annual Maintenance Contract (AMC)", description: "Scheduled inspections, refills, testing, and certification for all installed fire equipment." },
  { id: "refill", name: "Extinguisher Refill & Hydro-Testing", description: "IS-certified refilling and hydraulic pressure testing of ABC, CO2, foam and water extinguishers." },
  { id: "noc", name: "Fire NOC Consultancy", description: "End-to-end assistance for obtaining Fire NOC from the local fire department." },
  { id: "training", name: "Fire Safety Training & Mock Drills", description: "On-site training and evacuation mock drills for staff, security, and safety officers." },
  { id: "audit", name: "Fire Safety Audit", description: "Detailed audit reports with gap analysis and recommendations." },
];

export default defineTool({
  name: "list_services",
  title: "List fire safety services",
  description: "List services offered by Global Safety — installation, AMC, refill, NOC consultancy, training, and audits.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});
