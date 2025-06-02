import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function AccreditationSection() {
  return (
    <section className="section-padding backdrop-blur-md bg-white/70 dark:bg-gray-800/70 px-6 rounded-lg border border-white/30 dark:border-gray-500/60">
      <p className="text-lg text-center text-gray-800 dark:text-gray-200 mt-1">
        Accredited by: <span className="font-bold">ACTD-USA</span>
      </p>
      <div className="container-custom flex flex-col gap-8 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="w-full"
        >
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center gap-12"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-40">
                <Image
                  src="/ismart-logo.png"
                  alt="iSMART Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32">
                <Image
                  src="/ACTD-2.png"
                  alt="ACTD-USA Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
        <Button
          size="lg"
          variant="outline"
          className="bg-primary hover:bg-primary/80 text-white border-primary mx-auto"
          asChild
        >
          <Link href="https://www.actd.us/ismart/" target="_blank">
            Learn More
          </Link>
        </Button>
      </div>
    </section>
  );
}
