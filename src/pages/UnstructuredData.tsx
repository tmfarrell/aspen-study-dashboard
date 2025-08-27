import { Header } from "@/components/Header";
import { StudySelector } from "@/components/StudySelector";

export default function UnstructuredData() {
  return (
    <div className="flex flex-col h-full">
      <Header useRegistryTitle={true} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="pl-8 pr-4 py-6 space-y-6">
          {/* Page Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#003f7f]">Unstructured Mapping</h2>
            <p className="text-muted-foreground">
              Process and analyze unstructured data sources including documents, images, and free text
            </p>
          </div>
          <div className="bg-card rounded-lg border p-8 text-center">
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">
              Unstructured Mapping functionality will be available here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}