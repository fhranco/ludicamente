import { redirect, RedirectType } from "next/navigation"

export default function CatalogoPage() {
  redirect("/tienda", RedirectType.replace)
}
