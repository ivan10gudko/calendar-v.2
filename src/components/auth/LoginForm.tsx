import React, { useState} from 'react';
import TextInput from './TextInput';
import { supabase } from '../../services/supabaseClient';

type AuthMode = "login" | "signup";

interface LoginFormProps {
    setNeedEmailVerification: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setNeedEmailVerification }) => {
    const [mode, setMode] = useState<AuthMode>("login");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);


            const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setLoading(true);
                setError(null);
        
                if (mode === "login") {
                    const { error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) setError(error.message);
                } else {
                    const { error } = await supabase.auth.signUp({ email, password });
                    if (error) setError(error.message);
                    else {setNeedEmailVerification(true)};
                }
                setLoading(false);
            };
    return (
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
                    <h2 className="mb-6 text-2xl font-bold text-center">
                        {mode === "login" ? "Login" : "Sign Up"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <TextInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={v => setEmail(v)}
                        required
                    />
                    <TextInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={v => setPassword(v)}
                        required
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    {mode === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => setMode("signup")}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => setMode("login")}
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
    );
};

export default LoginForm;