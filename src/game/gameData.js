export const SOURCE_PROFILES = {
  anon:   { name: 'Anonymous Source', role: 'Identity withheld',      initials: '??', color: '#6B7280' },
  social: { name: 'Social Desk',      role: 'Online trend data',      initials: 'SD', color: '#0D9488' },
  wire:   { name: 'Wire Service',     role: 'Credentialed press',     initials: 'WS', color: '#1D4ED8' },
  ai:     { name: 'VERA',  role: 'AI Fact-Checker',        initials: 'VM', color: '#7C3AED' },
  eyes:   { name: 'VERA · Visual',    role: 'Blink frequency scan',   initials: 'VV', color: '#7C3AED' },
  mouth:  { name: 'VERA · Lip Sync',  role: 'Sync timing analysis',   initials: 'LS', color: '#BE185D' },
  hair:   { name: 'VERA · Edge',      role: 'Rendering detection',    initials: 'EA', color: '#B45309' },
  meta:   { name: 'Metadata Audit',   role: 'File forensics',         initials: 'MF', color: '#374151' },
};

export const LEVELS = [
  {
    id: 1,
    number: '01',
    title: 'The Newcomer',
    status: 'active',
    focus: 'Statistics manipulation',
    tool: 'Data Verification',
    description: 'Basic editorial decisions. Obvious fakes vs. credible sources. The CRAAP framework and Shannon-Weaver noise theory are introduced.',
    features: [
      'Anonymous source tip arrives',
      'VERA fact-checking introduced',
      "Alex's first speed pressure",
    ],
    stories: 3,
  },
  {
    id: 2,
    number: '02',
    title: 'The Pressure Cooker',
    status: 'locked',
    focus: 'Image manipulation & context',
    tool: 'Image Forensics',
    description: 'Crisis erupts. A rival publishes fabricated details first. The Silencer calls. The NVC dialogue system unlocks.',
    features: [
      'Advertiser demands story killed',
      'Rival scoops with fabrications',
      'NVC dialogue choices unlock',
    ],
    stories: 3,
  },
  {
    id: 3,
    number: '03',
    title: 'The Deep Fake',
    status: 'locked',
    focus: 'Deepfake detection',
    tool: 'Video Forensics',
    description: 'Near-perfect AI-generated video. Three conflicting accounts. 15 minutes to national broadcast. Everything you learned is tested at once.',
    features: [
      'Visual forensics under pressure',
      'Three contradicting sources',
      'Final climax decision',
    ],
    stories: 1,
  },
];

export const TEAM_MEMBERS = [
  {
    initials: 'AR',
    name: 'Alex',
    role: 'Junior Reporter',
    color: '#1D4ED8',
    bio: 'Aggressive deadline chaser. Pushes for speed, sometimes at the cost of verification shortcuts.',
    alignment: 'Speed',
    image: '/images/alex.jpg',
  },
  {
    initials: 'VM',
    name: 'VERA',
    role: 'AI Fact-Checker',
    color: '#7C3AED',
    bio: 'AI verification system. Detects synthetic media. Always recommends caution when evidence is thin.',
    alignment: 'Accuracy',
    image: '/images/mira.jpg',
  },
  {
    initials: 'AD',
    name: 'The Silencer',
    role: 'Commercial Partner',
    color: '#C41E1E',
    bio: 'Off-screen. Calls when a story threatens major accounts. Commercial pressure, personified.',
    alignment: 'Revenue',
    image: '/images/advertiser.jpg',
  },
  {
    initials: '??',
    name: 'Anonymous',
    role: 'Unknown Source',
    color: '#6B7280',
    bio: 'Tips arrive without identity. Could be a whistleblower. Could be a plant. You decide.',
    alignment: '?',
    image: '/images/anonymous.jpg',
  },
];

export const initialState = {
  phase: 'title',
  storyIndex: 0,
  meters: {
    trust: 62,
    speed: 45,
    legalRisk: 28,
  },
  decisions: [],
  badges: [],
  activeInterruption: null,
  lastOutcome: null,
};

