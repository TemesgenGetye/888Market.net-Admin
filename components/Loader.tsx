"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`animate-spin rounded-full h-12 w-12 border-b-2 border-primary border-blue-500`}
      ></div>
    </div>
  );
}
