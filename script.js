// Form handling and validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rentalForm');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');

    // FormSubmit Configuration
    // Replace 'YOUR_EMAIL@example.com' in the form action with your email address
    // FormSubmit is completely free, no signup required!
    // Visit: https://formsubmit.co/

    // Check if form was just submitted (from redirect)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'success') {
        showMessage('Application submitted successfully! We will contact you soon.', 'success');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Show/hide conditional fields based on radio button selections
    function setupConditionalFields() {
        // Other Occupant
        const otherOccupantRadios = document.querySelectorAll('input[name="otherOccupant"]');
        const otherOccupantDesc = document.getElementById('otherOccupantDesc');
        
        otherOccupantRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Yes') {
                    otherOccupantDesc.style.display = 'block';
                    otherOccupantDesc.setAttribute('required', 'required');
                } else {
                    otherOccupantDesc.style.display = 'none';
                    otherOccupantDesc.removeAttribute('required');
                    otherOccupantDesc.value = '';
                }
            });
        });

        // Pets
        const petsRadios = document.querySelectorAll('input[name="pets"]');
        const petsDesc = document.getElementById('petsDesc');
        
        petsRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Yes') {
                    petsDesc.style.display = 'block';
                    petsDesc.setAttribute('required', 'required');
                } else {
                    petsDesc.style.display = 'none';
                    petsDesc.removeAttribute('required');
                    petsDesc.value = '';
                }
            });
        });

        // Vehicle
        const vehicleRadios = document.querySelectorAll('input[name="vehicle"]');
        const vehicleDesc = document.getElementById('vehicleDesc');
        
        vehicleRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Yes') {
                    vehicleDesc.style.display = 'block';
                } else {
                    vehicleDesc.style.display = 'none';
                    vehicleDesc.value = '';
                }
            });
        });

        // Broken Lease
        const brokenLeaseRadios = document.querySelectorAll('input[name="brokenLease"]');
        const brokenLeaseDesc = document.getElementById('brokenLeaseDesc');
        
        brokenLeaseRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Yes') {
                    brokenLeaseDesc.style.display = 'block';
                    brokenLeaseDesc.setAttribute('required', 'required');
                } else {
                    brokenLeaseDesc.style.display = 'none';
                    brokenLeaseDesc.removeAttribute('required');
                    brokenLeaseDesc.value = '';
                }
            });
        });

        // Bankruptcy
        const bankruptcyRadios = document.querySelectorAll('input[name="bankruptcy"]');
        const bankruptcyDesc = document.getElementById('bankruptcyDesc');
        
        bankruptcyRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Yes') {
                    bankruptcyDesc.style.display = 'block';
                    bankruptcyDesc.setAttribute('required', 'required');
                } else {
                    bankruptcyDesc.style.display = 'none';
                    bankruptcyDesc.removeAttribute('required');
                    bankruptcyDesc.value = '';
                }
            });
        });
    }

    // Initialize conditional fields
    setupConditionalFields();

    // Validate date fields
    function validateDates() {
        const moveInDate = document.getElementById('moveInDate').value;
        const moveOutDate = document.getElementById('moveOutDate').value;
        const dob = document.getElementById('dob').value;
        const dateSigning = document.getElementById('dateSigning').value;

        if (moveInDate && moveOutDate) {
            if (new Date(moveInDate) >= new Date(moveOutDate)) {
                showMessage('Move-in date must be before move-out date.', 'error');
                return false;
            }
        }

        if (dob) {
            const birthDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                showMessage('You must be at least 18 years old to submit this application.', 'error');
                return false;
            }
        }

        return true;
    }

    // Show message function
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Format form data for email
    function formatFormData(formData) {
        let formatted = '';
        
        const fieldLabels = {
            name: 'Name',
            dob: 'Date of Birth',
            email: 'Email',
            phone: 'Home Phone Number',
            relationship: 'Relationship',
            currentAddress: 'Current Address',
            otherOccupant: 'Other Occupant',
            otherOccupantDesc: 'Other Occupant Description',
            pets: 'Do you have any pets',
            petsDesc: 'Pets Description',
            vehicle: 'Do you have a vehicle',
            vehicleDesc: 'Vehicle Description',
            smoking: 'Smoking',
            convicted: 'Have you ever been convicted before',
            brokenLease: 'Have you ever broken a lease',
            brokenLeaseDesc: 'Broken Lease Explanation',
            bankruptcy: 'Have you ever declared bankruptcy',
            bankruptcyDesc: 'Bankruptcy Explanation',
            previousLandlordName: 'Previous Landlord / Manager Name',
            previousLandlordNumber: 'Previous Landlord / Manager Number',
            currentLandlordAddress: 'Current Landlord / Manager Address',
            monthlyPayment: 'Monthly Payment / Rental Amount',
            grossIncome: 'Gross Income',
            employed: 'Are you currently employed',
            employmentLength: 'Length of Employment',
            monthlySalary: 'Monthly Salary (USD)',
            moveInDate: 'Move in Date',
            moveOutDate: 'Move out Date',
            reasonForLeaving: 'Reason for Leaving Current Address',
            numberOfPeople: 'Number of People Staying',
            startStaying: 'When would you like to start staying',
            creditScore: 'Credit Score',
            keysTimeline: 'How soon do you intend to receive the keys/documents of the property',
            depositTimeline: 'How soon do you intend to pay security deposit',
            rentTimeline: 'How soon do you intend to pay rent',
            paymentMethod: 'Payment Method',
            certification: 'Certification',
            dateSigning: 'Date of Signing',
            signature: 'Signature by name'
        };

        for (let [key, value] of formData.entries()) {
            const label = fieldLabels[key] || key;
            
            // Skip empty values (except for required fields that might be empty conditionally)
            if (!value && key !== 'otherOccupantDesc' && key !== 'petsDesc' && key !== 'vehicleDesc' && 
                key !== 'brokenLeaseDesc' && key !== 'bankruptcyDesc') {
                continue;
            }
            
            // Format currency fields
            if (key === 'monthlyPayment' || key === 'grossIncome' || key === 'monthlySalary') {
                value = '$' + parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            
            formatted += `${label}: ${value}\n`;
        }

        return formatted;
    }

    // Handle form submission
    const handleSubmit = async function(e) {
        e.preventDefault();

        // Validate dates
        if (!validateDates()) {
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        messageDiv.style.display = 'none';

        // Collect form data
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData);
        
        // Format data for email body
        const emailBody = formatFormData(formData);

        // Check if email is configured in form action
        const formAction = form.getAttribute('action');
        if (!formAction || formAction.includes('YOUR_EMAIL@example.com')) {
            showMessage('Please configure your email address in the form action attribute.', 'error');
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            return;
        }

        // Add hidden fields for FormSubmit
        // Remove existing hidden fields if any
        const existingHidden = form.querySelectorAll('input[type="hidden"]');
        existingHidden.forEach(field => {
            if (field.name === '_subject' || field.name === '_template' || field.name === '_captcha' || field.name === '_next') {
                field.remove();
            }
        });

        // Add subject
        const subjectField = document.createElement('input');
        subjectField.type = 'hidden';
        subjectField.name = '_subject';
        subjectField.value = `New Rental Application from ${formDataObj.name || 'Applicant'}`;
        form.appendChild(subjectField);

        // Add template (optional - for custom formatting)
        const templateField = document.createElement('input');
        templateField.type = 'hidden';
        templateField.name = '_template';
        templateField.value = 'table';
        form.appendChild(templateField);

        // Submit to FormSubmit using fetch (AJAX)
        try {
            // Add _next field to redirect back to same page (optional - for better UX)
            const nextField = document.createElement('input');
            nextField.type = 'hidden';
            nextField.name = '_next';
            nextField.value = window.location.href + '?submitted=success';
            form.appendChild(nextField);

            // Create FormData with all fields
            const submitData = new FormData(form);
            
            // Send to FormSubmit
            const response = await fetch(formAction, {
                method: 'POST',
                body: submitData,
                redirect: 'follow'
            });

            // FormSubmit returns a success response if submission works
            if (response.ok || response.redirected) {
                showMessage('Application submitted successfully! We will contact you soon.', 'success');
                form.reset();
                
                // Hide all conditional fields
                document.querySelectorAll('.conditional-field').forEach(field => {
                    field.style.display = 'none';
                });
                
                // Remove success parameter from URL if present
                if (window.location.search.includes('submitted=success')) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('FormSubmit Error:', error);
            showMessage('Failed to submit. Please try again or refresh the page.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    };

    form.addEventListener('submit', handleSubmit);

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = '';
            }
        });
    });
});

