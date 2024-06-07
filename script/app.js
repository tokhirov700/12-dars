document.addEventListener('DOMContentLoaded', populateCountryCodes);

function populateCountryCodes() {
    const url = 'https://date.nager.at/api/v3/AvailableCountries';
    fetch(url)
        .then(response => response.json())
        .then(countries => {
            const select = document.getElementById('countryCode');
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.countryCode;
                option.text = `${country.countryCode} (${country.name})`;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Mamlakat kodlarini olishda xatolik yuz berdi:', error);
        });
}

function getCountryInfo() {
    const countryCode = document.getElementById('countryCode').value;
    const url = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;
    fetch(url)
        .then(response => response.json())
        .then(countryInfo => {
            displayCountryInfo(countryInfo);
        })
        .catch(error => {
            document.getElementById('countryInfo').innerText = 'Mamlakat maʼlumotlarini olib boʻlmadi.';
            console.error('Mamlakat maʼlumotlarini olishda xatolik yuz berdi:', error);
        });
}

function displayCountryInfo(info) {
    const countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = `
        <p><strong>Country:</strong> ${info.commonName}</p>
        <p><strong>Official Name:</strong> ${info.officialName}</p>
        <p><strong>Region:</strong> ${info.region}</p>
        <p><strong>Continent:</strong> ${info.countryCode}</p>
    `;
}

function toggleInfoContainer() {
    document.getElementById('publicHolidays').innerHTML = '';
}

function getPublicHolidays() {
    const countryCode = document.getElementById('countryCode').value;
    const year = document.getElementById('yearInput').value;
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    fetch(url)
        .then(response => response.json())
        .then(holidays => {
            displayPublicHolidays(holidays, year);
        })
        .catch(error => {
            document.getElementById('publicHolidays').innerText = 'Bayramlar haqidagi maʼlumotlarni olib boʻlmadi.';
            console.error('Bayram kunlarini olishda xatolik yuz berdi:', error);
        });
}

function displayPublicHolidays(holidays, year) {
    const publicHolidaysDiv = document.getElementById('publicHolidays');
    publicHolidaysDiv.innerHTML = `<h3>Public Holidays in ${year}</h3>`;
    holidays.forEach(holiday => {
        const holidayDiv = document.createElement('div');
        holidayDiv.innerHTML = `
            <p><strong>Name:</strong> ${holiday.name}</p>
            <p><strong>Date:</strong> ${holiday.date}</p>
            <p><strong>Local Name:</strong> ${holiday.localName}</p>
            <p><strong>Country Code:</strong> ${holiday.countryCode}</p>
            <hr>
        `;
        publicHolidaysDiv.appendChild(holidayDiv);
    });
}
    

