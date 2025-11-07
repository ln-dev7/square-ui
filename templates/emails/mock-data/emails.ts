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

Q4 Strategy Focus Areas:

1. Multi-Channel Integration
We're planning to create a seamless experience across all touchpoints. This includes coordinating messaging between email, social media, paid ads, and our website to ensure consistency and maximize impact.

2. Content Marketing Enhancement
We'll be doubling down on long-form content, including whitepapers, case studies, and video tutorials. Our research shows that our audience values in-depth, educational content.

3. Personalization at Scale
Implementing advanced segmentation strategies to deliver more personalized experiences. We'll be using behavioral data to trigger targeted campaigns based on user actions.

4. Holiday Season Campaigns
Special focus on Black Friday, Cyber Monday, and end-of-year promotions with exclusive offers and limited-time deals.

Budget Allocation:
- Paid Advertising: 35%
- Content Production: 25%
- Influencer Partnerships: 20%
- Email Marketing: 15%
- Events & Sponsorships: 5%

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
As you know, we're planning to roll out several major features in the next quarter, including real-time collaboration, advanced search capabilities, and an AI-powered recommendation engine. These additions will significantly enhance our platform's capabilities but also introduce new technical challenges.

Current System Analysis:
Our current architecture has served us well, but we're approaching some scalability limits:
- Database query performance is degrading with increased data volume
- Real-time features require WebSocket implementation
- Current caching strategy needs optimization
- Microservices architecture needs refinement

Proposed Technical Solutions:

1. Database Optimization
   - Implement read replicas for better load distribution
   - Add database indexing on frequently queried fields
   - Consider sharding strategy for user data
   - Implement query result caching

2. Real-time Infrastructure
   - Deploy WebSocket servers with Redis pub/sub
   - Implement connection pooling and automatic reconnection
   - Add fallback mechanisms for unsupported browsers
   - Design efficient event broadcasting system

3. Search Enhancement
   - Integrate Elasticsearch for full-text search
   - Implement fuzzy matching and relevance scoring
   - Add search suggestions and autocomplete
   - Design efficient index update mechanisms

4. AI/ML Integration
   - Set up dedicated ML service infrastructure
   - Implement model versioning and A/B testing
   - Design data pipeline for model training
   - Plan for model monitoring and performance tracking

5. Infrastructure Improvements
   - Containerize all services using Docker
   - Implement Kubernetes for orchestration
   - Set up comprehensive monitoring with Prometheus/Grafana
   - Enhance CI/CD pipeline for faster deployments

Security Considerations:
- All new endpoints will require authentication
- Implement rate limiting on API endpoints
- Add encryption for sensitive data transmission
- Regular security audits and penetration testing

Performance Goals:
- Page load time: < 2 seconds
- API response time: < 200ms for 95th percentile
- Support for 100,000 concurrent users
- 99.9% uptime SLA

Timeline:
- Weeks 1-2: Detailed design and architecture finalization
- Weeks 3-6: Core infrastructure implementation
- Weeks 7-10: Feature development
- Weeks 11-12: Testing and optimization
- Week 13: Production deployment

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

Response and Resolution:
- Average first response time: 45 minutes (target was 2 hours)
- Average resolution time: 4.3 hours
- First contact resolution: 78%
- Support ticket volume: Down 23% due to proactive initiatives

Customer Growth:
- 34 new enterprise clients onboarded
- Average contract value increased by 18%
- Expansion revenue: $2.3M (35% growth)
- Churn rate: Only 2.4% (best in company history)

What's Working:

1. Proactive Outreach Program
Our initiative to contact customers before they experience issues has been incredibly successful. We're identifying and resolving potential problems before they impact the customer experience.

2. Enhanced Onboarding Process
The new structured onboarding program has reduced time-to-value by 40%. Customers are seeing results faster and are more engaged from day one.

3. Customer Education
Our webinar series and knowledge base expansion have empowered customers to self-serve. We've seen a 300% increase in knowledge base usage.

4. Success Team Expansion
Adding three new customer success managers has allowed us to provide more personalized attention. Each CSM now manages fewer accounts, resulting in better relationships.

5. Customer Feedback Loop
We've implemented a systematic approach to collecting and acting on customer feedback. This has led to several product improvements that customers specifically requested.

