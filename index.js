const fs = require('fs-extra');
const path = require('path');
const {Solar} = require('lunar-typescript');
const request = require('sync-request');

const calenders = [
    {
        type: "lunar",
        desc: "农历节日",
        color: "#C339DBFF"
    },
    {
        type: "lunar_other",
        desc: "农历其他节日",
        color: "#A821A5FF"
    },
    {
        type: "common",
        desc: "通用节日",
        color: "#741F83FF"
    },
    {
        type: "common_other",
        desc: "通用其他节日",
        color: "#5F156CFF"
    },
]

const officialHolidayCalender = request('GET', 'https://calendars.icloud.com/holidays/cn_zh.ics').getBody('utf8');

function build(calender) {
    let nodes = ['BEGIN:VCALENDAR'];
    nodes.push('VERSION:2.0');
    nodes.push(`X-WR-CALNAME:${calender.desc}`);
    nodes.push('X-WR-CALDESC:');
    nodes.push(`X-APPLE-CALENDAR-COLOR:${calender.color}`);
    nodes = nodes.concat(loadEvents(calender.type));
    nodes.push('END:VCALENDAR');
    const content = nodes.join('\n');
    fs.outputFile(filename(calender.type), content);
}

function loadEvents(type) {
    let events = [];
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);
    start.setFullYear(now.getFullYear() - 3, 0, 1);
    end.setFullYear(now.getFullYear() + 3, 0, 1);
    let currentDay = start;
    while (currentDay.getTime() <= end.getTime()) {
        let festival = getFestival(Solar.fromDate(currentDay), type);
        if (festival && festival.length > 0 && officialNotContain(festival)) {
            const year = currentDay.getFullYear();
            const month = currentDay.getMonth() + 1;
            const date = currentDay.getDate();
            let event = buildEvent(festival, `${year}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}`);
            events.push(...event)
        }
        currentDay = nextDate(currentDay);
    }
    return events;
}

function getFestival(d, type) {
    let festivals = d.getOtherFestivals()
    if (type === 'common_other' && festivals.length > 0) {
        return festivals[0]
    }
    festivals = d.getFestivals()
    if (type === 'common' && festivals.length > 0) {
        return festivals[0]
    }
    const lunar = d.getLunar()
    festivals = lunar.getOtherFestivals()
    if (type === 'lunar_other' && festivals.length > 0) {
        return festivals[0]
    }
    festivals = lunar.getFestivals()
    if (type === 'lunar' && festivals.length > 0) {
        return festivals[0]
    }
    return ''
}


function buildEvent(summary, day) {
    let event = [];
    event.push('BEGIN:VEVENT');
    event.push(`DTSTART;VALUE=DATE:${day}`)
    event.push(`DTEND;VALUE=DATE:${day}`)
    event.push(`SUMMARY:${summary}`)
    event.push('SEQUENCE:0');
    event.push('END:VEVENT');
    return event;
}

function officialNotContain(festival) {
    const additionalFestival = festival.indexOf('节') > 0 ? festival.replace('节', '') : (festival + '节');
    return officialHolidayCalender.indexOf(festival) < 0 && officialHolidayCalender.indexOf(additionalFestival) < 0;
}

function nextDate(day) {
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay;
}

function filename(name) {
    return path.join(__dirname, 'dist', name + '.ics');
}

for (let calender of calenders) {
    build(calender);
}