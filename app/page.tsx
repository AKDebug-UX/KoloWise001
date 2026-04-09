'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  LogOut, 
  Wallet,
  ShieldCheck,
  BrainCircuit,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

// --- Types ---
interface Group {
  id: string;
  name: string;
  contributionAmount: number;
  cycleDuration: string;
  members: string[];
  createdBy: string;
  status: 'active' | 'completed';
}

interface Contribution {
  id: string;
  userId: string;
  amount: number;
  status: 'paid' | 'pending' | 'late';
  timestamp: any;
}

// --- Components ---

const Login = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f0] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[32px] shadow-xl p-10 text-center border border-gray-100"
      >
        <div className="w-20 h-20 bg-[#5A5A40] rounded-full flex items-center justify-center mx-auto mb-6">
          <BrainCircuit className="text-white w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2 tracking-tight">KoloWise</h1>
        <p className="text-[#5A5A40] font-medium mb-8 italic">AI-powered Ajo Intelligence</p>
        
        <div className="space-y-4 mb-10 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#5A5A40] mt-1 shrink-0" />
            <p className="text-sm text-gray-600">Secure and transparent contribution tracking.</p>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#5A5A40] mt-1 shrink-0" />
            <p className="text-sm text-gray-600">AI-driven trust scoring for all members.</p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#5A5A40] mt-1 shrink-0" />
            <p className="text-sm text-gray-600">Predictive default alerts to protect your funds.</p>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-4 bg-[#1a1a1a] text-white rounded-2xl font-semibold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>
      </motion.div>
    </div>
  );
};

const CreateGroupModal = ({ isOpen, onClose, userId }: { isOpen: boolean, onClose: () => void, userId: string }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('weekly');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'groups'), {
        name,
        contributionAmount: Number(amount),
        cycleDuration: duration,
        members: [userId],
        createdBy: userId,
        payoutOrder: [userId],
        status: 'active',
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'groups');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#1a1a1a]">Start New Ajo</h2>
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Group Name</label>
            <input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
              placeholder="e.g. Campus Savings"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Contribution Amount (₦)</label>
            <input 
              required
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
              placeholder="5000"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Cycle Duration</label>
            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-[#5A5A40] text-white rounded-2xl font-semibold hover:bg-[#4a4a35] transition-all shadow-lg"
            >
              Create Group
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function Dashboard() {
  const { user, loading, isAuthReady } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user || !isAuthReady) return;

    const q = query(collection(db, 'groups'), where('members', 'array-contains', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const g = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Group));
      setGroups(g);
      if (g.length > 0 && !selectedGroup) setSelectedGroup(g[0]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'groups'));

    return () => unsubscribe();
  }, [user, isAuthReady]);

  useEffect(() => {
    if (!selectedGroup) return;

    const q = query(
      collection(db, `groups/${selectedGroup.id}/contributions`),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setContributions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contribution)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, `groups/${selectedGroup.id}/contributions`));

    return () => unsubscribe();
  }, [selectedGroup]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f0]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full"
      />
    </div>
  );

  if (!user) return <Login />;

  // Mock AI Data for demo
  const riskData = [
    { name: 'Low Risk', value: 85, color: '#10b981' },
    { name: 'Medium Risk', value: 10, color: '#f59e0b' },
    { name: 'High Risk', value: 5, color: '#ef4444' },
  ];

  const paymentTrend = [
    { day: 'Mon', amount: 4000 },
    { day: 'Tue', amount: 3000 },
    { day: 'Wed', amount: 2000 },
    { day: 'Thu', amount: 2780 },
    { day: 'Fri', amount: 1890 },
    { day: 'Sat', amount: 2390 },
    { day: 'Sun', amount: 3490 },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5A5A40] rounded-xl flex items-center justify-center">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">KoloWise</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user.displayName}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold">Trust Score: 98</p>
            </div>
            <button 
              onClick={() => signOut(auth)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar / Group List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">My Groups</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-1 bg-[#5A5A40] text-white rounded-lg hover:bg-[#4a4a35] transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {groups.map(group => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  selectedGroup?.id === group.id 
                  ? 'bg-white border-[#5A5A40] shadow-md' 
                  : 'bg-transparent border-transparent hover:bg-white/50'
                }`}
              >
                <p className="font-bold text-sm truncate">{group.name}</p>
                <p className="text-xs text-gray-500 mt-1">₦{group.contributionAmount.toLocaleString()} • {group.cycleDuration}</p>
              </button>
            ))}
            {groups.length === 0 && (
              <div className="p-8 text-center bg-white/50 rounded-[32px] border border-dashed border-gray-300">
                <p className="text-xs text-gray-400 font-medium">No groups yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {selectedGroup ? (
            <>
              {/* Group Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Pot</span>
                  </div>
                  <p className="text-3xl font-bold">₦{(selectedGroup.contributionAmount * selectedGroup.members.length).toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium">Next payout: <span className="text-[#5A5A40]">Apr 15</span></p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Members</span>
                  </div>
                  <p className="text-3xl font-bold">{selectedGroup.members.length}</p>
                  <p className="text-[10px] text-green-600 mt-2 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 100% Active
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-[#1a1a1a] p-6 rounded-[32px] shadow-lg text-white"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 text-white rounded-xl">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">AI Risk Level</span>
                  </div>
                  <p className="text-3xl font-bold">Low</p>
                  <p className="text-[10px] text-white/60 mt-2 font-medium">98% probability of full cycle completion</p>
                </motion.div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <PieChartIcon className="w-4 h-4 text-[#5A5A40]" />
                      Member Risk Distribution
                    </h3>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    {riskData.map(item => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#5A5A40]" />
                      Contribution Activity
                    </h3>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={paymentTrend}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="day" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 600, fill: '#9ca3af' }} 
                        />
                        <YAxis hide />
                        <Tooltip 
                          cursor={{ fill: '#f9fafb' }}
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="amount" fill="#5A5A40" radius={[6, 6, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-bold">Recent Contributions</h3>
                  <button className="text-xs font-bold text-[#5A5A40] hover:underline">View All</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {contributions.length > 0 ? contributions.map(c => (
                    <div key={c.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Member Contribution</p>
                          <p className="text-[10px] text-gray-400 font-medium">
                            {c.timestamp?.toDate().toLocaleDateString()} at {c.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">₦{c.amount.toLocaleString()}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          c.status === 'paid' ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <div className="p-12 text-center">
                      <p className="text-sm text-gray-400">No contributions yet</p>
                      <button 
                        onClick={async () => {
                          if (!user || !selectedGroup) return;
                          try {
                            await addDoc(collection(db, `groups/${selectedGroup.id}/contributions`), {
                              userId: user.uid,
                              amount: selectedGroup.contributionAmount,
                              status: 'paid',
                              cycleIndex: 1,
                              groupId: selectedGroup.id,
                              timestamp: serverTimestamp(),
                            });
                          } catch (e) {
                            handleFirestoreError(e, OperationType.CREATE, 'contributions');
                          }
                        }}
                        className="mt-4 text-xs font-bold text-[#5A5A40] underline"
                      >
                        Simulate Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center bg-white rounded-[48px] shadow-sm border border-gray-100 p-12">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-gray-200" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to KoloWise</h2>
              <p className="text-gray-500 max-w-xs mb-8">Select a group from the sidebar or create a new one to start your Ajo journey.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#5A5A40] text-white rounded-2xl font-semibold hover:bg-[#4a4a35] transition-all shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Group
              </button>
            </div>
          )}
        </div>
      </main>

      <CreateGroupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userId={user.uid} 
      />
    </div>
  );
}
