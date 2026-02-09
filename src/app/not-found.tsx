import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-icfes-gray flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-icfes-blue mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Página no encontrada
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-icfes-blue text-white rounded-xl font-semibold hover:bg-icfes-blue-light transition-colors text-sm"
        >
          <Home className="w-4 h-4" />
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
