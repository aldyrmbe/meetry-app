import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Test = () => {
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => {
          const query = { ...router.query, ok: "123" }
          router.push({
            pathname: router.pathname,
            query: query
          })
        }}
      >
        push ke /ok
      </button>
      <button
        onClick={() => {
          delete router.query.ok
          router.push({
            pathname: router.pathname,
            query: router.query
          })
        }}
      >
        ok hapus
      </button>
      <div>{router.query.ok}</div>
      <div>
        <button
          onClick={() => {
            const query = { ...router.query, search: "ok" }
            router.push({
              pathname: router.pathname,
              query: query
            })
          }}
        >
          Push ke search
        </button>
        <button
          onClick={() => {
            delete router.query.search
            router.push({
              pathname: router.pathname,
              query: router.query
            })
          }}
        >
          search hapus
        </button>
      </div>
    </>
  )
}

export default Test
