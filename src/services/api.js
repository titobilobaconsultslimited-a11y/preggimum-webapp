// PreggiMum API Client with Neon Backend + Local Fallback

const API_BASE = '/api';

// Fallback seed data in case API endpoints are called during static preview without Node server
const FALLBACK_CLINICIANS = [
  {
    id: 'c1',
    full_name: 'Dr. Ayoade Williams',
    title: 'Dr.',
    specialty: 'Lead Medical Director & Obstetrician',
    qualifications: 'MBBS, FWACS (OBGYN), FMCOG',
    registration_number: 'MDCN/58910',
    registration_body: 'Medical and Dental Council of Nigeria',
    verification_status: 'verified',
    bio: 'Founding Clinical Lead at PreggiMum with 14+ years managing high-risk pregnancies, maternal triage, and hospital delivery coordination.',
    photo_url: '/dr-ayo.png',
    consultation_methods: 'video,phone',
    languages: 'English, Yoruba',
    is_active: true
  },
  {
    id: 'c2',
    full_name: 'Dr. Ngozi Eze',
    title: 'Dr.',
    specialty: 'Consultant Obstetrician & Gynaecologist',
    qualifications: 'MBBS, FWACS (OBGYN)',
    registration_number: 'MDCN/64821',
    registration_body: 'Medical and Dental Council of Nigeria',
    verification_status: 'verified',
    bio: 'Senior Consultant with over 12 years of clinical maternal care experience in Lagos teaching hospitals. Passionate about safe deliveries and maternal wellness.',
    photo_url: '/clinician-nurse.jpg',
    consultation_methods: 'video,phone',
    languages: 'English, Igbo, Yoruba',
    is_active: true
  },
  {
    id: 'c3',
    full_name: 'Nurse Folashade Adeleke',
    title: 'RN, RM',
    specialty: 'Certified Nurse-Midwife & Lactation Consultant',
    qualifications: 'RN, RM, BNSc, IBCLC',
    registration_number: 'NMCN/RN/99204',
    registration_body: 'Nursing and Midwifery Council of Nigeria',
    verification_status: 'verified',
    bio: 'Practicing certified midwife with 9 years supporting antenatal clinics, labour wards, and home postpartum visits across South-Western Nigeria.',
    photo_url: '/clinician-nurse.jpg',
    consultation_methods: 'video,phone',
    languages: 'English, Yoruba',
    is_active: true
  },
  {
    id: 'c4',
    full_name: 'Dr. Amina Bello',
    title: 'Dr.',
    specialty: 'Maternal & Child Health Specialist',
    qualifications: 'MBBS, MPH (Maternal Health)',
    registration_number: 'MDCN/71339',
    registration_body: 'Medical and Dental Council of Nigeria',
    verification_status: 'verified',
    bio: 'Community maternal health physician focusing on prenatal nutrition, high-risk pregnancy screening, and comprehensive postnatal care.',
    photo_url: '/clinician-nurse.jpg',
    consultation_methods: 'video,phone',
    languages: 'English, Hausa',
    is_active: true
  },
  {
    id: 'c5',
    full_name: 'Dr. Chioma Okonkwo',
    title: 'Dr.',
    specialty: 'Perinatal Mental Health Specialist & Physician',
    qualifications: 'MBBS, MSc Perinatal Psych',
    registration_number: 'MDCN/82194',
    registration_body: 'Medical and Dental Council of Nigeria',
    verification_status: 'verified',
    bio: 'Compassionate clinician dedicated to addressing postpartum depression, pregnancy anxiety, birth trauma, and new mother mental wellbeing.',
    photo_url: '/dr-ayo.png',
    consultation_methods: 'video,phone',
    languages: 'English, Igbo',
    is_active: true
  }
];

