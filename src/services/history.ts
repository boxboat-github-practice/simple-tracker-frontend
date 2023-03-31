export interface History {
  id: number
  employeeId: number
  employeeName: string
  contractId: number
  clientId: number
  clientName: string
  role: string
}

const url = require('../local.json').apiUrl

export const getHistoryList = async (
  query: {
    employeeId?: number
    contractId?: number
    clientId?: number
  } = {}
) => {
  let queryString = ''
  if (Number.isFinite(query.employeeId)) {
    queryString += `employeeId=${query.employeeId}&`
  }
  if (Number.isFinite(query.contractId)) {
    queryString += `contractId=${query.contractId}&`
  }
  if (Number.isFinite(query.clientId)) {
    queryString += `clientId=${query.clientId}&`
  }
  const response = await fetch(
    `${url}/history${queryString ? '?' + queryString : ''}`
  )
  const data = await response.json()
  return data as History[]
}

export const getHistory = async (id: number) => {
  const response = await fetch(`${url}/history/${id}`)
  const data = await response.json()
  return data as History
}

export const createHistory = async (newHistory: {
  employeeId: number
  contractId: number
  clientId: number
  role: string
}) => {
  const payload = newHistory
  const response = await fetch(`${url}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data as History
}

export const updateHistory = async (history: History) => {
  await fetch(`${url}/history/${history.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(history),
  })
}

export const deleteHistory = async (id: number) => {
  await fetch(`${url}/history/${id}`, { method: 'DELETE' })
}
