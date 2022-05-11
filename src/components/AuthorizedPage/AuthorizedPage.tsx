import { Role } from "src/service/user"

const AuthorizedPage = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return ({ role }: { role: Role }) => {
    return <Component role={role}></Component>
  }
}

export default AuthorizedPage
