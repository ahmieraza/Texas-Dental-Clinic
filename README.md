# Texas Dental Services Website

A complete dental clinic website with integrated admin panel for managing appointment requests.

## Features

### Main Website
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Service Pages**: Detailed information about dental services
- **Gallery**: Showcase of clinic facilities and treatments
- **FAQ Section**: Common questions and answers
- **Contact Form**: Easy appointment booking system
- **SEO Optimized**: Meta tags and structured content for better search rankings

### Admin Panel
- **Secure Login**: Protected admin access (Username: `admin`, Password: `dental2026`)
- **Real-time Dashboard**: Live statistics and notifications
- **Message Management**: View, filter, and manage appointment requests
- **Status Tracking**: Update appointment status (New → Contacted → Confirmed → Done)
- **Export Functionality**: Download appointment data as CSV
- **Search & Filter**: Find specific appointments quickly
- **Responsive Design**: Works on all devices

## How to Use

### For Patients (Website)
1. Visit the website
2. Browse services and gallery
3. Fill out the contact form to request an appointment
4. Provide preferred date and time
5. Wait for clinic staff to contact you

### For Admin (Admin Panel)
1. Click the "Admin" link in the navigation menu
2. Login with credentials:
   - **Username**: `admin`
   - **Password**: `dental2026`
3. View dashboard with appointment statistics
4. Manage appointments:
   - View details by clicking "👁 View"
   - Update status using status buttons
   - Delete unwanted requests
   - Reply via email directly from the panel
5. Use filters to find specific appointments
6. Export data for external use

## File Structure

```
website 1/
├── index.html          # Main homepage
├── services.html       # Services page
├── gallery.html        # Gallery page
├── faq.html           # FAQ page
├── contact.html       # Contact page
├── admin.html         # Admin panel
├── styles.css         # Main stylesheet
├── script.js          # Main JavaScript
├── detail.html        # Gallery detail page
├── detail.js          # Gallery detail JavaScript
├── gallery.js         # Gallery functionality
├── gallery-data.js    # Gallery data
├── gallery images/    # Gallery image files
├── services images/   # Service image files
└── README.md          # This file
```

## Technical Details

### Data Storage
- Appointment requests are stored in browser's localStorage
- Data persists between sessions
- Real-time synchronization between website and admin panel

### Integration
- Contact form automatically saves to admin panel
- Real-time notifications for new appointments
- Seamless data flow between frontend and admin

### Security Features
- Admin panel requires authentication
- Session-based login system
- Input validation and sanitization
- XSS protection

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Setup Instructions

1. Download all files to a folder
2. Open `index.html` in a web browser
3. For admin access, navigate to `admin.html` or click the Admin link
4. Use the provided credentials to login

## Customization

### Changing Admin Credentials
Edit the `admin.html` file and modify these lines:
```javascript
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'dental2026';
```

### Adding New Services
1. Add service images to `services images/` folder
2. Update service listings in HTML files
3. Add corresponding gallery images if needed

### Styling Changes
Modify `styles.css` to change colors, fonts, or layout. The CSS uses CSS custom properties (variables) for easy theming.

## Support

For technical support or customization requests, please contact the development team.

---

**Texas Dental Services** - Professional, affordable, and patient-focused dental care in Houston, Texas.