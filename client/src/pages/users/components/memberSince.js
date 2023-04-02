import moment from "moment"

const memberSince = (time) => {
    let text = `for ${moment(time).fromNow(true)}`
    if (fromToday(time)) {
        text = "since today"
    }
    else if (lessThanaDay(time)) {
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