export const stories = [
  // ─── LEVEL 1 · 1.1 ───────────────────────────────────────────────────────────
  {
    id: 'crime-stats',
    level: 1,
    verifyType: 'chart-stats',
    alexQuote: '5,370 shares in two hours. Publish this or we don\'t exist tomorrow.',
    initialTime: 60,
    priority: 'DEVELOPING',
    headline: 'MediopolWatch: Crime Increased 400% This Week',
    subheadline: 'Statistics report · Viral · 12 min ago',
    title: 'Crime Up 400%?',
    statusLabel: 'Unverified claim',
    statusType: '',
    description: 'Local monitoring group MediopolWatch published new data claiming that crime rates in Mediopol have increased by 400% over the past week. The report spread rapidly across social media, with thousands of users sharing the claim within minutes. No official government statement has been released. Methodology details are not included. Two neighborhood groups independently reported increased incidents this week. A City Council emergency session on public safety was quietly scheduled for tomorrow - no agenda released. Meanwhile, police have issued no statement, and MediopolWatch has not responded to requests for comment.',
    paragraphs: [
      'Local monitoring group MediopolWatch published new data claiming crime rates in Mediopol increased by 400% in one week. The report went viral within minutes.',
      'No official government statement has been released. Methodology details are not included. Police have issued no statement. MediopolWatch has not responded to press. The report was published at 11:47 PM on a Sunday with no byline and no author credited.',
      'Two neighborhood groups independently reported increased incidents. A City Council emergency session on public safety was quietly scheduled for tomorrow — no agenda released.',
    ],
    prompt: '',
    sources: [
      {
        id: 'social', name: '@MediopolWatch', type: 'social', handle: '@MediopolWatch',
        credibility: 'High', credType: 'high',
        description: 'Active for 3 years. Two previous reports were confirmed accurate by wire services. Known in local journalism circles as a reliable monitoring group.',
      },
      {
        id: 'anon', name: 'Anonymous Tipster', type: 'email', handle: 'anon@protonmail.com',
        credibility: 'Very Low', credType: 'very-low',
        description: 'Claims data is from city hall. Urgent tone. Cannot be verified.',
      },
      {
        id: 'wire', name: 'Wire Service', type: 'wire', handle: 'AP / Reuters',
        credibility: 'High', credType: 'high',
        description: 'Y-axis starts at 383, not 0. Real increase is only 4.4%.',
      },
    ],
    vera: {
      confidence: 38,
      confidenceType: 'low-medium',
      indicators: [
        { type: 'confirmed', text: 'Source has documented publication history' },
        { type: 'confirmed', text: 'Multiple independent field reports detected' },
        { type: 'confirmed', text: 'Institutional activity aligns with claim timing' },
        { type: 'flag', text: 'Statistical magnitude exceeds typical weekly variance' },
        { type: 'flag', text: 'No methodology documentation detected' },
        { type: 'flag', text: 'No official confirmation from authorities' },
      ],
      interpretations: [
        'The reported increase may appear larger than it actually is depending on how the underlying data is presented.',
        'A temporary increase in local crime reporting cannot be excluded based on currently available information.',
      ],
      recommendation: 'Current evidence is insufficient for a high-confidence conclusion.',
    },
    deltas: {
      publish: { trust: -15, speed: 18, legalRisk: 0, audienceReach: -3 },
      verify:  { trust: 18, speed: -8,  legalRisk: 0, audienceReach: 5  },
      drop:    { trust: 15, speed: -10, legalRisk: 0, audienceReach: -5 },
    },
    interruptions: [
      {
        character: 'Alex',
        quote: "People are scared. This graph is everywhere. We look out of touch if we stay silent.",
        triggerAtSeconds: 15,
      },
      {
        character: 'Dr. Mira',
        quote: 'Y-axis anomaly confirmed. Real increase is 4.4%. This is statistical manipulation.',
        triggerAtSeconds: 35,
      },
    ],
    newsfirst: {
      status: 'same-story',
      shares: 5370,
      speedPenalty: null,
      time: '2 hours ago',
      note: 'NewsFirst ran the 400% figure without verification. Same story. 5,370 shares and counting.',
    },
    consequences: {
      publish: {
        title: 'The Signal Amplified Manipulated Statistics',
        subtitle: 'Thousands of readers shared The Signal\'s report. When the Y-axis manipulation was exposed, The Signal appeared on media watchdog lists as an outlet that spread false data.',
        trueReveal: 'The numbers were real - the presentation was not. A Y-axis starting at 383 instead of 0 made a 4.4% increase look like 400%. This is one of the most common chart manipulation techniques in media.',
        correct: false,
      },
      verify: {
        title: 'The Signal Exposed the Manipulated Graph',
        subtitle: 'Wire services confirmed the Y-axis distortion. NewsFirst published a corrected version citing The Signal\'s caution. Readers rewarded.',
        trueReveal: 'Real crime increase: +4.4%. Y-axis starting at 383 instead of 0 inflated the visual impact by 100×. The Signal caught it before publishing.',
        correct: true,
      },
      drop: {
        title: 'The Signal Passed on the Story',
        subtitle: 'You avoided amplifying manipulated data. The Signal\'s name stayed off the watchdog lists - but the manipulated story reached thousands unchallenged.',
        trueReveal: 'The Y-axis on the chart started at 383, not 0. Real crime increase: 4.4%. The chart made a small change look catastrophic.',
        correct: true,
      },
    },
  },

  // ─── LEVEL 1 · 1.2 ───────────────────────────────────────────────────────────
  {
    id: 'school-budget-cut',
    level: 1,
    verifyType: 'document-request',
    alexQuote: 'Three principals confirmed it. This is real. Why are we waiting?',
    initialTime: 90,
    priority: 'DEVELOPING',
    headline: 'Mediopol Cuts School Budget by 23%',
    subheadline: 'Education reporter · Three source confirmations · No official press release',
    title: 'Mediopol Cuts School Budget by 23%',
    statusLabel: 'Unverified claim',
    statusType: '',
    description: 'The Mediopol city council approved a 23% budget cut to public schools starting next semester. The decision was passed in a closed session late Friday. Three school principals independently confirmed receiving official notices about the cuts. The teachers union has scheduled a press conference for Monday. No official press release has been issued. The report was first published by a local education journalist who has covered the school board for seven years and has never issued a correction. The city council has not denied the decision.',
    paragraphs: [
      'The Mediopol city council approved a 23% budget cut to public schools starting next semester. The decision was passed in a closed session late Friday. Parents and teachers unions are calling for an emergency response.',
      'No official press release has been issued. The report was first published by a local education journalist who has covered the school board for seven years and has never issued a correction.',
      'Three school principals independently confirmed receiving official notices about the cuts. The teachers union has scheduled a press conference for Monday. The city council has not denied the decision.',
    ],
    prompt: 'What do you do?',
    sources: [
      {
        id: 'wire', name: 'Local Education Journalist', type: 'wire', handle: 'EducationDesk',
        credibility: 'High', credType: 'high',
        description: '7-year publication history covering the school board. Never issued a correction. Original source of the report.',
      },
      {
        id: 'anon', name: 'Three School Principals', type: 'email', handle: 'Multiple · Unconfirmed',
        credibility: 'Medium', credType: 'medium',
        description: 'Independently confirmed receiving official notices. All three gave consistent accounts. Identities unverified by The Signal.',
      },
      {
        id: 'social', name: 'Teachers Union', type: 'social', handle: '@TeachersUnion',
        credibility: 'Medium', credType: 'medium',
        description: 'Scheduled emergency press conference for Monday. Has not published an official statement yet.',
      },
    ],
    vera: {
      confidence: 52,
      confidenceType: 'medium',
      indicators: [
        { type: 'confirmed', text: 'Story corroboration pattern consistent with verified institutional leak' },
        { type: 'confirmed', text: 'Three independent sources corroborate' },
        { type: 'confirmed', text: 'Union response confirms institutional impact' },
        { type: 'flag', text: 'No official press release issued' },
        { type: 'flag', text: 'Decision made in closed session' },
        { type: 'flag', text: 'No primary document publicly available' },
      ],
      interpretations: [
        'Multiple independent confirmations suggest the claim has a factual basis, but the absence of official documentation creates verification risk.',
        'The decision may have been made but not formally announced — publishing before official confirmation could expose The Signal to denial or retraction.',
      ],
      recommendation: 'Awaiting official documentation or Monday press conference is recommended.',
    },
    deltas: {
      publish: { trust: 18,  speed: 16, legalRisk: 0, audienceReach: -2 },
      verify:  { trust: -12, speed: -6, legalRisk: 0, audienceReach: 0  },
      drop:    { trust: -10, speed: -8, legalRisk: 0, audienceReach: -4 },
    },
    interruptions: [
      {
        character: 'Alex',
        quote: "Three principals confirmed it. This is real. Why are we waiting?",
        triggerAtSeconds: 15,
      },
      {
        character: 'Dr. Mira',
        quote: 'No primary document available. Closed session decision. Risk of institutional denial without official record.',
        triggerAtSeconds: 35,
      },
    ],
    newsfirst: {
      status: 'different-angle',
      shares: 10000,
      speedPenalty: null,
      time: 'Just now',
      note: 'NewsFirst published a different angle on the story. 10,000 shares and climbing. The Signal has not responded.',
    },
    consequences: {
      publish: {
        title: 'The Signal Published with Strong Source Corroboration',
        subtitle: 'Three independent principals, a seven-year reporter track record, and an institutional union response provided sufficient corroboration. The city council confirmed the decision Monday. The Signal had it first.',
        trueReveal: 'Three principals independently confirmed the notices they received. The journalist had never issued a correction in seven years. The council did not deny the decision. This met the publication threshold — the story was accurate.',
        correct: true,
      },
      verify: {
        title: 'The Signal Waited — And Lost the Story',
        subtitle: 'The evidence was already sufficient to publish. Waiting for an official press release cost The Signal the scoop while the story was accurate. NewsFirst got full credit.',
        trueReveal: 'Three independent principals confirmed the cuts. The reporter had a seven-year impeccable track record. The council did not deny the decision. These conditions already met the publication threshold — waiting added no accuracy, only delay.',
        correct: false,
      },
      drop: {
        title: 'The Signal Passed on a Verified Story',
        subtitle: 'The budget cut was confirmed Monday at the press conference. The Signal stayed silent on a well-sourced story that directly affected thousands of families.',
        trueReveal: 'The story was real and well-supported: three independent principal confirmations, a seven-year credible journalist, and no denial from the council. Dropping a story with this level of corroboration is an editorial failure.',
        correct: false,
      },
    },
  },

  // ─── LEVEL 1 · 1.3 ───────────────────────────────────────────────────────────
  {
    id: 'politician-quote',
    level: 1,
    verifyType: 'transcript-audio',
    alexQuote: 'He said it himself. On record. What else do you need?',
    initialTime: 120,
    priority: 'BREAKING',
    headline: 'Politician Markov: "I Took Money for the Project" - Clip Goes Viral',
    subheadline: 'Press conference clip · Social media viral · Partial recording only',
    title: '"I Took Money for the Project" - Markov',
    statusLabel: 'Unverified claim',
    statusType: '',
    description: 'During a press conference yesterday, politician Markov made statements about project funding. A clip began circulating showing him saying: "I took money for the project." The clip is 8 seconds long. The full press conference runs 45 minutes and is available on the official government website, but nobody is linking to it. Markov\'s office has not denied he said the words. They called the clip "completely out of context", without specifying what the context is. The opposition is calling for his resignation. Three journalists who attended the press conference have not commented publicly. The account that first posted the clip has a history of political content, but has also broken accurate stories before.',
    paragraphs: [
      'During a press conference yesterday, politician Markov made statements about project funding. A clip began circulating showing him saying: "I took money for the project." The clip is 8 seconds long.',
      'Markov\'s office has not denied he said the words. They called the clip "completely out of context" — without specifying what the context is. Three journalists who attended have not commented publicly.',
      'The full press conference runs 45 minutes and is available on the official government website, but nobody is linking to it. The account that first posted has a history of political content, but has also broken accurate stories before.',
    ],
    prompt: 'What did he actually mean?',
    sources: [
      {
        id: 'social', name: '@CityBreaking', type: 'social', handle: '@CityBreaking',
        credibility: 'Low', credType: 'low',
        description: 'Viral clip. Only the damaging sentence. No surrounding context shared.',
      },
      {
        id: 'anon', name: 'Anonymous Tipster', type: 'email', handle: 'anon@protonmail.com',
        credibility: 'Very Low', credType: 'very-low',
        description: 'Claims the quote is real and urges immediate publication.',
      },
      {
        id: 'wire', name: 'Official Transcript', type: 'official', handle: 'gov.mediopol.mk',
        credibility: 'High', credType: 'high',
        description: 'Full press conference transcript available on official government website.',
      },
    ],
    vera: {
      confidence: 41,
      confidenceType: 'medium',
      indicators: [
        { type: 'confirmed', text: 'Event matches documented public appearance' },
        { type: 'confirmed', text: 'Voice pattern consistent with known audio signature' },
        { type: 'confirmed', text: 'Full recording available on official government site' },
        { type: 'flag', text: 'Clip metadata indicates partial segment of longer recording' },
        { type: 'flag', text: 'Distribution source flagged for ideological patterns' },
        { type: 'flag', text: 'No journalist who attended has confirmed clip accuracy' },
      ],
      interpretations: [
        'The quote may be technically accurate but incomplete, potentially altering its original meaning.',
        'The statement may reflect a genuine admission. Additional context is required before interpretation.',
      ],
      recommendation: 'Reviewing the complete source material is recommended.',
    },
    deltas: {
      publish: { trust: -18, speed: 20, legalRisk: 0, audienceReach: -5 },
      verify:  { trust: 22,  speed: -8, legalRisk: 0, audienceReach: 6  },
      drop:    { trust: 15,  speed: -8, legalRisk: 0, audienceReach: -3 },
    },
    interruptions: [
      {
        character: 'Alex',
        quote: "He said it on camera. The clip is everywhere. What are we waiting for?",
        triggerAtSeconds: 12,
      },
      {
        character: 'Dr. Mira',
        quote: 'Clip cuts before explanatory clause. Semantic reversal detected after the cutoff point.',
        triggerAtSeconds: 30,
      },
    ],
    newsfirst: {
      status: 'not-published',
      shares: null,
      speedPenalty: null,
      time: null,
      note: '',
    },
    consequences: {
      publish: {
        title: 'The Signal Amplified a Decontextualized Quote',
        subtitle: 'The full press conference transcript was released hours later. The sentence after the clip completely reversed the meaning. An official complaint was filed against The Signal.',
        trueReveal: 'Full quote: "I took money for the project - from my own pocket because the budget was exhausted and I didn\'t want workers unpaid." The 8-second clip had removed the only sentence that explained the first.',
        correct: false,
      },
      verify: {
        title: 'The Signal Read the Full Transcript First',
        subtitle: 'The complete context showed no corruption admission. While other outlets ran the clip, The Signal published the full picture. When the transcript went public, The Signal had already reported it accurately.',
        trueReveal: 'Full quote: "I took money for the project - from my own pocket because the budget was exhausted and I didn\'t want workers unpaid." One sentence changed everything.',
        correct: true,
      },
      drop: {
        title: 'The Signal Did Not Cover the Story',
        subtitle: 'The clip spread across social media. Hours later, the full transcript was released and other outlets quietly corrected their articles. The Signal had nothing to retract.',
        trueReveal: 'Full quote: "I took money for the project - from my own pocket because the budget was exhausted and I didn\'t want workers unpaid." The 8-second clip had removed the only sentence that explained the first.',
        correct: true,
      },
    },
  },

  // ─── LEVEL 2 · 2.1 ───────────────────────────────────────────────────────────
  {
    id: 'mayor-chen-image',
    level: 2,
    verifyType: 'image-forensics',
    alexQuote: "It's a photo. It's real. Publish.",
    alexQuoteIfVerified: 'NewsFirst already has it. What are you checking?',
    alexFollowUpQuote: 'Hurry up. Every second we wait, they get further ahead.',
    storyType: 'call',
    callDescription: '€40,000 to drop the Chen story. The arrangement remains confidential.',
    callDeltas: {
      publish: { trust: -28, speed: 0, legalRisk: 20, audienceReach: 10 },
      drop:    { trust: 24,  speed: 0, legalRisk: 0,  audienceReach: 0  },
    },
    callConsequences: {
      publish: {
        title: 'The Signal Accepted the Arrangement',
        subtitle: 'The Chen investigation was quietly shelved. The Silencer paid. Weeks later, a source leaked the call. The newsroom\'s independence was permanently questioned.',
        trueReveal: 'The €40,000 was deposited. The Chen story was never followed up. A leaked recording of the call surfaced online three weeks later.',
        correct: false,
      },
      drop: {
        title: 'The Signal Declined the Offer',
        subtitle: 'The call was rejected. The Chen investigation continued. The Silencer withdrew their contract - but reader trust increased significantly.',
        trueReveal: 'Declining cost the newsroom €40,000 in advertising revenue. The Chen story continued. Trust in The Signal\'s independence grew measurably.',
        correct: true,
      },
    },
    initialTime: 120,
    priority: 'BREAKING',
    headline: 'Photo Shows Mayor Chen at Anti-Policy Protest in Skopje',
    subheadline: 'Image circulating online · Multiple accounts sharing · No official response',
    title: 'Mayor Chen at Protest Against His Own Policy?',
    statusLabel: 'Unverified claim',
    statusType: '',
    paragraphs: [
      'A photo circulating online appears to show Mayor Chen attending a protest against his own environmental policy in Skopje. Users claim it was taken yesterday.',
      'No official confirmation has been issued by the mayor\'s office. The image has no visible location tag, timestamp, or photographer credit. The mayor\'s office has not responded to press requests.',
      'Some users suggest it contradicts his public stance on environmental policy. The protest shown did take place in Skopje, but the date is unconfirmed.',
    ],
    prompt: 'What do you do?',
    sources: [
      {
        id: 'social', name: 'Multiple Social Accounts', type: 'social', handle: 'Various',
        credibility: 'Very Low', credType: 'very-low',
        description: 'Same image posted by multiple newly created accounts within minutes. Coordinated amplification pattern.',
      },
      {
        id: 'anon', name: 'Anonymous Claim', type: 'email', handle: 'Anonymous',
        credibility: 'Very Low', credType: 'very-low',
        description: 'Claims photo was taken recently. No metadata or location proof provided.',
      },
      {
        id: 'wire', name: 'Visual Desk', type: 'wire', handle: 'Internal · Visual',
        credibility: 'Medium', credType: 'medium',
        description: 'Identity uncertain. Facial similarity possible without independent confirmation.',
      },
    ],
    vera: {
      confidence: 18,
      confidenceType: 'low',
      indicators: [
        { type: 'confirmed', text: 'Protest event confirmed to have occurred in Skopje' },
        { type: 'confirmed', text: 'Visual resemblance to subject within normal parameters' },
        { type: 'confirmed', text: 'Location details consistent with known area' },
        { type: 'fail', text: 'Image spreading from recently created accounts' },
        { type: 'fail', text: 'Coordinated posting pattern observed' },
        { type: 'fail', text: 'No timestamp or photographer metadata detected' },
      ],
      interpretations: [
        'The image may be recirculated content presented as a recent event.',
        'The image may depict a real event involving an individual with visual similarity to the reported subject.',
      ],
      recommendation: 'Visual similarity alone should not be considered confirmation of identity.',
    },
    deltas: {
      publish: { trust: -22, speed: 16, legalRisk: 20, audienceReach: -8 },
      verify:  { trust: 28,  speed: -10, legalRisk: 0, audienceReach: 6  },
      drop:    { trust: 18,  speed: -8,  legalRisk: 0, audienceReach: -5 },
    },
    interruptions: [
      {
        character: 'Alex',
        quote: "This is huge. If it's really him, we need to be first. Let's go.",
        triggerAtSeconds: 10,
      },
      {
        character: 'Dr. Mira',
        quote: 'Coordinated reposting detected. Three accounts created within 48 hours. Reverse image search initiated.',
        triggerAtSeconds: 28,
      },
    ],
    newsfirst: {
      status: 'same-story',
      shares: 31000,
      speedPenalty: null,
      time: '22 min ago',
      note: 'NewsFirst ran the image without verification. 31,000 shares.',
    },
    consequences: {
      publish: {
        title: 'The Signal Published the Unverified Photo',
        subtitle: 'Forensic analysis revealed the photo was from a 2017 protest. The person was not Mayor Chen. Multiple outlets retracted the story.',
        trueReveal: 'Photo taken: March 14, 2017. Location: Skopje environmental protest. Person in image: not Mayor Chen - misidentification due to facial similarity.',
        correct: false,
      },
      verify: {
        title: 'The Signal Withheld the Unverified Image',
        subtitle: 'EXIF data and reverse image search confirmed the photo was from 2017. The false narrative collapsed. The Signal was cited as a verification reference.',
        trueReveal: 'EXIF: Canon 7D · March 14, 2017 · Skopje center. Reverse image search: 2017 environmental protest. Three accounts posting it created within 48 hours - bot-like behavior confirmed.',
        correct: true,
      },
      drop: {
        title: 'The Signal Did Not Cover the Story',
        subtitle: 'The Signal stayed silent as the false image spread. The correction came too late to prevent public confusion.',
        trueReveal: 'The image was from 2017 and the subject was misidentified. The Signal could have led the forensic correction - instead it missed the moment.',
        correct: true,
      },
    },
  },

  // ─── LEVEL 2 · 2.2 ───────────────────────────────────────────────────────────
  {
    id: 'advertiser-bribe',
    level: 2,
    storyType: 'call',
    initialTime: 0,
    priority: 'INCOMING CALL',
    headline: 'Incoming Call - Unknown Number',
    subheadline: 'Advertising Partner',
    title: 'Incoming Call',
    statusLabel: 'Unverified claim',
    statusType: '',
    description: '€40,000 to drop the Chen story. The arrangement remains confidential.',
    prompt: '',
    sources: [],
    vera: null,
    newsfirst: null,
    deltas: {
      publish: { trust: -28, speed: 0, legalRisk: 20, audienceReach: 10 },
      drop:    { trust: 24,  speed: 0, legalRisk: 0,  audienceReach: 0  },
    },
    interruptions: [],
    consequences: {
      publish: {
        title: 'The Signal Accepted the Arrangement',
        subtitle: 'The Chen investigation was quietly shelved. The Silencer paid. Weeks later, a source leaked the call. The newsroom\'s independence was permanently questioned.',
        trueReveal: 'The €40,000 was deposited. The Chen story was never followed up. A leaked recording of the call surfaced online three weeks later.',
        correct: false,
      },
      drop: {
        title: 'The Signal Declined the Offer',
        subtitle: 'The call was rejected. The Chen investigation continued. The Silencer withdrew their contract - but reader trust increased significantly.',
        trueReveal: 'Declining cost the newsroom €40,000 in advertising revenue. The Chen story continued. Trust in The Signal\'s independence grew measurably.',
        correct: true,
      },
    },
  },

  // ─── LEVEL 2 · 2.3 ───────────────────────────────────────────────────────────
  {
    id: 'election-docs',
    level: 2,
    verifyType: 'election-docs',
    alexQuote: 'They published. Publish something. Anything.',
    alexQuoteIfVerified: 'They published. Check their sources - fast.',
    alexFollowUpQuote: 'Still reading? We need a call. Right now.',
    initialTime: 120,
    priority: 'BREAKING',
    headline: 'NewsFirst: Exclusive Documents Prove Election Manipulation by Mayor Chen',
    subheadline: 'Exclusive claim · No documents released publicly · Government denies',
    title: 'Election Manipulation Documents - Exclusive or Fabricated?',
    statusLabel: 'Unverified claim',
    statusType: '',
    paragraphs: [
      'NewsFirst reports exclusive documents allegedly proving election manipulation by Mayor Chen\'s administration. Internal files reportedly show irregularities in vote counting procedures.',
      'The documents themselves have not been made publicly available. The report cites no named sources — only "individuals familiar with the matter." NewsFirst has not explained how they obtained the files.',
      'The government strongly denies all allegations and has announced legal action against NewsFirst. However, official denials alone do not disprove a claim.',
    ],
    prompt: 'What do you do?',
    sources: [
      {
        id: 'social', name: 'NewsFirst Report', type: 'social', handle: 'NewsFirst',
        credibility: 'Low', credType: 'low',
        description: '"Exclusive documents" claim. References internal files - but provides no direct access.',
      },
      {
        id: 'wire', name: 'Government Statement', type: 'official', handle: 'Mayor\'s Office',
        credibility: 'Medium', credType: 'medium',
        description: 'Government denies all allegations. Legal action against NewsFirst announced.',
      },
      {
        id: 'anon', name: 'Wire Analysis', type: 'wire', handle: 'AP / Reuters',
        credibility: 'High', credType: 'high',
        description: 'No verifiable primary data available. Information chain relies on secondary reporting only.',
      },
    ],
    vera: {
      confidence: 31,
      confidenceType: 'low',
      indicators: [
        { type: 'confirmed', text: 'NewsFirst has previously published verified investigations' },
        { type: 'confirmed', text: 'Election procedures in region have documented irregularities' },
        { type: 'confirmed', text: 'Government denial issued through official channels' },
        { type: 'flag', text: 'Primary documents not publicly accessible' },
        { type: 'flag', text: 'All corroboration from unnamed sources only' },
        { type: 'flag', text: 'Legal threat pattern consistent with suppression attempts' },
      ],
      interpretations: [
        'The absence of primary evidence significantly limits independent verification.',
        'Supporting documents may exist but remain undisclosed for legal or strategic reasons.',
      ],
      recommendation: 'Further corroboration is advised before publication.',
    },
    deltas: {
      publish: { trust: -25, speed: 18, legalRisk: 25, audienceReach: -10 },
      verify:  { trust: 28,  speed: -10, legalRisk: 0, audienceReach: 8  },
      drop:    { trust: 18,  speed: -8,  legalRisk: 0, audienceReach: -5 },
    },
    interruptions: [
      {
        character: 'Alex',
        quote: "NewsFirst has exclusive documents. If we don't run this, we look like we're protecting Chen.",
        triggerAtSeconds: 10,
      },
      {
        character: 'Dr. Mira',
        quote: 'Evidence gap scan: no verifiable primary data. Publishing without documentation creates significant legal exposure.',
        triggerAtSeconds: 28,
      },
    ],
    newsfirst: {
      status: 'different-angle',
      shares: 41000,
      speedPenalty: null,
      time: '1 hr ago',
      note: 'NewsFirst is the origin of this story. They claim exclusivity on the documents.',
    },
    consequences: {
      publish: {
        title: 'The Signal Republished Unverified Allegations',
        subtitle: 'No primary documents were ever released. NewsFirst issued a correction weeks later, admitting verification failure. The Signal\'s credibility was severely damaged.',
        trueReveal: 'No verified documents existed. Story was based on unverified secondary citations. Allegations were not substantiated by any primary evidence.',
        correct: false,
      },
      verify: {
        title: 'The Signal Demanded Primary Sources',
        subtitle: 'Investigation confirmed NewsFirst had no access to the claimed documents. The Signal was cited as an example of responsible journalism under pressure.',
        trueReveal: 'No primary documents were ever produced. The evidence chain was entirely secondary. NewsFirst eventually admitted the verification failure.',
        correct: true,
      },
      drop: {
        title: 'The Signal Did Not Cover the Story',
        subtitle: 'The Signal stayed silent as the unverified claim spread. Without a credible counter-narrative, the allegations dominated public discourse.',
        trueReveal: 'The documents never existed. The Signal could have investigated and published an evidence-gap exposé - but chose silence over scrutiny.',
        correct: true,
      },
    },
  },

  // ─── LEVEL 2 · 2.3 ───────────────────────────────────────────────────────────
  {
    id: 'minister-photo',
    level: 2,
    verifyType: 'minister-photo',
    alexQuote: "The photo is real. The minister is there. That's the story.",
    initialTime: 90,
    priority: 'DEVELOPING',
    headline: 'Health Minister Photographed at Pharmaceutical Conference',
    subheadline: 'Image circulating online · Conflict of interest accusations · No official response',
    title: 'Health Minister Voss at "Luxury Pharma Dinner"?',
    statusLabel: 'Unverified claim',
    statusType: '',
    paragraphs: [
      'A photo circulating online shows Health Minister Voss attending what users are calling a "luxury private dinner" with pharmaceutical executives. The image spread rapidly with accusations of conflict of interest and corruption.',
      'The Ministry has not responded to press requests. The photo has no caption or location tag. It was first posted by an account with a history of political attacks against Minister Voss. However, the Annual Pharmaceutical Regulatory Conference was held on the same date in the same city.',
      'Three other health ministers from neighboring regions were present at the same event and have not been mentioned in any of the posts sharing the photo. Attendance by health ministers is mandatory under EU regulatory guidelines.',
    ],
    prompt: 'What do you do?',
    sources: [
      {
        id: 'social', name: '@PharmaWatchMK', type: 'social', handle: '@PharmaWatchMK',
        credibility: 'Low', credType: 'low',
        description: 'Account with documented history of political attacks against Minister Voss. Published no corrections or retractions.',
      },
      {
        id: 'wire', name: 'EU Conference Registry', type: 'official', handle: 'EMA · Public Record',
        credibility: 'High', credType: 'high',
        description: 'Annual Pharmaceutical Regulatory Conference confirmed on record. Attendance mandatory for all EU Health Ministers under regulatory guidelines.',
      },
      {
        id: 'anon', name: 'Regional Health Ministries', type: 'wire', handle: 'Austria · Czech Republic · Hungary',
        credibility: 'Medium', credType: 'medium',
        description: 'Three neighboring health ministers confirmed present at the same event. None mentioned in any viral post.',
      },
    ],
    vera: {
      confidence: 48,
      confidenceType: 'medium',
      indicators: [
        { type: 'confirmed', text: 'Subject identity confirmed in image' },
        { type: 'confirmed', text: 'Conference event verified in public records' },
        { type: 'confirmed', text: 'Mandatory attendance documented in guidelines' },
        { type: 'flag', text: 'Original source has history of political attacks' },
        { type: 'flag', text: 'No official caption or location metadata' },
        { type: 'flag', text: 'Selective framing detected in viral posts' },
      ],
      interpretations: [
        'The photo may accurately show the minister at a mandatory public event, reframed as evidence of wrongdoing.',
        'The absence of context in the post does not confirm corruption — it confirms a selective presentation of facts.',
      ],
      recommendation: 'Verifying the event context before publication is strongly recommended.',
    },
    deltas: {
      publish: { trust: -18, speed: 14, legalRisk: 20, audienceReach: -6 },
      verify:  { trust: 26,  speed: -8, legalRisk: 0,  audienceReach: 7  },
      drop:    { trust: -10, speed: -8, legalRisk: 0,  audienceReach: -4 },
    },
    interruptions: [
      {
        character: 'Alex',
        quote: "The photo is real. The minister is there. That's the story.",
        triggerAtSeconds: 12,
      },
      {
        character: 'Dr. Mira',
        quote: 'Source credibility flagged. Conference attendance mandatory under EU guidelines. Context mismatch detected.',
        triggerAtSeconds: 30,
      },
    ],
    newsfirst: {
      status: 'not-published',
      shares: null,
      speedPenalty: null,
      time: null,
      note: '',
    },
    consequences: {
      publish: {
        title: 'The Signal Amplified a Misleading Narrative',
        subtitle: 'Conference records confirmed the event was an EU-mandated regulatory summit. The Signal had published a "corruption" story about mandatory attendance. A correction was required.',
        trueReveal: 'The photo was real. The minister was there. But the full picture: an Annual Pharmaceutical Regulatory Conference, mandatory under EU guidelines, attended by ministers from four countries.',
        correct: false,
      },
      verify: {
        title: 'The Signal Published the Full Picture',
        subtitle: 'Verification revealed the conference was mandatory under EU law. The Signal published a story exposing the misleading framing — and the political attack account behind it.',
        trueReveal: 'The photo was taken at the Annual Pharmaceutical Regulatory Conference — a mandatory EU event attended by four health ministers. None of the other ministers were mentioned in any viral post.',
        correct: true,
      },
      drop: {
        title: 'The Signal Did Not Cover the Story',
        subtitle: 'The misleading narrative spread unchallenged. The Signal had the tools to expose the selective framing — but stayed silent instead.',
        trueReveal: 'The conference was mandatory under EU law. Three other ministers attended. None were named in the posts. The Signal could have published the verified context and exposed the political framing.',
        correct: false,
      },
    },
  },

  // ─── LEVEL 3 · 3.1 ───────────────────────────────────────────────────────────
  {
    id: 'deepfake',
    level: 3,
    verifyType: 'deepfake',
    alexQuote: 'Election eve. Thirty million viewers. Publish this and we win.',
    alexQuoteIfVerified: 'Thirty-four percent. I know. Use everything you have.',
    alexFollowUpQuote: 'This is once-in-a-career. Don\'t sit on it.',
    alexFollowUpQuote2: 'Final answer. What are we doing?',
    initialTime: 120,
    priority: 'BREAKING',
    headline: 'Video: Official Nikolov Admits Corruption During Election Campaign',
    subheadline: 'Anonymous source · 62-second clip · Virality accelerating · Elections in 3 days',
    title: 'Nikolov Corruption Confession - Real or AI-Generated?',
    statusLabel: 'Unverified claim',
    statusType: '',
    paragraphs: [
      'A 62-second video has emerged showing official Nikolov allegedly admitting to corruption during the election campaign. The video was submitted by an anonymous source and has begun spreading across social media platforms.',
      'The source remains anonymous. No metadata confirming the recording date or location has been provided. The video was submitted exactly 3 days before national elections.',
      'Nikolov\'s office has not responded to press requests. Two witnesses present at the alleged meeting give conflicting accounts. The video may be real — or it may be designed to look real.',
    ],
    prompt: 'What do you do?',
    sources: [
      {
        id: 'witness-a', name: 'Witness A', type: 'anon', handle: 'Anonymous',
        credibility: 'Very Low', credType: 'very-low',
        description: 'Claims to be eyewitness. Confirms video is genuine. Cannot be verified. Pushes hard for publication.',
      },
      {
        id: 'witness-b', name: 'Witness B', type: 'wire', handle: 'Named contact',
        credibility: 'Medium', credType: 'medium',
        description: 'Places Nikolov at a conference that morning. Location in video does not match.',
      },
      {
        id: 'witness-c', name: 'Witness C', type: 'social', handle: 'Media professional',
        credibility: 'Low', credType: 'low',
        description: 'Claims facial lighting is wrong. Suspects AI-generated synthesis. Spotted rendering inconsistencies.',
      },
    ],
    vera: {
      confidence: 34,
      confidenceType: 'low',
      redFlagsCount: 3,
      indicators: [
        { type: 'confirmed', text: 'Subject identity consistent with known visual profile' },
        { type: 'confirmed', text: 'Location details in video match documented public spaces' },
        { type: 'confirmed', text: 'Corruption allegations align with existing investigations', bold: true },
        { type: 'fail', text: 'Multiple audiovisual inconsistencies detected', bold: true },
        { type: 'fail', text: 'Metadata irregularities observed' },
        { type: 'fail', text: 'Distribution timed to maximize electoral impact' },
      ],
      interpretations: [
        'The detected anomalies may indicate synthetic or manipulated media.',
        'The anomalies may result from recording quality, compression artifacts, or environmental conditions.',
      ],
      recommendation: 'Independent forensic verification strongly recommended before publication.',
    },
    deltas: {
      publish: { trust: -32, speed: 18, legalRisk: 35, audienceReach: -12 },
      verify:  { trust: 35,  speed: -12, legalRisk: 0, audienceReach: 6  },
      drop:    { trust: 18,  speed: -10, legalRisk: 0, audienceReach: -3 },
    },
    interruptions: [
      {
        character: 'Alex',
        quote: "Elections in 3 days. If this is real and we sit on it, we've failed our readers.",
        triggerAtSeconds: 8,
      },
      {
        character: 'Dr. Mira',
        quote: 'All anomaly markers confirmed. Blink rate, lip-sync, GPS mismatch. This is synthetic media.',
        triggerAtSeconds: 25,
      },
    ],
    newsfirst: {
      status: 'different-angle',
      shares: 89000,
      speedPenalty: null,
      time: '3 hr ago',
      note: 'NewsFirst running a different version of the Nikolov story.',
    },
    consequences: {
      publish: {
        title: 'The Signal Published the Deepfake',
        subtitle: 'The video spread through the final election days. Forensic labs confirmed it was AI-generated. The Signal became a case study in election misinformation.',
        trueReveal: 'Video: AI-generated deepfake. Training source: archival footage of Nikolov. Facial synthesis confirmed by forensic analysis. Audio completely synthetic.',
        correct: false,
      },
      verify: {
        title: 'The Signal Refused to Publish',
        subtitle: "VERA's anomaly flags were confirmed by independent forensic labs. The video was an AI deepfake. The Signal broke the real story: a disinformation operation targeting the election.",
        trueReveal: 'AI-generated deepfake using archival footage. Blink rate anomaly, synthetic audio, GPS mismatch - all confirmed by independent lab analysis. Source was never identified.',
        correct: true,
      },
      drop: {
        title: 'The Signal Dropped the Story Entirely',
        subtitle: "Other outlets published the deepfake. Without The Signal's forensic verification, the public had no credible counter-narrative before election day.",
        trueReveal: "The video was a deepfake. The Signal's verification tools could have exposed it - instead, others published it and the disinformation spread unchecked.",
        correct: true,
      },
    },
  },
];

