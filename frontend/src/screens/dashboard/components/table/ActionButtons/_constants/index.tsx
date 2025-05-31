import {
  filingRevenue,
  lga_list,
  revenueTypeData,
  taxOfficesList,
} from "@/constants/data";
import { MDAs } from "@/constants/mdas";

interface MDAsType {
  [key: string]: string[];
}

export const getDropdownOptions = (
  buttonValue: string,
  type: string,
  selectedAction: { [key: string]: string } = {}
) => {
  const mdasTyped: MDAsType = MDAs;

  const capitalizeWords = (str: string) => {
    const acronyms = ["AKIRS", "MDA", "ICT", "GSM", "NGO"];
    const words = str.split(" ");

    return words
      .map((word) => {
        const upperWord = word.toUpperCase();
        if (acronyms.includes(upperWord)) {
          return upperWord;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const formatRevenueLine = (line: string) => {
    const cleaned = line.replace(/[\/\(\)]/g, " ");
    return capitalizeWords(cleaned);
  };

  const mdaRevenueLinesOptions =
    selectedAction["mdas"] &&
    selectedAction["mdas"] !== "all-mdas" &&
    mdasTyped[selectedAction["mdas"]]
      ? mdasTyped[selectedAction["mdas"]].map((stream: string) => ({
          value: stream
            .toLowerCase()
            .replace(/[\s\/\(\)]+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
          label: formatRevenueLine(stream),
        }))
      : [];

  const options: { [key: string]: { value: string; label: string }[] } = {
    "date-range": [
      { value: "today", label: "Today" },
      { value: "last-week", label: "Last Week" },
      { value: "last-month", label: "Last Month" },
      { value: "last-30-days", label: "Last 30 Days" },
    ],
    filing: [{ value: "all-filings", label: "All Filings" }, ...filingRevenue],
    status: [
      { value: "all-statuses", label: "All Statuses" },
      { value: "pending", label: "Pending" },
      { value: "completed", label: "Completed" },
      { value: "failed", label: "Failed" },
    ],
    "tax-type": [
      { value: "all-types", label: "All Types" },
      ...revenueTypeData,
    ],
    "report-type": [
      { value: "summary", label: "Summary Report" },
      { value: "detailed", label: "Detailed Report" },
      { value: "compliance", label: "Compliance Report" },
    ],
    "start-date": [
      { value: "2025-05-01", label: "2025-05-01" },
      { value: "2025-04-01", label: "2025-04-01" },
      { value: "2025-03-01", label: "2025-03-01" },
    ],
    "end-date": [
      { value: "2025-05-09", label: "2025-05-09" },
      { value: "2025-04-30", label: "2025-04-30" },
      { value: "2025-03-31", label: "2025-03-31" },
    ],
    "local-govt-area": [...lga_list],
    "payment-mode": [
      { value: "bank-transfer", label: "Bank Transfer" },
      { value: "cash", label: "Cash" },
      { value: "online", label: "Online" },
    ],
    "report-output-type": [
      { value: "pdf", label: "PDF" },
      { value: "excel", label: "Excel" },
      { value: "csv", label: "CSV" },
    ],
    today: [
      { value: "today", label: "Today" },
      { value: "yesterday", label: "Yesterday" },
      { value: "last-week", label: "Last Week" },
      { value: "last-month", label: "Last Month" },
      { value: "last-30-days", label: "Last 30 Days" },
    ],
    "all-methods": [
      { value: "all-methods", label: "ALL Methods" },
      { value: "paystack", label: "Paystack" },
      { value: "flutterwave", label: "Flutterwave" },
    ],
    "all-statuses": [
      { value: "all-statuses", label: "All Statuses" },
      ...(type === "filings"
        ? [
            { value: "approved", label: "Approved" },
            { value: "pending", label: "Pending" },
            { value: "rejected", label: "Rejected" },
            { value: "not-filed", label: "Not Filed" },
          ]
        : [
            { value: "reconciled", label: "Reconciled" },
            { value: "pending", label: "Pending" },
            { value: "flagged", label: "Flagged" },
            { value: "verified", label: "Verified" },
            { value: "disputed", label: "Disputed" },
          ]),
    ],
    "all-types": [
      { value: "all-types", label: "ALL Types" },
      { value: "corporate-income-tax", label: "Corporate Income Tax" },
      { value: "paye", label: "PAYE" },
      { value: "value-added-tax", label: "Value Added Tax" },
      { value: "withholding-tax", label: "Withholding Tax" },
      { value: "personal-income-tax", label: "Personal Income Tax" },
      { value: "property-tax", label: "Property Tax" },
      { value: "company-income-tax", label: "Company Income Tax" },
    ],
    taxOffices: [
      { label: "All Tax Offices", value: "taxOffices" },
      ...taxOfficesList,
    ],
    all: [
      { value: "all", label: "All" },
      { value: "completed", label: "Completed" },
      { value: "overdue", label: "Overdue" },
      { value: "pending", label: "Pending" },
    ],
    "all-filings": [
      { value: "all-filings", label: "All Filings" },
      { value: "processed", label: "Processed" },
      { value: "pending-review", label: "Pending Review" },
      { value: "non-compliant", label: "Non-Compliant" },
    ],
    "all-compliance": [
      { value: "all-compliance", label: "All Compliance Level" },
      { value: "90", label: "90%+" },
      { value: "70-89", label: "70-89%" },
      { value: "50-69", label: "50-69%" },
      { value: "below-50", label: "Below 50%" },
    ],
    "all-locations": [
      { value: "all-locations", label: "All Locations" },
      { value: "uyo", label: "Uyo" },
      { value: "eket", label: "Eket" },
      { value: "ikot-ekpene", label: "Ikot Ekpene" },
      { value: "oron", label: "Oron" },
      { value: "abak", label: "Abak" },
      { value: "ikot-abasi", label: "Ikot Abasi" },
    ],
    "revenue-lines": [
      { value: "all-revenue-lines", label: "All Revenue Lines" },
      { value: "akirs", label: "Akwa Ibom State Internal Revenue Service" },
      { value: "mda", label: "Ministry/ Department/ Agency" },
      { value: "others", label: "Others" },
    ],
    mdas: [
      { value: "all-mdas", label: "All MDAs" },
      ...Object.keys(mdasTyped).map((mda) => {
        const formattedLabel = capitalizeWords(mda.replace(/[-]/g, " "));
        return {
          value: mda,
          label: formattedLabel,
        };
      }),
    ],
    "mda-revenue-lines": [
      { value: "all-mda-revenue-lines", label: "All MDA Revenue Lines" },
      ...(mdaRevenueLinesOptions.length > 0
        ? mdaRevenueLinesOptions
        : [{ value: "select-mda", label: "Select an MDA First" }]),
    ],
  };

  return options[buttonValue] || [];
};
