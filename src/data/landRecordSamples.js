export const landRecordsSample = [
  {
    // SCENARIO 1: COMPLETE DOCUMENTS + BUILDINGS + LEASES
    id: 1,
    slNo: 1,
    district: "Krishna",
    surveyNo: "SY-2024-001",
    village: "Machilipatnam",
    mandal: "Machilipatnam Mandal",
    extent: {
      acres: "2.5",
      sqMeters: "10117",
      sqYards: "12100"
    },

    // ✅ COMPLETE TITLE DOCUMENTS
    titleDocuments: {
      hasAllotmentProceedings: true,
      proceedingsDetails: {
        number: "G.O.Ms.No.123",
        date: "2020-05-15",
        authority: "District Collector, Krishna"
      },
      hasSubDivisionRecord: true,
      effortsForMissingDocs: "N/A - All documents available",
      donationDetails: null
    },

    // ✅ WITH BUILDINGS
    buildingInfo: {
      buildingArea: {
        acres: "0.8",
        sqMeters: "3237",
        sqYards: "3872"
      },
      approvedPlans: {
        number: "BP/MPM/2021/456",
        date: "2021-03-20",
        localBody: "Machilipatnam Municipality"
      },
      buildingUse: "Police Station with Petrol Bunk",
      floors: 2,
      plinthArea: 3500
    },

    // ✅ ACTIVE LEASES
    leases: {
      landLeased: {
        acres: "1.2",
        sqMeters: "4856",
        sqYards: "5808"
      },
      buildingLeased: "Petrol Bunk Building & Shops",
      leaseDeeds: [
        {
          registrationNo: "Doc.No.789/2022",
          date: "2022-01-15",
          office: "Sub-Registrar Office, Machilipatnam",
          period: "2022-2027 (5 years)"
        }
      ],
      monthlyRent: 75000
    },

    status: "Verified",
    lastUpdated: "2024-01-15",
    image: "/assets/fuelstation1.webp"
  },
  {
    // SCENARIO 2: MISSING DOCUMENTS + EFFORTS MADE
    id: 2,
    slNo: 2,
    district: "Guntur",
    surveyNo: "SY-2024-002",
    village: "Tenali", 
    mandal: "Tenali Mandal",
    extent: {
      acres: "1.8",
      sqMeters: "7284",
      sqYards: "8712"
    },

    // ❌ MISSING DOCUMENTS + EFFORTS MADE
    titleDocuments: {
      hasAllotmentProceedings: false,
      proceedingsDetails: null,
      hasSubDivisionRecord: false,
      effortsForMissingDocs: "1. Applied to Revenue Dept on 2023-11-20\n2. Reminder sent on 2024-01-05\n3. Meeting scheduled with District Collector on 2024-02-15",
      donationDetails: {
        registrationNo: "Doc.No.456/2018",
        date: "2018-08-10", 
        office: "Sub-Registrar Office, Tenali"
      }
    },

    // ❌ NO BUILDINGS
    buildingInfo: {
      buildingArea: {
        acres: "0.0",
        sqMeters: "0",
        sqYards: "0"
      },
      approvedPlans: null,
      buildingUse: "Vacant Land",
      floors: 0,
      plinthArea: 0
    },

    // ❌ NO LEASES
    leases: {
      landLeased: {
        acres: "0.0",
        sqMeters: "0",
        sqYards: "0"
      },
      buildingLeased: "",
      leaseDeeds: [],
      monthlyRent: 0
    },

    status: "Pending Documents",
    lastUpdated: "2024-01-14",
    image: "/assets/land1.webp"
  },
  {
    // SCENARIO 3: DONATED LAND + PARTIAL DOCUMENTS
    id: 3,
    slNo: 3,
    district: "East Godavari",
    surveyNo: "SY-2024-003",
    village: "Kakinada",
    mandal: "Kakinada Mandal", 
    extent: {
      acres: "3.2",
      sqMeters: "12949",
      sqYards: "15488"
    },

    // ⚠️ PARTIAL DOCUMENTS + DONATION
    titleDocuments: {
      hasAllotmentProceedings: true,
      proceedingsDetails: {
        number: "Rc.No.567/2019",
        date: "2019-07-22",
        authority: "Revenue Divisional Officer, Kakinada"
      },
      hasSubDivisionRecord: false, // Missing this
      effortsForMissingDocs: "Sub-division record application submitted on 2023-12-01. Awaiting survey department response.",
      donationDetails: {
        registrationNo: "Donation/123/2015",
        date: "2015-03-15",
        office: "Sub-Registrar Office, Kakinada"
      }
    },

    // ✅ MULTIPLE BUILDINGS
    buildingInfo: {
      buildingArea: {
        acres: "1.5", 
        sqMeters: "6070",
        sqYards: "7260"
      },
      approvedPlans: {
        number: "BP/KKD/2020/789",
        date: "2020-09-15",
        localBody: "Kakinada Municipal Corporation"
      },
      buildingUse: "Police Quarters + Community Hall + Playground",
      floors: 3,
      plinthArea: 5200
    },

    // ✅ MULTIPLE LEASES
    leases: {
      landLeased: {
        acres: "0.8",
        sqMeters: "3237", 
        sqYards: "3872"
      },
      buildingLeased: "Community Hall for events + Playground for sports",
      leaseDeeds: [
        {
          registrationNo: "Doc.No.234/2021",
          date: "2021-03-10",
          office: "Sub-Registrar Office, Kakinada",
          period: "2021-2024 (3 years)"
        },
        {
          registrationNo: "Doc.No.567/2023",
          date: "2023-01-20",
          office: "Sub-Registrar Office, Kakinada", 
          period: "2023-2026 (3 years)"
        }
      ],
      monthlyRent: 45000
    },

    status: "Under Review",
    lastUpdated: "2024-01-13",
    image: "/assets/kalyanmandapam1.jpg"
  },
  {
    // SCENARIO 4: COMPLEX EFFORTS CASE + NO BUILDINGS
    id: 4,
    slNo: 4,
    district: "West Godavari",
    surveyNo: "SY-2024-004",
    village: "Eluru",
    mandal: "Eluru Mandal",
    extent: {
      acres: "0.8",
      sqMeters: "3237",
      sqYards: "3872"
    },

    // ❌ COMPLEX EFFORTS CASE
    titleDocuments: {
      hasAllotmentProceedings: false,
      proceedingsDetails: null,
      hasSubDivisionRecord: false,
      effortsForMissingDocs: `EFFORTS TIMELINE:
• 2022-06-10: Initial application submitted
• 2022-08-15: Application returned for additional documents
• 2022-09-20: Resubmitted with complete documentation  
• 2023-01-05: File under process at Revenue Department
• 2023-06-30: Site inspection completed
• 2023-11-15: Awaiting final approval from District Collector
• NEXT STEP: Follow-up meeting scheduled for 2024-02-28`,
      donationDetails: null
    },

    // ❌ NO BUILDINGS
    buildingInfo: {
      buildingArea: {
        acres: "0.0",
        sqMeters: "0",
        sqYards: "0"
      },
      approvedPlans: null,
      buildingUse: "Agricultural Land",
      floors: 0,
      plinthArea: 0
    },

    // ✅ ONLY LAND LEASED (NO BUILDINGS)
    leases: {
      landLeased: {
        acres: "0.5",
        sqMeters: "2023",
        sqYards: "2420"
      },
      buildingLeased: "",
      leaseDeeds: [
        {
          registrationNo: "Doc.No.891/2022",
          date: "2022-11-30",
          office: "Sub-Registrar Office, Eluru",
          period: "2022-2025 (3 years)"
        }
      ],
      monthlyRent: 25000
    },

    status: "Documents Pending",
    lastUpdated: "2024-01-12",
    image: "/assets/land2.webp"
  },
  {
    // SCENARIO 5: ALL DOCUMENTS + NO LEASES
    id: 5,
    slNo: 5,
    district: "Prakasam", 
    surveyNo: "SY-2024-005",
    village: "Ongole",
    mandal: "Ongole Mandal",
    extent: {
      acres: "4.1",
      sqMeters: "16592",
      sqYards: "19844"
    },

    // ✅ ALL DOCUMENTS AVAILABLE
    titleDocuments: {
      hasAllotmentProceedings: true,
      proceedingsDetails: {
        number: "G.O.Ms.No.891/2017",
        date: "2017-12-05",
        authority: "District Collector, Prakasam"
      },
      hasSubDivisionRecord: true,
      effortsForMissingDocs: "N/A - All title documents verified and available",
      donationDetails: null
    },

    // ✅ BUILDING BUT NO LEASES
    buildingInfo: {
      buildingArea: {
        acres: "0.3",
        sqMeters: "1214",
        sqYards: "1452"
      },
      approvedPlans: {
        number: "BP/ONG/2019/234",
        date: "2019-08-22",
        localBody: "Ongole Municipality"
      },
      buildingUse: "Police Outpost",
      floors: 1,
      plinthArea: 1200
    },

    // ❌ NO LEASES
    leases: {
      landLeased: {
        acres: "0.0",
        sqMeters: "0",
        sqYards: "0"
      },
      buildingLeased: "",
      leaseDeeds: [],
      monthlyRent: 0
    },

    status: "Verified",
    lastUpdated: "2024-01-11", 
    image: "/assets/playground2.webp"
  }
];