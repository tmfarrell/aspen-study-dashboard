import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Header } from '@/components/Header';

const FAQ = () => {
  const faqItems = [
    {
      question: "What is Aspen?",
      answer: "Aspen is a comprehensive clinical research platform that enables researchers to analyze patient cohorts, generate insights, and create detailed reports for clinical studies."
    },
    {
      question: "How do I access my study data?",
      answer: "Go to the Aspen Studies page to view comprehensive analytics and insights for your patient cohorts. All your study data is organized and accessible from there."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can generate and export detailed reports in various formats through the Insight Reports section."
    },
    {
      question: "How do I navigate between different sections?",
      answer: "Use the sidebar navigation on the left to move between Home, Aspen Studies, Cohort Explorer, and Insight Reports. You can also collapse the sidebar for more screen space."
    },
    {
      question: "How do I create a new patient cohort?",
      answer: "Navigate to the Cohort Explorer page where you can define your study criteria and build custom patient cohorts based on various demographic and clinical parameters."
    },
    {
      question: "What types of reports can I generate?",
      answer: "Aspen offers four main report types: Provider/Prescriber Insights, Population Insights, Treatment Journey Insights, and Clinical Outcomes Insights reports."
    },
    {
      question: "What should I do if I encounter technical issues?",
      answer: "If you experience any technical difficulties, please contact our support team or refer to the documentation for troubleshooting steps."
    },
    {
      question: "How is my data secured?",
      answer: "Aspen employs industry-standard security measures to protect your clinical data, including encryption and secure access controls."
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Frequently Asked Questions" 
        subtitle="Browse through our frequently asked questions" 
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </CardTitle>
              <CardDescription>
                If you can't find what you're looking for, please contact our support team at <a href="mailto:support@om1.com" className="text-[#003f7f] hover:underline">support@om1.com</a>.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between w-full">
                      <CardTitle className="text-left text-lg">{item.question}</CardTitle>
                      <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
