// src/components/Auth/AuthWrapper.jsx
export default function AuthWrapper({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
