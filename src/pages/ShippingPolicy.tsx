export default function ShippingPolicy() {
  return (
    <div className="bg-background text-foreground">

      {/* HERO */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Shipping Policy</h1>
        <p className="mt-3 text-white/80">
          Fast, reliable, and transparent delivery
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
            At <strong>Kapdewala</strong>, we strive to deliver your orders quickly
            and efficiently. This Shipping Policy outlines our delivery process,
            timelines, and charges.
          </p>
        </section>

        {/* SHIPPING TIME */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            1. Shipping Time
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Orders are processed within <strong>1–2 business days</strong></li>
            <li>Delivery usually takes <strong>3–7 business days</strong></li>
            <li>Delivery time may vary based on your location</li>
          </ul>
        </section>

        {/* SHIPPING CHARGES */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            2. Shipping Charges
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Free shipping on orders above ₹999</li>
            <li>Standard shipping charges apply below this amount</li>
            <li>Shipping cost is displayed at checkout</li>
          </ul>
        </section>

        {/* ORDER TRACKING */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. Order Tracking
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Once your order is shipped, you will receive a tracking link via
            email or SMS. You can track your order status in real-time.
          </p>
        </section>

        {/* DELAY */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. Delivery Delays
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Delivery delays may occur due to weather conditions, holidays,
            or unforeseen circumstances. We will keep you informed in case
            of any delays.
          </p>
        </section>

        {/* ADDRESS */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. Incorrect Address
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Please ensure your shipping address is accurate. We are not
            responsible for delays or failed deliveries due to incorrect
            information provided by the customer.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            6. Contact Us
          </h2>

          <p className="text-muted-foreground">
            If you have any questions regarding shipping, contact us at:
          </p>

          <p className="mt-2 font-medium">
            support@kapdewala.com
          </p>
        </section>

      </div>
    </div>
  );
}