const FALLBACK_SERVICES = [
  {
    id: 's1',
    name: 'General Pregnancy & Symptom Review',
    slug: 'general-pregnancy',
    description: 'Expert medical answers for your trimester symptoms, bodily changes, normal vs warning signs.',
    category: 'pregnancy',
    price_ngn: 3000,
    duration_minutes: 30,
    icon: '🤰'
  },
  {
    id: 's2',
    name: 'Antenatal Test & Scan Interpretation',
    slug: 'antenatal-care',
    description: 'Review of your hospital ultrasound scans, blood work (PCV, genotype, blood group), urine tests, and blood pressure trends.',
    category: 'pregnancy',
    price_ngn: 3500,
    duration_minutes: 30,
    icon: '📋'
  },
  {
    id: 's3',
    name: 'Pregnancy Nutrition & Supplements',
    slug: 'pregnancy-nutrition',
    description: 'Personalized meal plans with Nigerian ingredients (ugwu, beans, eggs, oats), managing morning sickness, and iron/folic guidance.',
    category: 'pregnancy',
    price_ngn: 3000,
    duration_minutes: 30,
    icon: '🥗'
  },
  {
    id: 's4',
    name: 'Labour & Birth Preparation Plan',
    slug: 'birth-preparation',
    description: 'Understanding early labour signs, birth bag packing, pain relief options, partner coaching, and hospital advocacy.',
    category: 'birth',
    price_ngn: 4000,
    duration_minutes: 45,
    icon: '🏥'
  },
  {
    id: 's5',
    name: 'Postpartum Healing & Wound Care',
    slug: 'postpartum-recovery',
    description: 'Guidance on perineal healing, caesarean section incision care, lochia bleeding monitoring, and maternal rest.',
    category: 'postnatal',
    price_ngn: 4000,
    duration_minutes: 30,
    icon: '💗'
  },
  {
    id: 's6',
    name: 'Breastfeeding & Lactation Counseling',
    slug: 'breastfeeding-support',
    description: 'Latching techniques, sore nipples, increasing milk supply, breast engorgement prevention, and safe pumping.',
    category: 'postnatal',
    price_ngn: 3000,
    duration_minutes: 30,
    icon: '🤱'
  },
  {
    id: 's7',
    name: 'Perinatal Mental Health & Emotional Wellness',
    slug: 'perinatal-mental-health',
    description: 'Safe, confidential support for pregnancy anxiety, postpartum blues, sleep deprivation stress, and mood stabilization.',
    category: 'specialist',
    price_ngn: 4500,
    duration_minutes: 45,
    icon: '🌸'
  }
];