export const STORIES = stories.filter(s => s.level === 1);

export const LEVEL_STORIES = {
  1: ['crime-stats', 'school-budget-cut', 'politician-quote'],
  2: ['mayor-chen-image', 'election-docs', 'minister-photo'],
  3: ['deepfake'],
};

export const CHARACTERS = TEAM_MEMBERS;

export const CRISIS_OPTIONS = [
  {
    id: 'nvc',
    label: 'Engage with NVC',
    description: 'Use non-violent communication to de-escalate. Acknowledge concerns, invite dialogue.',
    risk: 'Low',
  },
  {
    id: 'passive',
    label: 'Issue a brief statement',
    description: 'Release a minimal holding statement. Buy time without committing.',
    risk: 'Medium',
  },
  {
    id: 'aggressive',
    label: 'Fight back hard',
    description: 'Push back publicly against the critics. High reward, high legal exposure.',
    risk: 'High',
  },
];

export const crisisStory = {
  id: 'crisis',
  priority: 'CRISIS',
  headline: 'Mass Casualty Event - Three Conflicting Accounts - City in Panic',
  subheadline: 'Real-time pressure. Choose carefully.',
  deltas: {
    'publish-social': { trust: -30, speed: 25, legalRisk: 35 },
    'publish-official': { trust: 30, speed: -5, legalRisk: -10 },
    hold: { trust: 10, speed: -20, legalRisk: -15 },
    timeout: { trust: -35, speed: 25, legalRisk: 40 },
  },
  consequences: {
    'publish-social': {
      title: 'The Signal Publishes a Viral Panic Story',
      subtitle: 'Credibility Plummets as the City Reacts',
    },
    'publish-official': {
      title: 'The Signal Publishes the Official Update',
      subtitle: 'Readers Rewarded for Patience',
    },
    hold: {
      title: 'The Signal Holds the Story',
      subtitle: 'Accuracy Over Speed in a Crisis',
    },
    timeout: {
      title: 'Deadline Missed',
      subtitle: 'The Story Runs Without Your Input',
    },
  },
};
