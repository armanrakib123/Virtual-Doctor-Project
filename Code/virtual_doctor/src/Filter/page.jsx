import React, { useMemo, useState } from 'react';


const MOCK_DOCTORS = [
  {
    id: 1,
    name: 'Dr. Tanzina Ahmed',
    gender: 'female',
    specialties: ['Gynae & Obs', 'General Physician'],
    workingIn: 'Dhaka Medical College And Hospital',
    experience: 7,
    rating: 5,
    reviews: 923,
    price: 320,
    onlineNow: false,
    availableNext2: false,
    availableToday: true,
    avatar: 'https://i.pravatar.cc/80?img=12'
  },
  {
    id: 2,
    name: 'Asst. Prof. Dr. Mehedi Hasan',
    gender: 'male',
    specialties: ['Pediatric Hematologist', 'Oncologist', 'General Physician'],
    workingIn: 'Satkhira Medical College Hospital',
    experience: 13,
    rating: 4.9,
    reviews: 381,
    price: 600,
    onlineNow: true,
    availableNext2: true,
    availableToday: true,
    avatar: 'https://i.pravatar.cc/80?img=3'
  },
  {
    id: 3,
    name: 'Dr. Mamunur Rashid',
    gender: 'male',
    specialties: ['Orthopedist', 'General Physician'],
    workingIn: 'Kurmitola General Hospital, Dhaka Cantonment',
    experience: 15,
    rating: 5,
    reviews: 203,
    price: 499,
    onlineNow: false,
    availableNext2: false,
    availableToday: false,
    avatar: 'https://i.pravatar.cc/80?img=5'
  },
  {
    id: 4,
    name: 'Dr. Raihan Ahmad',
    gender: 'male',
    specialties: ['Medicine Specialist', 'Neurology'],
    workingIn: 'Special Clinic, Dhaka',
    experience: 12,
    rating: 5,
    reviews: 667,
    price: 840,
    onlineNow: true,
    availableNext2: false,
    availableToday: true,
    avatar: 'https://i.pravatar.cc/80?img=7'
  }
];

const DEFAULT_FILTERS = {
  priceMin: 0,
  priceMax: 1000,
  onlineNow: false,
  availableNext2: false,
  availableToday: false,
  femaleOnly: false,
  ratingMin: 0,
  search: '',
  sortBy: 'relevance'
};

