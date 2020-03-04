import React from "react"
import { useUser } from "../hooks"
import { FaCheck } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

export default props => {
  const { user, going, notGoing, goingCount, notGoingCount } = useUser()

  return (
    <div>
      <div className="attendeeCount">
        <Link to="/Going">
          <button className="going">Going: {goingCount}</button>
        </Link>

        <Link to="/NotGoing">
          <button className="notGoingLink">Not Going: {notGoingCount}</button>
        </Link>
      </div>

      <div className="userCard">
        <div className="pictureHolder">
          <img src={user.img} />
        </div>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        <p className="email">
          <strong>Email:</strong> {user.email}
        </p>

        <div className="buttonHolder">
          <button onClick={e => notGoing(user)} className="notGoingButton">
            <FaTimes />
          </button>

          <button onClick={e => going(user)} className="goingButton">
            <FaCheck />
          </button>
        </div>
      </div>
    </div>
  )
}
