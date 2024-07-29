'use client'
import Container from '@/app/components/Container'
import FormWrap from '@/app/components/FormWrap'
import LoginForm from './LoginForm'

const Login = () => {
    return ( 
        <Container>
            <FormWrap>
                <LoginForm />
            </FormWrap>
        </Container>
    );
}
 
export default Login;