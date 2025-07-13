// Modern JavaScript for enhanced interactions
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".modern-navbar")

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
      scrollToSection(targetId)
    })
  })

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector("#mobileMenu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      const spans = this.querySelectorAll("span")

      if (mobileMenu.classList.contains("show")) {
        spans[0].style.transform = "rotate(0deg) translateY(0px)"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "rotate(0deg) translateY(0px)"
      } else {
        spans[0].style.transform = "rotate(45deg) translateY(6px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translateY(-6px)"
      }
    })
  }

  // Animated counter for stats
  const statNumbers = document.querySelectorAll(".stat-number[data-target]")

  const animateStats = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalValue = Number.parseInt(target.getAttribute("data-target"))
        animateNumber(target, 0, finalValue, 2000)
      }
    })
  }

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5,
  })

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
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

  // Form submission with loading state
  const loginForm = document.querySelector(".login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitButton = this.querySelector(".login-btn")
      const btnText = submitButton.querySelector(".btn-text")
      const btnLoading = submitButton.querySelector(".btn-loading")

      // Show loading state
      btnText.style.opacity = "0"
      btnLoading.style.opacity = "1"
      submitButton.disabled = true

      // Simulate authentication
      setTimeout(() => {
        // For demo purposes, redirect to dashboard
        window.location.href = "dashboard-tabs.html"
      }, 2000)
    })
  }

  // Service button actions
  const serviceButtons = document.querySelectorAll(".service-btn")

  serviceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      scrollToSection("#login")
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
  const animatedElements = document.querySelectorAll(".service-card, .value-card, .security-item, .contact-method")

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.6s ease"
    observer.observe(element)
  })

  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".gradient-orb")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Dynamic particle generation
  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDuration = Math.random() * 3 + 2 + "s"
    particle.style.animationDelay = Math.random() * 2 + "s"

    const particleContainer = document.querySelector(".floating-particles")
    if (particleContainer) {
      particleContainer.appendChild(particle)

      // Remove particle after animation
      setTimeout(() => {
        particle.remove()
      }, 5000)
    }
  }

  // Generate particles periodically
  setInterval(createParticle, 2000)

  // Enhanced button interactions
  const heroButtons = document.querySelectorAll(".hero-btn")

  heroButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      const particles = this.querySelector(".btn-particles")
      if (particles) {
        particles.style.opacity = "1"
      }
    })

    button.addEventListener("mouseleave", function () {
      const particles = this.querySelector(".btn-particles")
      if (particles) {
        particles.style.opacity = "0"
      }
    })
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Escape to close mobile menu
    if (e.key === "Escape") {
      const mobileMenu = document.querySelector("#mobileMenu")
      if (mobileMenu && mobileMenu.classList.contains("show")) {
        mobileMenu.classList.remove("show")
        const spans = document.querySelectorAll(".mobile-menu-btn span")
        spans[0].style.transform = "rotate(0deg) translateY(0px)"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "rotate(0deg) translateY(0px)"
      }
    }

    // Ctrl/Cmd + K to focus on search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      // Focus search input if available
    }
  })

  // Advanced hover effects for service cards
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)"
    })
  })

  // Scroll indicator functionality
  const scrollIndicator = document.querySelector(".scroll-indicator")

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      scrollToSection("#about")
    })

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0"
      } else {
        scrollIndicator.style.opacity = "1"
      }
    })
  }

  // Form input enhancements
  const formInputs = document.querySelectorAll(".form-control")

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      const glow = this.parentElement.querySelector(".input-glow")
      if (glow) {
        glow.style.opacity = "0.3"
      }
    })

    input.addEventListener("blur", function () {
      const glow = this.parentElement.querySelector(".input-glow")
      if (glow) {
        glow.style.opacity = "0"
      }
    })
  })

  // Loading states for action buttons
  const actionButtons = document.querySelectorAll(".action-btn")

  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.textContent.includes("Manual") || this.textContent.includes("Agent")) {
        e.preventDefault()

        const originalText = this.innerHTML
        this.innerHTML = '<span class="loading-spinner"></span> Loading...'
        this.disabled = true

        setTimeout(() => {
          this.innerHTML = originalText
          this.disabled = false
          showNotification("Feature coming soon!", "info")
        }, 1500)
      }
    })
  })
})

// Utility Functions
function scrollToSection(targetId) {
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 100

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

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
    background: rgba(15, 15, 35, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    padding: 1rem;
    min-width: 300px;
    animation: slideIn 0.3s ease;
    color: white;
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

// Add CSS animations for notifications
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
    color: #4facfe;
  }
  
  .notification-message {
    flex: 1;
    font-weight: 500;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
  }
  
  .notification-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
`
document.head.appendChild(style)

// Performance optimization
window.addEventListener("load", () => {
  // Preload critical images
  const criticalImages = ["assets/gurujana-logo.gif"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})

// Export functions for global use
window.CA_PORTAL_MODERN = {
  scrollToSection,
  showNotification,
  animateNumber,
}
