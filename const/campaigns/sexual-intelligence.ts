import type { DocHighlight, DocSection } from '@/components/document/types';

// Source: "2026 Sexual Intelligence Campaign Concept" (iSMART concept note).
// Obvious typos from the source document have been corrected.

export const highlights: DocHighlight[] = [
  {
    value: '15.2%',
    label: 'of girls aged 15–19 have ever been pregnant',
    source: '2022 GDHS',
  },
  {
    value: '13,951',
    label: 'new HIV infections in Ghana in 2025',
    source: 'Ghana AIDS Commission',
  },
  {
    value: '27.5%',
    label: 'of new HIV infections are among young people',
    source: 'Ghana AIDS Commission',
  },
  {
    value: '36%',
    label: 'of ever-partnered women have experienced intimate-partner violence',
    source: '2022 GDHS',
  },
];

export const audienceTiers = [
  {
    title: 'Primary campuses',
    ages: 'Ages 8–12',
    text: 'Foundational body-literacy, personal boundaries, “good touch / bad touch” safety, self-esteem and abuse-disclosure content, delivered through storytelling, songs, puppetry and guided discussion, with no explicit sexual content, in line with international age-appropriateness guidance.',
  },
  {
    title: 'Secondary / Senior High campuses',
    ages: 'Ages 13–19',
    text: 'Puberty and reproductive health, consent, resisting peer and relationship pressure, contraception literacy, STI and HIV prevention, dating-violence recognition and reporting, digital safety (sexting, grooming, online exploitation), and life-goal-focused decision-making, delivered through interactive lecture, drama, debate and small-group facilitation.',
  },
  {
    title: 'Tertiary campuses',
    ages: 'Ages 18–25',
    text: 'Healthy adult relationships and consent, sexual health and STI/HIV prevention, dating and intimate-partner violence, digital and reproductive rights, and pre-marital and relationship-readiness counselling referrals, delivered through campus symposia, peer-led workshops and confidential Q&A/clinic-referral sessions.',
  },
];

