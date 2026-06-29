"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, type FormEvent } from "react";
import { validateWaitlistForm, type WaitlistFormData, type FormErrors } from "@/lib/validation";

const roles = ["Agent", "GM / Front Office", "Coach", "Player", "Other"];
const leagueOptions = ["NBL", "NBL1", "NCAA / Other"];

export default function WaitlistForm() {
  const [form, setForm] = useState<WaitlistFormData>({
    full_name: "",
    email: "",
    phone: "+61 ",
    role: "",
    leagues: [],
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof WaitlistFormData>(
    key: K,
    value: WaitlistFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error on change
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof FormErrors];
        return next;
      });
    }
  };

  const toggleLeague = (league: string) => {
    setForm((prev) => ({
      ...prev,
      leagues: prev.leagues.includes(league)
        ? prev.leagues.filter((l) => l !== league)
        : [...prev.leagues, league],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypotRef.current?.value) {
      // Silently succeed to fool bots
      setStatus("success");
      return;
    }

    const validationErrors = validateWaitlistForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrors({});
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setErrorMessage("Too many attempts. Please wait a moment and try again.");
        setStatus("error");
      } else {
        // Gracefully handle duplicate emails as success
        if (data.code === "23505") {
          setStatus("success");
        } else {
          setErrorMessage(
            data.message || "Something went wrong. Please try again."
          );
          setStatus("error");
        }
      }
    } catch {
      setErrorMessage("Couldn't connect. Please check your internet and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        className="card-dark p-10 md:p-14 text-center max-w-xl mx-auto relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Celebration glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-court/5 to-transparent pointer-events-none" />

        {/* Reticle accent */}
        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-court/10 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
          >
            <span className="text-4xl">🎯</span>
          </motion.div>
          <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-3">
            You&apos;re locked in.
          </h3>
          <p className="body-text text-base md:text-lg">
            We&apos;ll be in touch before tip-off.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="card-dark p-8 md:p-10 max-w-xl mx-auto relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      noValidate
    >
      {/* Honeypot — hidden from real users */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="waitlist-full-name" className="block text-sm font-medium text-ash mb-1.5">
            Full Name <span className="text-orange-court">*</span>
          </label>
          <input
            id="waitlist-full-name"
            type="text"
            className={`input-field ${errors.full_name ? "input-error" : ""}`}
            placeholder="Your full name"
            value={form.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            autoComplete="name"
          />
          <AnimatePresence>
            {errors.full_name && (
              <motion.p
                className="text-red-400 text-xs mt-1.5"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {errors.full_name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="waitlist-email" className="block text-sm font-medium text-ash mb-1.5">
            Email <span className="text-orange-court">*</span>
          </label>
          <input
            id="waitlist-email"
            type="email"
            className={`input-field ${errors.email ? "input-error" : ""}`}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            autoComplete="email"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                className="text-red-400 text-xs mt-1.5"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="waitlist-phone" className="block text-sm font-medium text-ash mb-1.5">
            Phone <span className="text-orange-court">*</span>
          </label>
          <input
            id="waitlist-phone"
            type="tel"
            className={`input-field ${errors.phone ? "input-error" : ""}`}
            placeholder="+61 4XX XXX XXX"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            autoComplete="tel"
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                className="text-red-400 text-xs mt-1.5"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* I am a… */}
        <div>
          <label htmlFor="waitlist-role" className="block text-sm font-medium text-ash mb-1.5">
            I am a… <span className="text-orange-court">*</span>
          </label>
          <select
            id="waitlist-role"
            className={`select-field ${errors.role ? "input-error" : ""}`}
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
          >
            <option value="" disabled>
              Select your role
            </option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <AnimatePresence>
            {errors.role && (
              <motion.p
                className="text-red-400 text-xs mt-1.5"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {errors.role}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* League interest */}
        <fieldset>
          <legend className="block text-sm font-medium text-ash mb-2">
            League interest{" "}
            <span className="text-steel text-xs">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {leagueOptions.map((league) => {
              const checked = form.leagues.includes(league);
              return (
                <label
                  key={league}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 text-sm font-body ${
                    checked
                      ? "border-orange-court/60 bg-orange-court/10 text-white"
                      : "border-[#1E2130] bg-carbon text-ash hover:border-steel/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleLeague(league)}
                  />
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                      checked
                        ? "bg-orange-court border-orange-court"
                        : "border-[#1E2130]"
                    }`}
                  >
                    {checked && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  {league}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Optional message */}
        <div>
          <label htmlFor="waitlist-message" className="block text-sm font-medium text-ash mb-1.5">
            Message{" "}
            <span className="text-steel text-xs">(optional)</span>
          </label>
          <textarea
            id="waitlist-message"
            className="input-field resize-none h-24"
            placeholder="Tell us what you're looking for…"
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="waitlist-consent"
            type="checkbox"
            className="checkbox-field mt-0.5"
            checked={form.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
          />
          <label
            htmlFor="waitlist-consent"
            className={`text-sm leading-snug cursor-pointer ${
              errors.consent ? "text-red-400" : "text-ash"
            }`}
          >
            I agree to be contacted by Scout AU about early access.{" "}
            <span className="text-orange-court">*</span>
          </label>
        </div>
        <AnimatePresence>
          {errors.consent && (
            <motion.p
              className="text-red-400 text-xs -mt-3 ml-8"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {errors.consent}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {status === "error" && errorMessage && (
            <motion.div
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          id="waitlist-submit"
          className="w-full inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-expanded rounded-xl px-7 py-4 text-sm bg-orange-court text-white hover:bg-orange-court-hover active:scale-[0.98] transition-all duration-300 shadow-lg shadow-orange-court/20 hover:shadow-orange-court/30 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-court"
        >
          {status === "loading" ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
              Joining…
            </>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>
    </motion.form>
  );
}
