'user client'
import { useState } from 'react'
import Link from 'next/link'
import { FilledValue, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/app/components/Button'
import { AiOutlineGoogle } from 'react-icons/ai'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } =
        useForm<FieldValues>({
            defaultValues:{
                email: '',
                password: ''
            }
        })
    
    const onSubmit:SubmitHandler<FilledValue> = (data) => {
        setIsLoading(true)
        console.log(data)
        
    }

    return (
        <>
            <Heading title="Login for E-shop" />
            <Button outline label="Sign up with Google" icon={AiOutlineGoogle} onClick={() => {}} />
            <hr className="bg-slate-300 w-full h-px"/>
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="password"
                required
            />
            <Button label={isLoading ? "Loading" : "Login"}onClick={handleSubmit(onSubmit)} />
            <p className="text-sm mb-4 ">Do not have an account? <Link className="underline" href ={"/register"} >Sign up</Link></p>
        </>
    );
}
 
export default LoginForm