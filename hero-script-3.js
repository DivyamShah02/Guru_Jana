document.addEventListener("DOMContentLoaded", () => {
  // Animate counter numbers
  function animateCounter(element, target, duration = 2000) {
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      if (target % 1 !== 0) {
        element.textContent = current.toFixed(1)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 16)
  }

  // Start counter animations
  const statValues = document.querySelectorAll(".stat-value")
  statValues.forEach((stat) => {
    const target = Number.parseFloat(stat.getAttribute("data-target"))
    animateCounter(stat, target)
  })

  // Animate progress bars
  setTimeout(() => {
    const progressBars = document.querySelectorAll(".progress-bar")
    progressBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0%"
      setTimeout(() => {
        bar.style.width = width
      }, 100)
    })
  }, 1000)

  // Auto-rotate active department
  const departments = document.querySelectorAll(".department-item")
  let currentDept = 0

  function rotateDepartment() {
    departments.forEach((dept) => dept.classList.remove("active"))
    departments[currentDept].classList.add("active")
    currentDept = (currentDept + 1) % departments.length
  }

  setInterval(rotateDepartment, 3000)

  // Add hover effects to stat cards
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(-5px) scale(1)"
    })
  })
})
