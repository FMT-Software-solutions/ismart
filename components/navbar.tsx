'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  {
    title: 'About',
    href: '/about',
    submenu: [
      { title: 'Mission & Vision', href: '/about#mission-vision' },
      { title: 'Overall Goal', href: '/about#goal' },
      { title: 'Pillars', href: '/about#pillars' },
      { title: 'Our Team', href: '/about#team' },
      { title: 'Policy Positions', href: '/about#policy' },
    ],
  },
  {
    title: 'Campaigns & Advocacy',
    href: '/campaigns',
    submenu: [
      { title: 'Current Campaigns', href: '/campaigns#current' },
      { title: 'Past Initiatives', href: '/campaigns#past' },
      { title: 'Get Involved', href: '/campaigns#involved' },
    ],
  },
  {
    title: 'Trainings',
    href: '/trainings',
    submenu: [
      // { title: 'Sexuality Studies', href: '/trainings/sexuality' },
      // { title: 'Marriage & Relationships', href: '/trainings/marriage' },
      // { title: 'Parenting & Family Life', href: '/trainings/family' },
      { title: 'Register for Training', href: '/trainings/register' },
    ],
  },
  {
    title: 'Research',
    href: '/research',
    submenu: [
      { title: 'Sex & Sexuality', href: '/research/sexuality' },
      { title: 'Dating & Marriage', href: '/research/marriage' },
      { title: 'Family Life & Parenting', href: '/research/family' },
      { title: 'Publications', href: '/research/publications' },
    ],
  },
  {
    title: 'Media',
    href: '/media',
    submenu: [
      { title: 'Videos', href: '/media/videos' },
      { title: 'Picture Gallery', href: '/media/gallery' },
      { title: 'News', href: '/media/news' },
    ],
  },
  { title: 'Donate', href: '/donate' },
  { title: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-background'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/logo.png"
                  alt="iSMART Logo"
                  width={100}
                  height={100}
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) =>
                  link.submenu ? (
                    <NavigationMenuItem key={link.title}>
                      <NavigationMenuTrigger className="text-base">
                        <Link href={link.href}>{link.title}</Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {link.submenu.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.title}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.title}>
                      <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {link.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <div key={link.title} className="py-2">
                  {link.submenu ? (
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between font-medium">
                        {link.title}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="mt-2 space-y-2 pl-4">
                        {link.submenu.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              href={subItem.href}
                              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 font-medium hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button className="w-full" asChild>
                  <Link href="/donate">Donate Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
