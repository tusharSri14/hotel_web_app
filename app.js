// ========================================
// CROWN INN HOTEL - COMPLETE MANAGEMENT SYSTEM
// ========================================

// ==================== GLOBAL VARIABLES ====================
let customers = [];
let rooms = [];
let bookings = [];
let payments = [];

// Auto-increment IDs
let nextCustomerId = 1;
let nextRoomId = 1;
let nextBookingId = 1;
let nextPaymentId = 1;

// ==================== SYSTEM INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function () {
    console.log('🏨 Crown Inn Hotel Management System - Version 5.0 FULLY FIXED');
    initializeSystem();
});

function initializeSystem() {
    loadFromLocalStorage();
    initializeRooms();
    initializeSampleCustomers();
    updateDashboard();
    showSection('dashboard');

    setTimeout(() => {
        showAlert('🏨 Crown Inn Hotel Management System LOADED!');
    }, 1500);
}

function initializeSampleCustomers() {
    if (customers.length === 0) {
        console.log('🔄 Adding sample customers...');

        const sampleCustomers = [];

        customers = sampleCustomers;
        saveToLocalStorage();
        console.log('✅ Added 3 sample customers');
    }
}

// ==================== DATA PERSISTENCE ====================
function saveToLocalStorage() {
    try {
        const data = {
            customers: customers,
            rooms: rooms,
            bookings: bookings,
            payments: payments,
            nextCustomerId: nextCustomerId,
            nextRoomId: nextRoomId,
            nextBookingId: nextBookingId,
            nextPaymentId: nextPaymentId,
            lastSaved: new Date().toISOString(),
            version: '5.0'
        };
        localStorage.setItem('crownInnHotelData', JSON.stringify(data));
        console.log('✅ Data saved to localStorage - Version 5.0');
    } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
        showAlert('Error saving data to browser storage.', 'warning');
    }
}

function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem('crownInnHotelData');
        if (data) {
            const parsed = JSON.parse(data);
            customers = parsed.customers || [];
            rooms = parsed.rooms || [];
            bookings = parsed.bookings || [];
            payments = parsed.payments || [];
            nextCustomerId = parsed.nextCustomerId || 1;
            nextRoomId = parsed.nextRoomId || 1;
            nextBookingId = parsed.nextBookingId || 1;
            nextPaymentId = parsed.nextPaymentId || 1;

            console.log('✅ Data loaded from localStorage');
            console.log(`📊 Stats: ${customers.length} customers, ${rooms.length} rooms, ${bookings.length} bookings, ${payments.length} payments`);
        } else {
            console.log('ℹ️ No saved data found, initializing fresh');
        }
    } catch (error) {
        console.error('❌ Error loading from localStorage:', error);
        showAlert('Error loading saved data. Starting fresh.', 'warning');
    }
}

function resetAllData() {
    if (confirm('⚠️ WARNING: This will permanently delete ALL data!\n\nAre you absolutely sure?')) {
        if (confirm('🔴 FINAL CONFIRMATION: Delete everything?')) {
            localStorage.removeItem('crownInnHotelData');
            location.reload();
        }
    }
}

// ==================== ROOMS INITIALIZATION ====================
function initializeRooms() {
    if (rooms.length === 0) {
        console.log('🏗️ Initializing rooms system...');

        // Floor 1: Single Rooms (101-108)
        for (let i = 1; i <= 8; i++) {
            rooms.push({
                id: nextRoomId++,
                room_number: 100 + i,
                type: 'Single',
                price: 1500,
                status: 'Vacant',
                floor: 1,
                capacity: 1,
                amenities: ['AC', 'WiFi', 'TV', 'Bathroom']
            });
        }

        // Floor 2: Double Rooms (201-208)
        for (let i = 1; i <= 8; i++) {
            rooms.push({
                id: nextRoomId++,
                room_number: 200 + i,
                type: 'Double',
                price: 2500,
                status: 'Vacant',
                floor: 2,
                capacity: 2,
                amenities: ['AC', 'WiFi', 'TV', 'Bathroom', 'Mini Fridge']
            });
        }

        // Floor 3: Deluxe Rooms (301-308)
        for (let i = 1; i <= 8; i++) {
            rooms.push({
                id: nextRoomId++,
                room_number: 300 + i,
                type: 'Deluxe',
                price: 3500,
                status: 'Vacant',
                floor: 3,
                capacity: 4,
                amenities: ['AC', 'WiFi', 'TV', 'Bathroom', 'Mini Fridge', 'Balcony', 'Room Service']
            });
        }

        saveToLocalStorage();
        console.log(`✅ Initialized ${rooms.length} rooms (24 total)`);
    }
}

// ==================== UTILITY FUNCTIONS ====================
function showAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 20px; 
        right: 20px; 
        z-index: 9999; 
        max-width: 450px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        border: none;
        border-radius: 12px;
        font-weight: 500;
    `;

    const lines = message.split('\n');
    const formattedMessage = lines.map(line => line.trim()).join('<br>');

    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="flex-grow-1">${formattedMessage}</div>
            <button type="button" class="btn-close ms-3" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, duration);
}

function updateElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function getStatusBadge(status) {
    const badges = {
        'Paid': 'bg-success',
        'Checked Out': 'bg-success',
        'Partial': 'bg-warning text-dark',
        'Pending': 'bg-danger',
        'Vacant': 'bg-success',
        'Occupied': 'bg-danger',
        'Under Maintenance': 'bg-warning text-dark'
    };
    return badges[status] || 'bg-secondary';
}

function formatCurrency(amount) {
    return '₹' + parseFloat(amount || 0).toLocaleString('en-IN');
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'Invalid Date';
    }
}

// ==================== NAVIGATION & SECTIONS (FIXED) ====================
function showSection(sectionId) {
    console.log(`🔄 Navigating to: ${sectionId}`);

    try {
        // Hide all content sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            console.log(`✅ Section ${sectionId} displayed`);
        } else {
            console.error(`❌ Section ${sectionId} not found in HTML!`);
            showAlert(`Section ${sectionId} not found. Please check your HTML structure.`, 'danger');
            return;
        }

        // Update navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeNavLink = document.querySelector(`[onclick*="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }

        // Load section-specific content with error handling
        try {
            switch (sectionId) {
                case 'dashboard':
                    updateDashboard();
                    break;
                case 'add-customer':
                    loadEnhancedAddCustomerForm();
                    break;
                case 'search-customers':
                    loadSearchCustomers();
                    break;
                case 'customer-list':
                    loadCustomerList();
                    break;
                case 'room-status':
                    loadRoomStatus();
                    break;
                case 'room-management':
                    loadRoomManagement();
                    break;
                case 'new-booking':
                    loadNewBookingWithGuests();
                    break;
                case 'quick-booking':
                    loadQuickBooking();
                    break;
                case 'all-bookings':
                    loadAllBookingsWithGuests();
                    break;
                case 'checkout-section':
                    loadOccupiedRooms();
                    break;
                case 'record-payment':
                    loadRecordPayment();
                    break;
                case 'payment-history':
                    loadPaymentHistory();
                    break;
                case 'revenue-reports':
                    loadRevenueReports();
                    break;
                case 'booking-history':
                    loadBookingHistory();
                    break;
                case 'whatsapp-marketing':
                    loadWhatsAppMarketing();
                    break;
                default:
                    console.log(`Section ${sectionId} loaded successfully`);
            }
        } catch (sectionError) {
            console.error(`Error loading section ${sectionId}:`, sectionError);
            showAlert(`Error loading ${sectionId} section: ${sectionError.message}`, 'danger');
        }

    } catch (error) {
        console.error('❌ Error in showSection:', error);
        showAlert('Error navigating to section. Please try again.', 'danger');
    }
}

// ==================== DASHBOARD ====================
function updateDashboard() {
    try {
        // Calculate room metrics
        const vacantRooms = rooms.filter(r => r.status === 'Vacant').length;
        const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
        const maintenanceRooms = rooms.filter(r => r.status === 'Under Maintenance').length;
        const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;

        // Calculate financial metrics
        const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
        const pendingPayments = bookings.filter(b =>
            b.payment_status === 'Pending' || b.payment_status === 'Partial'
        ).reduce((sum, booking) => {
            const paid = payments.filter(p => p.booking_id === booking.id)
                .reduce((paidSum, payment) => paidSum + (payment.amount || 0), 0);
            return sum + Math.max(0, (booking.total_amount || 0) - paid);
        }, 0);

        // Calculate today's metrics properly
        const today = new Date().toDateString();

        // Check-ins today: bookings where check-in date is today
        const checkinsToday = bookings.filter(b => {
            try {
                const checkinDate = new Date(b.checkin_time).toDateString();
                return checkinDate === today;
            } catch {
                return false;
            }
        }).length;

        // Check-outs today: bookings with "Checked Out" status AND actual checkout time is today
        const checkoutsToday = bookings.filter(b => {
            try {
                // Must be checked out
                if (b.payment_status !== 'Checked Out') {
                    return false;
                }

                // Check actual checkout time (this is the key fix!)
                const checkoutTime = b.actual_checkout_time || b.updated_at || b.checkout_time;
                if (!checkoutTime) {
                    return false;
                }

                const checkoutDate = new Date(checkoutTime).toDateString();
                const isToday = checkoutDate === today;

                // Debug logging
                if (isToday) {
                    console.log(`✅ Found checkout today: Booking #${b.id} at ${checkoutTime}`);
                }

                return isToday;
            } catch (error) {
                console.log(`❌ Error checking booking #${b.id}:`, error);
                return false;
            }
        }).length;

        // Calculate guest metrics
        const activeBookings = bookings.filter(b => b.payment_status !== 'Checked Out');
        const totalActiveGuests = activeBookings.reduce((sum, booking) =>
            sum + (booking.guest_count || 1), 0
        );

        // Update dashboard elements safely
        updateElement('vacant-rooms', vacantRooms);
        updateElement('occupied-rooms', occupiedRooms);
        updateElement('occupancy-rate', occupancyRate + '%');
        updateElement('total-revenue', formatCurrency(totalRevenue));
        updateElement('pending-payments', formatCurrency(pendingPayments));
        updateElement('checkins-today', checkinsToday);
        updateElement('checkouts-today', checkoutsToday);
        updateElement('total-customers', customers.length);
        updateElement('total-guests', totalActiveGuests);
        updateElement('total-bookings', bookings.length);

        // Update dashboard components
        updateRecentBookings();
        updateRoomOverview();

        // ✅ Debug info
        console.log(`📊 Dashboard Stats: Check-ins today: ${checkinsToday}, Check-outs today: ${checkoutsToday}`);

        console.log('📊 Dashboard updated successfully');
    } catch (error) {
        console.error('❌ Error updating dashboard:', error);
        showAlert('Error updating dashboard. Some data may not display correctly.', 'warning');
    }
}