Customer Testimonials Highlight:

"The support team is incredible. They don't just solve problems; they anticipate them. This is the best vendor relationship we have." - CTO, Enterprise Client

"The onboarding process was smooth and professional. We were up and running in record time, and the team was there every step of the way." - Director of Operations, Mid-Market Client

Challenges and Improvements:

While these results are outstanding, we've identified areas for continued improvement:

1. International Support: We need better coverage for APAC time zones
2. Technical Documentation: Some advanced features need better documentation
3. Integration Support: More resources needed for complex integrations
4. Self-Service Tools: Opportunity to develop more automated solutions

Action Plan for Next Quarter:

1. Hire two additional CSMs focused on APAC region
2. Create comprehensive video tutorials for all features
3. Develop integration partnership program
4. Build customer self-service portal with AI-powered assistance
5. Implement customer health scoring system
6. Launch customer advisory board
7. Expand quarterly business review program

Budget Considerations:
To maintain and improve these metrics, I'm proposing a 15% budget increase for the customer success department. This will primarily go toward:
- Additional team members
- Enhanced tools and technology
- Customer events and engagement programs
- Training and professional development

ROI Justification:
Our customer success initiatives have directly contributed to:
- $3.5M in expansion revenue
- $1.2M in saved churn
- 40% reduction in support costs per customer
- Significant increases in customer referrals

The ROI on our customer success investments is approximately 8:1, making this one of our highest-performing departments from a business impact perspective.

Recognition:
I want to specifically recognize the following team members for going above and beyond:
- Jessica for managing our largest enterprise client renewal
- David for creating our customer education program
- Maria for implementing the health scoring system
- The entire support team for their dedication to customer happiness

Next Steps:
I'll be scheduling individual meetings with department heads to discuss how we can collaborate even more effectively to serve our customers. I'd also love to present these results at the next all-hands meeting.

Thank you all for your support and commitment to customer success. These results are a team effort, and I'm excited about what we'll accomplish in the coming months!

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
We're focusing on three key themes this quarter: Performance, Intelligence, and Integration. These themes emerged from extensive customer research, competitive analysis, and strategic business objectives.

Detailed Roadmap:

Phase 1: Performance Optimization (Weeks 1-4)
Our users have told us that speed matters, and we're listening.

Initiatives:
- Reduce page load times by 50%
- Optimize database queries for faster data retrieval
- Implement advanced caching strategies
- Improve mobile app performance
- Reduce bundle sizes through code splitting

Expected Impact:
- Better user experience
- Higher engagement rates
- Reduced churn
- Improved conversion rates

Phase 2: AI-Powered Intelligence (Weeks 5-9)
Artificial intelligence is transforming our industry, and we need to lead the way.

Features:
- Smart recommendations based on user behavior
- Automated workflow suggestions
- Predictive analytics dashboard
- Natural language search
- Intelligent data categorization

Technical Approach:
- Train models on historical usage data
- Implement A/B testing for AI features
- Gradual rollout with user feedback loops
- Privacy-first approach to data usage

Phase 3: Enterprise Integrations (Weeks 10-13)
Our enterprise customers need seamless integration with their existing tools.

Integrations:
- Salesforce bidirectional sync
- Slack notifications and commands
- Microsoft Teams integration
- Jira project management sync
- Google Workspace integration
- Custom API webhooks

Integration Platform:
- Developer-friendly API documentation
- Integration marketplace
- Pre-built connectors
- Custom integration support

Additional Enhancements:

Mobile App 2.0:
- Redesigned interface
- Offline capabilities
- Biometric authentication
- Push notifications
- Widget support

Collaboration Features:
- Real-time co-editing
- Comments and annotations
- @mentions and notifications
- Activity feed
- Team spaces

Security & Compliance:
- SOC 2 Type II certification
- GDPR compliance tools
- Advanced permissions system
- Audit logging
- Data encryption enhancements

User Experience Improvements:
- Onboarding flow redesign
- Interactive tutorials
- Contextual help
- Keyboard shortcuts
- Customizable dashboards

Research & Validation:

We conducted extensive research to validate these priorities:
- 50 customer interviews
- Survey with 2,000+ responses
- Competitive feature analysis
- Usage data analysis
- Sales team feedback
- Support ticket analysis

