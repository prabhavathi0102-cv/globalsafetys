import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const PRODUCTS = [
  { id: "abc-extinguisher", name: "ABC Dry Powder Fire Extinguisher", category: "Extinguisher", description: "Multi-purpose extinguisher for Class A, B, and C fires (solids, liquids, gases). Common sizes: 1kg, 2kg, 4kg, 6kg, 9kg." },
  { id: "co2-extinguisher", name: "CO2 Fire Extinguisher", category: "Extinguisher", description: "For electrical and Class B fires. Common sizes: 2kg, 4.5kg, 6.8kg, 9kg." },
  { id: "foam-extinguisher", name: "Mechanical Foam (AFFF) Extinguisher", category: "Extinguisher", description: "For Class A and B fires — flammable liquids like petrol, oil, paint." },
  { id: "k-class-extinguisher", name: "K-Class Wet Chemical Extinguisher", category: "Extinguisher", description: "For commercial kitchen cooking-oil fires." },
  { id: "water-extinguisher", name: "Water CO2 Extinguisher", category: "Extinguisher", description: "For Class A fires — wood, paper, cloth." },
  { id: "hydrant-system", name: "Fire Hydrant System", category: "System", description: "Wet/dry riser hydrant systems with pumps, valves, hoses, and landing valves." },
  { id: "sprinkler-system", name: "Automatic Sprinkler System", category: "System", description: "Wet and dry pipe sprinkler installations for buildings and warehouses." },
  { id: "fire-alarm", name: "Fire Alarm System", category: "System", description: "Conventional and addressable fire alarm panels, smoke/heat detectors, hooters." },
  { id: "pa-system", name: "Public Address (PA) System", category: "System", description: "Emergency voice communication systems for evacuation." },
  { id: "fire-door", name: "Fire Rated Door", category: "Passive", description: "60/90/120-minute fire-rated steel and wooden doors with certification." },
];

export default defineTool({
  name: "list_products",
  title: "List fire safety products",
  description: "List Global Safety's fire safety products (extinguishers, hydrants, alarms, doors, PA systems). Optionally filter by category.",
  inputSchema: {
    category: z.enum(["Extinguisher", "System", "Passive"]).optional().describe("Filter by product category."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { products: items },
    };
  },
});
