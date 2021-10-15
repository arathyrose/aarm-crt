/* Getting required details about the browser and user location */

export async function getBrowserDetails() {
    let navigator_appVersion = ""
    let navigator_userAgent = ""
    let browser_name = ""
    let screen_height = 0
    let screen_width = 0

    try { navigator_appVersion = navigator.appVersion } catch { navigator_appVersion = "-" }
    try { navigator_userAgent = navigator.userAgent } catch { navigator_userAgent = "-" }
    try { browser_name = navigator.appName } catch { browser_name = "-" }
    try { screen_width = window.innerWidth } catch { screen_width = document.documentElement.clientWidth || document.body.clientWidth }
    try { screen_height = window.innerHeight } catch { screen_height = document.documentElement.clientHeight || document.body.clientHeight }

    return {
        browser_name,
        screen_height,
        screen_width,
        navigator_appVersion,
        navigator_userAgent
    }
}

export async function getIPDetails() {
    return await fetch('https://api.db-ip.com/v2/free/self')
        .then((response) => response.json())
        .then(data => {
            let ipAddressData = data
            let ip_ipAddress = ""
            let ip_continentCode = ""
            let ip_continentName = ""
            let ip_countryCode = ""
            let ip_countryName = ""
            let ip_stateProv = ""
            let ip_city = ""
            try { ip_ipAddress = ipAddressData.ipAddress } catch { ip_ipAddress = "-" }
            try { ip_continentCode = ipAddressData.continentCode } catch { ip_continentCode = "-" }
            try { ip_continentName = ipAddressData.continentName } catch { ip_continentName = "-" }
            try { ip_countryCode = ipAddressData.countryCode } catch { ip_countryCode = "-" }
            try { ip_countryName = ipAddressData.countryName } catch { ip_countryName = "-" }
            try { ip_stateProv = ipAddressData.stateProv } catch { ip_stateProv = "-" }
            try { ip_city = ipAddressData.city } catch { ip_city = "-" }
            return {
                ipAddress: ip_ipAddress,
                continentCode: ip_continentCode,
                continentName: ip_continentName,
                countryCode: ip_countryCode,
                countryName: ip_countryName,
                stateProv: ip_stateProv,
                city: ip_city
            }
        })
}

export function getCurrentTime() {
    var date = new Date();
    var timestamp = date.getTime();
    return timestamp
}