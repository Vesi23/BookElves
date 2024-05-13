import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkRegister } from "../../validations/register";
import { loginUser, registerUser, signInWithGoogle } from "../../service/auth";
import { createUserUsername } from "../../service/user";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import './Register.css';


const Register = () => {
    const navigation = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState({
        username: '',
        email: '',
        password: '',
    })

    const submit = async (): Promise<void> => {
        const { username, email, password } = await checkRegister(form.username, form.email, form.password);

        if (username !== 'valid' || email !== 'valid' || password !== 'valid') {
            setError({ username, email, password });
            return;
        }

        try {
            const response = await registerUser(form.email, form.password);
            createUserUsername(form.username, response.user.uid, form.email);
            loginUser(form.email, form.password);
            navigation('/home');
        } catch (error: any) {
            setError({ username: 'valid', password: 'valid', email: 'Email is already taken' });
            return;
        }
    }

    const handleGoogleSingIn = async (): Promise<void> => {
        try {
            await signInWithGoogle();

            navigation('/home');
        } catch (error) {
            toast.error('Error signing in with Google');
        }
    }

    const errorColor = (property: string): string => {
        if (error[property as keyof typeof error] === 'valid') {
            return 'green';
        }
        if (error[property as keyof typeof error] !== '') {
            return 'red';
        }
        return 'black';
    };

    return (
        <>
            <div className="regster-container">

                <h1 className="r-title">Register</h1>
                {/* <NavLink to="/login">Login</NavLink> */}
                <label htmlFor="username">Username: </label><br />
                <input style={{ border: `1px solid ${errorColor(`username`)}` }} className='form' type="text" name='username' id='username' placeholder='username' value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /><br />
                {error.username && error.username !== 'valid' && <h5 style={{ color: 'red' }}>{error.username}</h5>}
                <label htmlFor="email">Email: </label><br />
                <input style={{ border: `1px solid ${errorColor(`email`)}` }} className='form' type="text" name='email' id='email' placeholder="✉ email..." value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
                {error.email && error.email !== 'valid' && <h5 style={{ color: 'red' }}>{error.email}</h5>}
                <label htmlFor="password">Password: </label><br />
                <input style={{ border: `1px solid ${errorColor(`password`)}` }} className='form' name='password' type="password" id='password' placeholder="🗝 password..." value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                {error.password && error.password !== 'valid' && <h5 style={{ color: 'red' }}>{error.password}</h5>}
                <div >
                    <Button className="register-btn" onClick={submit}>submit</Button>
                </div>
                {/* Add Google singin-btn */}
                <div className='google-signin'>
                    {/* <Button onClick={handleGoogleSingIn}>Sign in with Google</Button> */}
                    <button className="signin" onClick={handleGoogleSingIn}>
                        <svg
                            viewBox="0 0 256 262"
                            preserveAspectRatio="xMidYMid"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                fill="#4285F4"
                            ></path>
                            <path
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.130-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                fill="#34A853"
                            ></path>
                            <path
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                fill="#FBBC05"
                            ></path>
                            <path
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                fill="#EB4335"
                            ></path>
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </>

    )
}
export default Register;