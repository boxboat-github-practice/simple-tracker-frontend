import { Form, useLoaderData, redirect } from 'react-router-dom'
import Table from '../components/Table'
import Row from '../components/Row'
import { ReactComponent as ContractIcon } from '../assets/heroIcons/paper-clip.svg'
import { createContract, getContracts, Contract } from '../services/contract'
import { Outlet } from 'react-router-dom'
import { getClients } from '../services/client'

export const loader = async () => {
  const contracts = await getContracts()
  const clients = await getClients()
  const merged = contracts.map(contract => ({
    ...contract,
    clientName: clients.find(client => client.id === contract.clientId)?.name,
  }))

  return merged
}

export const action = async () => {
  const contract = (await createContract()) as Contract
  return redirect(`/contracts/${contract.id}/edit`)
}

const Contracts = () => {
  const contracts = useLoaderData() as any[]

  return (
    <>
      <Table title="Contracts">
        <>
          {contracts.map(contract => {
            return (
              <Row key={contract.id} objectId={contract.id}>
                <div className="flex flex-row items-center">
                  <ContractIcon className="w-14 h-14" />
                  <div className="ml-2">
                    <p className="text-xl tracking-wide text-gray-900">
                      {contract.clientName}: {contract.type}
                    </p>
                  </div>
                </div>
              </Row>
            )
          })}
        </>
        <div className="text-center">
          <Form method="post">
            <button
              type="submit"
              className="rounded-full bg-blue-400 text-gray-100 text-lg px-6 py-1 my-3"
            >
              New +
            </button>
          </Form>
        </div>
      </Table>
      <Outlet />
    </>
  )
}

export default Contracts
