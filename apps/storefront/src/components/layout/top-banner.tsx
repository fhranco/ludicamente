import { getStoreSettings } from "@/lib/medusa"
import { DynamicBanner } from "./dynamic-banner"

export async function TopBanner() {
  const settings = await getStoreSettings()
  const customAnnouncement = settings.hero_announcement

  return <DynamicBanner customAnnouncement={customAnnouncement} />
}
