"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApiResponse {
  message?: string;
  error?: string;
  data?: unknown;
}

export function ApiExample() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApiConnection = async () => {
    try {
      setLoading(true);
      setError(null);

      // Test local Next.js API routes
      const result = await api.get("/api/competitions");

      setResponse({
        message: "API connection successful!",
        data: result.data.slice(0, 3), // Only show first few items to avoid cluttering the UI
      });
    } catch (err: unknown) {
      console.error("API connection error:", err);

      let errorMessage = "Failed to connect to the API. Please try again.";
      let errorDetails = "";

      const error = err as Error & {
        response?: { status: number; data?: { message?: string } };
        request?: unknown;
        name?: string;
        message?: string;
      };

      if (
        error?.name === "NetworkError" ||
        error?.message?.includes("Network Error")
      ) {
        errorMessage = "Network error: Cannot reach the API server";
        errorDetails =
          "This may be due to CORS restrictions or the server being down.";
      } else if (error?.response) {
        errorMessage = `Server responded with status: ${error.response.status}`;
        errorDetails =
          error.response.data?.message || JSON.stringify(error.response.data);
      } else if (error?.request) {
        errorMessage = "No response received from server";
        errorDetails = "The request was sent but no response was received.";
      } else {
        errorDetails = error?.message || "Unknown error occurred";
      }

      setResponse({
        error: errorMessage,
      });

      setError(errorDetails);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">API Connection Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={testApiConnection}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Testing Connection..." : "Test API Connection"}
          </Button>

          {response && (
            <div className="mt-4 p-4 rounded-lg bg-secondary/20">
              {response.message && (
                <p className="text-green-600 dark:text-green-400 font-medium">
                  {response.message}
                </p>
              )}

              {response.error && (
                <p className="text-red-600 dark:text-red-400 font-medium">
                  {response.error}
                </p>
              )}

              {error && (
                <div className="mt-2 text-sm text-red-500">
                  <p className="font-semibold">Error Details:</p>
                  <p className="mt-1">{error}</p>

                  <div className="mt-2 p-2 bg-black/5 dark:bg-white/5 rounded">
                    <p className="text-xs text-red-400">Troubleshooting:</p>
                    <ul className="list-disc pl-4 text-xs mt-1">
                      <li>Check if backend server is running</li>
                      <li>Verify CORS is properly configured</li>
                      <li>Check that the API endpoint is correct</li>
                      <li>Ensure network connectivity</li>
                    </ul>
                  </div>
                </div>
              )}

              {response.data && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">Response Data:</p>
                  <pre className="mt-1 text-xs p-2 bg-black/10 dark:bg-white/10 rounded overflow-auto">
                    {typeof response.data === "string"
                      ? response.data
                      : JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>
              Status:{" "}
              {loading
                ? "Testing connection..."
                : response
                  ? response.error
                    ? "Failed"
                    : "Success"
                  : "Idle"}
            </p>
            <p className="mt-1 text-xs">
              API URL: Local Next.js API (Endpoint: /api/competitions)
              <button
                onClick={() => window.open("/api/competitions", "_blank")}
                className="ml-2 text-xs text-primary underline"
              >
                Test Direct URL
              </button>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
