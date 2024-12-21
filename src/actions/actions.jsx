import { SignInSchema, SignUpSchema } from "./schema"

const BASE_URL = "http://localhost:5000"

function withBaseUrl(endpoint) {
  return `${BASE_URL}${endpoint}`
}

async function fetchJson(endpoint) {
  return await fetch(withBaseUrl(endpoint)).then((res) => res.json())
}

async function postJson(endpoint, data) {
  return await fetch(withBaseUrl(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
}

export const createNote = async (data) => await postJson("/notes", data)

export const fetchNote = async (id) => await fetchJson(`/notes/${id}`)

export const register = async (user) => {
  const result = SignUpSchema.parse(user)

  const users = await fetchJson(`/users?email=${user.email.toLowerCase()}`)

  if (users.length > 0) {
    throw new Error("User already exists")
  }

  await fetch(withBaseUrl("/users"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: result.name,
      password: result.password,
      email: result.email.toLowerCase(),
      signupDate: Date.now(),
    }),
  })

  return await fetchJson(`/users?email=${user.email.toLowerCase()}`).then(
    (users) => users[0]
  )
}

export const fetchUser = async (id) => await fetchJson("/users/" + id)

export const login = async (user) => {
  SignInSchema.parse(user)

  const users = await fetchJson(`/users?email=${user.email.toLowerCase()}`)

  if (users.length === 0) {
    throw new Error("User doesn't exist")
  }

  const { email, password } = user

  const result = await fetchJson(
    `/users?email=${email.toLowerCase()}&password=${password}`
  )

  if (result.length === 0) {
    throw new Error("Incorrect email or password")
  }

  return result[0]
}

export const updateNote = async (id, data) =>
  await fetch(withBaseUrl(`/notes/${id}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

export const deleteNote = async (id) =>
  await fetch(withBaseUrl(`/notes/${id}`), {
    method: "DELETE",
  })

export const fetchNotes = async (userId) =>
  await fetchJson(`/notes?userId=${userId}`)
