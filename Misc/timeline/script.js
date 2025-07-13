document.addEventListener("DOMContentLoaded", () => {
  // Hero Dashboard Preview Functionality
  const navItems = document.querySelectorAll(".dashboard-nav .nav-item")
  const contentPanels = document.querySelectorAll(".dashboard-content .content-panel")
  let currentTab = "overview"
  let autoRotateInterval

  function showTab(tabId) {
    navItems.forEach((item) => item.classList.remove("active"))
    contentPanels.forEach((panel) => panel.classList.remove("active"))

    const activeNavItem = document.querySelector(`[data-tab="${tabId}"]`)
    const activeContentPanel = document.getElementById(tabId)

    if (activeNavItem) activeNavItem.classList.add("active")
    if (activeContentPanel) activeContentPanel.classList.add("active")

    currentTab = tabId
  }

  function autoRotate() {
    const tabs = ["overview", "taxation", "auditing", "compliance"]
    const currentIndex = tabs.indexOf(currentTab)
    const nextIndex = (currentIndex + 1) % tabs.length
    showTab(tabs[nextIndex])
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab")
      showTab(tabId)

      clearInterval(autoRotateInterval)
      autoRotateInterval = setInterval(autoRotate, 5000)
    })
  })

  autoRotateInterval = setInterval(autoRotate, 5000)

  const dashboardPreview = document.querySelector(".dashboard-preview")
  if (dashboardPreview) {
    dashboardPreview.addEventListener("mouseenter", () => {
      clearInterval(autoRotateInterval)
    })

    dashboardPreview.addEventListener("mouseleave", () => {
      autoRotateInterval = setInterval(autoRotate, 5000)
    })
  }

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
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
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

  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    observer.observe(card)
  })

  // Form submission handling
  const loginForm = document.querySelector(".login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitButton = this.querySelector('button[type="submit"]')
      if (submitButton) {
        const removeLoading = addLoadingState(submitButton, "Authenticating...")

        setTimeout(() => {
          alert("Login functionality is for demonstration only.")
          removeLoading()
        }, 2000)
      }
    })
  }

  // --- NEW TIMELINE LOGIC ---
  const timelineData = [
    { year: 2003, description: "Guru & Jana is founded on Valentine’s Day" },
    { year: 2004, description: "Partner Induction Babu & Reddy" },
    { year: 2006, description: "Partner Induction Prashanth" },
    { year: 2010, description: "Vision 2020 & Go Paperless Initiative" },
    { year: 2011, description: "Partner Induction Heena, Ananth & Neelima" },
    { year: 2012, description: "Partner Induction Sri & Raja" },
    { year: 2013, description: "1st in India to file tax returns & started our foundation" },
    { year: 2014, description: "Published “Banter Beyond the Buck”" },
    { year: 2015, description: "Construction of Guru & Jana Home" },
    { year: 2016, description: "Became HLB Network member & introduced Practice Leaders" },
    { year: 2017, description: "Creation of IDT Team & Hyderabad Office inauguration" },
    { year: 2018, description: "Vande & Pune Offices inaugurated" },
    { year: 2019, description: "Guru & Jana have a new anthem" },
    { year: 2020, description: "Ambaari Office inaugurated in Mysore & 202020 accomplished" },
    { year: 2021, description: "Published “₹179 More” on FEMA" },
    { year: 2022, description: "Merger with Hi-Fid & Management Team Induction" },
    { year: 2024, description: "New corporate office inauguration" },
    { year: 2025, description: "Expansion with Gandhinagar, Udupi, and Chennai offices" },
  ]

  const timelineContainer = document.getElementById("timeline-events")

  if (timelineContainer) {
    timelineContainer.innerHTML = "" // Clear existing content

    timelineData.forEach((item, index) => {
      const eventElement = document.createElement("div")
      const side = index % 2 === 0 ? "left" : "right"
      eventElement.classList.add("timeline-event", side)

      eventElement.innerHTML = `
        <div class="timeline-content-box">
          <h3 class="timeline-year-title">${item.year}</h3>
          <p class="timeline-event-description">${item.description}</p>
        </div>
      `
      timelineContainer.appendChild(eventElement)
    })

    const timelineEvents = document.querySelectorAll(".timeline-event")
    const eventObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    timelineEvents.forEach((event) => {
      eventObserver.observe(event)
    })

    // Auto-scrolling logic
    let autoScrollInterval
    let userHasInteracted = false
    const scrollSpeed = 1 // pixels per frame
    const timelineSection = document.getElementById("timeline")

    const startAutoScrolling = () => {
      if (userHasInteracted) return

      autoScrollInterval = setInterval(() => {
        const timelineRect = timelineSection.getBoundingClientRect()
        // Stop if the bottom of the timeline is visible in the viewport
        if (timelineRect.bottom <= window.innerHeight + 50) {
          stopAutoScrolling()
        } else {
          window.scrollBy(0, scrollSpeed)
        }
      }, 20) // ~50fps
    }

    const stopAutoScrolling = () => {
      clearInterval(autoScrollInterval)
    }

    const handleUserInteraction = () => {
      if (!userHasInteracted) {
        userHasInteracted = true
        stopAutoScrolling()
        // Remove listeners after first interaction to avoid overhead
        window.removeEventListener("wheel", handleUserInteraction)
        window.removeEventListener("touchstart", handleUserInteraction)
        timelineSection.removeEventListener("mouseenter", stopAutoScrolling)
      }
    }

    // Stop auto-scroll on user interaction
    window.addEventListener("wheel", handleUserInteraction, { once: true })
    window.addEventListener("touchstart", handleUserInteraction, { once: true })
    timelineSection.addEventListener("mouseenter", stopAutoScrolling)
    timelineSection.addEventListener("mouseleave", () => {
      if (!userHasInteracted) {
        startAutoScrolling()
      }
    })

    // Observer to start auto-scrolling when timeline comes into view
    const scrollStartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start scrolling after a short delay
            setTimeout(startAutoScrolling, 2000)
            scrollStartObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    scrollStartObserver.observe(timelineSection)
  }
})

// Helper Functions
function addLoadingState(button, loadingText = "Loading...") {
  const originalText = button.innerHTML
  button.innerHTML = `<span class="loading"></span> ${loadingText}`
  button.disabled = true

  return function removeLoadingState() {
    button.innerHTML = originalText
    button.disabled = false
  }
}
