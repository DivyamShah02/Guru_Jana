// Tab functionality
document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all tabs and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked tab and corresponding pane
      this.classList.add("active")
      document.getElementById(targetTab).classList.add("active")

      // Add smooth transition effect
      const activePane = document.getElementById(targetTab)
      activePane.style.opacity = "0"
      activePane.style.transform = "translateY(20px)"

      setTimeout(() => {
        activePane.style.opacity = "1"
        activePane.style.transform = "translateY(0)"
      }, 50)
    })
  })

  // Search functionality
  const searchInput = document.querySelector(".search-input")

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const toolCards = document.querySelectorAll(".gpt-tool-card")

    toolCards.forEach((card) => {
      const title = card.querySelector(".tool-title").textContent.toLowerCase()
      const description = card.querySelector(".tool-description").textContent.toLowerCase()
      const features = Array.from(card.querySelectorAll(".feature-tag"))
        .map((tag) => tag.textContent.toLowerCase())
        .join(" ")

      if (title.includes(searchTerm) || description.includes(searchTerm) || features.includes(searchTerm)) {
        card.style.display = "block"
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(10px)"
        setTimeout(() => {
          if (!title.includes(searchTerm) && !description.includes(searchTerm) && !features.includes(searchTerm)) {
            card.style.display = "none"
          }
        }, 300)
      }
    })
  })

  // Tool launch functionality
  const launchButtons = document.querySelectorAll(".tool-btn.primary")

  launchButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const toolCard = this.closest(".gpt-tool-card")
      const toolTitle = toolCard.querySelector(".tool-title").textContent

      // Add loading state
      const originalText = this.innerHTML
      this.innerHTML = '<span class="loading"></span> Launching...'
      this.disabled = true

      // Simulate loading
      setTimeout(() => {
        // Show success message
        showNotification(`${toolTitle} is launching...`, "success")

        // Reset button
        this.innerHTML = originalText
        this.disabled = false

        // In a real application, this would open the GPT interface
        console.log(`Launching ${toolTitle}`)
      }, 2000)
    })
  })

  // Voice search functionality
  const voiceSearchBtn = document.querySelector(".voice-search-btn")

  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    voiceSearchBtn.addEventListener("click", function () {
      recognition.start()
      this.innerHTML = '<i class="fas fa-microphone-slash"></i>'
      this.style.color = "#ef4444"
    })

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      searchInput.value = transcript
      searchInput.dispatchEvent(new Event("input"))
    }

    recognition.onend = () => {
      voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>'
      voiceSearchBtn.style.color = ""
    }
  } else {
    voiceSearchBtn.style.display = "none"
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      searchInput.focus()
    }

    // Escape to clear search
    if (e.key === "Escape") {
      if (searchInput === document.activeElement) {
        searchInput.value = ""
        searchInput.dispatchEvent(new Event("input"))
        searchInput.blur()
      }
    }

    // Number keys to switch tabs (1-6)
    if (e.key >= "1" && e.key <= "6" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const tabIndex = Number.parseInt(e.key) - 1
      const tabButton = tabButtons[tabIndex]
      if (tabButton) {
        tabButton.click()
      }
    }
  })

  // Smooth scrolling for better UX
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

  // Observe tool cards for animation
  const toolCards = document.querySelectorAll(".gpt-tool-card")
  toolCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })

  // Filter and sort functionality
  const filterBtn = document.querySelector(".filter-btn")
  const sortBtn = document.querySelector(".sort-btn")

  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      // Toggle filter options (placeholder for future implementation)
      showNotification("Filter options coming soon!", "info")
    })
  }

  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      // Toggle sort options (placeholder for future implementation)
      showNotification("Sort options coming soon!", "info")
    })
  }

  // Initialize tooltips for info buttons
  const infoButtons = document.querySelectorAll(".tool-btn.secondary")
  infoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const toolCard = this.closest(".gpt-tool-card")
      const toolTitle = toolCard.querySelector(".tool-title").textContent
      const toolDescription = toolCard.querySelector(".tool-description").textContent

      showModal(toolTitle, toolDescription)
    })
  })
})

// Utility functions
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

function showModal(title, description) {
  const modal = document.createElement("div")
  modal.className = "custom-modal"
  modal.innerHTML = `
        <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="this.closest('.custom-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>${description}</p>
                <div class="modal-features">
                    <h4>Key Features:</h4>
                    <ul>
                        <li>AI-powered assistance</li>
                        <li>Real-time updates</li>
                        <li>Professional guidance</li>
                        <li>24/7 availability</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.custom-modal').remove()">
                    <i class="fas fa-play me-2"></i>Launch Tool
                </button>
                <button class="btn btn-secondary" onclick="this.closest('.custom-modal').remove()">
                    Close
                </button>
            </div>
        </div>
    `

  // Add modal styles
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `

  document.body.appendChild(modal)
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
    
    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
    }
    
    .modal-content {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        z-index: 1;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .modal-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    
    .modal-close:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .modal-features {
        margin-top: 1.5rem;
    }
    
    .modal-features h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
    }
    
    .modal-features ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .modal-features li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f3f4f6;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .modal-features li:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #10b981;
        font-weight: bold;
    }
    
    .modal-footer {
        display: flex;
        gap: 0.75rem;
        padding: 1.5rem;
        border-top: 1px solid #e5e7eb;
        justify-content: flex-end;
    }
    
    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: all 0.3s ease;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        color: white;
    }
    
    .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .btn-secondary {
        background: #f3f4f6;
        color: #374151;
    }
    
    .btn-secondary:hover {
        background: #e5e7eb;
    }
`
document.head.appendChild(style)
