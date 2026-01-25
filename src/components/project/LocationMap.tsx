'use client';

interface LocationMapProps {
  address: string;
  projectName: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function LocationMap({ address, projectName, coordinates }: LocationMapProps) {
  // Construct Google Maps embed URL
  const mapQuery = coordinates 
    ? `${coordinates.lat},${coordinates.lng}`
    : encodeURIComponent(address);
  
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}&zoom=15`;
  
  // Directions URL for "Get Directions" button
  const directionsUrl = coordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-12 reveal-on-load">
      <h3 className="font-serif text-2xl font-bold text-primary mb-6">Vị Trí</h3>
      
      <div className="space-y-4">
        {/* Address Display */}
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <span className="text-2xl">📍</span>
          <div>
            <p className="font-semibold text-primary mb-1">{projectName}</p>
            <p className="text-slate-600">{address}</p>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-md">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Chỉ Đường
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-primary font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Xem Trên Maps
          </a>
        </div>
      </div>
    </div>
  );
}
