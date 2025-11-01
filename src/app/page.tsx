import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  BrainCircuit,
  Leaf,
  Sprout,
  Users,
  Zap,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Farmer Friendly',
    description: 'An intuitive interface designed for ease of use, keeping you connected to your fields and fellow farmers.',
    image: PlaceHolderImages.find(img => img.id === 'feature-farmer-friendly'),
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Instant Data Sync',
    description: 'Real-time synchronization of all your field data, accessible anytime, anywhere, on any device.',
    image: PlaceHolderImages.find(img => img.id === 'feature-data-sync'),
  },
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: 'Proactive Field Care',
    description: 'Stay ahead with timely alerts and proactive care suggestions to ensure your crops are always thriving.',
    image: PlaceHolderImages.find(img => img.id === 'feature-field-care'),
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'AI-Powered Decisions',
    description: 'Leverage our AI to get smart, data-driven recommendations for planting, irrigation, and pest control.',
    image: PlaceHolderImages.find(img => img.id === 'feature-ai-decisions'),
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-landing');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50 sm:text-5xl xl:text-6xl/none">
                    Smart Farming, Simplified with{' '}
                    <span className="text-primary">AgriSync</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl">
                    Connect with your fields like never before. Get real-time data,
                    AI-powered insights, and data-driven support to maximize your
                    yield and efficiency.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                 <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    data-ai-hint={heroImage.imageHint}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              )}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  Key Features
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  A New Era of Agriculture
                </h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our app is packed with features to help you monitor your crops,
                  make informed decisions, and improve your farm's productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
