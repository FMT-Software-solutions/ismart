import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">iSMART</h3>
            <p className="text-muted-foreground mb-4">
              Institute of Sexuality, Marriage and Family Life Research &
              Training
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/trainings"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Trainings
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Campaigns
                </Link>
              </li>
              <li>
                <Link
                  href="/media"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  ismflrt.official@gmail.com
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+233271467767</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Accra, Ghana</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest news and events.
            </p>
            <div className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your email address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} iSMART. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
