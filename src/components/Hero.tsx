"use client";

import { ShieldCheck, ExternalLink, UserCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-icfes-blue via-icfes-blue-light to-icfes-blue overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-icfes-yellow rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
            Prepárate para el{" "}
            <span className="text-icfes-yellow">ICFES Saber 11°</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Material 100% oficial, verificado y gratuito para que logres el mejor puntaje posible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-icfes-yellow" />
            <h3 className="font-semibold text-sm mb-1">100% Oficial</h3>
            <p className="text-xs text-white/80">
              Toda la información proviene de materiales públicos del ICFES.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <UserCheck className="w-8 h-8 mx-auto mb-2 text-icfes-yellow" />
            <h3 className="font-semibold text-sm mb-1">Revisado por Humanos</h3>
            <p className="text-xs text-white/80">
              Toda esta información fue revisada por un humano y NO por una IA.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <Heart className="w-8 h-8 mx-auto mb-2 text-icfes-yellow" />
            <h3 className="font-semibold text-sm mb-1">Lo Mejor Para Ti</h3>
            <p className="text-xs text-white/80">
              Básicamente lo que queremos es lo mejor para todos ustedes.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 max-w-xl mx-auto border border-white/10"
        >
          <p className="text-sm text-white/90 mb-2">
            Puedes verificar toda la información directamente en la fuente oficial:
          </p>
          <a
            href="https://www.icfes.gov.co/caja-de-herramientas-saber-11/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-icfes-yellow text-icfes-blue font-semibold px-5 py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Caja de Herramientas ICFES Saber 11°
          </a>
          <p className="text-xs text-white/50 mt-3">
            Proyecto educativo independiente — No afiliado con el ICFES
          </p>
        </motion.div>
      </div>
    </section>
  );
}
