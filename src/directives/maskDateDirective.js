const applyDateMask = (value) => {
    if (!value) return ''
    const cleanValue = value.replace(/\D+/g, '')
    const year = cleanValue.substring(0, 4)
    let month = cleanValue.substring(4, 6)
    let day = cleanValue.substring(6, 8)

    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)

    const getMaxDays = (month, year) => {
        switch(month) {
            case '01': case '03': case '05': case '07': case '08': case '10': case '12':
                return 31
            case '04': case '06': case '09': case '11':
                return 30
            case '02':
                return isLeapYear(year) ? 29 : 28
            default:
                return 31
        }
    }

    if (month > '12') month = '12'
    if (day) {
        const maxDays = getMaxDays(month, year)
        if (day > String(maxDays)) day = String(maxDays).padStart(2, '0')
    }

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
