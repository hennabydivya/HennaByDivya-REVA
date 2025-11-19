// Booking Calendar System
let currentDate = new Date();
let selectedDates = [];
const maxSelections = 3;

// ADMIN: Add your booked dates here (format: 'YYYY-MM-DD')
const bookedDates = [
    '2025-11-25',
    '2025-11-30',
    '2025-12-15',
    '2025-12-20',
    '2025-12-25',
    // Add more booked dates here
];

document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    setupFormSubmit();
});

function initializeCalendar() {
    renderCalendar();
    
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Build calendar grid
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of the month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateString = formatDate(dateObj);
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Check if date is in the past
        if (dateObj < today) {
            dayCell.classList.add('past');
        }
        // Check if date is already booked
        else if (bookedDates.includes(dateString)) {
            dayCell.classList.add('booked');
            dayCell.title = 'Already booked';
        }
        // Check if date is selected
        else {
            const selectedIndex = selectedDates.indexOf(dateString);
            if (selectedIndex !== -1) {
                dayCell.classList.add('selected', `priority-${selectedIndex + 1}`);
            }
            
            // Add click handler for available dates
            dayCell.addEventListener('click', () => selectDate(dateString, dayCell));
            dayCell.style.cursor = 'pointer';
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

function selectDate(dateString, dayCell) {
    const index = selectedDates.indexOf(dateString);
    
    if (index !== -1) {
        // Date already selected - remove it
        selectedDates.splice(index, 1);
    } else {
        // Add new date
        if (selectedDates.length >= maxSelections) {
            alert(`You can only select up to ${maxSelections} dates. Please deselect a date first.`);
            return;
        }
        selectedDates.push(dateString);
    }
    
    // Update hidden input
    document.getElementById('selectedDates').value = selectedDates.join(',');
    
    // Re-render calendar to update priorities
    renderCalendar();
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateReadable(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function setupFormSubmit() {
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate at least one date is selected
        if (selectedDates.length === 0) {
            alert('Please select at least one preferred date for your mehndi session.');
            return;
        }
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            weddingDate: document.getElementById('weddingDate').value,
            location: document.getElementById('location').value,
            preferredDates: selectedDates,
            sessionTime: document.querySelector('input[name="sessionTime"]:checked').value,
            budget: document.querySelector('input[name="budget"]:checked').value,
            coverage: document.querySelector('input[name="coverage"]:checked').value
        };
        
        // Display confirmation
        let datesList = selectedDates.map((date, index) => 
            `${index + 1}. ${formatDateReadable(date)} (Priority ${index + 1})`
        ).join('\n');
        
        alert(`Thank you ${formData.fullName}!\n\nYour booking request has been received.\n\nPreferred Dates:\n${datesList}\n\nI'll review your request and get back to you within 48 hours.`);
        
        // Here you would send the data to your backend/email service
        console.log('Booking Data:', formData);
        
        // Optional: Reset form
        // this.reset();
        // selectedDates = [];
        // renderCalendar();
    });
}

