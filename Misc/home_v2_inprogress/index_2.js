// Main JavaScript for the new landing page
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".main-navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Login tab switching
  const loginTabs = document.querySelectorAll(".login-tab")
  const loginForms = document.querySelectorAll(".login-form")

  loginTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all tabs and forms
      loginTabs.forEach((t) => t.classList.remove("active"))
      loginForms.forEach((f) => f.classList.remove("active"))

      // Add active class to clicked tab and corresponding form
      this.classList.add("active")
      document.getElementById(`${targetTab}-form`).classList.add("active")
    })
  })

  // Password toggle functionality
  const passwordToggles = document.querySelectorAll(".password-toggle")

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })

  // Form submission handling
  loginForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitButton = this.querySelector(".login-btn")
      const originalText = submitButton.innerHTML

      // Show loading state
      submitButton.innerHTML = '<span class="loading"></span> Authenticating...'
      submitButton.disabled = true

      // Simulate authentication
      setTimeout(() => {
        // For demo purposes, redirect to dashboard
        window.location.href = "dashboard-tabs.html"
      }, 2000)
    })
  })

  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-4px)"
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".service-card, .feature-item, .visual-card, .feature-card")

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.6s ease"
    observer.observe(element)
  })

  // Stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateStats = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalValue = target.textContent

        if (!isNaN(Number.parseInt(finalValue))) {
          animateNumber(target, 0, Number.parseInt(finalValue), 2000)
        }
      }
    })
  }

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5,
  })

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector("#mobileMenu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      const icon = this.querySelector("i")

      if (mobileMenu.classList.contains("show")) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      } else {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      }
    })
  }

  // Service button actions
  const serviceButtons = document.querySelectorAll(".service-btn.primary")

  serviceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // Scroll to login section
      const loginSection = document.querySelector("#login")
      if (loginSection) {
        const offsetTop = loginSection.offsetTop - 100

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Floating cards animation
  const floatingCards = document.querySelectorAll(".floating-card")

  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Escape to close mobile menu
    if (e.key === "Escape") {
      const mobileMenu = document.querySelector("#mobileMenu")
      if (mobileMenu && mobileMenu.classList.contains("show")) {
        mobileMenu.classList.remove("show")
        const icon = document.querySelector(".mobile-menu-btn i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  })

  // Add loading states for better UX
  const actionButtons = document.querySelectorAll(".action-btn, .hero-btn")

  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.href && this.href.includes("#")) {
        return // Let normal navigation happen
      }

      e.preventDefault()

      const originalText = this.innerHTML
      this.innerHTML = '<span class="loading"></span> Loading...'
      this.disabled = true

      setTimeout(() => {
        this.innerHTML = originalText
        this.disabled = false

        // Show notification
        showNotification("Feature coming soon!", "info")
      }, 1500)
    })
  })
})

// Utility Functions
function animateNumber(element, start, end, duration) {
  const startTime = performance.now()

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = Math.floor(start + (end - start) * progress)
    element.textContent = current

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)} notification-icon"></i>
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    min-width: 300px;
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

function getNotificationIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  }
  return icons[type] || "info-circle"
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .notification-icon {
    color: #3b82f6;
  }
  
  .notification-message {
    flex: 1;
    font-weight: 500;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
  }
  
  .notification-close:hover {
    background: #f3f4f6;
    color: #374151;
  }
`
document.head.appendChild(style)
