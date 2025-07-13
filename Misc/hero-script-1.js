document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".gpt-card")
  const indicators = document.querySelectorAll(".indicator-dot")
  let currentIndex = 0

  function showCard(index) {
    // Hide all cards
    cards.forEach((card) => card.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    // Show current card
    cards[index].classList.add("active")
    indicators[index].classList.add("active")
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length
    showCard(currentIndex)
  }

  // Auto-rotate every 4 seconds
  setInterval(nextCard, 4000)

  // Manual indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index
      showCard(currentIndex)
    })
  })
})
