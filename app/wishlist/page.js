'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { items, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const [addingIds, setAddingIds] = useState({});

  const handleAddToCart = (product) => {
    setAddingIds(prev => ({ ...prev, [product.id]: true }));
    addItem(product, 1);
    setTimeout(() => {
      setAddingIds(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const getCategoryEmoji = (category) => {
    const map = { electronics: '⚡', fashion: '✦', beauty: '◈', accessories: '◎', home: '⌂', sports: '◉' };
    return map[category] || '✦';
  };

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className="container">
          <span className="badge badge-purple">My Collection</span>
          <h1 className={styles.heroTitle}>Your Wishlist</h1>
          <p className={styles.heroDesc}>
            {items.length === 0 
              ? 'Save your favorite items here' 
              : `${items.length} premium ${items.length === 1 ? 'item' : 'items'} saved for later`
            }
          </p>
        </div>
      </div>

      <div className="container">
        {items.length > 0 ? (
          <div className={styles.grid}>
            {items.map(product => {
              const imgSrc = product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const isAdding = addingIds[product.id];

              return (
                <div key={product.id} className={styles.card} id={`wishlist-card-${product.id}`}>
                  {/* Image Wrap */}
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

                    {/* Delete/Remove Button */}
                    <button
                      className={styles.removeBtn}
                      onClick={() => toggleItem(product)}
                      aria-label="Remove from wishlist"
                      id={`remove-wishlist-${product.id}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className={styles.info}>
                    <div className={styles.brand}>{product.brand}</div>
                    <Link href={`/product/${product.id}`} className={styles.productLink}>
                      <h3 className={styles.name}>{product.name}</h3>
                    </Link>

                    {/* Price & Rating */}
                    <div className={styles.metaRow}>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className={styles.originalPrice}>${product.originalPrice}</span>
                        )}
                      </div>
                      <div className={styles.rating}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <span className={styles.ratingVal}>{product.rating}</span>
                      </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      className={`${styles.addBtn} ${isAdding ? styles.addBtnSuccess : ''}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={isAdding}
                      id={`wishlist-add-cart-${product.id}`}
                    >
                      {isAdding ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Added!
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className={styles.empty} id="wishlist-empty-state">
            <span className={styles.emptyIcon}>💖</span>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyDesc}>
              Explore our curated selection and tap the heart icon on any product to save it here for later.
            </p>
            <Link href="/shop" className="btn-primary" id="wishlist-shop-btn">
              Explore Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
