// Our Safe Space App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("O3EEEg_1KswlH-sWA"); // Replace with actual EmailJS public key
    
    // Get page elements
    const mainPage = document.getElementById('main-page');
    const successPage = document.getElementById('success-page');
    const complaintForm = document.getElementById('complaint-form');
    const newComplaintBtn = document.getElementById('new-complaint-btn');
    const closeAppBtn = document.getElementById('close-app-btn');

    // Photo upload elements
    const photoFrame = document.getElementById('photo-frame');
    const photoInput = document.getElementById('photo-input');
    const uploadedPhoto = document.getElementById('uploaded-photo');
    const photoPlaceholder = document.getElementById('photo-placeholder');

    // Modal elements
    const appreciationModal = document.getElementById('appreciation-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    // Form elements
    const complaintText = document.getElementById('complaint-text');
    const angerLevel = document.getElementById('anger-level');
    const seriousness = document.getElementById('seriousness');

    // Appreciation details data
    const appreciationDetails = [
        {
            title: "Your brilliant mind 🧠",
            description: "Honestly, the way your brain works is amazing. Your intelligence is something to rely on and inspiring. I like your take on things, your perspective gives me a new way of seeing things. Plus, you're clever enough to keep me on my toes, which I like."
        },
        {
            title: "Your amazing perspective 🌟",
            description: "You have this Awesome ability to see things from angles which I miss. You know, When my head goes rouge... (which to be honest happens more time than I care to admit), your perspectives are a good way to recalibrate myself, its like a breath of fresh air. You help me understand things better, and that means more to me than you probably realize."
        },
        {
            title: "Your honest feedback 🗣️",
            description: "I genuinely appreciate that you tell me things straight up. No sugar-coating, no walking on eggshells... just honest, thoughtful feedback. It shows you care enough to help me be better, and that kind of honesty is rare and precious. Even when it stings a bit, I'm grateful for it."
        },
        {
            title: "Your sense of humor 😄",
            description: "Your humor is absolutely humouurous. You have this way of making me laugh even when I'm being dramatic or overthinking everything. You have a sharp wit, your timings are undoubtedly perfect, and honestly, some of your jokes live rent-free in my head for weeks. You make everything more fun."
        },
        {
            title: "Your friendship 💫",
            description: "Having you in my life and that too by my side is honestly one of the best things that's happened to me, and I know I am very lucky. You're the kind of friend who makes me want to be better while accepting me exactly as I am (disasters and all). I'm grateful for every conversation, every shared laugh, and every moment you choose to spend with this mess."
        }
    ];

    // Bollywood rom-com severity responses
    const bollywoodResponses = [
        "Aww, this is like a cute rom-com moment! 🌸",
        "Classic Bollywood timing issues! 😅", 
        "The misunderstanding trope strikes again! 🎭",
        "Ah, the pride problem - tale as old as time! 💫",
        "Communication issues worthy of a film plot! 🎬",
        "Family drama level activated! 🎪",
        "Grand gesture gone wrong territory! 🎯",
        "Overhearing drama - very cinematic! 🎦",
        "We're in climax territory now! 🎢",
        "UNIVERSE EXPLOSION MODE! 💥🌌"
    ];

    // Page navigation functions
    function showPage(pageToShow) {
        // Hide all pages
        mainPage.style.display = 'none';
        successPage.style.display = 'none';
        
        // Remove classes
        mainPage.classList.remove('active');
        successPage.classList.remove('active');
        mainPage.classList.add('hidden');
        successPage.classList.add('hidden');
        
        // Show the selected page
        pageToShow.style.display = 'block';
        pageToShow.classList.remove('hidden');
        pageToShow.classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Photo upload functionality
    function initializePhotoUpload() {
        // Load saved photo from localStorage (skip in demo mode)
        try {
            const savedPhoto = localStorage.getItem('ourPhoto');
            if (savedPhoto) {
                uploadedPhoto.src = savedPhoto;
                uploadedPhoto.classList.remove('hidden');
                photoPlaceholder.style.display = 'none';
            }
        } catch (error) {
            console.log('localStorage not available');
        }

        // Handle photo frame click - simplified approach
        photoFrame.addEventListener('click', function(e) {
            // Always trigger file input when photo frame is clicked
            e.preventDefault();
            e.stopPropagation();
            photoInput.click();
        });

        // Handle file selection
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = e.target.result;
                    uploadedPhoto.src = imageData;
                    uploadedPhoto.classList.remove('hidden');
                    photoPlaceholder.style.display = 'none';
                    
                    // Try to save to localStorage (will fail silently in demo)
                    try {
                        localStorage.setItem('ourPhoto', imageData);
                    } catch (error) {
                        console.log('Could not save photo to storage:', error);
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        // Handle photo removal (right-click or long press)
        photoFrame.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            if (!uploadedPhoto.classList.contains('hidden')) {
                const confirmRemove = confirm('Remove this photo?');
                if (confirmRemove) {
                    removePhoto();
                }
            }
        });
    }

    function removePhoto() {
        uploadedPhoto.src = '';
        uploadedPhoto.classList.add('hidden');
        photoPlaceholder.style.display = 'flex';
        photoInput.value = '';
        try {
            localStorage.removeItem('ourPhoto');
        } catch (error) {
            console.log('Could not remove photo from storage:', error);
        }
    }

    // Appreciation tiles functionality
    function initializeAppreciationTiles() {
        const appreciationTiles = document.querySelectorAll('.appreciation-tile');
        
        appreciationTiles.forEach((tile, index) => {
            tile.addEventListener('click', function() {
                showAppreciationModal(index);
            });
            
            // Add keyboard support
            tile.setAttribute('tabindex', '0');
            tile.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showAppreciationModal(index);
                }
            });
        });

        // Modal close functionality
        modalClose.addEventListener('click', closeAppreciationModal);
        
        // Close modal when clicking backdrop
        appreciationModal.addEventListener('click', function(e) {
            if (e.target === appreciationModal || e.target.classList.contains('modal-backdrop')) {
                closeAppreciationModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !appreciationModal.classList.contains('hidden')) {
                closeAppreciationModal();
            }
        });
    }

    function showAppreciationModal(index) {
        const detail = appreciationDetails[index];
        modalTitle.textContent = detail.title;
        modalDescription.textContent = detail.description;
        appreciationModal.classList.remove('hidden');
        modalClose.focus();
    }

    function closeAppreciationModal() {
        appreciationModal.classList.add('hidden');
    }

    // Initialize app - make sure main page is shown
    function initializeApp() {
        showPage(mainPage);
        initializePhotoUpload();
        initializeAppreciationTiles();
        console.log('App initialized, main page shown');
    }

    // Handle form submission
    complaintForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted!');
        
        // Get form data
        const selectedSeverity = document.querySelector('input[name="severity"]:checked');
        const formData = {
            complaint: complaintText.value.trim(),
            severity: selectedSeverity ? selectedSeverity.value : null,
            severityDescription: selectedSeverity ? selectedSeverity.nextElementSibling.querySelector('.severity-desc').textContent : null,
            angerLevel: angerLevel.value,
            angerDescription: angerLevel.selectedOptions[0]?.textContent || '',
            seriousness: seriousness.value,
            seriousnessDescription: seriousness.selectedOptions[0]?.textContent || '',
            timestamp: new Date().toLocaleString()
        };

        console.log('Form data:', formData);

        // Validate required fields
        if (!formData.complaint) {
            alert('Please share what\'s on your mind! 💕');
            complaintText.focus();
            return;
        }

        if (!formData.severity) {
            alert('Please let me know how severe this is on our Bollywood scale! 🎬');
            document.querySelector('.severity-scale').scrollIntoView({ behavior: 'smooth' });
            return;
        }

        if (!formData.angerLevel) {
            alert('Please tell me how mad you are right now! 😤');
            angerLevel.focus();
            return;
        }

        if (!formData.seriousness) {
            alert('Please let me know how serious this situation is! 🚨');
            seriousness.focus();
            return;
        }

        // Add submit animation
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending to your favorite dummy... 💌';
        submitBtn.disabled = true;
        
        // Attempt to send email via EmailJS (will fail silently if not configured)
        const emailData = {
            complaint: formData.complaint,
            severity: `Level ${formData.severity}: ${formData.severityDescription}`,
            anger_level: formData.angerDescription,
            seriousness: formData.seriousnessDescription,
            timestamp: formData.timestamp,
            from_name: 'Our Safe Space App'
        };

        // Try to send email (will fail gracefully if EmailJS not configured)
        emailjs.send('service_tqtj43b', 'template_z0qhxt9', emailData)
            .then(function(response) {
                console.log('Email sent successfully:', response);
            })
            .catch(function(error) {
                console.log('Email sending failed (this is expected in demo):', error);
            });
        
        // Simulate processing time and show success page
        setTimeout(() => {
            console.log('Showing success page...');
            
            // Customize success message based on severity and anger level
            customizeSuccessMessage(formData);
            
            // Show success page
            showPage(successPage);
            
            // Reset button for next time
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            console.log('Success page should now be visible');
        }, 1500);
    });

    // Customize success message based on form data
    function customizeSuccessMessage(data) {
        const severityLevel = parseInt(data.severity);
        const angerLevel = parseInt(data.angerLevel);
        
        // Remove any existing personalized messages first
        const existingPersonalized = document.querySelectorAll('.personalized-message');
        existingPersonalized.forEach(msg => msg.remove());
        
        // Get the success messages container
        const successMessages = document.querySelector('.success-messages');
        
        // Add a personalized message based on severity and anger
        let personalizedMessage = '';
        
        if (severityLevel >= 8 || angerLevel >= 5) {
            personalizedMessage = `
                <div class="success-message personalized-message" style="background: var(--color-bg-4); border: 2px solid var(--color-error);">
                    <h3>🚨 Priority Alert: I need to step up!</h3>
                    <p>This seems pretty serious (level ${severityLevel} - ${bollywoodResponses[severityLevel-1]}), and I can tell you're really upset. I'm going to give this my full attention because you deserve better than whatever I did.</p>
                </div>
            `;
        } else if (severityLevel >= 5 || angerLevel >= 3) {
            personalizedMessage = `
                <div class="success-message personalized-message" style="background: var(--color-bg-6);">
                    <h3>📈 Medium Priority: Time for some improvement!</h3>
                    <p>I can see this is bothering you more than a little bit (level ${severityLevel} - ${bollywoodResponses[severityLevel-1]}). Let me work on this and show you that I'm listening.</p>
                </div>
            `;
        } else {
            personalizedMessage = `
                <div class="success-message personalized-message" style="background: var(--color-bg-3);">
                    <h3>💚 Gentle Nudge Received!</h3>
                    <p>Thank you for sharing this with me in such a sweet way. Even the small things (level ${severityLevel} - ${bollywoodResponses[severityLevel-1]}) matter when it comes to us.</p>
                </div>
            `;
        }
        
        // Add the personalized message to the end
        successMessages.insertAdjacentHTML('beforeend', personalizedMessage);
    }

    // Handle "Got more to say?" button
    if (newComplaintBtn) {
        newComplaintBtn.addEventListener('click', function() {
            console.log('New complaint button clicked');
            
            // Clear the form for a fresh start
            complaintForm.reset();
            
            // Clear any interactive feedback elements
            const feedbackElements = document.querySelectorAll('.textarea-encouragement, .severity-feedback, .anger-response');
            feedbackElements.forEach(el => el.remove());
            
            // Show main page
            showPage(mainPage);
            
            // Focus on the textarea
            setTimeout(() => {
                complaintText.focus();
            }, 100);
        });
    }

    // Handle "I feel better now" button
    if (closeAppBtn) {
        closeAppBtn.addEventListener('click', function() {
            console.log('Close app button clicked');
            
            // Show a sweet goodbye message
            const goodbyeMessage = document.createElement('div');
            goodbyeMessage.innerHTML = `
                <div class="container">
                    <div style="text-align: center; padding: var(--space-32); background: var(--color-bg-1); border-radius: var(--radius-lg); margin: var(--space-32); border: 2px solid var(--color-primary);">
                        <h1>Thank you for trusting me with your feelings 💗</h1>
                        <p style="font-size: var(--font-size-lg); color: var(--color-text-secondary); margin-bottom: var(--space-24);">
                            You're amazing, and I'm lucky to have someone who cares enough to help me be better.
                        </p>
                        <p style="font-size: var(--font-size-md); color: var(--color-text-secondary); font-style: italic; margin-bottom: var(--space-24);">
                            This app will always be here when you need it. ❤️
                        </p>
                        <button onclick="location.reload()" class="btn btn--primary btn--lg">
                            Start Fresh 🌟
                        </button>
                    </div>
                </div>
                <footer class="app-footer">
                    <p class="disclaimer">Made with love by someone who cares about you more than they show ❤️</p>
                </footer>
            `;
            
            document.body.innerHTML = '';
            document.body.appendChild(goodbyeMessage);
        });
    }

    // Add some interactive enhancements
    
    // Textarea character counter with encouragement
    complaintText.addEventListener('input', function() {
        const charCount = this.value.length;
        let encouragement = '';
        
        if (charCount === 0) {
            encouragement = 'Your thoughts matter to me 💭';
        } else if (charCount < 50) {
            encouragement = 'Keep going, I\'m listening... 👂';
        } else if (charCount < 200) {
            encouragement = 'Perfect! Let it all out 💪';
        } else {
            encouragement = 'Wow, you really had a lot to say! I appreciate the detail ✨';
        }
        
        // Find or create encouragement element
        let encouragementEl = document.querySelector('.textarea-encouragement');
        if (!encouragementEl) {
            encouragementEl = document.createElement('div');
            encouragementEl.className = 'textarea-encouragement';
            encouragementEl.style.cssText = `
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
                margin-top: var(--space-8);
                font-style: italic;
                text-align: center;
            `;
            this.parentNode.appendChild(encouragementEl);
        }
        
        encouragementEl.textContent = encouragement;
    });

    // Severity scale visual feedback
    document.querySelectorAll('input[name="severity"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const level = parseInt(this.value);
            const feedback = bollywoodResponses[level - 1];
            
            // Find or create feedback element
            let feedbackEl = document.querySelector('.severity-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.className = 'severity-feedback';
                feedbackEl.style.cssText = `
                    text-align: center;
                    font-size: var(--font-size-sm);
                    color: var(--color-primary);
                    margin-top: var(--space-12);
                    font-weight: var(--font-weight-medium);
                    padding: var(--space-8);
                    background: var(--color-bg-1);
                    border-radius: var(--radius-base);
                `;
                document.querySelector('.severity-scale').appendChild(feedbackEl);
            }
            
            feedbackEl.textContent = feedback;
        });
    });

    // Anger level feedback
    angerLevel.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value) {
            let response = '';
            const angerValue = parseInt(selectedOption.value);
            
            if (angerValue <= 1) {
                response = 'I love how understanding you are 💕';
            } else if (angerValue <= 3) {
                response = 'I can work with this level of frustration 💪';
            } else if (angerValue <= 5) {
                response = 'Okay, I clearly messed up. Time to make amends! 🛠️';
            } else {
                response = 'I\'m in big trouble, aren\'t I? Emergency friend mode activated! 🆘';
            }
            
            // Find or create response element
            let responseEl = document.querySelector('.anger-response');
            if (!responseEl) {
                responseEl = document.createElement('div');
                responseEl.className = 'anger-response';
                responseEl.style.cssText = `
                    font-size: var(--font-size-sm);
                    color: var(--color-primary);
                    margin-top: var(--space-8);
                    font-style: italic;
                    text-align: center;
                    padding: var(--space-6);
                    background: var(--color-bg-2);
                    border-radius: var(--radius-base);
                `;
                this.parentNode.appendChild(responseEl);
            }
            
            responseEl.textContent = response;
        }
    });

    // Add some fun hover effects to the severity options
    document.querySelectorAll('.severity-option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Initialize the app
    initializeApp();
    console.log('Our Safe Space app loaded successfully! 💕');
    
    // Focus on the main textarea when the page loads
    setTimeout(() => {
        if (complaintText && mainPage.classList.contains('active')) {
            complaintText.focus();
        }
    }, 500);
});