"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApiResponse {
  message?: string;
  error?: string;
  data?: any;
}

export function ApiExample() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApiConnection = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use a common endpoint that should be available
      const result = await api.get("/api/competitions");

      setResponse({
        message: "API connection successful!",
        data: result.data.slice(0, 3), // Only show first few items to avoid cluttering the UI
      });
    } catch (err: any) {
      console.error("API connection error:", err);

      setResponse({
        error: "Connection failed",
      });

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to connect to the API. Please try again.",
      );
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

              {error && <p className="text-sm mt-2 text-red-500">{error}</p>}

              {response.data && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">Response Data:</p>
                  <pre className="mt-1 text-xs p-2 bg-black/10 dark:bg-white/10 rounded overflow-auto">
                    {JSON.stringify(response.data, null, 2)}
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
              API URL:{" "}
              {process.env.NEXT_PUBLIC_API_URL ||
                "https://pitchdeck-ddnd.onrender.com"}
              (Endpoint: /api/competitions)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
