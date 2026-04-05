"use client";
import { useState } from "react";
const YS=["1-1,000","1,001-2,000","2,001-3,000","3,001-4,000","4,001-5,000","5,001-6,000","6,001-7,000","7,001-8,000","8,001-9,000","9,001-10,000","10,001+"];
const YB:Record<string,number>={"1-1,000":35,"1,001-2,000":40,"2,001-3,000":45,"3,001-4,000":50,"4,001-5,000":55,"5,001-6,000":60,"6,001-7,000":65,"7,001-8,000":70,"8,001-9,000":75,"9,001-10,000":80,"10,001+":90};
const DF:Record<string,number>={"1":1,"2":1.15,"3":1.3,"4+":1.5};
const FF:Record<string,number>={"Weekly":1,"Bi-Weekly":1.15,"Twice a Week":0.9,"Once a Month":1.3,"One-Time":1.5};
const FV:Record<string,number>={"Weekly":52,"Bi-Weekly":26,"Twice a Week":104,"Once a Month":12,"One-Time":0};
function cp(t:string,y:string,d:string,f:string){return Math.round((t==="premium"?(YB[y]||35)*1.35:(YB[y]||35))*DF[d]*FF[f]*100)/100;}
function cm(pv:number,f:string){const v=FV[f];return v?Math.round(pv*v/12*100)/100:pv;}
const MQ=[{id:"Q-001",name:"Sarah Mitchell",phone:"(520) 555-0142",price:56.25,desc:"Weekly Cleanup",status:"Sent",date:"Mar 25, 2026"},{id:"Q-002",name:"David Chen",phone:"(520) 555-0458",price:340,desc:"Weekly Cleanup, Initial Deep Clean",status:"Draft",date:"Mar 26, 2026"},{id:"Q-003",name:"Jennifer Lawson",phone:"(520) 555-0391",price:43.75,desc:"Biweekly Cleanup",status:"Accepted",date:"Mar 22, 2026"}];
export default function QuoteBuilderPage(){
const[view,sv]=useState<"q"|"n">("q");
const[modal,sm]=useState(false);
const[stab,sst]=useState<"u"|"m"|"a">("u");
const[mt,smt]=useState("basic");
const[ey,sey]=useState<string|null>("1-1,000");
const[cn,scn]=useState("");const[cp2,scp]=useState("");const[ce,sce]=useState("");
const[tier,st]=useState("basic");const[yard,sy]=useState("1-1,000");const[dogs,sd]=useState("1");const[freq,sf]=useState("Weekly");
const[qa,sqa]=useState<"v"|"m">("v");
const[ic,sic]=useState(true);const[icf,sicf]=useState(59.99);const[icd,sicd]=useState("2026-04-08");
const[rd,srd]=useState("2026-04-15");const[disc,sdisc]=useState(0);
const[ao,sao]=useState<string[]>([]);const[notes,snotes]=useState("");
const pv=cp(tier,yard,dogs,freq);const mo=cm(pv,freq);
const sd2=parseInt(rd.split("-")[2]||"1");const np=sd2>7&&freq!=="One-Time";
const dim=new Date(parseInt(rd.split("-")[0]||"2026"),parseInt(rd.split("-")[1]||"4"),0).getDate();
const dr=dim-sd2+1;const pa=Math.round(mo*(dr/dim)*100)/100;
const aot=ao.reduce((s,a)=>s+(a==="d"?40:30),0);
const dp=qa==="v"?pv:mo;const sub=dp+(ic?icf:0)+aot;
const da=Math.round(sub*disc/100*100)/100;const tot=Math.round((sub-da)*100)/100;
return(<div className="p-6 max-w-7xl mx-auto">
<div className="flex items-center justify-between mb-6">
<div><h1 className="text-2xl font-bold text-gray-900">📋 Quote Builder</h1>
<p className="text-gray-500 text-sm">Create, send, and track quotes for new and existing customers</p></div>
<div className="flex gap-2">
<button onClick={()=>sm(true)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">⚙ Pricing Settings</button>
<button onClick={()=>sv("q")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${view==="q"?"bg-blue-600 text-white":"text-gray-600 hover:bg-gray-100"}`}>Quotes</button>
<button onClick={()=>sv("n")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${view==="n"?"bg-blue-600 text-white":"text-gray-600 hover:bg-gray-100"}`}>New Quote</button>
</div></div>
{view==="q"?(<>
<div className="grid grid-cols-4 gap-4 mb-6">{[{l:"Total Quotes",v:"3",c:"text-gray-900"},{l:"Awaiting Response",v:"1",c:"text-blue-600"},{l:"Accepted",v:"1",c:"text-emerald-600"},{l:"Close Rate",v:"50%",c:"text-emerald-600"}].map(s=>(<div key={s.l} className="bg-white p-5 rounded-xl border border-gray-200"><p className="text-sm text-gray-500">{s.l}</p><p className={`text-3xl font-bold mt-1 ${s.c}`}>{s.v}</p></div>))}</div>
<div className="space-y-3">{MQ.map(q=>(<div key={q.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
<div className="flex items-center gap-4"><span className="text-sm font-bold text-gray-400">{q.id}</span><div><p className="font-semibold text-gray-900">{q.name}</p><p className="text-xs text-gray-400">{q.phone}</p></div></div>
<div className="flex items-center gap-6"><span className="font-bold text-gray-900">${q.price.toFixed(2)}<span className="text-xs text-gray-400 font-normal">/visit</span></span><span className="text-xs text-gray-500">{q.desc}</span>
<span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${q.status==="Sent"?"bg-blue-50 text-blue-700":q.status==="Accepted"?"bg-emerald-50 text-emerald-700":"bg-gray-100 text-gray-600"}`}>{q.status}</span>
<span className="text-xs text-gray-400">{q.date}</span></div></div>))}</div>
</>):(<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="lg:col-span-2 space-y-5">
<div className="bg-white rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
<div className="grid grid-cols-3 gap-3"><input value={cn} onChange={e=>scn(e.target.value)} placeholder="John Doe" className="px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
<input value={cp2} onChange={e=>scp(e.target.value)} placeholder="(520) 555-0000" className="px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
<input value={ce} onChange={e=>sce(e.target.value)} placeholder="john@email.com" className="px-3 py-2 border border-gray-300 rounded-lg text-sm"/></div></div>
<div className="bg-white rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-gray-900 mb-3">Service & Pricing</h3>
<div className="flex gap-2 mb-4"><button onClick={()=>st("basic")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tier==="basic"?"bg-blue-600 text-white":"border border-gray-300 text-gray-600"}`}>Basic</button>
<button onClick={()=>st("premium")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tier==="premium"?"bg-purple-600 text-white":"border border-gray-300 text-gray-600"}`}>Premium</button></div>
<div className="grid grid-cols-3 gap-3 mb-4">
<div><label className="text-xs text-gray-500 mb-1 block">Yard Size (sqft)</label><select value={yard} onChange={e=>sy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">{YS.map(y=><option key={y} value={y}>{y} sqft</option>)}</select></div>
<div><label className="text-xs text-gray-500 mb-1 block">Number of Dogs</label><select value={dogs} onChange={e=>sd(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">{["1","2","3","4+"].map(d=><option key={d} value={d}>{d} dog{d!=="1"?"s":""}</option>)}</select></div>
<div><label className="text-xs text-gray-500 mb-1 block">Frequency</label><select value={freq} onChange={e=>sf(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">{Object.keys(FF).map(f=><option key={f}>{f}</option>)}</select></div></div>
<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4"><p className="text-xs text-emerald-700">{freq} • {yard} sqft • {dogs} Dog{dogs!=="1"?"s":""} • {tier==="premium"?"Premium":"Basic"} Tier</p>
<p className="text-2xl font-bold text-emerald-800 mt-1">${pv.toFixed(2)}<span className="text-sm font-normal">/visit</span></p></div>
<div className="flex items-center gap-2 mb-4"><span className="text-sm text-gray-600">Quote as:</span>
<button onClick={()=>sqa("v")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${qa==="v"?"bg-blue-600 text-white":"border border-gray-300 text-gray-600"}`}>Per Visit</button>
<button onClick={()=>sqa("m")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${qa==="m"?"bg-blue-600 text-white":"border border-gray-300 text-gray-600"}`}>Per Month</button></div>
{qa==="m"&&freq!=="One-Time"&&<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800"><p className="font-semibold">${mo.toFixed(2)}/month</p><p className="text-xs mt-1">({dogs} dog{dogs!=="1"?"s":""} × ${pv.toFixed(2)}/visit × {FV[freq]} visits/yr ÷ 12 mo)</p></div>}
</div>
<div className="bg-white rounded-xl border border-gray-200 p-5"><label className="flex items-center gap-2 mb-3 cursor-pointer"><input type="checkbox" checked={ic} onChange={e=>sic(e.target.checked)} className="rounded"/><span className="text-sm font-semibold text-gray-900">Include Initial Cleanup</span></label>
{ic&&<div className="grid grid-cols-2 gap-3"><div><label className="text-xs text-gray-500 mb-1 block">Fee</label><div className="flex"><span className="px-2 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm">$</span><input type="number" value={icf} onChange={e=>sicf(Number(e.target.value))} className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-sm"/></div></div>
<div><label className="text-xs text-gray-500 mb-1 block">Date</label><input type="date" value={icd} onChange={e=>sicd(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/></div></div>}</div>
{freq!=="One-Time"&&<div className="bg-white rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-gray-900 mb-3">Recurring Start Date</h3>
<input type="date" value={rd} onChange={e=>srd(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3"/>
{np&&<div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm"><p className="font-semibold text-amber-800">⚡ Pro-rated first month: ${pa.toFixed(2)}</p><p className="text-xs text-amber-700 mt-1">Start date is after the first week — first month will be pro-rated. Full monthly rate of ${mo.toFixed(2)} starts the following month.</p></div>}</div>}
<div className="bg-white rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-gray-900 mb-3">Add-On Services</h3>
<div className="grid grid-cols-2 gap-3">{[{k:"d",n:"Deodorizing Treatment",p:40,desc:"Enzyme-based yard deodorizer"},{k:"b",n:"Brown Spot Treatment",p:30,desc:"Lawn repair for pet damage"}].map(a=>(
<button key={a.k} onClick={()=>sao(p=>p.includes(a.k)?p.filter(x=>x!==a.k):[...p,a.k])} className={`text-left p-3 rounded-lg border text-sm ${ao.includes(a.k)?"border-blue-300 bg-blue-50":"border-gray-200 hover:border-gray-300"}`}><p className="font-semibold">{a.n} — ${a.p}</p><p className="text-xs text-gray-500">{a.desc}</p></button>))}</div></div>
<div className="bg-white rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
<textarea value={notes} onChange={e=>snotes(e.target.value)} placeholder="Special instructions, gate codes, dog info..." rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/></div>
</div>
<div><div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-6">
<h3 className="font-semibold text-gray-900 mb-4">📋 Quote Summary</h3>
<div className="space-y-2 text-sm mb-4">
{ic&&<div className="flex justify-between"><span className="text-gray-600">Initial Cleanup</span><span className="font-semibold">${icf.toFixed(2)}</span></div>}
<div className="flex justify-between"><span className="text-gray-600">{freq} Cleanup ({tier})</span><span className="font-semibold">${dp.toFixed(2)}{qa==="m"?"/mo":"/visit"}</span></div>
{ao.includes("d")&&<div className="flex justify-between"><span className="text-gray-600">Deodorizing</span><span className="font-semibold">$40.00</span></div>}
{ao.includes("b")&&<div className="flex justify-between"><span className="text-gray-600">Brown Spot Treatment</span><span className="font-semibold">$30.00</span></div>}
<div className="border-t border-gray-100 pt-2 flex justify-between"><span>Subtotal</span><span className="font-semibold">${sub.toFixed(2)}</span></div>
<div className="flex items-center justify-between"><span>Discount</span><div className="flex items-center gap-1"><input type="number" value={disc} onChange={e=>sdisc(Number(e.target.value))} className="w-14 px-2 py-1 border border-gray-300 rounded text-xs text-center" min={0} max={100}/><span className="text-xs">%</span></div></div>
{disc>0&&<div className="flex justify-between text-red-500"><span>- Discount</span><span>-${da.toFixed(2)}</span></div>}
</div>
<div className="border-t border-gray-200 pt-3 mb-4">
<div className="flex justify-between"><span className="font-bold text-lg">Total</span><span className="font-bold text-emerald-700 text-lg">${tot.toFixed(2)}{qa==="m"?"/mo":"/visit"}</span></div>
<p className="text-xs text-gray-400 mt-1">{dogs} dog{dogs!=="1"?"s":""} • {freq}</p>
{ic&&<p className="text-xs text-gray-400">Initial clean: {icd}</p>}
{freq!=="One-Time"&&<p className="text-xs text-gray-400">Recurring starts: {rd}</p>}
{np&&qa==="m"&&<p className="text-xs text-emerald-600 mt-1">Following months: ${mo.toFixed(2)}/month</p>}
</div>
<div className="space-y-2">
<button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">✈ Send via Text (Quo)</button>
<button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">✈ Send via Email</button>
<button className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">↓ Download PDF</button>
<button className="w-full py-2 text-gray-500 text-sm hover:text-gray-700">Save as Draft</button>
</div></div></div></div>)}
{modal&&<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
<div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
<div className="p-5 border-b border-gray-200 flex justify-between"><h2 className="text-lg font-bold">⚙ Pricing Settings</h2><button onClick={()=>sm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button></div>
<div className="flex border-b border-gray-200">{([["u","Upload File"],["m","Manual Input"],["a","+ Add-Ons"]] as const).map(([k,l])=>(<button key={k} onClick={()=>sst(k)} className={`px-5 py-3 text-sm font-semibold border-b-2 ${stab===k?"border-blue-600 text-blue-600":"border-transparent text-gray-500"}`}>{l}</button>))}</div>
<div className="flex-1 overflow-y-auto p-5">
{stab==="u"?<div>
<div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mb-6 cursor-pointer hover:border-gray-400">
<p className="text-gray-600 font-medium">Upload Excel or CSV file</p><p className="text-gray-400 text-sm mt-1">Supports .xlsx, .xls, .csv</p>
<button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Choose File</button></div>
<div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800"><p className="font-semibold mb-1">Pricing Note</p><p>Weekly, Bi-Weekly, Twice a Week — enter <strong>per-visit</strong> price. Monthly calculated automatically.</p></div>
</div>:stab==="m"?<div>
<div className="flex gap-2 mb-4"><button onClick={()=>smt("basic")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${mt==="basic"?"bg-blue-600 text-white":"border border-gray-300"}`}>Basic</button>
<button onClick={()=>smt("premium")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${mt==="premium"?"bg-purple-600 text-white":"border border-gray-300"}`}>Premium</button></div>
<div className="space-y-2">{YS.map(ys=>{const o=ey===ys;const b=YB[ys]||35;const m=mt==="premium"?1.35:1;return(<div key={ys} className="border border-gray-200 rounded-lg">
<button onClick={()=>sey(o?null:ys)} className="w-full flex justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm font-semibold">{ys} sqft<span>{o?"▼":"▶"}</span></button>
{o&&<div className="p-4 overflow-x-auto"><table className="w-full text-xs"><thead><tr className="text-gray-500"><th className="text-left py-1 pr-3">Dogs</th><th className="text-center px-2">Weekly</th><th className="text-center px-2">Bi-Wk</th><th className="text-center px-2">2x/Wk</th><th className="text-center px-2">Monthly</th><th className="text-center px-2">One-Time</th></tr></thead>
<tbody>{["1","2","3","4+"].map(d=><tr key={d} className="border-t border-gray-100"><td className="py-2 pr-3 font-medium">{d} dog{d!=="1"?"s":""}</td>
{Object.values(FF).map((ff,i)=><td key={i} className="text-center px-2"><span className="bg-gray-50 border border-gray-200 rounded px-2 py-1">${Math.round(b*m*DF[d]*ff)}</span></td>)}</tr>)}</tbody></table></div>}
</div>);})}</div>
</div>:<div>
<p className="text-sm text-gray-600 mb-4">Manage add-on services available when building quotes.</p>
{[{n:"Deodorizing Treatment",p:"40",d:"Enzyme-based yard deodorizer"},{n:"Brown Spot Treatment",p:"30",d:"Lawn repair for pet damage"}].map((a,i)=>(
<div key={i} className="flex items-center gap-3 mb-3 p-3 border border-gray-200 rounded-lg">
<input defaultValue={a.n} className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"/>
<div className="flex items-center"><span className="text-sm mr-1">$</span><input defaultValue={a.p} className="w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-center"/></div>
<input defaultValue={a.d} className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"/>
<button className="text-red-400 hover:text-red-600">🗑</button></div>))}
<button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400">+ Add New Service</button>
</div>}
</div>
<div className="p-4 border-t border-gray-200 flex justify-between"><p className="text-xs text-gray-400">220 basic & 220 premium entries • 2 add-ons</p>
<div className="flex gap-2"><button onClick={()=>sm(false)} className="px-4 py-2 text-gray-600 text-sm">Cancel</button><button onClick={()=>sm(false)} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Save Pricing</button></div></div>
</div></div>}
</div>);}
