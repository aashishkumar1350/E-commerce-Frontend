import { Users, ShoppingBag, Globe, Truck } from "lucide-react";

export default function About() {
    return (
        <div className="bg-background text-foreground">

            {/* HERO */}
            <section className="relative h-[60vh] flex items-center justify-center text-center">
                <img
                    src="https://i.pinimg.com/1200x/25/45/e7/2545e7252e6ae24ba0588acea7b721e3.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                        About Kapdewala
                    </h1>
                    <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                        Your one-stop destination for fashion, quality, and trusted shopping experience.
                    </p>
                </div>
            </section>

            {/* STORY */}
            <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                    <p className="text-muted-foreground mb-4">
                        Kapdewala was created with a simple mission — to make fashion accessible,
                        affordable, and reliable for everyone. From trending outfits to everyday
                        essentials, we connect customers with trusted sellers across India.
                    </p>
                    <p className="text-muted-foreground">
                        We believe shopping should be easy, fast, and enjoyable. That’s why we
                        built a platform where quality meets convenience.
                    </p>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800"
                    className="rounded-2xl shadow-lg"
                />
            </section>

            {/* MISSION & VISION */}
            <section className="bg-muted py-16">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

                    <img
                        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
                        className="rounded-2xl shadow-lg"
                    />

                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-muted-foreground mb-4">
                            Our mission is to empower customers with affordable fashion while
                            helping sellers grow their business in a digital marketplace.
                        </p>

                        <h2 className="text-3xl font-bold mt-6 mb-4">Our Vision</h2>
                        <p className="text-muted-foreground">
                            To become India’s most trusted fashion marketplace where quality,
                            affordability, and convenience meet.
                        </p>
                    </div>

                </div>
            </section>

            {/* FEATURES */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>

                <div className="grid gap-6 md:grid-cols-4 container mx-auto px-4">

                    <div className="p-6 bg-card rounded-2xl shadow">
                        <ShoppingBag className="mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold">Wide Range</h3>
                        <p className="text-sm text-muted-foreground">
                            Thousands of products across categories
                        </p>
                    </div>

                    <div className="p-6 bg-card rounded-2xl shadow">
                        <Truck className="mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold">Fast Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                            Quick and reliable shipping nationwide
                        </p>
                    </div>

                    <div className="p-6 bg-card rounded-2xl shadow">
                        <Users className="mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold">Trusted Sellers</h3>
                        <p className="text-sm text-muted-foreground">
                            Verified vendors and quality assurance
                        </p>
                    </div>

                    <div className="p-6 bg-card rounded-2xl shadow">
                        <Globe className="mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold">Easy Shopping</h3>
                        <p className="text-sm text-muted-foreground">
                            Smooth and user-friendly experience
                        </p>
                    </div>

                </div>
            </section>

            {/* STATS */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold mb-10">Our Impact</h2>

                <div className="grid gap-6 md:grid-cols-4 container mx-auto px-4">
                    <div>
                        <h3 className="text-3xl font-bold text-primary">10K+</h3>
                        <p className="text-muted-foreground">Products</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-primary">5K+</h3>
                        <p className="text-muted-foreground">Customers</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-primary">500+</h3>
                        <p className="text-muted-foreground">Sellers</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-primary">99%</h3>
                        <p className="text-muted-foreground">Satisfaction</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary text-white py-16 text-center">
                <h2 className="text-3xl font-bold">Start Shopping Today</h2>
                <p className="mt-3 text-white/80">
                    Discover amazing deals and latest fashion trends
                </p>

                <a
                    href="/products"
                    className="inline-block mt-6 bg-white text-black px-6 py-2 rounded-lg font-semibold"
                >
                    Explore Products
                </a>
            </section>

        </div>
    );
}