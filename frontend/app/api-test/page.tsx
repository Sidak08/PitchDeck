import { ApiExample } from "@/components/api-example";
import Link from "next/link";

export default function ApiTestPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        API Connection Test
      </h1>
      <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
        This page tests the connection to the backend API at{" "}
        <code className="px-2 py-1 bg-muted rounded">
          https://pitchdeck-ddnd.onrender.com
        </code>
      </p>
      <div className="max-w-xl mx-auto">
        <ApiExample />
      </div>
      <div className="mt-12 text-center">
        <Link href="/" className="text-sm text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
