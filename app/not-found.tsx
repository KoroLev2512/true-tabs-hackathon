import "@/app/globals.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <h1 className="text-6xl font-bold mb-4 text-white select-none">404</h1>
      <p className="text-xl mb-6 text-white select-none">Страница не найдена</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        На главную
      </Link>
    </div>
  );
}
