'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate login - replace with actual API call
    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Mock successful login
      localStorage.setItem('user', JSON.stringify({ email }));
      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Background Orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>LUXE</div>
          <p className={styles.tagline}>Premium E-Commerce Experience</p>
        </div>

        {/* Login Form */}
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your account to continue shopping</p>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={styles.formFooter}>
              <label className={styles.rememberMe}>
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <Link href="#" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>OR</span>
          </div>

          {/* Social Login */}
          <div className={styles.socialLogin}>
            <button className={styles.socialButton}>
              <span>🔵</span> Google
            </button>
            <button className={styles.socialButton}>
              <span>📱</span> Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <p className={styles.signupPrompt}>
            Don't have an account?{' '}
            <Link href="/signup" className={styles.signupLink}>
              Sign up here
            </Link>
          </p>
        </div>

        {/* Info Cards */}
        <div className={styles.infoCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🛍️</div>
            <h3>Exclusive Deals</h3>
            <p>Access members-only discounts and offers</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <h3>Order History</h3>
            <p>Track all your purchases in one place</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>❤️</div>
            <h3>Saved Items</h3>
            <p>Keep your wishlist synced across devices</p>
          </div>
        </div>
      </div>
    </div>
  );
}
