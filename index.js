const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const {Solar, SolarMonth, HolidayUtil} = require('lunar-typescript');

const filename = path.join(__dirname, 'dist', 'holidays.ics');

function loadEvents() {
    let events = [];
    const start = new Date("2020-01-01");
    // const start = new Date("2023-07-30");
    const end = new Date();
    end.setFullYear(end.getFullYear() + 3, 1, 1);
    let currentDay = start;
    while (currentDay.getTime() <= end.getTime()) {
        let festival = getFestival(Solar.fromDate(currentDay));
        if (festival && festival.length > 0) {
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


function getFestival(d) {
    const lunar = d.getLunar()
    let festival = ''
    let otherFestivals = d.getOtherFestivals()
    if (otherFestivals.length > 0) {
        festival = otherFestivals[0]
    }
    otherFestivals = lunar.getOtherFestivals()
    if (otherFestivals.length > 0) {
        festival = otherFestivals[0]
    }
    let festivals = d.getFestivals()
    if (festivals.length > 0) {
        festival = festivals[0]
    }
    festivals = lunar.getFestivals()
    if (festivals.length > 0) {
        festival = festivals[0]
    }
    return festival
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

function nextDate(day) {
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay;
}


// 输出文件
function build(file) {
    let nodes = ['BEGIN:VCALENDAR'];
    nodes.push('VERSION:2.0');
    nodes.push('X-WR-CALNAME:节假日');
    nodes.push('X-WR-CALDESC:');
    nodes.push('X-APPLE-CALENDAR-COLOR:#65db39FF');
    // 追加 event
    const events = loadEvents();
    nodes = nodes.concat(events);

    nodes.push('END:VCALENDAR');

    const content = nodes.join('\n');
    fs.outputFile(file, content);
}

build(filename);