import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { submitEnquiry } from "@/lib/api/enquiry.functions";

export default defineTool({
  name: "submit_enquiry",
  title: "Submit a customer enquiry",
  description: "Submit a fire safety enquiry to Global Safety. Returns a reference number that the customer can quote when following up.",
  inputSchema: {
    customerName: z.string().min(1).max(100).describe("Customer's full name."),
    email: z.string().email().max(255).describe("Customer email."),
    mobile: z.string().min(7).max(20).describe("Customer phone number."),
    companyName: z.string().max(150).optional().describe("Company name (optional)."),
    productInterested: z.string().max(100).optional().describe("Product or service of interest."),
    city: z.string().max(100).optional().describe("City / location."),
    message: z.string().max(2000).optional().describe("Additional details about the requirement."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async (input) => {
    try {
      const result = await submitEnquiry({ data: input });
      return {
        content: [{ type: "text", text: `Enquiry submitted. Reference: ${result.referenceNumber}` }],
        structuredContent: result,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit enquiry";
      return { content: [{ type: "text", text: message }], isError: true };
    }
  },
});
