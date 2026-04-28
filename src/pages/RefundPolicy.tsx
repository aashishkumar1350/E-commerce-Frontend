export default function RefundPolicy() {
  return (
    <div className="bg-background text-foreground">
      
      {/* HERO */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Return & Refund Policy</h1>
        <p className="mt-3 text-white/80">
          Easy returns and hassle-free refunds
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
            At <strong>Kapdewala</strong>, customer satisfaction is our priority.
            If you are not completely satisfied with your purchase, we offer an
            easy return and refund process.
          </p>
        </section>

        {/* RETURN POLICY */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            1. Return Policy
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Items can be returned within <strong>7 days</strong> of delivery</li>
            <li>Products must be unused, unwashed, and in original packaging</li>
            <li>Tags and labels must be intact</li>
            <li>Certain items like innerwear or customized products are non-returnable</li>
          </ul>
        </section>

        {/* REFUND POLICY */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            2. Refund Policy
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Refunds are processed after product inspection</li>
            <li>Refund will be credited to your original payment method</li>
            <li>It may take 5–7 business days to reflect in your account</li>
          </ul>
        </section>

        {/* EXCHANGE */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. Exchange Policy
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            We offer exchanges for size or defective products. You can request
            an exchange within 7 days of receiving your order.
          </p>
        </section>

        {/* DAMAGED */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. Damaged or Wrong Items
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            If you receive a damaged, defective, or wrong product, please contact
            us immediately with images. We will arrange a replacement or refund
            at no extra cost.
          </p>
        </section>

        {/* NON RETURNABLE */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. Non-Returnable Items
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Innerwear and personal hygiene products</li>
            <li>Customized or made-to-order items</li>
            <li>Products marked as “Non-returnable”</li>
          </ul>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            6. Contact Us
          </h2>

          <p className="text-muted-foreground">
            For return or refund requests, contact us at:
          </p>

          <p className="mt-2 font-medium">
            support@kapdewala.com
          </p>
        </section>

      </div>
    </div>
  );
}