The research clearly showed that performance, AI capabilities, and integrations are the top three priorities for our users.

Resource Allocation:

Engineering:
- Performance: 25% of capacity
- AI Features: 35% of capacity
- Integrations: 30% of capacity
- Maintenance & Bug Fixes: 10% of capacity

Design:
- User research and testing
- Interface design for new features
- Design system updates
- Mobile app redesign

Product Marketing:
- Feature launch campaigns
- User education content
- Case studies
- Competitive positioning

Success Metrics:

We'll measure success through:
- User engagement (target: +25%)
- Feature adoption rates (target: 60% within 3 months)
- Customer satisfaction (target: 90%+)
- Performance metrics (target: <2s load times)
- Integration usage (target: 40% of enterprise users)
- Revenue impact (target: +20% from new features)

Risks & Mitigation:

Technical Complexity:
Risk: AI features and integrations are technically challenging
Mitigation: Start with MVP, iterate based on feedback, hire specialized talent

Resource Constraints:
Risk: Ambitious roadmap with limited resources
Mitigation: Prioritize ruthlessly, consider outsourcing non-core development

Market Changes:
Risk: Competitive landscape may shift
Mitigation: Maintain flexibility, regular market monitoring, pivot capability

Communication Plan:

Internal:
- Bi-weekly roadmap updates
- Monthly demo days
- Quarterly strategy reviews
- Open office hours for questions

External:
- Public roadmap on website
- Beta program for early access
- Regular product updates blog
- Webinar series on new features

Beta Program:
We're launching a beta program for customers who want early access to new features. This will help us:
- Gather real-world feedback
- Identify issues before general release
- Build excitement and engagement
- Create case studies and testimonials

Your Input Needed:

Please review this roadmap and share your thoughts on:
1. Are we prioritizing the right features?
2. Are the timelines realistic?
3. Do you foresee any technical challenges?
4. What resources or support do you need?
5. Any concerns about market fit?

Let's schedule a roadmap review meeting next week to discuss in detail. I've attached the full roadmap document with technical specifications, user stories, and design mockups.

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
Overall, our security posture is strong. The audit identified no critical vulnerabilities, but we have several areas where we can improve our security practices. This email outlines the findings and our remediation plan.

Audit Scope:
The security firm conducted a thorough review including:
- Penetration testing of all public-facing systems
- Code review of critical application components
- Infrastructure security assessment
- Access control and authentication review
- Data encryption and storage analysis
- Third-party integration security review
- Incident response readiness evaluation
- Employee security awareness assessment

Positive Findings:

1. Strong Foundation
   - Modern security architecture
   - Industry-standard encryption
   - Regular security updates
   - Comprehensive access logging

2. Authentication & Authorization
   - Multi-factor authentication implementation
   - Strong password policies
   - Proper session management
   - Role-based access control

3. Data Protection
   - Encryption at rest and in transit
   - Regular backups
   - Data retention policies
   - Privacy compliance (GDPR, CCPA)

4. Monitoring & Response
   - Real-time security monitoring
   - Intrusion detection systems
   - Incident response procedures
   - Security incident logging

Areas for Improvement:

High Priority (Address within 30 days):

1. API Rate Limiting
   Finding: Some API endpoints lack proper rate limiting
   Impact: Potential for DoS attacks and resource abuse
   Solution: Implement rate limiting across all endpoints
   Owner: Backend team
   Status: Work started, 60% complete

2. Dependency Updates
   Finding: Several dependencies have known vulnerabilities
   Impact: Potential security exploits
   Solution: Update all dependencies, implement automated scanning
   Owner: DevOps team
   Status: In progress, updating critical packages first

3. Access Review
   Finding: Some former employees still have system access
   Impact: Unauthorized access risk
   Solution: Implement automated access deprovisioning
   Owner: IT team
   Status: Manual review completed, automation in development

Medium Priority (Address within 60 days):

1. Logging Enhancement
   Finding: Some security events not adequately logged
   Impact: Reduced visibility into security incidents
   Solution: Expand logging coverage, implement centralized logging
   Owner: Infrastructure team
   Timeline: 4 weeks

2. Security Headers
   Finding: Missing some recommended HTTP security headers
   Impact: Potential XSS and clickjacking vulnerabilities
   Solution: Implement Content Security Policy and other headers
   Owner: Frontend team
   Timeline: 2 weeks

