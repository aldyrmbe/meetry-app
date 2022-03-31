interface BasePath {
  peneliti: "peneliti"
  mitra: "mitra"
  eric: "eric"
  accountofficer: "accountofficer"
}

const basePath: BasePath = {
  peneliti: "peneliti",
  mitra: "mitra",
  eric: "eric",
  accountofficer: "accountofficer"
}

export const getRoleBasedPath = (
  role: "peneliti" | "mitra" | "eric" | "accountofficer",
  path: string
) => {
  return `/${basePath[role]}${path}`
}
