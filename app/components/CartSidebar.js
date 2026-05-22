'use client';

import { useCart } from '../context/CartContext';
import styles from './CartSidebar.module.css';
import Link from 'next/link';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} id="cart-sidebar">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>Your Cart</h2>
            {totalItems > 0 && <span className={styles.itemCount}>{totalItems}</span>}
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} id="cart-close-btn" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <h3>Your cart is empty</h3>
            <p>Discover our premium collection and add items to your cart.</p>
            <button className="btn-primary" onClick={() => setIsOpen(false)}>
              <Link href="/shop" style={{color:'white', textDecoration:'none'}}>Start Shopping</Link>
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.key} className={styles.item}>
                  <div className={styles.itemImage}>
                    <img
                      src={item.image || fallbackImage}
                      alt={item.name}
                      className={styles.itemImageSrc}
                      onError={(e) => {
                        const color = item.colors?.[0] || '#7c3aed';
                        e.target.style.display = 'none';
                        const div = document.createElement('div');
                        div.style.cssText = `position: absolute; inset: 0; width: 100%; height: 100%; background: ${color}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: white; font-weight: bold;`;
                        div.textContent = item.name.substring(0, 1).toUpperCase();
                        e.target.parentElement.appendChild(div);
                      }}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemTop}>
                      <div>
                        <p className={styles.itemBrand}>{item.brand}</p>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        {item.selectedVariant && (
                          <p className={styles.itemVariant}>{item.selectedVariant}</p>
                        )}
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.key)}
                        aria-label="Remove item"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div className={styles.itemBottom}>
                      <div className={styles.qty}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >−</button>
                        <span className={styles.qtyNum}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        >+</button>
                      </div>
                      <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <div className={styles.subtotal}>
                <div className={styles.subtotalRow}>
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className={styles.subtotalRow}>
                  <span>Shipping</span>
                  <span className={styles.free}>{totalPrice >= 100 ? 'FREE' : '$9.99'}</span>
                </div>
                <div className={`${styles.subtotalRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}</span>
                </div>
                {totalPrice < 100 && (
                  <p className={styles.freeShippingMsg}>
                    Add ${(100 - totalPrice).toFixed(2)} more for <strong>free shipping</strong>
                  </p>
                )}
              </div>
              <Link href="/checkout" className={styles.checkoutBtn} onClick={() => setIsOpen(false)} id="cart-checkout-btn">
                Checkout · ${(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <button className={styles.clearBtn} onClick={clearCart}>Clear cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
