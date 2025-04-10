// Extended list of major airports worldwide
export const airports = {
  // Europe (existing entries remain)
  "London Heathrow (LHR)": { lat: 51.4700, lng: -0.4543, code: "LHR", region: "Europe" },
  "Paris Charles de Gaulle (CDG)": { lat: 49.0097, lng: 2.5479, code: "CDG", region: "Europe" },
  "Amsterdam (AMS)": { lat: 52.3105, lng: 4.7683, code: "AMS", region: "Europe" },
  "Frankfurt (FRA)": { lat: 50.0379, lng: 8.5622, code: "FRA", region: "Europe" },
  "Madrid (MAD)": { lat: 40.4983, lng: -3.5676, code: "MAD", region: "Europe" },
  "Rome Fiumicino (FCO)": { lat: 41.8045, lng: 12.2508, code: "FCO", region: "Europe" },
  "Malta (MLA)": { lat: 35.8575, lng: 14.4775, code: "MLA", region: "Europe" },
  "Athens (ATH)": { lat: 37.9364, lng: 23.9445, code: "ATH", region: "Europe" },
  "Lisbon (LIS)": { lat: 38.7813, lng: -9.1359, code: "LIS", region: "Europe" },
  "Copenhagen (CPH)": { lat: 55.6180, lng: 12.6508, code: "CPH", region: "Europe" },
  "Oslo (OSL)": { lat: 60.1975, lng: 11.1004, code: "OSL", region: "Europe" },
  "Stockholm (ARN)": { lat: 59.6497, lng: 17.9237, code: "ARN", region: "Europe" },
  "Helsinki (HEL)": { lat: 60.3172, lng: 24.9633, code: "HEL", region: "Europe" },

  // Russia & CIS
  "Moscow Sheremetyevo (SVO)": { lat: 55.9726, lng: 37.4146, code: "SVO", region: "Russia & CIS" },
  "Moscow Domodedovo (DME)": { lat: 55.4103, lng: 37.9026, code: "DME", region: "Russia & CIS" },
  "St. Petersburg (LED)": { lat: 59.8003, lng: 30.2625, code: "LED", region: "Russia & CIS" },
  "Kiev (KBP)": { lat: 50.3450, lng: 30.8947, code: "KBP", region: "Russia & CIS" },
  "Almaty (ALA)": { lat: 43.3521, lng: 77.0337, code: "ALA", region: "Russia & CIS" },
  
  // Middle East
  "Dubai (DXB)": { lat: 25.2532, lng: 55.3644, code: "DXB", region: "Middle East" },
  "Abu Dhabi (AUH)": { lat: 24.4330, lng: 54.6511, code: "AUH", region: "Middle East" },
  "Doha (DOH)": { lat: 25.2609, lng: 51.6138, code: "DOH", region: "Middle East" },
  "Riyadh (RUH)": { lat: 24.9578, lng: 46.6989, code: "RUH", region: "Middle East" },
  "Tel Aviv (TLV)": { lat: 32.0117, lng: 34.8861, code: "TLV", region: "Middle East" },
  "Muscat (MCT)": { lat: 23.5932, lng: 58.2844, code: "MCT", region: "Middle East" },
  "Bahrain (BAH)": { lat: 26.2707, lng: 50.6336, code: "BAH", region: "Middle East" },
  "Kuwait (KWI)": { lat: 29.2266, lng: 47.9689, code: "KWI", region: "Middle East" },

  // Caribbean
  "Nassau (NAS)": { lat: 25.0389, lng: -77.4662, code: "NAS", region: "Caribbean" },
  "San Juan (SJU)": { lat: 18.4394, lng: -66.0018, code: "SJU", region: "Caribbean" },
  "Punta Cana (PUJ)": { lat: 18.5674, lng: -68.3634, code: "PUJ", region: "Caribbean" },
  "Montego Bay (MBJ)": { lat: 18.5037, lng: -77.9134, code: "MBJ", region: "Caribbean" },
  "St. Maarten (SXM)": { lat: 18.0408, lng: -63.1089, code: "SXM", region: "Caribbean" },
  "Barbados (BGI)": { lat: 13.0746, lng: -59.4925, code: "BGI", region: "Caribbean" },

  // North America
  "New York JFK (JFK)": { lat: 40.6413, lng: -73.7781, code: "JFK", region: "North America" },
  "Los Angeles (LAX)": { lat: 33.9416, lng: -118.4085, code: "LAX", region: "North America" },
  "Chicago O'Hare (ORD)": { lat: 41.9786, lng: -87.9048, code: "ORD", region: "North America" },
  "Miami (MIA)": { lat: 25.7959, lng: -80.2870, code: "MIA", region: "North America" },
  "Toronto (YYZ)": { lat: 43.6777, lng: -79.6248, code: "YYZ", region: "North America" },
  "Vancouver (YVR)": { lat: 49.1967, lng: -123.1815, code: "YVR", region: "North America" },
  "Montreal (YUL)": { lat: 45.4706, lng: -73.7408, code: "YUL", region: "North America" },
  "Mexico City (MEX)": { lat: 19.4363, lng: -99.0721, code: "MEX", region: "North America" },
  "Cancun (CUN)": { lat: 21.0365, lng: -86.8771, code: "CUN", region: "North America" },

  // South America
  "São Paulo (GRU)": { lat: -23.4356, lng: -46.4731, code: "GRU", region: "South America" },
  "Rio de Janeiro (GIG)": { lat: -22.8089, lng: -43.2436, code: "GIG", region: "South America" },
  "Buenos Aires (EZE)": { lat: -34.8222, lng: -58.5358, code: "EZE", region: "South America" },
  "Lima (LIM)": { lat: -12.0219, lng: -77.1143, code: "LIM", region: "South America" },
  "Bogota (BOG)": { lat: 4.7016, lng: -74.1469, code: "BOG", region: "South America" },
  "Santiago (SCL)": { lat: -33.3930, lng: -70.7858, code: "SCL", region: "South America" },

  // Asia Pacific
  "Singapore (SIN)": { lat: 1.3644, lng: 103.9915, code: "SIN", region: "Asia Pacific" },
  "Tokyo Haneda (HND)": { lat: 35.5494, lng: 139.7811, code: "HND", region: "Asia Pacific" },
  "Hong Kong (HKG)": { lat: 22.3088, lng: 113.9145, code: "HKG", region: "Asia Pacific" },
  "Seoul Incheon (ICN)": { lat: 37.4602, lng: 126.4407, code: "ICN", region: "Asia Pacific" },
  "Bangkok (BKK)": { lat: 13.6900, lng: 100.7501, code: "BKK", region: "Asia Pacific" },
  "Sydney (SYD)": { lat: -33.9461, lng: 151.1772, code: "SYD", region: "Asia Pacific" },
  "Melbourne (MEL)": { lat: -37.6690, lng: 144.8410, code: "MEL", region: "Asia Pacific" },
  "Auckland (AKL)": { lat: -37.0082, lng: 174.7850, code: "AKL", region: "Asia Pacific" },
  "Bali (DPS)": { lat: -8.7467, lng: 115.1668, code: "DPS", region: "Asia Pacific" },
  "Manila (MNL)": { lat: 14.5086, lng: 121.0194, code: "MNL", region: "Asia Pacific" }
};