3. Third-Party Integrations
   Finding: Integration security practices vary
   Impact: Potential data leakage through integrations
   Solution: Standardize integration security requirements
   Owner: Architecture team
   Timeline: 6 weeks

4. Mobile App Security
   Finding: App stores sensitive data insecurely
   Impact: Risk if device is compromised
   Solution: Implement secure storage, add app-level encryption
   Owner: Mobile team
   Timeline: 5 weeks

Low Priority (Address within 90 days):

1. Security Documentation
   Finding: Security procedures not fully documented
   Impact: Inconsistent security practices
   Solution: Create comprehensive security documentation
   Owner: Security team
   Timeline: 8 weeks

2. Security Training
   Finding: Team security awareness varies
   Impact: Potential for social engineering attacks
   Solution: Implement mandatory security training program
   Owner: HR + Security teams
   Timeline: 10 weeks

3. Disaster Recovery Testing
   Finding: DR procedures not regularly tested
   Impact: Uncertain recovery capability
   Solution: Quarterly DR testing schedule
   Owner: Infrastructure team
   Timeline: Ongoing

Compliance Status:

SOC 2 Type II:
- Current Status: Compliant
- Next Audit: January 2025
- Ongoing requirements: All being met

GDPR:
- Current Status: Compliant
- Recent DPA updates implemented
- Data subject request process functioning well

CCPA:
- Current Status: Compliant
- Privacy notice updated
- Data deletion procedures operational

HIPAA (for healthcare clients):
- Current Status: Compliant with BAA requirements
- Additional controls documented
- Regular training completed

Budget Implications:

Required investments:
- Security tools and services: $50K
- External security testing: $25K
- Security training program: $15K
- Additional security team member: $120K/year
- Infrastructure improvements: $30K

Total one-time cost: $120K
Annual recurring cost: $150K

ROI Justification:
- Prevents potential breach costs (average: $4.24M)
- Maintains compliance (penalties can exceed $20M)
- Protects brand reputation
- Enables enterprise sales (security is a key requirement)
- Reduces insurance premiums

Implementation Timeline:

Month 1:
- Address all high-priority findings
- Begin dependency update process
- Start access review automation

Month 2:
- Complete medium-priority items
- Implement enhanced logging
- Deploy security headers

Month 3:
- Begin low-priority improvements
- Launch security training program
- Conduct first DR test

Ongoing:
- Quarterly security audits
- Monthly security reviews
- Continuous monitoring and improvement
- Regular team training

Communication Plan:

Internal:
- Monthly security updates to all-hands
- Security tips in team newsletter
- Incident reporting procedures
- Security champion program

External:
- Security page on website
- Responsible disclosure program
- Transparency reports
- Customer security updates

Team Responsibilities:

Everyone:
- Follow security best practices
- Report suspicious activity
- Complete security training
- Use strong passwords and MFA

Developers:
- Secure coding practices
- Security testing before deployment
- Dependency management
- Code review focus on security

DevOps:
- Infrastructure security
- Access management
- Monitoring and alerting
- Incident response

Leadership:
- Security prioritization
- Resource allocation
- Culture of security
- Executive oversight

Next Steps:

1. Review this report and attached detailed findings
2. Schedule team-specific security briefings
3. Begin implementing high-priority fixes
4. Set up recurring security review meetings
5. Plan for next quarter's security initiatives

I've attached:
- Full audit report (confidential)
- Detailed remediation plan
- Security best practices guide
- Incident response playbook

Please treat the attached audit report as confidential and do not share outside the company.

Let's schedule a meeting next week to discuss any questions and ensure everyone understands their security responsibilities.

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

As you know, our design system has evolved organically over the past two years, and while it's served us well, we've identified some inconsistencies and opportunities for improvement. We want to make sure our design system is robust, scalable, and truly serves the needs of our team and our users.

Areas We're Reviewing:

1. Visual Foundations
   - Color palette: Are our colors accessible? Do we have enough variety?
   - Typography: Is our type scale working well? Font choices still appropriate?
   - Spacing: Is our 8-point grid system being used consistently?
   - Iconography: Do we need more icons? Better consistency in style?

