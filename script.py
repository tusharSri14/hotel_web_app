# Create the missing Quick Booking HTML section and fix the booking summary issue

quick_booking_html = '''
ADD THIS QUICK BOOKING SECTION TO YOUR index.html (after the New Booking section):

    <!-- Quick Booking Section - MISSING SECTION -->
    <div id="quick-booking" class="content-section container-fluid mt-3" style="display: none;">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h4><i class="fas fa-bolt me-2"></i>Quick Booking</h4>
                        <p class="mb-0">Fast booking for walk-in customers</p>
                    </div>
                    <div class="card-body">
                        <form id="quick-booking-form" onsubmit="event.preventDefault(); submitQuickBooking();">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label class="form-label">Customer Name *</label>
                                    <input type="text" class="form-control" id="quick-customer-name" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label class="form-label">Phone Number *</label>
                                    <input type="tel" class="form-control" id="quick-customer-phone" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label class="form-label">Email Address *</label>
                                    <input type="email" class="form-control" id="quick-customer-email" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Select Room *</label>
                                    <select class="form-select" id="quick-booking-room" onchange="calculateQuickBooking()" required>
                                        <option value="">Choose Room</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Number of Days *</label>
                                    <input type="number" class="form-control" id="quick-days" min="1" max="30" onchange="calculateQuickBooking()" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Amount to Charge *</label>
                                    <div class="input-group">
                                        <span class="input-group-text">₹</span>
                                        <input type="number" class="form-control" id="quick-amount" min="1" onchange="calculateQuickTotal()" required>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Advance Payment</label>
                                    <div class="input-group">
                                        <span class="input-group-text">₹</span>
                                        <input type="number" class="form-control" id="quick-advance" min="0" onchange="calculateQuickTotal()">
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <div class="card bg-light">
                                        <div class="card-body">
                                            <h6>Quick Booking Summary</h6>
                                            <div id="quick-booking-summary">Select room and enter days first</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-success btn-lg">
                                        <i class="fas fa-bolt me-1"></i>Create Quick Booking
                                    </button>
                                    <button type="reset" class="btn btn-secondary btn-lg ms-2" onclick="resetQuickBookingForm()">
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
'''

print("1. ADD QUICK BOOKING HTML SECTION:")
print("="*50)
print(quick_booking_html)

