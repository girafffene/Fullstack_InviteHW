import React from "react"
import { useUser } from "../hooks"

export default function Going() {
  const { getUsersNotGoing } = useUser()

  return (
    <div>
      <header>
        <h1>Not Going</h1>
      </header>
      <div className="wrapper">
        {getUsersNotGoing.map(person => (
          <div className="wrapperGoing">
            <ul key={"user" + person.name}>
              <li>
                <div className="goingImageHolder">
                  <img src={person.img} />
                </div>
              </li>

              <li>
                <p>
                  <strong>Name:</strong> {person.name}
                </p>
              </li>

              <li>
                <p>
                  <strong>Phone:</strong> {person.phone}
                </p>
              </li>

              <li>
                <p>
                  <strong>Email:</strong> {person.email}
                </p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
