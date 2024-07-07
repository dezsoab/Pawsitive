type ENMessages = typeof import("./messages/en.json")
type DEMessages = typeof import("./messages/de.json")
type HUMessages = typeof import("./messages/hu.json")

declare interface IntlMessages extends HUMessages,ENMessages,DEMessages{}