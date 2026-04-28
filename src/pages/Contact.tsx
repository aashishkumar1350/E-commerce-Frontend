import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mb-8 text-muted-foreground">Have a question? We'd love to hear from you.</p>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Phone, title: "Phone", detail: "+1 (555) 123-4567", sub: "Mon-Fri 9am-6pm" },
            { icon: Mail, title: "Email", detail: "support@markethub.com", sub: "We reply within 24h" },
            { icon: MapPin, title: "Address", detail: "123 Market St", sub: "San Francisco, CA" },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm font-medium text-foreground">{item.detail}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Your Name" required />
              <Input placeholder="Your Email" type="email" required />
              <div className="sm:col-span-2">
                <Input placeholder="Subject" required />
              </div>
              <div className="sm:col-span-2">
                <Textarea placeholder="Your message..." rows={5} required />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
