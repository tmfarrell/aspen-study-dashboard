import { Header } from "@/components/Header";
import { StudySelector } from "@/components/StudySelector";

export default function UnstructuredData() {
  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Unstructured Mapping" 
        subtitle="Process and analyze unstructured data sources including documents, images, and free text"
        showStudySelector={true}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
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