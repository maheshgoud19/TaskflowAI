import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Layout, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">TaskFlow AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Log in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-100 dark:border-indigo-800">
            <Zap className="w-4 h-4" />
            <span>Supercharge your productivity</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Manage work efficiently.<br />Powered by AI.
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            TaskFlow AI is the modern workspace where teams can organize, prioritize, and track their tasks seamlessly across all devices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 w-full max-w-5xl z-10 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-slate-950 to-transparent z-10 top-1/2" />
          <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl">
            <div className="rounded-lg border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
              {/* Mock Dashboard UI */}
              <div className="h-12 border-b border-gray-100 dark:border-slate-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-8 flex gap-8 opacity-80 pointer-events-none">
                <div className="w-64 hidden md:flex flex-col gap-4">
                  <div className="h-8 bg-gray-100 dark:bg-slate-800 rounded w-full" />
                  <div className="h-8 bg-gray-100 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-8 bg-gray-100 dark:bg-slate-800 rounded w-5/6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-8">
                    <div className="h-10 bg-gray-100 dark:bg-slate-800 rounded w-48" />
                    <div className="h-10 bg-indigo-600/20 rounded w-32" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-64 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg p-4 flex flex-col gap-4">
                        <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-1/3" />
                        <div className="h-20 bg-white dark:bg-slate-950 shadow-sm border border-gray-100 dark:border-slate-800 rounded p-3 flex flex-col gap-2">
                          <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Landing;
