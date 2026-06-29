"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoutLogo from "@/components/ui/ScoutLogo";

interface WaitlistEntry {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  leagues: string[];
  message: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [fetching, setFetching] = useState(false);

  // Check if session token exists in sessionStorage (clears when tab closes)
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthorized(true);
      fetchEntries(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        sessionStorage.setItem("admin_token", data.token);
        setIsAuthorized(true);
        fetchEntries(data.token);
      } else {
        setError(data.message || "Invalid password.");
      }
    } catch {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEntries = async (token: string) => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/waitlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
      } else {
        // Token expired or invalid
        handleLogout();
      }
    } catch (err) {
      console.error("Failed to fetch entries", err);
    } finally {
      setFetching(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthorized(false);
    setEntries([]);
    setPassword("");
  };

  const exportToCSV = () => {
    if (entries.length === 0) return;

    const headers = ["ID", "Joined At", "Full Name", "Email", "Phone", "Role", "Leagues Interest", "Optional Message"];
    const rows = entries.map((entry) => [
      entry.id,
      new Date(entry.created_at).toLocaleString("en-AU"),
      entry.full_name,
      entry.email,
      entry.phone,
      entry.role,
      (entry.leagues || []).join(", "),
      entry.message.replace(/"/g, '""'), // Escape quotes for CSV
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `scout_au_waitlist_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-carbon text-white font-body py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Background Reticle */}
      <div className="absolute inset-0 bg-reticle opacity-[0.03] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 court-lines-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center border-b border-[#1E2130] pb-8 mb-10">
          <ScoutLogo size="default" />
          <div className="flex items-center gap-2">
            <span className="bg-orange-court/10 border border-orange-court/20 text-orange-court font-display font-bold uppercase tracking-expanded text-xs px-3 py-1 rounded-full">
              Admin Portal
            </span>
            {isAuthorized && (
              <button
                onClick={handleLogout}
                className="text-steel hover:text-white text-xs font-medium transition-colors ml-4 uppercase tracking-expanded"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isAuthorized ? (
            /* LOGIN STATE */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto card-dark p-8 md:p-10"
            >
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-6">
                Authorize Access
              </h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-pass" className="block text-sm font-medium text-ash mb-1.5">
                    Admin Password
                  </label>
                  <input
                    id="admin-pass"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••••••"
                  />
                </div>
                {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center font-display font-bold uppercase tracking-expanded rounded-xl px-7 py-3.5 text-sm bg-orange-court text-white hover:bg-orange-court-hover transition-colors disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Enter Dashboard"}
                </button>
              </form>
            </motion.div>
          ) : (
            /* DASHBOARD STATE */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-display font-black text-3xl uppercase tracking-tight text-white">
                    Waitlist Entries
                  </h2>
                  <p className="text-ash text-sm font-body mt-1">
                    {fetching ? "Refreshing signups..." : `Total registered leads: ${entries.length}`}
                  </p>
                </div>

                {entries.length > 0 && (
                  <button
                    onClick={exportToCSV}
                    className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-expanded rounded-xl px-5 py-3 text-xs bg-carbon-light border border-[#1E2130] text-white hover:border-orange-court/40 hover:text-orange-court transition-all"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Export CSV
                  </button>
                )}
              </div>

              {/* Table / Content List */}
              <div className="card-dark overflow-hidden border border-[#1E2130] bg-carbon-light/40">
                {fetching && entries.length === 0 ? (
                  <div className="py-20 text-center text-steel">
                    <svg className="animate-spin h-8 w-8 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" className="opacity-75" />
                    </svg>
                    Loading list...
                  </div>
                ) : entries.length === 0 ? (
                  <div className="py-20 text-center text-ash text-sm">
                    No signups found yet. Invite users to join the waitlist!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#1E2130] text-xs font-display uppercase tracking-expanded text-steel">
                          <th className="py-4 px-6">Joined Date</th>
                          <th className="py-4 px-6">Name</th>
                          <th className="py-4 px-6">Email</th>
                          <th className="py-4 px-6">Phone</th>
                          <th className="py-4 px-6">Role</th>
                          <th className="py-4 px-6">Leagues</th>
                          <th className="py-4 px-6">Message</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E2130]/60 text-sm font-body text-ash">
                        {entries.map((entry) => (
                          <tr key={entry.id} className="hover:bg-carbon-lighter/25 transition-colors">
                            <td className="py-4 px-6 whitespace-nowrap text-xs text-steel">
                              {new Date(entry.created_at).toLocaleDateString("en-AU", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
                              {entry.full_name}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap text-orange-court hover:underline">
                              <a href={`mailto:${entry.email}`}>{entry.email}</a>
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap text-xs">
                              {entry.phone}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className="bg-carbon border border-[#1E2130] text-xs font-medium px-2.5 py-1 rounded-lg text-white">
                                {entry.role}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {(entry.leagues || []).map((league) => (
                                  <span key={league} className="text-[10px] bg-orange-court/10 border border-orange-court/20 text-orange-court px-1.5 py-0.5 rounded font-display uppercase">
                                    {league}
                                  </span>
                                ))}
                                {(!entry.leagues || entry.leagues.length === 0) && (
                                  <span className="text-xs text-steel">—</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6 max-w-xs truncate text-xs text-ash" title={entry.message}>
                              {entry.message || <span className="text-steel italic">None</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
