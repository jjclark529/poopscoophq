'use client'

import { useState } from 'react'
import { DollarSign, Download, Search, CreditCard, RefreshCw, CheckCircle, XCircle, Clock, X } from 'lucide-react'

type Transaction = {
  id: string
  customer: string
  company: string
  amount: number
  status: 'succeeded' | 'pending' | 'failed' | 'refunded'
  method: 'stripe' | 'paypal'
  plan: string
  date: string
  invoiceId: string
}

const initialTransactions: Transaction[] = [
  { id: 'txn_001', customer: 'Jackie', company: 'Doctor Doo', amount: 29.99, status: 'succeeded', method: 'stripe', plan: '$29.99/month', date: 'Apr 10, 2026', invoiceId: 'INV-2026-0410' },
  { id: 'txn_002', customer: 'Jackie', company: 'Doctor Doo', amount: 29.99, status: 'succeeded', method: 'stripe', plan: '$29.99/month', date: 'Mar 10, 2026', invoiceId: 'INV-2026-0310' },
]

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  succeeded: { label: 'Paid', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', icon: Clock },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: XCircle },
  refunded: { label: 'Refunded', color: 'bg-gray-100 text-gray-600', icon: RefreshCw },
}

export default function BillingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [toast, setToast] = useState<string | null>(null)
  const [viewTxn, setViewTxn] = useState<Transaction | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = transactions.filter(t => {
    const matchesSearch = !searchQuery || t.customer.toLowerCase().includes(searchQuery.toLowerCase()) || t.company.toLowerCase().includes(searchQuery.toLowerCase()) || t.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    const matchesMethod = methodFilter === 'all' || t.method === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalRevenue = transactions.filter(t => t.status === 'succeeded').reduce((s, t) => s + t.amount, 0)
  const failedAmount = transactions.filter(t => t.status === 'failed').reduce((s, t) => s + t.amount, 0)
  const refundedAmount = transactions.filter(t => t.status === 'refunded').reduce((s, t) => s + t.amount, 0)

  const exportCsv = () => {
    const header = 'Invoice,Customer,Company,Plan,Amount,Method,Status,Date'
    const rows = filtered.map(t => `${t.invoiceId},${t.customer},${t.company},${t.plan},$${t.amount},${t.method},${t.status},${t.date}`)
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast('✅ CSV exported')
  }

  const refundTxn = (txnId: string) => {
    setTransactions(prev => prev.map(t => t.id === txnId ? { ...t, status: 'refunded' as const } : t))
    showToast('💰 Refund processed')
  }

  return (
    <div className="p-4 sm:p-6 w-full">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 shadow-lg rounded-xl px-5 py-3 text-sm font-medium">
          {toast}
        </div>
      )}

      {/* View Modal */}
      {viewTxn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Transaction Details</h2>
              <button onClick={() => setViewTxn(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Invoice</span><span className="font-mono">{viewTxn.invoiceId}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Customer</span><span className="font-medium">{viewTxn.customer}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Company</span><span>{viewTxn.company}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Plan</span><span>{viewTxn.plan}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-bold">${viewTxn.amount}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Method</span><span>{viewTxn.method === 'stripe' ? '💳 Stripe' : '🅿️ PayPal'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusConfig[viewTxn.status].color}`}>{statusConfig[viewTxn.status].label}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date</span><span>{viewTxn.date}</span></div>
            </div>
            <button onClick={() => setViewTxn(null)} className="w-full mt-5 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><DollarSign className="text-green-500" /> Billing & Transactions</h1>
          <p className="text-gray-500">View all payment transactions, invoices, and revenue</p>
        </div>
        <button onClick={exportCsv} className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap cursor-pointer"><Download size={16} /> Export CSV</button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Collected</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          <p className="text-xs text-gray-500">Total Transactions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-500">${failedAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Failed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-500">${refundedAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Refunded</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search transactions..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
          <option value="all">All Statuses</option>
          <option value="succeeded">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
        <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
          <option value="all">All Methods</option>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Invoice</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Plan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-gray-400">No transactions found</td></tr>
              )}
              {filtered.map((txn) => {
                const sc = statusConfig[txn.status]
                const StatusIcon = sc.icon
                return (
                  <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs text-gray-500">{txn.invoiceId}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium">{txn.customer}</p>
                      <p className="text-xs text-gray-400">{txn.company}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{txn.plan}</td>
                    <td className="py-3 px-4 font-bold">${txn.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded ${txn.method === 'stripe' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                        {txn.method === 'stripe' ? '💳 Stripe' : '🅿️ PayPal'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${sc.color}`}>
                        <StatusIcon size={12} /> {sc.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{txn.date}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {txn.status === 'succeeded' && <button onClick={() => refundTxn(txn.id)} className="text-xs text-gray-500 hover:underline cursor-pointer">Refund</button>}
                        <button onClick={() => setViewTxn(txn)} className="text-xs text-gray-500 hover:underline cursor-pointer">View</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
