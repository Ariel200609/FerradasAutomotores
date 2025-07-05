import React, { useState } from "react";
import { loginUser, registerUser } from "../controllers/authController";

const AuthView: React.FC = () => {
  // Estado para alternar entre login y registro
  const [isLogin, setIsLogin] = useState(true);
  // Estados de los campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejar envío de formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (isLogin) {
        await loginUser({ email, password });
        setSuccess("¡Login exitoso!");
      } else {
        await registerUser({ username, email, password });
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || "Error en la autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input type="text" placeholder="Nombre de usuario" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600" required />
            </div>
          )}
          <div>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600" required />
          </div>
          <div>
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600" required />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300" disabled={loading}>
            {loading ? "Enviando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button className="text-red-400 hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        {success && <div className="text-green-500 text-center mt-4">{success}</div>}
      </div>
    </section>
  );
};

export default AuthView; 