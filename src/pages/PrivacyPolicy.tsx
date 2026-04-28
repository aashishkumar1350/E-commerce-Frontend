export default function PrivacyPolicy() {
  return (
    <div className="bg-background text-foreground">
      
      {/* HERO */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-3 text-white/80">
          Your privacy is important to us
        </p>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-10 max-w-4xl">

        <p className="text-sm text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* INTRO */}
        <section className="mb-8">
          <p className="text-muted-foreground leading-relaxed">
            At <strong>Kapdewala</strong>, we value your trust and are committed
            to protecting your personal information. This Privacy Policy explains
            how we collect, use, and safeguard your data when you use our website
            and services.
          </p>
        </section>

        {/* INFO WE COLLECT */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Personal details such as name, email, and phone number</li>
            <li>Login credentials and account information</li>
            <li>Order history and transaction details</li>
            <li>Browsing activity and preferences</li>
          </ul>
        </section>

        {/* HOW WE USE */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>To process and deliver your orders</li>
            <li>To improve our platform and user experience</li>
            <li>To communicate updates, offers, and notifications</li>
            <li>To maintain security and prevent fraud</li>
          </ul>
        </section>

        {/* SHARING */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. Sharing of Information
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            We do not sell your personal information. We may share your data with
            trusted third parties such as payment gateways and delivery partners
            only to fulfill your orders and provide services.
          </p>
        </section>

        {/* SECURITY */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. Data Security
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate security measures to protect your personal
            information. However, no online system is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        {/* COOKIES */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. Cookies
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            We use cookies to enhance your browsing experience, remember your
            preferences, and analyze website traffic to improve our services.
          </p>
        </section>

        {/* RIGHTS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            6. Your Rights
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>You can update or delete your account at any time</li>
            <li>You can opt out of promotional communications</li>
            <li>You can request access to your personal data</li>
          </ul>
        </section>

        {/* CHANGES */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            7. Changes to This Policy
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with the updated date.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            8. Contact Us
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>

          <p className="mt-2 font-medium">
            support@kapdewala.com
          </p>
        </section>

      </div>
    </div>
  );
}