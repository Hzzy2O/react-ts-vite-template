import { Suspense , lazy } from "react"
import Layout from "@/layouts";
import Home from "@/pages/Home";
import routes from "./routes"
import { RouteObject } from "react-router";

function LazyElement(props) {
  const { importFunc } = props
  const LazyComponent = lazy(importFunc)
  return (
    <Suspense fallback={<div>路由懒加载...</div>}>
      <LazyComponent />
    </Suspense>
  )
}


function dealRoutes(routes:RouteObject[]) {
  if (routes && Array.isArray(routes) && routes.length > 0) {
    routes.forEach((route) => {
      if (route.element && typeof route.element == 'function') {
        const importFunc = route.element
        route.element = <LazyElement importFunc={importFunc} />
      }
      if (route.children) {
        dealRoutes(route.children)
      }
    })
  }

  return routes
}

export default dealRoutes(routes);