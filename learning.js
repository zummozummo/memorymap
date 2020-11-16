var MessageClass = /** @class */ (function () {
    function MessageClass(title, message) {
        this.title = title;
        this.message = message;
        this.isSent = false;
    }
    MessageClass.prototype.previewMessage = function () {
        return this.message;
    };
    Object.defineProperty(MessageClass.prototype, "messageStatus", {
        get: function () {
            var sentMessage = this.isSent ? "has been sent" : "has not been sent";
            return this.message + " | " + sentMessage;
        },
        enumerable: false,
        configurable: true
    });
    return MessageClass;
}());
var vars = new MessageClass("Hi", "by");
console.log(vars);
console.log(vars.messageStatus);
