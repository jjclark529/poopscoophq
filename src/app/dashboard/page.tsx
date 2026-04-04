export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Welcome to PoopScoop HQ — your poop scoop business command center.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Active Clients</h3>
            <span className="text-emerald-400 text-2xl">💩</span>
          </div>
          <p className="text-3xl font-bold text-white">20</p>
          <p className="text-gray-500 text-sm mt-1">Demo data</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Routes This Week</h3>
            <span className="text-blue-400 text-2xl">🗺️</span>
          </div>
          <p className="text-3xl font-bold text-white">5</p>
          <p className="text-gray-500 text-sm mt-1">Mon-Fri active</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Route Efficiency</h3>
            <span className="text-yellow-400 text-2xl">⚡</span>
          </div>
          <p className="text-3xl font-bold text-white">—</p>
          <p className="text-gray-500 text-sm mt-1">Optimize routes to see</p>
        </div>
      </div>
    </div>
  );
}
