import { redirect } from "next/navigation";

import AdminDashboard from "@/components/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listProducts, listProjects } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [initialProjects, initialProducts] = await Promise.all([
    listProjects(),
    listProducts(),
  ]);

  return (
    <AdminDashboard
      initialProjects={initialProjects}
      initialProducts={initialProducts}
    />
  );
}
