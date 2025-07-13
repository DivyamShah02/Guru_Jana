// Dashboard functionality
document.addEventListener("DOMContentLoaded", () => {
  // Search functionality
  const searchInput = document.querySelector(".search-input")
  const toolCards = document.querySelectorAll(".tool-card")

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()

      toolCards.forEach((card) => {
        const title = card.querySelector(".tool-title").textContent.toLowerCase()
        const description = card.querySelector(".tool-description").textContent.toLowerCase()

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.closest(".col-lg-6").style.display = "block"
        } else {
          card.closest(".col-lg-6").style.display = "none"
        }
      })
    })
  }

  // Tool card launch functionality
  const launchButtons = document.querySelectorAll(".tool-card .btn-primary")

  launchButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const toolTitle = this.closest(".tool-card").querySelector(".tool-title").textContent

      // Add loading state
      this.innerHTML = '<span class="loading"></span>'
      this.disabled = true

      // Simulate loading
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-play me-2"></i>Launch'
        this.disabled = false

        // Here you would typically redirect to the actual tool
        console.log(`Launching ${toolTitle}...`)
        // window.location.href = `/tools/${toolTitle.toLowerCase().replace(/\s+/g, '-')}`;
      }, 2000)
    })
  })

  // Info button functionality
  const infoButtons = document.querySelectorAll(".tool-card .btn-outline-secondary")

  infoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const toolTitle = this.closest(".tool-card").querySelector(".tool-title").textContent
      const toolDescription = this.closest(".tool-card").querySelector(".tool-description").textContent

      // Create and show modal or tooltip with tool information
      alert(`${toolTitle}\n\n${toolDescription}\n\nMore detailed information would be shown in a modal.`)
    })
  })

  // Notify me buttons for coming soon sections
  const notifyButtons = document.querySelectorAll(".coming-soon-content .btn-outline-primary")

  notifyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const categoryTitle = this.closest(".coming-soon-content").querySelector(".coming-soon-title").textContent

      // Add loading state
      const originalText = this.innerHTML
      this.innerHTML = '<span class="loading"></span>'
      this.disabled = true

      // Simulate API call
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check me-2"></i>Notified!'
        this.classList.remove("btn-outline-primary")
        this.classList.add("btn-success")

        // Reset after 3 seconds
        setTimeout(() => {
          this.innerHTML = originalText
          this.classList.remove("btn-success")
          this.classList.add("btn-outline-primary")
          this.disabled = false
        }, 3000)
      }, 1500)
    })
  })

  // Tab switching analytics (optional)
  const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]')

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabName = this.getAttribute("aria-controls")
      console.log(`User switched to ${tabName} tab`)

      // Here you could send analytics data
      // analytics.track('tab_switched', { tab: tabName });
    })
  })

  // Add smooth animations to tool cards
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

  // Observe all tool cards for animation
  toolCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
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

  // Number keys 1-5 to switch tabs
  if (e.key >= "1" && e.key <= "5") {
    const tabIndex = Number.parseInt(e.key) - 1
    const tabs = document.querySelectorAll('[data-bs-toggle="pill"]')
    if (tabs[tabIndex]) {
      tabs[tabIndex].click()
    }
  }
})