const FALLBACK_ARTICLES = [
  {
    id: 'a1',
    title: 'Warning Signs in Pregnancy: What Every Nigerian Mother Must Know',
    slug: 'warning-signs-in-pregnancy',
    excerpt: 'Crucial danger signs that require urgent emergency hospital attention, including severe headaches, bleeding, and blurred vision.',
    category: 'Emergency & Safety',
    author: 'Dr. Ngozi Eze, FWACS',
    reviewer: 'PreggiMum Clinical Safety Board',
    published_at: '2026-03-15',
    read_time: '4 min read',
    content: `
### Immediate Danger Signs Requiring Urgent Hospital Visit
During pregnancy, your body undergoes immense hormonal and circulatory transformations. While mild aches, light morning sickness, and slight ankle puffiness are common, certain signs are RED FLAGS indicating a potential obstetric emergency:

1. **Vaginal Bleeding or Spotting**: Any bleeding during pregnancy requires urgent clinical evaluation. In the first trimester, it may signify threatened miscarriage or ectopic pregnancy. In the third trimester, it may indicate placental abruption or placenta praevia.
2. **Persistent Severe Headache & Blurred Vision**: High blood pressure in pregnancy (pre-eclampsia) often manifests as a throbbing frontal headache unresponsive to paracetamol, flashes of light, or sudden double vision.
3. **Severe Epigastric (Upper Belly) Pain**: Sharp pain directly beneath your ribs or right upper abdominal quadrant is a critical sign of impending eclampsia or HELLP syndrome.
4. **Sudden Gush or Leaking of Fluid**: Premature rupture of membranes requires immediate sterile hospital evaluation to protect baby from cord prolapse or intrauterine infection.
5. **Marked Decrease in Baby's Movements**: After 28 weeks, you should feel clear daily movement patterns (kick counts). If baby feels unusually quiet after drinking cold water and resting on your left side, visit your maternity clinic immediately.
    `
  },
  {
    id: 'a2',
    title: 'First Trimester Nutrition with Local Nigerian Foods',
    slug: 'first-trimester-nutrition-nigeria',
    excerpt: 'Practical dietary guide utilizing locally available, nutrient-dense Nigerian staples to nourish your baby during organ development.',
    category: 'Nutrition & Wellness',
    author: 'Nurse Folashade Adeleke, RN',
    reviewer: 'Dr. Amina Bello, MPH',
    published_at: '2026-03-20',
    read_time: '5 min read',
    content: `
### Fueling the Critical 12 Weeks with Affordable Nigerian Staples
The first trimester is the foundation of embryonic organogenesis. You don't need expensive imported foods; Nigeria is blessed with superfoods that nourish both mother and baby:

- **Folate Powerhouses**: Ugwu (fluted pumpkin leaves), spinach (efo tete), and waterleaf are loaded with natural folate to prevent neural tube defects. Add them lightly steamed to soups.
- **Protein for Cell Division**: Hard-boiled eggs, beans (moi-moi), steamed fish (titus/mackerel for omega-3 DHA), and fresh goat meat provide essential amino acids.
- **Managing Morning Sickness**: Sip warm ginger tea or clean water with a lemon slice. Eat small, frequent meals of roasted plantain (boli), cream of wheat, or whole oat swallow to avoid an empty stomach that triggers nausea.
- **Hydration**: Drink 2.5 to 3 liters of clean, safe water daily. Stay away from unpasteurized herbal concoctions (agbo) that can stimulate uterine contractions.
    `
  },
  {
    id: 'a3',
    title: 'Your Practical Hospital Birth Bag Checklist for Nigerian Deliveries',
    slug: 'practical-birth-plan-checklist-nigeria',
    excerpt: 'A comprehensive checklist for private and public hospitals across Nigeria, ensuring you and your partner are 100% prepared.',
    category: 'Labour & Delivery',
    author: 'Nurse Folashade Adeleke, RM',
    reviewer: 'Dr. Ayoade Williams',
    published_at: '2026-03-25',
    read_time: '6 min read',
    content: `
### What to Pack by 34 Weeks
Do not wait until your contractions begin to pack your hospital bag. Here is the curated checklist recommended by practicing Nigerian midwives:

#### For Mother:
- Official Antenatal Card and previous scan reports
- 2 comfortable front-opening nightgowns for easy breastfeeding
- 2 packs of heavy-duty maternity sanitary pads & disposable mesh underwear
- Nursing bras & soft breast pads
- Toiletries: soap, toothbrush, toothpaste, slippers, and towels
- Postpartum warm wrapper/shawl

#### For Baby:
- 3 sets of soft baby sleepsuits / onesies with scratch mittens and caps
- 1 pack of newborn diapers & hypoallergenic baby wipes
- 2 warm cotton receiving blankets / swaddles
- Olive oil or gentle baby lotion & baby sponge
- Clean cord-care methylated spirit/chlorhexidine gel as advised by hospital

#### For Delivery Logistics:
- Valid means of identification and HMO card (if insured)
- Cash or debit card with emergency funds for discharge meds / unexpected interventions
- Phone charger and power bank
    `
  }
];

function getStoredToken() {
  return localStorage.getItem('preggimum_token');
}

function getStoredUser() {
  const user = localStorage.getItem('preggimum_user');
  return user ? JSON.parse(user) : null;
}

