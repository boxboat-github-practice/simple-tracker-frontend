const url = require('../local.json').apiUrl
// const url = process.env.API_URL
export interface Client {
  name: string
  url?: string
  id: number
}

export const getClients = async () => {
  const response = await fetch(`${url}/clients`)
  const data = await response.json()
  return data as Client[]
}

export const getClient = async (id: number) => {
  const response = await fetch(`${url}/clients/${id}`)
  const data = await response.json()
  return data as Client
}

export const createClient = async (
  name: string = 'Company Name',
  clientUrl?: string
) => {
  const payload = { name: name, url: url }
  const response = await fetch(`${url}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data as Client
}

export const updateClient = async (client: Client) => {
  await fetch(`${url}/clients/${client.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  })
}

export const deleteClient = async (id: number) => {
  await fetch(`${url}/clients/${id}`, { method: 'DELETE' })
}
