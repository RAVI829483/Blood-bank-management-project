/**
 * Comprehensive Knowledge Base & Natural Language Engine for Blood Bank AI Chatbot.
 */

export const BLOOD_COMPATIBILITY = {
  "O-": {
    canDonateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-"],
    title: "Universal Red Cell Donor",
    description: "O Negative blood can be safely transfused to individuals of ANY blood group in emergencies when exact blood group matches are unavailable.",
    frequency: "~7% of global population",
  },
  "O+": {
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"],
    title: "Most Common Blood Type",
    description: "O Positive is the most needed blood type because it is the most common blood group in the general population (~38%).",
    frequency: "~38% of global population",
  },
  "A-": {
    canDonateTo: ["A-", "A+", "AB-", "AB+"],
    canReceiveFrom: ["A-", "O-"],
    title: "Rare A-Negative Blood",
    description: "A Negative red cells can be given to A and AB recipients with positive or negative Rh factor.",
    frequency: "~6% of global population",
  },
  "A+": {
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
    title: "Second Most Common Blood Type",
    description: "A Positive donors can donate to A+ and AB+ recipients, and can receive from A and O types.",
    frequency: "~34% of global population",
  },
  "B-": {
    canDonateTo: ["B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["B-", "O-"],
    title: "Rare B-Negative Blood",
    description: "B Negative is one of the rarest blood groups. High demand during emergencies.",
    frequency: "~2% of global population",
  },
  "B+": {
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
    title: "Important B-Positive Type",
    description: "B Positive blood can be transfused into B+ and AB+ individuals.",
    frequency: "~9% of global population",
  },
  "AB-": {
    canDonateTo: ["AB-", "AB+"],
    canReceiveFrom: ["AB-", "A-", "B-", "O-"],
    title: "Rarest Blood Type",
    description: "AB Negative is the rarest blood type in the world (~1%). AB- individuals are universal plasma donors.",
    frequency: "~1% of global population",
  },
  "AB+": {
    canDonateTo: ["AB+"],
    canReceiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    title: "Universal Red Cell Recipient",
    description: "AB Positive individuals can safely receive red blood cells from any blood type in the ABO/Rh system.",
    frequency: "~3% of global population",
  },
};

export const KNOWLEDGE_ITEMS = [
  {
    id: "compatibility-guide",
    category: "compatibility",
    title: "Blood Compatibility Matrix (ABO & Rh)",
    keywords: ["compatibility", "compatible", "match", "give to", "receive from", "universal donor", "universal recipient", "rh factor", "positive", "negative", "transfusion"],
    content: `### 🩸 Blood Group Compatibility Guide

- **Universal Red Cell Donor**: **O-** (Can donate red cells to ALL blood groups: O-, O+, A-, A+, B-, B+, AB-, AB+).
- **Universal Red Cell Recipient**: **AB+** (Can receive red cells from ANY blood group).
- **Universal Plasma Donor**: **AB+ / AB-** (Plasma can be safely given to all groups).

#### Quick Compatibility Summary:
| Blood Group | Can Donate Red Cells To | Can Receive Red Cells From |
|---|---|---|
| **O-** | Everyone (Universal Donor) | O- only |
| **O+** | O+, A+, B+, AB+ | O+, O- |
| **A-** | A-, A+, AB-, AB+ | A-, O- |
| **A+** | A+, AB+ | A+, A-, O+, O- |
| **B-** | B-, B+, AB-, AB+ | B-, O- |
| **B+** | B+, AB+ | B+, B-, O+, O- |
| **AB-** | AB-, AB+ | AB-, A-, B-, O- |
| **AB+** | AB+ only | Everyone (Universal Recipient) |

> 💡 *Rh Factor Rule:* Rh-negative individuals can donate to both Rh-positive and Rh-negative recipients, but can only receive Rh-negative blood.`
  },
  {
    id: "eligibility-criteria",
    category: "eligibility",
    title: "Donor Eligibility Requirements & Rules",
    keywords: ["eligible", "eligibility", "who can donate", "criteria", "weight", "age limit", "hemoglobin", "rules", "qualify", "requirements", "guidelines", "standard"],
    content: `### 📋 Who Can Donate Blood? (Donor Eligibility Criteria)

To ensure the safety of both the donor and the patient, you must meet the following standards:

1. **Age:** 18 to 65 years old (16-17 with parental consent in some regions).
2. **Weight:** Minimum **50 kg (110 lbs)**.
3. **Hemoglobin Level:** At least **12.5 g/dL** (measured via a quick painless finger prick).
4. **Blood Pressure & Pulse:** 
   - Systolic: 100 - 140 mmHg, Diastolic: 60 - 90 mmHg.
   - Pulse: 60 - 100 beats per minute, regular.
5. **Body Temperature:** Normal (must not have had fever or cold/flu in the past 48-72 hours).
6. **Donation Intervals:**
   - **Whole Blood:** Men every **90 days (3 months)**, Women every **120 days (4 months)**.
   - **Platelets (Apheresis):** Every **7 to 14 days** (up to 24 times a year).
   - **Plasma:** Every **28 days** (or every 2 weeks depending on facility guidelines).`
  },
  {
    id: "temporary-deferrals",
    category: "eligibility",
    title: "Temporary Deferrals (Tattoo, Travel, Alcohol, Smoking, Surgery)",
    keywords: ["tattoo", "piercing", "deferral", "temporary", "disqualified", "medicine", "antibiotics", "alcohol", "surgery", "pregnancy", "period", "menstruation", "smoking", "smoker", "beer", "drink"],
    content: `### ⚠️ When to Wait Before Donating (Deferral Rules)

- **Tattoos & Piercings:** Wait **6 months** to rule out bloodborne infections like Hepatitis.
- **Alcohol:** Do not consume alcohol for at least **24 hours** before and after donation.
- **Smoking:** Avoid smoking for at least **2 hours** before and after donation (carbon monoxide impairs oxygen transport).
- **Recent Antibiotics / Cold:** Must be symptom-free and finished antibiotics for at least **48 hours**.
- **Dental Work / Minor Surgery:** Wait **72 hours to 1 month** depending on the procedure.
- **Major Surgery:** Wait **6 months**.
- **Pregnancy & Breastfeeding:** Wait **6 to 12 months** postpartum and until lactation is completed.
- **Menstruation:** Safe to donate as long as you feel healthy and hemoglobin is ≥ 12.5 g/dL.`
  },
  {
    id: "health-conditions",
    category: "eligibility",
    title: "Can I Donate with Diabetes, Blood Pressure, or Thyroid?",
    keywords: ["diabetes", "diabetic", "sugar", "insulin", "bp", "hypertension", "blood pressure", "thyroid", "asthma", "cholesterol"],
    content: `### 🩺 Donating Blood with Chronic Medical Conditions

- **Diabetes:**
  - ✅ **Eligible:** If controlled by diet or oral medications (Metformin, etc.) and blood glucose is stable.
  - ❌ **Ineligible:** If you take animal-source insulin or have uncontrolled blood sugar.
- **High Blood Pressure (Hypertension):**
  - ✅ **Eligible:** If blood pressure is controlled and below 140/90 mmHg at the time of donation, even on daily BP medication.
- **Thyroid Disorders:**
  - ✅ **Eligible:** If you have had normal thyroid hormone levels on medication (e.g. Thyroxine) for at least 3 months.
- **Mild Asthma:**
  - ✅ **Eligible:** If asymptomatic on the day and not using oral steroids.`
  },
  {
    id: "donation-process",
    category: "process",
    title: "Step-by-Step Blood Donation Process",
    keywords: ["process", "steps", "how to donate", "procedure", "how long", "time taken", "pain", "needle", "what happens", "first time"],
    content: `### ⏱️ The Blood Donation Process (Takes ~30 to 45 minutes)

The actual blood collection takes only **8 to 10 minutes**! Here is the full 4-step journey:

1. **Registration (5 mins):**
   - Provide your official government ID, contact details, and blood group.
2. **Health Screening & Mini-Checkup (10-15 mins):**
   - Confidential questionnaire regarding medical history and lifestyle.
   - Temperature, blood pressure, pulse, and hemoglobin level (finger-prick test).
3. **The Donation (8-10 mins):**
   - Rest in a comfortable sanitized recliner.
   - A sterile, brand-new single-use needle collects ~350ml to 450ml of whole blood.
4. **Rest & Refreshment (10-15 mins):**
   - Enjoy complimentary juices, cookies, or light snacks to restore glucose and hydration.
   - Receive your donor certificate / donor card!`
  },
  {
    id: "pre-post-tips",
    category: "process",
    title: "Pre & Post Donation Care Tips",
    keywords: ["preparation", "before donating", "after donating", "tips", "care", "eat", "drink", "dizzy", "faint", "water", "food"],
    content: `### 💡 Pre & Post Donation Care Tips

#### Before Donating:
- 💧 **Hydrate:** Drink an extra 16 oz (500 ml) of water or fruit juice 2-3 hours beforehand.
- 🥗 **Eat a healthy meal:** Avoid fatty, oily foods (they can cause plasma lipemia and void testing). Eat iron-rich foods (spinach, beans, lean meats, raisins).
- 😴 **Sleep well:** Get 7-8 hours of restful sleep the night before.
- 🚫 **Avoid:** No alcohol 24 hours prior; avoid smoking for at least 2 hours before donation.

#### After Donating:
- 🥤 Drink plenty of fluids over the next 24-48 hours.
- 🏋️‍♂️ Avoid heavy lifting or strenuous exercise for the rest of the day.
- 🩹 Keep the bandage on your arm clean and dry for at least 4-5 hours.
- 😵 If you feel lightheaded, lie down with your feet elevated until you feel completely normal.`
  },
  {
    id: "blood-components",
    category: "science",
    title: "Blood Components & Shelf Life",
    keywords: ["components", "shelf life", "platelets", "plasma", "red blood cells", "rbc", "wbc", "storage", "temperature", "expiry", "days"],
    content: `### 🔬 Blood Components & Storage Lifespans

A single unit of whole blood is routinely separated into 3 life-saving components:

1. **Red Blood Cells (RBCs):**
   - **Role:** Transports oxygen from lungs to vital organs and tissues.
   - **Storage:** Refrigerated at **2°C to 6°C**.
   - **Shelf Life:** Up to **42 days** (with anticoagulant CPD-A / SAGM solution).
2. **Platelets (Thrombocytes):**
   - **Role:** Essential for blood clotting to stop bleeding (vital for cancer patients & trauma).
   - **Storage:** Kept at room temperature (**20°C to 24°C**) under continuous agitation.
   - **Shelf Life:** Only **5 days** (which is why regular donations are critical!).
3. **Fresh Frozen Plasma (FFP):**
   - **Role:** Contains clotting factors and antibodies for burn victims, shock, and liver disease.
   - **Storage:** Deep-frozen at **-18°C or colder**.
   - **Shelf Life:** Up to **1 full year (365 days)**.`
  },
  {
    id: "dsa-algorithms",
    category: "dsa",
    title: "Data Structures & Algorithms (DSA) in this Project",
    keywords: ["dsa", "algorithm", "merge sort", "binary search", "hash map", "linear search", "complexity", "5th sem", "data structures", "time complexity", "code"],
    content: `### 💻 DSA Concepts Implemented in this Blood Bank System

This 5th semester project implements key Data Structures and Algorithms to optimize blood inventory management, emergency search, and donor scheduling:

1. **Merge Sort (\`mergeSort\`)**
   - **Use Case:** Orders blood units by expiration date (FIFO - First In First Out) so oldest safe units are dispatched first, and sorts donors by registration date/distance.
   - **Time Complexity:** $O(n \\log n)$ guaranteed stable sorting.
   - **Space Complexity:** $O(n)$ auxiliary space.

2. **Hash Map (\`groupByHash\`)**
   - **Use Case:** Groups blood inventory stock records by blood group (A+, O-, etc.) without dropping duplicate donor batches.
   - **Time Complexity:** $O(n)$ to build; average $O(1)$ instant lookup.

3. **Binary Search (\`binarySearchFirst\`)**
   - **Use Case:** Quickly searches through pre-sorted blood bank units or sorted hospital inventory records to locate a specific blood unit or donor tier.
   - **Time Complexity:** $O(\\log n)$ search time.
   - **Space Complexity:** $O(1)$ in-place iteration.

4. **Linear Search (\`linearSearchAll\`)**
   - **Use Case:** Multi-criteria filtering in the Donor Directory matching city, blood type, status, and availability.
   - **Time Complexity:** $O(n)$.`
  },
  {
    id: "emergency-request",
    category: "emergency",
    title: "Emergency Blood Request & Hospital Protocol",
    keywords: ["emergency", "request blood", "urgent", "need blood now", "hospital request", "patient", "helpline", "sos", "critical", "contact number"],
    content: `### 🚨 Emergency Blood Request Protocol

If you or a hospital need urgent blood units:

1. **Hospital Dashboard Request:**
   - Authorized hospitals can log in and visit **Hospital > Request Blood** (\`/hospital/blood-request-create\`).
   - Specify blood group, required units, patient urgency level (*Critical*, *High*, *Standard*), and delivery timeline.
2. **Instant Matching:**
   - The system queries partner blood labs and nearby available donors using linear search and compatibility logic.
3. **Emergency Contact Numbers:**
   - **National Blood Helpline:** 104 / 108 / 1910 (24x7 Free)
   - **Project Support Desk:** Navigate to our [Contact Page](/contact) for instant assistance.
4. **Public Blood Request:**
   - If you do not have an account, immediately contact your attending doctor or nearest registered facility shown on our platform.`
  },
  {
    id: "myths-facts",
    category: "facts",
    title: "Common Myths vs Facts About Blood Donation",
    keywords: ["myth", "fact", "weak", "infection", "safe", "gain weight", "painful", "side effects", "hiv", "clean needle", "harmful"],
    content: `### 🧐 Myths vs. Facts About Donating Blood

- **Myth:** *Donating blood makes you weak or sick.*
  - **Fact:** No! Your body contains 4.5 to 5.5 liters of blood. A donation takes only ~450ml (~8-10%), which the body naturally regenerates in 24 to 48 hours.
- **Myth:** *You can catch HIV or hepatitis by donating blood.*
  - **Fact:** Absolutely impossible. Every single needle, syringe, and blood bag is 100% sterile, factory-sealed, used once, and safely incinerated.
- **Myth:** *It hurts very badly.*
  - **Fact:** You will feel a tiny pinch for 1 second during insertion. The rest of the process is virtually painless.
- **Myth:** *Vegetarians cannot donate blood.*
  - **Fact:** Vegetarians can donate without issue as long as their hemoglobin meets the minimum threshold of **12.5 g/dL**.`
  },
  {
    id: "rare-blood-types",
    category: "science",
    title: "Rare Blood Types & Bombay Phenotype (hh)",
    keywords: ["bombay", "rare blood", "golden blood", "rh-null", "hh blood", "phenotype", "rarest"],
    content: `### 🌟 Rare Blood Types & Special Phenotypes

1. **Bombay Blood Group (hh Phenotype):**
   - Discovered in Bombay (Mumbai), India in 1952 by Dr. Y.M. Bhende.
   - Individuals lack the 'H' antigen which is the precursor for A and B antigens.
   - They test as 'O' in standard tests, but produce anti-H antibodies, so they can **only** receive blood from another Bombay blood individual!
2. **Rh-Null ("Golden Blood"):**
   - Complete absence of all 61 antigens in the Rh system.
   - Fewer than 50 people in human history have been confirmed to have this blood type.
   - Universal donor for anyone with rare Rh system mutations, but extremely hard to find.`
  },
  {
    id: "registration-help",
    category: "general",
    title: "How to Register on this Website (Donor & Facility)",
    keywords: ["how to register", "signup", "sign up", "join", "create account", "donor register", "hospital register", "blood lab register", "account", "login", "signin"],
    content: `### 📝 How to Register on Our Blood Bank Portal

Our system offers tailored experiences for different user roles:

1. **For Individual Donors:**
   - Click **[Register as Donor](/register/donor)** in the top menu or hero button.
   - Enter your personal info, blood group, contact number, and city.
   - Access your personal donor dashboard, view donation history, and get notified about local blood camps!
2. **For Healthcare Facilities (Hospitals & Blood Labs):**
   - Click **[Register as Facility](/register/facility)**.
   - Choose your facility type (Hospital or Blood Lab).
   - Enter facility license number, administrator contact, and address for verification.`
  }
];

export const SUGGESTED_QUERIES = [
  "Can O- donate to everyone?",
  "What are the eligibility rules for blood donation?",
  "How does emergency blood request work?",
  "What DSA algorithms are used in this project?",
  "What is the shelf life of platelets and red blood cells?",
  "Can I donate blood if I have a tattoo?",
  "Who can AB+ receive blood from?",
  "Can someone with diabetes or high BP donate?"
];

export const CATEGORIES = [
  { id: "all", label: "✨ All Information" },
  { id: "compatibility", label: "🩸 Compatibility" },
  { id: "eligibility", label: "📋 Eligibility" },
  { id: "process", label: "⏱️ Donation Process" },
  { id: "science", label: "🔬 Components & Types" },
  { id: "emergency", label: "🚨 Emergency & Requests" },
  { id: "dsa", label: "💻 DSA Algorithms" },
];

/**
 * Normalize blood type string like "o positive", "O+", "a-neg", etc.
 */
function normalizeBloodType(str) {
  if (!str) return null;
  const s = str.toLowerCase().trim();
  if (s.includes("ab") && (s.includes("+") || s.includes("pos"))) return "AB+";
  if (s.includes("ab") && (s.includes("-") || s.includes("neg"))) return "AB-";
  if (s.includes("a") && !s.includes("b") && (s.includes("+") || s.includes("pos"))) return "A+";
  if (s.includes("a") && !s.includes("b") && (s.includes("-") || s.includes("neg"))) return "A-";
  if (s.includes("b") && !s.includes("a") && (s.includes("+") || s.includes("pos"))) return "B+";
  if (s.includes("b") && !s.includes("a") && (s.includes("-") || s.includes("neg"))) return "B-";
  if (s.includes("o") && (s.includes("+") || s.includes("pos"))) return "O+";
  if (s.includes("o") && (s.includes("-") || s.includes("neg"))) return "O-";
  return null;
}

/**
 * Intelligent Local Knowledge Base & NLP Search Engine.
 */
export function searchKnowledgeBase(query) {
  if (!query || typeof query !== "string" || !query.trim()) {
    return {
      type: "empty",
      title: "How can I help you?",
      message: "Please enter a question or keyword to search any blood bank information.",
      suggestions: SUGGESTED_QUERIES.slice(0, 4)
    };
  }

  const cleanQuery = query.toLowerCase().trim();

  // 1. Conversational Greetings & Bot Identity
  if (/^(hi|hello|hey|namaste|greetings|good\s*(morning|afternoon|evening)|yo|hola)\b/i.test(cleanQuery)) {
    return {
      type: "greeting",
      title: "Hello! Welcome to Blood Bank AI Assistant",
      message: `👋 **Hello! Welcome to the Blood Bank Management System.**\n\nI am your intelligent assistant. You can ask me **anything** about:\n- 🩸 **Blood Compatibility** (e.g., *"Can O- donate to AB+?"* or type any blood group like \`O+\`, \`A-\`)\n- 📋 **Donor Eligibility** (e.g., *"Can I donate with diabetes?"*, *"Age & weight limits"*, *"Tattoo rules"*)\n- ⏱️ **Donation Procedure & Prep** (e.g., *"How long does donation take?"*, *"What to eat before donating"*)\n- 🔬 **Blood Components & Storage** (e.g., *"Shelf life of platelets and plasma"*)\n- 🚨 **Emergency Blood Requests** (e.g., *"How do hospitals request blood?"*)\n- 💻 **DSA Algorithms in this Project** (e.g., *"Explain Merge Sort and Binary Search"*)\n\n*How can I assist you right now?*`,
      suggestions: [
        "Can O- donate to everyone?",
        "What are the eligibility rules for blood donation?",
        "What DSA algorithms are used in this project?",
        "How do I register as a donor?"
      ]
    };
  }

  // 2. Who are you / Bot Info
  if (/(who are you|what is this|about you|your name|what can you do|help me|menu|options)/i.test(cleanQuery)) {
    return {
      type: "info",
      title: "About Blood Bank AI Assistant",
      message: `🤖 **I am the Blood Bank Management System AI Assistant.**\n\nI am built to provide instant, medical-grade knowledge and search capabilities for donors, patients, and hospital staff. You can ask me:\n\n1. **Compatibility Queries:** Ask *"Who can B+ donate to?"* or compare any two types.\n2. **Eligibility Screening:** Check age, weight, hemoglobin, medications, or tattoo waiting periods.\n3. **Hospital & Lab Protocols:** Learn how emergency blood requests, blood camps, and inventory tracking work.\n4. **Computer Science (DSA):** Understand the algorithms implemented in this project (Merge Sort, Binary Search, Hash Map, Linear Search).`,
      suggestions: SUGGESTED_QUERIES.slice(0, 4)
    };
  }

  // 3. Thank you / Appreciation
  if (/^(thanks|thank you|thx|great|awesome|perfect|good job|ok|okay)\b/i.test(cleanQuery)) {
    return {
      type: "thanks",
      title: "You're Very Welcome!",
      message: `❤️ **You're very welcome!**\n\nEvery blood donation can save up to **3 lives**. If you have more questions or need to verify compatibility, feel free to ask anytime!`,
      suggestions: [
        "Check blood compatibility chart",
        "How to register as donor?",
        "Emergency blood request"
      ]
    };
  }

  // 4. Blood Group Extraction & Compatibility (Handles "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", "o positive", etc.)
  const bloodTypeMatches = cleanQuery.match(/(ab\+|ab-|a\+|a-|b\+|b-|o\+|o-|ab\s*positive|ab\s*negative|a\s*positive|a\s*negative|b\s*positive|b\s*negative|o\s*positive|o\s*negative)/gi);

  if (bloodTypeMatches && bloodTypeMatches.length > 0) {
    const normalizedTypes = bloodTypeMatches.map(normalizeBloodType).filter(Boolean);

    if (normalizedTypes.length >= 2) {
      const type1 = normalizedTypes[0];
      const type2 = normalizedTypes[1];
      const canDonate = BLOOD_COMPATIBILITY[type1]?.canDonateTo.includes(type2);

      return {
        type: "compatibility_comparison",
        title: `Compatibility Check: ${type1} ➜ ${type2}`,
        message: canDonate
          ? `### ✅ Compatibility: Match Approved!\n\nA donor with **${type1}** blood **CAN safely donate** red blood cells to a recipient with **${type2}** blood.\n\n- **${type1} Donor can donate to:** \`${BLOOD_COMPATIBILITY[type1].canDonateTo.join(", ")}\`\n- **${type2} Recipient can receive from:** \`${BLOOD_COMPATIBILITY[type2]?.canReceiveFrom.join(", ") || "Unknown"}\``
          : `### ❌ Compatibility: Not Recommended!\n\nA donor with **${type1}** blood **CANNOT** donate red blood cells to a recipient with **${type2}** blood.\n\n- **${type1} Donor can only donate to:** \`${BLOOD_COMPATIBILITY[type1].canDonateTo.join(", ")}\`\n- **${type2} Recipient can only receive from:** \`${BLOOD_COMPATIBILITY[type2]?.canReceiveFrom.join(", ") || "Unknown"}\``,
        suggestions: [`Check ${type1} full profile`, `Check ${type2} full profile`, "Who is universal donor?"]
      };
    } else if (normalizedTypes.length === 1) {
      const type = normalizedTypes[0];
      const data = BLOOD_COMPATIBILITY[type];
      if (data) {
        return {
          type: "compatibility_single",
          title: `Blood Group: ${type} (${data.title})`,
          message: `### 🩸 Information for Blood Group **${type}**\n\n` +
            `*${data.description}*\n\n` +
            `- **Population Frequency:** **${data.frequency}**\n` +
            `- **Can Donate Red Cells To:** \`${data.canDonateTo.join(", ")}\`\n` +
            `- **Can Receive Red Cells From:** \`${data.canReceiveFrom.join(", ")}\`\n\n` +
            `> 💡 *Want to compare? Ask:* "Can ${type} donate to AB+?" or pick another group!`,
          suggestions: ["Universal donor vs recipient", "What is Bombay blood group?", "Donation process"]
        };
      }
    }
  }

  // 5. Keyword scoring against curated Knowledge Items
  const queryTokens = cleanQuery
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length >= 2);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_ITEMS) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const contentLower = item.content.toLowerCase();

    // Keyword matching
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      if (cleanQuery.includes(kwLower)) {
        score += 10;
      }
      for (const token of queryTokens) {
        if (kwLower === token) score += 6;
        else if (kwLower.includes(token)) score += 3;
      }
    }

    // Title matching
    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 5;
    }

    // Content matching
    for (const token of queryTokens) {
      if (contentLower.includes(token)) score += 1;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 6) {
    return {
      type: "knowledge_result",
      title: bestMatch.title,
      category: bestMatch.category,
      message: bestMatch.content,
      suggestions: SUGGESTED_QUERIES.filter(q => !q.toLowerCase().includes(bestMatch.category)).slice(0, 3)
    };
  }

  // 6. Fallback with structured helpful guide
  return {
    type: "general_help",
    title: `Search Results for "${query}"`,
    message: `Here is the most relevant information regarding **"${query}"** in our Blood Bank System:\n\n` +
      `### 🔍 Suggested Topics:\n` +
      `- **🩸 Blood Compatibility:** Ask *"Who can donate to O+?"* or type any blood group (\`A+\`, \`O-\`, \`AB+\`).\n` +
      `- **📋 Donor Eligibility:** Ask *"Who is eligible to donate?"*, *"Can diabetics donate?"*, or *"Tattoo rules"*.\n` +
      `- **⏱️ Donation Process:** Ask *"How long does donation take?"* or *"What to do before donating?"*.\n` +
      `- **🔬 Components & Shelf Life:** Ask *"What is the shelf life of platelets?"*.\n` +
      `- **💻 DSA Algorithms:** Ask *"What DSA algorithms are used in this project?"*.\n` +
      `- **🚨 Emergency Request:** Ask *"How to request blood for a patient?"*.\n\n` +
      `*Click one of the suggested questions below for an instant answer!*`,
    suggestions: SUGGESTED_QUERIES.slice(0, 4)
  };
}
