import { useNavigate } from "react-router-dom";
import { User, useAppContext } from "../../context/appContext";
import { useState } from "react";
import { loginUser } from "../../service/auth";

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(false);
    const { setContext } = useAppContext();
    const navigate = useNavigate();


    const login = async (): Promise<void> => {
        try {
            const response = await loginUser(form.email, form.password);
            setContext({ user: response.user as User | any, userData: null });
            navigate('/home');
        } catch (error) {
            setError(true);
        }
    }
    return (
        <>
            <div>
                <h1>Login</h1>
                <label htmlFor="email">Email: </label><br />
                <input type="text" name='email' id='email' placeholder='email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
                <label htmlFor="password">Password: </label><br />
                <input type="password" name='password' id='password' placeholder='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><br />
                <button onClick={login}>Login</button>
                {error && <p>Invalid email or password</p>}
            </div>
        </>
    )
}
export default Login;