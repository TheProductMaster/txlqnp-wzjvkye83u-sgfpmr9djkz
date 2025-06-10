# 📊 Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) tracking for your IT services website.

## 🚀 Quick Setup

### Step 1: Get Your Google Analytics ID

1. **Go to Google Analytics**: Visit [analytics.google.com](https://analytics.google.com)
2. **Create Account**: If you don't have one, create a Google Analytics account
3. **Add Property**: Add a new GA4 property for your website
4. **Get Measurement ID**: Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Update Your Code

1. **Open the analytics hook**: `/components/hooks/useAnalytics.ts`
2. **Replace the placeholder**:
   ```typescript
   // Change this line:
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
   
   // To your actual ID:
   const GA_MEASUREMENT_ID = 'G-ABC123DEF4'; // Your real ID
   ```

### Step 3: Deploy and Test

1. **Deploy your site** to production
2. **Visit your site** and navigate between pages
3. **Check Analytics**: In GA4, go to Reports → Real-time to see live data

## 📈 What's Being Tracked

### Automatic Tracking ✅

#### **Page Views**
- Home page visits
- Service page views
- Portfolio page visits
- Blog post views
- Contact page visits

#### **User Interactions**
- Button clicks (CTAs, navigation)
- Link clicks (external links)
- Form interactions (contact forms)
- Theme toggle usage
- Service detail views

#### **Blog Analytics**
- Blog post reads
- Blog search usage
- Category filtering
- Related post clicks

#### **Performance Metrics**
- Page load times
- Core Web Vitals (LCP, FID, CLS)
- Scroll depth tracking
- User engagement time

### Custom Events Being Tracked

```javascript
// Service page visits
analytics.trackServiceView('Web Development');

// Blog interactions
analytics.trackBlogInteraction('blog_post_view', 'post-id');

// Contact form submissions
analytics.trackFormSubmission('contact_form', true);

// Theme changes
analytics.trackThemeChange('dark');

// User interactions
analytics.trackInteraction('Hero CTA Button');
```

## 🔧 Advanced Configuration

### Enhanced E-commerce (Optional)

If you plan to add e-commerce tracking later:

```typescript
// Add to your analytics hook
const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items
    });
  }
};
```

### Custom Conversions

Set up conversion goals in GA4:

1. **Form Submissions**: `form_submit_success`
2. **Service Inquiries**: `service_view`
3. **Blog Engagement**: `blog_post_view`
4. **Contact Attempts**: `contact_attempt`

### Advanced Segments

Create audiences in GA4 for:
- **High-value visitors**: Multiple page views + contact interaction
- **Service interested**: Visited services page
- **Blog readers**: Multiple blog post views
- **Mobile users**: Device category = mobile

## 📊 Key Metrics to Monitor

### Business Metrics
- **Conversion Rate**: Contact form submissions / total visitors
- **Service Interest**: Service page views / total sessions
- **Blog Engagement**: Average time on blog posts
- **Lead Quality**: Contact method preferences

### Technical Metrics
- **Page Load Speed**: Average page load time
- **Core Web Vitals**: LCP, FID, CLS scores
- **Bounce Rate**: Single-page sessions
- **Session Duration**: Average engagement time

### User Behavior
- **Popular Services**: Most viewed service pages
- **Content Performance**: Top-performing blog posts
- **User Flow**: Common navigation paths
- **Device Usage**: Mobile vs. desktop preferences

## 🎯 Setting Up Goals & Conversions

### Primary Conversions
1. **Contact Form Submission**
   - Event: `form_submit_success`
   - Value: Assign monetary value per lead

2. **Service Page Engagement**
   - Event: `service_view`
   - Condition: Time on page > 30 seconds

3. **Phone Call Clicks**
   - Event: `contact_attempt`
   - Label: `phone`

### Secondary Conversions
1. **Email Newsletter Signup**
2. **Portfolio Download**
3. **Blog Subscription**
4. **Social Media Follow**

## 🔍 Privacy & Compliance

### GDPR Compliance
```javascript
// Add consent management
window.gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ads_storage': 'denied'
});

// Update consent when user agrees
window.gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
```

### Data Retention
- Set data retention period in GA4 settings
- Configure user deletion requests
- Implement IP anonymization (enabled by default in GA4)

## 📱 Testing Your Analytics

### Real-time Testing
1. **Open GA4**: Go to Reports → Real-time
2. **Visit your site**: Open your website in another tab
3. **Navigate**: Click through different pages
4. **Verify**: Check that events appear in real-time view

### Debug Mode
```javascript
// Enable debug mode in development
window.gtag('config', 'G-XXXXXXXXXX', {
  debug_mode: true
});
```

### Use GA4 DebugView
1. Install Google Analytics Debugger extension
2. Enable debugger on your site
3. View detailed event data in GA4 DebugView

## 🚨 Troubleshooting

### Common Issues

#### Analytics Not Loading
```javascript
// Check if gtag is loaded
console.log('GA4 loaded:', typeof window.gtag !== 'undefined');

// Check measurement ID
console.log('Measurement ID:', GA_MEASUREMENT_ID);
```

#### Events Not Tracking
```javascript
// Enable debug logging
const trackEvent = (event) => {
  console.log('Tracking event:', event);
  window.gtag('event', event.action, event.parameters);
};
```

#### Page Views Not Registering
- Verify hash routing is working
- Check that page title updates correctly
- Ensure gtag config is called on route change

### Debug Checklist
- [ ] ✅ Google Analytics script loads
- [ ] ✅ Measurement ID is correct
- [ ] ✅ Page views are tracked
- [ ] ✅ Custom events fire
- [ ] ✅ Real-time data appears in GA4
- [ ] ✅ No console errors
- [ ] ✅ HTTPS is enabled (required for GA4)

## 📈 Reporting Dashboard

### Key Reports to Monitor

#### **Acquisition Reports**
- Traffic sources (organic, direct, referral)
- Campaign performance
- Search console integration

#### **Engagement Reports**
- Page views and unique page views
- Average engagement time
- Bounce rate by page

#### **Conversion Reports**
- Goal completions
- Conversion paths
- Attribution modeling

#### **Custom Reports**
Create custom reports for:
- Service page performance
- Blog content analytics
- Contact conversion funnel
- Mobile vs. desktop behavior

## 🎛️ Advanced Features

### Event Parameters
```javascript
// Enhanced event tracking with custom parameters
analytics.trackEvent({
  action: 'video_play',
  category: 'Engagement',
  label: 'Hero Video',
  custom_parameters: {
    video_title: 'Company Overview',
    video_duration: 120,
    user_type: 'first_time_visitor'
  }
});
```

### User Properties
```javascript
// Set user properties for better segmentation
window.gtag('config', GA_MEASUREMENT_ID, {
  user_properties: {
    preferred_theme: 'dark',
    user_type: 'business_owner',
    industry: 'technology'
  }
});
```

### Cross-Domain Tracking
```javascript
// If you have multiple domains
window.gtag('config', GA_MEASUREMENT_ID, {
  linker: {
    domains: ['yourdomain.com', 'subdomain.yourdomain.com']
  }
});
```

## 🔒 Security Best Practices

1. **Server-Side Configuration**: Keep sensitive analytics config server-side
2. **Environment Variables**: Use environment variables for production IDs
3. **Content Security Policy**: Add GA4 domains to CSP
4. **Regular Audits**: Review analytics permissions and access

## 📞 Support Resources

- **Google Analytics Help**: [support.google.com/analytics](https://support.google.com/analytics)
- **GA4 Documentation**: [developers.google.com/analytics/devguides/collection/ga4](https://developers.google.com/analytics/devguides/collection/ga4)
- **Community**: [GA4 Community Forum](https://support.google.com/analytics/community)

---

## ✅ Verification Checklist

After setup, verify these items:

- [ ] **Analytics ID updated** in code
- [ ] **Site deployed** to production
- [ ] **Real-time data** visible in GA4
- [ ] **Page views tracking** correctly
- [ ] **Custom events firing** properly
- [ ] **No console errors** related to analytics
- [ ] **Mobile tracking** working
- [ ] **Cross-browser testing** completed
- [ ] **Goals/conversions** configured
- [ ] **Privacy policy** updated with analytics disclosure

Your analytics implementation is now complete and ready to provide valuable insights into your website's performance! 🎉