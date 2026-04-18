import Layout from '../components/Layout';

const products = [
  {
    id: 1, name: 'Premium Copper Pipe Type L', category: 'Plumbing',
    desc: '1/2 inch × 10 ft. Rigid for commercial water supply.',
    price: '₹2,099', unit: 'Per Unit (10 ft)', badges: ['In Stock', 'Bulk Discount'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA74X8pYC5mrvIRYXaj2smZ9auwnnK2g3BwmhdSGIWkZ0FhemtIUIBID-_7q08H9kORhLIIWanzZ8MjWqcKEPQ2FRa-rkvXDb2QKYZf7TqvIjaBlieZR9GwexzhWK9DX1fPWazhDXIBH96QaeJMyBAsL-6z-2YZ9gVwazB0-QsbFo-V-NOyU8Rgkj5qD4NRkC6fp0YL7_SWXDSo7rkhTeygz4FJDzMvGEo8hxOEpwZfcO5DCazJpCwY7RcHoRexjG-EwsD9mfdBmdQ',
  },
  {
    id: 2, name: 'Portland Cement Type I/II', category: 'Masonry',
    desc: '94 lb bag. Standard grey cement for general construction.',
    price: '₹1,550', unit: 'Per Bag (94 lb)', badges: ['In Stock'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkknfSO1fqoUbDVa71IZlMPVoWdyqoTQUC5pJDxep74eljMcDirIfRXdJmSUR5No_FgpsDu376MqjPksyiet9aAmWgEfpTXYXysujy1k1fBfclRhxeTrtHMp_ox3XULtB6gS_rA_14NBsOTeahC9wuLbtFepZSToe-3MRFBdFBI5K3bm7KL0Ggy0_0XKlNM5NjbrubO8NwivEwiPmqB0BfYG4ciej-CXdNnZqb6L0aQVR2Mzl-e-20BmpSnVigVVGMzBpW5iaVjss',
  },
  {
    id: 3, name: '12/2 NM-B Wire With Ground', category: 'Electrical',
    desc: '250 ft roll. Solid copper conductors for indoor residential wiring.',
    price: '₹9,400', unit: 'Per Roll (250 ft)', badges: ['In Stock', 'Top Rated'],
    featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaobBDS_I-0DlAtBvy_GOszN0zvShwYcwRYXnMzrg2f_dp7f_vRF6QA2vccEifCODEK1mvFFpg_eURasXmCl61qd2w-D9ywCxP8N74RpsBwbYYm2eAYCBo1xqyEfCsoivj2Ysgsx2xmC0yUjg0jZVt5KtynooWDksMZ-oeul1IgBDXHhufteQdELnPrZ-MULWlCjVk8-02hkDzk1dorDfAY1ZUjV02fNaKVt3124yNQ3Jc7cPQIZv-fHAtCyvVx3AKJT3QFMDkh88',
  },
];

const trending = ['Pipes & Fittings', 'Copper Wire', 'Cement Bags', 'Power Tools'];

export default function MaterialsStore() {
  return (
    <Layout>
      <div className="section pt-28 md:pt-32 pb-32 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
          <div>
            <h1 className="section-title text-3xl md:text-4xl">Materials Store</h1>
            <p className="section-subtitle mt-2">Pro-grade supplies, delivered to your site.</p>
          </div>
          <div className="glass-panel rounded-full p-1 flex items-center">
            <button className="px-5 py-2 rounded-full bg-white/[0.06] text-on-surface text-sm font-semibold transition-all">Delivery</button>
            <button className="px-5 py-2 rounded-full text-on-surface-variant text-sm font-medium hover:text-on-surface transition-colors">Pickup</button>
          </div>
        </div>

        {/* Trending */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar items-center">
          <span className="text-sm text-on-surface-variant flex items-center gap-1.5 shrink-0 mr-2">
            <span className="material-symbols-outlined text-secondary text-base">bolt</span> Trending:
          </span>
          {trending.map(t => <button key={t} className="chip shrink-0">{t}</button>)}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </Layout>
  );
}

function ProductCard({ product: p }) {
  return (
    <article className={`card overflow-hidden flex flex-col ${p.featured ? 'xl:col-span-2' : ''}`}>
      {/* Image */}
      <div className="relative h-56 bg-surface-container overflow-hidden">
        <img
          alt={p.name}
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          src={p.image}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.badges.map(b => (
            <span key={b} className={`badge ${b === 'In Stock' ? 'badge-success' : b === 'Top Rated' ? 'badge-accent' : 'badge-accent'}`}>
              {b === 'In Stock' && <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />}
              {b === 'Top Rated' && <span className="material-symbols-outlined text-[12px]">star</span>}
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">{p.category}</p>
        <h3 className="text-base font-headline font-bold text-on-surface mb-1 leading-snug">{p.name}</h3>
        <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">{p.desc}</p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[11px] text-outline mb-0.5">{p.unit}</p>
            <p className="text-xl font-headline font-bold text-on-surface">{p.price}</p>
          </div>
          <button className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">add_shopping_cart</span>
            {p.featured ? 'Add to Order' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
