'use client';

import { motion } from 'motion/react';
import { BrainCircuit, ShieldCheck, TrendingUp, AlertTriangle, ArrowRight, Users, Wallet, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#f5f5f0]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5A5A40] rounded-xl flex items-center justify-center">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">KoloWise</span>
          </div>
          <button 
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-[#1a1a1a] text-white rounded-full font-semibold hover:bg-black transition-all active:scale-95 text-sm"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5A5A40] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5A5A40]"></span>
              </span>
              Modernizing Tradition
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight mb-6">
              Ajo, Reimagined with <span className="text-[#5A5A40] italic">Intelligence.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              KoloWise brings transparency and AI-driven trust to traditional Nigerian thrift systems. Manage contributions, predict risks, and build wealth together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 bg-[#1a1a1a] text-white rounded-2xl font-semibold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-[0.98]"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex -space-x-3 items-center px-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#f5f5f0] bg-gray-200 overflow-hidden">
                    <Image 
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      width={40} 
                      height={40} 
                      alt="User"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
                <span className="pl-6 text-sm font-bold text-gray-500">+2k members</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-[64px] shadow-2xl overflow-hidden border border-gray-100 p-8 relative">
               {/* Decorative elements */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#5A5A40]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-3xl" />
               
               {/* Mock UI elements */}
               <div className="relative space-y-6">
                 <div className="bg-[#f5f5f0] p-6 rounded-3xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#5A5A40]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Active Group</span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-md">98% TRUST</span>
                    </div>
                    <div className="text-2xl font-bold">Campus Savings Pool</div>
                    <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#5A5A40] w-3/4" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <Wallet className="w-5 h-5 text-blue-500 mb-3" />
                      <div className="text-xl font-bold">₦250k</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">Total Pot</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-3xl shadow-lg text-white">
                      <TrendingUp className="w-5 h-5 text-[#5A5A40] mb-3" />
                      <div className="text-xl font-bold">Low Risk</div>
                      <div className="text-[10px] text-white/40 font-bold uppercase">AI Prediction</div>
                    </div>
                 </div>

                 <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">Payment Verified</div>
                        <div className="text-[10px] text-gray-400">Adebayo just contributed ₦5,000</div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-4">Why Choose KoloWise?</h2>
            <p className="text-gray-500">We combine the community spirit of Ajo with the power of modern financial technology.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Absolute Transparency",
                desc: "Every contribution is logged on a secure, immutable ledger. No more disputes over who paid what."
              },
              {
                icon: <BrainCircuit className="w-8 h-8" />,
                title: "AI Risk Prediction",
                desc: "Our smart algorithms analyze payment patterns to predict potential defaults before they happen."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Trust Scoring",
                desc: "Build your financial reputation. Higher trust scores unlock better group opportunities and features."
              }
            ].map((feature, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-[#f5f5f0] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#5A5A40] group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 bg-[#1a1a1a] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">₦50M+</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Total Contributions</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">15k+</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Active Members</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.8%</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Success Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#5A5A40] rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start saving smarter?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Join thousands of Nigerians using KoloWise to achieve their financial goals through community savings.</p>
            <button 
              onClick={onGetStarted}
              className="px-10 py-5 bg-white text-[#1a1a1a] rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-xl active:scale-95"
            >
              Start Your Ajo Journey
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#5A5A40] rounded-lg flex items-center justify-center">
              <BrainCircuit className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">KoloWise</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 KoloWise Intelligence. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-[#1a1a1a]">Privacy</a>
            <a href="#" className="hover:text-[#1a1a1a]">Terms</a>
            <a href="#" className="hover:text-[#1a1a1a]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