export default function DoctorDirectory() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // compute filtered list
  const filtered = useMemo(() => {
    const low = Number(filters.priceMin) || 0;
    const high = Number(filters.priceMax) || 100000;
    return MOCK_DOCTORS.filter(d => {
      if (d.price < low || d.price > high) return false;
      if (filters.onlineNow && !d.onlineNow) return false;
      if (filters.availableNext2 && !d.availableNext2) return false;
      if (filters.availableToday && !d.availableToday) return false;
      if (filters.femaleOnly && d.gender !== 'female') return false;
      if (d.rating < filters.ratingMin) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const inName = d.name.toLowerCase().includes(q);
        const inSpec = d.specialties.join(' ').toLowerCase().includes(q);
        const inWork = d.workingIn.toLowerCase().includes(q);
        if (!inName && !inSpec && !inWork) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low-high': return a.price - b.price;
        case 'price-high-low': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'experience': return b.experience - a.experience;
        case 'popularity': return b.reviews - a.reviews;
        case 'relevance':
        default: return b.rating - a.rating || b.reviews - a.reviews;
      }
    });
  }, [filters]);

  function update(k, v) {
    setFilters(prev => ({ ...prev, [k]: v }));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3 bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button className="text-sm text-blue-600" onClick={() => setFilters(DEFAULT_FILTERS)}>Reset</button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Consultation Fee (৳)</label>
            <div className="flex items-center gap-2 mt-2">
              <input type="number" className="w-1/2 p-2 border rounded" value={filters.priceMin} onChange={(e) => update('priceMin', e.target.value)} />
              <input type="number" className="w-1/2 p-2 border rounded" value={filters.priceMax} onChange={(e) => update('priceMax', e.target.value)} />
            </div>
            <div className="text-xs text-gray-500 mt-2">Tip: set a max price to narrow results fast</div>
          </div>

          <div className="space-y-2 mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={filters.onlineNow} onChange={(e) => update('onlineNow', e.target.checked)} />
              <span>Online Now</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={filters.availableNext2} onChange={(e) => update('availableNext2', e.target.checked)} />
              <span>Available in next 2 hours</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={filters.availableToday} onChange={(e) => update('availableToday', e.target.checked)} />
              <span>Available today</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={filters.femaleOnly} onChange={(e) => update('femaleOnly', e.target.checked)} />
              <span>Female doctors only</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Select Rating</label>
            <div className="flex items-center gap-2 mt-2">
              {[0,1,2,3,4,5].map(r => (
                <button key={r} onClick={() => update('ratingMin', r)} className={`p-1 rounded ${filters.ratingMin===r? 'bg-blue-50 border border-blue-200' : ''}`}>
                  {r}★+
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Sort By</label>
            <div className="mt-2 space-y-1 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="sort" checked={filters.sortBy==='relevance'} onChange={() => update('sortBy','relevance')} /> Relevance (Default)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="sort" checked={filters.sortBy==='popularity'} onChange={() => update('sortBy','popularity')} /> Popularity
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="sort" checked={filters.sortBy==='price-low-high'} onChange={() => update('sortBy','price-low-high')} /> Fees: low to high
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="sort" checked={filters.sortBy==='price-high-low'} onChange={() => update('sortBy','price-high-low')} /> Fees: high to low
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="sort" checked={filters.sortBy==='rating'} onChange={() => update('sortBy','rating')} /> Rating
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="sort" checked={filters.sortBy==='experience'} onChange={() => update('sortBy','experience')} /> Experience
              </label>
            </div>
          </div>
        </aside>

        {/* Results area */}
        <main className="col-span-12 lg:col-span-9">
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">{filtered.length} Doctors found in General Physician department</div>
            </div>
            <div className="flex items-center gap-3">
              <input type="search" placeholder="Search by name, specialty or hospital" value={filters.search} onChange={(e)=> update('search', e.target.value)} className="p-2 border rounded w-72" />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map(doc => (
              <article key={doc.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-start gap-4">
                  <img src={doc.avatar} alt={doc.name} className="w-20 h-20 rounded-lg object-cover border" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{doc.name}</h4>
                      <span className="text-xs text-gray-400">•</span>
                      <div className="text-xs text-gray-500">{doc.specialties.join(', ')}</div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">Working in <strong className="text-gray-700">{doc.workingIn}</strong></div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div>{doc.experience}+ Years</div>
                      <div className="flex items-center gap-1">{Array.from({length: Math.round(doc.rating)}).map((_,i)=> <svg key={i} width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.595 0 9.748l8.332-1.73z"/></svg>)}</div>
                      <div className="text-xs text-gray-400">({doc.reviews})</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">৳ {doc.price}</div>
                  <div className="text-xs text-gray-400">Per consultation (incl. VAT)</div>
                  <div className="mt-3">
                    <button className="px-4 py-2 border rounded hover:bg-gray-50">View profile →</button>
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="bg-white rounded p-6 text-center text-gray-600">No doctors match your filters — try changing price or availability.</div>
            )}
          </div>

        </main>
      </div>

      {/* JSON preview area */}
      <div className="max-w-7xl mx-auto mt-6 p-4">
        <h3 className="font-semibold mb-2">JSON (mock data & current filters)</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <pre className="bg-white p-4 rounded shadow overflow-auto text-xs">{JSON.stringify(MOCK_DOCTORS, null, 2)}</pre>
          <pre className="bg-white p-4 rounded shadow overflow-auto text-xs">{JSON.stringify(filters, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
