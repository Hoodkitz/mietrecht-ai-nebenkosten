import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Zahlung erfolgreich!</h1>
        <p className="text-gray-600 mb-8">
          Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
        </p>
        <Link
          href="/"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
