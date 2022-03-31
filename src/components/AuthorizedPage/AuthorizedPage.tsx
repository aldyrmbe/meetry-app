const AuthorizedPage = (Component: any) => {
  return () => {
    return <Component></Component>
  }
}

AuthorizedPage.displayName = "Authorized Page"

export default AuthorizedPage
