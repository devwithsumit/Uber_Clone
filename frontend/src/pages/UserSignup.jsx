import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContextHook';

const UserSignup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/users/register`, newUser);
            const data = response.data.mainData;
            localStorage.setItem('token', data.token);
            setUser(data.user);
            navigate('/home');
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
                        <div className='flex gap-4 mb-7'>
                            <input // Firstname state
                                required
                                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                                type="text"
                                placeholder='First name'
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                            <input // lastname state
                                required
                                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                                type="text"
                                placeholder='Last name'
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                        </div>
                        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                        <input // email state
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                            placeholder='email@example.com'
                        />
                        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                        <input // password state
                            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            minLength={3}
                            required type="password"
                            placeholder='password'
                        />
                        <button
                            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                        >Create Account</button>
                    </form>
                    <p className='text-center'>Already have a account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
                </div>
                <div>
                    <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
                </div>
            </div>
        </div>
    )
}

export default UserSignup
