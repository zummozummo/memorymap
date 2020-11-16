class MessageClass {
  title: string;
  message: string;
  private _isSent: boolean;
  set isSent(value: boolean) {
    if (value === true) {
      this.deliveryDate = new Date();
    }
    this._isSent = value;
  }
  get isSent(): boolean {
    return this._isSent;
  }
  deliveryDate: Date;
  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.isSent = false;
  }
  previewMessage(): string {
    return this.message;
  }
  get messageStatus(): string {
    const sentMessage = this.isSent ? "has been sent" : "has not been sent";
    return `${this.message} | ${sentMessage}`;
  }
}

const vars = new MessageClass("Hi", "by");
console.log(vars);
console.log(vars.messageStatus);
