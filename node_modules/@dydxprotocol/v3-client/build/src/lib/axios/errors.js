"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosServerError = exports.AxiosError = void 0;
const errors_1 = require("../errors");
/**
 * An error thrown by axios.
 *
 * Depending on your use case, if logging errors, you may want to catch axios errors and sanitize
 * them to remove the request and response objects, or sensitive fields. For example:
 *
 *   this.originalError = _.omit(originalError.toJSON(), 'config')
 */
class AxiosError extends errors_1.WrappedError {
}
exports.AxiosError = AxiosError;
/**
 * Axios error with response error fields.
 */
class AxiosServerError extends AxiosError {
    constructor(response, originalError) {
        super(`${response.status}: ${response.statusText} - ${JSON.stringify(response.data, null, 2)}`, originalError);
        this.status = response.status;
        this.statusText = response.statusText;
        this.data = response.data;
    }
}
exports.AxiosServerError = AxiosServerError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9heGlvcy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBRW1CO0FBYW5COzs7Ozs7O0dBT0c7QUFDSCxNQUFhLFVBQVcsU0FBUSxxQkFBWTtDQUFHO0FBQS9DLGdDQUErQztBQUUvQzs7R0FFRztBQUNILE1BQWEsZ0JBQWlCLFNBQVEsVUFBVTtJQUs5QyxZQUNFLFFBQTRCLEVBQzVCLGFBQWlDO1FBRWpDLEtBQUssQ0FDSCxHQUFHLFFBQVEsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLFVBQVUsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQ3hGLGFBQWEsQ0FDZCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBakJELDRDQWlCQyJ9