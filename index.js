$(document).ready(function () {

    const select = $(".employees-amount-select")
    const options = $('.employees-amount-options')
    const option = $('.employees-amount-option')
    const resultPrice = $('#result-price')
    const calcValues = $('.calc-value')
    const durationSwitcher = $('#duration-switcher')
    const openModalButton = $('#open-modal-button')
    const closeModalButton = $('.close')
    const formModal = $('#form-modal')
    const formModalContent = $('#form-modal-content')

    const productPrices = {
        recruiting: [120, 120, 120],
        development: [5, 4, 3],
        assessment: [3, 2, 1],
        efficiency: [4, 3, 2],
    }

    const yearDiscount = 12 * 0.8

    const employeesAmount = [100, 300, 500, null]

    function updateTotalCost() {
        const isYearDuration = !$('#duration-switcher')[0].checked
        let result = 0
        let priceRange = $('.selected-option').attr('range')
        if (priceRange == 3) {
            setNoPriceStatus()
            return
        }
        calcValues.each((_, el) => {
            const multiplier = el.id === 'recruiting' ? 1 : employeesAmount[priceRange]
            if (el.checked) {
                let addCost = productPrices[el.id][priceRange] * multiplier
                isYearDuration && (addCost *= yearDiscount)
                result += addCost
            }
        });
        $('.product-price-wrapper').removeClass('not-visible')
        $('#result-price').removeClass('request-price')
        resultPrice.html(`${Math.trunc(result).toLocaleString('ru')}$`)
    }

    function updatePrices() {
        let priceRange = $('.selected-option').attr('range')
        if (priceRange == 3) {
            setNoPriceStatus()
            return
        }
        Object.keys(productPrices).forEach(function (el) {
            const value = (productPrices[el][priceRange])
            $(`#${el}-price`).html(`${value}$`)
        })
    }

    function setNoPriceStatus() {
        $('.product-price-wrapper').addClass('not-visible')
        $('#result-price').addClass('request-price').text('Цена по запросу')
    }

    calcValues.change(function () {
        updateTotalCost()
    })

    $(window).click(function () {
        select.removeClass('focused rotated')
        options.hide()
    });
    select.click(function (e) {
        e.stopPropagation();
        select.toggleClass('focused rotated')
        options.toggle();
    });
    option.click(function (e) {
        const value = $(e.target).text()
        select.html(value).removeClass('rotated')
        option.removeClass('selected-option')
        $(e.target).toggleClass('selected-option')
        updatePrices()
        updateTotalCost()
    })
    durationSwitcher.change(function () {
        updateTotalCost()
    })


    openModalButton.on('click', function () {
        formModal.show(300)
    })


    closeModalButton.on('click', function () {
        formModal.hide(300)
    })

    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function (e) {
        if (e.target == formModal[0]) {
            formModal.hide(300)
        }
    })
})