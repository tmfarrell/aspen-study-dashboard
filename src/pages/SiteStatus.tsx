import { useState } from "react";
import { Header } from "@/components/Header";
import { StudySelector } from "@/components/StudySelector";
import { SiteStatusHeader } from "@/components/SiteStatusHeader";
import { SiteListTable } from "@/components/SiteListTable";
import { SiteDetailModal } from "@/components/SiteDetailModal";
import { SiteData } from "@/api/types";

export default function SiteStatus() {
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSiteClick = (site: SiteData) => {
    setSelectedSite(site);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSite(null);
  };

  return (
    <div className="flex flex-col h-full">
      <Header useRegistryTitle={true} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="pl-8 pr-4 py-6 space-y-6">
          {/* Page Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#003f7f]">Site Status</h2>
            <p className="text-muted-foreground">
              Monitor site performance and data quality across your study network
            </p>
          </div>
          <SiteStatusHeader />

          <SiteListTable onSiteClick={handleSiteClick} />

          <SiteDetailModal 
            site={selectedSite}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
}