import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"

import PageRender from "./PageRender"
import { Header, Footer } from "./components/global"
import { Alert } from "./components/alert/Alert"
import { refreshToken } from "./redux/auth/action"
import { getCategories } from './redux/category/actions';
import { getHomeBlogs } from './redux/blog/actions';

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHomeBlogs())
    dispatch(getCategories())
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <>
      <Header />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </div>
      <Footer />
    </>
  )
}

export default App
