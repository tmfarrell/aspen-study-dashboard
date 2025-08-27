import UserDropdown from "@/components/UserDropdown";
import { StudySelector } from "@/components/StudySelector";

export default function UnstructuredData() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="pt-2">
              <h1 className="text-2xl font-bold text-[#003f7f]">Unstructured Mapping</h1>
              <p className="text-muted-foreground">
                Process and analyze unstructured data sources including documents, images, and free text
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
        <div className="bg-card rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Unstructured Mapping functionality will be available here
          </p>
        </div>
      </div>
    </div>
  );
}