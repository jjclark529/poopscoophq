'use client'

import { Users, CreditCard, DollarSign, TrendingUp, Activity } from 'lucide-react'

const stats = {
  totalCustomers: 28,
  activeSubscriptions: 24,
  mrr: 719.76,
  arr: 8637.12,
  churnRate: 4.1,
  trials: 6,
}

const recentEvents = [
  { message: 'Payment received from Yard Patrol Pro', amount: '$29.99/mo', time: '1 hour ago' },
  { message: 'New subscriber: Scoop Squad Tucson', amount: '$29.99/mo', time: '4 hours ago' },
  { message: 'Trial started: Dog Gone Clean', amount: 'Trial', time: '1 day ago' },
  { message: 'Payment failed: AZ Yard Rescue', amount: '$29.99/mo', time: '2 days ago' },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">PoopScoop Quote subscription management & revenue overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <Users size={20} className="text-blue-500 mb-2" />
          <p className="text-3xl font-bold">{stats.totalCustomers}</p>
          <p className="text-xs text-gray-500">Total Customers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <CreditCard size={20} className="text-green-500 mb-2" />
          <p className="text-3xl font-bold">{stats.activeSubscriptions}</p>
          <p className="text-xs text-gray-500">Active Subscriptions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <DollarSign size={20} className="text-emerald-600 mb-2" />
          <p className="text-3xl font-bold">${stats.mrr.toFixed(2)}</p>
          <p className="text-xs text-gray-500">MRR @ $29.99/mo</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <TrendingUp size={20} className="text-purple-500 mb-2" />
          <p className="text-3xl font-bold">${stats.arr.toFixed(2)}</p>
          <p className="text-xs text-gray-500">Annual Run Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-lg font-bold text-red-500">{stats.churnRate}%</p>
          <p className="text-xs text-gray-500">Churn Rate</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-lg font-bold text-blue-600">{stats.trials}</p>
          <p className="text-xs text-gray-500">Active Trials</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-lg font-bold text-green-600">24</p>
          <p className="text-xs text-gray-500">Successful Payments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-green-600" /> Revenue Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-green-700">$719.76</p>
              <p className="text-xs text-green-600">Current MRR</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-blue-700">$2,159.28</p>
              <p className="text-xs text-blue-600">Last 90 Days</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-purple-700">$8,637.12</p>
              <p className="text-xs text-purple-600">Projected Annual</p>
            </div>
          </div>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center text-sm text-gray-400">
            Flat-rate subscription revenue chart placeholder
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-500" /> Recent Activity</h2>
          <div className="space-y-3">
            {recentEvents.map((event, i) => (
              <div key={i} className="flex items-start justify-between gap-4 p-2 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="text-sm text-gray-900">{event.message}</p>
                  <p className="text-xs text-gray-400">{event.time}</p>
                </div>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{event.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
