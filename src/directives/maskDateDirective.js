const applyDateMask = (value) => {
    if (!value) return ''
    const cleanValue = value.replace(/\D+/g, '')
    const year = cleanValue.substring(0, 4)
    const month = cleanValue.substring(4, 6)
    const day = cleanValue.substring(6, 8)
    if (cleanValue.length <= 4) return year
    if (cleanValue.length <= 6) return `${year}-${month}`
    return `${year}-${month}-${day}`
}

const maskDateDirective = {
    beforeMount(el) {
        el.addEventListener('input', (event) => {
            const value = event.target.value
            event.target.value = applyDateMask(value)
            el.dispatchEvent(new Event('input'))
        })
    },
}

export default maskDateDirective
