import {
  Bell,
  Search,
  UserCircle2
} from "lucide-react"

export default function Navbar() {

  return (

    <div className="w-full flex justify-between items-center mb-10">

      {/* Left */}
      <div>

        <h1 className="text-5xl font-bold">
          Smart Price Dashboard
        </h1>

        <p className="text-zinc-400 mt-3 text-lg">
          AI powered real estate analytics platform
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search properties..."
            className="bg-transparent outline-none text-white placeholder:text-zinc-500 w-56"
          />

        </div>

        {/* Notification */}
        <button className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition">

          <Bell size={22} />

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">

          <UserCircle2
            size={42}
            className="text-blue-400"
          />

          <div>

            <h1 className="font-semibold">
              Nilesh
            </h1>

            <p className="text-zinc-400 text-sm">
              Premium User
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}