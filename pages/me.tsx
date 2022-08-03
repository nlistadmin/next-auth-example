import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function MePage() {
  const { data, status } = useSession()
  console.log('MePage data ',JSON.stringify(data,null,2),' status ',JSON.stringify(status))
  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
