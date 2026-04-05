"use client";

import { useState } from "react";

export default function ConnectionsPage() {
  const [google, setGoogle] = useState({ connected: true, ga4: "387654321", gsc: "https://poopscoophq.com", gads: "123-456-7890" });
  const [gbp, setGbp] = useState({ url: "" });
  const [meta, setMeta] = useState({ connected: true, adAccount: "act_1234567890", pageId: "9876543210" });
  const [quo, setQuo] = useState({ key: "", sms: false });
  const [dialpad, setDialpad] = useState({ key: "", officeId: "", sms: false });
  const [ringcentral, setRingcentral] = useState({ clientId: "", clientSecret: "", jwt: "", sms: false });
  const [sweepandgo, setSweepandgo] = useState({ token: "", orgId: "" });
  const [hubspot, setHubspot] = useState({ inbound: "", outbound: "" });
  const [jobber, setJobber] = useState({ key: "", clientId: "" });
  const [pipeline, setPipeline] = useState({ key: "", appKey: "" });
  const [ghl, setGhl] = useState({ key: "", locationId: "" });
  const [drive, setDrive] = useState({ folderId: "", sheetId: "" });
  const [ai, setAi] = useState({ key: "sk-...", chat: "gpt-4o", images: "gpt-4o", analysis: "o4-mini", adBuilder: "gpt-4o" });

  const S = ({ connected, label }: { connected: boolean; label?: string }) => (
    <span className={`text-xs font-semibold flex items-center gap-1.5 ${connected ? "text-emerald-600" : "text-gray-400"}`}>
      {connected ? "✓" : "✕"} {label || (connected ? "Connected" : "Not Connected")}
    </span>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Connections & Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Connect your marketing platforms, CRM, and communication tools</p>
      </div>

      {/* Google */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <div><p className="font-semibold text-gray-900">Google</p><p className="text-xs text-gray-500">Google Ads, Analytics (GA4), Search Console</p></div>
          </div>
          <S connected={google.connected} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">GA4 Property ID</label><input value={google.ga4} onChange={e => setGoogle({...google, ga4: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Search Console URL</label><input value={google.gsc} onChange={e => setGoogle({...google, gsc: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Google Ads Customer ID</label><input value={google.gads} onChange={e => setGoogle({...google, gads: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div className="flex gap-2"><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">Reconnect</button><button onClick={() => setGoogle({...google, connected: false})} className="px-4 py-2 border border-emerald-500 text-emerald-600 rounded-lg text-xs font-semibold">Disconnect</button></div>
        </div>
      </div>

      {/* Google Business Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">📍</span><div><p className="font-semibold text-gray-900">Google Business Profile</p><p className="text-xs text-gray-500">Google Maps listing URL — powers the &quot;Live on Google&quot; button</p></div></div>
          <S connected={!!gbp.url} />
        </div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">Google Maps Listing URL</label><input value={gbp.url} onChange={e => setGbp({url: e.target.value})} placeholder="https://maps.google.com/?cid=... or https://goo.gl/maps/..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        <p className="text-[10px] text-gray-400 mt-1">Paste the URL to your Google Maps business listing. This powers the &quot;Live on Google&quot; button on the Google Profile page.</p>
        <button className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold">💾 Save & Connect</button>
      </div>

      {/* Meta */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">📘</span><div><p className="font-semibold text-gray-900">Meta (Facebook / Instagram)</p><p className="text-xs text-gray-500">Facebook Ads, Instagram Ads performance</p></div></div>
          <S connected={meta.connected} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Ad Account ID</label><input value={meta.adAccount} onChange={e => setMeta({...meta, adAccount: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Page ID</label><input value={meta.pageId} onChange={e => setMeta({...meta, pageId: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div className="flex gap-2"><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">Reconnect</button><button onClick={() => setMeta({...meta, connected: false})} className="px-4 py-2 border border-emerald-500 text-emerald-600 rounded-lg text-xs font-semibold">Disconnect</button></div>
        </div>
      </div>

      {/* Quo */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">📞</span><div><p className="font-semibold text-gray-900">Quo</p><p className="text-xs text-gray-500">Calls, texts, voicemails, recordings, transcriptions</p></div></div>
          <S connected={!!quo.key} />
        </div>
        <div><label className="text-xs font-semibold text-gray-700 block mb-1">Quo API Key</label><input value={quo.key} onChange={e => setQuo({...quo, key: e.target.value})} placeholder="Enter quo api key..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
        <button className="mt-2 w-full py-2 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50">💬 Use for In-App SMS</button>
      </div>

      {/* Dialpad */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">☎️</span><div><p className="font-semibold text-gray-900">Dialpad</p><p className="text-xs text-gray-500">Business phone, SMS messaging, call analytics</p></div></div>
          <S connected={!!dialpad.key} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Dialpad API Key</label><input value={dialpad.key} onChange={e => setDialpad({...dialpad, key: e.target.value})} placeholder="Enter dialpad api key..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Office ID</label><input value={dialpad.officeId} onChange={e => setDialpad({...dialpad, officeId: e.target.value})} placeholder="Enter office id..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
        <button className="mt-2 w-full py-2 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50">💬 Use for In-App SMS</button>
      </div>

      {/* RingCentral */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">📱</span><div><p className="font-semibold text-gray-900">RingCentral</p><p className="text-xs text-gray-500">Cloud phone, SMS, team messaging, video</p></div></div>
          <S connected={!!ringcentral.clientId} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">RingCentral Client ID</label><input value={ringcentral.clientId} onChange={e => setRingcentral({...ringcentral, clientId: e.target.value})} placeholder="Enter ringcentral client id..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">RingCentral Client Secret</label><input value={ringcentral.clientSecret} onChange={e => setRingcentral({...ringcentral, clientSecret: e.target.value})} placeholder="Enter ringcentral client secret..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">JWT Token</label><input value={ringcentral.jwt} onChange={e => setRingcentral({...ringcentral, jwt: e.target.value})} placeholder="Enter jwt token..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
        <button className="mt-2 w-full py-2 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50">💬 Use for In-App SMS</button>
      </div>

      {/* Sweep&Go */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">🧹</span><div><p className="font-semibold text-gray-900">Sweep&Go</p><p className="text-xs text-gray-500">Client data, subscriptions, jobs, payments</p></div></div>
          <S connected={!!sweepandgo.token} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Sweep&Go API Token</label><input value={sweepandgo.token} onChange={e => setSweepandgo({...sweepandgo, token: e.target.value})} placeholder="Enter sweep&go api token..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Organization ID</label><input value={sweepandgo.orgId} onChange={e => setSweepandgo({...sweepandgo, orgId: e.target.value})} placeholder="Enter organization id..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
      </div>

      {/* HubSpot */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">🔗</span><div><p className="font-semibold text-gray-900">HubSpot (via Make)</p><p className="text-xs text-gray-500">Customer contacts, deals, pipeline activity</p></div></div>
          <S connected={!!hubspot.inbound} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Make Webhook URL (Inbound)</label><input value={hubspot.inbound} onChange={e => setHubspot({...hubspot, inbound: e.target.value})} placeholder="Enter make webhook url (inbound)..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Make Webhook URL (Outbound)</label><input value={hubspot.outbound} onChange={e => setHubspot({...hubspot, outbound: e.target.value})} placeholder="Enter make webhook url (outbound)..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
      </div>

      {/* Jobber */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">🔧</span><div><p className="font-semibold text-gray-900">Jobber</p><p className="text-xs text-gray-500">Jobs, invoices, clients, quotes, scheduling</p></div></div>
          <S connected={!!jobber.key} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Jobber API Key</label><input value={jobber.key} onChange={e => setJobber({...jobber, key: e.target.value})} placeholder="Enter jobber api key..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Client ID</label><input value={jobber.clientId} onChange={e => setJobber({...jobber, clientId: e.target.value})} placeholder="Enter client id..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
      </div>

      {/* Pipeline CRM */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">📊</span><div><p className="font-semibold text-gray-900">Pipeline CRM</p><p className="text-xs text-gray-500">Deals, contacts, pipeline stages, activities</p></div></div>
          <S connected={!!pipeline.key} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Pipeline API Key</label><input value={pipeline.key} onChange={e => setPipeline({...pipeline, key: e.target.value})} placeholder="Enter pipeline api key..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">App Key</label><input value={pipeline.appKey} onChange={e => setPipeline({...pipeline, appKey: e.target.value})} placeholder="Enter app key..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
      </div>

      {/* GoHighLevel */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">🚀</span><div><p className="font-semibold text-gray-900">GoHighLevel</p><p className="text-xs text-gray-500">Contacts, opportunities, campaigns, conversations</p></div></div>
          <S connected={!!ghl.key} />
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">GoHighLevel API Key</label><input value={ghl.key} onChange={e => setGhl({...ghl, key: e.target.value})} placeholder="Enter gohighlevel api key..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Location ID</label><input value={ghl.locationId} onChange={e => setGhl({...ghl, locationId: e.target.value})} placeholder="Enter location id..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">⚡ Connect</button>
      </div>

      {/* Google Drive + Sheets Sync */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><span className="text-2xl">📁</span><div><p className="font-semibold text-gray-900">Google Drive + Sheets Sync</p></div></div>
          <span className="text-xs font-semibold text-emerald-600">Ready</span>
        </div>
        <div className="space-y-3">
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Drive Folder ID</label><input value={drive.folderId} onChange={e => setDrive({...drive, folderId: e.target.value})} placeholder="Enter Google Drive Folder ID" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
          <div><label className="text-xs font-semibold text-gray-700 block mb-1">Google Sheet ID</label><input value={drive.sheetId} onChange={e => setDrive({...drive, sheetId: e.target.value})} placeholder="Enter Google Sheet ID" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold">💾 Save Drive Sync Settings</button>
      </div>

      {/* What gets connected summary */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">What gets connected</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          {[
            { icon: "📊", name: "Google Analytics (GA4)", desc: "Website traffic, conversions, user behavior" },
            { icon: "🔍", name: "Search Console", desc: "Search rankings, clicks, impressions" },
            { icon: "💰", name: "Google Ads", desc: "Campaign performance, spend, conversions" },
            { icon: "📘", name: "Facebook Ads", desc: "Ad performance, reach, engagement" },
            { icon: "📸", name: "Instagram Ads", desc: "Story ads, feed ads, reels performance" },
            { icon: "📞", name: "Quo", desc: "Calls, texts, voicemails, transcriptions" },
            { icon: "☎️", name: "Dialpad", desc: "Business phone, SMS, call analytics" },
            { icon: "📱", name: "RingCentral", desc: "Cloud phone, SMS, team messaging" },
            { icon: "🧹", name: "Sweep&Go", desc: "Clients, subscriptions, jobs, payments" },
            { icon: "🔗", name: "HubSpot", desc: "Contacts, deals, pipeline via Make" },
            { icon: "🔧", name: "Jobber", desc: "Jobs, invoices, clients, quotes" },
            { icon: "📊", name: "Pipeline CRM", desc: "Deals, contacts, pipeline stages" },
            { icon: "🚀", name: "GoHighLevel", desc: "Contacts, opportunities, campaigns" },
          ].map(c => (
            <div key={c.name} className="flex items-center gap-2">
              <span>{c.icon}</span>
              <span><strong>{c.name}</strong> — {c.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🤖</span>
          <h3 className="font-semibold text-gray-900">AI Configuration</h3>
        </div>
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-700 block mb-1">OpenAI API Key</label>
          <div className="flex gap-2">
            <input value={ai.key} onChange={e => setAi({...ai, key: e.target.value})} placeholder="sk-..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 px-3">✓ Key Configured</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">☉ Your API key is stored securely and never shared with other accounts.</p>
        </div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Per-Workflow Models</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Chat Model", key: "chat" as const },
            { label: "Images Model", key: "images" as const },
            { label: "Analysis Model", key: "analysis" as const },
            { label: "Ad Builder Model", key: "adBuilder" as const },
          ].map(m => (
            <div key={m.key}>
              <label className="text-xs text-gray-500 block mb-1">{m.label}</label>
              <select value={ai[m.key]} onChange={e => setAi({...ai, [m.key]: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option>gpt-4o</option>
                <option>gpt-4o-mini</option>
                <option>o4-mini</option>
                <option>gpt-3.5-turbo</option>
              </select>
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold">💾 Save AI Settings</button>
      </div>
    </div>
  );
}
