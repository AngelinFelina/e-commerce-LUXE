'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const imgSrc = product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} className={styles.card} id={`product-card-${product.id}`}>
      {/* Image Area */}
      <div className={styles.imageWrap}>
        <div className={styles.image}>
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
        </div>

        {/* Badge */}
        {product.badge && (
          <span className={`${styles.badge} badge badge-${product.badgeType}`}>
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className={styles.discount}>-{discount}%</span>
        )}

        {/* Wishlist */}
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick Add overlay */}
        <div className={styles.overlay}>
          <button
            className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
            onClick={handleAddToCart}
            id={`add-to-cart-${product.id}`}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.brand}>{product.brand}</div>
        <h3 className={styles.name}>{product.name}</h3>

        {/* Rating */}
        <div className={styles.rating}>
          <div className={styles.stars}>
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="12" height="12" viewBox="0 0 24 24"
                fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'}
                stroke={s <= Math.round(product.rating) ? '#f59e0b' : 'var(--text-muted)'}
                strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className={styles.ratingNum}>{product.rating}</span>
          <span className={styles.reviews}>({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price}</span>
          {product.originalPrice > product.price && (
            <span className={styles.originalPrice}>${product.originalPrice}</span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors && (
          <div className={styles.colors}>
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className={styles.colorDot}
                style={{ background: color }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className={styles.moreColors}>+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

function getCategoryEmoji(category) {
  const map = { electronics: '⚡', fashion: '✦', beauty: '◈', accessories: '◎', home: '⌂', sports: '◉' };
  return map[category] || '✦';
}