2. Component Library
   - Completeness: Are we missing any essential components?
   - Variants: Do components have enough flexibility?
   - Documentation: Is it clear how to use each component?
   - Code quality: Are components well-structured and performant?

3. Patterns and Templates
   - Common patterns: Have we documented frequent use cases?
   - Page templates: Do we have enough starting points?
   - Best practices: Are design patterns clearly explained?
   - Examples: Do we show enough real-world applications?

4. Design Tokens
   - Organization: Are tokens logically structured?
   - Naming: Are names intuitive and consistent?
   - Theming: Does our theme system support customization?
   - Documentation: Can developers easily use tokens?

5. Accessibility
   - WCAG compliance: Are we meeting AAA standards where possible?
   - Color contrast: Do all color combinations pass?
   - Keyboard navigation: Is everything keyboard accessible?
   - Screen readers: Are all components properly labeled?

Your Specific Expertise Needed:

Given your background in visual design and brand identity, I'd particularly love your input on:

1. Color System: Review our current palette and suggest improvements
2. Typography: Evaluate our font choices and type scale
3. Visual Hierarchy: Assess how well our system creates clear hierarchies
4. Brand Alignment: Ensure design system aligns with brand guidelines
5. Aesthetic Quality: Overall visual polish and professional appearance

What We're Asking:

1. Review the attached design system documentation
2. Use our Figma library and note any pain points or missing elements
3. Complete the feedback survey (15-20 minutes)
4. Join us for a design system workshop next Thursday (optional but encouraged)

Timeline:
- Feedback survey: Due by Friday, July 5th
- Design workshop: Thursday, July 11th, 2-4 PM
- Updated design system: Launch planned for late July

Why This Matters:

A strong design system will:
- Speed up design and development
- Ensure consistency across our product
- Improve user experience
- Make onboarding easier for new team members
- Enable us to scale more effectively
- Strengthen our brand identity

I know you're busy, but this review is really important and your insights will directly shape the future of our design system. Even if you can only complete the survey, that would be incredibly helpful.

Please let me know if you have any questions or if you'd like to discuss this over a call. I'm happy to work around your schedule.

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

Hope you're having a great week! I'm excited to start planning our team offsite for October. Based on the team survey, there's strong enthusiasm for getting together in person.

Proposed Dates:
- October 15-17 (Monday-Wednesday)
- October 22-24 (Monday-Wednesday)

Please vote on your preference: [survey link]

Location Options:

Option 1: Mountain Retreat
- Location: Tahoe, CA
- Accommodation: Lodge with conference facilities
- Activities: Hiking, team challenges, bonfire nights
- Vibe: Relaxed, nature-focused, unplugged
- Cost per person: $850 (all-inclusive)

Option 2: City Innovation Hub
- Location: San Francisco, CA
- Accommodation: Modern downtown hotel
- Activities: Tech tours, innovation workshops, networking
- Vibe: Energetic, professional, connected
- Cost per person: $950 (all-inclusive)

Option 3: Coastal Retreat
- Location: Monterey, CA
- Accommodation: Beachfront resort
- Activities: Beach activities, kayaking, wine tasting
- Vibe: Relaxing, scenic, inspiring
- Cost per person: $900 (all-inclusive)

Proposed Agenda:

Day 1 - Connection & Vision
Morning:
- Travel and check-in
- Welcome breakfast
- Icebreakers and team building

Afternoon:
- Company vision and strategy presentation
- Department updates and wins
- Q&A with leadership

Evening:
- Welcome dinner
- Informal networking time
- Optional: Group activity

Day 2 - Collaboration & Innovation
Morning:
- Department breakout sessions
- Cross-functional collaboration workshops
- Innovation brainstorming

Afternoon:
- Location-specific activity (hiking, tech tour, or beach time)
- Team challenges
- Free time

Evening:
- Group dinner
- Team awards and recognition
- Entertainment/games

Day 3 - Planning & Celebration
Morning:
- Q4 planning and goal setting
- Skills workshops
- Career development session

Afternoon:
- Wrap-up discussion
- Feedback and reflections
- Travel home

Goals for the Offsite:

1. Strengthen Relationships
   - Build cross-functional connections
   - Improve team cohesion
   - Foster trust and collaboration

