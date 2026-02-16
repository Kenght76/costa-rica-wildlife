import React, { useEffect, useRef } from 'react';
import { colors, spacing } from '../styles/theme';

const SupportFooter = () => {
  const paypalRef = useRef(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;

    const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
    
    const doRender = () => {
      if (paypalRef.current && window.paypal?.HostedButtons) {
        paypalRef.current.innerHTML = '';
        window.paypal.HostedButtons({
          hostedButtonId: 'HST6RVHXRUTYE',
        }).render(paypalRef.current);
      }
    };

    if (existingScript && window.paypal?.HostedButtons) {
      doRender();
      return;
    }

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=BAA1kcBUXJ3mLpkqub848ppSHYDfR1uqOn4pyqHkK9CarbtTqyRNvnXgsD-vuF3PcguTbIfesYRamaIXg&components=hosted-buttons&enable-funding=venmo&currency=USD';
      script.crossOrigin = 'anonymous';
      script.async = true;
      script.onload = doRender;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div style={{
      marginTop: spacing.xl * 2,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
      borderTop: `1px solid ${colors.border}`,
      textAlign: 'center',
      opacity: 0.7,
    }}>
      <p style={{
        fontSize: '13px',
        color: colors.textSecondary,
        marginBottom: spacing.md,
        fontStyle: 'italic',
      }}>
        Enjoying this app? Your support helps keep it going.
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing.sm,
      }}>
        {/* Ko-fi Button */}
        <a
          href="https://ko-fi.com/travelguy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: '#FF5E5B',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Buy me a coffee on Ko-fi
        </a>

        {/* PayPal Button */}
        <div 
          ref={paypalRef}
          id="paypal-container-HST6RVHXRUTYE"
          style={{
            marginTop: spacing.sm,
            minHeight: '40px',
          }}
        />
      </div>

      <p style={{
        fontSize: '11px',
        color: colors.textSecondary,
        marginTop: spacing.md,
        opacity: 0.5,
      }}>
        Thank you for your generosity!
      </p>
    </div>
  );
};

export default SupportFooter;