function updateRecentBookings() {
    const recentBookingsDiv = document.getElementById('recent-bookings');
    if (!recentBookingsDiv) return;

    try {
        const recentBookings = bookings
            .sort((a, b) => {
                const aDate = new Date(b.created_at || b.checkin_time || 0);
                const bDate = new Date(a.created_at || a.checkin_time || 0);
                return aDate - bDate;
            })
            .slice(0, 6);

        if (recentBookings.length === 0) {
            recentBookingsDiv.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-calendar-plus fa-3x mb-3 opacity-50"></i>
                    <h6>No Recent Bookings</h6>
                    <p class="mb-3">Start creating bookings to see them here</p>
                    <button class="btn btn-primary btn-sm" onclick="showSection('new-booking')">
                        <i class="fas fa-plus me-2"></i>Create First Booking
                    </button>
                </div>
            `;
            return;
        }

        let html = '';
        recentBookings.forEach(booking => {
            const customer = customers.find(c => c.id === booking.customer_id);
            const room = rooms.find(r => r.id === booking.room_id);
            const guestCount = booking.guest_count || 1;
            const statusBadge = getStatusBadge(booking.payment_status);

            html += `
                <div class="d-flex align-items-center border-bottom py-2 booking-item">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 class="mb-1">${customer ? customer.name : 'Walk-in Customer'}</h6>
                                <small class="text-muted d-flex align-items-center">
                                    <i class="fas fa-bed me-1"></i>Room ${room ? room.room_number : 'N/A'}
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-users me-1"></i>${guestCount} guest${guestCount > 1 ? 's' : ''}
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-rupee-sign me-1"></i>${booking.total_amount || 0}
                                </small>
                                <small class="text-muted">
                                    ${formatDate(booking.created_at || booking.checkin_time)}
                                </small>
                            </div>
                            <span class="badge ${statusBadge}">${booking.payment_status}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        recentBookingsDiv.innerHTML = html;
    } catch (error) {
        console.error('Error updating recent bookings:', error);
        recentBookingsDiv.innerHTML = '<div class="alert alert-danger">Error loading recent bookings</div>';
    }
}

function updateRoomOverview() {
    const roomOverviewDiv = document.getElementById('room-overview');
    if (!roomOverviewDiv) return;

    try {
        const roomStats = {
            total: rooms.length,
            vacant: rooms.filter(r => r.status === 'Vacant').length,
            occupied: rooms.filter(r => r.status === 'Occupied').length,
            maintenance: rooms.filter(r => r.status === 'Under Maintenance').length
        };

        const occupancyRate = roomStats.total > 0 ? Math.round((roomStats.occupied / roomStats.total) * 100) : 0;

        roomOverviewDiv.innerHTML = `
            <div class="row g-2 text-center mb-3">
                <div class="col-3">
                    <div class="p-2 bg-success bg-opacity-10 rounded">
                        <h4 class="mb-1 text-success">${roomStats.vacant}</h4>
                        <small class="text-muted">Vacant</small>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 bg-danger bg-opacity-10 rounded">
                        <h4 class="mb-1 text-danger">${roomStats.occupied}</h4>
                        <small class="text-muted">Occupied</small>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 bg-warning bg-opacity-10 rounded">
                        <h4 class="mb-1 text-warning">${roomStats.maintenance}</h4>
                        <small class="text-muted">Maintenance</small>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 bg-primary bg-opacity-10 rounded">
                        <h4 class="mb-1 text-primary">${occupancyRate}%</h4>
                        <small class="text-muted">Occupied</small>
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <button class="btn btn-outline-primary btn-sm" onclick="showSection('room-status')">
                    <i class="fas fa-eye me-1"></i>View All Rooms
                </button>
                <button class="btn btn-success btn-sm" onclick="showSection('new-booking')">
                    <i class="fas fa-plus me-1"></i>New Booking
                </button>
            </div>
        `;
    } catch (error) {
        console.error('Error updating room overview:', error);
        roomOverviewDiv.innerHTML = '<div class="alert alert-danger">Error loading room overview</div>';
    }
}
function loadEnhancedAddCustomerForm() {
    const addCustomerSection = document.getElementById('add-customer');
    if (!addCustomerSection) {
        console.error('add-customer section not found in HTML');
        return;
    }

    addCustomerSection.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 offset-lg-1">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-primary text-white py-3">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-user-plus fa-2x me-3"></i>
                                <div>
                                    <h4 class="mb-1">Add New Customer</h4>
                                    <p class="mb-0 opacity-90">Complete customer registration with WhatsApp marketing</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-4">
                            <form id="customer-form" onsubmit="event.preventDefault(); addEnhancedCustomer();">

                                <!-- Personal Information Section -->
                                <div class="section-divider mb-4">
                                    <h5 class="section-title text-primary">
                                        <i class="fas fa-user me-2"></i>Personal Information
                                    </h5>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Full Name *</label>
                                            <input type="text" class="form-control" name="name" placeholder="Enter full name" required>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="form-label fw-semibold">Age</label>
                                            <input type="number" class="form-control" name="age" min="1" max="120" placeholder="Age">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="form-label fw-semibold">Gender</label>
                                            <select class="form-select" name="gender">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Date of Birth</label>
                                            <input type="date" class="form-control" name="dob" max="${new Date().toISOString().split('T')[0]}">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Customer Type</label>
                                            <select class="form-select" name="customer_type">
                                                <option value="Regular">Regular Customer</option>
                                                <option value="VIP">VIP Customer</option>
                                                <option value="Corporate">Corporate Customer</option>
                                                <option value="Group">Group Booking</option>
                                                <option value="Wedding">Wedding Party</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Contact Information Section -->
                                <div class="section-divider mb-4">
                                    <h5 class="section-title text-success">
                                        <i class="fas fa-phone me-2"></i>Contact Information
                                    </h5>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">Primary Phone Number *</label>
                                            <input type="tel" class="form-control" name="phone" placeholder="+91 XXXXX XXXXX" required>
                                            <small class="text-muted">This will be used for WhatsApp marketing</small>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-semibold">WhatsApp Number</label>
                                            <input type="tel" class="form-control" name="whatsapp" placeholder="+91 XXXXX XXXXX">
                                            <small class="text-muted">Leave blank if same as phone number</small>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label fw-semibold">Email Address *</label>
                                            <input type="email" class="form-control" name="email" placeholder="customer@example.com" required>
                                        </div>
                                    </div>
                                </div>

                                <!-- ID Documentation Section -->
                                <div class="section-divider mb-4">
                                    <h5 class="section-title text-warning">
                                        <i class="fas fa-id-card me-2"></i>ID Documentation
                                    </h5>
                                    <div class="row g-3">
  <!-- ID Type -->
  <div class="col-md-4">
    <label class="form-label fw-semibold">ID Type *</label>
    <select class="form-select" name="id_type" required>
      <option value="">Select ID Type</option>
      <option value="aadhaar" selected>Aadhaar Card</option>
      <option value="pan">PAN Card</option>
      <option value="passport">Passport</option>
      <option value="driving_license">Driving License</option>
      <option value="voter_id">Voter ID</option>
    </select>
  </div>

  <!-- Upload ID Photo 1 -->
  <div class="col-md-4">
    <label class="form-label">Upload ID Photo 1 *</label>
    <input type="file" id="customer-id-photo1" class="form-control" accept="image/*" required>
    <small class="text-muted">Upload photo of ID document (e.g. Aadhaar, Passport)</small>
  </div>

  <!-- Upload ID Photo 2 -->
  <div class="col-md-4">
    <label class="form-label">Upload ID Photo 2 *</label>
    <input type="file" id="customer-id-photo2" class="form-control" accept="image/*" required>
    <small class="text-muted">Upload second side of ID (if any)</small>
  </div>
</div>

<!-- Previews row -->
<div class="row mt-3">
  <div class="col-md-6">
    <label class="form-label">ID Photo Preview 1</label>
    <div id="id-photo-preview1" class="border rounded" 
         style="min-height:120px; padding:10px; display:flex; justify-content:center; align-items:center;">
      <i class="fas fa-id-card fa-3x text-muted"></i>
      <p class="text-muted">No photo selected</p>
    </div>
  </div>
  <div class="col-md-6">
    <label class="form-label">ID Photo Preview 2</label>
    <div id="id-photo-preview2" class="border rounded"
         style="min-height:120px; padding:10px; display:flex; justify-content:center; align-items:center;">
      <i class="fas fa-id-card fa-3x text-muted"></i>
      <p class="text-muted">No photo selected</p>
    </div>
  </div>
</div>


                                <!-- Address Information Section -->
                                <div class="section-divider mb-4">
                                    <h5 class="section-title text-info">
                                        <i class="fas fa-map-marker-alt me-2"></i>Address Information
                                    </h5>
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <label class="form-label fw-semibold">Complete Address *</label>
                                            <textarea class="form-control" name="address" rows="2" placeholder="Enter complete address" required></textarea>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="form-label fw-semibold">City *</label>
                                            <input type="text" class="form-control" name="city" placeholder="City" required value="Noida">
                                        </div>
                                        <div class="col-md-4">
                                            <label class="form-label fw-semibold">State *</label>
                                            <input type="text" class="form-control" name="state" placeholder="State" required value="Uttar Pradesh">
                                        </div>
                                        <div class="col-md-4">
                                            <label class="form-label fw-semibold">PIN Code *</label>
                                            <input type="text" class="form-control" name="pincode" pattern="[0-9]{6}" placeholder="6-digit PIN" required value="201301">
                                        </div>
                                    </div>
                                </div>

                                <!-- Marketing Preferences -->
                                <div class="section-divider mb-4">
                                    <h5 class="section-title text-purple">
                                        <i class="fab fa-whatsapp me-2"></i>Marketing Preferences
                                    </h5>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" name="whatsapp_marketing" id="whatsapp_marketing" checked>
                                                <label class="form-check-label fw-semibold" for="whatsapp_marketing">Enable WhatsApp Marketing</label>
                                            </div>
                                            <small class="text-muted">Receive offers, discounts & updates via WhatsApp</small>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" name="birthday_offers" id="birthday_offers" checked>
                                                <label class="form-check-label fw-semibold" for="birthday_offers">Birthday Special Offers</label>
                                            </div>
                                            <small class="text-muted">Get special birthday discounts & wishes</small>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="d-flex gap-3 justify-content-center flex-wrap">
                                    <button type="submit" class="btn btn-success btn-lg px-4">
                                        <i class="fas fa-save me-2"></i>Add Customer
                                    </button>
                                    <button type="reset" class="btn btn-outline-secondary btn-lg px-4">
                                        <i class="fas fa-undo me-2"></i>Reset Form
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
        .section-divider {
            border-left: 4px solid var(--bs-primary);
            padding-left: 1rem;
            margin-left: 0.5rem;
        }
        .section-title {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        .form-control:focus, .form-select:focus {
            border-color: var(--bs-primary);
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
        }
        .text-purple { color: #6f42c1 !important; }
        </style>
    `;

    ['1', '2'].forEach(num => {
        document.getElementById(`customer-id-photo${num}`).addEventListener('change', function (e) {
            const file = e.target.files[0];
            const preview = document.getElementById(`id-photo-preview${num}`);

            if (!file) {
                preview.innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted">No photo selected</p>';
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('ID photo must be less than 2 MB');
                this.value = '';
                preview.innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted">No photo selected</p>';
                return;
            }
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image (JPEG, PNG, GIF)');
                this.value = '';
                preview.innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted">No photo selected</p>';
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event) {
                preview.innerHTML = `<img src="${event.target.result}" alt="ID Photo" style="max-height:100px; max-width: 100%; object-fit: contain; border-radius: 5px;" />`;
            };
            reader.readAsDataURL(file);
        });
    });


    console.log('✅ Add customer form loaded');
}
['1', '2'].forEach(num => {
    document.getElementById(`customer-id-photo${num}`).addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById(`id-photo-preview${num}`);

        if (!file) {
            preview.innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted">No photo selected</p>';
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('ID photo must be less than 2 MB');
            this.value = '';
            preview.innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted">No photo selected</p>';
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image (JPEG, PNG, GIF)');
            this.value = '';
            preview.innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted">No photo selected</p>';
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            preview.innerHTML = `<img src="${event.target.result}" alt="ID Photo ${num}" 
        style="max-width:100%; max-height:100px; object-fit:contain; border-radius:5px;" />`;
        };
        reader.readAsDataURL(file);
    });
});

function addEnhancedCustomer() {
    try {
        const form = document.getElementById('customer-form');
        if (!form) return;

        const formData = new FormData(form);

        // Validate required fields except id photos (they are validated separately)
        const requiredFields = ['name', 'phone', 'email', 'id_type', 'address', 'city', 'state', 'pincode'];
        const missingFields = requiredFields.filter(field => !formData.get(field)?.trim());

        if (missingFields.length > 0) {
            showAlert(`Please fill all required fields:\n${missingFields.join(', ')}`, 'danger');
            return;
        }

        // Validate both ID photos
        const photoInput1 = document.getElementById('customer-id-photo1');
        const photoInput2 = document.getElementById('customer-id-photo2');
        if (!photoInput1 || !photoInput1.files || !photoInput1.files[0]) {
            showAlert('Please upload the first ID Photo.', 'danger');
            return;
        }
        if (!photoInput2 || !photoInput2.files || !photoInput2.files[0]) {
            showAlert('Please upload the second ID Photo.', 'danger');
            return;
        }

        // Check existing customer by phone
        const phoneNumber = formData.get('phone').trim();
        const existingCustomer = customers.find(c => c.phone === phoneNumber);
        if (existingCustomer) {
            if (confirm(`⚠️ Customer Already Exists!\n\nName: ${existingCustomer.name}\nPhone: ${existingCustomer.phone}\n\nWould you like to update their information instead?`)) {
                updateCustomerData(existingCustomer, formData);
                return;
            } else {
                return;
            }
        }

        // Read first photo file, then second, then save customer
        const reader1 = new FileReader();
        reader1.onload = function (e1) {
            const idPhoto1Data = e1.target.result;

            const reader2 = new FileReader();
            reader2.onload = function (e2) {
                const idPhoto2Data = e2.target.result;

                const customer = {
                    id: nextCustomerId++,
                    name: formData.get('name').trim(),
                    age: parseInt(formData.get('age')) || null,
                    gender: formData.get('gender') || '',
                    dob: formData.get('dob') || '',
                    customer_type: formData.get('customer_type') || 'Regular',
                    phone: formData.get('phone').trim(),
                    whatsapp: formData.get('whatsapp')?.trim() || formData.get('phone').trim(),
                    email: formData.get('email').trim(),
                    id_type: formData.get('id_type'),
                    idPhoto1: idPhoto1Data,
                    idPhoto2: idPhoto2Data,
                    address: formData.get('address').trim(),
                    city: formData.get('city').trim(),
                    state: formData.get('state').trim(),
                    pincode: formData.get('pincode').trim(),
                    country: 'India',
                    whatsapp_marketing: formData.get('whatsapp_marketing') === 'on',
                    birthday_offers: formData.get('birthday_offers') === 'on',
                    id_verified: true,
                    government_compliance: true,
                    created_at: new Date().toISOString(),
                    last_updated: new Date().toISOString()
                };

                customers.push(customer);
                saveToLocalStorage();

                showAlert(`✅ Customer Added Successfully!\n\n👤 Name: ${customer.name}\n📱 Phone/WhatsApp: ${customer.whatsapp}\n🎯 Marketing: ${customer.whatsapp_marketing ? 'Enabled' : 'Disabled'}`, 'success', 6000);

                form.reset();
                document.getElementById('id-photo-preview1').innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted mb-0">No photo selected</p>';
                document.getElementById('id-photo-preview2').innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted mb-0">No photo selected</p>';

                updateDashboard();

                setTimeout(() => {
                    if (confirm(`🎉 Customer "${customer.name}" added successfully!\n\nCustomer ID: ${customer.id}\nWhatsApp marketing: ${customer.whatsapp_marketing ? 'Enabled' : 'Disabled'}\n\n📋 Would you like to create a booking for this customer now?`)) {
                        showSection('new-booking');
                    }
                }, 2000);
            };
            reader2.readAsDataURL(photoInput2.files[0]);
        };
        reader1.readAsDataURL(photoInput1.files[0]);

    } catch (error) {
        console.error('❌ Error adding enhanced customer:', error);
        showAlert('❌ Error adding customer. Please check all fields and try again.', 'danger');
    }
}


function renderCustomerIdPhoto(customer) {
    if (customer.idPhoto) {
        return `<img src="${customer.idPhoto}" alt="ID Photo" style="width:40px; height:40px; object-fit:cover; border-radius:5px;">`;
    } else {
        return '<i class="fas fa-id-card text-muted"></i>';
    }
}

function updateCustomerData(existingCustomer, formData) {
    try {
        // Update existing customer with new data
        Object.assign(existingCustomer, {
            name: formData.get('name').trim(),
            age: parseInt(formData.get('age')) || existingCustomer.age,
            gender: formData.get('gender') || existingCustomer.gender,
            dob: formData.get('dob') || existingCustomer.dob,
            customer_type: formData.get('customer_type') || existingCustomer.customer_type,
            phone: formData.get('phone').trim(),
            whatsapp: formData.get('whatsapp')?.trim() || formData.get('phone').trim(),
            email: formData.get('email').trim(),
            id_type: formData.get('id_type'),
            aadhaar: formData.get('aadhaar').trim(),
            address: formData.get('address').trim(),
            city: formData.get('city').trim(),
            state: formData.get('state').trim(),
            pincode: formData.get('pincode').trim(),
            whatsapp_marketing: formData.get('whatsapp_marketing') === 'on',
            birthday_offers: formData.get('birthday_offers') === 'on',
            last_updated: new Date().toISOString()
        });

        saveToLocalStorage();
        showAlert(`✅ Customer Information Updated!\n\n👤 Name: ${existingCustomer.name}\n📱 WhatsApp: ${existingCustomer.whatsapp}\n🎯 Marketing: ${existingCustomer.whatsapp_marketing ? 'Enabled' : 'Disabled'}`, 'success');

        document.getElementById('customer-form').reset();
        updateDashboard();

    } catch (error) {
        console.error('❌ Error updating customer:', error);
        showAlert('❌ Error updating customer information.', 'danger');
    }
}

// ==================== CUSTOMER SEARCH & LIST (FIXED) ====================
function loadSearchCustomers() {
    const searchSection = document.getElementById('search-customers');
    if (!searchSection) {
        console.error('search-customers section not found');
        return;
    }

    searchSection.innerHTML = `
        <div class="container-fluid">
            <div class="card">
                <div class="card-header">
                    <h4><i class="fas fa-search me-2"></i>Search Customers</h4>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="search-input" 
                                   placeholder="Search by name, phone, email..." 
                                   onkeyup="searchCustomers()">
                        </div>
                        <div class="col-md-3">
                            <select class="form-select" id="customer-type-filter" onchange="searchCustomers()">
                                <option value="">All Types</option>
                                <option value="Regular">Regular</option>
                                <option value="VIP">VIP</option>
                                <option value="Corporate">Corporate</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <button class="btn btn-outline-secondary w-100" onclick="clearSearchFilters()">
                                <i class="fas fa-times me-1"></i>Clear
                            </button>
                        </div>
                    </div>
                    <div id="search-results">
                        <div class="text-center text-muted py-5">
                            <i class="fas fa-search fa-3x mb-3 opacity-50"></i>
                            <h6>Start Your Search</h6>
                            <p>Enter customer name, phone, email to find customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    console.log('✅ Search customers loaded');
}

function displaySearchResults(results) {
    const searchResultsDiv = document.getElementById('search-results');
    if (!searchResultsDiv) {
        console.error('search-results container not found');
        return;
    }

    if (!results || results.length === 0) {
        searchResultsDiv.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-user-times fa-3x text-muted mb-3"></i>
                <h6>No Customers Found</h6>
                <p class="text-muted mb-3">No customers match your search criteria</p>
                <button class="btn btn-primary" onclick="clearSearchFilters()">Clear Filters</button>
            </div>`;
        return;
    }

    // Build HTML table or list of customers in results
    let html = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>`;

    results.forEach(customer => {
        html += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.email}</td>
                <td>${customer.customer_type}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="showCustomerDetails(${customer.id})">View</button>
                    <button class="btn btn-sm btn-success" onclick="createBookingForCustomer(${customer.id})">Book</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';

    searchResultsDiv.innerHTML = html;
}


function searchCustomers() {
    try {
        const query = document.getElementById('search-input')?.value.toLowerCase() || '';
        const customerType = document.getElementById('customer-type-filter')?.value || '';
        const searchResultsDiv = document.getElementById('search-results');

        if (!searchResultsDiv) return;

        if (query.length < 2 && !customerType) {
            searchResultsDiv.innerHTML = `
                <div class="text-center text-muted py-5">
                    <i class="fas fa-search fa-3x mb-3 opacity-50"></i>
                    <h6>Start Your Search</h6>
                    <p>Enter at least 2 characters to find customers</p>
                </div>
            `;
            return;
        }

        let results = customers.filter(customer => {
            const matchesQuery = !query || (
                customer.name.toLowerCase().includes(query) ||
                customer.phone.includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                (customer.whatsapp && customer.whatsapp.includes(query))
            );

            const matchesType = !customerType || customer.customer_type === customerType;
            return matchesQuery && matchesType;
        });

        if (results.length === 0) {
            searchResultsDiv.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-user-times fa-3x text-muted mb-3"></i>
                    <h6>No Customers Found</h6>
                    <p class="text-muted mb-3">No customers match your search criteria</p>
                    <button class="btn btn-primary" onclick="clearSearchFilters()">Clear Filters</button>
                </div>
            `;
            return;
        }

        displaySearchResults(results);
    } catch (error) {
        console.error('Error searching customers:', error);
        showAlert('Error searching customers.', 'danger');
    }
}


function clearSearchFilters() {
    const searchInput = document.getElementById('search-input');
    const typeFilter = document.getElementById('customer-type-filter');

    if (searchInput) searchInput.value = '';
    if (typeFilter) typeFilter.value = '';

    const searchResultsDiv = document.getElementById('search-results');
    if (searchResultsDiv) {
        searchResultsDiv.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-search fa-3x mb-3 opacity-50"></i>
                <h6>Start Your Search</h6>
                <p>Enter customer name, phone, email to find customers</p>
            </div>
        `;
    }
}

function loadCustomerList() {
    const customerListDiv = document.getElementById('customer-list-content');
    if (!customerListDiv) {
        console.error('customer-list-content section not found');
        return;
    }

    if (customers.length === 0) {
        customerListDiv.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-users fa-4x text-muted mb-4 opacity-50"></i>
                <h4>No Customers Found</h4>
                <p class="text-muted mb-4">Start by adding your first customer to the system.</p>
                <button class="btn btn-success btn-lg" onclick="showSection('add-customer')">
                    <i class="fas fa-plus me-2"></i>Add First Customer
                </button>
            </div>
        `;
        return;
    }

    displayCustomerList(customers);
    console.log('✅ Customer list loaded');
}

function displayCustomerList(customersToShow) {
    const customerListDiv = document.getElementById('customer-list-content');
    if (!customerListDiv) return;

    const sortedCustomers = [...customersToShow].sort((a, b) => {
        try {
            return new Date(b.created_at) - new Date(a.created_at);
        } catch {
            return 0;
        }
    });

    let html = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h5 class="mb-1">Customer Database</h5>
                <p class="text-muted mb-0">Total ${customers.length} customers • WhatsApp Marketing: ${customers.filter(c => c.whatsapp_marketing).length} enabled</p>
            </div>
            <div>
                <button class="btn btn-success" onclick="showSection('whatsapp-marketing')">
                    <i class="fab fa-whatsapp me-1"></i>WhatsApp Marketing
                </button>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Marketing</th>
                        <th>Bookings</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;

    sortedCustomers.forEach(customer => {
        const bookingCount = bookings.filter(b => b.customer_id === customer.id).length;
        const isVIP = customer.customer_type === 'VIP';

        html += `
            <tr class="${isVIP ? 'table-warning' : ''}">
                <td>
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <div class="avatar-circle ${isVIP ? 'bg-warning text-dark' : 'bg-primary text-white'}">
                                ${customer.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1">
                                ${customer.name}
                                ${isVIP ? '<i class="fas fa-crown text-warning ms-1"></i>' : ''}
                            </h6>
                            <small class="text-muted">ID: #${customer.id}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="small">
                        📱 ${customer.phone}<br>
                        💬 ${customer.whatsapp}<br>
                        📧 ${customer.email}
                    </div>
                </td>
                <td>
                    <div>
                        <span class="badge bg-${customer.whatsapp_marketing ? 'success' : 'secondary'} mb-1">
                            ${customer.whatsapp_marketing ? 'WhatsApp ✓' : 'WhatsApp ✗'}
                        </span><br>
                        <span class="badge bg-${customer.birthday_offers ? 'info' : 'secondary'}">
                            ${customer.birthday_offers ? 'Birthday ✓' : 'Birthday ✗'}
                        </span>
                    </div>
                </td>
                <td>
                    <span class="badge bg-primary">${bookingCount}</span>
                </td>
                <td>
                    <span class="badge bg-${isVIP ? 'warning text-dark' : 'secondary'}">${customer.customer_type}</span>
                </td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-info" onclick="showCustomerDetails(${customer.id})">
                            View
                        </button>
                        <button class="btn btn-outline-success" onclick="createBookingForCustomer(${customer.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-outline-primary" onclick="sendWhatsAppMessage(${customer.id})">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
        
        <style>
        .avatar-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        </style>
    `;

    customerListDiv.innerHTML = html;
}

function openEditCustomerForm(customer) {
    // Switch to the add-customer section
    showSection('add-customer');

    // Wait a moment for the form to load, then populate it
    setTimeout(() => {
        const form = document.getElementById('customer-form');
        if (!form) {
            console.error('Customer form not found');
            return;
        }

        // Pre-fill all form fields with customer data
        const fields = [
            { name: 'name', value: customer.name },
            { name: 'age', value: customer.age || '' },
            { name: 'gender', value: customer.gender || '' },
            { name: 'dob', value: customer.dob || '' },
            { name: 'customer_type', value: customer.customer_type || 'Regular' },
            { name: 'phone', value: customer.phone },
            { name: 'whatsapp', value: customer.whatsapp },
            { name: 'email', value: customer.email },
            { name: 'id_type', value: customer.id_type },
            { name: 'address', value: customer.address },
            { name: 'city', value: customer.city },
            { name: 'state', value: customer.state },
            { name: 'pincode', value: customer.pincode },
        ];

        fields.forEach(field => {
            const element = form.querySelector(`[name="${field.name}"]`);
            if (element) {
                element.value = field.value;
            }
        });

        // Handle checkboxes
        const whatsappMarketing = form.querySelector('[name="whatsapp_marketing"]');
        if (whatsappMarketing) {
            whatsappMarketing.checked = customer.whatsapp_marketing || false;
        }

        const birthdayOffers = form.querySelector('[name="birthday_offers"]');
        if (birthdayOffers) {
            birthdayOffers.checked = customer.birthday_offers || false;
        }

        // Show existing ID photo if available
       if (customer.idPhoto1) {
  document.getElementById('id-photo-preview1').innerHTML =
    `<img src="${customer.idPhoto1}" alt="ID Photo 1"
      style="max-width: 100%; max-height: 150px; object-fit: contain; border-radius: 5px;">`;
}
if (customer.idPhoto2) {
  document.getElementById('id-photo-preview2').innerHTML =
    `<img src="${customer.idPhoto2}" alt="ID Photo 2"
      style="max-width: 100%; max-height: 150px; object-fit: contain; border-radius: 5px;">`;
}



        // Change form behavior to update instead of create
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Update Customer';
        }

        // Change form submission to update function
        form.onsubmit = function (e) {
            e.preventDefault();
            updateExistingCustomer(customer.id);
        };

        // Show alert that we're editing
        showAlert(`Editing customer: ${customer.name}`, 'info', 3000);

    }, 100);
}



function updateExistingCustomer(customerId) {
    try {
        const form = document.getElementById('customer-form');
        const formData = new FormData(form);

        // Find the customer to update
        const customerIndex = customers.findIndex(c => c.id === customerId);
        if (customerIndex === -1) {
            showAlert('Customer not found!', 'danger');
            return;
        }

        // Validate required fields
        const requiredFields = ['name', 'phone', 'email', 'id_type', 'address', 'city', 'state', 'pincode'];
        const missingFields = requiredFields.filter(field => !formData.get(field)?.trim());

        if (missingFields.length > 0) {
            showAlert(`Please fill all required fields: ${missingFields.join(', ')}`, 'danger');
            return;
        }

        // Check for ID photo (use existing if no new photo uploaded)
        const photoInput = document.getElementById('customer-id-photo');
        let idPhotoData = customers[customerIndex].idPhoto; // Keep existing photo

        if (photoInput && photoInput.files && photoInput.files[0]) {
            // New photo uploaded, read it
            const reader = new FileReader();
            reader.onload = function (e) {
                idPhotoData = e.target.result;
                saveUpdatedCustomer();
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            // No new photo, save with existing data
            saveUpdatedCustomer();
        }

        function saveUpdatedCustomer() {
            // Update customer object
            customers[customerIndex] = {
                ...customers[customerIndex], // Keep existing properties
                name: formData.get('name').trim(),
                age: parseInt(formData.get('age')) || null,
                gender: formData.get('gender') || '',
                dob: formData.get('dob') || '',
                customer_type: formData.get('customer_type') || 'Regular',
                phone: formData.get('phone').trim(),
                whatsapp: formData.get('whatsapp')?.trim() || formData.get('phone').trim(),
                email: formData.get('email').trim(),
                id_type: formData.get('id_type'),
                idPhoto: idPhotoData,
                address: formData.get('address').trim(),
                city: formData.get('city').trim(),
                state: formData.get('state').trim(),
                pincode: formData.get('pincode').trim(),
                whatsapp_marketing: formData.get('whatsapp_marketing') === 'on',
                birthday_offers: formData.get('birthday_offers') === 'on',
                last_updated: new Date().toISOString()
            };

            saveToLocalStorage();
            showAlert(`✅ Customer "${customers[customerIndex].name}" updated successfully!`, 'success', 4000);

            // Reset form back to add mode
            resetFormToAddMode();
            updateDashboard();
        }

    } catch (error) {
        console.error('❌ Error updating customer:', error);
        showAlert('❌ Error updating customer. Please try again.', 'danger');
    }
}

function resetFormToAddMode() {
    const form = document.getElementById('customer-form');
    if (!form) return;

    // Reset form
    form.reset();

    // Reset submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Add Customer';
    }

    // Reset form submission
    form.onsubmit = function (e) {
        e.preventDefault();
        addEnhancedCustomer();
    };

    // Reset photo preview
    const preview = document.getElementById('id-photo-preview');
    if (preview) {
        preview.innerHTML = '<i class="fas fa-id-card fa-3x text-muted"></i><p class="text-muted mb-0">No photo selected</p>';
    }
}

function showCustomerDetails(customerId) {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) {
    showAlert('Customer not found!', 'danger');
    return;
  }

  const modalBody = document.getElementById('customerDetailsModalBody');
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-4">
        <div style="margin-bottom: 10px;">
          <img src="${customer.idPhoto1 || 'default-img.png'}" alt="ID Photo Front"
            style="max-width: 100%; max-height: 150px; object-fit: contain; border-radius: 5px;">
        </div>
        <div style="margin-bottom: 10px;">
          <img src="${customer.idPhoto2 || 'default-img.png'}" alt="ID Photo Back"
            style="max-width: 100%; max-height: 150px; object-fit: contain; border-radius: 5px;">
        </div>
      </div>
      <div class="col-md-8">
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>WhatsApp:</strong> ${customer.whatsapp}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        <p><strong>City:</strong> ${customer.city}</p>
        <p><strong>State:</strong> ${customer.state}</p>
        <p><strong>Pincode:</strong> ${customer.pincode}</p>
        <p><strong>Customer Type:</strong> ${customer.customer_type}</p>
        <p><strong>ID Type:</strong> ${customer.id_type}</p>
        <!-- Add other customer info here -->
      </div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById('customerDetailsModal'));
  modal.show();

  document.getElementById('editCustomerBtn').onclick = function () {
    modal.hide();
    openEditCustomerForm(customer);
  };
}


function createBookingForCustomer(customerId) {
    showSection('new-booking');
    setTimeout(() => {
        const customerSelect = document.getElementById('booking-customer');
        if (customerSelect) {
            customerSelect.value = customerId;
            updatePrimaryGuestInfo();
        }
    }, 500);
}

// ==================== ROOM MANAGEMENT (FIXED) ====================
function loadRoomStatus() {
    const roomStatusDiv = document.getElementById('room-status-grid');
    if (!roomStatusDiv) {
        console.error('room-status-grid not found in HTML');
        return;
    }

    try {
        if (rooms.length === 0) {
            roomStatusDiv.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-home fa-3x text-muted mb-3"></i>
                    <h5>No Rooms Available</h5>
                    <p class="text-muted">Rooms will be initialized automatically.</p>
                    <button class="btn btn-primary" onclick="initializeRooms(); loadRoomStatus();">
                        Initialize Rooms Now
                    </button>
                </div>
            `;
            return;
        }

        // Group rooms by floor
        const floors = {
            1: rooms.filter(r => Math.floor(r.room_number / 100) === 1),
            2: rooms.filter(r => Math.floor(r.room_number / 100) === 2),
            3: rooms.filter(r => Math.floor(r.room_number / 100) === 3)
        };

        let html = `
            <!-- Room Status Summary -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card bg-primary text-white">
                        <div class="card-body">
                            <div class="row text-center">
                                <div class="col-3">
                                    <h3 class="mb-1">${rooms.filter(r => r.status === 'Vacant').length}</h3>
                                    <small>Vacant Rooms</small>
                                </div>
                                <div class="col-3">
                                    <h3 class="mb-1">${rooms.filter(r => r.status === 'Occupied').length}</h3>
                                    <small>Occupied Rooms</small>
                                </div>
                                <div class="col-3">
                                    <h3 class="mb-1">${rooms.filter(r => r.status === 'Under Maintenance').length}</h3>
                                    <small>Maintenance</small>
                                </div>
                                <div class="col-3">
                                    <h3 class="mb-1">${Math.round((rooms.filter(r => r.status === 'Occupied').length / rooms.length) * 100)}%</h3>
                                    <small>Occupancy Rate</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Display rooms by floor
        Object.keys(floors).forEach(floor => {
            if (floors[floor].length > 0) {
                html += `
                    <div class="mb-4">
                        <h5><i class="fas fa-building me-2"></i>Floor ${floor} (${floors[floor].length} rooms)</h5>
                        <div class="row g-3">
                `;

                floors[floor].forEach(room => {
                    const statusClass = room.status === 'Vacant' ? 'success' :
                        room.status === 'Occupied' ? 'danger' : 'warning';
                    const statusIcon = room.status === 'Vacant' ? 'door-open' :
                        room.status === 'Occupied' ? 'door-closed' : 'tools';

                    // Find current booking if occupied
                    const currentBooking = bookings.find(b =>
                        b.room_id === room.id &&
                        (b.payment_status === 'Pending' || b.payment_status === 'Paid' || b.payment_status === 'Partial')
                    );

                    let occupancyInfo = '';
                    if (currentBooking && room.status === 'Occupied') {
                        const customer = customers.find(c => c.id === currentBooking.customer_id);
                        const guestCount = currentBooking.guest_count || 1;
                        try {
                            const checkoutDate = new Date(currentBooking.checkout_time).toLocaleDateString();
                            occupancyInfo = `
                                <div class="mt-2 p-2 bg-light rounded">
                                    <small class="text-dark">
                                        <strong><i class="fas fa-user me-1"></i>${customer ? customer.name : 'Unknown Guest'}</strong><br>
                                        <i class="fas fa-users me-1"></i>${guestCount} guest${guestCount > 1 ? 's' : ''}<br>
                                        <i class="fas fa-calendar me-1"></i>Until: ${checkoutDate}
                                    </small>
                                </div>
                            `;
                        } catch (error) {
                            occupancyInfo = `
                                <div class="mt-2 p-2 bg-light rounded">
                                    <small class="text-dark">
                                        <strong><i class="fas fa-user me-1"></i>${customer ? customer.name : 'Unknown Guest'}</strong><br>
                                        <i class="fas fa-users me-1"></i>${guestCount} guest${guestCount > 1 ? 's' : ''}
                                    </small>
                                </div>
                            `;
                        }
                    }

                    html += `
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div class="card room-card border-${statusClass} h-100 shadow-sm">
                                <div class="card-header bg-${statusClass} text-white text-center py-2">
                                    <h6 class="mb-0">
                                        <i class="fas fa-${statusIcon} me-1"></i>
                                        Room ${room.room_number}
                                    </h6>
                                </div>
                                <div class="card-body text-center py-3">
                                    <h5 class="text-${statusClass} mb-2">${formatCurrency(room.price)}</h5>
                                    <small class="text-muted">per day</small>
                                    <div class="my-2">
                                        <span class="badge bg-${statusClass} fs-6">${room.status}</span>
                                    </div>
                                    <div class="small text-muted">
                                        <i class="fas fa-bed me-1"></i>Capacity: ${room.capacity || 2} guests<br>
                                        <i class="fas fa-home me-1"></i>Type: ${room.type}
                                    </div>
                                    ${occupancyInfo}
                                </div>
                                <div class="card-footer bg-light p-2">
                                    <div class="btn-group w-100" role="group">
                                        <button class="btn btn-sm btn-outline-primary" onclick="viewRoomDetails(${room.id})">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-${statusClass}" onclick="quickStatusChange(${room.id})">
                                            <i class="fas fa-exchange-alt"></i>
                                        </button>
                                        ${room.status === 'Vacant' ? `
                                            <button class="btn btn-sm btn-success" onclick="quickBookRoom(${room.id})">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += '</div></div>';
            }
        });

        roomStatusDiv.innerHTML = html;
        console.log('✅ Room status loaded successfully');

    } catch (error) {
        console.error('❌ Error loading room status:', error);
        roomStatusDiv.innerHTML = `
            <div class="alert alert-danger">
                <h6>Error Loading Room Status</h6>
                <p>Error: ${error.message}</p>
                <button class="btn btn-sm btn-danger" onclick="loadRoomStatus()">Try Again</button>
            </div>
        `;
    }
}

// ========================================
// ROOM MANAGEMENT SECTION - COMPLETE FIX
// Replace your loadRoomManagement() function with this complete version
// ========================================

function loadRoomManagement() {
    console.log('🔄 Loading Room Management...');

    const roomManagementDiv = document.getElementById('room-management-grid');
    if (!roomManagementDiv) {
        console.error('❌ room-management-grid section not found in HTML');
        showAlert('Room Management section not found in HTML.\n\nPlease check your page structure.', 'danger');
        return;
    }

    try {
        // Update room counts first
        updateRoomCounts();

        // Check if we have rooms
        if (rooms.length === 0) {
            roomManagementDiv.innerHTML = `
                <div class="container-fluid">
                    <div class="card">
                        <div class="card-header bg-warning text-dark">
                            <h4><i class="fas fa-home me-2"></i>No Rooms Available</h4>
                        </div>
                        <div class="card-body text-center py-5">
                            <i class="fas fa-home fa-4x text-muted mb-4 opacity-50"></i>
                            <h5>No Rooms Found</h5>
                            <p class="text-muted mb-4">Rooms will be initialized automatically when you start the system.</p>
                            <button class="btn btn-primary btn-lg" onclick="initializeRooms(); loadRoomManagement();">
                                <i class="fas fa-plus me-2"></i>Initialize Rooms
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Calculate room statistics
        const totalRooms = rooms.length;
        const vacantRooms = rooms.filter(r => r.status === 'Vacant').length;
        const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
        const maintenanceRooms = rooms.filter(r => r.status === 'Under Maintenance').length;
        const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

        // Group rooms by floor
        const floorRooms = {
            1: rooms.filter(r => Math.floor(r.room_number / 100) === 1),
            2: rooms.filter(r => Math.floor(r.room_number / 100) === 2),
            3: rooms.filter(r => Math.floor(r.room_number / 100) === 3)
        };

        roomManagementDiv.innerHTML = `
            <div class="container-fluid">
                <!-- Room Statistics -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h2><i class="fas fa-cogs me-2"></i>Room Management</h2>
                                <p class="text-muted mb-0">Manage all hotel rooms, prices, and configurations</p>
                            </div>
                            <div class="text-end">
                                <button class="btn btn-outline-success" onclick="exportRoomData()">
                                    <i class="fas fa-download me-1"></i>Export Room Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Statistics Cards -->
                <div class="row mb-4">
                    <div class="col-md-2">
                        <div class="card bg-primary bg-opacity-10 border-primary text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${totalRooms}</h4>
                                <small>Total Rooms</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card bg-success bg-opacity-10 border-success text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${vacantRooms}</h4>
                                <small>Available</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card bg-danger bg-opacity-10 border-danger text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${occupiedRooms}</h4>
                                <small>Occupied</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card bg-warning bg-opacity-10 border-warning text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${maintenanceRooms}</h4>
                                <small>Maintenance</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-info bg-opacity-10 border-info text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${occupancyRate}%</h4>
                                <small>Occupancy Rate</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Management Tools -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h6><i class="fas fa-tools me-2"></i>Management Tools</h6>
                            </div>
                            <div class="card-body py-3">
                                <div class="row g-3">
                                    <div class="col-md-3">
                                        <button class="btn btn-primary w-100" onclick="showAllRooms()">
                                            <i class="fas fa-list me-1"></i>All Rooms (${totalRooms})
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-success w-100" onclick="filterRooms('Vacant')">
                                            <i class="fas fa-door-open me-1"></i>Vacant (${vacantRooms})
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-danger w-100" onclick="filterRooms('Occupied')">
                                            <i class="fas fa-door-closed me-1"></i>Occupied (${occupiedRooms})
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-warning w-100" onclick="filterRooms('Under Maintenance')">
                                            <i class="fas fa-tools me-1"></i>Maintenance (${maintenanceRooms})
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <button class="btn btn-outline-info w-100" onclick="bulkStatusChange()">
                                            <i class="fas fa-edit me-1"></i>Bulk Status Change
                                        </button>
                                    </div>
                                    <div class="col-md-4">
                                        <button class="btn btn-outline-primary w-100" onclick="updateAllPrices()">
                                            <i class="fas fa-rupee-sign me-1"></i>Update Prices
                                        </button>
                                    </div>
                                    <div class="col-md-4">
                                        <button class="btn btn-outline-success w-100" onclick="generateRoomReport()">
                                            <i class="fas fa-chart-bar me-1"></i>Room Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Rooms by Floor -->
                <div class="row">
                    ${generateFloorRooms(floorRooms)}
                </div>
            </div>
        `;

        console.log('✅ Room Management loaded successfully');

    } catch (error) {
        console.error('❌ Error loading Room Management:', error);
        roomManagementDiv.innerHTML = `
            <div class="alert alert-danger">
                <h6><i class="fas fa-exclamation-triangle me-2"></i>Error Loading Room Management</h6>
                <p>Error: ${error.message}</p>
                <button class="btn btn-sm btn-danger" onclick="loadRoomManagement()">Try Again</button>
            </div>
        `;
    }
}

// Generate floor rooms HTML
function generateFloorRooms(floorRooms) {
    let html = '';

    Object.keys(floorRooms).forEach(floor => {
        if (floorRooms[floor].length > 0) {
            html += `
                <div class="col-12 mb-4">
                    <div class="card">
                        <div class="card-header bg-secondary text-white">
                            <h6><i class="fas fa-building me-2"></i>Floor ${floor} (${floorRooms[floor].length} rooms)</h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                ${generateRoomCards(floorRooms[floor])}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    return html;
}

// Generate room cards
function generateRoomCards(roomsArray) {
    let html = '';

    roomsArray.forEach(room => {
        const statusClass = room.status === 'Vacant' ? 'success' :
            room.status === 'Occupied' ? 'danger' : 'warning';

        const statusIcon = room.status === 'Vacant' ? 'door-open' :
            room.status === 'Occupied' ? 'door-closed' : 'tools';

        // Find current booking if occupied
        const currentBooking = bookings.find(b =>
            b.room_id === room.id &&
            (b.payment_status === 'Pending' || b.payment_status === 'Paid' || b.payment_status === 'Partial')
        );

        let occupancyInfo = '';
        if (currentBooking) {
            const customer = customers.find(c => c.id === currentBooking.customer_id);
            const guestCount = currentBooking.guest_count || 1;
            occupancyInfo = `
                <div class="mt-2">
                    <small class="text-dark">
                        <strong>${customer ? customer.name : 'Unknown'}</strong><br>
                        ${guestCount} guest${guestCount > 1 ? 's' : ''}<br>
                        Until: ${new Date(currentBooking.checkout_time).toLocaleDateString()}
                    </small>
                </div>
            `;
        }

        html += `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div class="card room-card border-${statusClass} h-100" onclick="viewRoomDetails(${room.id})">
                    <div class="card-header bg-${statusClass} text-white text-center py-2">
                        <h6 class="mb-0">
                            <i class="fas fa-${statusIcon} me-1"></i>
                            Room ${room.room_number}
                        </h6>
                    </div>
                    <div class="card-body text-center py-3">
                        <h6 class="text-${statusClass} mb-2">${room.type}</h6>
                        <p class="mb-2"><strong>${formatCurrency(room.price)}</strong>/night</p>
                        <span class="badge bg-${statusClass}">${room.status}</span>
                        ${occupancyInfo}
                    </div>
                    <div class="card-footer p-2">
                        <div class="d-grid gap-1">
                            <button class="btn btn-sm btn-outline-primary" onclick="event.stopPropagation(); quickStatusChange(${room.id})">
                                <i class="fas fa-exchange-alt me-1"></i>Change Status
                            </button>
                            ${room.status === 'Vacant' ? `
                                <button class="btn btn-sm btn-outline-success" onclick="event.stopPropagation(); createBookingForRoom(${room.id})">
                                    <i class="fas fa-plus me-1"></i>Book Room
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    return html;
}

// Update room counts in dashboard cards
function updateRoomCounts() {
    try {
        const totalRooms = rooms.length;
        const vacantRooms = rooms.filter(r => r.status === 'Vacant').length;
        const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
        const maintenanceRooms = rooms.filter(r => r.status === 'Under Maintenance').length;

        updateElement('total-rooms-count', totalRooms);
        updateElement('available-rooms-count', vacantRooms);
        updateElement('occupied-rooms-count', occupiedRooms);
        updateElement('maintenance-rooms-count', maintenanceRooms);

    } catch (error) {
        console.error('Error updating room counts:', error);
    }
}

// Show all rooms
function showAllRooms() {
    console.log('Showing all rooms');
    loadRoomManagement();
}

// Filter rooms by status
function filterRooms(status) {
    console.log(`Filtering rooms by status: ${status}`);

    const filteredRooms = rooms.filter(room => room.status === status);

    if (filteredRooms.length === 0) {
        showAlert(`No rooms with status: ${status}`, 'info');
        return;
    }

    // Group filtered rooms by floor
    const floorRooms = {
        1: filteredRooms.filter(r => Math.floor(r.room_number / 100) === 1),
        2: filteredRooms.filter(r => Math.floor(r.room_number / 100) === 2),
        3: filteredRooms.filter(r => Math.floor(r.room_number / 100) === 3)
    };

    const roomManagementDiv = document.getElementById('room-management-grid');
    if (roomManagementDiv) {
        roomManagementDiv.innerHTML = `
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5><i class="fas fa-filter me-2"></i>Filtered: ${status} Rooms (${filteredRooms.length})</h5>
                            <button class="btn btn-outline-secondary" onclick="showAllRooms()">
                                <i class="fas fa-times me-1"></i>Clear Filter
                            </button>
                        </div>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    ${generateFloorRooms(floorRooms)}
                </div>
            </div>
        `;
    }
}

// Quick status change
function quickStatusChange(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        showAlert('Room not found!', 'danger');
        return;
    }

    const newStatus = prompt(
        `Change Room ${room.room_number} status from "${room.status}" to:\n\n1. Vacant\n2. Occupied\n3. Under Maintenance\n\nEnter your choice (1-3):`
    );

    let status;
    switch (newStatus) {
        case '1':
            status = 'Vacant';
            break;
        case '2':
            status = 'Occupied';
            break;
        case '3':
            status = 'Under Maintenance';
            break;
        default:
            return;
    }

    if (status && status !== room.status) {
        room.status = status;
        room.last_updated = new Date().toISOString();
        saveToLocalStorage();
        showAlert(`Room ${room.room_number} status changed to "${status}"`, 'success');
        loadRoomManagement();
        updateDashboard();
    }
}

// View room details
function viewRoomDetails(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        showAlert('Room not found!', 'danger');
        return;
    }

    // Find current booking if occupied
    const currentBooking = bookings.find(b =>
        b.room_id === roomId &&
        (b.payment_status === 'Pending' || b.payment_status === 'Paid' || b.payment_status === 'Partial')
    );

    let details = `🏨 ROOM DETAILS - ${room.room_number}\n\n`;
    details += `📋 ROOM INFORMATION\n`;
    details += `Room Number: ${room.room_number}\n`;
    details += `Type: ${room.type}\n`;
    details += `Price: ${formatCurrency(room.price)}/night\n`;
    details += `Status: ${room.status}\n`;
    details += `Floor: ${room.floor || Math.floor(room.room_number / 100)}\n`;
    details += `Capacity: ${room.capacity || 2} guests\n`;
    details += `Amenities: ${room.amenities || 'AC, WiFi, TV, Bathroom'}\n\n`;

    if (currentBooking) {
        const customer = customers.find(c => c.id === currentBooking.customer_id);
        details += `👤 CURRENT OCCUPANCY\n`;
        details += `Guest: ${customer ? customer.name : 'Unknown'}\n`;
        details += `Phone: ${customer ? customer.phone : 'N/A'}\n`;
        details += `Guests: ${currentBooking.guest_count || 1}\n`;
        details += `Check-in: ${new Date(currentBooking.checkin_time).toLocaleString()}\n`;
        details += `Check-out: ${new Date(currentBooking.checkout_time).toLocaleString()}\n`;
        details += `Booking ID: #${currentBooking.id}\n`;
        details += `Amount: ${formatCurrency(currentBooking.total_amount || 0)}\n`;
    } else {
        details += `📊 STATUS\n`;
        details += `Currently ${room.status.toLowerCase()} and available for booking.\n`;
    }

    details += `\n🕐 SYSTEM INFO\n`;
    details += `Room ID: ${room.id}\n`;
    details += `Last Updated: ${room.last_updated ? new Date(room.last_updated).toLocaleString() : 'Never'}`;

    alert(details);
}

// Create booking for room
function createBookingForRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        showAlert('Room not found!', 'danger');
        return;
    }

    if (room.status !== 'Vacant') {
        showAlert(`Room ${room.room_number} is not available for booking.\nCurrent status: ${room.status}`, 'warning');
        return;
    }

    showSection('new-booking');

    // Pre-select the room in booking form
    setTimeout(() => {
        const roomSelect = document.getElementById('booking-room');
        if (roomSelect) {
            roomSelect.value = room.id;
            if (typeof calculateBookingTotal === 'function') {
                calculateBookingTotal();
            }
        }
    }, 500);
}

// Bulk status change
function bulkStatusChange() {
    const roomNumbers = prompt(
        'Bulk Status Change\n\nEnter room numbers separated by commas (e.g., 101,102,103):'
    );

    if (!roomNumbers) return;

    const newStatus = prompt(
        'Change selected rooms to:\n\n1. Vacant\n2. Occupied\n3. Under Maintenance\n\nEnter your choice (1-3):'
    );

    let status;
    switch (newStatus) {
        case '1':
            status = 'Vacant';
            break;
        case '2':
            status = 'Occupied';
            break;
        case '3':
            status = 'Under Maintenance';
            break;
        default:
            return;
    }

    const roomNumbersArray = roomNumbers.split(',').map(num => parseInt(num.trim()));
    let changedRooms = 0;

    roomNumbersArray.forEach(roomNumber => {
        const room = rooms.find(r => r.room_number === roomNumber);
        if (room && room.status !== status) {
            room.status = status;
            room.last_updated = new Date().toISOString();
            changedRooms++;
        }
    });

    if (changedRooms > 0) {
        saveToLocalStorage();
        showAlert(`✅ Status changed for ${changedRooms} rooms to "${status}"`, 'success');
        loadRoomManagement();
        updateDashboard();
    } else {
        showAlert('No rooms were changed', 'info');
    }
}

// Update all prices
function updateAllPrices() {
    const priceChange = prompt(
        'Update Room Prices\n\nEnter price change:\n- Enter amount to increase (e.g., 500)\n- Enter negative to decrease (e.g., -200)\n- Enter percentage (e.g., 10%)\n\nPrice change:'
    );

    if (!priceChange) return;

    let isPercentage = priceChange.includes('%');
    let changeValue = parseFloat(priceChange.replace('%', ''));

    if (isNaN(changeValue)) {
        showAlert('Invalid price change value', 'danger');
        return;
    }

    let updatedRooms = 0;

    rooms.forEach(room => {
        const oldPrice = room.price;

        if (isPercentage) {
            room.price = Math.round(oldPrice * (1 + changeValue / 100));
        } else {
            room.price = oldPrice + changeValue;
        }

        if (room.price < 0) room.price = 500; // Minimum price
        room.last_updated = new Date().toISOString();
        updatedRooms++;
    });

    saveToLocalStorage();
    showAlert(`✅ Prices updated for ${updatedRooms} rooms\n${isPercentage ? changeValue + '%' : '₹' + changeValue} ${changeValue >= 0 ? 'increase' : 'decrease'}`, 'success');
    loadRoomManagement();
}

// Generate room report
function generateRoomReport() {
    const totalRooms = rooms.length;
    const vacantRooms = rooms.filter(r => r.status === 'Vacant').length;
    const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'Under Maintenance').length;
    const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

    const averagePrice = Math.round(rooms.reduce((sum, room) => sum + room.price, 0) / totalRooms);
    const totalRevenue = rooms.reduce((sum, room) => {
        if (room.status === 'Occupied') {
            return sum + room.price;
        }
        return sum;
    }, 0);

    let report = `📊 ROOM MANAGEMENT REPORT\n`;
    report += `${new Date().toLocaleString()}\n\n`;

    report += `🏨 ROOM STATISTICS\n`;
    report += `Total Rooms: ${totalRooms}\n`;
    report += `Available: ${vacantRooms} (${Math.round((vacantRooms / totalRooms) * 100)}%)\n`;
    report += `Occupied: ${occupiedRooms} (${occupancyRate}%)\n`;
    report += `Maintenance: ${maintenanceRooms} (${Math.round((maintenanceRooms / totalRooms) * 100)}%)\n\n`;

    report += `💰 FINANCIAL OVERVIEW\n`;
    report += `Average Room Price: ${formatCurrency(averagePrice)}\n`;
    report += `Daily Revenue (Occupied): ${formatCurrency(totalRevenue)}\n`;
    report += `Potential Revenue (Full): ${formatCurrency(totalRooms * averagePrice)}\n\n`;

    report += `📋 ROOM TYPES\n`;
    const roomTypes = {};
    rooms.forEach(room => {
        if (!roomTypes[room.type]) {
            roomTypes[room.type] = { count: 0, price: room.price };
        }
        roomTypes[room.type].count++;
    });

    Object.keys(roomTypes).forEach(type => {
        report += `${type}: ${roomTypes[type].count} rooms @ ${formatCurrency(roomTypes[type].price)}\n`;
    });

    alert(report);
}

// Export room data
function exportRoomData() {
    try {
        let csvContent = "Room Number,Type,Price,Status,Floor,Capacity,Current Guest,Phone,Check-out Date\n";

        rooms.forEach(room => {
            const currentBooking = bookings.find(b =>
                b.room_id === room.id &&
                (b.payment_status === 'Pending' || b.payment_status === 'Paid' || b.payment_status === 'Partial')
            );

            let guestName = 'N/A';
            let guestPhone = 'N/A';
            let checkoutDate = 'N/A';

            if (currentBooking) {
                const customer = customers.find(c => c.id === currentBooking.customer_id);
                guestName = customer ? customer.name : 'Unknown';
                guestPhone = customer ? customer.phone : 'N/A';
                checkoutDate = new Date(currentBooking.checkout_time).toLocaleDateString();
            }

            const row = [
                room.room_number,
                room.type,
                room.price,
                room.status,
                room.floor || Math.floor(room.room_number / 100),
                room.capacity || 2,
                guestName,
                guestPhone,
                checkoutDate
            ].map(field => `"${field}"`).join(',');

            csvContent += row + "\n";
        });

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `room_data_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showAlert('✅ Room data exported successfully!', 'success');

    } catch (error) {
        console.error('Error exporting room data:', error);
        showAlert('Error exporting room data', 'danger');
    }
}

console.log('✅ Room Management functions loaded successfully!');

function viewRoomDetails(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        showAlert('Room not found!', 'danger');
        return;
    }

    const currentBooking = bookings.find(b =>
        b.room_id === roomId &&
        (b.payment_status === 'Pending' || b.payment_status === 'Paid' || b.payment_status === 'Partial')
    );

    let details = `🏨 ROOM DETAILS - Room ${room.room_number}\n\n`;
    details += `🏠 ROOM INFO:\n`;
    details += `• Room Number: ${room.room_number}\n`;
    details += `• Room Type: ${room.type}\n`;
    details += `• Floor: ${room.floor || Math.floor(room.room_number / 100)}\n`;
    details += `• Price: ${formatCurrency(room.price)} per day\n`;
    details += `• Capacity: ${room.capacity || 2} guests\n`;
    details += `• Status: ${room.status}\n\n`;

    if (currentBooking) {
        const customer = customers.find(c => c.id === currentBooking.customer_id);
        details += `👥 CURRENT OCCUPANCY:\n`;
        details += `• Guest: ${customer ? customer.name : 'Unknown'}\n`;
        details += `• Phone: ${customer ? customer.phone : 'N/A'}\n`;
        details += `• Guests: ${currentBooking.guest_count || 1}\n`;
        try {
            details += `• Check-out: ${formatDate(currentBooking.checkout_time)}\n`;
        } catch {
            details += `• Check-out: Invalid date\n`;
        }
    } else {
        details += `✅ AVAILABILITY:\n`;
        details += `Currently ${room.status.toLowerCase()} and ${room.status === 'Vacant' ? 'available for booking' : 'not available'}.`;
    }

    alert(details);
}

function quickStatusChange(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        showAlert('Room not found!', 'danger');
        return;
    }

    const choice = prompt(`Change Room ${room.room_number} status from "${room.status}" to:\n\n1. Vacant\n2. Occupied\n3. Under Maintenance\n\nEnter your choice (1-3):`);

    let newStatus = '';
    switch (choice) {
        case '1':
            newStatus = 'Vacant';
            break;
        case '2':
            newStatus = 'Occupied';
            break;
        case '3':
            newStatus = 'Under Maintenance';
            break;
        default:
            return;
    }

    if (newStatus && newStatus !== room.status) {
        room.status = newStatus;
        saveToLocalStorage();
        showAlert(`✅ Room ${room.room_number} status changed to "${newStatus}"`, 'success');
        loadRoomStatus();
        updateDashboard();
    }
}

function quickBookRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        showAlert('Room not found!', 'danger');
        return;
    }

    if (room.status !== 'Vacant') {
        showAlert(`Room ${room.room_number} is not available for booking (Status: ${room.status})`, 'warning');
        return;
    }

    if (confirm(`📋 Quick Book Room ${room.room_number}?\n\nRoom Type: ${room.type}\nPrice: ${formatCurrency(room.price)} per day\n\nThis will redirect you to the booking form.`)) {
        showSection('new-booking');
    }
}

// ==================== BOOKING SYSTEM (FIXED) ====================
function loadNewBookingWithGuests() {
    console.log('🔄 Loading new booking form...');

    const newBookingDiv = document.getElementById('new-booking');
    if (!newBookingDiv) {
        console.error('new-booking section not found in HTML');
        showAlert('New Booking section not found in HTML. Please check your page structure.', 'danger');
        return;
    }

    try {

        function toLocalISOString(date) {
            const offset = date.getTimezoneOffset() * 60000; // adjust UTC → local
            return new Date(date - offset).toISOString().slice(0, 16);
        }

        const now = new Date();

        // ✅ Check-in = current time (local)
        const defaultCheckin = toLocalISOString(now);

        // ✅ Checkout = tomorrow at 11:00 AM (local)
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        tomorrow.setHours(11, 0, 0, 0); // force time to 11:00 AM (hh, mm, ss, ms)

        const defaultCheckout = toLocalISOString(tomorrow);

        console.log("Check-in:", defaultCheckin);
        console.log("Checkout:", defaultCheckout);


        newBookingDiv.innerHTML = `
            <div class="container-fluid">
                <div class="card shadow-sm">
                    <div class="card-header bg-success text-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4><i class="fas fa-calendar-plus me-2"></i>New Booking with Multiple Guests</h4>
                                <p class="mb-0">Create bookings for couples, families, and groups</p>
                            </div>
                            <div class="text-end">
                                <small>Customers: ${customers.length} | Available Rooms: ${rooms.filter(r => r.status === 'Vacant').length}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <form id="booking-form" onsubmit="event.preventDefault(); submitBookingWithGuests();">
                            <!-- Basic Booking Info -->
                            <div class="row mb-4">
                                <div class="col-12">
                                    <h5 class="text-primary"><i class="fas fa-info-circle me-2"></i>Booking Information</h5>
                                    <hr>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Select Customer *</label>
                                    <select class="form-select form-select-lg" id="booking-customer" onchange="updatePrimaryGuestInfo()" required>
                                        <option value="">Choose Customer...</option>
                                        ${customers.map(customer =>
            `<option value="${customer.id}">${customer.name} - ${customer.phone} (${customer.customer_type})</option>`
        ).join('')}
                                    </select>
                                    <small class="text-muted">
                                        Don't see the customer? 
                                        <a href="#" onclick="showSection('add-customer')" class="text-decoration-none">Add New Customer</a>
                                    </small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Select Room *</label>
                                    <select class="form-select form-select-lg" id="booking-room" onchange="calculateBookingTotal()" required>
                                        <option value="">Choose Room...</option>
                                        ${rooms.filter(room => room.status === 'Vacant').map(room =>
            `<option value="${room.id}">Room ${room.room_number} - ${room.type} (${formatCurrency(room.price)}/day)</option>`
        ).join('')}
                                    </select>
                                    <small class="text-muted">Only vacant rooms are shown</small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Check-in Date & Time *</label>
                                    <input type="datetime-local" class="form-control form-control-lg" 
                                           id="checkin-date" onchange="calculateBookingTotal()" 
                                           value="${defaultCheckin}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Check-out Date & Time *</label>
                                    <input type="datetime-local" class="form-control form-control-lg" 
                                           id="checkout-date" onchange="calculateBookingTotal()" 
                                           value="${defaultCheckout}" required>
                                </div>
                            </div>

                            <!-- Guest Information -->
                            <div class="row mb-4">
                                <div class="col-12">
                                    <h5 class="text-info"><i class="fas fa-users me-2"></i>Guest Information</h5>
                                    <hr>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Number of Guests *</label>
                                    <select class="form-select form-select-lg" id="guest-count" onchange="updateGuestCount(); calculateBookingTotal();" required>
                                        <option value="1">1 Guest (Single)</option>
                                        <option value="2" selected>2 Guests (Couple)</option>
                                        <option value="3">3 Guests (Small Family)</option>
                                        <option value="4">4 Guests (Family)</option>
                                        <option value="5">5 Guests (Large Family)</option>
                                        <option value="6">6 Guests (Group)</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Booking Type</label>
                                    <select class="form-select form-select-lg" id="booking-type">
                                        <option value="couple">Couple</option>
                                        <option value="family">Family</option>
                                        <option value="friends">Friends</option>
                                        <option value="business">Business</option>
                                        <option value="wedding">Wedding Group</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Guest Details -->
                            <div class="row mb-4">
                                <div class="col-12">
                                    <h6 class="text-secondary"><i class="fas fa-address-card me-2"></i>Individual Guest Details</h6>
                                    <div id="guest-list"></div>
                                </div>
                            </div>

                            <!-- Pricing -->
                            <div class="row mb-4">
                                <div class="col-12">
                                    <h5 class="text-warning"><i class="fas fa-rupee-sign me-2"></i>Pricing</h5>
                                    <hr>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Total Amount *</label>
                                    <div class="input-group input-group-lg">
                                        <span class="input-group-text">₹</span>
                                        <input type="number" class="form-control" id="total-amount" min="1" required>
                                    </div>
                                    <small class="text-muted">System calculated amount (you can modify)</small>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Advance Payment</label>
                                    <div class="input-group input-group-lg">
                                        <span class="input-group-text">₹</span>
                                        <input type="number" class="form-control" id="advance-amount" min="0" placeholder="0">
                                    </div>
                                    <small class="text-muted">Amount received now (optional)</small>
                                </div>
                            </div>

                            <!-- Booking Summary -->
                            <div class="col-12 mb-4">
                                <div class="card bg-light border-info">
                                    <div class="card-header bg-info text-white">
                                        <h6 class="mb-0"><i class="fas fa-receipt me-2"></i>Booking Summary</h6>
                                    </div>
                                    <div class="card-body">
                                        <div id="booking-summary">
                                            <div class="text-center text-muted py-3">
                                                <i class="fas fa-arrow-up fa-2x mb-2"></i>
                                                <p>Select customer and room above to see booking summary</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Buttons -->
                            <div class="col-12">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <button type="submit" class="btn btn-success btn-lg px-5">
                                        <i class="fas fa-check me-2"></i>Create Booking
                                    </button>
                                    <button type="reset" class="btn btn-outline-secondary btn-lg px-4" onclick="resetBookingForm()">
                                        <i class="fas fa-undo me-2"></i>Reset Form
                                    </button>
                                    <button type="button" class="btn btn-outline-info btn-lg px-4" onclick="showSection('quick-booking')">
                                        <i class="fas fa-bolt me-2"></i>Quick Booking
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        // Initialize guest count after HTML is loaded
        setTimeout(() => {
            updateGuestCount();
        }, 100);

        console.log('✅ New booking form loaded successfully');

    } catch (error) {
        console.error('❌ Error loading new booking form:', error);
        newBookingDiv.innerHTML = `
            <div class="alert alert-danger">
                <h6>Error Loading Booking Form</h6>
                <p>Error: ${error.message}</p>
                <button class="btn btn-sm btn-danger" onclick="loadNewBookingWithGuests()">Try Again</button>
            </div>
        `;
    }
}


function updatePrimaryGuestInfo() {
  const custId = document.getElementById('booking-customer').value;
  const cust = customers.find(c=>c.id==custId);
  if (!cust) return;
  document.querySelector('select[name="guestname1"]').value   = cust.id;
  document.querySelector('input[name="guestage1"]').value     = cust.age    || '';
  document.querySelector('input[name="guestgender1"]').value  = cust.gender || '';
  document.querySelector('input[name="guestphone1"]').value   = cust.phone  || '';
  calculateBookingTotal();
}

function updateGuestCount() {
    const guestCount = parseInt(document.getElementById('guest-count')?.value || 2);
    const guestListDiv = document.getElementById('guest-list');

    if (!guestListDiv) {
        console.error('guest-list div not found');
        return;
    }

    console.log(`🔄 Updating guest count to: ${guestCount}`);

    guestListDiv.innerHTML = '';

    for (let i = 1; i <= guestCount; i++) {
        const isPrimary = i === 1;
        const guestHtml = `
            <div class="card mb-3 ${isPrimary ? 'border-primary' : 'border-info'}">
                <div class="card-header ${isPrimary ? 'bg-primary text-white' : 'bg-info text-white'}">
                    <h6 class="mb-0">
                        <i class="fas fa-user me-2"></i>
                        Guest ${i} ${isPrimary ? '(Primary - Booking Holder)' : ''}
                    </h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Full Name *</label>
                            <select id="guest${i}Name" class="form-select" name="guestname${i}" required>
                                <option value="" disabled selected>Select customer</option>
                            </select>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Age *</label>
                            <input type="number" class="form-control" name="guestage${i}" 
                                   placeholder="Will auto-fill" ${isPrimary ? 'readonly style="background-color: #e9ecef; font-weight: bold;"' : 'readonly style="background-color: #e9ecef; font-weight: bold;"'} required>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Gender *</label>
                            <input type="text" class="form-control" name="guestgender${i}" 
                                   placeholder="Will auto-fill" ${isPrimary ? 'readonly style="background-color: #e9ecef; font-weight: bold;"' : 'readonly style="background-color: #e9ecef; font-weight: bold;"'} required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Phone Number *</label>
                            <input type="tel" class="form-control" name="guestphone${i}" 
                                   placeholder="Will auto-fill" ${isPrimary ? 'readonly style="background-color: #e9ecef; font-weight: bold;"' : 'readonly style="background-color: #e9ecef; font-weight: bold;"'}>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Relationship to Primary Guest *</label>
                            <select class="form-select" name="guestrelationship${i}" required>
                                <option value="Self" ${isPrimary ? 'selected' : ''}>Self</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Child">Child</option>
                                <option value="Parent">Parent</option>
                                <option value="Sibling">Sibling</option>
                                <option value="Friend">Friend</option>
                                <option value="Colleague">Colleague</option>
                                <option value="Relative">Relative</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
        guestListDiv.innerHTML += guestHtml;
    }

    // Populate all guest name dropdowns
    for (let i = 1; i <= guestCount; i++) {
        const sel = document.getElementById(`guest${i}Name`);
        if (sel) {
            sel.innerHTML = '<option value="" disabled selected>Select customer</option>';
            customers.forEach(cust => {
                const opt = document.createElement('option');
                opt.value = cust.id;
                opt.textContent = cust.name;
                sel.appendChild(opt);
            });
            // Add change event to autofill other fields
            sel.addEventListener('change', function () {
                const custId = parseInt(this.value);
                const cust = customers.find(c => c.id === custId);
                if (!cust) return;
                const container = this.closest('.card-body');
                if (container) {
                    container.querySelector(`[name="guestage${i}"]`).value = cust.age || '';
                    container.querySelector(`[name="guestgender${i}"]`).value = cust.gender || '';
                    container.querySelector(`[name="guestphone${i}"]`).value = cust.phone || '';
                }
            });
        }
    }

    // Update primary guest info if customer is already selected
    updatePrimaryGuestInfo();

    console.log(`✅ Generated ${guestCount} guest forms`);
}
    // Populate all guest name dropdowns
   for (let i = 1; i <= guestCount; i++) {
    const sel = document.getElementById(`guest${i}Name`);
    if (sel) {
        sel.innerHTML = '<option value="" disabled selected>Select customer</option>';
        customers.forEach(cust => {
            const opt = document.createElement('option');
            opt.value = cust.id;
            opt.textContent = cust.name;
            sel.appendChild(opt);
        });
        // Capture current value of i so event handler closes over correct guest index
        const guestIndex = i;
        sel.addEventListener('change', function () {
            const custId = parseInt(this.value);
            const cust = customers.find(c => c.id === custId);
            if (!cust) return;
            const container = this.closest('.card-body');
            if (container) {
                container.querySelector(`[name="guestage${guestIndex}"]`).value = cust.age || '';
                container.querySelector(`[name="guestgender${guestIndex}"]`).value = cust.gender || '';
                container.querySelector(`[name="guestphone${guestIndex}"]`).value = cust.phone || '';
            }
        });
    }
}



    // Update primary guest info if customer is already selected
    updatePrimaryGuestInfo();

    console.log(`✅ Generated ${guestCount} guest forms`);



function calculateBookingTotal() {
    try {
        const roomId = document.getElementById('booking-room')?.value;
        const checkinDate = document.getElementById('checkin-date')?.value;
        const checkoutDate = document.getElementById('checkout-date')?.value;
        const guestCount = parseInt(document.getElementById('guest-count')?.value || 2);
        const customerId = document.getElementById('booking-customer')?.value;
        const bookingSummary = document.getElementById('booking-summary');
        const totalAmountField = document.getElementById('total-amount');

        if (!bookingSummary) return;

        if (!roomId || !checkinDate || !checkoutDate || !customerId) {
            bookingSummary.innerHTML = `
                <div class="text-center text-muted py-3">
                    <i class="fas fa-arrow-up fa-2x mb-2"></i>
                    <p>Select customer, room and dates first</p>
                </div>
            `;
            return;
        }

        const room = rooms.find(r => r.id == roomId);
        const customer = customers.find(c => c.id == customerId);
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const timeDiff = checkout - checkin;
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (days <= 0) {
            bookingSummary.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Check-out must be after check-in!
                </div>
            `;
            return;
        }

        if (room && customer) {
            const baseAmount = days * room.price;
            const extraGuestCharge = guestCount > 2 ? (guestCount - 2) * 500 * days : 0;
            const totalAmount = baseAmount + extraGuestCharge;

            // Auto-fill total amount if not manually entered
            if (totalAmountField && (!totalAmountField.value || totalAmountField.value == 0)) {
                totalAmountField.value = totalAmount;
            }

            bookingSummary.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Booking Details:</h6>
                        <p class="mb-1"><strong>Customer:</strong> ${customer.name} (${customer.customer_type})</p>
                        <p class="mb-1"><strong>Phone:</strong> ${customer.phone}</p>
                        <p class="mb-1"><strong>Room:</strong> ${room.room_number} - ${room.type}</p>
                        <p class="mb-1"><strong>Check-in:</strong> ${checkin.toLocaleDateString()}</p>
                        <p class="mb-1"><strong>Check-out:</strong> ${checkout.toLocaleDateString()}</p>
                        <p class="mb-1"><strong>Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
                        <p class="mb-1"><strong>Total Guests:</strong> ${guestCount}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-success">Pricing Breakdown:</h6>
                        <p class="mb-1"><strong>Base Rate:</strong> ${formatCurrency(room.price)} × ${days} days = ${formatCurrency(baseAmount)}</p>
                        ${extraGuestCharge > 0 ? `<p class="mb-1"><strong>Extra Guest Charge:</strong> ${guestCount - 2} guests × ₹500 × ${days} days = ${formatCurrency(extraGuestCharge)}</p>` : '<p class="mb-1"><strong>Extra Guest Charge:</strong> None (≤2 guests)</p>'}
                        <hr>
                        <p class="mb-0"><strong>Total Amount:</strong> <span class="text-success h5">${formatCurrency(totalAmount)}</span></p>
                        <small class="text-muted">You can modify the total amount above if needed</small>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error calculating booking total:', error);
        const bookingSummary = document.getElementById('booking-summary');
        if (bookingSummary) {
            bookingSummary.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Error calculating total. Please check your inputs.
                </div>
            `;
        }
    }
}

// function collectGuestData() {
//     const guestCount = parseInt(document.getElementById('guest-count')?.value || 2);
//     const guests = [];

//     for (let i = 1; i <= guestCount; i++) {
//         const name = document.querySelector(`[name="guestname${i}"]`)?.value?.trim();
//         const age = document.querySelector(`input[name="guestage${i}"]`)?.value;
//         const gender = document.querySelector(`select[name="guestgender${i}"]`)?.value;
//         const phone = document.querySelector(`input[name="guestphone${i}"]`)?.value?.trim();
//         const relationship = document.querySelector(`select[name="guestrelationship${i}"]`)?.value;

//         if (!name || !age || !gender || !relationship) {
//             throw new Error(`Please fill all required fields for Guest ${i}`);
//         }

//         guests.push({
//             id: i,
//             name: name,
//             age: parseInt(age),
//             gender: gender,
//             phone: phone || '',
//             relationship: relationship,
//             is_primary: i === 1
//         });
//     }

//     return guests;
// }

// function collectGuestData() {
//   const guestCount = parseInt(document.getElementById('guest-count')?.value) || 2;
//   const guests = [];
//   for (let i = 1; i <= guestCount; i++) {
//     // Selectors corrected:
//     const nameElem = document.getElementById(`guest${i}Name`);  // assuming guest name select has id guest1Name, guest2Name etc.
// const ageElem = document.querySelector(`input[name="guestage${i}"]`);
// const genderElem = document.querySelector(`select[name="guestgender${i}"]`);
// const phoneElem = document.querySelector(`input[name="guestphone${i}"]`);
// const relationshipElem = document.querySelector(`select[name="guestrelationship${i}"]`);

// const name = nameElem?.value?.trim() || "";
// const age = ageElem?.value || "";
// const gender = genderElem?.value || "";
// const phone = phoneElem?.value?.trim() || "";
// const relationship = relationshipElem?.value || "";


//     if (!name || !age || !gender || !relationship) {
//       throw new Error(`Please fill all required fields for Guest ${i}`);
//     }

//     guests.push({
//       id: i,
//       name: name,
//       age: parseInt(age),
//       gender: gender,
//       phone: phone,
//       relationship: relationship,
//       isprimary: (i === 1)
//     });
//   }
//   return guests;
// }

// function collectGuestData() {
//   const guestCount = parseInt(document.getElementById('guest-count')?.value) || 2;
//   const guests = [];
//   for (let i = 1; i <= guestCount; i++) {
//     const nameElem = document.querySelector(`select[name="guestname${i}"]`);
//     const ageElem = document.querySelector(`input[name="guestage${i}"]`);
//     const genderElem = document.querySelector(`select[name="guestgender${i}"]`);
//     const phoneElem = document.querySelector(`input[name="guestphone${i}"]`);
//     const relationshipElem = document.querySelector(`select[name="guestrelationship${i}"]`);

//     const name = nameElem?.value?.trim() || "";
//     const age = ageElem?.value || "";
//     const gender = genderElem?.value || "";
//     const phone = phoneElem?.value?.trim() || "";
//     const relationship = relationshipElem?.value || "";

//     if (!name || !age || !gender || !relationship) {
//       throw new Error(`Please fill all required fields for Guest ${i}`);
//     }

//     guests.push({
//       id: i,
//       name: name,
//       age: parseInt(age),
//       gender: gender,
//       phone: phone,
//       relationship: relationship,
//       isprimary: (i === 1)
//     });
//   }
//   return guests;
// }

function collectGuestData() {
  const guestCount = parseInt(document.getElementById('guest-count')?.value) || 2;
  const guests = [];

  for (let i = 1; i <= guestCount; i++) {
    // Select guest inputs by name attribute matching HTML
    const nameElem = document.querySelector(`select[name="guestname${i}"]`);
    const ageElem = document.querySelector(`input[name="guestage${i}"]`);
    const genderElem = document.querySelector(`input[name="guestgender${i}"]`);
    const phoneElem = document.querySelector(`input[name="guestphone${i}"]`);
    const relationshipElem = document.querySelector(`select[name="guestrelationship${i}"]`);

    // Read values, default to empty string if missing or null
    const name = nameElem?.value?.trim() || '';
    const age = ageElem?.value || '';
    const gender = genderElem?.value || '';
    const phone = phoneElem?.value?.trim() || '';
    const relationship = relationshipElem?.value || '';

    // Debug logging to console - check what values are being read
    console.log(`Guest ${i} data:`);
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Phone:', phone);
    console.log('Relationship:', relationship);

    // Validate required fields
    if (!name) {
      console.error(`Guest ${i} - Name is missing`);
      throw new Error(`Please select a customer for Guest ${i}`);
    }
    if (!age) {
      console.error(`Guest ${i} - Age is missing`);
      throw new Error(`Please fill age for Guest ${i}`);
    }
    if (!gender) {
      console.error(`Guest ${i} - Gender is missing`);
      throw new Error(`Please fill gender for Guest ${i}`);
    }
    if (!relationship) {
      console.error(`Guest ${i} - Relationship is missing`);
      throw new Error(`Please fill relationship for Guest ${i}`);
    }

    guests.push({
      id: i,
      name,
      age: parseInt(age),
      gender,
      phone,
      relationship,
      isprimary: (i === 1)
    });
  }

  console.log('Collected Guests:', guests);
  return guests;
}

 
function submitBookingWithGuests() {
    console.log('🔄 Submitting booking with guests...');

    try {
        const customerId = document.getElementById('booking-customer')?.value;
        const roomId = document.getElementById('booking-room')?.value;
        const checkinDate = document.getElementById('checkin-date')?.value;
        const checkoutDate = document.getElementById('checkout-date')?.value;
        const totalAmount = parseFloat(document.getElementById('total-amount')?.value || 0);
        const advanceAmount = parseFloat(document.getElementById('advance-amount')?.value || 0);
        const bookingType = document.getElementById('booking-type')?.value;
        const guestCount = parseInt(document.getElementById('guest-count')?.value || 2);

        console.log('Booking data:', { customerId, roomId, checkinDate, checkoutDate, totalAmount, advanceAmount, guestCount });

        // Validate required fields
        if (!customerId || !roomId || !checkinDate || !checkoutDate || !totalAmount) {
            showAlert('❌ Please fill all required fields:\n\n• Customer\n• Room\n• Check-in date\n• Check-out date\n• Total amount', 'danger');
            return;
        }

        if (totalAmount <= 0) {
            showAlert('❌ Total amount must be greater than 0', 'danger');
            return;
        }

        if (advanceAmount > totalAmount) {
            showAlert('❌ Advance amount cannot be greater than total amount', 'danger');
            return;
        }

        // Validate dates
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        if (checkout <= checkin) {
            showAlert('❌ Check-out date must be after check-in date', 'danger');
            return;
        }

        // Collect guest data
        const guests = collectGuestData();
        console.log('Guest data collected:', guests);

        // Create booking object
        const booking = {
            id: nextBookingId++,
            customer_id: parseInt(customerId),
            room_id: parseInt(roomId),
            checkin_time: checkinDate,
            checkout_time: checkoutDate,
            total_amount: totalAmount,
            advance_amount: advanceAmount,
            payment_status: advanceAmount >= totalAmount ? 'Paid' : (advanceAmount > 0 ? 'Partial' : 'Pending'),
            guest_count: guestCount,
            booking_type: bookingType,
            guests: guests,
            created_at: new Date().toISOString()
        };

        console.log('Created booking:', booking);

        // Add booking to array
        bookings.push(booking);

        // Record advance payment if any
        if (advanceAmount > 0) {
            const payment = {
                id: nextPaymentId++,
                booking_id: booking.id,
                amount: advanceAmount,
                payment_type: 'Advance',
                payment_method: 'Cash',
                payment_time: new Date().toISOString()
            };
            payments.push(payment);
            console.log('Recorded advance payment:', payment);
        }

        // Update room status to occupied
        const room = rooms.find(r => r.id == roomId);
        if (room) {
            room.status = 'Occupied';
            console.log('Updated room status to Occupied:', room.room_number);
        }

        // Save to localStorage
        saveToLocalStorage();

        // Get customer and room details for success message
        const customer = customers.find(c => c.id == customerId);

        // Show success message
        const successMessage = `✅ Booking Created Successfully!\n\n🏨 BOOKING DETAILS:\n• Customer: ${customer ? customer.name : 'Unknown'}\n• Room: ${room ? room.room_number + ' - ' + room.type : 'N/A'}\n• Guests: ${guestCount} (${guests.map(g => g.name).join(', ')})\n• Duration: ${Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24))} days\n• Total Amount: ${formatCurrency(totalAmount)}\n• Advance Paid: ${formatCurrency(advanceAmount)}\n• Balance: ${formatCurrency(totalAmount - advanceAmount)}\n\n🎉 Room ${room ? room.room_number : 'N/A'} is now occupied!`;

        showAlert(successMessage, 'success', 8000);

        // Reset form and update dashboard
        resetBookingForm();
        updateDashboard();

        // Ask if user wants to create another booking
        setTimeout(() => {
            if (confirm('Booking created successfully!\n\nWould you like to create another booking?')) {
                loadNewBookingWithGuests();
            } else {
                showSection('dashboard');
            }
        }, 3000);

    } catch (error) {
        console.error('❌ Error creating booking:', error);
        showAlert(`❌ Error creating booking: ${error.message}`, 'danger');
    }
}

function resetBookingForm() {
    console.log('🔄 Resetting booking form...');

    try {
        const form = document.getElementById('booking-form');
        if (form) {
            form.reset();
        }

        const guestListDiv = document.getElementById('guest-list');
        if (guestListDiv) {
            guestListDiv.innerHTML = '';
        }

        const bookingSummary = document.getElementById('booking-summary');
        if (bookingSummary) {
            bookingSummary.innerHTML = `
                <div class="text-center text-muted py-3">
                    <i class="fas fa-arrow-up fa-2x mb-2"></i>
                    <p>Select customer and room above to see booking summary</p>
                </div>
            `;
        }

        // Reset guest count
        setTimeout(() => {
            updateGuestCount();
        }, 100);

        console.log('✅ Booking form reset successfully');

    } catch (error) {
        console.error('Error resetting booking form:', error);
    }
}

// ==================== QUICK BOOKING (FIXED) ====================
// ========================================
// QUICK BOOKING SECTION - COMPLETE FIX
// Replace your loadQuickBooking() function with this complete version
// ========================================

function loadQuickBooking() {
    console.log('🔄 Loading Quick Booking...');

    const quickBookingDiv = document.getElementById('quick-booking');
    if (!quickBookingDiv) {
        console.error('❌ quick-booking section not found in HTML');
        showAlert('Quick Booking section not found in HTML.\n\nPlease check your page structure.', 'danger');
        return;
    }

    try {
        // Check if we have customers and rooms
        if (customers.length === 0) {
            quickBookingDiv.innerHTML = `
                <div class="container-fluid">
                    <div class="card">
                        <div class="card-header bg-warning text-dark">
                            <h4><i class="fas fa-exclamation-triangle me-2"></i>No Customers Available</h4>
                        </div>
                        <div class="card-body text-center py-5">
                            <i class="fas fa-users fa-4x text-muted mb-4 opacity-50"></i>
                            <h5>No Customers Found</h5>
                            <p class="text-muted mb-4">Add customers first to create quick bookings.</p>
                            <button class="btn btn-success btn-lg" onclick="showSection('add-customer')">
                                <i class="fas fa-user-plus me-2"></i>Add Customer First
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const availableRooms = rooms.filter(r => r.status === 'Vacant');
        if (availableRooms.length === 0) {
            quickBookingDiv.innerHTML = `
                <div class="container-fluid">
                    <div class="card">
                        <div class="card-header bg-danger text-white">
                            <h4><i class="fas fa-door-closed me-2"></i>No Rooms Available</h4>
                        </div>
                        <div class="card-body text-center py-5">
                            <i class="fas fa-bed fa-4x text-muted mb-4 opacity-50"></i>
                            <h5>All Rooms Occupied</h5>
                            <p class="text-muted mb-4">No vacant rooms available for booking.</p>
                            <button class="btn btn-primary btn-lg" onclick="showSection('room-status')">
                                <i class="fas fa-eye me-2"></i>View Room Status
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        quickBookingDiv.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-8 offset-lg-2">
                        <div class="card shadow-sm">
                            <div class="card-header bg-warning text-dark">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4><i class="fas fa-bolt me-2"></i>Quick Booking</h4>
                                        <p class="mb-0">Fast booking for walk-in customers and quick reservations</p>
                                    </div>
                                    <div class="text-end">
                                        <small>Available Rooms: <strong>${availableRooms.length}</strong></small><br>
                                        <small>Total Customers: <strong>${customers.length}</strong></small>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card-body p-4">
                                <!-- Quick Stats -->
                                <div class="row mb-4 text-center">
                                    <div class="col-md-3">
                                        <div class="card bg-success bg-opacity-10 border-success">
                                            <div class="card-body py-3">
                                                <h5>${availableRooms.length}</h5>
                                                <small>Available Rooms</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card bg-primary bg-opacity-10 border-primary">
                                            <div class="card-body py-3">
                                                <h5>${customers.length}</h5>
                                                <small>Total Customers</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card bg-info bg-opacity-10 border-info">
                                            <div class="card-body py-3">
                                                <h5>${bookings.filter(b => b.payment_status !== 'Checked Out').length}</h5>
                                                <small>Active Bookings</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card bg-warning bg-opacity-10 border-warning">
                                            <div class="card-body py-3">
                                                <h5>₹${Math.min(...availableRooms.map(r => r.price)).toLocaleString()}</h5>
                                                <small>Starting Price</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Quick Booking Form -->
                                <form id="quick-booking-form" onsubmit="event.preventDefault(); processQuickBooking();">
                                    <div class="row">
                                        <!-- Customer Selection -->
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label fw-semibold">Select Customer *</label>
                                            <div class="input-group">
                                                <select class="form-select form-select-lg" id="quick-customer" onchange="updateQuickCustomerInfo()" required>
                                                    <option value="">Choose Customer</option>
                                                    ${generateQuickCustomerOptions()}
                                                </select>
                                                <button class="btn btn-outline-success" type="button" onclick="showSection('add-customer')" title="Add New Customer">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            <div id="customer-info" class="mt-2"></div>
                                        </div>
                                        
                                        <!-- Room Selection -->
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label fw-semibold">Select Room *</label>
                                            <select class="form-select form-select-lg" id="quick-room" onchange="updateQuickRoomInfo()" required>
                                                <option value="">Choose Room</option>
                                                ${generateQuickRoomOptions()}
                                            </select>
                                            <div id="room-info" class="mt-2"></div>
                                        </div>
                                        
                                        <!-- Check-in Date -->
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label fw-semibold">Check-in Date & Time *</label>
                                            <input type="datetime-local" class="form-control form-control-lg" id="quick-checkin" 
                                                   value="${new Date().toISOString().slice(0, 16)}" 
                                                   onchange="calculateQuickTotal()" required>
                                        </div>
                                        
                                        <!-- Check-out Date -->
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label fw-semibold">Check-out Date & Time *</label>
                                            <input type="datetime-local" class="form-control form-control-lg" id="quick-checkout" 
                                                   value="${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}" 
                                                   onchange="calculateQuickTotal()" required>
                                        </div>
                                        
                                        <!-- Number of Guests -->
                                        <div class="col-md-4 mb-3">
                                            <label class="form-label fw-semibold">Number of Guests *</label>
                                            <select class="form-select form-select-lg" id="quick-guests" onchange="calculateQuickTotal()" required>
                                                <option value="1">1 Guest</option>
                                                <option value="2" selected>2 Guests</option>
                                                <option value="3">3 Guests</option>
                                                <option value="4">4 Guests</option>
                                                <option value="5">5 Guests</option>
                                                <option value="6">6 Guests</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Booking Type -->
                                        <div class="col-md-4 mb-3">
                                            <label class="form-label fw-semibold">Booking Type</label>
                                            <select class="form-select form-select-lg" id="quick-type">
                                                <option value="Walk-in" selected>Walk-in</option>
                                                <option value="Phone">Phone Booking</option>
                                                <option value="Online">Online Booking</option>
                                                <option value="Corporate">Corporate</option>
                                                <option value="Group">Group Booking</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Payment Method -->
                                        <div class="col-md-4 mb-3">
                                            <label class="form-label fw-semibold">Payment Method *</label>
                                            <select class="form-select form-select-lg" id="quick-payment-method" required>
                                                <option value="Cash" selected>Cash</option>
                                                <option value="Card">Credit/Debit Card</option>
                                                <option value="UPI">UPI Payment</option>
                                                <option value="Online">Online Transfer</option>
                                                <option value="Cheque">Cheque</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Booking Summary -->
                                        <div class="col-12 mb-4">
                                            <div class="card bg-light">
                                                <div class="card-header">
                                                    <h6><i class="fas fa-receipt me-2"></i>Booking Summary</h6>
                                                </div>
                                                <div class="card-body">
                                                    <div id="quick-summary">Select customer and room to see pricing details</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Advance Payment -->
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label fw-semibold">Advance Payment</label>
                                            <div class="input-group input-group-lg">
                                                <span class="input-group-text">₹</span>
                                                <input type="number" class="form-control" id="quick-advance" min="0" value="0" onchange="updateAdvanceInfo()">
                                            </div>
                                            <small class="text-muted">Enter advance amount (optional)</small>
                                        </div>
                                        
                                        <!-- Total Amount (Read-only) -->
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label fw-semibold">Total Amount</label>
                                            <div class="input-group input-group-lg">
                                                <span class="input-group-text">₹</span>
                                                <input type="number" class="form-control bg-light" id="quick-total" readonly>
                                            </div>
                                            <div id="advance-info" class="mt-1"></div>
                                        </div>
                                        
                                        <!-- Special Requests -->
                                        <div class="col-12 mb-4">
                                            <label class="form-label fw-semibold">Special Requests/Notes</label>
                                            <textarea class="form-control" id="quick-notes" rows="2" placeholder="Any special requests or notes (optional)"></textarea>
                                        </div>
                                        
                                        <!-- Action Buttons -->
                                        <div class="col-12">
                                            <div class="d-flex gap-3 justify-content-center">
                                                <button type="submit" class="btn btn-warning btn-lg px-4">
                                                    <i class="fas fa-bolt me-2"></i>Quick Book Now
                                                </button>
                                                <button type="reset" class="btn btn-outline-secondary btn-lg px-4" onclick="resetQuickBookingForm()">
                                                    <i class="fas fa-undo me-2"></i>Reset Form
                                                </button>
                                                <button type="button" class="btn btn-outline-primary btn-lg px-4" onclick="showSection('new-booking')">
                                                    <i class="fas fa-plus me-2"></i>Advanced Booking
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h6><i class="fas fa-flash me-2"></i>Quick Actions</h6>
                            </div>
                            <div class="card-body">
                                <div class="row g-2">
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-success w-100" onclick="showAvailableRooms()">
                                            <i class="fas fa-door-open me-1"></i>Available Rooms (${availableRooms.length})
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-info w-100" onclick="showSection('customer-list')">
                                            <i class="fas fa-users me-1"></i>Customer List
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-primary w-100" onclick="showSection('all-bookings')">
                                            <i class="fas fa-calendar me-1"></i>All Bookings
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-warning w-100" onclick="showSection('dashboard')">
                                            <i class="fas fa-chart-bar me-1"></i>Dashboard
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        console.log('✅ Quick Booking loaded successfully');

    } catch (error) {
        console.error('❌ Error loading Quick Booking:', error);
        quickBookingDiv.innerHTML = `
            <div class="alert alert-danger">
                <h6><i class="fas fa-exclamation-triangle me-2"></i>Error Loading Quick Booking</h6>
                <p>Error: ${error.message}</p>
                <button class="btn btn-sm btn-danger" onclick="loadQuickBooking()">Try Again</button>
            </div>
        `;
    }
}

// Generate customer options for quick booking
function generateQuickCustomerOptions() {
    let options = '';

    // Sort customers by recent activity (those with bookings first, then by name)
    const sortedCustomers = [...customers].sort((a, b) => {
        const aBookings = bookings.filter(booking => booking.customer_id === a.id).length;
        const bBookings = bookings.filter(booking => booking.customer_id === b.id).length;

        if (aBookings !== bBookings) {
            return bBookings - aBookings; // More bookings first
        }
        return a.name.localeCompare(b.name);
    });

    sortedCustomers.forEach(customer => {
        const bookingCount = bookings.filter(b => b.customer_id === customer.id).length;
        const isVIP = customer.customer_type === 'VIP';
        const statusIcon = isVIP ? '👑' : bookingCount > 0 ? '⭐' : '👤';

        options += `
            <option value="${customer.id}" data-phone="${customer.phone}" data-type="${customer.customer_type}">
                ${statusIcon} ${customer.name} - ${customer.phone} ${isVIP ? '(VIP)' : bookingCount > 0 ? `(${bookingCount} bookings)` : '(New)'}
            </option>
        `;
    });

    return options;
}

// Generate room options for quick booking
function generateQuickRoomOptions() {
    const availableRooms = rooms.filter(r => r.status === 'Vacant');
    let options = '';

    // Group rooms by type for better organization
    const roomsByType = {};
    availableRooms.forEach(room => {
        if (!roomsByType[room.type]) {
            roomsByType[room.type] = [];
        }
        roomsByType[room.type].push(room);
    });

    // Sort room types by price (cheapest first)
    const sortedTypes = Object.keys(roomsByType).sort((a, b) => {
        const avgPriceA = roomsByType[a].reduce((sum, room) => sum + room.price, 0) / roomsByType[a].length;
        const avgPriceB = roomsByType[b].reduce((sum, room) => sum + room.price, 0) / roomsByType[b].length;
        return avgPriceA - avgPriceB;
    });

    sortedTypes.forEach(type => {
        const rooms = roomsByType[type].sort((a, b) => a.room_number - b.room_number);

        rooms.forEach(room => {
            options += `
                <option value="${room.id}" data-price="${room.price}" data-type="${room.type}" data-capacity="${room.capacity || 2}">
                    Room ${room.room_number} - ${room.type} - ₹${room.price.toLocaleString()}/night (${room.capacity || 2} guests)
                </option>
            `;
        });
    });

    return options;
}

// Update customer info display
function updateQuickCustomerInfo() {
    const customerSelect = document.getElementById('quick-customer');
    const customerInfo = document.getElementById('customer-info');

    if (!customerSelect || !customerInfo) return;

    const customerId = parseInt(customerSelect.value);
    if (!customerId) {
        customerInfo.innerHTML = '';
        return;
    }

    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    const bookingCount = bookings.filter(b => b.customer_id === customer.id).length;
    const isVIP = customer.customer_type === 'VIP';

    customerInfo.innerHTML = `
        <div class="card card-sm ${isVIP ? 'border-warning bg-warning bg-opacity-10' : 'border-info bg-info bg-opacity-10'}">
            <div class="card-body p-2">
                <div class="d-flex justify-content-between">
                    <div>
                        <small><strong>${customer.name}</strong> ${isVIP ? '👑 VIP' : ''}</small>
                        <br><small class="text-muted">${customer.phone} • ${customer.email}</small>
                    </div>
                    <div class="text-end">
                        <small class="badge bg-primary">${bookingCount} bookings</small>
                        ${customer.whatsapp_marketing ? '<br><small class="badge bg-success">Marketing ✓</small>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    calculateQuickTotal();
}

// Update room info display
function updateQuickRoomInfo() {
    const roomSelect = document.getElementById('quick-room');
    const roomInfo = document.getElementById('room-info');

    if (!roomSelect || !roomInfo) return;

    const roomId = parseInt(roomSelect.value);
    if (!roomId) {
        roomInfo.innerHTML = '';
        return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    roomInfo.innerHTML = `
        <div class="card card-sm border-success bg-success bg-opacity-10">
            <div class="card-body p-2">
                <div class="d-flex justify-content-between">
                    <div>
                        <small><strong>Room ${room.room_number}</strong> • ${room.type}</small>
                        <br><small class="text-muted">${room.amenities || 'AC, WiFi, TV, Bathroom'}</small>
                    </div>
                    <div class="text-end">
                        <small><strong>₹${room.price.toLocaleString()}</strong>/night</small>
                        <br><small class="text-muted">Max ${room.capacity || 2} guests</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    calculateQuickTotal();
}

// Calculate booking total
function calculateQuickTotal() {
    try {
        const roomId = parseInt(document.getElementById('quick-room')?.value);
        const checkinDate = document.getElementById('quick-checkin')?.value;
        const checkoutDate = document.getElementById('quick-checkout')?.value;
        const guestCount = parseInt(document.getElementById('quick-guests')?.value) || 2;

        const quickSummary = document.getElementById('quick-summary');
        const totalField = document.getElementById('quick-total');

        if (!roomId || !checkinDate || !checkoutDate) {
            if (quickSummary) quickSummary.innerHTML = 'Select customer and room to see pricing details';
            if (totalField) totalField.value = '';
            return;
        }

        const room = rooms.find(r => r.id === roomId);
        if (!room) return;

        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const timeDiff = checkout - checkin;
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (days <= 0) {
            if (quickSummary) {
                quickSummary.innerHTML = '<div class="alert alert-danger alert-sm mb-0">Check-out must be after check-in!</div>';
            }
            return;
        }

        const baseAmount = days * room.price;
        const extraGuestCharge = Math.max(0, guestCount - 2) * 500 * days; // ₹500 per extra guest per day
        const totalAmount = baseAmount + extraGuestCharge;

        if (totalField) totalField.value = totalAmount;

        if (quickSummary) {
            quickSummary.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <p class="mb-1"><strong>Room:</strong> ${room.room_number} (${room.type})</p>
                        <p class="mb-1"><strong>Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
                        <p class="mb-1"><strong>Guests:</strong> ${guestCount}</p>
                    </div>
                    <div class="col-md-6 text-end">
                        <p class="mb-1"><strong>Room Charge:</strong> ₹${baseAmount.toLocaleString()}</p>
                        ${extraGuestCharge > 0 ? `<p class="mb-1"><strong>Extra Guest:</strong> ₹${extraGuestCharge.toLocaleString()}</p>` : ''}
                        <p class="mb-1"><strong class="text-success fs-5">Total: ₹${totalAmount.toLocaleString()}</strong></p>
                    </div>
                </div>
            `;
        }

        updateAdvanceInfo();

    } catch (error) {
        console.error('Error calculating quick total:', error);
    }
}

// Update advance payment info
function updateAdvanceInfo() {
    const totalAmount = parseFloat(document.getElementById('quick-total')?.value) || 0;
    const advanceAmount = parseFloat(document.getElementById('quick-advance')?.value) || 0;
    const advanceInfo = document.getElementById('advance-info');

    if (!advanceInfo || totalAmount === 0) return;

    const balanceAmount = totalAmount - advanceAmount;

    if (advanceAmount > 0) {
        if (advanceAmount >= totalAmount) {
            advanceInfo.innerHTML = '<small class="text-success"><i class="fas fa-check me-1"></i>Fully Paid</small>';
        } else {
            advanceInfo.innerHTML = `<small class="text-warning"><i class="fas fa-exclamation me-1"></i>Balance: ₹${balanceAmount.toLocaleString()}</small>`;
        }
    } else {
        advanceInfo.innerHTML = '<small class="text-danger"><i class="fas fa-clock me-1"></i>Payment Pending</small>';
    }
}

// Process quick booking
function processQuickBooking() {
    try {
        console.log('🔄 Processing quick booking...');

        // Get form data
        const customerId = parseInt(document.getElementById('quick-customer')?.value);
        const roomId = parseInt(document.getElementById('quick-room')?.value);
        const checkinDate = document.getElementById('quick-checkin')?.value;
        const checkoutDate = document.getElementById('quick-checkout')?.value;
        const guestCount = parseInt(document.getElementById('quick-guests')?.value) || 2;
        const bookingType = document.getElementById('quick-type')?.value || 'Walk-in';
        const paymentMethod = document.getElementById('quick-payment-method')?.value;
        const totalAmount = parseFloat(document.getElementById('quick-total')?.value) || 0;
        const advanceAmount = parseFloat(document.getElementById('quick-advance')?.value) || 0;
        const notes = document.getElementById('quick-notes')?.value?.trim();

        // Validation
        if (!customerId || !roomId || !checkinDate || !checkoutDate || !paymentMethod) {
            showAlert('Please fill all required fields', 'danger');
            return;
        }

        if (totalAmount <= 0) {
            showAlert('Invalid booking amount', 'danger');
            return;
        }

        const customer = customers.find(c => c.id === customerId);
        const room = rooms.find(r => r.id === roomId);

        if (!customer || !room) {
            showAlert('Customer or room not found', 'danger');
            return;
        }

        // Create booking
        const booking = {
            id: nextBookingId++,
            customer_id: customerId,
            room_id: roomId,
            checkin_time: checkinDate,
            checkout_time: checkoutDate,
            guest_count: guestCount,
            total_amount: totalAmount,
            advance_amount: advanceAmount,
            payment_status: advanceAmount >= totalAmount ? 'Paid' : advanceAmount > 0 ? 'Partial' : 'Pending',
            booking_type: bookingType,
            notes: notes || null,
            created_at: new Date().toISOString(),
            created_by: 'Quick Booking'
        };

        bookings.push(booking);

        // Record advance payment if any
        if (advanceAmount > 0) {
            const payment = {
                id: nextPaymentId++,
                booking_id: booking.id,
                amount: advanceAmount,
                payment_type: paymentMethod,
                payment_time: new Date().toISOString(),
                notes: 'Advance payment for quick booking'
            };
            payments.push(payment);
        }

        // Update room status
        room.status = 'Occupied';
        room.current_booking_id = booking.id;
        room.last_booking = new Date().toISOString();

        // Save data
        saveToLocalStorage();

        // Show success message
        const days = Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24));

        showAlert(`✅ Quick Booking Created Successfully!\n\n📋 Booking ID: #${booking.id}\n👤 Customer: ${customer.name}\n🏨 Room: ${room.room_number} (${room.type})\n👥 Guests: ${guestCount}\n📅 Duration: ${days} day${days > 1 ? 's' : ''}\n💰 Total: ₹${totalAmount.toLocaleString()}\n💵 Advance: ₹${advanceAmount.toLocaleString()}\n📊 Status: ${booking.payment_status}\n\n🎉 Room ${room.room_number} is now occupied!`, 'success', 10000);

        // Reset form
        resetQuickBookingForm();

        // Update dashboard and other sections
        updateDashboard();

        // Ask if user wants to view booking details or create another
        setTimeout(() => {
            if (confirm(`Quick booking created successfully!\n\nBooking #${booking.id} for ${customer.name}\n\nWould you like to:\n- Click OK to view all bookings\n- Click Cancel to create another booking`)) {
                showSection('all-bookings');
            }
        }, 2000);

    } catch (error) {
        console.error('❌ Error processing quick booking:', error);
        showAlert(`Error creating booking: ${error.message}`, 'danger');
    }
}

// Reset quick booking form
function resetQuickBookingForm() {
    const form = document.getElementById('quick-booking-form');
    if (form) {
        form.reset();
    }

    // Reset computed fields
    const customerInfo = document.getElementById('customer-info');
    const roomInfo = document.getElementById('room-info');
    const quickSummary = document.getElementById('quick-summary');
    const advanceInfo = document.getElementById('advance-info');

    if (customerInfo) customerInfo.innerHTML = '';
    if (roomInfo) roomInfo.innerHTML = '';
    if (quickSummary) quickSummary.innerHTML = 'Select customer and room to see pricing details';
    if (advanceInfo) advanceInfo.innerHTML = '';

    // Reset default dates
    const checkinField = document.getElementById('quick-checkin');
    const checkoutField = document.getElementById('quick-checkout');

    if (checkinField) {
        checkinField.value = new Date().toISOString().slice(0, 16);
    }

    if (checkoutField) {
        checkoutField.value = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    }
}

// Show available rooms
function showAvailableRooms() {
    const availableRooms = rooms.filter(r => r.status === 'Vacant');

    if (availableRooms.length === 0) {
        showAlert('No rooms available at the moment', 'warning');
        return;
    }

    let roomsList = '🏨 AVAILABLE ROOMS\n\n';

    // Group by type
    const roomsByType = {};
    availableRooms.forEach(room => {
        if (!roomsByType[room.type]) {
            roomsByType[room.type] = [];
        }
        roomsByType[room.type].push(room);
    });

    Object.keys(roomsByType).forEach(type => {
        roomsList += `${type} Rooms:\n`;
        roomsByType[type].sort((a, b) => a.room_number - b.room_number).forEach(room => {
            roomsList += `• Room ${room.room_number} - ₹${room.price.toLocaleString()}/night (${room.capacity || 2} guests)\n`;
        });
        roomsList += '\n';
    });

    roomsList += `Total Available: ${availableRooms.length} rooms`;

    alert(roomsList);
}

console.log('✅ Quick Booking functions loaded successfully!');

// ==================== ALL BOOKINGS WITH GUESTS (FIXED) ====================
function loadAllBookingsWithGuests() {
    const allBookingsDiv = document.getElementById('all-bookings-content') || document.getElementById('booking-history-content');
    if (!allBookingsDiv) return;

    if (bookings.length === 0) {
        allBookingsDiv.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                <h5>No Bookings Found</h5>
                <p class="text-muted">Start by creating your first booking.</p>
                <button class="btn btn-success" onclick="showSection('new-booking')">
                    <i class="fas fa-plus me-1"></i>Create First Booking
                </button>
            </div>
        `;
        return;
    }

    let html = `
        <div class="mb-3">
            <h6>Total Bookings: ${bookings.length}</h6>
        </div>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Room</th>
                        <th>Guests</th>
                        <th>Check-in</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
    `;

    bookings.forEach(booking => {
        const customer = customers.find(c => c.id === booking.customer_id);
        const room = rooms.find(r => r.id === booking.room_id);

        html += `
            <tr>
                <td>#${booking.id}</td>
                <td>${customer ? customer.name : 'Unknown'}</td>
                <td>${room ? room.room_number + ' - ' + room.type : 'N/A'}</td>
                <td><span class="badge bg-info">${booking.guest_count || 1}</span></td>
                <td>${new Date(booking.checkin_time).toLocaleDateString()}</td>
                <td>${formatCurrency(booking.total_amount)}</td>
                <td><span class="badge ${getStatusBadge(booking.payment_status)}">${booking.payment_status}</span></td>
            </tr>
        `;
    });

    html += '</tbody></table></div>';
    allBookingsDiv.innerHTML = html;
    console.log('✅ All bookings loaded');
}


function loadOccupiedRooms() {
    const occupiedRoomsDiv = document.getElementById('occupied-rooms-list');
    if (!occupiedRoomsDiv) return;

    const activeBookings = bookings.filter(b =>
        b.payment_status !== 'Checked Out'
    );

    if (activeBookings.length === 0) {
        occupiedRoomsDiv.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-door-open fa-3x text-muted mb-3"></i>
                <h5>No Occupied Rooms</h5>
                <p class="text-muted">All rooms are currently vacant.</p>
            </div>
        `;
        return;
    }

    let html = '<div class="row g-3">';
    activeBookings.forEach(booking => {
        const customer = customers.find(c => c.id === booking.customer_id);
        const room = rooms.find(r => r.id === booking.room_id);

        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card border-danger">
                    <div class="card-body">
                        <h6>Room ${room ? room.room_number : 'N/A'}</h6>
                        <p class="mb-1"><strong>Guest:</strong> ${customer ? customer.name : 'Unknown'}</p>
                        <p class="mb-1"><strong>Guests:</strong> ${booking.guest_count || 1}</p>
                        <p class="mb-1"><strong>Amount:</strong> ${formatCurrency(booking.total_amount)}</p>
                        <button class="btn btn-sm btn-success" onclick="processCheckout(${booking.id})">
                            <i class="fas fa-sign-out-alt me-1"></i>Checkout
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';

    occupiedRoomsDiv.innerHTML = html;
    console.log('✅ Occupied rooms loaded');
}

function processCheckout(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
        showAlert('Booking not found!', 'danger');
        return;
    }

    const customer = customers.find(c => c.id === booking.customer_id);
    const room = rooms.find(r => r.id === booking.room_id);

    if (confirm(`💳 CHECKOUT CONFIRMATION\n\nCustomer: ${customer ? customer.name : 'Unknown'}\nRoom: ${room ? room.room_number : 'N/A'}\nGuests: ${booking.guest_count || 1}\n\nProceed with checkout?`)) {
        // ✅ FIXED: Record the actual checkout time (THIS IS THE KEY FIX!)
        const checkoutTime = new Date().toISOString();

        booking.payment_status = 'Checked Out';
        booking.actual_checkout_time = checkoutTime; // ✅ This records when checkout actually happened
        booking.updated_at = checkoutTime; // ✅ Also update the general timestamp

        // Update room status to vacant
        if (room) {
            room.status = 'Vacant';
            room.last_checkout = checkoutTime;
        }

        saveToLocalStorage();
        showAlert(`✅ Checkout completed for ${customer ? customer.name : 'Unknown'}\n\n⏰ Checkout Time: ${new Date(checkoutTime).toLocaleString()}`, 'success');
        loadOccupiedRooms();
        updateDashboard(); // ✅ This will now show the correct checkout count

        // ✅ Debug logging
        console.log(`✅ Checkout completed for booking #${booking.id} at ${checkoutTime}`);
    }
}

// ========================================
// COMPLETE FIX - COPY THIS TO YOUR app.js FILE
// Replace your existing loadRecordPayment() function with this
// ========================================

function loadRecordPayment() {
    console.log('🔄 Loading Record Payment section...');

    const paymentSection = document.getElementById('record-payment');
    if (!paymentSection) {
        showAlert('Record Payment section not found', 'danger');
        return;
    }

    // Get active bookings for payment
    const activeBookings = bookings.filter(b => b.payment_status !== 'Checked Out');

    if (activeBookings.length === 0) {
        paymentSection.innerHTML = `
            <div class="container-fluid">
                <div class="card">
                    <div class="card-header bg-warning text-dark">
                        <h4><i class="fas fa-exclamation-triangle me-2"></i>No Active Bookings</h4>
                    </div>
                    <div class="card-body text-center py-5">
                        <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                        <h5>No Bookings Available for Payment</h5>
                        <p class="text-muted">Create a booking first to record payments.</p>
                        <button class="btn btn-success" onclick="showSection('new-booking')">
                            <i class="fas fa-plus me-1"></i>Create New Booking
                        </button>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    paymentSection.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h4><i class="fas fa-credit-card me-2"></i>Record Payment</h4>
                            <p class="mb-0">Record customer payments for bookings</p>
                        </div>
                        <div class="card-body">
                            <form id="payment-form" onsubmit="event.preventDefault(); recordPayment();">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Select Booking *</label>
                                        <select class="form-select" id="payment-booking" onchange="selectBookingForPayment()" required>
                                            <option value="">Choose Booking</option>
                                            ${generateBookingOptionsForPayment()}
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Payment Amount *</label>
                                        <input type="number" class="form-control" id="payment-amount" min="1" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Payment Method *</label>
                                        <select class="form-select" id="payment-type" required>
                                            <option value="">Select Method</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Card">Card</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Online">Online Transfer</option>
                                            <option value="Cheque">Cheque</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Reference ID</label>
                                        <input type="text" class="form-control" id="payment-reference" placeholder="Transaction/Reference ID">
                                    </div>
                                    <div class="col-12 mb-3">
                                        <div class="card bg-light">
                                            <div class="card-body">
                                                <h6>Payment Details</h6>
                                                <div id="payment-details">Select a booking to see payment details</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-success btn-lg">
                                            <i class="fas fa-save me-1"></i>Record Payment
                                        </button>
                                        <button type="reset" class="btn btn-secondary btn-lg ms-2">
                                            <i class="fas fa-undo me-1"></i>Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateBookingOptionsForPayment() {
    const activeBookings = bookings.filter(b => b.payment_status !== 'Checked Out');

    let options = '';
    activeBookings.forEach(booking => {
        const customer = customers.find(c => c.id === booking.customer_id);
        const room = rooms.find(r => r.id === booking.room_id);

        // Calculate pending amount
        const totalAmount = booking.total_amount || 0;
        const paidAmount = payments.filter(p => p.booking_id === booking.id)
            .reduce((sum, payment) => sum + (payment.amount || 0), 0);
        const pendingAmount = totalAmount - paidAmount;

        const customerName = customer ? customer.name : 'Walk-in';
        const roomNumber = room ? room.room_number : 'N/A';

        options += `<option value="${booking.id}">
            Booking #${booking.id} - ${customerName} - Room ${roomNumber} - Pending: ₹${pendingAmount}
        </option>`;
    });

    return options;
}

function selectBookingForPayment() {
    const bookingSelect = document.getElementById('payment-booking');
    const paymentDetails = document.getElementById('payment-details');
    const paymentAmount = document.getElementById('payment-amount');

    const bookingId = parseInt(bookingSelect.value);

    if (!bookingId) {
        paymentDetails.innerHTML = 'Select a booking to see payment details';
        paymentAmount.value = '';
        return;
    }

    const booking = bookings.find(b => b.id === bookingId);
    const customer = customers.find(c => c.id === booking.customer_id);
    const room = rooms.find(r => r.id === booking.room_id);

    // Calculate payment details
    const totalAmount = booking.total_amount || 0;
    const paidAmount = payments.filter(p => p.booking_id === booking.id)
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);
    const pendingAmount = totalAmount - paidAmount;

    paymentDetails.innerHTML = `
        <p><strong>Customer:</strong> ${customer ? customer.name : 'Unknown'}</p>
        <p><strong>Room:</strong> ${room ? room.room_number : 'N/A'}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <p><strong>Paid Amount:</strong> ₹${paidAmount}</p>
        <p><strong>Pending Amount:</strong> <span class="text-danger">₹${pendingAmount}</span></p>
        <p><strong>Status:</strong> <span class="badge bg-${booking.payment_status === 'Paid' ? 'success' : booking.payment_status === 'Partial' ? 'warning' : 'danger'}">${booking.payment_status}</span></p>
    `;

    // Set suggested payment amount
    paymentAmount.value = pendingAmount;
}

function recordPayment() {
    try {
        const bookingId = parseInt(document.getElementById('payment-booking').value);
        const amount = parseFloat(document.getElementById('payment-amount').value);
        const paymentType = document.getElementById('payment-type').value;
        const reference = document.getElementById('payment-reference').value;

        if (!bookingId || !amount || !paymentType) {
            showAlert('Please fill all required fields', 'danger');
            return;
        }

        const booking = bookings.find(b => b.id === bookingId);
        if (!booking) {
            showAlert('Booking not found', 'danger');
            return;
        }

        // Create payment record
        const payment = {
            id: nextPaymentId++,
            booking_id: bookingId,
            amount: amount,
            payment_type: paymentType,
            reference_id: reference || null,
            payment_time: new Date().toISOString()
        };

        payments.push(payment);

        // Update booking payment status
        const totalAmount = booking.total_amount || 0;
        const totalPaid = payments.filter(p => p.booking_id === bookingId)
            .reduce((sum, p) => sum + p.amount, 0);

        if (totalPaid >= totalAmount) {
            booking.payment_status = 'Paid';
        } else if (totalPaid > 0) {
            booking.payment_status = 'Partial';
        }

        saveToLocalStorage();

        const customer = customers.find(c => c.id === booking.customer_id);
        showAlert(`✅ Payment Recorded!\n\nAmount: ₹${amount}\nCustomer: ${customer ? customer.name : 'Unknown'}\nMethod: ${paymentType}\nStatus: ${booking.payment_status}`, 'success');

        // Reset form
        document.getElementById('payment-form').reset();
        document.getElementById('payment-details').innerHTML = 'Select a booking to see payment details';

        updateDashboard();

    } catch (error) {
        console.error('Error recording payment:', error);
        showAlert('Error recording payment: ' + error.message, 'danger');
    }
}

console.log('✅ Payment recording functions loaded!');

function loadPaymentHistory() {
    const paymentHistoryDiv = document.getElementById('payment-history-content');
    if (!paymentHistoryDiv) return;

    if (payments.length === 0) {
        paymentHistoryDiv.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-credit-card fa-3x text-muted mb-3"></i>
                <h5>No Payment Records</h5>
                <p class="text-muted">Payment history will appear here.</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="mb-3">
            <h6>Total Payments: ${payments.length} | Total Amount: ${formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}</h6>
        </div>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>Payment ID</th>
                        <th>Booking</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
    `;

    payments.forEach(payment => {
        html += `
            <tr>
                <td>#${payment.id}</td>
                <td>#${payment.booking_id}</td>
                <td>${formatCurrency(payment.amount)}</td>
                <td><span class="badge bg-info">${payment.payment_type}</span></td>
                <td>${formatDate(payment.payment_time)}</td>
            </tr>
        `;
    });

    html += '</tbody></table></div>';
    paymentHistoryDiv.innerHTML = html;
    console.log('✅ Payment history loaded');
}

function loadRevenueReports() {
    const revenueReportsDiv = document.getElementById('revenue-reports-content');
    if (!revenueReportsDiv) return;

    const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalBookings = bookings.length;
    const totalGuests = bookings.reduce((sum, b) => sum + (b.guest_count || 1), 0);
    const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    revenueReportsDiv.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-3">
                <div class="card bg-success text-white text-center">
                    <div class="card-body">
                        <h4>${formatCurrency(totalRevenue)}</h4>
                        <small>Total Revenue</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-info text-white text-center">
                    <div class="card-body">
                        <h4>${totalBookings}</h4>
                        <small>Total Bookings</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-warning text-white text-center">
                    <div class="card-body">
                        <h4>${totalGuests}</h4>
                        <small>Total Guests</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-primary text-white text-center">
                    <div class="card-body">
                        <h4>${formatCurrency(averageBookingValue)}</h4>
                        <small>Avg Booking</small>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5><i class="fas fa-chart-bar me-2"></i>Additional Statistics</h5>
            </div>
            <div class="card-body">
                <div class="row text-center">
                    <div class="col-md-3">
                        <h5>${bookings.filter(b => b.payment_status === 'Paid').length}</h5>
                        <small class="text-muted">Paid Bookings</small>
                    </div>
                    <div class="col-md-3">
                        <h5>${customers.filter(c => c.customer_type === 'VIP').length}</h5>
                        <small class="text-muted">VIP Customers</small>
                    </div>
                    <div class="col-md-3">
                        <h5>${customers.filter(c => c.whatsapp_marketing).length}</h5>
                        <small class="text-muted">Marketing Enabled</small>
                    </div>
                    <div class="col-md-3">
                        <h5>${rooms.filter(r => r.status === 'Vacant').length}</h5>
                        <small class="text-muted">Available Rooms</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    console.log('✅ Revenue reports loaded');
}

// ========================================
// BOOKING HISTORY SECTION - COMPLETE FIX
// Replace or add this loadBookingHistory() function to your app.js
// ========================================

function loadBookingHistory() {
    console.log('🔄 Loading Booking History...');

    const bookingHistoryDiv = document.getElementById('booking-history-content');
    if (!bookingHistoryDiv) {
        console.error('❌ booking-history-content section not found in HTML');
        showAlert('Booking History section not found in HTML.\n\nPlease check your page structure.', 'danger');
        return;
    }

    try {
        // Check if we have any bookings
        if (bookings.length === 0) {
            bookingHistoryDiv.innerHTML = `
                <div class="container-fluid">
                    <div class="card">
                        <div class="card-header bg-warning text-dark">
                            <h4><i class="fas fa-calendar-times me-2"></i>No Booking History</h4>
                        </div>
                        <div class="card-body text-center py-5">
                            <i class="fas fa-history fa-4x text-muted mb-4 opacity-50"></i>
                            <h5>No Bookings Found</h5>
                            <p class="text-muted mb-4">Booking history will appear here once you start creating bookings.</p>
                            <button class="btn btn-success btn-lg" onclick="showSection('new-booking')">
                                <i class="fas fa-plus me-2"></i>Create First Booking
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Sort bookings by date (newest first)
        const sortedBookings = [...bookings].sort((a, b) =>
            new Date(b.created_at || b.checkin_time) - new Date(a.created_at || a.checkin_time)
        );

        // Calculate statistics
        const totalBookings = bookings.length;
        const completedBookings = bookings.filter(b => b.payment_status === 'Checked Out').length;
        const activeBookings = bookings.filter(b => b.payment_status !== 'Checked Out').length;
        const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0);
        const totalGuests = bookings.reduce((sum, booking) => sum + (booking.guest_count || 1), 0);

        // Group bookings by status for filtering
        const pendingBookings = bookings.filter(b => b.payment_status === 'Pending').length;
        const paidBookings = bookings.filter(b => b.payment_status === 'Paid').length;
        const partialBookings = bookings.filter(b => b.payment_status === 'Partial').length;

        bookingHistoryDiv.innerHTML = `
            <div class="container-fluid">
                <!-- Header with Statistics -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h2><i class="fas fa-history me-2"></i>Booking History</h2>
                                <p class="text-muted mb-0">Complete record of all bookings with guest information</p>
                            </div>
                            <div class="text-end">
                                <button class="btn btn-outline-success" onclick="exportBookingHistory()">
                                    <i class="fas fa-download me-1"></i>Export History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Statistics Cards -->
                <div class="row mb-4">
                    <div class="col-md-2">
                        <div class="card bg-primary bg-opacity-10 border-primary text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${totalBookings}</h4>
                                <small>Total Bookings</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card bg-success bg-opacity-10 border-success text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${completedBookings}</h4>
                                <small>Completed</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card bg-info bg-opacity-10 border-info text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${activeBookings}</h4>
                                <small>Active</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card bg-warning bg-opacity-10 border-warning text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">${totalGuests}</h4>
                                <small>Total Guests</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card bg-success bg-opacity-10 border-success text-center">
                            <div class="card-body py-3">
                                <h4 class="mb-1">₹${totalRevenue.toLocaleString()}</h4>
                                <small>Total Revenue</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Filters -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h6><i class="fas fa-filter me-2"></i>Filter Bookings</h6>
                            </div>
                            <div class="card-body py-3">
                                <div class="row g-3">
                                    <div class="col-md-3">
                                        <select class="form-select" id="status-filter" onchange="filterBookingHistory()">
                                            <option value="">All Statuses</option>
                                            <option value="Pending">Pending (${pendingBookings})</option>
                                            <option value="Partial">Partial (${partialBookings})</option>
                                            <option value="Paid">Paid (${paidBookings})</option>
                                            <option value="Checked Out">Checked Out (${completedBookings})</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-select" id="date-filter" onchange="filterBookingHistory()">
                                            <option value="">All Time</option>
                                            <option value="today">Today</option>
                                            <option value="week">This Week</option>
                                            <option value="month">This Month</option>
                                            <option value="year">This Year</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" id="search-bookings" placeholder="Search customer, room..." onkeyup="filterBookingHistory()">
                                    </div>
                                    <div class="col-md-3">
                                        <button class="btn btn-outline-secondary w-100" onclick="clearBookingFilters()">
                                            <i class="fas fa-times me-1"></i>Clear Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Booking History Table -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h6><i class="fas fa-table me-2"></i>Booking Records (${totalBookings} total)</h6>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0" id="booking-history-table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th width="8%">Booking ID</th>
                                                <th width="15%">Customer</th>
                                                <th width="10%">Room</th>
                                                <th width="8%">Guests</th>
                                                <th width="12%">Check-in</th>
                                                <th width="12%">Check-out</th>
                                                <th width="10%">Amount</th>
                                                <th width="10%">Status</th>
                                                <th width="15%">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="booking-history-tbody">
                                            ${generateBookingHistoryRows(sortedBookings)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h6><i class="fas fa-clock me-2"></i>Recent Booking Activity</h6>
                            </div>
                            <div class="card-body">
                                ${generateRecentActivity()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        console.log('✅ Booking History loaded successfully');

    } catch (error) {
        console.error('❌ Error loading Booking History:', error);
        bookingHistoryDiv.innerHTML = `
            <div class="alert alert-danger">
                <h6><i class="fas fa-exclamation-triangle me-2"></i>Error Loading Booking History</h6>
                <p>Error: ${error.message}</p>
                <button class="btn btn-sm btn-danger" onclick="loadBookingHistory()">Try Again</button>
            </div>
        `;
    }
}

// Generate booking history table rows
// function generateBookingHistoryRows(bookingsToShow) {
//     if (bookingsToShow.length === 0) {
//         return '<tr><td colspan="9" class="text-center py-4">No bookings match the current filters</td></tr>';
//     }

//     let html = '';

//     bookingsToShow.forEach(booking => {
//         const customer = customers.find(c => c.id === booking.customer_id);
//         const room = rooms.find(r => r.id === booking.room_id);

//         const customerName = customer ? customer.name : 'Walk-in Customer';
//         const roomNumber = room ? room.room_number : 'N/A';
//         const roomType = room ? room.type : 'N/A';

//         const checkinDate = booking.checkin_time ? new Date(booking.checkin_time).toLocaleDateString() : 'N/A';
//         const checkoutDate = booking.checkout_time ? new Date(booking.checkout_time).toLocaleDateString() : 'N/A';

//         const statusBadge = getStatusBadge(booking.payment_status || 'Pending');

        

//         // Check if customer is VIP
//         const isVIP = customer && customer.customer_type === 'VIP';
//         const rowClass = isVIP ? 'table-warning' : '';

//         html += `
//             <tr class="${rowClass}" data-booking-id="${booking.id}">
//                 <td>
//                     <strong>#${booking.id}</strong>
//                     ${isVIP ? '<br><small class="text-warning"><i class="fas fa-crown"></i> VIP</small>' : ''}
//                 </td>
//                 <td>
//                     <div>
//                         <strong>${customerName}</strong>
//                         ${customer ? `<br><small class="text-muted">${customer.phone}</small>` : ''}
//                     </div>
//                 </td>
//                 <td>
//                     <strong>${roomNumber}</strong>
//                     <br><small class="text-muted">${roomType}</small>
//                 </td>
//                 <td>
//                     <span class="badge bg-info">${booking.guest_count || 1}</span>
//                 </td>
//                 <td>
//                     <small>${checkinDate}</small>
//                 </td>
//                 <td>
//                     <small>${checkoutDate}</small>
//                 </td>
//                 <td>
//                     <strong>₹${(booking.total_amount || 0).toLocaleString()}</strong>
//                 </td>
//                 <td>
//                     <span class="badge ${statusBadge}">${booking.payment_status || 'Pending'}</span>
//                 </td>
//                 <td>
//                     <div class="btn-group btn-group-sm" role="group">
//                         <button class="btn btn-outline-info" onclick="viewBookingDetails(${booking.id})" title="View Details">
//                             <i class="fas fa-eye"></i>
//                         </button>
//                         ${booking.payment_status !== 'Checked Out' ? `
//                             <button class="btn btn-outline-success" onclick="recordPaymentForBooking(${booking.id})" title="Record Payment">
//                                 <i class="fas fa-credit-card"></i>
//                             </button>
//                         ` : ''}
//                         ${booking.payment_status !== 'Checked Out' ? `
//                             <button class="btn btn-outline-danger" onclick="processCheckout(${booking.id})" title="Checkout">
//                                 <i class="fas fa-sign-out-alt"></i>
//                             </button>
//                         ` : ''}
//                     </div>
//                 </td>
//             </tr>
//         `;
//     });

//     return html;
// }

function generateBookingHistoryRows(bookingsToShow) {
    if (bookingsToShow.length === 0) {
        return '<tr><td colspan="9" class="text-center py-4">No bookings match the current filters</td></tr>';
    }

    let html = '';

    bookingsToShow.forEach(booking => {
        const customer = customers.find(c => c.id === booking.customer_id);
        const room = rooms.find(r => r.id === booking.room_id);

        const customerName = customer ? customer.name : 'Walk-in Customer';
        const roomNumber = room ? room.room_number : 'N/A';
        const roomType = room ? room.type : 'N/A';

        const checkinDate = booking.checkin_time ? new Date(booking.checkin_time).toLocaleDateString() : 'N/A';
        const checkoutDate = booking.checkout_time ? new Date(booking.checkout_time).toLocaleDateString() : 'N/A';

        const statusBadge = getStatusBadge(booking.payment_status || 'Pending');

        // Check if customer is VIP
        const isVIP = customer && customer.customer_type === 'VIP';
        const rowClass = isVIP ? 'table-warning' : '';

        html += `
            <tr class="${rowClass}" data-booking-id="${booking.id}">
                <td>
                    <strong>#${booking.id}</strong>
                    ${isVIP ? '<br><small class="text-warning"><i class="fas fa-crown"></i> VIP</small>' : ''}
                </td>
                <td>
                    <div>
                        <strong>${customerName}</strong>
                        ${customer ? `<br><small class="text-muted">${customer.phone}</small>` : ''}
                    </div>
                </td>
                <td>
                    <strong>${roomNumber}</strong>
                    <br><small class="text-muted">${roomType}</small>
                </td>
                <td>
                    <span class="badge bg-info">${booking.guest_count || 1}</span>
                </td>
                <td>
                    <small>${checkinDate}</small>
                </td>
                <td>
                    <small>${checkoutDate}</small>
                </td>
                <td>
                    <strong>₹${(booking.total_amount || 0).toLocaleString()}</strong>
                </td>
                <td>
                    <span class="badge ${statusBadge}">${booking.payment_status || 'Pending'}</span>
                </td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-info" onclick="viewBookingDetails(${booking.id})" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${booking.payment_status !== 'Checked Out' ? `
                            <button class="btn btn-outline-success" onclick="recordPaymentForBooking(${booking.id})" title="Record Payment">
                                <i class="fas fa-credit-card"></i>
                            </button>
                        ` : ''}
                        ${booking.payment_status !== 'Checked Out' ? `
                            <button class="btn btn-outline-danger" onclick="processCheckout(${booking.id})" title="Checkout">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        ` : ''}
                        <!-- New Print Invoice button -->
                        <button class="btn btn-outline-secondary" onclick="printInvoiceFromHistory(${booking.id})" title="Print Invoice">
                            <i class="fas fa-print"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    return html;
}

function printInvoiceFromHistory(bookingId) {
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return alert("Booking not found!");

  const customer = customers.find(c => c.id === booking.customer_id) || {};
  const room = rooms.find(r => r.id === booking.room_id) || {};

  document.getElementById('invoice-customer-name').textContent = customer.name || "Walk-in Customer";
  document.getElementById('invoice-booking-id').textContent = booking.id;
  document.getElementById('invoice-room-number').textContent = room.room_number || '-';
  document.getElementById('invoice-guests').textContent = booking.guest_count || '-';
  document.getElementById('invoice-checkin').textContent = booking.checkin_time ? new Date(booking.checkin_time).toLocaleDateString() : '-';
  document.getElementById('invoice-checkout').textContent = booking.checkout_time ? new Date(booking.checkout_time).toLocaleDateString() : '-';
  document.getElementById('invoice-total').textContent = booking.total_amount ? booking.total_amount.toLocaleString('en-IN') : '0';
  document.getElementById('invoice-room-type').textContent = room.type || '-';
document.getElementById('invoice-status').textContent = booking.payment_status || 'Pending';
document.getElementById('invoice-date').textContent = new Date(booking.checkin_time).toLocaleDateString();



  const invoiceDiv = document.getElementById('invoice-popup');
  if (!invoiceDiv) return alert('Invoice popup element not found in HTML');

  invoiceDiv.style.display = 'block';

  const originalBodyHtml = document.body.innerHTML;
  document.body.innerHTML = invoiceDiv.outerHTML;

  window.print();

  document.body.innerHTML = originalBodyHtml;
  // Re-initialize any event handlers required after this if needed
}



// Generate recent activity
function generateRecentActivity() {
    const recentBookings = [...bookings]
        .sort((a, b) => new Date(b.created_at || b.checkin_time) - new Date(a.created_at || a.checkin_time))
        .slice(0, 5);

    if (recentBookings.length === 0) {
        return '<p class="text-muted text-center py-3">No recent booking activity</p>';
    }

    let html = '<div class="list-group list-group-flush">';

    recentBookings.forEach(booking => {
        const customer = customers.find(c => c.id === booking.customer_id);
        const room = rooms.find(r => r.id === booking.room_id);
        const timeAgo = getTimeAgo(booking.created_at || booking.checkin_time);

        html += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>Booking #${booking.id}</strong> - ${customer ? customer.name : 'Walk-in'}
                    <br><small class="text-muted">Room ${room ? room.room_number : 'N/A'} • ${booking.guest_count || 1} guests • ${timeAgo}</small>
                </div>
                <span class="badge ${getStatusBadge(booking.payment_status)}">${booking.payment_status || 'Pending'}</span>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// Filter booking history
function filterBookingHistory() {
    const statusFilter = document.getElementById('status-filter')?.value || '';
    const dateFilter = document.getElementById('date-filter')?.value || '';
    const searchTerm = document.getElementById('search-bookings')?.value.toLowerCase() || '';

    let filteredBookings = [...bookings];

    // Filter by status
    if (statusFilter) {
        filteredBookings = filteredBookings.filter(booking => booking.payment_status === statusFilter);
    }

    // Filter by date
    if (dateFilter) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        filteredBookings = filteredBookings.filter(booking => {
            const bookingDate = new Date(booking.created_at || booking.checkin_time);

            switch (dateFilter) {
                case 'today':
                    return bookingDate >= today;
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return bookingDate >= weekAgo;
                case 'month':
                    const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                    return bookingDate >= monthAgo;
                case 'year':
                    const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                    return bookingDate >= yearAgo;
                default:
                    return true;
            }
        });
    }

    // Filter by search term
    if (searchTerm) {
        filteredBookings = filteredBookings.filter(booking => {
            const customer = customers.find(c => c.id === booking.customer_id);
            const room = rooms.find(r => r.id === booking.room_id);

            return (
                booking.id.toString().includes(searchTerm) ||
                (customer && customer.name.toLowerCase().includes(searchTerm)) ||
                (customer && customer.phone.includes(searchTerm)) ||
                (room && room.room_number.toString().includes(searchTerm))
            );
        });
    }

    // Sort filtered results
    filteredBookings.sort((a, b) =>
        new Date(b.created_at || b.checkin_time) - new Date(a.created_at || a.checkin_time)
    );

    // Update table
    const tbody = document.getElementById('booking-history-tbody');
    if (tbody) {
        tbody.innerHTML = generateBookingHistoryRows(filteredBookings);
    }
}

// Clear all filters
function clearBookingFilters() {
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    const searchInput = document.getElementById('search-bookings');

    if (statusFilter) statusFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    if (searchInput) searchInput.value = '';

    filterBookingHistory();
}

// View booking details
function viewBookingDetails(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
        showAlert('Booking not found!', 'danger');
        return;
    }

    const customer = customers.find(c => c.id === booking.customer_id);
    const room = rooms.find(r => r.id === booking.room_id);

    // Calculate payment details
    const totalAmount = booking.total_amount || 0;
    const paidAmount = payments.filter(p => p.booking_id === booking.id)
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);
    const balanceAmount = totalAmount - paidAmount;

    let details = `📋 BOOKING DETAILS - #${booking.id}\n\n`;
    details += `👤 CUSTOMER INFORMATION\n`;
    details += `Name: ${customer ? customer.name : 'Walk-in Customer'}\n`;
    details += `Phone: ${customer ? customer.phone : 'N/A'}\n`;
    details += `Email: ${customer ? customer.email : 'N/A'}\n`;
    details += `Type: ${customer ? customer.customer_type : 'Regular'}\n\n`;

    details += `🏨 ROOM INFORMATION\n`;
    details += `Room: ${room ? room.room_number : 'N/A'}\n`;
    details += `Type: ${room ? room.type : 'N/A'}\n`;
    details += `Rate: ₹${room ? room.price.toLocaleString() : 'N/A'}/night\n\n`;

    details += `📅 BOOKING INFORMATION\n`;
    details += `Check-in: ${booking.checkin_time ? new Date(booking.checkin_time).toLocaleString() : 'N/A'}\n`;
    details += `Check-out: ${booking.checkout_time ? new Date(booking.checkout_time).toLocaleString() : 'N/A'}\n`;
    details += `Guests: ${booking.guest_count || 1}\n`;
    details += `Status: ${booking.payment_status || 'Pending'}\n\n`;

    details += `💰 PAYMENT INFORMATION\n`;
    details += `Total Amount: ₹${totalAmount.toLocaleString()}\n`;
    details += `Paid Amount: ₹${paidAmount.toLocaleString()}\n`;
    details += `Balance: ₹${balanceAmount.toLocaleString()}\n\n`;

    details += `📊 SYSTEM INFORMATION\n`;
    details += `Created: ${booking.created_at ? new Date(booking.created_at).toLocaleString() : 'N/A'}\n`;
    details += `Booking ID: ${booking.id}`;

    alert(details);
}

// Record payment for specific booking
function recordPaymentForBooking(bookingId) {
    showSection('record-payment');

    // Pre-select the booking in the payment form
    setTimeout(() => {
        const bookingSelect = document.getElementById('payment-booking');
        if (bookingSelect) {
            bookingSelect.value = bookingId;
            if (typeof selectBookingForPayment === 'function') {
                selectBookingForPayment();
            }
        }
    }, 500);
}

// Export booking history
function exportBookingHistory() {
    try {
        let csvContent = "Booking ID,Customer Name,Phone,Room Number,Room Type,Guests,Check-in,Check-out,Amount,Status,Created Date\n";

        bookings.forEach(booking => {
            const customer = customers.find(c => c.id === booking.customer_id);
            const room = rooms.find(r => r.id === booking.room_id);

            const row = [
                booking.id,
                customer ? customer.name : 'Walk-in Customer',
                customer ? customer.phone : 'N/A',
                room ? room.room_number : 'N/A',
                room ? room.type : 'N/A',
                booking.guest_count || 1,
                booking.checkin_time ? new Date(booking.checkin_time).toLocaleDateString() : 'N/A',
                booking.checkout_time ? new Date(booking.checkout_time).toLocaleDateString() : 'N/A',
                booking.total_amount || 0,
                booking.payment_status || 'Pending',
                booking.created_at ? new Date(booking.created_at).toLocaleDateString() : 'N/A'
            ].map(field => `"${field}"`).join(',');

            csvContent += row + "\n";
        });

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `booking_history_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showAlert('✅ Booking history exported successfully!', 'success');

    } catch (error) {
        console.error('Error exporting booking history:', error);
        showAlert('Error exporting booking history', 'danger');
    }
}

// Helper function to get time ago
function getTimeAgo(dateString) {
    if (!dateString) return 'N/A';

    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

console.log('✅ Booking History functions loaded successfully!');

// ==================== WHATSAPP MARKETING SYSTEM (FIXED) ====================
// function loadWhatsAppMarketing() {
//     const whatsappDiv = document.getElementById('whatsapp-marketing-content');

//     if (!whatsappDiv) {
//         console.error('whatsapp-marketing section not found in HTML');
//         return;
//     }

//     const marketingCustomers = customers.filter(c => c.whatsapp_marketing);
//     const birthdayCustomers = getTodayBirthdayCustomers();
//     const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);

//     whatsappDiv.innerHTML = `
//         <div class="container-fluid">
//             <!-- Marketing Dashboard -->
//             <div class="row mb-4">
//                 <div class="col-md-3">
//                     <div class="card bg-success text-white">
//                         <div class="card-body text-center">
//                             <h3>${marketingCustomers.length}</h3>
//                             <small>Marketing Enabled</small>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-3">
//                     <div class="card bg-info text-white">
//                         <div class="card-body text-center">
//                             <h3>${birthdayCustomers.length}</h3>
//                             <small>Today's Birthdays</small>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-3">
//                     <div class="card bg-warning text-dark">
//                         <div class="card-body text-center">
//                             <h3>${vipCustomers.length}</h3>
//                             <small>VIP Customers</small>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-3">
//                     <div class="card bg-primary text-white">
//                         <div class="card-body text-center">
//                             <h3>${customers.length}</h3>
//                             <small>Total Customers</small>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <!-- Quick Actions -->
//             <div class="row mb-4">
//                 <div class="col-12">
//                     <div class="card">
//                         <div class="card-header bg-primary text-white">
//                             <h5><i class="fab fa-whatsapp me-2"></i>WhatsApp Marketing - Quick Actions</h5>
//                         </div>
//                         <div class="card-body">
//                             <div class="row g-3">
//                                 <div class="col-md-4">
//                                     <button class="btn btn-success w-100 btn-lg marketing-btn" onclick="sendDiscountOffer()">
//                                         <i class="fas fa-percentage fa-2x mb-2"></i><br>
//                                         Send Discount Offers<br>
//                                         <small>All Marketing Customers (${marketingCustomers.length})</small>
//                                     </button>
//                                 </div>
//                                 <div class="col-md-4">
//                                     <button class="btn btn-info w-100 btn-lg marketing-btn" onclick="sendBirthdayWishes()" 
//                                             ${birthdayCustomers.length === 0 ? 'disabled' : ''}>
//                                         <i class="fas fa-birthday-cake fa-2x mb-2"></i><br>
//                                         Birthday Wishes<br>
//                                         <small>Today's Birthdays (${birthdayCustomers.length})</small>
//                                     </button>
//                                 </div>
//                                 <div class="col-md-4">
//                                     <button class="btn btn-warning w-100 btn-lg marketing-btn" onclick="sendVIPOffers()">
//                                         <i class="fas fa-crown fa-2x mb-2"></i><br>
//                                         VIP Special Offers<br>
//                                         <small>VIP Customers (${vipCustomers.length})</small>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <!-- Marketing Analytics -->
//             <div class="row">
//                 <div class="col-12">
//                     <div class="card">
//                         <div class="card-header">
//                             <h5><i class="fas fa-chart-line me-2"></i>Marketing Analytics</h5>
//                         </div>
//                         <div class="card-body">
//                             <div class="table-responsive">
//                                 <table class="table table-striped">
//                                     <thead class="table-dark">
//                                         <tr>
//                                             <th>Customer Type</th>
//                                             <th>Total Customers</th>
//                                             <th>Marketing Enabled</th>
//                                             <th>Birthday Offers</th>
//                                             <th>Conversion Rate</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         ${generateMarketingAnalytics()}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//         <style>
//         .marketing-btn {
//             padding: 1.5rem;
//             height: auto;
//             min-height: 140px;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             text-align: center;
//         }
//         .marketing-btn:disabled {
//             opacity: 0.5;
//             cursor: not-allowed;
//         }
//         </style>
//     `;
// whatsappDiv.innerHTML = `...full inner HTML without outer container div...`;
//     console.log('✅ WhatsApp Marketing loaded');
// }

function loadWhatsAppMarketing() {
    const whatsappDiv = document.getElementById('whatsapp-marketing-content');
    if (!whatsappDiv) {
        console.error('whatsapp-marketing-content section not found in HTML');
        return;
    }

    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);
    const birthdayCustomers = getTodayBirthdayCustomers();
    const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);

    whatsappDiv.innerHTML = `
        <div class="container-fluid">
            <!-- Marketing Dashboard -->
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="card bg-success text-white">
                        <div class="card-body text-center">
                            <h3>${marketingCustomers.length}</h3>
                            <small>Marketing Enabled</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-info text-white">
                        <div class="card-body text-center">
                            <h3>${birthdayCustomers.length}</h3>
                            <small>Today's Birthdays</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-warning text-dark">
                        <div class="card-body text-center">
                            <h3>${vipCustomers.length}</h3>
                            <small>VIP Customers</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-primary text-white">
                        <div class="card-body text-center">
                            <h3>${customers.length}</h3>
                            <small>Total Customers</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h5><i class="fab fa-whatsapp me-2"></i>WhatsApp Marketing - Quick Actions</h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <button class="btn btn-success w-100 btn-lg marketing-btn" onclick="sendDiscountOffer()">
                                        <i class="fas fa-percentage fa-2x mb-2"></i><br>
                                        Send Discount Offers<br>
                                        <small>All Marketing Customers (${marketingCustomers.length})</small>
                                    </button>
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-info w-100 btn-lg marketing-btn" onclick="sendBirthdayWishes()" 
                                        ${birthdayCustomers.length === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-birthday-cake fa-2x mb-2"></i><br>
                                        Birthday Wishes<br>
                                        <small>Today's Birthdays (${birthdayCustomers.length})</small>
                                    </button>
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-warning w-100 btn-lg marketing-btn" onclick="sendVIPOffers()">
                                        <i class="fas fa-crown fa-2x mb-2"></i><br>
                                        VIP Special Offers<br>
                                        <small>VIP Customers (${vipCustomers.length})</small>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Marketing Analytics -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5><i class="fas fa-chart-line me-2"></i>Marketing Analytics</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Customer Type</th>
                                            <th>Total Customers</th>
                                            <th>Marketing Enabled</th>
                                            <th>Birthday Offers</th>
                                            <th>Conversion Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${generateMarketingAnalytics()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
        .marketing-btn {
            padding: 1.5rem;
            height: auto;
            min-height: 140px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .marketing-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        </style>
    `;

    console.log('✅ WhatsApp Marketing loaded');
}


function getTodayBirthdayCustomers() {
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // getMonth() is 0-indexed
    const todayDate = today.getDate();

    return customers.filter(customer => {
        if (!customer.dob || !customer.birthday_offers) return false;

        try {
            const dob = new Date(customer.dob);
            const birthMonth = dob.getMonth() + 1;
            const birthDate = dob.getDate();

            return birthMonth === todayMonth && birthDate === todayDate;
        } catch {
            return false;
        }
    });
}

function generateMarketingAnalytics() {
    const customerTypes = ['Regular', 'VIP', 'Corporate', 'Group', 'Wedding'];
    let html = '';

    customerTypes.forEach(type => {
        const totalCount = customers.filter(c => c.customer_type === type).length;
        const marketingCount = customers.filter(c => c.customer_type === type && c.whatsapp_marketing).length;
        const birthdayCount = customers.filter(c => c.customer_type === type && c.birthday_offers).length;
        const conversionRate = totalCount > 0 ? Math.round((marketingCount / totalCount) * 100) : 0;

        if (totalCount > 0) {
            html += `
                <tr>
                    <td><span class="badge bg-${type === 'VIP' ? 'warning text-dark' : 'primary'}">${type}</span></td>
                    <td>${totalCount}</td>
                    <td>${marketingCount} <small class="text-muted">(${conversionRate}%)</small></td>
                    <td>${birthdayCount}</td>
                    <td>
                        <div class="progress" style="height: 20px;">
                            <div class="progress-bar" role="progressbar" style="width: ${conversionRate}%">
                                ${conversionRate}%
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        }
    });

    return html || '<tr><td colspan="5" class="text-center">No customer data available</td></tr>';
}

function sendDiscountOffer() {
    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);

    if (marketingCustomers.length === 0) {
        showAlert('No customers have WhatsApp marketing enabled', 'warning');
        return;
    }

    const message = `🎉 Special Discount Offer from Crown Inn Hotel! 🎉

Hello {name}!

We have an exclusive offer just for you:
✨ 25% OFF on your next booking
✨ Valid for the next 30 days
✨ Applicable on all room types

Book now and enjoy luxury at the best price!

Contact us: +91 XXXXX XXXXX
Visit: Crown Inn Hotel

*Terms and conditions apply`;

    sendBulkWhatsAppMessages(marketingCustomers, message, 'Discount Offer');
}

function sendBirthdayWishes() {
    const birthdayCustomers = getTodayBirthdayCustomers();

    if (birthdayCustomers.length === 0) {
        showAlert('No customer birthdays today', 'info');
        return;
    }

    const message = `🎂 Happy Birthday {name}! 🎂

Warmest birthday wishes from all of us at Crown Inn Hotel!

🎁 Special Birthday Offer:
✨ 30% OFF on your birthday month booking
✨ Complimentary birthday cake
✨ Late checkout facility

Make your birthday celebration memorable with us!

Contact: +91 XXXXX XXXXX
Crown Inn Hotel - Where memories are made!`;

    sendBulkWhatsAppMessages(birthdayCustomers, message, 'Birthday Wishes');
}

function sendVIPOffers() {
    const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);

    if (vipCustomers.length === 0) {
        showAlert('No VIP customers with marketing enabled', 'warning');
        return;
    }

    const message = `👑 Exclusive VIP Offer - Crown Inn Hotel

Dear {name},

As our valued VIP customer, we have a special offer for you:

🌟 VIP Exclusive Benefits:
✨ 35% OFF on all bookings
✨ Complimentary room upgrade
✨ Priority check-in/check-out
✨ Complimentary breakfast
✨ Free WiFi & parking

Your loyalty deserves the best!

VIP Hotline: +91 XXXXX XXXXX
Crown Inn Hotel - VIP Experience`;

    sendBulkWhatsAppMessages(vipCustomers, message, 'VIP Special Offers');
}

function sendBulkWhatsAppMessages(customerList, messageTemplate, campaignType) {
    if (customerList.length === 0) {
        showAlert('No customers to send messages to', 'warning');
        return;
    }

    let successCount = 0;

    // Show progress
    showAlert(`📱 Sending ${campaignType} to ${customerList.length} customers...\n\nThis will open WhatsApp for each customer.`, 'info', 3000);

    customerList.forEach((customer, index) => {
        setTimeout(() => {
            try {
                const personalizedMessage = messageTemplate
                    .replace(/{name}/g, customer.name)
                    .replace(/{hotel}/g, 'Crown Inn Hotel');

                const whatsappNumber = customer.whatsapp || customer.phone;
                const cleanNumber = whatsappNumber.replace(/\D/g, ''); // Remove non-digits

                // Create WhatsApp URL
                const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(personalizedMessage)}`;

                // Open WhatsApp in new tab
                window.open(whatsappURL, '_blank');

                successCount++;

                // Show progress for last customer
                if (index === customerList.length - 1) {
                    setTimeout(() => {
                        showAlert(`✅ ${campaignType} Campaign Completed!\n\n📱 Opened WhatsApp for ${successCount} customers\n\nPlease send the messages manually from WhatsApp Web/App.`, 'success', 8000);
                    }, 2000);
                }

            } catch (error) {
                console.error(`Error sending to ${customer.name}:`, error);
            }
        }, index * 1000); // 1 second delay between each message
    });
}

function sendWhatsAppMessage(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
        showAlert('Customer not found!', 'danger');
        return;
    }

    if (!customer.whatsapp_marketing) {
        if (!confirm(`${customer.name} has not enabled WhatsApp marketing.\n\nDo you still want to send a message?`)) {
            return;
        }
    }

    const message = prompt(`Send WhatsApp message to ${customer.name}:\n\nEnter your message:`,
        `Hello ${customer.name},\n\nGreetings from Crown Inn Hotel!\n\nWe have exciting offers for you. Contact us for more details.\n\nBest regards,\nCrown Inn Hotel Team`);

    if (message) {
        const whatsappNumber = customer.whatsapp || customer.phone;
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, '_blank');
        showAlert(`✅ WhatsApp opened for ${customer.name}\n\nPlease send the message manually.`, 'success');
    }
}

// ===========================================
// ADD THIS TO THE END OF YOUR EXISTING app.js FILE
// WHATSAPP MARKETING - COMPLETE IMPLEMENTATION
// ===========================================

// Replace the existing loadWhatsAppMarketing function with this one
// ========================================
// 🎯 COMPLETE WHATSAPP MARKETING SYSTEM FOR CROWN INN HOTEL
// Replace your existing loadWhatsAppMarketing() function and add these functions
// Features: Auto Birthday Detection, Bulk Messaging, Custom Campaigns
// ========================================

// ✅ MAIN WHATSAPP MARKETING FUNCTION - Replace your existing one
function loadWhatsAppMarketing() {
    console.log('🔄 Loading Advanced WhatsApp Marketing...');

    const whatsappDiv = document.getElementById('whatsapp-marketing');
    if (!whatsappDiv) {
        console.error('❌ whatsapp-marketing section not found in HTML');
        showAlert('WhatsApp Marketing section not found in HTML.\n\nPlease ensure you have a div with id="whatsapp-marketing" in your index.html file.', 'danger');
        return;
    }

    try {
        // Get marketing statistics
        const marketingCustomers = customers.filter(c => c.whatsapp_marketing);
        const birthdayCustomers = getTodayBirthdayCustomers();
        const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);
        const corporateCustomers = customers.filter(c => c.customer_type === 'Corporate' && c.whatsapp_marketing);

        // Check for unsent birthday wishes
        const pendingBirthdayWishes = birthdayCustomers.filter(customer =>
            !customer.birthday_wish_sent_today ||
            customer.birthday_wish_sent_today !== new Date().toDateString()
        );

        whatsappDiv.innerHTML = `
            <div class="container-fluid">
                <!-- Header Section -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h2 class="text-success">
                                    <i class="fab fa-whatsapp me-2"></i>
                                    Advanced WhatsApp Marketing
                                </h2>
                                <p class="text-muted mb-0">Automated birthday wishes, bulk campaigns, and personalized messaging system</p>
                            </div>
                            <div>
                                <button class="btn btn-outline-info" onclick="showMarketingStats()" title="View Detailed Statistics">
                                    <i class="fas fa-chart-bar me-1"></i>Statistics
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${pendingBirthdayWishes.length > 0 ? `
                <!-- 🎂 BIRTHDAY ALERT (Shows when customers have birthdays today) -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="alert alert-warning border-warning shadow-sm">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="alert-heading mb-2">
                                        <i class="fas fa-birthday-cake me-2"></i>🎉 Birthday Alert!
                                    </h5>
                                    <p class="mb-2">
                                        <strong>${pendingBirthdayWishes.length} customer${pendingBirthdayWishes.length > 1 ? 's have' : ' has'} birthday today!</strong>
                                        ${pendingBirthdayWishes.map(c => c.name).slice(0, 3).join(', ')}${pendingBirthdayWishes.length > 3 ? ` and ${pendingBirthdayWishes.length - 3} more` : ''}
                                    </p>
                                    <small class="text-muted">Send personalized birthday wishes with special discount offers automatically</small>
                                </div>
                                <div>
                                    <button class="btn btn-warning btn-lg" onclick="autoSendBirthdayWishes()">
                                        <i class="fas fa-magic me-2"></i>Auto Send Birthday Wishes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <!-- Statistics Dashboard -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card ${birthdayCustomers.length > 0 ? 'bg-warning text-dark' : 'bg-info text-white'}">
                            <div class="card-body text-center py-3">
                                <h3 class="mb-1">${birthdayCustomers.length}</h3>
                                <small>Today's Birthdays</small>
                                ${pendingBirthdayWishes.length > 0 ? '<br><span class="badge bg-danger mt-1">Action Required!</span>' : ''}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-success text-white">
                            <div class="card-body text-center py-3">
                                <h3 class="mb-1">${marketingCustomers.length}</h3>
                                <small>Marketing Enabled</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-primary text-white">
                            <div class="card-body text-center py-3">
                                <h3 class="mb-1">${vipCustomers.length}</h3>
                                <small>VIP Customers</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-dark text-white">
                            <div class="card-body text-center py-3">
                                <h3 class="mb-1">${customers.length}</h3>
                                <small>Total Customers</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Main Marketing Actions -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-success text-white">
                                <h5><i class="fas fa-bullhorn me-2"></i>Marketing Campaign Center</h5>
                                <p class="mb-0">Send targeted messages to your customer database</p>
                            </div>
                            <div class="card-body">
                                <div class="row g-4">
                                    <!-- Birthday Campaign -->
                                    <div class="col-lg-4">
                                        <div class="card border-warning h-100">
                                            <div class="card-header bg-warning text-dark text-center">
                                                <h6><i class="fas fa-birthday-cake me-2"></i>🎂 Birthday Campaign</h6>
                                            </div>
                                            <div class="card-body text-center">
                                                <h4 class="text-warning mb-3">${birthdayCustomers.length}</h4>
                                                <p class="mb-3">Customers with birthday today</p>
                                                <div class="d-grid gap-2">
                                                    <button class="btn btn-warning" onclick="autoSendBirthdayWishes()" 
                                                            ${birthdayCustomers.length === 0 ? 'disabled' : ''}>
                                                        <i class="fas fa-gift me-1"></i>Send Birthday Wishes
                                                    </button>
                                                </div>
                                                <small class="text-muted mt-2 d-block">Personalized with 30% birthday discount</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Bulk Custom Message -->
                                    <div class="col-lg-4">
                                        <div class="card border-primary h-100">
                                            <div class="card-header bg-primary text-white text-center">
                                                <h6><i class="fas fa-edit me-2"></i>📝 Custom Bulk Message</h6>
                                            </div>
                                            <div class="card-body text-center">
                                                <h4 class="text-primary mb-3">${marketingCustomers.length}</h4>
                                                <p class="mb-3">Marketing customers ready</p>
                                                <div class="d-grid gap-2">
                                                    <button class="btn btn-primary" onclick="sendBulkCustomMessage()"
                                                            ${marketingCustomers.length === 0 ? 'disabled' : ''}>
                                                        <i class="fas fa-paper-plane me-1"></i>Write & Send Message
                                                    </button>
                                                </div>
                                                <small class="text-muted mt-2 d-block">Write your own custom message</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Quick Campaign Templates -->
                                    <div class="col-lg-4">
                                        <div class="card border-success h-100">
                                            <div class="card-header bg-success text-white text-center">
                                                <h6><i class="fas fa-flash me-2"></i>⚡ Quick Campaigns</h6>
                                            </div>
                                            <div class="card-body text-center">
                                                <h4 class="text-success mb-3">${marketingCustomers.length}</h4>
                                                <p class="mb-3">Ready for campaigns</p>
                                                <div class="d-grid gap-2">
                                                    <button class="btn btn-outline-success btn-sm" onclick="sendFestivalOffer('diwali')">
                                                        🪔 Diwali Special (40% OFF)
                                                    </button>
                                                    <button class="btn btn-outline-success btn-sm" onclick="sendWeekendOffer()">
                                                        🌟 Weekend Special (35% OFF)
                                                    </button>
                                                    <button class="btn btn-outline-success btn-sm" onclick="sendFlashSale()">
                                                        ⚡ Flash Sale (50% OFF)
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- VIP & Segment Marketing -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card border-warning">
                            <div class="card-header bg-warning text-dark">
                                <h6><i class="fas fa-crown me-2"></i>👑 VIP Customer Marketing</h6>
                            </div>
                            <div class="card-body">
                                <p class="mb-3"><strong>${vipCustomers.length} VIP Customers</strong> with marketing enabled</p>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-warning" onclick="sendVIPOffers()"
                                            ${vipCustomers.length === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-star me-1"></i>VIP Exclusive Offers (35% OFF)
                                    </button>
                                    <button class="btn btn-outline-warning" onclick="sendVIPNewsletter()"
                                            ${vipCustomers.length === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-newspaper me-1"></i>VIP Monthly Newsletter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card border-info">
                            <div class="card-header bg-info text-white">
                                <h6><i class="fas fa-building me-2"></i>🏢 Corporate Marketing</h6>
                            </div>
                            <div class="card-body">
                                <p class="mb-3"><strong>${corporateCustomers.length} Corporate Customers</strong> with marketing enabled</p>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-info" onclick="sendCorporateOffers()"
                                            ${corporateCustomers.length === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-handshake me-1"></i>Corporate Packages
                                    </button>
                                    <button class="btn btn-outline-info" onclick="sendMeetingRoomOffers()"
                                            ${corporateCustomers.length === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-users me-1"></i>Meeting Room Offers
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Customer List Preview -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h6><i class="fas fa-users me-2"></i>Marketing Customer Overview</h6>
                                    <button class="btn btn-sm btn-outline-primary" onclick="showSection('customer-list')">
                                        <i class="fas fa-eye me-1"></i>View All Customers
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                ${marketingCustomers.length > 0 ?
                generateMarketingCustomersList(marketingCustomers.slice(0, 8)) :
                `<div class="text-center py-4">
                                        <i class="fas fa-users fa-3x text-muted mb-3 opacity-50"></i>
                                        <h6>No Marketing Customers</h6>
                                        <p class="text-muted mb-3">No customers have enabled WhatsApp marketing yet.</p>
                                        <button class="btn btn-success" onclick="showSection('add-customer')">
                                            <i class="fas fa-plus me-1"></i>Add Customer with Marketing
                                        </button>
                                    </div>`
            }
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Help -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="alert alert-info">
                            <div class="d-flex">
                                <i class="fas fa-info-circle me-3 mt-1"></i>
                                <div>
                                    <h6>How WhatsApp Marketing Works:</h6>
                                    <ul class="mb-2">
                                        <li><strong>Auto Birthday Detection:</strong> System automatically finds customers with birthdays today</li>
                                        <li><strong>Bulk Messaging:</strong> Write custom messages and send to all marketing customers</li>
                                        <li><strong>Template Campaigns:</strong> Pre-built campaigns for festivals, weekends, and special offers</li>
                                        <li><strong>Privacy Compliant:</strong> WhatsApp opens for each customer - you send messages manually</li>
                                    </ul>
                                    <small><strong>Note:</strong> Only customers who have enabled "WhatsApp Marketing" in their profile will receive messages.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Auto-check for birthdays on page load
        if (pendingBirthdayWishes.length > 0) {
            setTimeout(() => {
                if (confirm(`🎉 BIRTHDAY ALERT!\n\n${pendingBirthdayWishes.length} customer${pendingBirthdayWishes.length > 1 ? 's have' : ' has'} birthday today:\n\n${pendingBirthdayWishes.map(c => `🎂 ${c.name} - ${c.phone}`).join('\n')}\n\nWould you like to automatically send birthday wishes with special offers?\n\nClick OK to send automatically, or Cancel to send manually later.`)) {
                    autoSendBirthdayWishes();
                }
            }, 2000);
        }

        console.log('✅ Advanced WhatsApp Marketing loaded successfully');

    } catch (error) {
        console.error('❌ Error loading WhatsApp Marketing:', error);
        whatsappDiv.innerHTML = `
            <div class="alert alert-danger">
                <h6><i class="fas fa-exclamation-triangle me-2"></i>Error Loading WhatsApp Marketing</h6>
                <p>Error: ${error.message}</p>
                <button class="btn btn-sm btn-danger" onclick="loadWhatsAppMarketing()">Try Again</button>
            </div>
        `;
    }
}

// ✅ AUTO BIRTHDAY DETECTION SYSTEM
function getTodayBirthdayCustomers() {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();

    return customers.filter(customer => {
        if (!customer.dob || !customer.whatsapp_marketing) return false;

        try {
            const dob = new Date(customer.dob);
            const birthMonth = dob.getMonth() + 1;
            const birthDate = dob.getDate();

            return birthMonth === todayMonth && birthDate === todayDate;
        } catch (error) {
            return false;
        }
    });
}

// ✅ AUTO SEND BIRTHDAY WISHES
function autoSendBirthdayWishes() {
    const birthdayCustomers = getTodayBirthdayCustomers();

    if (birthdayCustomers.length === 0) {
        showAlert('🎂 No customer birthdays today!\n\nThe system will automatically detect birthdays when customers are added with birth dates.', 'info');
        return;
    }

    // Filter customers who haven't received wishes today
    const pendingCustomers = birthdayCustomers.filter(customer =>
        !customer.birthday_wish_sent_today ||
        customer.birthday_wish_sent_today !== new Date().toDateString()
    );

    if (pendingCustomers.length === 0) {
        showAlert('✅ Birthday wishes already sent to all customers today!\n\n🎉 All birthday customers have been contacted.', 'success');
        return;
    }

    const birthdayMessage = `🎂✨ HAPPY BIRTHDAY {name}! ✨🎂

🎉 Warmest birthday wishes from Crown Inn Hotel family!

🎁 EXCLUSIVE BIRTHDAY PACKAGE FOR YOU:
🏨 🔥 30% OFF on your birthday month booking
🍰 FREE birthday cake delivered to your room
⏰ Late checkout until 3 PM (FREE)
🍽️ Complimentary birthday dinner for 2
🎈 FREE room decoration with balloons & flowers
🥂 Welcome drinks on arrival
🎊 FREE upgrade to next room category (subject to availability)

✨ Make your special day EXTRA special with us!

🗓️ Valid throughout your birthday month!
📞 Book now: +91 9876543210
💎 Quote code: BIRTHDAY30

🏨 Crown Inn Hotel - Where celebrations become unforgettable memories!

Thank you for being our treasured guest! 🙏❤️

#BirthdaySpecial #30PercentOFF #CrownInnHotel`;

    if (confirm(`🎂🎉 AUTO BIRTHDAY WISHES SYSTEM\n\n✨ FOUND ${pendingCustomers.length} BIRTHDAY CUSTOMER${pendingCustomers.length > 1 ? 'S' : ''} TODAY!\n\n👑 Birthday Customers:\n${pendingCustomers.map(c => `🎉 ${c.name} - ${c.phone}`).join('\n')}\n\n🎁 BIRTHDAY PACKAGE INCLUDES:\n• 30% OFF discount\n• FREE birthday cake\n• FREE room decoration\n• Complimentary dinner\n• Late checkout\n• Room upgrade (subject to availability)\n\n📱 This will open WhatsApp for each customer\n⚡ Click OK to start AUTO sending!`)) {

        showAlert(`🚀 STARTING AUTO BIRTHDAY CAMPAIGN...\n\n🎂 Sending personalized wishes to ${pendingCustomers.length} customers\n⏳ Please wait while WhatsApp opens for each customer...\n\n⚠️ Important: You'll need to manually SEND each message in WhatsApp for privacy compliance.`, 'info', 6000);

        sendBulkMessagesToCustomers(pendingCustomers, birthdayMessage, '🎂 Birthday Wishes Campaign', () => {
            // Mark customers as having received birthday wishes today
            pendingCustomers.forEach(customer => {
                customer.birthday_wish_sent_today = new Date().toDateString();
                customer.last_birthday_wish = new Date().toISOString();

                // Add to marketing history
                if (!customer.marketing_history) {
                    customer.marketing_history = [];
                }
                customer.marketing_history.push({
                    type: 'Birthday Wishes',
                    date: new Date().toISOString(),
                    discount: '30%',
                    status: 'Sent'
                });
            });

            saveToLocalStorage();

            // Reload the marketing page to update the interface
            setTimeout(() => {
                loadWhatsAppMarketing();
            }, 3000);
        });
    }
}

// ✅ BULK CUSTOM MESSAGE SYSTEM
function sendBulkCustomMessage() {
    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);

    if (marketingCustomers.length === 0) {
        showAlert('❌ NO CUSTOMERS FOUND\n\nNo customers have WhatsApp marketing enabled.\nPlease add customers first or enable marketing for existing customers.', 'warning');
        return;
    }

    // Get custom message from user
    const customMessage = prompt(`📱 BULK WHATSAPP MESSAGE SYSTEM\n\n👥 Target Customers: ${marketingCustomers.length}\n\n✏️ Write your custom message below:\n(Use {name} for customer name, {hotel} for hotel name)\n\nExample:\n"🏨 Special offer for {name}! Get 25% OFF at {hotel}. Book now!"\n\n📝 Enter your message:`);

    if (!customMessage) {
        showAlert('❌ No message entered. Campaign cancelled.', 'info');
        return;
    }

    if (customMessage.length < 10) {
        showAlert('❌ Message too short. Please write a proper message (at least 10 characters).', 'warning');
        return;
    }

    // Show campaign preview
    const previewMessage = customMessage
        .replace(/{name}/g, 'CUSTOMER_NAME')
        .replace(/{hotel}/g, 'Crown Inn Hotel');

    if (!confirm(`📱 BULK CAMPAIGN PREVIEW\n\n👥 Target: ${marketingCustomers.length} customers\n📝 Your message preview:\n\n"${previewMessage}"\n\n✅ This looks good?\n❌ Click Cancel to edit message\n\n📲 Click OK to start sending!`)) {
        // Let them try again
        return sendBulkCustomMessage();
    }

    // Start sending
    showAlert(`🚀 STARTING BULK CAMPAIGN...\n\n📱 Sending to ${marketingCustomers.length} customers\n⏳ WhatsApp will open for each customer\n⚠️ You need to manually SEND each message`, 'info', 5000);

    sendBulkMessagesToCustomers(marketingCustomers, customMessage, '📝 Custom Bulk Campaign');
}

// ✅ ENHANCED BULK MESSAGE SENDER ENGINE
function sendBulkMessagesToCustomers(customerList, messageTemplate, campaignType, callback) {
    if (customerList.length === 0) {
        showAlert('❌ No customers to send messages to', 'warning');
        return;
    }

    console.log(`📱 Starting ${campaignType} for ${customerList.length} customers`);

    let successCount = 0;
    let errorCount = 0;
    const startTime = new Date();

    customerList.forEach((customer, index) => {
        setTimeout(() => {
            try {
                // Personalize message
                const personalizedMessage = messageTemplate
                    .replace(/{name}/g, customer.name)
                    .replace(/{hotel}/g, 'Crown Inn Hotel')
                    .replace(/{phone}/g, customer.phone)
                    .replace(/{email}/g, customer.email);

                // Get WhatsApp number
                const whatsappNumber = customer.whatsapp || customer.phone;
                const cleanNumber = whatsappNumber.replace(/\D/g, '');

                if (cleanNumber.length < 10) {
                    console.error(`❌ Invalid phone number for ${customer.name}: ${whatsappNumber}`);
                    errorCount++;
                    return;
                }

                // Create WhatsApp URL
                const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(personalizedMessage)}`;

                // Open WhatsApp
                window.open(whatsappURL, '_blank');

                // Update customer marketing history
                if (!customer.marketing_history) {
                    customer.marketing_history = [];
                }
                customer.marketing_history.push({
                    type: campaignType,
                    date: new Date().toISOString(),
                    message_preview: messageTemplate.substring(0, 50) + '...',
                    status: 'Sent'
                });

                successCount++;
                console.log(`📱 ${index + 1}/${customerList.length} - Opened WhatsApp for: ${customer.name}`);

                // Show progress for large campaigns
                if (customerList.length > 10 && (index + 1) % 10 === 0) {
                    console.log(`📊 Progress: ${index + 1}/${customerList.length} messages processed`);
                }

                // Final summary
                if (index === customerList.length - 1) {
                    setTimeout(() => {
                        saveToLocalStorage();

                        const endTime = new Date();
                        const duration = Math.round((endTime - startTime) / 1000);

                        showAlert(`🎉 ${campaignType.toUpperCase()} COMPLETED!\n\n📊 CAMPAIGN SUMMARY:\n✅ Successfully processed: ${successCount}\n❌ Failed: ${errorCount}\n⏱️ Total time: ${duration} seconds\n📱 Average: ${Math.round(duration / customerList.length)} sec per customer\n\n📲 NEXT STEPS:\n1. Go to each WhatsApp Web/App tab\n2. Review and SEND each message\n3. Monitor customer responses\n\n💾 Customer marketing history updated\n🎯 Campaign tracking saved automatically`, 'success', 15000);

                        // Execute callback if provided
                        if (callback && typeof callback === 'function') {
                            callback();
                        }

                    }, 4000);
                }

            } catch (error) {
                console.error(`❌ Error processing ${customer.name}:`, error);
                errorCount++;
            }
        }, index * 2000); // 2 second delay between each customer
    });
}

// ✅ FESTIVAL & CAMPAIGN TEMPLATES
function sendFestivalOffer(festival) {
    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);

    if (marketingCustomers.length === 0) {
        showAlert('❌ No customers with marketing enabled', 'warning');
        return;
    }

    const festivalMessages = {
        diwali: {
            title: '🪔 Diwali Special Offer',
            message: `🪔✨ HAPPY DIWALI FROM CROWN INN HOTEL! ✨🪔

Dear {name},

May this Diwali bring joy, prosperity & happiness to your family!

🎆 DIWALI SPECIAL PACKAGE:
🏨 40% OFF on all room bookings
🪔 FREE Diwali decoration in rooms
🍽️ Special festive dinner included
🎁 Complimentary sweets & dry fruits hamper
✨ FREE early check-in & late check-out
🎊 Festival celebration arrangements

🗓️ Valid until: 15 November 2025
📞 Book now: +91 9876543210
💎 Quote: DIWALI40

Celebrate this Diwali with luxury & savings!

Crown Inn Hotel - Illuminating your celebrations! 🏨✨`,
            discount: '40%'
        }
    };

    const campaign = festivalMessages[festival];
    if (!campaign) {
        showAlert('❌ Festival campaign not found', 'danger');
        return;
    }

    if (confirm(`${campaign.title.toUpperCase()}\n\n📊 Campaign Details:\n• Discount: ${campaign.discount}\n• Target: ${marketingCustomers.length} customers\n• Type: ${campaign.title}\n\n📱 Send this campaign to all marketing customers?`)) {
        showAlert(`🚀 Starting ${campaign.title}...\n\n📱 Processing ${marketingCustomers.length} customers`, 'info', 4000);
        sendBulkMessagesToCustomers(marketingCustomers, campaign.message, campaign.title);
    }
}

function sendWeekendOffer() {
    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);

    const message = `🌟 WEEKEND SPECIAL - CROWN INN HOTEL! 🌟

Dear {name},

Perfect weekend getaway awaits you!

🎉 WEEKEND EXCLUSIVE PACKAGE:
🏨 35% OFF on Friday-Sunday stays
🍽️ FREE weekend breakfast buffet
🏊 Unlimited pool access included
🎵 Live music on Saturday nights
🚗 FREE parking
📺 Premium entertainment channels
🛎️ 24/7 room service

📅 Valid: All weekends this month
⏰ Limited time offer - Book today!
📞 Call now: +91 9876543210
💎 Quote: WEEKEND35

Make your weekends unforgettable with us!

Crown Inn Hotel - Your weekend paradise! 🏨✨`;

    if (confirm(`🌟 WEEKEND SPECIAL CAMPAIGN\n\n📊 Send to ${marketingCustomers.length} customers?\n🎁 Includes 35% weekend discount\n📱 WhatsApp will open for each customer\n\n✅ Start weekend campaign?`)) {
        sendBulkMessagesToCustomers(marketingCustomers, message, '🌟 Weekend Special Campaign');
    }
}

function sendFlashSale() {
    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);

    const message = `⚡🔥 FLASH SALE ALERT - CROWN INN HOTEL! 🔥⚡

Dear {name},

URGENT: Super limited-time offer!

💥 FLASH SALE DEAL:
🏨 50% OFF on bookings made TODAY ONLY
⚡ Valid for next 30 days stay
🎁 FREE room upgrade (subject to availability)
🍽️ Complimentary welcome dinner
🥂 FREE welcome drinks
🚗 FREE valet parking

⏰ HURRY! This offer expires at MIDNIGHT TODAY!
📞 Book RIGHT NOW: +91 9876543210
💎 Quote: FLASH50

Don't miss this incredible deal!

Crown Inn Hotel - Act fast, save big! 🏨💰`;

    if (confirm(`⚡ FLASH SALE CAMPAIGN\n\n📊 Send to ${marketingCustomers.length} customers?\n🔥 Includes 50% flash discount\n⏰ Today only offer\n\n✅ Start flash sale campaign?`)) {
        sendBulkMessagesToCustomers(marketingCustomers, message, '⚡ Flash Sale Campaign');
    }
}

// ✅ VIP & CORPORATE CAMPAIGNS
function sendVIPOffers() {
    const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);

    if (vipCustomers.length === 0) {
        showAlert('❌ No VIP customers with marketing enabled', 'warning');
        return;
    }

    const message = `👑 VIP EXCLUSIVE OFFER - CROWN INN HOTEL 👑

Dear {name},

As our valued VIP customer, here's an exclusive offer just for you!

🌟 VIP EXCLUSIVE BENEFITS:
🏨 35% OFF on all bookings
🔥 Guaranteed room upgrades
🥂 Welcome champagne
🍽️ Complimentary fine dining
🚗 FREE valet parking
⚡ Priority check-in/check-out
📱 Dedicated VIP helpline
🛎️ Personal concierge service

👑 Your loyalty deserves the royal treatment!

📞 VIP Hotline: +91 9876543210
💎 Quote: VIP35
🌐 Crown Inn Hotel - VIP Experience Redefined

*Exclusive for VIP members only`;

    if (confirm(`👑 VIP EXCLUSIVE CAMPAIGN\n\n📊 Send to ${vipCustomers.length} VIP customers?\n🌟 Includes 35% VIP discount\n👑 Exclusive VIP benefits\n\n✅ Start VIP campaign?`)) {
        sendBulkMessagesToCustomers(vipCustomers, message, '👑 VIP Exclusive Campaign');
    }
}

function sendVIPNewsletter() {
    const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);

    const message = `📰 VIP MONTHLY NEWSLETTER - CROWN INN HOTEL

Dear {name},

Your exclusive VIP updates this month!

🌟 WHAT'S NEW:
• New premium suites launched
• Spa services now available 24/7
• Rooftop restaurant opening soon
• VIP exclusive events calendar

👑 YOUR VIP PRIVILEGES:
• Always guaranteed room availability
• 35% OFF on all bookings
• Complimentary upgrades
• Personal concierge service

📅 UPCOMING VIP EVENTS:
• Wine tasting evening - 25th Nov
• VIP customer appreciation dinner
• Exclusive preview of new amenities

Stay connected with us!
VIP Hotline: +91 9876543210

Crown Inn Hotel - Exclusively Yours! 👑`;

    if (confirm(`📰 VIP NEWSLETTER\n\n📊 Send to ${vipCustomers.length} VIP customers?\n📰 Monthly newsletter with updates\n👑 VIP exclusive content\n\n✅ Send VIP newsletter?`)) {
        sendBulkMessagesToCustomers(vipCustomers, message, '📰 VIP Newsletter');
    }
}

function sendCorporateOffers() {
    const corporateCustomers = customers.filter(c => c.customer_type === 'Corporate' && c.whatsapp_marketing);

    if (corporateCustomers.length === 0) {
        showAlert('❌ No corporate customers with marketing enabled', 'warning');
        return;
    }

    const message = `🏢 CORPORATE PACKAGE - CROWN INN HOTEL 🏢

Dear {name},

Exclusive corporate packages designed for your business needs!

💼 CORPORATE BENEFITS:
🏨 40% OFF on bulk bookings (5+ rooms)
🏢 Meeting rooms included FREE
📊 Business center access
🍽️ Conference lunch arrangements
📱 High-speed WiFi throughout
🚗 Fleet parking facility
📋 Corporate billing & invoicing support
🎯 Dedicated corporate account manager

💼 Perfect for business travel & corporate events!

📞 Corporate Desk: +91 9876543210
💎 Quote: CORPORATE40
🌐 Crown Inn Hotel - Your business partner

*Corporate rates & terms apply`;

    if (confirm(`🏢 CORPORATE CAMPAIGN\n\n📊 Send to ${corporateCustomers.length} corporate customers?\n💼 Includes 40% corporate discount\n🏢 Business packages included\n\n✅ Start corporate campaign?`)) {
        sendBulkMessagesToCustomers(corporateCustomers, message, '🏢 Corporate Package Campaign');
    }
}

function sendMeetingRoomOffers() {
    const corporateCustomers = customers.filter(c => c.customer_type === 'Corporate' && c.whatsapp_marketing);

    const message = `🏢 MEETING ROOM SPECIAL - CROWN INN HOTEL

Dear {name},

Professional meeting spaces for your business needs!

📊 MEETING ROOM PACKAGES:
🏢 50% OFF meeting room bookings
📺 LED projector & AV equipment included
💻 High-speed WiFi & power outlets
☕ Complimentary tea/coffee service
📋 Whiteboard & stationery provided
🍽️ Business lunch packages available
🚗 FREE parking for attendees
🛎️ Dedicated support staff

Perfect for:
• Board meetings
• Training sessions  
• Presentations
• Client meetings

📞 Book now: +91 9876543210
💎 Quote: MEETING50

Crown Inn Hotel - Where business thrives! 🏢`;

    sendBulkMessagesToCustomers(corporateCustomers, message, '🏢 Meeting Room Special');
}

// ✅ MARKETING CUSTOMER LIST GENERATOR
function generateMarketingCustomersList(marketingCustomers) {
    if (marketingCustomers.length === 0) {
        return `<div class="text-center py-4">
            <i class="fas fa-users fa-3x text-muted mb-3 opacity-50"></i>
            <h6>No Marketing Customers</h6>
            <p class="text-muted">No customers have enabled WhatsApp marketing.</p>
        </div>`;
    }

    let html = '<div class="row g-3">';

    marketingCustomers.forEach(customer => {
        const isVIP = customer.customer_type === 'VIP';
        const bookingCount = bookings.filter(b => b.customer_id === customer.id).length;
        const isBirthday = getTodayBirthdayCustomers().find(c => c.id === customer.id);

        html += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card card-sm border-${isVIP ? 'warning' : 'success'} ${isBirthday ? 'bg-warning bg-opacity-10' : ''}">
                    <div class="card-body p-3">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 class="mb-1">${customer.name} ${isVIP ? '👑' : ''} ${isBirthday ? '🎂' : ''}</h6>
                                <small class="text-muted d-block">${customer.phone}</small>
                                <small class="text-muted">${customer.customer_type} • ${bookingCount} bookings</small>
                            </div>
                            <button class="btn btn-sm btn-outline-success" onclick="sendIndividualWhatsApp(${customer.id})" title="Send Message">
                                <i class="fab fa-whatsapp"></i>
                            </button>
                        </div>
                        ${isBirthday ? '<div class="mt-2"><span class="badge bg-warning text-dark">🎂 Birthday Today!</span></div>' : ''}
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';

    if (marketingCustomers.length > 8) {
        html += `<div class="text-center mt-3">
            <small class="text-muted">Showing 8 of ${marketingCustomers.length} marketing customers</small>
            <br><button class="btn btn-sm btn-outline-primary mt-2" onclick="showSection('customer-list')">
                <i class="fas fa-eye me-1"></i>View All Customers
            </button>
        </div>`;
    }

    return html;
}

// ✅ INDIVIDUAL WHATSAPP MESSAGE
function sendIndividualWhatsApp(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
        showAlert('❌ Customer not found!', 'danger');
        return;
    }

    if (!customer.whatsapp_marketing) {
        if (!confirm(`${customer.name} has not enabled WhatsApp marketing.\n\nDo you still want to send a message?`)) {
            return;
        }
    }

    const message = prompt(`📱 Send WhatsApp message to ${customer.name}:\n\n✏️ Enter your message:`,
        `Hello ${customer.name},\n\nGreetings from Crown Inn Hotel!\n\nWe have exciting offers for you. Contact us for more details.\n\nBest regards,\nCrown Inn Hotel Team`);

    if (message) {
        const whatsappNumber = customer.whatsapp || customer.phone;
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, '_blank');
        showAlert(`✅ WhatsApp opened for ${customer.name}\n\nPlease send the message manually.`, 'success');

        // Add to marketing history
        if (!customer.marketing_history) {
            customer.marketing_history = [];
        }
        customer.marketing_history.push({
            type: 'Individual Message',
            date: new Date().toISOString(),
            message_preview: message.substring(0, 50) + '...',
            status: 'Sent'
        });
        saveToLocalStorage();
    }
}

// ✅ MARKETING STATISTICS
function showMarketingStats() {
    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);
    const birthdayCustomers = getTodayBirthdayCustomers();
    const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);
    const corporateCustomers = customers.filter(c => c.customer_type === 'Corporate' && c.whatsapp_marketing);

    // Calculate campaign stats
    const customersWithHistory = customers.filter(c => c.marketing_history && c.marketing_history.length > 0);
    const totalCampaignsSent = customersWithHistory.reduce((sum, c) => sum + c.marketing_history.length, 0);

    let stats = `📊 WHATSAPP MARKETING STATISTICS\n${new Date().toLocaleString()}\n\n`;

    stats += `👥 CUSTOMER DATABASE:\n`;
    stats += `• Total Customers: ${customers.length}\n`;
    stats += `• Marketing Enabled: ${marketingCustomers.length} (${Math.round((marketingCustomers.length / customers.length) * 100)}%)\n`;
    stats += `• VIP Customers: ${vipCustomers.length}\n`;
    stats += `• Corporate Customers: ${corporateCustomers.length}\n`;
    stats += `• Regular Customers: ${marketingCustomers.filter(c => c.customer_type === 'Regular').length}\n\n`;

    stats += `🎂 BIRTHDAY SYSTEM:\n`;
    stats += `• Today's Birthdays: ${birthdayCustomers.length}\n`;
    stats += `• Birthday Offers Enabled: ${customers.filter(c => c.birthday_offers).length}\n`;
    stats += `• Wishes Sent Today: ${birthdayCustomers.filter(c => c.birthday_wish_sent_today === new Date().toDateString()).length}\n\n`;

    stats += `📈 CAMPAIGN PERFORMANCE:\n`;
    stats += `• Customers Reached: ${customersWithHistory.length}\n`;
    stats += `• Total Campaigns Sent: ${totalCampaignsSent}\n`;
    stats += `• Avg Campaigns per Customer: ${customersWithHistory.length > 0 ? Math.round(totalCampaignsSent / customersWithHistory.length) : 0}\n\n`;

    stats += `📱 CONTACT INFO:\n`;
    stats += `• WhatsApp Numbers: ${customers.filter(c => c.whatsapp).length}\n`;
    stats += `• Marketing Consent: ${marketingCustomers.length}\n`;
    stats += `• Phone Numbers: ${customers.filter(c => c.phone).length}`;

    alert(stats);
}

// ✅ AUTO BIRTHDAY SETUP FOR TESTING
function setupBirthdayTestData() {
    console.log('🎂 Setting up birthday test data...');

    // Add birthday dates to first 3 customers if they don't have them
    customers.slice(0, 3).forEach((customer, index) => {
        if (!customer.dob) {
            const today = new Date();
            // Make first 2 customers have birthday today for testing
            if (index < 2) {
                customer.dob = `${today.getFullYear() - 25 - index}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                console.log(`🎉 Added TODAY's birthday for ${customer.name}`);
            } else {
                // Third customer gets a random birthday
                const randomMonth = Math.floor(Math.random() * 12) + 1;
                const randomDay = Math.floor(Math.random() * 28) + 1;
                customer.dob = `${today.getFullYear() - 30}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;
            }

            // Enable birthday offers and marketing
            customer.birthday_offers = true;
            customer.whatsapp_marketing = true;
        }
    });

    saveToLocalStorage();
    const todayBirthdays = getTodayBirthdayCustomers();
    console.log(`✅ Birthday setup complete. Today's birthdays: ${todayBirthdays.length}`);
    return todayBirthdays;
}

// Auto-run birthday setup when marketing is loaded
setTimeout(() => {
    if (customers.length > 0) {
        setupBirthdayTestData();
    }
}, 1000);

console.log('✅ Complete WhatsApp Marketing System loaded successfully!');

// ========================================
// ADD THESE FUNCTIONS TO THE END OF YOUR app.js FILE
// ========================================

// Supporting functions for WhatsApp Marketing
function getTodayBirthdayCustomers() {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();

    return customers.filter(customer => {
        if (!customer.dob || !customer.birthday_offers) return false;

        try {
            const dob = new Date(customer.dob);
            const birthMonth = dob.getMonth() + 1;
            const birthDate = dob.getDate();

            return birthMonth === todayMonth && birthDate === todayDate;
        } catch {
            return false;
        }
    });
}

function generateMarketingCustomersList(marketingCustomers) {
    if (marketingCustomers.length === 0) {
        return '<div class="text-center py-4"><p class="text-muted">No customers have enabled WhatsApp marketing.</p></div>';
    }

    let html = '<div class="row g-2">';

    marketingCustomers.slice(0, 6).forEach(customer => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card card-sm border-success">
                    <div class="card-body p-2">
                        <h6 class="mb-1">${customer.name}</h6>
                        <small class="text-muted">${customer.phone} • ${customer.customer_type}</small>
                        <div class="mt-1">
                            <button class="btn btn-sm btn-outline-success" onclick="sendIndividualWhatsApp(${customer.id})">
                                <i class="fab fa-whatsapp me-1"></i>Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';

    if (marketingCustomers.length > 6) {
        html += `<div class="text-center mt-3"><small class="text-muted">Showing 6 of ${marketingCustomers.length} marketing customers</small></div>`;
    }

    return html;
}

function sendDiscountOffer() {
    const marketingCustomers = customers.filter(c => c.whatsapp_marketing);

    if (marketingCustomers.length === 0) {
        showAlert('No customers have WhatsApp marketing enabled', 'warning');
        return;
    }

    const message = `🎉 Special Discount Offer from Crown Inn Hotel! 🎉

Hello {name}!

We have an exclusive offer just for you:
✨ 25% OFF on your next booking
✨ Valid for the next 30 days
✨ Applicable on all room types

Book now and enjoy luxury at the best price!

Contact us: +91 XXXXX XXXXX
Visit: Crown Inn Hotel

*Terms and conditions apply`;

    sendBulkWhatsAppMessages(marketingCustomers, message, 'Discount Offer');
}

function sendBirthdayWishes() {
    const birthdayCustomers = getTodayBirthdayCustomers();

    if (birthdayCustomers.length === 0) {
        showAlert('No customer birthdays today', 'info');
        return;
    }

    const message = `🎂 Happy Birthday {name}! 🎂

Warmest birthday wishes from all of us at Crown Inn Hotel!

🎁 Special Birthday Offer:
✨ 30% OFF on your birthday month booking
✨ Complimentary birthday cake
✨ Late checkout facility

Make your birthday celebration memorable with us!

Contact: +91 XXXXX XXXXX
Crown Inn Hotel - Where memories are made!`;

    sendBulkWhatsAppMessages(birthdayCustomers, message, 'Birthday Wishes');
}

function sendVIPOffers() {
    const vipCustomers = customers.filter(c => c.customer_type === 'VIP' && c.whatsapp_marketing);

    if (vipCustomers.length === 0) {
        showAlert('No VIP customers with marketing enabled', 'warning');
        return;
    }

    const message = `👑 Exclusive VIP Offer - Crown Inn Hotel

Dear {name},

As our valued VIP customer, we have a special offer for you:

🌟 VIP Exclusive Benefits:
✨ 35% OFF on all bookings
✨ Complimentary room upgrade
✨ Priority check-in/check-out
✨ Complimentary breakfast
✨ Free WiFi & parking

Your loyalty deserves the best!

VIP Hotline: +91 XXXXX XXXXX
Crown Inn Hotel - VIP Experience`;

    sendBulkWhatsAppMessages(vipCustomers, message, 'VIP Special Offers');
}

function sendBulkWhatsAppMessages(customerList, messageTemplate, campaignType) {
    if (customerList.length === 0) {
        showAlert('No customers to send messages to', 'warning');
        return;
    }

    if (!confirm(`📱 Send ${campaignType} to ${customerList.length} customers?\n\nThis will open WhatsApp for each customer. Make sure you have WhatsApp Web open.`)) {
        return;
    }

    showAlert(`📱 Starting ${campaignType} campaign...\n\nOpening WhatsApp for ${customerList.length} customers.\nPlease send each message manually.`, 'info', 3000);

    let successCount = 0;

    customerList.forEach((customer, index) => {
        setTimeout(() => {
            try {
                const personalizedMessage = messageTemplate
                    .replace(/{name}/g, customer.name)
                    .replace(/{hotel}/g, 'Crown Inn Hotel');

                const whatsappNumber = customer.whatsapp || customer.phone;
                const cleanNumber = whatsappNumber.replace(/\D/g, '');

                const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(personalizedMessage)}`;

                window.open(whatsappURL, '_blank');
                successCount++;

                if (index === customerList.length - 1) {
                    setTimeout(() => {
                        showAlert(`✅ ${campaignType} Campaign Initiated!\n\n📱 Opened WhatsApp for ${successCount} customers\n\n⚠️ Please send each message manually from WhatsApp Web/App for privacy compliance.`, 'success', 10000);
                    }, 2000);
                }

            } catch (error) {
                console.error(`Error opening WhatsApp for ${customer.name}:`, error);
            }
        }, index * 1500); // 1.5 second delay between each
    });
}

function sendIndividualWhatsApp(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
        showAlert('Customer not found!', 'danger');
        return;
    }

    const message = prompt(`Send WhatsApp message to ${customer.name}:\n\nEnter your message:`,
        `Hello ${customer.name},\n\nGreetings from Crown Inn Hotel!\n\nWe have exciting offers for you. Contact us for more details.\n\nBest regards,\nCrown Inn Hotel Team`);

    if (message) {
        const whatsappNumber = customer.whatsapp || customer.phone;
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, '_blank');
        showAlert(`✅ WhatsApp opened for ${customer.name}\n\nPlease send the message manually.`, 'success');
    }
}

// Add reset data function if not exists
function resetAllData() {
    if (confirm('⚠️ WARNING: This will permanently delete ALL data!\n\nAre you absolutely sure?')) {
        if (confirm('🔴 FINAL CONFIRMATION: Delete everything?')) {
            localStorage.removeItem('crownInnHotelData');
            location.reload();
        }
    }
}

// ✅ INSTANT FIX for dropdown navigation
document.addEventListener('DOMContentLoaded', function () {
    // Find all dropdown items and fix their navigation
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Get the onclick attribute
            const onclickAttr = this.getAttribute('onclick');

            if (onclickAttr && onclickAttr.includes('showSection')) {
                e.preventDefault();

                // Extract section ID
                const match = onclickAttr.match(/showSection\(['"]([^'"]+)['"]\)/);
                if (match && match[1]) {
                    const sectionId = match[1];

                    // Close dropdown
                    const dropdownMenu = this.closest('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.remove('show');
                    }

                    // Navigate
                    setTimeout(() => {
                        showSection(sectionId);
                    }, 50);
                }
            }
        });
    });
});

// Fix dropdown blue highlight and navigation issues
function fixDropdownIssues() {
    console.log('🔄 Fixing dropdown blue highlight and navigation...');

    // Remove duplicate sections first
    const duplicateIds = ['whatsapp-marketing', 'checkout-section'];
    duplicateIds.forEach(id => {
        const elements = document.querySelectorAll(`#${id}`);
        for (let i = 1; i < elements.length; i++) {
            elements[i].remove();
        }
    });

    // Fix all dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);

        newItem.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Remove focus and active states
            this.blur();
            document.querySelectorAll('.dropdown-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
            });

            // Close dropdown
            document.querySelectorAll('.dropdown-menu.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });

            // Handle navigation
            const onclick = this.getAttribute('onclick');
            if (onclick && onclick.includes('showSection')) {
                const match = onclick.match(/showSection\(['"]([^'"]+)['"]\)/);
                if (match && match[1]) {
                    setTimeout(() => {
                        showSection(match[1]);
                    }, 100);
                }
            }
        });

        newItem.addEventListener('mouseleave', function () {
            this.blur();
        });
    });
}

// Auto-clean highlights every 2 seconds
setInterval(() => {
    document.querySelectorAll('.dropdown-item.active').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.dropdown-item:focus').forEach(item => {
        item.blur();
    });
}, 2000);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        fixDropdownIssues();
        console.log('✅ Dropdown fixes applied!');
    }, 1000);
});


