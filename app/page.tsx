import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            QuestionPro Image Generator
          </h1>
          <p className="text-gray-500 mb-6">
            Inicia sesion con tu cuenta de QuestionPro
          </p>
          <a href="/api/auth/signin" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Iniciar sesion con Google
          </a>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          QuestionPro Image Generator
        </h1>
        <p className="text-gray-600">Bienvenida! Aqui iran las plantillas.</p>
        <a href="/api/auth/signout" className="text-sm text-red-500">
          Cerrar sesion
        </a>
      </div>
    </main>
  );
}