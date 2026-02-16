import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { saveQuote } from "./quotes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/quote – recebe dados do formulário de orçamento e guarda o lead
  app.post("/api/quote", async (req, res) => {
    try {
      const body = req.body as {
        name?: string;
        email?: string;
        phone?: string;
        inputs?: unknown;
        results?: unknown;
      };
      if (!body?.name || !body?.email || !body?.phone) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: name, email, phone",
        });
      }
      const id = await saveQuote({
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        phone: String(body.phone).trim(),
        inputs: body.inputs ?? {},
        results: body.results ?? {},
        createdAt: new Date().toISOString(),
      });
      return res.status(200).json({ success: true, id });
    } catch (err) {
      console.error("POST /api/quote error:", err);
      return res.status(500).json({ success: false, message: "Failed to save quote" });
    }
  });

  return httpServer;
}
