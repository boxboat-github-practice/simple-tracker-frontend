const url = require('../local.json').apiUrl
// const url = process.env.API_URL
console.log(process.env)
export interface Employee {
  name: string
  github?: string
  id: number
}

export const getEmployees = async () => {
  console.log(`${url}`)
  const response = await fetch(`${url}/employees`)
  const data = await response.json()
  return data as Employee[]
}

export const getEmployee = async (id: number) => {
  const response = await fetch(`${url}/employees/${id}`)
  const data = await response.json()
  return data as Employee
}

export const createEmployee = async (
  name: string = 'Batman',
  githubUsername: string = 'batman'
) => {
  const payload = { name: name, github: githubUsername }
  const response = await fetch(`${url}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data as Employee
}

export const updateEmployee = async (employee: Employee) => {
  await fetch(`${url}/employees/${employee.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  })
}

export const deleteEmployee = async (id: number) => {
  await fetch(`${url}/employees/${id}`, { method: 'DELETE' })
}
