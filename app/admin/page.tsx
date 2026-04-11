import { redirect } from "next/navigation";
import { connection } from "next/server";

import AdminDashboard from "@/components/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listProducts, listProjects } from "@/lib/content-store";

export default async function AdminPage() {
  await connection();

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

