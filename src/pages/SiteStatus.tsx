import { useState } from "react";
import { Header } from "@/components/Header";
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
    <div className="flex flex-col h-full">
      <Header 
        title="Site Status" 
        subtitle="Monitor site performance and data quality across your study network"
        showStudySelector={true}
      />
      
      <div className="flex-1 overflow-y-auto">
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
    </div>
  );
}