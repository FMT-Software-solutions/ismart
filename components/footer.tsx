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
import { featureFlags } from '@/const/feature-flags';
import Image from 'next/image';

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
                href="https://www.facebook.com/share/1NSSoxtrFs/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors hidden"
              >
                <Image src="/x.svg" alt="X" width={20} height={20} />
                <span className="sr-only">X</span>
              </Link>
              <Link
                href="https://www.instagram.com/ismarthq"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@sexual_intelligence_hq"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Image src="/tiktok.svg" alt="TikTok" width={20} height={20} />
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {featureFlags.about && (
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              )}
              {featureFlags.trainings && (
                <>
                  <li>
                    <Link
                      href="/events"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Events & Trainings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/trainings/register"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Register for Training
                    </Link>
                  </li>
                </>
              )}
              {featureFlags.research && (
                <li>
                  <Link
                    href="/research"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Research
                  </Link>
                </li>
              )}
              {featureFlags.campaigns && (
                <li>
                  <Link
                    href="/campaigns"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Campaigns
                  </Link>
                </li>
              )}
              {featureFlags.media && (
                <li>
                  <Link
                    href="/media"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Media
                  </Link>
                </li>
              )}
              {featureFlags.contact && (
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              )}
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
