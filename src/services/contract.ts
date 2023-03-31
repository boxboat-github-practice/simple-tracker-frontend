import { formatDate } from '../utils'
import { createHistory, deleteHistory, getHistoryList } from './history'
// const url = require('../local.json').apiUrl
const url = process.env.API_URL

export interface Contract {
  id: number
  clientId: number
  type: string
  startDate: string
  endDate: string
  tech: string[]
}

export const getContracts = async (query: { clientId?: number } = {}) => {
  let queryString = ''
  if (query.clientId) {
    queryString += `clientId=${query.clientId}&`
  }

  const response = await fetch(
    `${url}/contracts${queryString ? '?' + queryString : ''}`
  )
  const data = await response.json()
  return data as Contract[]
}

export const getContract = async (id: number) => {
  const response = await fetch(`${url}/contracts/${id}`)
  const data = await response.json()
  return data as Contract
}

export const createContract = async (
  newContract: {
    clientId?: number
    type?: string
    startDate?: string
    endDate?: string
    tech?: string[]
  } = {
    clientId: 1,
    type: 'stuff',
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    tech: ['github'],
  }
) => {
  const payload = newContract
  const response = await fetch(`${url}/contracts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data as Contract
}

export const updateContract = async (contract: Contract) => {
  await fetch(`${url}/contracts/${contract.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contract),
  })
}

export const updateEmployeeContractHistory = async (
  employeeIds: number[],
  clientId: number,
  contractId: number
) => {
  const contractHistory = await getHistoryList({ contractId })
  const currentEmployeeHistories = contractHistory.map(hist => ({
    employeeId: hist.employeeId,
    historyId: hist.id,
  }))
  const employeeHistoriesToRemove = currentEmployeeHistories.filter(x => {
    return employeeIds.indexOf(x.employeeId) < 0
  })

  employeeHistoriesToRemove.forEach(async hist => {
    await deleteHistory(hist.historyId)
  })

  const employeeHistoriesToAdd = employeeIds.filter(x => {
    return currentEmployeeHistories.map(hist => hist.employeeId).indexOf(x) < 0
  })

  if (employeeHistoriesToAdd.length > 0) {
    employeeHistoriesToAdd.forEach(async employeeId => {
      await createHistory({
        employeeId: employeeId,
        clientId: clientId,
        contractId: contractId,
        role: 'something',
      })
    })
  }
}

export const deleteContract = async (id: number) => {
  await fetch(`${url}/contracts/${id}`, { method: 'DELETE' })
}