# Now provide the JavaScript fixes
js_fixes = '''

ADD THESE FUNCTIONS TO YOUR app.js FILE:

// FIXED BOOKING SUMMARY CALCULATION
function calculateBookingDays() {
    try {
        const roomId = document.getElementById('booking-room')?.value;
        const checkinDate = document.getElementById('checkin-date')?.value;
        const checkoutDate = document.getElementById('checkout-date')?.value;
        const bookingSummary = document.getElementById('booking-summary');
        
        console.log('Calculating booking days...', {roomId, checkinDate, checkoutDate}); // Debug log
        
        if (!bookingSummary) {
            console.error('booking-summary element not found');
            return;
        }
        
        if (roomId && checkinDate && checkoutDate) {
            const room = rooms.find(r => r.id == roomId);
            const checkin = new Date(checkinDate);
            const checkout = new Date(checkoutDate);
            const timeDiff = checkout - checkin;
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            
            console.log('Date calculation:', {checkin, checkout, days}); // Debug log
            
            if (days > 0 && room) {
                const standardAmount = days * room.price;
                bookingSummary.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Room:</strong> ${room.room_number} - ${room.type}</p>
                            <p><strong>Stay Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
                            <p><strong>Standard Rate:</strong> ₹${room.price}/day</p>
                            <p><strong>Check-in:</strong> ${checkin.toLocaleDateString()} ${checkin.toLocaleTimeString()}</p>
                            <p><strong>Check-out:</strong> ${checkout.toLocaleDateString()} ${checkout.toLocaleTimeString()}</p>
                        </div>
                        <div class="col-md-6">
                            <div class="alert alert-info">
                                <h6>Suggested Amount:</h6>
                                <h4>₹${standardAmount}</h4>
                                <small>You can enter a different amount below</small>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div id="final-calculation">Enter amount to see final total</div>
                `;
                
                // Set suggested amount in the manual amount field
                const manualAmountField = document.getElementById('manual-amount');
                if (manualAmountField && !manualAmountField.value) {
                    manualAmountField.value = standardAmount;
                    calculateFinalTotal();
                }
            } else if (days <= 0) {
                bookingSummary.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Error:</strong> Check-out date must be after check-in date!
                    </div>
                `;
            } else {
                bookingSummary.innerHTML = '<div class="alert alert-warning">Room not found!</div>';
            }
        } else {
            bookingSummary.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    Select room and dates to see booking details
                </div>
            `;
        }
    } catch (error) {
        console.error('Error calculating booking days:', error);
        const bookingSummary = document.getElementById('booking-summary');
        if (bookingSummary) {
            bookingSummary.innerHTML = `
                <div class="alert alert-danger">
                    <strong>Error:</strong> Unable to calculate booking details. Please try again.
                </div>
            `;
        }
    }
}

// QUICK BOOKING FUNCTIONS
function loadQuickBooking() {
    loadQuickAvailableRooms();
    resetQuickBookingForm();
}

function loadQuickAvailableRooms() {
    const roomSelect = document.getElementById('quick-booking-room');
    if (!roomSelect) return;
    
    roomSelect.innerHTML = '<option value="">Select Room</option>';
    
    const availableRooms = rooms.filter(room => room.status === 'Vacant');
    availableRooms.forEach(room => {
        roomSelect.innerHTML += `<option value="${room.id}">Room ${room.room_number} - ${room.type} (₹${room.price}/day)</option>`;
    });
}

function calculateQuickBooking() {
    try {
        const roomId = document.getElementById('quick-booking-room')?.value;
        const days = parseInt(document.getElementById('quick-days')?.value || '0');
        const summaryDiv = document.getElementById('quick-booking-summary');
        
        if (!summaryDiv) return;
        
        if (roomId && days > 0) {
            const room = rooms.find(r => r.id == roomId);
            if (room) {
                const suggestedAmount = days * room.price;
                const checkinDate = new Date();
                const checkoutDate = new Date(checkinDate.getTime() + (days * 24 * 60 * 60 * 1000));
                
                summaryDiv.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Room:</strong> ${room.room_number} - ${room.type}</p>
                            <p><strong>Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
                            <p><strong>Rate:</strong> ₹${room.price}/day</p>
                            <p><strong>Check-in:</strong> Today (${checkinDate.toLocaleDateString()})</p>
                            <p><strong>Check-out:</strong> ${checkoutDate.toLocaleDateString()}</p>
                        </div>
                        <div class="col-md-6">
                            <div class="alert alert-success">
                                <h6>Suggested Amount:</h6>
                                <h4>₹${suggestedAmount}</h4>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div id="quick-total-calculation">Enter amount to see payment details</div>
                `;
                
                // Set suggested amount
                const quickAmountField = document.getElementById('quick-amount');
                if (quickAmountField && !quickAmountField.value) {
                    quickAmountField.value = suggestedAmount;
                    calculateQuickTotal();
                }
            }
        } else {
            summaryDiv.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    Select room and enter number of days
                </div>
            `;
        }
    } catch (error) {
        console.error('Error calculating quick booking:', error);
    }
}

function calculateQuickTotal() {
    try {
        const amount = parseFloat(document.getElementById('quick-amount')?.value || '0');
        const advance = parseFloat(document.getElementById('quick-advance')?.value || '0');
        const totalCalcDiv = document.getElementById('quick-total-calculation');
        
        if (!totalCalcDiv) return;
        
        if (amount > 0) {
            const pending = amount - advance;
            
            totalCalcDiv.innerHTML = `
                <div class="row">
                    <div class="col-md-8">
                        <table class="table table-sm">
                            <tr>
                                <td><strong>Total Amount:</strong></td>
                                <td><strong>₹${amount}</strong></td>
                            </tr>
                            ${advance > 0 ? `
                            <tr class="text-success">
                                <td>Advance Payment:</td>
                                <td>₹${advance}</td>
                            </tr>
                            ` : ''}
                            <tr class="${pending > 0 ? 'table-warning' : 'table-success'}">
                                <td><strong>Pending Amount:</strong></td>
                                <td><strong>₹${pending}</strong></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-4">
                        <div class="alert alert-success mb-0">
                            <strong>Ready to Book!</strong><br>
                            <small>Click "Create Quick Booking"</small>
                        </div>
                    </div>
                </div>
            `;
        } else {
            totalCalcDiv.innerHTML = 'Enter amount to see payment details';
        }
    } catch (error) {
        console.error('Error calculating quick total:', error);
    }
}

function resetQuickBookingForm() {
    const form = document.getElementById('quick-booking-form');
    if (form) form.reset();
    
    const summaryDiv = document.getElementById('quick-booking-summary');
    if (summaryDiv) summaryDiv.innerHTML = 'Select room and enter days first';
}

function submitQuickBooking() {
    try {
        const customerName = document.getElementById('quick-customer-name')?.value;
        const customerPhone = document.getElementById('quick-customer-phone')?.value;
        const customerEmail = document.getElementById('quick-customer-email')?.value;
        const roomId = document.getElementById('quick-booking-room')?.value;
        const days = parseInt(document.getElementById('quick-days')?.value || '0');
        const amount = parseFloat(document.getElementById('quick-amount')?.value || '0');
        const advance = parseFloat(document.getElementById('quick-advance')?.value || '0');
        
        if (!customerName || !customerPhone || !customerEmail || !roomId || !days || !amount) {
            alert('Please fill all required fields');
            return;
        }
        
        // Create customer first
        const customer = {
            id: nextCustomerId++,
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: 'Walk-in customer',
            aadhaar: 'Not provided',
            created_at: new Date().toISOString()
        };
        
        customers.push(customer);
        
        // Create booking
        const checkinDate = new Date();
        const checkoutDate = new Date(checkinDate.getTime() + (days * 24 * 60 * 60 * 1000));
        
        const booking = {
            id: nextBookingId++,
            customer_id: customer.id,
            room_id: parseInt(roomId),
            checkin_time: checkinDate.toISOString(),
            checkout_time: checkoutDate.toISOString(),
            total_amount: amount,
            payment_status: advance >= amount ? 'Paid' : (advance > 0 ? 'Partial' : 'Pending')
        };
        
        bookings.push(booking);
        
        // Record advance payment if any
        if (advance > 0) {
            const payment = {
                id: nextPaymentId++,
                booking_id: booking.id,
                amount: advance,
                payment_type: 'Cash',
                payment_time: new Date().toISOString()
            };
            payments.push(payment);
        }
        
        // Update room status
        const room = rooms.find(r => r.id == roomId);
        if (room) room.status = 'Occupied';
        
        saveToLocalStorage();
        
        showAlert(`Quick booking created successfully! Customer: ${customerName}, Room: ${room.room_number}`, 'success');
        
        // Reset form
        resetQuickBookingForm();
        loadQuickAvailableRooms();
        updateDashboard();
        
        // Show confirmation
        if (confirm(`Quick booking completed!\\n\\nCustomer: ${customerName}\\nRoom: ${room.room_number}\\nTotal: ₹${amount}\\nAdvance: ₹${advance}\\nPending: ₹${amount - advance}\\n\\nWould you like to print a receipt?`)) {
            printQuickBookingReceipt(customer, room, booking, advance);
        }
        
    } catch (error) {
        console.error('Error submitting quick booking:', error);
        showAlert('Error creating quick booking. Please try again.', 'danger');
    }
}

function printQuickBookingReceipt(customer, room, booking, advance) {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
        <html>
        <head>
            <title>Quick Booking Receipt - Crown Inn Hotel</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #000; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>Crown Inn Hotel</h2>
                <h3>Quick Booking Receipt</h3>
            </div>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <table>
                <tr><th>Customer Details</th><th></th></tr>
                <tr><td>Name</td><td>${customer.name}</td></tr>
                <tr><td>Phone</td><td>${customer.phone}</td></tr>
                <tr><td>Email</td><td>${customer.email}</td></tr>
            </table>
            <table>
                <tr><th>Booking Details</th><th></th></tr>
                <tr><td>Room</td><td>${room.room_number} - ${room.type}</td></tr>
                <tr><td>Check-in</td><td>${new Date(booking.checkin_time).toLocaleDateString()}</td></tr>
                <tr><td>Check-out</td><td>${new Date(booking.checkout_time).toLocaleDateString()}</td></tr>
                <tr><td>Total Amount</td><td>₹${booking.total_amount}</td></tr>
                <tr><td>Advance Paid</td><td>₹${advance}</td></tr>
                <tr><td>Pending</td><td>₹${booking.total_amount - advance}</td></tr>
            </table>
            <p style="text-align: center; margin-top: 30px;">Thank you for choosing Crown Inn Hotel!</p>
        </body>
        </html>
    `);
    receiptWindow.print();
}

// UPDATE THE showSection FUNCTION - ADD THIS CASE:
case 'quick-booking':
    loadQuickBooking();
    break;

'''

print("\n2. ADD THESE JAVASCRIPT FUNCTIONS:")
print("="*50)
print(js_fixes)

debug_tips = '''

DEBUGGING TIPS:

1. Open Browser Console (F12) to see error messages
2. Check if these functions are called:
   - calculateBookingDays() when dates change
   - loadQuickBooking() when quick booking opens
   
3. Verify HTML elements exist:
   - booking-summary div
   - quick-booking-summary div
   - All form input IDs match

4. Test step by step:
   - Select room first
   - Then select dates
   - Check console for any errors
'''

print("\n3. DEBUGGING TIPS:")
print("="*50)
print(debug_tips)