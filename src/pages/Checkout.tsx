import { useState } from "react";
import API, { placeOrderAPI, createAddressAPI } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function Checkout() {
    const { items, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "India",
    });

    const [payment, setPayment] = useState("cod");

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { firstName, email, phone, address, city, state, zip } = form;

        if (!firstName || !email || !phone || !address || !city || !state || !zip) {
            toast.error("All fields are required");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email");
            return false;
        }

        // Phone validation (Indian)
        // Phone validation (Indian)
        const cleanPhone = phone.replace(/\D/g, "").slice(-10);

            const phoneRegex = /^[6-9]\d{9}$/;

            if (!phoneRegex.test(cleanPhone)) {
            toast.error("Invalid phone number");
            return false;
        }

        // Pincode validation (India)
        const pinRegex = /^[1-9][0-9]{5}$/;
        if (!pinRegex.test(zip)) {
            toast.error("Invalid pincode");
            return false;
        }

        return true;
    };

    const fetchPincodeDetails = async (pincode: string) => {
        if (pincode.length !== 6) return;

        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await res.json();

            if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];

            setForm((prev) => ({
                ...prev,
                city: postOffice.District,
                state: postOffice.State,
            }));
            } else {
            toast.error("Invalid pincode");
            }
        } catch (err) {
            toast.error("Error fetching pincode");
        }
        };
    const placeOrder = async () => {
        if (!validateForm()) return;

        try {
            const cleanPhone = form.phone.replace(/\D/g, "").slice(-10);

            const addressRes = await createAddressAPI({
            name: form.firstName,
            phone: cleanPhone, // ✅ FIX
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.zip,
            country: "India"
            });

            const addressId = addressRes.data.id;

            await API.post("/checkout", {
            address_id: addressId,
            payment_method: payment,
            });

            clearCart();

            setForm({
                firstName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                country: "India",
            });

            // ✅ RESET PAYMENT
            setPayment("cod");
            Swal.fire("Order placed successfully");

            toast.success("Order placed successfully");

        } catch (err: any) {
            console.error("FULL ERROR:", err.response?.data);

            const errors = err.response?.data?.errors;

            if (errors) {
                Object.values(errors).forEach((msg: any) => {
                toast.error(msg[0]);
                });
            } else {
                toast.error(err.response?.data?.message || "Order failed");
            }
            }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT SECTION */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Shipping */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h2 className="font-semibold text-lg">Shipping Address</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input name="firstName" placeholder="Name" value={form.firstName} onChange={handleChange} />
                                <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                            </div>

                            <Input
                                name="phone"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    setForm({ ...form, phone: value });
                                }}
                            />
                            <Input
                                name="address"
                                value={form.address}
                                placeholder="Street Address"
                                onChange={handleChange}
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input name="city" value={form.city} placeholder="City" readOnly />
                                <Input name="state" value={form.state} placeholder="State" readOnly />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    name="zip"
                                    placeholder="ZIP Code"
                                    onChange={(e) => {
                                        handleChange(e);
                                        fetchPincodeDetails(e.target.value);
                                    }}
                                />
                                <Input name="country" value="India" disabled />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h2 className="font-semibold text-lg">Payment Method</h2>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={payment === "card"}
                                        onChange={() => setPayment("card")}
                                    />
                                    Credit/Debit Card
                                </label>

                                <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={payment === "paypal"}
                                        onChange={() => setPayment("paypal")}
                                    />
                                    PayPal
                                </label>

                                <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={payment === "cod"}
                                        onChange={() => setPayment("cod")}
                                    />
                                    Cash on Delivery
                                </label>
                            </div>

                            {payment === "card" && (
                                <>
                                    <Input placeholder="Card Number" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="MM/YY" />
                                        <Input placeholder="CVV" />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT SECTION */}
                <Card className="h-fit">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="font-semibold text-lg">Order Summary</h2>

                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.product?.name} x {item.quantity}</span>
                                <span>₹ {(item.product?.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}

                        <Separator />

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹ {totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹ {totalPrice.toFixed(2)}</span>
                        </div>

                        <Button className="w-full mt-4" size="lg" onClick={placeOrder}>
                            Place Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}