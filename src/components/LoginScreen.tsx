import React, { useState } from 'react';
import { Mail, Globe, Sparkles, ArrowRight, X, Lock, Check } from 'lucide-react';
import { ZLogo } from './ZLogo';
import { AppLanguage, UserProfile } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  lang: AppLanguage;
  onToggleLang: () => void;
  onShowToast: (msg: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  lang,
  onToggleLang,
  onShowToast,
}) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Google Login Handler
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser: UserProfile = {
        id: 'usr_g_' + Math.random().toString(36).substring(2, 9),
        name: 'Google Creator',
        email: 'creator@zynqora.ai',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        credits: 100000,
        provider: 'google',
      };
      onShowToast(lang === 'hi' ? 'गूगल से सफलतापूर्वक लॉग इन हुआ!' : 'Signed in with Google successfully!');
      onLoginSuccess(googleUser);
    }, 600);
  };

  // Email Login Handler
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      onShowToast(lang === 'hi' ? 'कृपया एक वैध ईमेल दर्ज करें।' : 'Please enter a valid email address.');
      return;
    }
    if (!passwordInput || passwordInput.length < 6) {
      onShowToast(lang === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowEmailModal(false);
      const username = emailInput.split('@')[0];
      const emailUser: UserProfile = {
        id: 'usr_e_' + Math.random().toString(36).substring(2, 9),
        name: username.charAt(0).toUpperCase() + username.slice(1),
        email: emailInput,
        credits: 100000,
        provider: 'email',
      };
      onShowToast(
        lang === 'hi'
          ? (isSignUp ? 'अकाउंट बन गया! स्वागत है।' : 'सफलतापूर्वक लॉग इन हुआ!')
          : (isSignUp ? 'Account created! Welcome to Zynqora.' : 'Signed in successfully!')
      );
      onLoginSuccess(emailUser);
    }, 600);
  };

  // Guest Bypass
  const handleGuestLogin = () => {
    const guestUser: UserProfile = {
      id: 'usr_guest_' + Math.random().toString(36).substring(2, 8),
      name: lang === 'hi' ? 'अतिथि क्रिएटर' : 'Guest Creator',
      email: 'guest@zynqora.ai',
      credits: 100000,
      provider: 'guest',
    };
    onShowToast(lang === 'hi' ? 'अतिथि मोड में स्वागत है!' : 'Welcome to Guest mode!');
    onLoginSuccess(guestUser);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0f0a1f] text-slate-100 flex flex-col justify-between items-center px-4 py-8 overflow-hidden font-sans selection:bg-purple-600 selection:text-white">
      {/* Ambient background light gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-purple-700/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[350px] h-[350px] rounded-full bg-fuchsia-600/10 blur-[110px]" />

      {/* Top Header: Language Switcher */}
      <div className="w-full max-w-md flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-purple-300/80">
            {lang === 'hi' ? 'स्टूडियो v2.5 ऑनलाइन' : 'STUDIO v2.5 READY'}
          </span>
        </div>

        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-[#1b1236]/80 hover:bg-[#251747] text-purple-200 text-xs font-medium transition-all shadow-sm active:scale-95"
        >
          <Globe className="w-3.5 h-3.5 text-purple-400" />
          <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
        </button>
      </div>

      {/* Center Section: Glowing Z Logo & Main Card */}
      <div className="w-full max-w-md flex flex-col items-center text-center my-auto py-6 z-10">
        {/* Large circular logo with glowing purple Z letter */}
        <div className="mb-6">
          <ZLogo size="xl" />
        </div>

        {/* Text */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2.5">
          {lang === 'hi' ? 'Welcome to Zynqora AI' : 'Welcome to Zynqora AI'}
        </h1>
        <p className="text-sm sm:text-base text-[#c084fc] font-medium max-w-sm mb-8 leading-relaxed">
          {lang === 'hi'
            ? 'आपका प्रीमियम AI साथी। आगे बढ़ने के लिए साइन इन करें।'
            : 'Your premium AI companion. Sign in to continue.'}
        </p>

        {/* Button Actions */}
        <div className="w-full space-y-3.5">
          {/* 1. White rounded button "Continue with Google" */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full min-h-[52px] bg-white hover:bg-slate-100 text-slate-900 font-bold text-base rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-black/30 hover:shadow-purple-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            {/* Google Multi-color G logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>{lang === 'hi' ? 'गूगल के साथ जारी रखें' : 'Continue with Google'}</span>
          </button>

          {/* 2. Dark purple bordered button "Continue with Email" with envelope icon */}
          <button
            onClick={() => setShowEmailModal(true)}
            disabled={isLoading}
            className="w-full min-h-[52px] bg-[#1a1033] hover:bg-[#231545] border-2 border-purple-500/40 hover:border-purple-400 text-purple-200 font-bold text-base rounded-2xl flex items-center justify-center gap-3 shadow-md hover:shadow-purple-900/40 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Mail className="w-5 h-5 text-purple-400" />
            <span>{lang === 'hi' ? 'ईमेल के साथ जारी रखें' : 'Continue with Email'}</span>
          </button>
        </div>

        {/* "or" divider */}
        <div className="w-full flex items-center my-6">
          <div className="flex-1 border-t border-purple-900/50" />
          <span className="px-3 text-xs uppercase tracking-wider text-purple-400/70 font-semibold">
            {lang === 'hi' ? 'या' : 'or'}
          </span>
          <div className="flex-1 border-t border-purple-900/50" />
        </div>

        {/* Fast guest access option */}
        <button
          onClick={handleGuestLogin}
          className="text-xs text-purple-300 hover:text-white underline underline-offset-4 font-semibold transition-colors flex items-center gap-1.5 py-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{lang === 'hi' ? 'अतिथि के रूप में अन्वेषण करें (बिना लॉगिन)' : 'Explore as Guest (Instant Access)'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom text */}
      <div className="w-full max-w-md text-center z-10 pt-4">
        <p className="text-[11px] leading-relaxed text-purple-300/60 font-normal">
          {lang === 'hi'
            ? 'जारी रखकर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं।'
            : 'By continuing, you agree to Terms of Service and Privacy Policy'}
        </p>
      </div>

      {/* Email Sign In / Sign Up Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#140c2e] border border-purple-500/40 p-6 shadow-2xl shadow-purple-950/80">
            {/* Close button */}
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-purple-950/60 border border-purple-800/40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <div className="inline-flex p-3 rounded-2xl bg-purple-900/40 border border-purple-500/30 text-purple-300 mb-3">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isSignUp
                  ? (lang === 'hi' ? 'नया अकाउंट बनाएं' : 'Create Zynqora Account')
                  : (lang === 'hi' ? 'ईमेल से साइन इन करें' : 'Sign in with Email')}
              </h2>
              <p className="text-xs text-purple-300/80 mt-1">
                {lang === 'hi'
                  ? 'तुरंत 100k क्रेडिट्स और सभी AI टूल्स पाएं'
                  : 'Get 100k bonus credits and access all 17 AI Studio tools'}
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5 text-left">
                  {lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="creator@zynqora.ai"
                    required
                    className="w-full bg-[#0a0618] border border-purple-500/40 focus:border-purple-400 text-sm text-white rounded-xl pl-10 pr-3 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5 text-left">
                  {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#0a0618] border border-purple-500/40 focus:border-purple-400 text-sm text-white rounded-xl pl-10 pr-3 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-900/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>
                      {isSignUp
                        ? (lang === 'hi' ? 'अकाउंट बनाएं और शुरू करें' : 'Create Account & Enter')
                        : (lang === 'hi' ? 'साइन इन करें' : 'Sign In')}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Toggle sign in / sign up */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-purple-400 hover:text-purple-200 transition-colors"
              >
                {isSignUp
                  ? (lang === 'hi' ? 'पहले से अकाउंट है? साइन इन करें' : 'Already have an account? Sign In')
                  : (lang === 'hi' ? 'अकाउंट नहीं है? नया बनाएं' : "Don't have an account? Sign Up")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