2. Align on Strategy
   - Communicate company vision
   - Set shared goals
   - Ensure everyone understands priorities

3. Professional Development
   - Skills workshops
   - Leadership training
   - Career discussions

4. Recognize Achievements
   - Celebrate wins
   - Acknowledge contributions
   - Team awards

5. Have Fun!
   - Relax and recharge
   - Create positive memories
   - Strengthen company culture

Budget Breakdown:
- Accommodations: $400/person
- Meals: $250/person
- Activities: $150/person
- Transportation: $100/person
- Miscellaneous: $50/person

Total: $950/person × 45 people = $42,750

This is within our approved team offsite budget of $45,000.

What We Need from You:

1. Vote on preferred dates (by June 30)
2. Vote on location preference (by June 30)
3. Dietary restrictions and accessibility needs (by July 5)
4. Topic suggestions for workshops (by July 10)
5. Commitment to attend (required for planning)

Additional Considerations:

Remote Team Members:
- Company will cover all travel costs for remote team members
- Early travel arrangements will be made
- Virtual participation option for those unable to travel

Family-Friendly:
- Partners welcome for personal time (not included in budget)
- Nearby childcare recommendations available
- Extended stay options if you want to make it a vacation

Accessibility:
- All venues are fully accessible
- Special accommodations available upon request
- Dietary restrictions will be fully accommodated

Sustainability:
- Carbon offset for all travel
- Eco-friendly venue choices
- Minimal waste approach

Next Steps:

1. Complete the preferences survey by June 30
2. I'll share final location and dates by July 5
3. Detailed agenda will be distributed by July 15
4. Booking confirmation and travel info by August 1
5. Pre-offsite team building activities in September

I'm really excited about this opportunity to bring the team together! If you have any questions, concerns, or suggestions, please don't hesitate to reach out.

Looking forward to an amazing team offsite!

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
We're consistently hitting our rate limits, particularly during peak hours. This is affecting our ability to sync data in real-time and is causing delays in our core functionality.

Usage Statistics:
- Current limit: 1,000 requests/minute
- Peak usage: 980 requests/minute (98% of limit)
- Average usage: 750 requests/minute
- Growth rate: 15% month-over-month

Impact of Current Limits:
- Sync delays during peak hours
- Error messages for end users
- Manual intervention required to restart failed jobs
- Decreased user satisfaction
- Potential data inconsistencies

Requested Changes:
- Increase to 2,500 requests/minute
- Burst capacity of 3,000 requests/minute for short periods
- More granular per-endpoint limits

Business Justification:
- Supporting 50% more users than when limits were set
- New features require more API calls
- Real-time sync is critical for user experience
- Competitors offer higher limits
- We're on the enterprise plan

Technical Details:
I've attached our detailed usage analysis and the specific endpoints that need higher limits. We've also implemented request batching and caching to minimize unnecessary calls.

Please let me know if you need any additional information or if we should schedule a call to discuss.

Thanks for your consideration!

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
OpenAI announced GPT-5 capabilities, including improved reasoning and multimodal understanding. The tech community is buzzing about potential applications in product development.

2. Design Trends
Minimalist interfaces are making a comeback, but with more focus on accessibility and inclusive design. Major companies are rethinking their design systems.

3. Developer Tools
GitHub Copilot X released with enhanced features, including voice-to-code and real-time collaboration capabilities.

💡 Product Insights

This week's case study: How Notion achieved 100M users
- Focus on community and templates
- Bottom-up adoption strategy
- Continuous iteration based on feedback
- Strong design and UX principles

🔧 Tools & Resources

1. Figma AI Plugin: Automate repetitive design tasks
2. Framer Motion 11: New animation capabilities
3. Tailwind CSS 4.0 Beta: Improved performance
4. VS Code Update: Better TypeScript support

📚 Recommended Reading

- "The Lean Product Playbook" by Dan Olsen
- "Inspired" by Marty Cagan (re-read this one!)
- "Don't Make Me Think" by Steve Krug

🎯 This Week's Challenge

Try implementing a feature using a completely new approach or technology. Step out of your comfort zone!

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

We're experiencing elevated error rates on our production servers. The team is investigating, but I wanted to give you a heads up.

Current Status:
- Error rate: 5% (normal is <0.1%)
- Affected region: US-East
- User impact: Intermittent failures on checkout flow
- Started: 2:30 PM EST
- Team: Investigating root cause

