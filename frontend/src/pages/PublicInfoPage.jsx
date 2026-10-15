import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublicInfoPage({ title, message }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Header />
      <main className="min-h-[55vh] px-4 pb-16 pt-32">
        <section className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg sm:p-12">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-gray-600">
            {message}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Go to Home
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-red-200 px-6 py-3 font-semibold text-red-700 transition hover:bg-red-50"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
