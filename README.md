[![Node.js CI](https://github.com/norcm/iCal/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/norcm/iCal/actions/workflows/node.js.yml)

包含除法定节假日外的节日

法定节日订阅: [https://calendars.icloud.com/holidays/cn_zh.ics](https://calendars.icloud.com/holidays/cn_zh.ics)

## 订阅地址

| 类型           | Github                                                       | CDN                                                          | GHProxy                                                      |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 农历节假日     | https://raw.githubusercontent.com/norcm/iCal/main/dist/lunar.ics | https://cdn.jsdelivr.net/gh/norcm/iCal@main/dist/lunar.ics   | https://ghproxy.com/https://raw.githubusercontent.com/norcm/iCal/main/dist/lunar.ics |
| 农历其他节假日 | https://raw.githubusercontent.com/norcm/iCal/main/dist/lunar_other.ics | https://cdn.jsdelivr.net/gh/norcm/iCal@main/dist/lunar_other.ics | https://ghproxy.com/https://raw.githubusercontent.com/norcm/iCal/main/dist/lunar_other.ics |
| 通用节假日     | https://raw.githubusercontent.com/norcm/iCal/main/dist/common.ics | https://cdn.jsdelivr.net/gh/norcm/iCal@main/dist/common.ics  | https://ghproxy.com/https://raw.githubusercontent.com/norcm/iCal/main/dist/common.ics |
| 通用其他节假日 | https://raw.githubusercontent.com/norcm/iCal/main/dist/common_other.ics | https://cdn.jsdelivr.net/gh/norcm/iCal@main/dist/common_other.ics | https://ghproxy.com/https://raw.githubusercontent.com/norcm/iCal/main/dist/common_other.ics |

## 如何运行

```shell
yarn install
yarn run build
```

## 参考

[https://zh.wikipedia.org/zh/ICalendar](https://zh.wikipedia.org/zh/ICalendar)