Actions Taken:
1. Scaled up server capacity
2. Enabled additional logging
3. Rolled back recent deployment
4. Monitoring system metrics

We'll send updates every 15 minutes until resolved. So far, no data loss or security concerns.

Let me know if you have questions.

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
🔗 Zoom: [meeting link]

Agenda:
1. Q2 Recap and Achievements (15 min)
2. Q3 Goals and Priorities (20 min)
3. Product Roadmap Update (15 min)
4. Department Updates (20 min)
5. Employee Recognition (10 min)
6. Open Q&A (10 min)

Please come prepared with questions! We want this to be interactive and valuable for everyone.

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
4. Agreed on the new typography scale

Action Items:
- Rico: Update Figma files by EOD Friday
- Sarah: Share detailed accessibility guidelines by Wednesday
- Team: Review updated designs by next Monday

I've attached the annotated mockups with all the feedback incorporated. Let me know if I missed anything!

Looking forward to implementing these improvements.

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

It's hard to believe it's been three years since you joined the team. Your contributions have been invaluable, and it's been amazing to see you grow in your role.

Some highlights from your time here:
- Led the redesign of our core product
- Mentored 5 junior designers
- Established our design system
- Improved our design-to-development workflow
- Won the "Innovation Award" last year

Thank you for your dedication, creativity, and positive attitude. You're an essential part of our team, and we're lucky to have you.

Here's to many more years of great work together!

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

I've reviewed your PR #2847 for the new authentication flow. Overall looks great! Just a few minor comments:

Feedback:
1. Line 45: Consider adding error handling for edge case
2. Lines 78-92: This could be refactored into a separate function
3. Tests look comprehensive - nice work!
4. Documentation is clear and helpful

Changes Requested:
- Add error handling (mentioned above)
- Update the README with new auth flow

Once those small changes are made, I'll approve. Should be quick fixes.

Great job on this feature!

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
✅ Beta badge on your profile
✅ Special beta community access

What's New in This Beta:
1. AI-powered recommendations
2. Advanced analytics dashboard
3. Team collaboration features
4. Custom integrations
5. Enhanced mobile experience

Your Feedback Matters:
We're counting on beta testers like you to help us refine these features before the public launch. Please share your honest feedback!

Getting Started:
1. Enable beta features in settings
2. Explore the new features
3. Submit feedback through the beta portal
4. Join our beta community Slack channel

Beta Program Guidelines:
- Features may have bugs - please report them!
- Some features may change or be removed
- Don't share beta features publicly yet
- Provide feedback regularly

Thank you for being an early adopter and helping us build better products!

Welcome to the Beta Program!

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

Payment Methods:
- Credit Card: [payment link]
- Bank Transfer: Details in attached invoice
- PayPal: [payment link]

Questions?
Contact our billing team at billing@example.com

Thank you for choosing our services!

Best regards,
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
💻 Platform: Zoom (link will be sent upon registration)

What You'll Learn:
- Advanced prototyping techniques
- Design system best practices
- Collaborative design workflows
- User research methodologies
- Accessibility-first design
- Performance optimization for designers

Featured Speakers:
- Jane Doe, Design Director at TechCorp
- John Smith, Principal Designer at DesignCo
- Maria Garcia, UX Research Lead at Innovation Inc.

Why Attend:
This webinar is perfect for designers looking to level up their skills and learn from industry leaders. We'll cover practical techniques you can apply immediately to your work.

Bonus:
All attendees will receive:
- Presentation slides
- Resource guide
- Certificate of attendance
- Access to recording
- Design templates

Register Now: [registration link]

Space is limited! Register today to secure your spot.

We look forward to seeing you there!

Best regards,
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

I'm working on a Button component that needs different styles for primary, secondary, and text variants. Should I use:

1. Inline conditionals
2. CSS classes
3. Styled-components variants
4. Something else?

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

I was thinking we could try that new Italian place downtown that everyone's been talking about. They have great reviews and the menu looks amazing!

Let me know if you're interested and if Friday works for you. I'll coordinate with the rest of the team.

Looking forward to it!

Sarah`,
    date: new Date("2024-06-20T16:20:00"),
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
  },
];
