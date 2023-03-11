import moment from "moment"

const memberSince = (time) => {
    const since = Number(time)

    let text = `for ${moment(since).fromNow(true)}`
    if (fromToday(since)) {
        text = "since today"
    }
    else if (lessThanaDay(since)) {
        text = "for a day"
    }
    return "Member " + text
}

const fromToday = (loginTime) => {
    return moment(loginTime).isAfter(new Date().setHours(0, 0, 0, 0))
}

const lessThanaDay = (loginTime) => {
    return moment(loginTime).isAfter(new Date() - 1000 * 60 * 60 * 24)
}

export default memberSince