import { authOptions } from "./api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export async function getServerSideProps(context:any) {
  const session = await unstable_getServerSession(context.req,context.res,authOptions)
  console.log('session returned ', session)
  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,        
      },
    }
  }

  return {
    props: {
      session,
    }
  }
}


export default function Page({session}:{session: DefaultSession}) {
  
  if(session && session.role==='admin') {
    return (
      <div>
        <h1>Admin</h1>
        <p>Welcome to the Admin Portal!</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>You are not authorized to view this page!</h1>
      </div>
    )
  }
  
}
