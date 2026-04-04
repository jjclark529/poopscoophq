"use client";

const assets = [
  { id: 1, name: "spring-promo-banner.jpg", size: "245 KB", dimensions: "1200x628", date: "Mar 20, 2026", type: "image" },
  { id: 2, name: "testimonial-video-1.mp4", size: "12.4 MB", dimensions: "1080x1920", date: "Mar 18, 2026", type: "video" },
  { id: 3, name: "logo-primary.png", size: "89 KB", dimensions: "500x500", date: "Mar 15, 2026", type: "image" },
  { id: 4, name: "service-showcase.jpg", size: "312 KB", dimensions: "1080x1080", date: "Mar 14, 2026", type: "image" },
  { id: 5, name: "before-after-yard.jpg", size: "198 KB", dimensions: "1200x628", date: "Mar 12, 2026", type: "image" },
  { id: 6, name: "team-intro-reel.mp4", size: "8.7 MB", dimensions: "1080x1920", date: "Mar 10, 2026", type: "video" },
  { id: 7, name: "door-hanger-design.png", size: "156 KB", dimensions: "1050x2100", date: "Mar 8, 2026", type: "image" },
  { id: 8, name: "review-request-card.jpg", size: "92 KB", dimensions: "800x400", date: "Mar 5, 2026", type: "image" },
  { id: 9, name: "yard-sign-mockup.png", size: "410 KB", dimensions: "1200x900", date: "Mar 3, 2026", type: "image" },
];

export default function CreativePage() {
  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Creative Assets</h1>
        <p className="text-gray-500 text-sm">Manage your ad images, videos, and creative materials</p>
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 mb-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-white">
        <svg className="w-10 h-10 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <p className="text-gray-600 font-medium">Drop files here or click to upload</p>
        <p className="text-gray-400 text-sm mt-1">PNG, JPG, MP4 up to 50MB</p>
      </div>

      {/* Asset grid — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail placeholder */}
            <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center border-b border-gray-100">
              {asset.type === "video" ? (
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>

            {/* File info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">{asset.name}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{asset.size}</span>
                <span>•</span>
                <span>{asset.dimensions}</span>
                <span className="ml-auto">{asset.date}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button className="ml-auto p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
