import { User, users } from "./users";
import { Label, labels } from "./labels";

export interface Email {
  id: string;
  from: User;
  to: User[];
  subject: string;
  body: string;
  date: Date;
  read: boolean;
  starred: boolean;
  labels: Label[];
  hasAttachments: boolean;
  attachments?: {
    id: string;
    name: string;
    size: string;
    type: string;
  }[];
}

export const emails: Email[] = [
  {
    id: "1",
    from: users[0],
    to: [users[1]],
    subject: "We Need Your UX Feedback!",
    body: `Hi Team,

We're refining our product and need your insights on our user experience (UX) design. Please share any additional comments or suggestions. Your feedback is crucial in helping us exceed user expectations.

Specifically, I would love to hear your thoughts on the following:

1. Usability: How intuitive do you find our interface? Are there any features or processes that you feel could be simplified?
2. Aesthetics: What are your impressions of our visual design? Is there anything you think could be improved in terms of color schemes, fonts, or overall layout?
3. Functionality: Are there any functionalities you feel are missing or could be enhanced? How can we make the product more effective for our users?

Please feel free to share any additional comments or suggestions that you think might help us improve our UX design.

Thank you in advance for your time and input. Your feedback is invaluable in helping us create a product that not only meets but exceeds our users' expectations.

Best regards,
Rico`,
    date: new Date("2024-06-30T05:16:00"),
    read: false,
    starred: true,
    labels: [labels[0]],
    hasAttachments: true,
    attachments: [
      {
        id: "att1",
        name: "designpr.pptx",
        size: "2 MB",
        type: "application/vnd.ms-powerpoint",
      },
      {
        id: "att2",
        name: "designdocs.docx",
        size: "1.5 MB",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
      {
        id: "att3",
        name: "designdata.xlsx",
        size: "234 KB",
        type: "application/vnd.ms-excel",
      },
    ],
  },
  {
    id: "2",
    from: users[1],
    to: [users[0]],
    subject: "Q4 Marketing Campaign Strategy Review",
    body: `Hi Team,

I hope this email finds you well. I wanted to take a moment to share our comprehensive Q4 marketing campaign strategy and gather your thoughts before we move forward with implementation.

Our analysis of Q3 performance has revealed several key insights that we're leveraging for this upcoming quarter:

Performance Highlights from Q3:
- 45% increase in social media engagement
- 28% boost in conversion rates
- Successful A/B testing on email campaigns
- Strong ROI on influencer partnerships

I've attached detailed campaign plans, budget breakdowns, and preliminary creative concepts. Please review these materials and share your feedback by end of week.

Looking forward to your thoughts and to a successful Q4!

Best regards,
Sarah`,
    date: new Date("2024-06-29T14:20:00"),
    read: true,
    starred: false,
    labels: [labels[0]],
    hasAttachments: true,
    attachments: [
      {
        id: "att4",
        name: "Q4-strategy.pdf",
        size: "3.2 MB",
        type: "application/pdf",
      },
      {
        id: "att5",
        name: "budget-breakdown.xlsx",
        size: "856 KB",
        type: "application/vnd.ms-excel",
      },
    ],
  },
  {
    id: "3",
    from: users[2],
    to: [users[0]],
    subject: "Technical Architecture Review - New Features",
    body: `Hello Development Team,

I'm reaching out to discuss the technical architecture for our upcoming feature releases and to ensure we're all aligned on our approach moving forward.

Background:
As you know, we're planning to roll out several major features in the next quarter, including real-time collaboration, advanced search capabilities, and an AI-powered recommendation engine.

I've prepared detailed technical specifications and architecture diagrams. Let's schedule a meeting next week to dive deeper into these proposals and address any concerns.

Please review the attached documents and come prepared with questions and suggestions.

Best regards,
Michael`,
    date: new Date("2024-06-29T08:00:00"),
    read: false,
    starred: false,
    labels: [labels[1]],
    hasAttachments: true,
    attachments: [
      {
        id: "att6",
        name: "architecture-diagram.png",
        size: "1.8 MB",
        type: "image/png",
      },
      {
        id: "att7",
        name: "tech-specs.pdf",
        size: "2.4 MB",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "4",
    from: users[3],
    to: [users[0]],
    subject: "Customer Success Report - Outstanding Results!",
    body: `Dear Team,

I'm thrilled to share our customer success metrics for the past quarter. The numbers speak for themselves, and I couldn't be prouder of what we've accomplished together!

Key Metrics Overview:

Customer Satisfaction:
- Overall CSAT score: 94% (up from 87%)
- Net Promoter Score: 72 (industry average is 45)
- Customer retention rate: 96%
- Average support rating: 4.8/5 stars

Please find the detailed metrics dashboard and analysis attached.

Best regards,
Jennifer`,
    date: new Date("2024-06-28T16:45:00"),
    read: true,
    starred: false,
    labels: [labels[0]],
    hasAttachments: true,
    attachments: [
      {
        id: "att8",
        name: "customer-success-report.pdf",
        size: "4.1 MB",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "5",
    from: users[4],
    to: [users[0]],
    subject: "Product Roadmap Update - Q4 2024",
    body: `Hi Everyone,

I wanted to share an exciting update on our product roadmap for Q4 2024 and get your feedback on our proposed direction.

Executive Summary:
We're focusing on three key themes this quarter: Performance, Intelligence, and Integration.

I've attached the full roadmap document with technical specifications, user stories, and design mockups.

Excited about what we're building together!

Best regards,
Alex`,
    date: new Date("2024-06-28T09:00:00"),
    read: false,
    starred: true,
    labels: [labels[1]],
    hasAttachments: true,
    attachments: [
      {
        id: "att9",
        name: "roadmap-Q4.pdf",
        size: "5.6 MB",
        type: "application/pdf",
      },
      {
        id: "att10",
        name: "mockups.zip",
        size: "12 MB",
        type: "application/zip",
      },
    ],
  },
  {
    id: "6",
    from: users[5],
    to: [users[0]],
    subject: "Security Audit Findings and Action Plan",
    body: `Team,

I'm writing to share the results of our recent comprehensive security audit and outline our action plan to address the findings.

Executive Summary:
Overall, our security posture is strong. The audit identified no critical vulnerabilities, but we have several areas where we can improve our security practices.

I've attached:
- Full audit report (confidential)
- Detailed remediation plan
- Security best practices guide

Thank you for your continued commitment to security.

Best regards,
James`,
    date: new Date("2024-06-27T11:30:00"),
    read: true,
    starred: false,
    labels: [labels[2]],
    hasAttachments: true,
    attachments: [
      {
        id: "att11",
        name: "security-audit.pdf",
        size: "3.8 MB",
        type: "application/pdf",
      },
      {
        id: "att12",
        name: "remediation-plan.xlsx",
        size: "942 KB",
        type: "application/vnd.ms-excel",
      },
    ],
  },
  {
    id: "7",
    from: users[0],
    to: [users[1]],
    subject: "Your feedback is needed: Design system review",
    body: `Hi Sarah,

I hope you're doing well! I'm reaching out because we're conducting a comprehensive review of our design system, and your expertise in visual design would be incredibly valuable to this process.

Thank you so much for your time and expertise!

Best regards,
Rico`,
    date: new Date("2024-06-27T09:15:00"),
    read: false,
    starred: false,
    labels: [labels[0]],
    hasAttachments: false,
  },
  {
    id: "8",
    from: users[1],
    to: [users[0]],
    subject: "Team Offsite Planning - October 2024",
    body: `Hi Rico,

Hope you're having a great week! I'm excited to start planning our team offsite for October.

Proposed Dates:
- October 15-17 (Monday-Wednesday)
- October 22-24 (Monday-Wednesday)

I'm really excited about this opportunity to bring the team together!

Best regards,
Sarah`,
    date: new Date("2024-06-26T14:30:00"),
    read: true,
    starred: false,
    labels: [labels[1]],
    hasAttachments: false,
  },
  {
    id: "9",
    from: users[2],
    to: [users[0]],
    subject: "API Rate Limit Increase Request",
    body: `Hi Rico,

I'm reaching out regarding our current API rate limits and to request an increase based on our growing usage patterns.

Current Situation:
We're consistently hitting our rate limits, particularly during peak hours.

Please let me know if you need any additional information.

Best regards,
Michael`,
    date: new Date("2024-06-26T10:45:00"),
    read: true,
    starred: false,
    labels: [labels[2]],
    hasAttachments: true,
    attachments: [
      {
        id: "att13",
        name: "usage-analysis.xlsx",
        size: "654 KB",
        type: "application/vnd.ms-excel",
      },
    ],
  },
  {
    id: "10",
    from: users[3],
    to: [users[0]],
    subject: "Newsletter: This Week in Tech",
    body: `Hello Rico,

Welcome to this week's tech newsletter! Here are the most interesting developments in technology, product design, and innovation.

🚀 Industry News

1. AI Breakthroughs
OpenAI announced GPT-5 capabilities, including improved reasoning and multimodal understanding.

2. Design Trends
Minimalist interfaces are making a comeback, but with more focus on accessibility.

Until next week,
The Tech Team`,
    date: new Date("2024-06-25T08:00:00"),
    read: false,
    starred: false,
    labels: [],
    hasAttachments: false,
  },
  {
    id: "11",
    from: users[4],
    to: [users[0]],
    subject: "Urgent: Production Server Alert",
    body: `Hi Rico,

We're experiencing elevated error rates on our production servers. The team is investigating.

Current Status:
- Error rate: 5% (normal is <0.1%)
- Affected region: US-East
- User impact: Intermittent failures on checkout flow

We'll send updates every 15 minutes until resolved.

Alex`,
    date: new Date("2024-06-25T06:30:00"),
    read: true,
    starred: true,
    labels: [labels[2]],
    hasAttachments: false,
  },
  {
    id: "12",
    from: users[5],
    to: [users[0]],
    subject: "Reminder: All-Hands Meeting Tomorrow",
    body: `Hi Team,

This is a friendly reminder about our all-hands meeting tomorrow:

📅 When: Tomorrow, June 27th at 10:00 AM EST
⏰ Duration: 90 minutes
📍 Where: Main Conference Room / Zoom link below

See you there!

James`,
    date: new Date("2024-06-24T16:00:00"),
    read: false,
    starred: false,
    labels: [labels[1]],
    hasAttachments: false,
  },
  {
    id: "13",
    from: users[0],
    to: [users[1]],
    subject: "Follow-up: Design Review Session",
    body: `Hi Sarah,

Thank you for the productive design review session this morning! I wanted to recap our discussion and confirm next steps.

Key Decisions:
1. Moving forward with Option B for the navigation redesign
2. Will implement the suggested color contrast improvements
3. Postponing the mobile layout changes until next sprint

I've attached the annotated mockups with all the feedback incorporated.

Best,
Rico`,
    date: new Date("2024-06-24T11:20:00"),
    read: true,
    starred: false,
    labels: [labels[0]],
    hasAttachments: true,
    attachments: [
      {
        id: "att14",
        name: "design-mockups.pdf",
        size: "6.2 MB",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "14",
    from: users[1],
    to: [users[0]],
    subject: "Congratulations on Your Work Anniversary!",
    body: `Hi Rico,

Happy 3-year work anniversary! 🎉

It's hard to believe it's been three years since you joined the team. Your contributions have been invaluable.

Cheers,
Sarah`,
    date: new Date("2024-06-23T09:00:00"),
    read: false,
    starred: true,
    labels: [],
    hasAttachments: false,
  },
  {
    id: "15",
    from: users[2],
    to: [users[0]],
    subject: "Code Review: PR #2847",
    body: `Hi Rico,

I've reviewed your PR #2847 for the new authentication flow. Overall looks great! Just a few minor comments.

Once those small changes are made, I'll approve.

Michael`,
    date: new Date("2024-06-23T15:30:00"),
    read: true,
    starred: false,
    labels: [labels[1]],
    hasAttachments: false,
  },
  {
    id: "16",
    from: users[3],
    to: [users[0]],
    subject: "Welcome to the Beta Program!",
    body: `Hi Rico,

Congratulations! You've been selected for our exclusive Beta Program.

As a beta tester, you'll get:
✅ Early access to new features
✅ Direct line to our product team
✅ Influence product direction

Thank you for being an early adopter!

Jennifer`,
    date: new Date("2024-06-22T10:00:00"),
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
  },
  {
    id: "17",
    from: users[4],
    to: [users[0]],
    subject: "Invoice #INV-2024-06-0789",
    body: `Dear Rico,

Thank you for your business! Please find attached your invoice for June 2024.

Invoice Details:
- Invoice Number: INV-2024-06-0789
- Date: June 22, 2024
- Amount Due: $1,299.00
- Due Date: July 6, 2024

Thank you for choosing our services!

Accounts Team`,
    date: new Date("2024-06-22T08:15:00"),
    read: false,
    starred: false,
    labels: [labels[0]],
    hasAttachments: true,
    attachments: [
      {
        id: "att15",
        name: "invoice-june-2024.pdf",
        size: "245 KB",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "18",
    from: users[5],
    to: [users[0]],
    subject: "Webinar Invitation: Advanced Product Design Techniques",
    body: `Hi Rico,

You're invited to our exclusive webinar on Advanced Product Design Techniques!

📅 Date: July 10, 2024
🕐 Time: 2:00 PM EST
⏱ Duration: 60 minutes

We look forward to seeing you there!

Events Team`,
    date: new Date("2024-06-21T13:00:00"),
    read: true,
    starred: false,
    labels: [labels[1]],
    hasAttachments: false,
  },
  {
    id: "19",
    from: users[0],
    to: [users[2]],
    subject: "Quick Question: Component Library",
    body: `Hey Michael,

Quick question about the component library - what's the best way to handle conditional styling based on props?

Would love your thoughts when you have a minute!

Thanks,
Rico`,
    date: new Date("2024-06-21T11:45:00"),
    read: false,
    starred: false,
    labels: [],
    hasAttachments: false,
  },
  {
    id: "20",
    from: users[1],
    to: [users[0]],
    subject: "Team Lunch Next Friday?",
    body: `Hi Rico,

Want to organize a team lunch next Friday? It's been a while since we all got together outside of meetings.

Let me know if you're interested and if Friday works for you!

Sarah`,
    date: new Date("2024-06-20T16:20:00"),
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
  },
];

