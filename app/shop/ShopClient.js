'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import styles from './ShopPage.module.css';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    // Category
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags?.some(t => t.includes(q))
      );
    }

    // Price range
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':  list.sort((a,b) => a.price - b.price); break;
      case 'price-desc': list.sort((a,b) => b.price - a.price); break;
      case 'rating':     list.sort((a,b) => b.rating - a.rating); break;
      case 'newest':     list.sort((a,b) => b.id - a.id); break;
      default: break; // featured order
    }

    return list;
  }, [activeCategory, search, sortBy, priceRange]);

  return (
    <div className={styles.page}>
      {/* Hero banner */}
      <div className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className="container">
          <span className="badge badge-purple">Our Collection</span>
          <h1 className={styles.heroTitle}>Shop All Products</h1>
          <p className={styles.heroDesc}>
            {filtered.length} premium products — curated just for you
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>

          {/* ── SIDEBAR ── */}
          <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`} id="shop-filters">
            <div className={styles.sidebarHeader}>
              <h3>Filters</h3>
              <button className={styles.closeFilters} onClick={() => setFiltersOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Categories */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterLabel}>Category</h4>
              <div className={styles.filterOptions}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`${styles.filterOption} ${activeCategory === cat.id ? styles.filterOptionActive : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    id={`filter-cat-${cat.id}`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className={styles.filterCount}>
                      {cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterLabel}>
                Price Range
                <span className={styles.priceLabel}>${priceRange[0]} – ${priceRange[1]}</span>
              </h4>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className={styles.rangeInput}
                id="price-range-max"
              />
              <div className={styles.rangeLabels}>
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>

            {/* Reset */}
            <button
              className={styles.resetBtn}
              onClick={() => { setActiveCategory('all'); setPriceRange([0,500]); setSearch(''); }}
              id="reset-filters-btn"
            >
              Reset Filters
            </button>
          </aside>

          {/* Overlay for mobile */}
          {filtersOpen && <div className={styles.filterOverlay} onClick={() => setFiltersOpen(false)} />}

          {/* ── MAIN ── */}
          <div className={styles.main}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              {/* Search */}
              <div className={styles.searchWrap}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--text-muted)', flexShrink:0}}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className={styles.searchInput}
                  id="shop-search-input"
                />
                {search && (
                  <button className={styles.clearSearch} onClick={() => setSearch('')}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>

              <div className={styles.toolbarRight}>
                {/* Filter btn (mobile) */}
                <button
                  className={styles.filterToggle}
                  onClick={() => setFiltersOpen(true)}
                  id="open-filters-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/>
                    <line x1="12" y1="18" x2="20" y2="18"/>
                  </svg>
                  Filters
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                  id="shop-sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <span className={styles.resultCount}>{filtered.length} items</span>
              </div>
            </div>

            {/* Active filters */}
            {(activeCategory !== 'all' || search) && (
              <div className={styles.activeFilters}>
                {activeCategory !== 'all' && (
                  <span className={styles.filterChip}>
                    {categories.find(c => c.id === activeCategory)?.name}
                    <button onClick={() => setActiveCategory('all')}>×</button>
                  </span>
                )}
                {search && (
                  <span className={styles.filterChip}>
                    "{search}"
                    <button onClick={() => setSearch('')}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className={styles.productsGrid}>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term.</p>
                <button
                  className="btn-primary"
                  onClick={() => { setActiveCategory('all'); setSearch(''); setPriceRange([0,500]); }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
