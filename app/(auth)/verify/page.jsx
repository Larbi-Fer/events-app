import AuthFrom from "@components/shared/AuthFrom";

export const metadata = {
  title: 'Activation'
}

const Verify = ({ searchParams }) => {
  return (
    <div>
      <AuthFrom email={searchParams.email} />
    </div>
  )
}

export default Verify