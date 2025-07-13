document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item")
  const contentPanels = document.querySelectorAll(".content-panel")
  let currentTab = "overview"
  let autoRotateInterval

  function showTab(tabId) {
    // Remove active class from all nav items and panels
    navItems.forEach((item) => item.classList.remove("active"))
    contentPanels.forEach((panel) => panel.classList.remove("active"))

    // Add active class to current tab
    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active")
    document.getElementById(tabId).classList.add("active")

    currentTab = tabId
  }

  function autoRotate() {
    const tabs = ["overview", "taxation", "auditing", "compliance"]
    const currentIndex = tabs.indexOf(currentTab)
    const nextIndex = (currentIndex + 1) % tabs.length
    showTab(tabs[nextIndex])
  }

  // Manual tab clicks
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab")
      showTab(tabId)

      // Reset auto-rotate timer
      clearInterval(autoRotateInterval)
      autoRotateInterval = setInterval(autoRotate, 5000)
    })
  })

  // Start auto-rotation
  autoRotateInterval = setInterval(autoRotate, 5000)

  // Pause auto-rotation on hover
  const dashboardPreview = document.querySelector(".dashboard-preview")
  dashboardPreview.addEventListener("mouseenter", () => {
    clearInterval(autoRotateInterval)
  })

  dashboardPreview.addEventListener("mouseleave", () => {
    autoRotateInterval = setInterval(autoRotate, 5000)
  })
})
