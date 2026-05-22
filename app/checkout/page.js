'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
  });
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Auto-format card number: 1234 5678 1234 5678
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    setCardNumber(parts.length > 0 ? parts.join(' ') : value);
  };

  // Auto-format expiry date: MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    if (value.length > 2) {
      setExpiry(`${value.substring(0, 2)}/${value.substring(2, 4)}`);
    } else {
      setExpiry(value);
    }
  };

  // Auto-format CVV: 3 digits
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvv(value);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing loader
    setTimeout(() => {
      // Generate Order ID & Delivery Date
      const generatedId = `LUXE-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 4); // 4 days later
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = futureDate.toLocaleDateString('en-US', options);
      
      setOrderId(generatedId);
      setDeliveryDate(formattedDate);
      setIsLoading(false);
      setOrderPlaced(true);
      clearCart();
    }, 1800);
  };

  if (!isClient) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner} />
        <p>Initializing Checkout...</p>
      </div>
    );
  }

  // Cost calculations
  const shippingCost = totalPrice >= 100 ? 0 : 9.99;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className={styles.page}>
      <div className="container">
        {orderPlaced ? (
          /* ── SUCCESS STATE OVERLAY ── */
          <div className={styles.successWrapper} id="checkout-success-view">
            <div className={styles.successBox}>
              <div className={styles.successOrb} />
              <div className={styles.successIcon}>✓</div>
              <span className="badge badge-green">Order Confirmed</span>
              <h2 className={styles.successTitle}>Thank you for your order!</h2>
              <p className={styles.successDesc}>
                We have received your payment. Your premium selection is being prepared for shipment.
              </p>

              <div className={styles.detailsBox}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Order ID</span>
                  <strong className={styles.detailValue} id="success-order-id">{orderId}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Estimated Delivery</span>
                  <strong className={styles.detailValue}>{deliveryDate}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Shipment Carrier</span>
                  <strong className={styles.detailValue}>LUXE Courier Express</strong>
                </div>
              </div>

              <Link href="/shop" className="btn-primary" id="success-continue-btn">
                Continue Shopping
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        ) : items.length > 0 ? (
          /* ── MAIN CHECKOUT INTERFACE ── */
          <div className={styles.layout}>
            {/* Form */}
            <form onSubmit={handlePlaceOrder} className={styles.formPanel} id="checkout-form">
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Shipping Details</h2>
                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="jane.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="123 Luxury Ave, Apt 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      placeholder="Beverly Hills"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="zip">ZIP / Postal Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      required
                      placeholder="90210"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment details</h2>
                <div className={styles.cardHeader}>
                  <span>Secure 256-bit SSL encrypted connection</span>
                  <div className={styles.cardIcons}>
                    <span className={styles.cardIcon}>VISA</span>
                    <span className={styles.cardIcon}>MC</span>
                    <span className={styles.cardIcon}>AMEX</span>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    required
                    placeholder="Jane Doe"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      required
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      required
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`${styles.payBtn} ${isLoading ? styles.payBtnLoading : ''}`}
                disabled={isLoading}
                id="place-order-btn"
              >
                {isLoading ? (
                  <>
                    <div className={styles.buttonSpinner} />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Pay & Place Order · ${finalTotal.toFixed(2)}
                  </>
                )}
              </button>
            </form>

            {/* Sidebar Summary */}
            <aside className={styles.summaryPanel}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.itemContainer}>
                {items.map(item => (
                  <div key={item.key} className={styles.summaryItem}>
                    <div className={styles.itemThumbnail}>
                      <img
                        src={item.image || fallbackImage}
                        alt={item.name}
                        className={styles.itemThumbnailSrc}
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
                    <div className={styles.itemMeta}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemQtyPrice}>
                        Qty {item.quantity} · ${item.price} each
                      </p>
                    </div>
                    <span className={styles.itemTotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.costBreakdown}>
                <div className={styles.costRow}>
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className={styles.costRow}>
                  <span>Shipping</span>
                  <span className={styles.shippingValue}>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                </div>
                <div className={`${styles.costRow} ${styles.finalCost}`}>
                  <span>Grand Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* ── EMPTY STATE ── */
          <div className={styles.emptyCart}>
            <span className={styles.emptyIcon}>🛒</span>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyDesc}>
              You must have items in your cart to checkout.
            </p>
            <Link href="/shop" className="btn-primary">
              Return to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
