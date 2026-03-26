import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { useAppConfig } from "../state/AppConfig";

export function LegalPage() {
  const { type } = useParams();
  const { config } = useAppConfig();

  const { title, body } = useMemo(() => {
    if (type === "terms") {
      return {
        title: "Terms & Conditions",
        body: `
We provide academic guidance and support services. Deliverables, timelines and pricing are agreed during consultation.

We do not guarantee acceptance in journals/conferences. Acceptance depends on research quality and the review process.

Clients are responsible for verifying institutional and publisher rules, including originality and citation requirements.
        `.trim()
      };
    }
    if (type === "refund") {
      return {
        title: "Refund Policy",
        body: `
Refunds depend on the project stage and work already delivered. If you have a concern, contact us within 48 hours of the issue.

Where applicable, we prioritize resolution: corrections, additional review, or alternative deliverables.
        `.trim()
      };
    }
    return {
      title: "Privacy Policy",
      body: `
${config.appName} collects only the information required to provide guidance: name, email, phone, project topic and optional uploads.

We do not sell personal data. Files are used only for evaluation and service delivery.

If you want your data removed, contact us and we will process your request.
      `.trim()
    };
  }, [type, config.appName]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Legal
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{title}</h1>
      </div>
      <Card className="prose prose-slate max-w-none dark:prose-invert">
        <div style={{ whiteSpace: "pre-wrap" }}>{body}</div>
      </Card>
    </div>
  );
}

