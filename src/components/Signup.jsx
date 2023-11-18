import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from "react-router-dom"
import {login} from "../store/authSlice"
import {Button, Input, Logo} from "../components/index"
import { useForm } from 'react-hook-form'
import {useDispatch} from "react-redux"

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [error, setError] = useState("")

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                console.log(userData);
                if (userData) {
                    dispatch(login(userData))
                    // console.log(userData);
                    // console.log("true");
                    window.location.href = "/"
                    // navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    
                    <form onSubmit={handleSubmit(create)}>
                        <div className='space-y-5'>
                            <Input
                            label="Full Name: "
                            autoComplete="username"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                            />
                            <Input
                            label="Email: "
                            placeholder="Enter your email"
                            autoComplete="email"
                            type="email"
                            id="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                            />
                            {errors.email && <p className="text-red-600 mt-2 text-center">{errors.email.message}</p>}
                            <Input
                            label="Password: "
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?/~]).{8,}$/.test(value) ||
                                    "Password requires at least one uppercase, one lowercase, one special character, and one number."
                                }})}
                            />
                            {errors.password && <p className="text-red-600 mt-2 text-center">{errors.password.message}</p>}
                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Signup