export default function Loader() {

  return (

    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

      <div className="text-center">

        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h1 className="text-white text-3xl font-bold mt-6">
          HouseAI
        </h1>

        <p className="text-zinc-400 mt-2">
          Loading AI Analytics...
        </p>

      </div>

    </div>

  )
}