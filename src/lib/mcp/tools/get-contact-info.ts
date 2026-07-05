import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact information",
  description: "Get Global Safety's contact information — phone, email, address, and business hours.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      company: "Global Safety",
      phone: "+91 98406 55558",
      emergency: "24/7 Emergency Support available",
      website: "https://globalsafetys.lovable.app",
      services_area: "PAN India",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
