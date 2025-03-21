
import { ChevronDown } from "lucide-react"
import GraphQLComponent from '@/src/components/cards/graphqlCard';

function AccountEndpoints({ showDark }: { showDark: boolean | null }) {

  const endpoints = [
    {
      description:
        "Mimics Ethereum JSON RPC's eth_getBalance. Returns the balance as of the provided block (defaults to latest)",
      endpoint: "?module=account&action=eth_get_balance&address={addressHash}",
      label: "eth_get_balance",
    },
    {
      description:
        "Get balance for address. Also available through a GraphQL 'addresses' query. If the balance hasn't been updated in a long time, we will double check with the node to fetch the absolute latest balance. This will not be reflected in the current request, but once it is updated, subsequent requests will show the updated balance. If you want to know whether or not we are checking for another balance, use the balance/will-action. That contains a property called stale that will let you know to recheck that balance in the near future.",
      endpoint: "?module=account&action=balance&address={addressHash}",
      label: "balance",
    },
    {
      description:
        "Get balance for multiple addresses. Also available through a GraphQL 'addresses' query. If the balance hasn't been updated in a long time, we will double check with the node to fetch the absolute latest balance. This will not be reflected in the current request, but once it is updated, subsequent requests will show the updated balance. You can know that this is taking place via the stale attribute, which is set to true if a new balance is being fetched.",
      endpoint: "?module=account&action=balancemulti&address={addressHash1,addressHash2,addressHash3}",
      label: "balancemulti",
    },
  ]

  return (
    <div className="sm:w-fit md:w-auto max-w-[1280px] rounded-[20px] border border-gray-300 bg-dark my-5 mx-8 md:mx-20">
      <div className='p-[40px]'>
        <div className='flex gap-[28px]'>
          <h5 className="text-[24px] font-bold text-darkText font-weight:700">Account</h5>
          <div
            className={`rounded-md ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} bg-opacity-10 py-2 px-3 text-center hover:bg-opacity-20 flex items-center`}
          >
            ?module=account
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {endpoints.map((item, index) => (
          <div key={index} className={` ${index < endpoints.length ? "w-full border-t border-gray-200" : ""}`}>
            <div className='my-10' >
              {/* row1 */}
              <div className={`flex md:justify-between flex-col md:flex-row gap-3 md:gap-10 px-[40px] mb-8`}>
                <p className="mb-4 text-darkText">{item.description}</p>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-[#66E04E1A] px-5 py-2 text-sm font-medium text-[#20C000]">GET</button>
                  <button className={`rounded-lg ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} px-5 py-2 text-sm font-medium`}>POST</button>
                </div>
              </div>
              {/* row2 */}
              <div className="rounded-md bg-opacity-10 flex px-[40px] mb-8">
                <div className={`rounded-md ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} bg-opacity-10 py-2 px-3 hover:bg-opacity-20 break-words overflow-x-auto whitespace-pre-wrap`}>
                  {item.endpoint}
                </div>
              </div>
              {/* row3 */}
              <div className="flex justify-between px-[40px]">
                <span className="text-xs text-gray-500">{item.label}</span>
                <button className="flex items-center cursor-pointer text-sm font-medium text-darkText">
                  More Details
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountEndpoints