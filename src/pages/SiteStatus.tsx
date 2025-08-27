import { useState } from "react";
import UserDropdown from "@/components/UserDropdown";
import { StudySelector } from "@/components/StudySelector";
import { SiteStatusHeader } from "@/components/SiteStatusHeader";
import { SiteListTable } from "@/components/SiteListTable";
import { SiteDetailModal } from "@/components/SiteDetailModal";
import { Site } from "@/data/siteData";

export default function SiteStatus() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSiteClick = (site: Site) => {
    setSelectedSite(site);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSite(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="pt-2">
              <h1 className="text-2xl font-bold text-[#003f7f]">Site Status</h1>
              <p className="text-muted-foreground">
                Monitor site performance, health checks, and system status
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StudySelector />
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <SiteStatusHeader />

        <SiteListTable onSiteClick={handleSiteClick} />

        <SiteDetailModal 
          site={selectedSite}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}