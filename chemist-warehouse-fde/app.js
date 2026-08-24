const PRODUCT_LINKS = {
  digitalStore: 'https://cw-digital-store.netlify.app',
  documentCompliance: 'https://cw-compliance-check.netlify.app',
}

const toast = document.querySelector('.toast')
let toastTimer

function showToast(message) {
  toast.textContent = message
  toast.hidden = false
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.hidden = true
  }, 4300)
}

document.querySelectorAll('[data-prototype]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.prototype === 'digital-store' ? 'digitalStore' : 'documentCompliance'
    const url = PRODUCT_LINKS[key]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    showToast('Prototype links will be connected after their independent preview URLs are verified.')
  })
})

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.14 },
  )

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'))
}
