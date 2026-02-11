"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

type FeedbackType = "problema" | "sugerencia";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL ??
  "https://discord.com/api/webhooks/1470994836491604013/b-qcdjoKCVFcSdSRjvRQBc4o2sk8oMYckZvFp6fA7-fHdrdt5LsCzjNVDuFMmFQCTiMD";
const MAX_MESSAGE_LENGTH = 1800;

export default function FeedbackSection() {
  const [type, setType] = useState<FeedbackType>("problema");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setErrorMessage("Escribe el detalle del problema o la sugerencia.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const safeMessage =
        trimmedMessage.length > MAX_MESSAGE_LENGTH
          ? `${trimmedMessage.slice(0, MAX_MESSAGE_LENGTH)}...`
          : trimmedMessage;

      const contentLines = [
        `**Nuevo reporte (${type})**`,
        safeMessage,
        email.trim() ? `Contacto: ${email.trim()}` : "Contacto: No proporcionado",
        `URL: ${window.location.href}`,
      ];

      const formData = new FormData();
      formData.append(
        "payload_json",
        JSON.stringify({ content: contentLines.join("\n") })
      );

      const canBeacon =
        typeof navigator !== "undefined" && "sendBeacon" in navigator;

      if (canBeacon) {
        const ok = navigator.sendBeacon(WEBHOOK_URL, formData);
        if (!ok) {
          throw new Error("Beacon failed");
        }
      } else {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          keepalive: true,
          body: formData,
        });
      }

      setStatus("success");
      setMessage("");
      setEmail("");
    } catch {
      setStatus("success");
      setErrorMessage(
        "No pudimos confirmar el envio, pero es posible que ya haya llegado."
      );
    }
  };

  return (
    <section
      id="reportes"
      className="py-16 bg-white border-t border-icfes-blue/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-icfes-blue-lighter text-icfes-blue text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Reportes y sugerencias
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-icfes-blue mb-3">
            Reporta un problema o comparte una sugerencia
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Tu reporte nos ayuda a mejorar la plataforma. Deja tu correo (opcional)
            si quieres que te avisemos cuando el problema se resuelva o la sugerencia
            se implemente.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div className="bg-icfes-blue-lighter/40 border border-icfes-blue/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              {type === "problema" ? (
                <AlertTriangle className="w-6 h-6 text-icfes-red" />
              ) : (
                <Lightbulb className="w-6 h-6 text-icfes-yellow" />
              )}
              <div>
                <p className="text-sm font-semibold text-icfes-blue">
                  Que quieres reportar?
                </p>
                <p className="text-xs text-gray-500">
                  Selecciona el tipo de mensaje para clasificarlo.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setType("problema")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                  type === "problema"
                    ? "bg-icfes-red/10 text-icfes-red border-icfes-red/30"
                    : "bg-white text-gray-600 border-gray-200 hover:border-icfes-red/40"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Reportar problema
              </button>
              <button
                type="button"
                onClick={() => setType("sugerencia")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                  type === "sugerencia"
                    ? "bg-icfes-yellow/10 text-icfes-yellow border-icfes-yellow/40"
                    : "bg-white text-gray-600 border-gray-200 hover:border-icfes-yellow/50"
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                Enviar sugerencia
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8"
          >
            <label className="text-sm font-semibold text-gray-900">
              Detalles
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Cuentanos que paso o que te gustaria mejorar."
              className="mt-2 w-full min-h-[140px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-icfes-blue focus:bg-white"
              maxLength={2000}
              required
            />

            <label className="mt-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              Correo (opcional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-icfes-blue focus:bg-white"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className={`mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                status === "sending"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-icfes-blue text-white hover:bg-icfes-blue-light"
              }`}
            >
              <Send className="w-4 h-4" />
              {status === "sending" ? "Enviando..." : "Enviar reporte"}
            </button>

            <div className="mt-3 text-xs text-gray-500" aria-live="polite">
              {status === "success" && (
                <span className="inline-flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Gracias! Tu reporte fue enviado.
                </span>
              )}
              {errorMessage && (
                <span className="inline-flex items-center gap-1 text-icfes-yellow">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {errorMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
