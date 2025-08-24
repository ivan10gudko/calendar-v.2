import React, { use, useState } from "react";
import LoginForm from "../components/auth/LoginForm";


const LoginPage: React.FC = () => {
    const [needEmailVerification, setNeedEmailVerification] = useState(false);
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {needEmailVerification ? (
                <div className="w-full max-w-md px-8 py-10 bg-white rounded shadow">
                    <h2 className="mb-6 text-2xl font-bold text-center">
                        Check your email for the verification link
                    </h2>
                </div>
            ) : (
                <LoginForm
                    setNeedEmailVerification={setNeedEmailVerification}
                />
            )}
        </div>
    );
};

export default LoginPage;