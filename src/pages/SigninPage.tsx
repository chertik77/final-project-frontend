import {
  AuthFormNavigation,
  AuthLayout,
  SigninForm
} from 'components/pages/auth'

const SigninPage = () => (
  <AuthLayout>
    <AuthFormNavigation />
    <SigninForm />
  </AuthLayout>
)

export default SigninPage
