import type { Metadata } from 'next';
import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AuthPage from './AuthPage';

export const metadata: Metadata = {
  title: { absolute: 'Log in to Curxx — Mobile OTP Login' },
  description: 'Log in to Curxx with your mobile number to manage appointments, prescriptions, lab reports and your ABHA health locker.',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <Suspense>
        <AuthPage initialMode="login" />
      </Suspense>
      <Footer />
    </>
  );
}
