import { defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import listServices from "./tools/list-services";
import getContactInfo from "./tools/get-contact-info";
import submitEnquiryTool from "./tools/submit-enquiry";

export default defineMcp({
  name: "global-safety-mcp",
  title: "Global Safety MCP",
  version: "0.1.0",
  instructions:
    "Tools for Global Safety — a fire safety products and services company. Use `list_products` and `list_services` to browse offerings, `get_contact_info` for contact details, and `submit_enquiry` to file a customer enquiry (returns a reference number).",
  tools: [listProducts, listServices, getContactInfo, submitEnquiryTool],
});
