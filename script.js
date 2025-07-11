// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    observer.observe(card)
  })

  // Observe tool cards
  const toolCards = document.querySelectorAll(".tool-card")
  toolCards.forEach((card) => {
    observer.observe(card)
  })

  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-btn")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Update form based on selected tab
      updateLoginForm(this.textContent.trim())
    })
  })

  // Search functionality for dashboard
  const searchInput = document.querySelector(".search-input")

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const toolCards = document.querySelectorAll(".tool-card")

      toolCards.forEach((card) => {
        const title = card.querySelector(".tool-title").textContent.toLowerCase()
        const description = card.querySelector(".tool-description").textContent.toLowerCase()

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.parentElement.style.display = "block"
        } else {
          card.parentElement.style.display = "none"
        }
      })
    })
  }

  // Tool launch functionality
  const launchButtons = document.querySelectorAll(".tool-actions .btn-primary")

  launchButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const toolCard = this.closest(".tool-card")
      const toolTitle = toolCard.querySelector(".tool-title").textContent

      // Show loading state
      const originalText = this.innerHTML
      this.innerHTML = '<span class="loading"></span> Loading...'
      this.disabled = true

      // Simulate loading
      setTimeout(() => {
        alert(`Launching ${toolTitle}...\n\nThis would open the AI interface for ${toolTitle}.`)

        // Reset button
        this.innerHTML = originalText
        this.disabled = false
      }, 2000)
    })
  })

  // Form submission handling
  const loginForm = document.querySelector(".login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      // Show loading state
      submitButton.innerHTML = '<span class="loading"></span> Authenticating...'
      submitButton.disabled = true

      // Simulate authentication
      setTimeout(() => {
        // For demo purposes, always redirect to dashboard
        window.location.href = "dashboard.html"
      }, 2000)
    })
  }

  // Floating animation for hero elements
  const floatingCards = document.querySelectorAll(".floating-card")

  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`
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

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      const searchInput = document.querySelector(".search-input")
      if (searchInput) {
        searchInput.focus()
      }
    }

    // Escape to clear search
    if (e.key === "Escape") {
      const searchInput = document.querySelector(".search-input")
      if (searchInput && searchInput === document.activeElement) {
        searchInput.value = ""
        searchInput.dispatchEvent(new Event("input"))
        searchInput.blur()
      }
    }
  })
})

// Helper Functions
function updateLoginForm(tabType) {
  const form = document.querySelector(".login-form")
  const employeeIdInput = form.querySelector('input[type="text"]')
  const label = form.querySelector(".form-label")

  switch (tabType) {
    case "Employee Login":
      label.textContent = "Employee ID"
      employeeIdInput.placeholder = "Enter your Employee ID"
      break
    case "Admin Login":
      label.textContent = "Admin ID"
      employeeIdInput.placeholder = "Enter your Admin ID"
      break
    case "Guest Access":
      label.textContent = "Guest ID"
      employeeIdInput.placeholder = "Enter your Guest ID"
      break
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

// Utility functions for dashboard
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} position-fixed`
  notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"} me-2"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Add CSS for notification animation
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
    
    .navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.98) !important;
        backdrop-filter: blur(20px);
    }
`
document.head.appendChild(style)

// Initialize tooltips if Bootstrap is available
const bootstrap = window.bootstrap // Declare the bootstrap variable
if (typeof bootstrap !== "undefined") {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages)

// Add loading states for better UX
function addLoadingState(button) {
  const originalText = button.innerHTML
  button.innerHTML = '<span class="loading"></span> Loading...'
  button.disabled = true

  return function removeLoadingState() {
    button.innerHTML = originalText
    button.disabled = false
  }
}

// Export functions for global use
window.CA_PORTAL = {
  showNotification,
  addLoadingState,
  updateLoginForm,
  animateNumber,
}
