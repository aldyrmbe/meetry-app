import { GetServerSidePropsContext } from "next"
import { getUser } from "@lib/service/user"

const authenticate = (authorizedRole: "peneliti" | "mitra" | "eric" | "accountofficer") => {
  return async (context: GetServerSidePropsContext) => {
    const user = await getUser(context.req.headers.cookie)
    if (user) {
      const role = user.role
      if (authorizedRole === role.toLowerCase()) {
        return {
          props: {}
        }
      } else {
        return {
          redirect: {
            permanent: false,
            destination: `/${role.toLowerCase()}/dashboard`
          },
          props: {}
        }
      }
    }
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {}
    }
  }
}

export default authenticate
