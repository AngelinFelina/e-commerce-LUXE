'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login validation
        if (!formData.email || !formData.password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        if (!formData.email.includes('@')) {
          setError('Please enter a valid email address');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        // Mock login
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
      } else {
        // Signup validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }

        if (!formData.email.includes('@')) {
          setError('Please enter a valid email address');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (!formData.agreeTerms) {
          setError('You must agree to the Terms & Conditions');
          setLoading(false);
          return;
        }

        // Mock signup
        localStorage.setItem('user', JSON.stringify({ 
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`
        }));
      }

      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (err) {
      setError(isLogin ? 'Login failed. Please try again.' : 'Signup failed. Please try again.');
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    });
  };

  return (
    <div className={styles.page}>
      {/* Background Orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>LUXE</div>
            <p className={styles.tagline}>Premium E-Commerce Experience</p>
          </Link>
        </div>

        {/* Auth Form */}
        <div className={styles.formWrapper}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${isLogin ? styles.tabActive : ''}`}
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${!isLogin ? styles.tabActive : ''}`}
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Create Account
            </button>
          </div>

          <h1 className={styles.title}>
            {isLogin ? 'Welcome Back' : 'Join LUXE'}
          </h1>
          <p className={styles.subtitle}>
            {isLogin ? 'Sign in to your account to continue shopping' : 'Create an account to enjoy exclusive benefits'}
          </p>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Name Fields (only for signup) */}
            {!isLogin && (
              <div className={styles.nameRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.label}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.label}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            {/* Confirm Password (only for signup) */}
            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                />
              </div>
            )}

            {/* Login Footer */}
            {isLogin && (
              <div className={styles.formFooter}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <Link href="#" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Terms Checkbox (only for signup) */}
            {!isLogin && (
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>
                  I agree to the <Link href="#" className={styles.link}>Terms & Conditions</Link> and <Link href="#" className={styles.link}>Privacy Policy</Link>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (isLogin ? 'Signing in...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>OR</span>
          </div>

          {/* Social Auth */}
          <div className={styles.socialAuth}>
            <button className={styles.socialButton} type="button">
              <span>🔵</span> Google
            </button>
            <button className={styles.socialButton} type="button">
              <span>📱</span> Apple
            </button>
          </div>

          {/* Toggle Mode Link */}
          <p className={styles.togglePrompt}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={toggleMode}
              className={styles.toggleLink}
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Features */}
        {isLogin && (
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛍️</div>
              <h3>Exclusive Deals</h3>
              <p>Access member-only discounts</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📦</div>
              <h3>Order History</h3>
              <p>Track all your purchases</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>❤️</div>
              <h3>Saved Items</h3>
              <p>Keep your wishlist synced</p>
            </div>
          </div>
        )}

        {/* Benefits */}
        {!isLogin && (
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>✓</div>
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>✓</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>✓</div>
              <h3>24/7 Support</h3>
              <p>Always here to help</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
