import TemplateModern    from "@/components/templates/TemplateModern";
import TemplateMinimal   from "@/components/templates/TemplateMinimal";
import TemplateCreative  from "@/components/templates/TemplateCreative";
import TemplateExecutive from "@/components/templates/TemplateExecutive";

export const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Bold sidebar with blue gradient and amber accents. Great for tech roles.",
    category: "Professional",
    component: TemplateModern,
    featured: true,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean grey sidebar with understated typography. Versatile for any industry.",
    category: "Professional",
    component: TemplateMinimal,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Vibrant violet gradient header with skill chips. Perfect for designers and developers.",
    category: "Creative",
    component: TemplateCreative,
    featured: true,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Elegant serif typography with refined spacing. Ideal for managers and executives.",
    category: "Executive",
    component: TemplateExecutive,
  },
];

/** Map of id → component for fast lookup */
export const TEMPLATE_MAP = Object.fromEntries(TEMPLATES.map((t) => [t.id, t.component]));

/** Resolve a template component by id, falling back to Modern */
export function getTemplate(id) {
  return TEMPLATE_MAP[id] ?? TemplateModern;
}
