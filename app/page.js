import Link from 'next/link';
import ProductCard from './components/ProductCard';
import { products, categories } from './data/products';
import styles from './HomePage.module.css';

export const metadata = {
  title: 'LUXE — Premium E-Commerce Store',
  description: 'Shop the finest curated collection of electronics, fashion, beauty, and accessories. Premium quality. Exceptional style.',
};

const featuredProducts = products.slice(0, 8);
const newArrivals = products.filter(p => p.badge === 'New' || p.badge === 'Hot').slice(0, 4);

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero} id="hero">
        {/* Background orbs */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.grid} />

        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroContent}>
            <span className={`badge badge-purple ${styles.heroBadge}`}>
              ✦ New Season Collection 2026
            </span>
            <h1 className={styles.heroTitle}>
              Elevate Your
              <span className={`gradient-text ${styles.heroGradient}`}> Lifestyle</span>
              <br />with LUXE
            </h1>
            <p className={styles.heroDesc}>
              Discover curated premium products — from cutting-edge electronics to exclusive fashion.
              Every piece chosen for those who demand the extraordinary.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/shop" className="btn-primary" id="hero-shop-btn">
                Shop Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/shop?category=electronics" className="btn-secondary" id="hero-electronics-btn">
                View Electronics
              </Link>
            </div>
            {/* Stats */}
            <div className={styles.heroStats}>
              {[
                { val: '50K+', label: 'Happy Customers' },
                { val: '500+', label: 'Premium Products' },
                { val: '4.9★', label: 'Average Rating' },
              ].map(s => (
                <div key={s.val} className={styles.stat}>
                  <span className={styles.statVal}>{s.val}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardInner}>
                <span className={styles.heroEmoji}>⚡</span>
              </div>
              <div className={styles.heroCardGlow} />
            </div>
            {/* Floating badges */}
            <div className={`${styles.floatBadge} ${styles.floatBadge1}`}>
              <span>🔥</span> Trending Now
            </div>
            <div className={`${styles.floatBadge} ${styles.floatBadge2}`}>
              <span className={styles.greenDot}/>Free Shipping
            </div>
            <div className={`${styles.floatBadge} ${styles.floatBadge3}`}>
              ⭐ 4.9 Rated
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className={styles.categoriesSection} id="categories">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={`badge badge-purple`}>Browse by Category</span>
              <h2 className={styles.sectionTitle}>Find What You Love</h2>
            </div>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.filter(c => c.id !== 'all').map(cat => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className={styles.categoryCard}
                id={`category-${cat.id}`}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span className={styles.categoryName}>{cat.name}</span>
                <span className={styles.categoryCount}>
                  {products.filter(p => p.category === cat.id).length} items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.productsSection} id="featured-products">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={`badge badge-pink`}>Handpicked for You</span>
              <h2 className={styles.sectionTitle}>Featured Products</h2>
            </div>
            <Link href="/shop" className="btn-secondary" id="view-all-btn">
              View All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className={styles.banner} id="promo-banner">
        <div className="container">
          <div className={styles.bannerInner}>
            <div className={styles.bannerOrb} />
            <div className={styles.bannerContent}>
              <span className={`badge badge-green`}>Limited Time Offer</span>
              <h2 className={styles.bannerTitle}>Free Shipping on Orders Over $100</h2>
              <p className={styles.bannerDesc}>
                Plus get an exclusive 15% off your first order when you sign up for LUXE membership.
              </p>
              <div className={styles.bannerCtas}>
                <Link href="/shop" className="btn-primary" id="banner-shop-btn">
                  Shop Now & Save
                </Link>
                <div className={styles.bannerPerks}>
                  {['Free Returns', '2-Day Delivery', 'Premium Packaging'].map(p => (
                    <span key={p} className={styles.perk}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className={styles.productsSection} id="new-arrivals">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={`badge badge-orange`}>Just Dropped</span>
              <h2 className={styles.sectionTitle}>New Arrivals</h2>
            </div>
            <Link href="/shop" className="btn-secondary" id="new-arrivals-all-btn">
              See All New
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className={styles.trustSection} id="trust-badges">
        <div className="container">
          <div className={styles.trustGrid}>
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '🔒', title: 'Secure Payment', desc: '256-bit SSL encryption' },
              { icon: '⭐', title: 'Premium Quality', desc: 'Hand-curated products' },
            ].map(item => (
              <div key={item.title} className={styles.trustItem}>
                <span className={styles.trustIcon}>{item.icon}</span>
                <div>
                  <h4 className={styles.trustTitle}>{item.title}</h4>
                  <p className={styles.trustDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
