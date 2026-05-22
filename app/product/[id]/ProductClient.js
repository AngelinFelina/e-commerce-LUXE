'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard';
import { getProductById, getRelatedProducts } from '../../data/products';
import styles from './ProductPage.module.css';
import { notFound } from 'next/navigation';

export default function ProductClient({ id }) {
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const imgSrc = product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';

  const handleAdd = () => {
    addItem(product, qty, product.colors ? product.colors[selectedColor] : null);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryEmoji = { electronics: '⚡', fashion: '✦', beauty: '◈', accessories: '◎', home: '⌂', sports: '◉' };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={`${styles.breadcrumb} container`}>
        <Link href="/" className={styles.breadLink}>Home</Link>
        <span className={styles.breadSep}>›</span>
        <Link href="/shop" className={styles.breadLink}>Shop</Link>
        <span className={styles.breadSep}>›</span>
        <Link href={`/shop?category=${product.category}`} className={styles.breadLink} style={{textTransform:'capitalize'}}>{product.category}</Link>
        <span className={styles.breadSep}>›</span>
        <span className={styles.breadCurrent}>{product.name}</span>
      </div>

      {/* Product Section */}
      <div className={`${styles.productSection} container`}>
        {/* Image */}
        <div className={styles.imagePanel}>
          <div
            className={styles.mainImage}
          >
            <img
              src={imgSrc}
              alt={product.name}
              className={styles.productImage}
              onError={(e) => {
                const color = product.colors?.[0] || '#7c3aed';
                e.target.style.display = 'none';
                const div = document.createElement('div');
                div.style.cssText = `position: absolute; inset: 0; width: 100%; height: 100%; background: ${color}; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white; font-weight: bold;`;
                div.textContent = product.name.substring(0, 1).toUpperCase();
                e.target.parentElement.appendChild(div);
              }}
            />
            {product.badge && (
              <span className={`badge badge-${product.badgeType} ${styles.productBadge}`}>{product.badge}</span>
            )}
            {discount > 0 && <span className={styles.discountBadge}>-{discount}%</span>}
          </div>
          {/* Color thumbnails */}
          {product.colors && product.colors.length > 1 && (
            <div className={styles.thumbnails}>
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${selectedColor === i ? styles.thumbActive : ''}`}
                  onClick={() => setSelectedColor(i)}
                  style={{ background: color }}
                  aria-label={`Color ${i+1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className={styles.detailsPanel}>
          <div className={styles.brandRow}>
            <span className={styles.brand}>{product.brand}</span>
            <span className={`badge badge-${product.badgeType}`}>{product.badge}</span>
          </div>

          <h1 className={styles.name}>{product.name}</h1>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24"
                  fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'}
                  stroke={s <= Math.round(product.rating) ? '#f59e0b' : 'var(--text-muted)'}
                  strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className={styles.ratingVal}>{product.rating}</span>
            <span className={styles.reviewCount}>{product.reviews.toLocaleString()} reviews</span>
            <span className={styles.stockInfo}>{product.stock <= 10 ? `⚠ Only ${product.stock} left` : `✓ In Stock`}</span>
          </div>

          {/* Price */}
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className={styles.originalPrice}>${product.originalPrice}</span>
                <span className={styles.saveBadge}>Save ${product.originalPrice - product.price}</span>
              </>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Features */}
          <div className={styles.features}>
            {product.features?.map(f => (
              <span key={f} className={styles.featureTag}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {f}
              </span>
            ))}
          </div>

          {/* Color selector */}
          {product.colors && product.colors.length > 1 && (
            <div className={styles.colorSection}>
              <p className={styles.colorLabel}>Color: <strong style={{color:'var(--text-primary)'}}>{product.colors[selectedColor]}</strong></p>
              <div className={styles.colorDots}>
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`${styles.colorBtn} ${selectedColor === i ? styles.colorBtnActive : ''}`}
                    style={{ background: color }}
                    onClick={() => setSelectedColor(i)}
                    aria-label={`Select color ${i+1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add */}
          <div className={styles.addSection}>
            <div className={styles.qtyControl}>
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q-1))} disabled={qty<=1}>−</button>
              <span className={styles.qtyVal}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q+1)}>+</button>
            </div>

            <button
              className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
              onClick={handleAdd}
              id={`product-add-cart-${product.id}`}
            >
              {added ? (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Added to Cart!</>
              ) : (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart</>
              )}
            </button>

            <button
              className={`${styles.wishBtn} ${wishlisted ? styles.wishBtnActive : ''}`}
              onClick={() => toggleItem(product)}
              aria-label="Wishlist"
              id={`product-wishlist-${product.id}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Perks */}
          <div className={styles.perks}>
            {[
              { icon: '🚚', text: 'Free shipping on orders over $100' },
              { icon: '↩️', text: '30-day free returns' },
              { icon: '🔒', text: 'Secure checkout' },
            ].map(p => (
              <div key={p.text} className={styles.perk}>
                <span>{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className={`${styles.related} container`}>
          <div className={styles.relatedHeader}>
            <span className="badge badge-purple">You Might Also Like</span>
            <h2 className={styles.relatedTitle}>Related Products</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
