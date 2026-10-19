import { z } from "zod";
import * as o from "./options";

const required = (label: string, max = 200) =>
  z.string().trim().min(1, `Please enter ${label}.`).max(max, `Please keep this under ${max} characters.`);

const choice = <T extends readonly [string, ...string[]]>(values: T, message: string) =>
  z.enum(values, { error: message });

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => !v || /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(v), "Please enter a valid web address, e.g. example.com.");

const consent = (message: string) =>
  z.union([z.literal("on"), z.literal(true), z.literal("true")], { error: message }).transform(() => true);

export const businessEnquirySchema = z.object({
  businessName: required("your business name"),
  contactName: required("your name"),
  email: z.string().trim().min(1, "Please enter your business email.").email("Please enter a valid email address, e.g. name@company.com."),
  market: choice(o.markets, "Please select your primary market."),
  website: optionalUrl,
  industry: choice(o.industries, "Please select your industry or service."),
  monthlyVolume: choice(o.enquiryVolumes, "Please select an approximate enquiry volume."),
  dealSize: choice(o.dealSizes, "Please select a typical contract or deal size."),
  salesProcess: choice(o.salesProcesses, "Please select the option closest to your current sales process."),
  supportTypes: z.array(z.enum(o.supportTypes)).min(1, "Please select at least one type of support."),
  context: z.string().trim().max(2000, "Please keep this under 2,000 characters.").optional(),
  privacy: consent("Please confirm you have read the privacy notice."),
});

export type BusinessEnquiry = z.infer<typeof businessEnquirySchema>;

export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const candidateApplicationSchema = z
  .object({
    fullName: required("your full name"),
    email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address."),
    country: required("your country of residence", 100),
    timeZone: choice(o.timeZones, "Please select your time zone."),
    phone: z
      .string()
      .trim()
      .max(40)
      .optional()
      .refine((v) => !v || /^[+()\d\s.-]{6,}$/.test(v), "Please enter a valid phone number or leave this blank."),
    linkedin: optionalUrl,
    hasCv: z.boolean().default(false),
    experienceLevel: choice(o.experienceLevels, "Please select the option that best describes you."),
    salesBackground: required("a short summary of your sales background", 2000),
    salesMix: choice(o.salesMixes, "Please select your B2B / B2C experience."),
    arrangement: choice(o.arrangements, "Please select your preferred arrangement."),
    languages: required("the languages you speak professionally", 200),
    availability: choice(o.availabilities, "Please select your availability."),
    dealExperience: choice(o.dealExperience, "Please select your typical deal size."),
    salesCycle: choice(o.salesCycles, "Please select your typical sales cycle."),
    crm: z.string().trim().max(300).optional(),
    objectionAnswer: z
      .string()
      .trim()
      .min(60, "Please write at least a few sentences (60+ characters).")
      .max(1500, "Please keep this under 1,500 characters."),
    assessmentPreference: choice(o.assessmentPreferences, "Please choose how you would prefer to demonstrate your skills."),
    sampleAuthorised: z.union([z.literal("on"), z.literal(true), z.literal("true")]).optional(),
    privacy: consent("Please confirm you have read the candidate privacy notice."),
  })
  .superRefine((v, ctx) => {
    if (!v.linkedin && !v.hasCv) {
      ctx.addIssue({ code: "custom", path: ["linkedin"], message: "Please add a LinkedIn profile or attach a CV." });
    }
    if (v.assessmentPreference === "Authorised, anonymised sample" && !v.sampleAuthorised) {
      ctx.addIssue({
        code: "custom",
        path: ["sampleAuthorised"],
        message: "Please confirm any sample will be anonymised and that you are authorised to share it, or choose a simulated role-play.",
      });
    }
  });

export type CandidateApplication = z.infer<typeof candidateApplicationSchema>;

export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Convert FormData to a plain object; repeated keys become arrays where listed. */
export function formDataToObject(fd: FormData, arrayKeys: string[] = []): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const key of arrayKeys) obj[key] = [];
  fd.forEach((value, key) => {
    if (typeof value !== "string") return;
    if (arrayKeys.includes(key)) (obj[key] as string[]).push(value);
    else obj[key] = value;
  });
  return obj;
}
