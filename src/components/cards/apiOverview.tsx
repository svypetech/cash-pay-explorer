
const endpoints = [
    { name: "Account", link: "?module=account" },
    { name: "Stats", link: "?module=stats" },
    { name: "Transaction", link: "?module=transaction" },
    { name: "Logs", link: "?module=logs" },
    { name: "Block", link: "?module=block" },
    { name: "Token", link: "?module=token" },
    { name: "Contract", link: "?module=contract" },
  ]
  
  function ApiOverview({ showDark }: { showDark: boolean | null }) {
  
    return (
      <div className="w-fit md:w-auto max-w-[1280px] rounded-[20px] border border-gray-300 bg-dark p-10 my-5 mx-8 md:mx-20">
        <h2 className="mb-6 text-3xl font-bold text-darkText">API Documentation</h2>
        <div className="space-y-4">
          <p className={`text-xl font-poppins ${showDark ? `text-skyblue` : `text-primary`}`}>{`[  Base URL: https://localhost:3000/api  ]`}</p>
          <p className="text-darkText">
            This API is provided for developers transitioning their applications from Etherscam to Marvellex. It supports
            GET and POST requests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-y-5 gap-x-12">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.name}
                className='flex justify-between'
              >
                <div
                  // href={endpoint.link}
                  className="rounded-md bg-opacity-10 p-3 text-center text-darkText hover:bg-opacity-20"
                >
                  {endpoint.name}
                </div>
                <div
                  className={`rounded-md ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} bg-opacity-10 p-3 text-center hover:bg-opacity-20`}
                >
                  {endpoint.link}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export default ApiOverview