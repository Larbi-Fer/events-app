import AuthFrom from "@components/shared/AuthFrom";

export const metadata = {
  title: 'Login'
}

const Login = () => {
  return (
    <div>
      <AuthFrom email={null} />
    </div>
  )
}

export default Login