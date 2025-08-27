import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, Settings, User, ChevronDown } from "lucide-react";
import { Header } from "@/components/Header";
import { StudySelector } from "@/components/StudySelector";

export default function AutomatedWorkflows() {
  const [message, setMessage] = useState("");
  const [hideToolCalls, setHideToolCalls] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState("sttm");
  const [conversation, setConversation] = useState<Array<{id: string, type: 'user' | 'agent', content: string, timestamp: Date}>>([]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, newMessage]);
    const userMessage = message;
    setMessage("");
    
    // Simulate agent response based on selected assistant and message content
    setTimeout(() => {
      let agentResponse = "";
      
      if (selectedAssistant === "load" && 
          userMessage.toLowerCase().includes("houston") && 
          userMessage.toLowerCase().includes("takeda")) {
        agentResponse = `**github_get_repositories** call_b4wlpXa5Cdta2j7CFTCxacUl

prefix                    aspen-study-fda

🔄 🔁

**Tool Result:** github_get_repositories    call_b4wlpXa5Cdta2j7CFTCxacUl

0    aspen-study-fda-example
1    aspen-study-fda-exactsciences-falcon  
2    aspen-study-fda-exactsciences-tidal
3    aspen-study-fda-takeda
4    aspen-study-fda-sabre

**set_project_id** call_GwqhU6big3bmO9eptopMVGXP

project_id               catti_latti_35924

🔄 🔁

**Tool Result:** set_project_id    call_GwqhU6big3bmO9eptopMVGXP

Successfully set project ID

I've successfully loaded the latest data for the Houston site in the Takeda project. Here's what I found:

1. **Repository Access**: I searched through the aspen-study-fda repositories and located the Takeda project data (aspen-study-fda-takeda).

2. **Project Configuration**: I've set the project ID to catti_latti_35924 which corresponds to the Houston site data.

3. **Data Status**: The latest data is now available and ready for analysis. The system has successfully connected to the Takeda project repository.

The Houston site data is now loaded and accessible for your workflow automation needs. You can proceed with any data analysis or processing tasks you need to perform on this dataset.

The Takeda study repository has been cloned and a personalized working branch named catti_latti_35924 was created. The "Houston Methodist" site within the project has been selected, and all subsequent work will use this site configuration and be tracked on this branch.

Next, I will check if a transform dbt project exists for the Houston Methodist site and initialize it if needed.`;
      } else if (selectedAssistant === "profile" && 
                 userMessage.toLowerCase().includes("profile") && 
                 (userMessage.toLowerCase().includes("schema") || userMessage.toLowerCase().includes("data")) && 
                 (userMessage.toLowerCase().includes("ngr_houston_methodist") || userMessage.toLowerCase().includes("houston")) && 
                 userMessage.toLowerCase().includes("takeda")) {
        agentResponse = `**list_tables** call_GLlJ57Ic2zfI0oIcj9Ar54MS

schema                    ngr_houston_methodist_20250626

🔄 🔁

**Tool Result:** list_tables    call_GLlJ57Ic2zfI0oIcj9Ar54MS

data=[{'TABLE_NAME': 'DIAGNOSIS', 'TABLE_TYPE': 'BASE TABLE', 'ROW_COUNT': 3930386, 'BYTES': 48226304, 'COMMENT': None}, {'TABLE_NAME': 'ENCOUNTER', 'TABLE_TYPE': 'BASE TABLE', 'ROW_COUNT': 2172689, 'BYTES': 26662912, 'COMMENT': None}, {'TABLE_NAME': 'INSURANCE', 'TABLE_TYPE': 'BASE TABLE', 'ROW_COUNT': 7759583, 'BYTES': 51040768, 'COMMENT': None}, {'TABLE_NAME': 'LAB_RESULT', 'TABLE_TYPE': 'BASE TABLE', 'ROW_COUNT': 8375274, 'BYTES': 316040128, 'COMMENT': None}, {'TABLE_NAME': 'MED_ADMIN', 'TAB...

I've successfully retrieved the data profile for the schema ngr_houston_methodist_20250626 in the Takeda project. Here's what I found:

**Schema Overview:**
- Schema: ngr_houston_methodist_20250626
- Multiple tables with significant data volumes

**Key Tables Identified:**
1. **DIAGNOSIS** - 3,930,386 rows (48.2 MB)
2. **ENCOUNTER** - 2,172,689 rows (26.7 MB) 
3. **INSURANCE** - 7,759,583 rows (51.0 MB)
4. **LAB_RESULT** - 8,375,274 rows (316.0 MB)
5. **MED_ADMIN** - Additional medication administration data

The schema contains substantial healthcare data across multiple domains including diagnoses, patient encounters, insurance information, and laboratory results. The LAB_RESULT table appears to be the largest with over 8 million records.

This data profile provides a comprehensive view of the Houston Methodist site data structure and can be used to inform data analysis and transformation workflows.

All tables and their columns in the schema ngr_houston_methodist_20250626 for the Houston Methodist site have been retrieved. This sets the stage to generate intermediate profiler configs for each table in this schema.

Next, I will automatically create profiler configuration files for each table using default metrics on each column, and save these as validated intermediate profiler configs.`;
      } else if (selectedAssistant === "sttm" && 
                 (userMessage.toLowerCase().includes("sttm") || userMessage.toLowerCase().includes("work with")) && 
                 userMessage.toLowerCase().includes("takeda") && 
                 userMessage.toLowerCase().includes("houston")) {
        agentResponse = `**github_get_repositories** call_c7AcOVQbJ4QqWzDguw5s7oAM

prefix                    aspen-study-fda

🔄 🔁

**Tool Result:** github_get_repositories    call_c7AcOVQbJ4QqWzDguw5s7oAM

0    aspen-study-fda-example
1    aspen-study-fda-exactsciences-falcon  
2    aspen-study-fda-exactsciences-tidal
3    aspen-study-fda-takeda
4    aspen-study-fda-sabre

**set_project_id** call_t2YjTZt2FLz3XZRSguhJMeRB

project_id               katniss_everpaw_95432

🔄 🔁

The dbt model for the TRANSFORMED.diagnosis table has been generated using your root contract folder and added to the repo. The model contract enforcement is also configured in dbt_project.yml. All changes have been committed.

View the latest changes here:
https://github.com/omlinc/aspen-study-fda-takeda/compare/main...katniss_everpaw_95432

This step is complete. Next, I will run dbt build to validate the encounter and diagnosis models in the transformed zone.`;
      } else {
        agentResponse = "I understand you want to create an automated workflow. Let me help you configure that. What specific task would you like to automate?";
      }
      
      const agentResponseObj = {
        id: (Date.now() + 1).toString(),
        type: 'agent' as const,
        content: agentResponse,
        timestamp: new Date()
      };
      setConversation(prev => [...prev, agentResponseObj]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header useRegistryTitle={true} />

      {/* Conversation Area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-4 relative">
          {/* Page Description */}
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold text-[#003f7f]">Structured Mapping</h2>
            <p className="text-muted-foreground">
              Automate workflows and processes for your healthcare registry data
            </p>
          </div>
        {/* Assistant Dropdown in upper right */}
        <div className="absolute top-0 right-0 z-10 pt-6 pr-6">
          <div className="flex items-center gap-2">
            <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
              <SelectTrigger className="w-28 h-8 bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="load">Load</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
                <SelectItem value="sttm">STTM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Structured Mapping Agent</h3>
              <p className="text-muted-foreground">
                I can help you create, configure, and manage automated workflows for your healthcare registry. 
                Start by describing what you'd like to automate.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-12">
            {conversation.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-3xl ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === 'user' ? 'bg-primary' : 'bg-muted'
                  }`}>
                    {msg.type === 'user' ? (
                      <User className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <Card className={`p-4 ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                    <div className="text-sm whitespace-pre-wrap font-mono">
                      {msg.content}
                    </div>
                    <p className={`text-xs mt-2 opacity-70`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-card p-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="min-h-[120px] pr-20 resize-none"
              maxLength={7100}
            />
            <div className="absolute bottom-3 right-3">
              <Button 
                onClick={handleSend} 
                size="sm"
                disabled={!message.trim()}
                className="rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hide-tool-calls" 
                checked={hideToolCalls}
                onCheckedChange={(checked) => setHideToolCalls(checked as boolean)}
              />
              <label htmlFor="hide-tool-calls" className="text-sm">
                Hide Tool Calls
              </label>
            </div>
            <span>{message.length}/7100 chars</span>
          </div>
        </div>
      </div>
    </div>
  );
}