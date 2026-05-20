let users = [
  { 
    id: 1, username: "mary", password: "123", role: "student", 
    first_name: "Mary", last_name: "Kila", residency_type: "Non-Residential", 
    fee_status: "Paid", student_id: "S23001", balance: 0 
  },
  { 
    id: 2, username: "finance", password: "123", role: "finance", 
    first_name: "Finance", last_name: "Officer" 
  },
  { 
    id: 3, username: "admin", password: "123", role: "admin", 
    first_name: "System", last_name: "Admin" 
  },
  { 
    id: 4, username: "accom", password: "123", role: "accommodation", 
    first_name: "Accommodation", last_name: "Officer" 
  }
];

let accommodations = [
  { student_id: "S23001", status: "Pending", request_type: "Change", room_number: null }
];

module.exports = { users, accommodations };