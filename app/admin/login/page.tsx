"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, LifeBuoy, LockKeyhole, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const recoveryMessageIsSuccess = recoveryMessage?.includes("successfully") ?? false;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.set("password", password);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message ?? "Login failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRecoverySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsRecovering(true);
    setRecoveryMessage(null);

    const formData = new FormData();
    formData.set("recoveryCode", recoveryCode);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);

    try {
      const response = await fetch("/api/admin/recover", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.message ?? "Recovery failed.");
      }

      setRecoveryMessage("Password reset successfully. You are signed in now.");
      setPassword("");
      setRecoveryCode("");
      setNewPassword("");
      setConfirmPassword("");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      setRecoveryMessage(error instanceof Error ? error.message : "Recovery failed.");
    } finally {
      setIsRecovering(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_60%)] px-4 text-slate-100">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
          <LockKeyhole className="h-4 w-4" />
          Admin Access
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">Sign in to the dashboard</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Use the admin password to manage projects and shop content. If you&apos;ve lost
          access, use the recovery form below.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Enter the admin password"
              required
            />
          </label>

          {message ? (
            <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4 text-cyan-200" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">
              Recovery
            </h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            If you forgot the password, enter the recovery code and choose a new password.
          </p>

          <form className="mt-4 space-y-4" onSubmit={handleRecoverySubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Recovery code</span>
              <input
                type="password"
                value={recoveryCode}
                onChange={(event) => setRecoveryCode(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Enter recovery code"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">New password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Choose a new password"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Confirm new password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Repeat the new password"
                required
              />
            </label>

            {recoveryMessage ? (
              <p
                className={`rounded-2xl px-4 py-3 text-sm ${
                  recoveryMessageIsSuccess
                    ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                    : "border border-rose-400/20 bg-rose-500/10 text-rose-100"
                }`}
              >
                {recoveryMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isRecovering}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <KeyRound className="h-4 w-4" />
              {isRecovering ? "Recovering..." : "Recover access"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
