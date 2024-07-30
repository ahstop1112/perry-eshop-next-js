'user client'
import { useState } from 'react'
import Link from 'next/link'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import Button from '@/app/components/Button'
import { AiOutlineGoogle } from 'react-icons/ai'
import Heading from '../components/Heading'
import Input from '../components/inputs/Input'

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } =
        useForm<FieldValues>({
            defaultValues:{
                name: '',
                email: '',
                password: ''
            }
        })

    const router = userRouter()
    
    const onSubmit:SubmitHandler<FilledValue> = (data) => {
        setIsLoading(true)
        console.log(data)
        
        axios.post('/api/register', data).then(() => {
            toast.success('Account created')

            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
                if(callback?.ok){
                    router.push('/cart')
                    router.refresh(
                        toast.success('Logged In')
                    )
                }
            })

            if (callback?.error){
                throw error('Callback error')
            }
        }).catch(() => toast.error("Something went wrong")).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Heading title="Sign up for E-shop" />
            <Button outline label="Sign up with Google" icon={AiOutlineGoogle} onClick={() => {}} />
            <hr className="bg-slate-300 w-full h-px"/>
            <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
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
            <Button label={isLoading ? "Loading" : "Sign Up"}onClick={handleSubmit(onSubmit)} />
            <p className="text-sm mb-4 ">Already have an account? <Link className="underline" href ={"/login"} >Log in</Link></p>
        </>
    );
}
 
export default RegisterForm