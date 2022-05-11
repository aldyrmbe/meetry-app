import { getRoleMapping } from "./user"
import { GetServerSidePropsContext } from "next"
import { getUser } from "src/service/user"

export const authenticate = (authorizedRole: "peneliti" | "mitra" | "eric" | "accountofficer" | undefined) => {
  return async (context: GetServerSidePropsContext) => {
    const user = await getUser(context.req.headers.cookie)
    if (user) {
      const { id, role } = user
      if (authorizedRole == undefined || authorizedRole === role.toLowerCase()) {
        return {
          props: {
            id,
            role
          }
        }
      } else {
        if (role == "ACCOUNT_OFFICER") {
          return {
            redirect: {
              permanent: false,
              destination: `/${getRoleMapping(role)}/request`
            },
            props: {}
          }
        }
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
        destination: "/?isLoggedOut=true"
      },
      props: {}
    }
  }
}

export const customAuthenticate = (validRoles: any[]) => {
  return async (context: GetServerSidePropsContext) => {
    const roleParam = context.query.role as string
    if (!validRoles.includes(roleParam)) {
      return {
        props: {
          error: true,
          role: undefined
        }
      }
    }
    const user = await getUser(context.req.headers.cookie)
    if (user) {
      const { id, role } = user
      if (roleParam === getRoleMapping(role)) {
        return {
          props: {
            role,
            id
          }
        }
      } else {
        if (role == "ACCOUNT_OFFICER") {
          return {
            redirect: {
              permanent: false,
              destination: `/accountofficer/kolaborasi`
            },
            props: {}
          }
        }
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
        destination: "/?isLoggedOut=true"
      },
      props: {}
    }
  }
}
