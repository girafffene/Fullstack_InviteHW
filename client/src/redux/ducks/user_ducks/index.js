import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useEffect } from "react"

const GET_USER = "user/GET_USER"

const GET_GOING = "user/GET_GOING"
const GET_NOT_GOING = "user/GET_NOT_GOING"

const SET_GOING_COUNT = "user/SET_GOING_COUNT"
const SET_NOT_GOING_COUNT = "user/SET_NOT_GOING_COUNT"

const initialState = {
  user: {},
  going: [],
  notGoing: [],
  goingCount: 0,
  notGoingCount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload }

    case GET_GOING:
      return { ...state, going: action.payload }

    case GET_NOT_GOING:
      return { ...state, notGoing: action.payload }

    case SET_GOING_COUNT:
      return { ...state, goingCount: action.payload }

    case SET_NOT_GOING_COUNT:
      return { ...state, notGoingCount: action.payload }
    default:
      return state
  }
}

//grabs a new "user" from the API
function getUser() {
  return dispatch => {
    axios.get("/api/newuser").then(resp => {
      dispatch({
        type: GET_USER,
        payload: resp.data
      })
    })
  }
}

//grabs all the "users" from the array of "going"
function getGoing() {
  return dispatch => {
    axios.get("/api/going").then(resp => {
      dispatch({
        type: GET_GOING,
        payload: resp.data
      })
    })
  }
}

//grabs all the "users" from the array of "not going"
function getNotGoing() {
  return dispatch => {
    axios.get("/api/notgoing").then(resp => {
      dispatch({
        type: GET_NOT_GOING,
        payload: resp.data
      })
    })
  }
}

//function to ADD a "user" to our "going" array
export function userGoing(user) {
  return dispatch => {
    axios.post("/api/going", { user }).then(resp => {
      dispatch({
        type: SET_GOING_COUNT,
        payload: resp.data.length
      })
      dispatch(getUser())
    })
  }
}

//function to ADD "user" to our "not going" array
export function userNotGoing(user) {
  return dispatch => {
    axios.post("/api/notgoing", { user }).then(resp => {
      dispatch({
        type: SET_NOT_GOING_COUNT,
        payload: resp.data.length
      })
      dispatch(getUser())
    })
  }
}

//function for custom hook
export function useUser() {
  const dispatch = useDispatch()

  const user = useSelector(appState => appState.userState.user)

  const going = user => dispatch(userGoing(user))
  const getUsersGoing = useSelector(appState => appState.userState.going)

  const notGoing = user => dispatch(userNotGoing(user))
  const getUsersNotGoing = useSelector(appState => appState.userState.notGoing)

  const goingArray = user => dispatch(getGoing(user))
  const notGoingArray = user => dispatch(getNotGoing(user))

  const goingCount = useSelector(appState => appState.userState.goingCount)
  const notGoingCount = useSelector(
    appState => appState.userState.notGoingCount
  )

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(getGoing())
  }, [dispatch])

  useEffect(() => {
    dispatch(getNotGoing())
  }, [dispatch])

  return {
    user,
    going,
    notGoing,
    goingCount,
    notGoingCount,
    goingArray,
    notGoingArray,
    getUsersGoing,
    getUsersNotGoing
  }
}