export const sections: DocSection[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    blocks: [
      {
        type: 'paragraph',
        text: 'The Institute of Sexuality, Marriage & Family Life Research & Training (iSMART) presents the Sexual Intelligence and Healthy Relationships Campaign: a school and campus-based roadshow that delivers age-appropriate sexual health education, risky sexual behaviour prevention and healthy relationship formation to primary, secondary and tertiary learners across Ghana.',
      },
      {
        type: 'paragraph',
        text: "Ghana's young people are living through a significant health, safety and wellbeing challenge. The 2022 Ghana Demographic and Health Survey found that 15.2% of girls aged 15–19 had ever been pregnant; Ghana's 2025 national HIV estimates recorded 13,951 new infections, with young people aged 15–24 accounting for 27.5% of new infections; and the 2022 GDHS found that 36% of ever-partnered women aged 15–49 had experienced emotional, physical and/or sexual intimate-partner violence in their lifetime.",
      },
      {
        type: 'source',
        text: 'Ghana Statistical Service, 2022 Ghana Demographic and Health Survey (2023), Table 5.12, p. 94; Ghana AIDS Commission, 2025 National HIV Estimates and Projections; Ghana Statistical Service, 2022 GDHS Summary Report, p. 19.',
      },
      {
        type: 'paragraph',
        text: 'iSMART is uniquely positioned to close this gap. As a Ghanaian institute grounded in sexuality, marriage and family-life scholarship led by practical clinicians, counsellors and public-health researchers, we can deliver rigorous, evidence-based sexual health education framed in language that Ghanaian parents, teachers, chiefs and religious leaders recognise and trust. The roadshow is built from the outset on shared Ghanaian family values: respect, responsibility, self-worth and mutual care.',
      },
      {
        type: 'paragraph',
        text: 'The roadshow will travel to primary, secondary and tertiary campuses over a multi-year cycle, delivering stage-appropriate sessions on puberty and body literacy, consent and boundaries, resisting risky sexual behaviour, dating and relationship violence, digital safety, and healthy sexual decision-making, backed by trained facilitators, referral pathways to health and counselling services, and a rigorous monitoring framework.',
      },
    ],
  },
  {
    id: 'about-ismart',
    title: 'About iSMART',
    blocks: [
      {
        type: 'paragraph',
        text: 'iSMART is a Ghanaian institute registered as a company limited by guarantee, dedicated to research, training and public education on sexuality, marriage and family life. iSMART combines evidence-based holistic sexual health insights, counselling psychology, public health and qualitative social research to produce culturally grounded programming that speaks credibly to Ghanaian families, schools, faith communities and institutions.',
      },
      {
        type: 'paragraph',
        text: "iSMART's multidisciplinary team includes sexuality and family-life educators, psychologists, counsellors, sociologists and programme managers, supported by a Board of Trustees chaired by Rev. Dr Emmanuel Apea, a former UNESCO Director to Nigeria and the ECOWAS region. This combination of academic rigour, pastoral credibility and programme-delivery experience is what distinguishes iSMART from purely clinical, purely religious, or purely activist providers of sexuality education, and it is the foundation on which this campaign is built.",
      },
    ],
  },
  {
    id: 'the-case-for-ghana',
    title: 'Why This Campaign Is Needed Now',
    blocks: [
      {
        type: 'paragraph',
        text: "Ghana is one of the youngest countries in the world, with more than a third of its population falling within the youth bracket, and people under 25 making up an estimated 57% of all Ghanaians. This youthful population is potentially Ghana's greatest asset as the foundation of the demographic dividend the country needs to drive its next phase of economic growth. But that dividend depends entirely on whether young Ghanaians reach adulthood healthy, informed and equipped to make safe choices. On the evidence below, too many currently do not.",
      },
      {
        type: 'source',
        text: 'Ghana Statistical Service, 2021 Population and Housing Census, General Report Volume 3B: Age and Sex Profile.',
      },
    ],
    subsections: [
      {
        id: 'teenage-pregnancy',
        title: 'Teenage pregnancy: a persistent national emergency',
        blocks: [
          {
            type: 'paragraph',
            text: 'The 2022 Ghana Demographic and Health Survey found that 15.2% of girls aged 15–19 have ever been pregnant, while 10.9% have ever had a live birth; by age 19, 31.6% had ever been pregnant. The regional figures also show substantial variation, including 25.9% in Savannah and 22.3% in Bono East.',
          },
          {
            type: 'quote',
            text: 'Between 2016 and 2020, Ghana recorded 542,131 pregnancies amongst adolescent girls aged 15–19 years and 13,444 pregnancies amongst young teenagers aged 10–14 years.',
            cite: 'Ghana Health Service DHIMS data, via UNFPA Ghana',
          },
          {
            type: 'paragraph',
            text: "The teenage pregnancy problem has not gone away. In the Upper East Region alone, health officials recorded 4,721 teenage pregnancies in 2024, with a further 4,540 in just the first ten months of 2025, including 25 pregnancies among girls aged 10–14 in the first five months of that year alone. Regional disparities remain stark: teenage pregnancy rates run as high as 26% in parts of the Savannah Region against roughly 6% in Greater Accra, meaning the campaign must reach far beyond the capital to make a national difference. Each of these pregnancies interrupts a girl's education, elevates her risk of maternal complications, and deepens the cycle of poverty across generations.",
          },
          {
            type: 'source',
            text: 'Ghana Statistical Service, 2022 GDHS (2023 press release); Upper East Regional Health Directorate, Adolescent Health stakeholder dialogue data reported 22 November 2025.',
          },
        ],
      },
      {
        id: 'hiv',
        title: 'Rising HIV infections among young people',
        blocks: [
          {
            type: 'paragraph',
            text: 'Ghana had, until recently, been making encouraging progress against HIV. National new infections fell from 16,189 in 2024 to 13,951 in 2025, a nearly 14% decline. But this national gain masks an alarming shift in who is now driving new infections. The Ghana AIDS Commission has confirmed that young people aged 15–25 have now overtaken female sex workers and men who have sex with men as the group with the fastest-rising infection rate, accounting for around 27.5% of all new infections nationally, and roughly a third of new cases recorded in 2024.',
          },
          {
            type: 'quote',
            text: 'The 15–24 age group is experiencing a progressively rising trend in HIV cases. Many young people are prioritising the prevention of pregnancy over protection against HIV, favouring emergency contraceptive pills over condoms, which offer no protection against sexually transmitted infection.',
            cite: 'Ghana AIDS Commission, 2025',
          },
          {
            type: 'paragraph',
            text: 'The Commission has attributed the surge directly to a decade-long decline in youth-focused HIV education and awareness campaigns: a generation of adolescents reaching sexual maturity without the sustained public messaging that protected those before them. This is precisely the information and behaviour-change gap the campaign is designed to close.',
          },
          {
            type: 'source',
            text: 'Ghana AIDS Commission, national HIV estimates and public statements, 2025.',
          },
        ],
      },
      {
        id: 'violence',
        title: 'Gender-based and dating violence among young people',
        blocks: [
          {
            type: 'paragraph',
            text: 'Violence within intimate relationships is disturbingly common among Ghanaian women, and the data show it often begins early. National analysis of the 2022 GDHS found that 36% of ever-partnered women aged 15–49 have experienced emotional, physical and/or sexual intimate-partner violence in their lifetime. Critically, prevalence is highest among the youngest women: UN Ghana reporting on the national domestic violence survey found that 38.2% of women aged 15–19 and 40.4% of those aged 20–24 report having experienced at least one act of sexual violence, rates as high as or higher than women in their thirties.',
          },
          {
            type: 'paragraph',
            text: 'On university campuses specifically, published research on Ghanaian institutions documents high rates of dating and sexual violence, ranging from 30% to over 54% among undergraduate students, and describes a culture in which many students do not know how, or where, to seek help. This points to a clear gap in age-appropriate relationship-skills education at exactly the life stage the tertiary leg of this roadshow is designed to reach.',
          },
          {
            type: 'source',
            text: 'Ghana Statistical Service / GDHS 2022 secondary analyses (PLOS ONE, PMC, 2024–2025); UN Ghana 16 Days of Activism statement; Ghanaian tertiary institutional public health reviews, 2019–2023.',
          },
        ],
      },
      {
        id: 'community-engagement',
        title: 'Sexuality education and community engagement in Ghana',
        blocks: [
          {
            type: 'paragraph',
            text: 'Ghana’s experience with structured sexuality and health education shows the importance of delivering age-appropriate health and relationship education in ways that are culturally responsive and trusted by communities. The campaign therefore emphasises meaningful involvement of parents, teachers, faith leaders, traditional authorities and communities in planning, delivery and feedback.',
          },
          {
            type: 'paragraph',
            text: 'The campaign will frame age-appropriate education around responsibility, respect, self-worth, mutual care and informed decision-making, while adapting delivery to the expectations of participating communities. For partners, this supports a community-engaged model that builds trust and local ownership while maintaining age-appropriate, evidence-informed content.',
          },
        ],
      },
      {
        id: 'cost',
        title: 'The cost to the nation and to corporate Ghana',
        blocks: [
          {
            type: 'paragraph',
            text: "These outcomes are not only a public-health and human-rights concern; they are also relevant to Ghana’s social and economic development. Teenage pregnancy interrupts girls' education and reduces their lifetime earning potential. Rising HIV infection among 15–24 year-olds threatens the health of the exact age cohort now entering, or about to enter, Ghana's labour force. The Ghana Statistical Service reported average youth unemployment of 21.9% among people aged 15–35 during the first three quarters of 2025, nearly twice the national unemployment rate. A workforce additionally burdened by preventable pregnancy, untreated infection and undiagnosed trauma from relationship violence is less able to compete, retain talent, or sustain productivity. Keeping young people healthy, informed and connected to support services is therefore part of strengthening the future workforce.",
          },
          {
            type: 'source',
            text: 'Ghana Statistical Service, Quarterly Labour Force Survey, 2025; Ghana AIDS Commission, 2025.',
          },
        ],
      },
    ],
  },
  {
    id: 'goal-objectives',
    title: 'Goal & Objectives',
    blocks: [
      {
        type: 'callout',
        title: 'Goal',
        text: 'To contribute to the prevention of risky sexual behaviour, teenage pregnancy, sexually transmitted infections and dating and gender-based violence among Ghanaian learners at primary, secondary and tertiary level, by equipping them with age-appropriate sexual intelligence, decision-making skills and healthy relationship behaviours, delivered directly on their own campuses.',
      },
      {
        type: 'paragraph',
        text: 'The campaign will contribute to prevention by improving knowledge, attitudes, decision-making, help-seeking behaviour and access to appropriate referral services; it does not claim that a single programme cycle will directly reduce these outcomes.',
      },
      {
        type: 'list',
        items: [
          {
            title: 'Reach',
            text: 'Deliver a stage-appropriate Sexual Intelligence curriculum via live roadshow sessions in primary, Junior High, Senior High and tertiary institutions across sponsor-selected regions, prioritising districts with the highest documented rates of teenage pregnancy, HIV incidence and school dropout.',
          },
          {
            title: 'Build local capacity',
            text: 'Train peer educators, school counsellors and interested teachers at each participating institution to sustain conversations and referrals between roadshow visits.',
          },
          {
            title: 'Engage the adult ecosystem',
            text: 'Run parallel sensitisation sessions for parents, teachers, school management and, where relevant, chiefs and faith leaders, so that the messages young people receive on campus are reinforced, not contradicted, at home and in the community.',
          },
          {
            title: 'Connect to services',
            text: 'Establish clear referral pathways from participating schools and campuses to youth-friendly health and counselling services for learners who need support beyond what a classroom session can provide.',
          },
          {
            title: 'Generate evidence',
            text: 'Track knowledge, attitude and self-reported behaviour change through baseline and endline instruments at each institution, producing credible impact data for the Ministry of Education, Ghana Health Service and sponsoring partners.',
          },
        ],
      },
    ],
  },
  {
    id: 'reach-geography',
    title: 'Reach & Geography',
    blocks: [
      {
        type: 'paragraph',
        text: 'Initial rollout will prioritise regions carrying the heaviest documented burden, including Upper East, Savannah, Northern, Bono East, Ashanti and Central, while maintaining a Greater Accra anchor for sponsor visibility and media reach. Rollout scope, number of institutions and total learners reached in any given cycle will scale directly with the level of sponsorship secured, and will be agreed with each sponsor as part of a tailored delivery plan.',
      },
      {
        type: 'paragraph',
        text: 'Gender balance is built in at every level: at least half of session facilitators, peer educators and speaking-slot beneficiaries will be female. Materials will be adapted for learners with disabilities and translated into major Ghanaian languages, including Twi, Ga, Ewe and Dagbani.',
      },
    ],
  },
  {
    id: 'roadshow-design',
    title: 'Roadshow Design & Pedagogy',
    blocks: [],
    subsections: [
      {
        id: 'campus-visit',
        title: 'What a campus visit looks like',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Pre-visit engagement',
                text: 'iSMART liaises with school leadership, the Parent-Teacher Association and, where relevant, local faith and traditional leaders, to introduce the programme, secure consent and align content with community expectations.',
              },
              {
                title: 'The live session',
                text: 'A half-day or full-day on-campus programme combining a plenary talk, small-group facilitated discussion, drama or role-play, and an anonymous question box or live Q&A, delivered by trained iSMART facilitators and, where established, local peer educators.',
              },
              {
                title: 'Parent and teacher track',
                text: 'A parallel or follow-on session equips parents and teachers with the confidence and language to continue these conversations at home and in the classroom, addressing common myths and cultural anxieties directly.',
              },
              {
                title: 'Referral and follow-up',
                text: 'Every learner leaves with contact information for confidential counselling and youth-friendly health services. Schools are linked to a nearby referral clinic or counsellor for ongoing support.',
              },
              {
                title: 'Peer educator seeding',
                text: 'At each tertiary and larger secondary campus, iSMART identifies and trains a small cohort of student peer educators to sustain momentum between roadshow visits through school clubs and WhatsApp support groups.',
              },
            ],
          },
        ],
      },
      {
        id: 'pedagogy',
        title: 'Pedagogical approach',
        blocks: [
          {
            type: 'paragraph',
            text: 'Sessions use a participatory, values-based and gender-transformative pedagogy rather than passive lecturing: role-play, storytelling, values clarification, guided discussion and creative arts (drama, spoken word, music) help learners internalise, not merely memorise, the content. All facilitators receive standardised training in age-appropriate content boundaries, safeguarding, confidentiality and referral protocol before their first campus visit. Parental consent and youth assent processes are followed for all participants under 18, and all delivery is designed to align with respected cultural and religious values rather than oppose them.',
          },
        ],
      },
    ],
  },
  {
    id: 'safeguarding',
    title: 'Safeguarding, Ethics & Data Protection',
    blocks: [
      {
        type: 'list',
        items: [
          {
            title: 'Approvals and permissions',
            text: 'Before each engagement, iSMART will obtain the relevant Ghana Education Service, district and participating-school approvals and will document the school’s agreement on programme scope, timing and safeguarding arrangements.',
          },
          {
            title: 'Parental consent and child assent',
            text: 'For learners under 18, participation will follow documented parental/guardian consent and age-appropriate child assent processes, including for any research or monitoring activity.',
          },
          {
            title: 'Facilitator vetting and training',
            text: 'All facilitators working with minors will be vetted and trained in child safeguarding, professional boundaries, age-appropriate communication, confidentiality, referral procedures and the limits of their role before delivery.',
          },
          {
            title: 'Named safeguarding focal person',
            text: 'A designated Safeguarding Focal Person is responsible for receiving concerns, coordinating incident response, maintaining safeguarding records and escalating matters through the appropriate institutional and statutory channels.',
          },
          {
            title: 'Disclosure of abuse or violence',
            text: 'Where a learner discloses abuse, exploitation, violence or an immediate safety concern, facilitators will not investigate the allegation themselves. They will respond calmly, protect the learner from further harm, document the concern factually, notify the Safeguarding Focal Person and activate the applicable referral and reporting pathway.',
          },
          {
            title: 'Referral agreements',
            text: 'Participating schools and districts will be linked, before implementation where practicable, to qualified health, counselling and protection providers, with named contacts, confidentiality expectations, emergency escalation routes and follow-up responsibilities.',
          },
          {
            title: 'Data minimisation and secure handling',
            text: 'Personal information will be collected only when necessary for programme delivery, consent, referral or monitoring; access will be restricted to authorised personnel; electronic files will be secured; and retention and disposal will follow applicable data-protection requirements.',
          },
          {
            title: 'Sponsor access to learner information',
            text: 'Sponsors will receive programme-level outputs and anonymised, aggregated monitoring information only. Individual learner records, disclosures, counselling information and personally identifiable data will not be provided to sponsors.',
          },
          {
            title: 'Data-protection framework',
            text: 'Programme data handling will be aligned with Ghana’s Data Protection Act, 2012 (Act 843), including principles of lawful, fair and secure processing of personal information.',
          },
        ],
      },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoring, Evaluation & Learning',
    blocks: [
      {
        type: 'list',
        items: [
          {
            title: 'Baseline and endline assessment',
            text: "Short, age-appropriate knowledge, attitude and self-reported-behaviour questionnaires are administered before and after each institution's engagement to measure knowledge improvement and changes in attitudes and reported decision-making.",
          },
          {
            title: 'Routine process tracking',
            text: 'Institutions and regions covered, learners reached, facilitators and peer educators trained, parent/teacher participation, awareness of support services and referrals made are tracked and reported monthly.',
          },
          {
            title: 'Qualitative insight',
            text: 'Focus group discussions and case studies with learners, teachers and parents capture programme fidelity and cultural nuance.',
          },
          {
            title: 'Sponsor reporting',
            text: 'Each sponsoring partner receives a dedicated impact report combining quantitative reach data with qualitative testimony, formatted for direct use in CSR and sustainability reporting.',
          },
        ],
      },
    ],
  },
  {
    id: 'governance',
    title: 'Organisational Capacity & Governance',
    blocks: [
      {
        type: 'paragraph',
        text: 'iSMART is led by a multidisciplinary team of sexuality and family-life educators, psychologists, counsellors, sociologists and programme managers, several of whom have previously delivered large-scale education and health programmes with international donor and corporate funding. Governance sits with a Board of Trustees chaired by Rev. Dr Emmanuel Apea, former UNESCO Director to Nigeria and the ECOWAS region, providing strategic oversight, budget approval and compliance assurance. A Programme Steering Committee, including sponsor representatives and an independent technical advisory panel, will guide implementation, monitor progress and resolve challenges as they arise. Audited financial statements are available on request, and iSMART maintains strict child-protection and data-protection policies as a matter of institutional standard.',
      },
    ],
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    blocks: [
      {
        type: 'table',
        head: ['Risk', 'Mitigation', 'Owner'],
        rows: [
          [
            'Cultural or religious resistance to sexuality-education content',
            'Early engagement of faith leaders, chiefs and PTAs; values-aligned messaging co-developed with communities; transparent opt-out for sensitive modules',
            'iSMART Community Liaison',
          ],
          [
            'Safeguarding incidents involving minors',
            'Standardised child-protection training for all facilitators; incident-reporting protocol; referral pathways for survivors; regular safeguarding audits',
            'iSMART Safeguarding Lead',
          ],
          [
            'Logistical constraints reaching remote schools',
            'Partnership with local NGOs and district education offices; flexible scheduling; contingency budget',
            'Programme Manager',
          ],
          [
            'Funding shortfalls affecting scale',
            'Diversified sponsor base; modular, phased budgets; in-kind partnerships',
            'iSMART CEO / Steering Committee',
          ],
          [
            'Reputational sensitivity for sponsors',
            'Co-created messaging with sponsors; clear content previews; alignment with national development goals and SDGs',
            'iSMART CEO',
          ],
        ],
      },
    ],
  },
  {
    id: 'sustainability',
    title: 'Sustainability & Scale-Up',
    blocks: [
      {
        type: 'paragraph',
        text: "Sustainability is designed into the model from the outset. Trained peer educators, teachers and school counsellors remain in place after each roadshow visit, embedding the capacity to sustain conversations and early intervention long after iSMART's facilitators move to the next campus. iSMART will engage the Ghana Education Service, Ghana Health Service and National Youth Authority to explore integration of successful elements into existing school and youth-service structures, and will pursue blended financing, combining corporate sponsorship, in-kind partnership and, over time, public-private co-financing, to extend the campaign's reach year on year.",
      },
    ],
  },
  {
    id: 'sources',
    title: 'Key Sources Cited',
    blocks: [
      {
        type: 'list',
        items: [
          {
            text: 'Ghana Statistical Service (GSS), 2022 Ghana Demographic and Health Survey (GDHS) and International Day of the Girl Child 2023 press release.',
          },
          {
            text: 'Ghana Health Service, District Health Information Management System (DHIMS) teenage pregnancy data, via UNFPA Ghana.',
          },
          {
            text: 'Upper East Regional Health Directorate, Adolescent Health stakeholder dialogue data reported 22 November 2025.',
          },
          {
            text: 'Ghana AIDS Commission: national HIV estimates and public statements, 2025–2026 (Graphic Online, Citi Newsroom, GBC Ghana Online).',
          },
          {
            text: 'UN Ghana: 16 Days of Activism Against Gender-Based Violence statement; PLOS ONE and PMC secondary analyses of the 2022 GDHS on intimate-partner violence.',
          },
          {
            text: 'Peer-reviewed research on campus gender-based violence at Ghanaian universities (SAGE Open, 2024).',
          },
          {
            text: "Academic analysis of Ghana's 2019 Comprehensive Sexuality Education policy and its implementation challenges (Politics & Policy, 2024; International Journal of Adolescence and Youth, 2024).",
          },
          {
            text: 'Ghana Statistical Service: Quarterly Labour Force Survey, youth unemployment data, 2025.',
          },
          {
            text: 'Workplace wellness and productivity research: Global Wellness Institute (2025); Wellhub (2025); SEDAT Consult (Ghana employee engagement, 2024).',
          },
        ],
      },
    ],
  },
];
