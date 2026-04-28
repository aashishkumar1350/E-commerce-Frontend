export default function TermsConditions() {
  return (
    <div className="bg-background text-foreground">

      {/* HERO */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        <p className="mt-3 text-white/80">
          Please read these terms carefully before using our platform
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
            Welcome to <strong>Kapdewala</strong>. By accessing or using our
            website, you agree to comply with and be bound by the following
            Terms and Conditions. If you do not agree, please do not use our services.
          </p>
        </section>

        {/* ACCOUNT */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            1. User Accounts
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining account confidentiality</li>
            <li>You are responsible for all activities under your account</li>
          </ul>
        </section>

        {/* PRODUCTS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            2. Products & Pricing
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>All product details and prices are subject to change</li>
            <li>We strive for accuracy but errors may occur</li>
            <li>We reserve the right to cancel incorrect orders</li>
          </ul>
        </section>

        {/* ORDERS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. Orders & Payments
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Orders are confirmed only after successful payment</li>
            <li>We reserve the right to refuse or cancel orders</li>
            <li>All payments must be made through authorized methods</li>
          </ul>
        </section>

        {/* SHIPPING */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. Shipping & Delivery
          </h2>

          <p className="text-muted-foreground">
            Delivery timelines are estimates and may vary. Please refer to our
            Shipping Policy for complete details.
          </p>
        </section>

        {/* RETURNS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. Returns & Refunds
          </h2>

          <p className="text-muted-foreground">
            Returns and refunds are subject to our Refund Policy. Please review
            that page for detailed information.
          </p>
        </section>

        {/* PROHIBITED */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            6. Prohibited Activities
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Using the platform for illegal purposes</li>
            <li>Attempting to hack or disrupt the system</li>
            <li>Providing false or misleading information</li>
          </ul>
        </section>

        {/* LIABILITY */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            7. Limitation of Liability
          </h2>

          <p className="text-muted-foreground">
            Kapdewala is not liable for any indirect or incidental damages
            arising from the use of our platform.
          </p>
        </section>

        {/* CHANGES */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            8. Changes to Terms
          </h2>

          <p className="text-muted-foreground">
            We may update these Terms at any time. Continued use of the platform
            means you accept the updated terms.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            9. Contact Us
          </h2>

          <p className="text-muted-foreground">
            If you have any questions, contact us at:
          </p>

          <p className="mt-2 font-medium">
            support@kapdewala.com
          </p>
        </section>

      </div>
    </div>
  );
}