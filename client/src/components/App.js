import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import User from "./User"
import Going from "./Going"
import NotGoing from "./NotGoing"

export default function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={User} />
        <Route path="/Going" component={Going} />
        <Route path="/NotGoing" component={NotGoing} />
      </div>
    </Router>
  )
}
