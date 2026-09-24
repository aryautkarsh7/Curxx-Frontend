import type { Metadata } from 'next';
import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AuthPage from '../login/AuthPage';

export const metadata: Metadata = {
  title: { absolute: 'Create a Curxx Account — Register in 30 Seconds' },
  description: 'Register on Curxx with your name and mobile number to book doctors online or in-clinic, order medicines and store your health records.',
  alternates: { canonical: '/register' },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <Suspense>
        <AuthPage initialMode="register" />
      </Suspense>
      <Footer />
    </>
  );
}
