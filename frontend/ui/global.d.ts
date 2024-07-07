type Messages = typeof import("./messages/en.json")
type DEMessages = typeof import("./messages/de.json")
type DEMessages = typeof import("./messages/hu.json")

declare interface IntlMessages extends Messages,DEMessages{}