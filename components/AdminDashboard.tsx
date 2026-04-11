"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  KeyRound,
  LogOut,
  Plus,
  Save,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";
import type { ProductRecord, ProjectRecord } from "@/lib/content-store";

type AdminDashboardProps = {
  initialProjects: ProjectRecord[];
  initialProducts: ProductRecord[];
};

type ProjectFormState = {
  title: string;
  category: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  featured: boolean;
};

type ProductFormState = {
  name: string;
  category: string;
  sku: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  specsText: string;
  benefitsText: string;
  featured: boolean;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type RecoveryFormState = {
  recoveryCode: string;
  newPassword: string;
  confirmPassword: string;
  recoveryHint: string;
};

const emptyProjectForm: ProjectFormState = {
  title: "",
  category: "",
  description: "",
  mediaType: "image",
  mediaUrl: "",
  featured: false,
};

const emptyProductForm: ProductFormState = {
  name: "",
  category: "",
  sku: "",
  subtitle: "",
  description: "",
  imageUrl: "",
  specsText: "",
  benefitsText: "",
  featured: false,
};

const emptyPasswordForm: PasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const emptyRecoveryForm: RecoveryFormState = {
  recoveryCode: "",
  newPassword: "",
  confirmPassword: "",
  recoveryHint: "",
};

export default function AdminDashboard({
  initialProjects,
  initialProducts,
}: AdminDashboardProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState<"projects" | "products">("projects");
  const [projectForm, setProjectForm] = useState<ProjectFormState>(emptyProjectForm);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>(emptyPasswordForm);
  const [recoveryForm, setRecoveryForm] = useState<RecoveryFormState>(emptyRecoveryForm);
  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20";
  const fileClass =
    "block w-full rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950";

  const summaryCards = useMemo(
    () => [
      { label: "Projects", value: projects.length },
      { label: "Products", value: products.length },
      { label: "Featured items", value: [...projects, ...products].filter((item) => item.featured).length },
    ],
    [projects, products],
  );

  const isProjectEditing = editingProjectId !== null;
  const isProductEditing = editingProductId !== null;

  async function submitProjectForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const formData = new FormData(event.currentTarget);
    const endpoint = editingProjectId
      ? `/api/admin/projects/${editingProjectId}`
      : "/api/admin/projects";
    const method = editingProjectId ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error((await response.json()).message ?? "Failed to save project.");
      }

      const payload = (await response.json()) as { project: ProjectRecord };
      setProjects((current) => {
        if (editingProjectId) {
          return current.map((project) =>
            project.id === editingProjectId ? payload.project : project,
          );
        }

        return [payload.project, ...current];
      });
      resetProjectForm();
      setStatusMessage("Project saved successfully.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Unable to save project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function submitProductForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const formData = new FormData(event.currentTarget);
    const endpoint = editingProductId
      ? `/api/admin/products/${editingProductId}`
      : "/api/admin/products";
    const method = editingProductId ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error((await response.json()).message ?? "Failed to save product.");
      }

      const payload = (await response.json()) as { product: ProductRecord };
      setProducts((current) => {
        if (editingProductId) {
          return current.map((product) =>
            product.id === editingProductId ? payload.product : product,
          );
        }

        return [payload.product, ...current];
      });
      resetProductForm();
      setStatusMessage("Product saved successfully.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Unable to save product.");
    } finally {
      setIsSaving(false);
    }
  }

  function editProject(project: ProjectRecord) {
    setActiveTab("projects");
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description,
      mediaType: project.mediaType,
      mediaUrl: project.mediaUrl,
      featured: project.featured,
    });
  }

  function editProduct(product: ProductRecord) {
    setActiveTab("products");
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      category: product.category,
      sku: product.sku,
      subtitle: product.subtitle,
      description: product.description,
      imageUrl: product.imageUrl,
      specsText: formatSpecs(product.specs),
      benefitsText: product.benefits.join("\n"),
      featured: product.featured,
    });
  }

  async function deleteProject(id: string) {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error((await response.json()).message ?? "Failed to delete project.");
      }

      setProjects((current) => current.filter((project) => project.id !== id));
      if (editingProjectId === id) {
        resetProjectForm();
      }
      setStatusMessage("Project deleted.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Unable to delete project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteProduct(id: string) {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error((await response.json()).message ?? "Failed to delete product.");
      }

      setProducts((current) => current.filter((product) => product.id !== id));
      if (editingProductId === id) {
        resetProductForm();
      }
      setStatusMessage("Product deleted.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Unable to delete product.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function submitPasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSecurityMessage(null);
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/password", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error((await response.json()).message ?? "Failed to change password.");
      }

      setPasswordForm(emptyPasswordForm);
      setSecurityMessage("Password updated successfully.");
      router.refresh();
    } catch (error) {
      setSecurityMessage(error instanceof Error ? error.message : "Unable to change password.");
    } finally {
      setIsSaving(false);
    }
  }

  async function submitRecoveryCodeChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSecurityMessage(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/security/recovery", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message ?? "Failed to update recovery settings.");
      }

      setRecoveryForm(emptyRecoveryForm);
      setSecurityMessage("Recovery code updated successfully.");
    } catch (error) {
      setSecurityMessage(error instanceof Error ? error.message : "Unable to update recovery settings.");
    } finally {
      setIsSaving(false);
    }
  }

  function resetProjectForm() {
    setProjectForm(emptyProjectForm);
    setEditingProjectId(null);
  }

  function resetProductForm() {
    setProductForm(emptyProductForm);
    setEditingProductId(null);
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
                Content Studio
              </p>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Manage the public projects gallery and the shop catalog from one place.
                Admin can add, edit, delete, and upload media for content without touching
                the site code.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {card.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-white">{card.value}</p>
              </div>
            ))}
          </div>

          {statusMessage ? (
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              <CheckCircle2 className="h-4 w-4" />
              {statusMessage}
            </div>
          ) : null}

          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                  <KeyRound className="h-3.5 w-3.5" />
                  Security
                </div>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  Password and recovery controls
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-slate-400">
                  Update the login password after you&apos;ve signed in, and refresh the
                  recovery code in case you need to regain access later.
                </p>
              </div>
            </div>

            {securityMessage ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                <ShieldAlert className="h-4 w-4" />
                {securityMessage}
              </div>
            ) : null}

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <form className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5" onSubmit={submitPasswordChange}>
                <h3 className="text-lg font-semibold text-white">Change password</h3>
                <p className="text-sm text-slate-400">
                  Use this when you are already logged in and want to rotate the admin password.
                </p>

                <Field label="Current password">
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={(event) =>
                      setPasswordForm((current) => ({
                        ...current,
                        currentPassword: event.target.value,
                      }))
                    }
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="New password">
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(event) =>
                      setPasswordForm((current) => ({
                        ...current,
                        newPassword: event.target.value,
                      }))
                    }
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Confirm new password">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(event) =>
                      setPasswordForm((current) => ({
                        ...current,
                        confirmPassword: event.target.value,
                      }))
                    }
                    className={inputClass}
                    required
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <KeyRound className="h-4 w-4" />
                  Update password
                </button>
              </form>

              <form className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5" onSubmit={submitRecoveryCodeChange}>
                <h3 className="text-lg font-semibold text-white">Recovery settings</h3>
                <p className="text-sm text-slate-400">
                  Set a new recovery code and hint for future account recovery.
                </p>

                <Field label="New recovery code">
                  <input
                    type="password"
                    name="recoveryCode"
                    value={recoveryForm.recoveryCode}
                    onChange={(event) =>
                      setRecoveryForm((current) => ({
                        ...current,
                        recoveryCode: event.target.value,
                      }))
                    }
                    className={inputClass}
                    required
                  />
                </Field>

                <Field label="Recovery hint">
                  <input
                    type="text"
                    name="recoveryHint"
                    value={recoveryForm.recoveryHint}
                    onChange={(event) =>
                      setRecoveryForm((current) => ({
                        ...current,
                        recoveryHint: event.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Optional note to help remember it"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/15 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ShieldAlert className="h-4 w-4" />
                  Update recovery code
                </button>
              </form>
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === "projects"
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-white/10 text-slate-200 hover:bg-white/15"
              }`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === "products"
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-white/10 text-slate-200 hover:bg-white/15"
              }`}
            >
              Shop products
            </button>
          </div>

          {activeTab === "projects" ? (
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Projects</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Create and manage gallery items for the public projects page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4" />
                    New
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {projects.map((project) => (
                    <article
                      key={project.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      {project.mediaType === "image" ? (
                        <img
                          src={project.mediaUrl}
                          alt={project.title}
                          className="h-44 w-full object-cover"
                        />
                      ) : (
                        <video
                          src={project.mediaUrl}
                          className="h-44 w-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                      )}
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                          {project.category}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-white">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => editProject(project)}
                            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                          >
                            <Save className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProject(project.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-500/20"
                            disabled={isSaving}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
                <h2 className="text-xl font-semibold text-white">
                  {isProjectEditing ? "Edit project" : "Add project"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {isProjectEditing
                    ? "Update the selected project and upload a new image or video if needed."
                    : "Create a new project entry and attach media."}
                </p>

                <form className="mt-6 space-y-4" onSubmit={submitProjectForm}>
                  <Field label="Title">
                    <input
                      name="title"
                      value={projectForm.title}
                      onChange={(event) =>
                        setProjectForm((current) => ({ ...current, title: event.target.value }))
                      }
                      className={inputClass}
                      required
                    />
                  </Field>

                  <Field label="Category">
                    <input
                      name="category"
                      value={projectForm.category}
                      onChange={(event) =>
                        setProjectForm((current) => ({ ...current, category: event.target.value }))
                      }
                      className={inputClass}
                      placeholder="Residential construction"
                      required
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      name="description"
                      value={projectForm.description}
                      onChange={(event) =>
                        setProjectForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      className={`${inputClass} min-h-28`}
                      required
                    />
                  </Field>

                  <Field label="Media type">
                    <select
                      name="mediaType"
                      value={projectForm.mediaType}
                      onChange={(event) =>
                        setProjectForm((current) => ({
                          ...current,
                          mediaType: event.target.value as "image" | "video",
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </Field>

                  <Field label="Media URL">
                    <input
                      name="mediaUrl"
                      value={projectForm.mediaUrl}
                      onChange={(event) =>
                        setProjectForm((current) => ({
                          ...current,
                          mediaUrl: event.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="/images/project1.png"
                    />
                  </Field>

                  <Field label="Upload media">
                    <input
                      name="mediaFile"
                      type="file"
                      accept="image/*,video/*"
                      className={fileClass}
                    />
                  </Field>

                  <label className="flex items-center gap-3 text-sm text-slate-200">
                    <input
                      name="featured"
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(event) =>
                        setProjectForm((current) => ({
                          ...current,
                          featured: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-white/20 bg-white/10"
                    />
                    Mark as featured
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Upload className="h-4 w-4" />
                      {isProjectEditing ? "Update project" : "Save project"}
                    </button>
                    {isProjectEditing ? (
                      <button
                        type="button"
                        onClick={resetProjectForm}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </form>
              </aside>
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Shop products</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Manage product content, specs, benefits, and product photos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetProductForm}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4" />
                    New
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {products.map((product) => (
                    <article
                      key={product.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-44 w-full object-cover"
                      />
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                          {product.category}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-white">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {product.subtitle}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => editProduct(product)}
                            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                          >
                            <Save className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProduct(product.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-500/20"
                            disabled={isSaving}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
                <h2 className="text-xl font-semibold text-white">
                  {isProductEditing ? "Edit product" : "Add product"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Use line breaks for benefits and `Label | Value` for specs.
                </p>

                <form className="mt-6 space-y-4" onSubmit={submitProductForm}>
                  <Field label="Name">
                    <input
                      name="name"
                      value={productForm.name}
                      onChange={(event) =>
                        setProductForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className={inputClass}
                      required
                    />
                  </Field>

                  <Field label="Category">
                    <input
                      name="category"
                      value={productForm.category}
                      onChange={(event) =>
                        setProductForm((current) => ({ ...current, category: event.target.value }))
                      }
                      className={inputClass}
                      required
                    />
                  </Field>

                  <Field label="SKU">
                    <input
                      name="sku"
                      value={productForm.sku}
                      onChange={(event) =>
                        setProductForm((current) => ({ ...current, sku: event.target.value }))
                      }
                      className="input-field"
                      required
                    />
                  </Field>

                  <Field label="Subtitle">
                    <input
                      name="subtitle"
                      value={productForm.subtitle}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          subtitle: event.target.value,
                        }))
                      }
                      className="input-field"
                      required
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      className={`${inputClass} min-h-28`}
                      required
                    />
                  </Field>

                  <Field label="Image URL">
                    <input
                      name="imageUrl"
                      value={productForm.imageUrl}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          imageUrl: event.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="/images/product1.png"
                    />
                  </Field>

                  <Field label="Upload image">
                    <input
                      name="imageFile"
                      type="file"
                      accept="image/*"
                      className={fileClass}
                    />
                  </Field>

                  <Field label="Specs">
                    <textarea
                      name="specs"
                      value={productForm.specsText}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          specsText: event.target.value,
                        }))
                      }
                      className={`${inputClass} min-h-32`}
                      placeholder={"Brand | Obi One Premium\nFilter Type | Spin-On"}
                    />
                  </Field>

                  <Field label="Benefits">
                    <textarea
                      name="benefits"
                      value={productForm.benefitsText}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          benefitsText: event.target.value,
                        }))
                      }
                      className={`${inputClass} min-h-32`}
                      placeholder={"High-efficiency filtration media captures fine particles\nMeets or exceeds OEM specifications"}
                    />
                  </Field>

                  <label className="flex items-center gap-3 text-sm text-slate-200">
                    <input
                      name="featured"
                      type="checkbox"
                      checked={productForm.featured}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          featured: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-white/20 bg-white/10"
                    />
                    Mark as featured
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Upload className="h-4 w-4" />
                      {isProductEditing ? "Update product" : "Save product"}
                    </button>
                    {isProductEditing ? (
                      <button
                        type="button"
                        onClick={resetProductForm}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </form>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function formatSpecs(specs: { label: string; value: string }[]) {
  return specs.map((spec) => `${spec.label} | ${spec.value}`).join("\n");
}