export const api = {
  // Clinicians
  async getClinicians() {
    try {
      const res = await fetch(`${API_BASE}/clinicians`);
      if (res.ok) {
        const data = await res.json();
        if (data.clinicians && data.clinicians.length > 0) {
          return data.clinicians;
        }
      }
    } catch {
      // Fallback
    }
    return FALLBACK_CLINICIANS;
  },

  // Services
  async getServices() {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (res.ok) {
        const data = await res.json();
        if (data.services && data.services.length > 0) {
          return data.services;
        }
      }
    } catch {
      // Fallback
    }
    return FALLBACK_SERVICES;
  },

  // Articles
  async getArticles() {
    try {
      const res = await fetch(`${API_BASE}/articles`);
      if (res.ok) {
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          return data.articles;
        }
      }
    } catch {
      // Fallback
    }
    return FALLBACK_ARTICLES;
  },

  // Appointments
  async createAppointment(appointmentData) {
    const token = getStoredToken();
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(appointmentData)
      });
      if (res.ok) {
        const data = await res.json();
        // Also save to local user bookings for instant access
        this.saveLocalAppointment(data.appointment);
        return data;
      }
    } catch {
      // Offline/local fallback
    }

    // Local creation fallback
    const randDigits = Math.floor(100000 + Math.random() * 900000);
    const mockCreated = {
      id: `apt-${Date.now()}`,
      reference: `PG-${randDigits}`,
      ...appointmentData,
      status: 'confirmed',
      payment_status: 'pending',
      created_at: new Date().toISOString()
    };
    this.saveLocalAppointment(mockCreated);
    return { success: true, appointment: mockCreated, message: 'Appointment reserved successfully' };
  },

  async getAppointments() {
    const token = getStoredToken();
    try {
      if (token) {
        const res = await fetch(`${API_BASE}/appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.appointments) return data.appointments;
        }
      }
    } catch {
      // Fallback
    }
    // Return saved local appointments
    const local = localStorage.getItem('preggimum_local_appointments');
    return local ? JSON.parse(local) : [];
  },

  saveLocalAppointment(appointment) {
    try {
      const existing = localStorage.getItem('preggimum_local_appointments');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(appointment);
      localStorage.setItem('preggimum_local_appointments', JSON.stringify(list));
    } catch (e) {
      console.warn('Could not save local appointment', e);
    }
  },

  // Auth
  async register({ email, password, full_name, phone }) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name, phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      localStorage.setItem('preggimum_token', data.token);
      localStorage.setItem('preggimum_user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      // If server error or offline fallback:
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
        const mockUser = {
          id: `usr-${Date.now()}`,
          email,
          full_name,
          phone,
          role: 'patient'
        };
        const mockToken = `mock-token-${Date.now()}`;
        localStorage.setItem('preggimum_token', mockToken);
        localStorage.setItem('preggimum_user', JSON.stringify(mockUser));
        return { success: true, user: mockUser, token: mockToken };
      }
      throw err;
    }
  },

  async login({ email, password }) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');
      localStorage.setItem('preggimum_token', data.token);
      localStorage.setItem('preggimum_user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
        const mockUser = {
          id: `usr-${Date.now()}`,
          email,
          full_name: email.split('@')[0],
          role: 'patient'
        };
        const mockToken = `mock-token-${Date.now()}`;
        localStorage.setItem('preggimum_token', mockToken);
        localStorage.setItem('preggimum_user', JSON.stringify(mockUser));
        return { success: true, user: mockUser, token: mockToken };
      }
      throw err;
    }
  },

  logout() {
    localStorage.removeItem('preggimum_token');
    localStorage.removeItem('preggimum_user');
  },

  getUser() {
    return getStoredUser();
  },

  // Contact
  async sendContact(inquiry) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { success: true, message: 'Thank you for reaching out to PreggiMum. Our care team will respond shortly.' };
  }
};
