import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkRegister } from "../../validations/register";
import { loginUser, registerUser, signInWithGoogle } from "../../service/auth";
import { createUserUsername } from "../../service/user";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";



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
            <div>

                <h1>Register</h1>
                {/* <NavLink to="/login">Login</NavLink> */}
                <label htmlFor="username">Username: </label><br />
                <input style={{ border: `1px solid ${errorColor(`username`)}` }} type="text" name='username' id='username' placeholder='username' value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /><br />
                {error.username && error.username !== 'valid' && <h5 style={{ color: 'red' }}>{error.username}</h5>}
                <label htmlFor="email">Email: </label><br />
                <input style={{ border: `1px solid ${errorColor(`email`)}` }} type="text" name='email' id='email' placeholder="✉ email..." value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
                {error.email && error.email !== 'valid' && <h5 style={{ color: 'red' }}>{error.email}</h5>}
                <label htmlFor="password">Password: </label><br />
                <input style={{ border: `1px solid ${errorColor(`password`)}` }} name='password' type="password" id='password' placeholder="🗝 password..." value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                {error.password && error.password !== 'valid' && <h5 style={{ color: 'red' }}>{error.password}</h5>}
                <div className='register-btn'>
                    <Button onClick={submit}>submit</Button>
                </div>
                {/* Add Google singin-btn */}
                <div className='google-signin'>
                    <Button onClick={handleGoogleSingIn}>Sign in with Google</Button>
                    </div>
            </div>
        </>

    )
}
export default Register;