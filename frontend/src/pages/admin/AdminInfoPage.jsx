import { Link } from "react-router-dom";

export default function AdminInfoPage({ title, message }) {
  return (
    <section className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-3 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mb-6 text-gray-600">{message}</p>
      <Link
        to="/admin"
        className="inline-flex rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Back to Admin Overview
      </Link>
    </section>
  );
}
