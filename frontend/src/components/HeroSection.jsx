import { motion } from "framer-motion"

import {
  TrendingUp
} from "lucide-react"

export default function HeroSection() {

  return (

    <motion.div

      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}

      className="rounded-[40px] p-10 mb-10 flex justify-between items-center bg-cover bg-center relative overflow-hidden min-h-[340px] border border-white/10 shadow-2xl"

      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop')"
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Left Content */}
      <div className="relative z-10 max-w-2xl">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="uppercase tracking-[6px] text-sm text-cyan-300 mb-4 font-semibold"
        >
          REAL ESTATE INTELLIGENCE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-black leading-tight"
        >

          Smart House Price
          <br />
          Analytics Platform

        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-zinc-200 max-w-xl text-xl leading-relaxed"
        >

          Analyze housing market trends,
          predict property prices, and discover
          AI-powered investment opportunities.

        </motion.p>

        <motion.button

          whileHover={{
            scale: 1.05
          }}

          whileTap={{
            scale: 0.97
          }}

          className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-semibold shadow-xl transition duration-300"
        >

          Explore Analytics

        </motion.button>

      </div>

      {/* Right Card */}
      <motion.div

        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}

        className="bg-white/10 backdrop-blur-2xl border border-white/20 p-7 rounded-3xl w-80 relative z-10 shadow-2xl"

      >

        <div className="flex items-center gap-4 mb-7">

          <div className="bg-green-400 p-4 rounded-2xl shadow-lg">

            <TrendingUp
              className="text-black"
              size={30}
            />

          </div>

          <div>

            <p className="text-blue-100 text-sm">
              Market Growth
            </p>

            <h1 className="text-5xl font-black">
              +24%
            </h1>

          </div>

        </div>

        <div className="space-y-5 text-lg">

          <div className="flex justify-between">

            <span className="text-zinc-300">
              AI Accuracy
            </span>

            <span className="font-bold text-cyan-300">
              98%
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-zinc-300">
              Properties Analyzed
            </span>

            <span className="font-bold text-cyan-300">
              12.4K
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-zinc-300">
              Predictions Generated
            </span>

            <span className="font-bold text-cyan-300">
              1.2K
            </span>

          </div>

        </div>

      </motion.div>

    </motion.div>

  )
}