"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clock {
    constructor(timestampAdjustment) {
        this._timestampAdjustment = timestampAdjustment || 0;
    }
    /**
     * @description Set the timestampAdjustment which is the number of seconds the system time should
     * be adjusted for every API call.
     *
     * @param timestampAdjustment seconds to adjust the system time.
     */
    setTimestampAdjustment(timestampAdjustment) {
        this._timestampAdjustment = timestampAdjustment;
    }
    /**
     * @description Get the current value of timestampAdjustment.
     */
    get timestampAdjustment() {
        return this._timestampAdjustment;
    }
    /**
     * @description Get the ISO8601 string for the current time adjusted by the timestampAdjustment.
     */
    getAdjustedIsoString() {
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() + this._timestampAdjustment);
        return timestamp.toISOString();
    }
}
exports.default = Clock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQXFCLEtBQUs7SUFHeEIsWUFBWSxtQkFBNEI7UUFDdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxzQkFBc0IsQ0FDM0IsbUJBQTJCO1FBRTNCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQkFBb0I7UUFDekIsTUFBTSxTQUFTLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN6RSxPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUFsQ0Qsd0JBa0NDIn0=