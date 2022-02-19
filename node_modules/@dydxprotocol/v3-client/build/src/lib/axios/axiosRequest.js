"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
async function axiosRequest(options) {
    try {
        const response = await axios_1.default(options);
        return response.data;
    }
    catch (error) {
        if (error.isAxiosError) {
            if (error.response) {
                throw new errors_1.AxiosServerError(error.response, error);
            }
            throw new errors_1.AxiosError(`Axios: ${error.message}`, error);
        }
        throw error;
    }
}
exports.axiosRequest = axiosRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpb3NSZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9heGlvcy9heGlvc1JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQWtEO0FBRWxELHFDQUdrQjtBQUVYLEtBQUssVUFBVSxZQUFZLENBQUMsT0FBMkI7SUFDNUQsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztLQUN0QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLHlCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbkQ7WUFDRCxNQUFNLElBQUksbUJBQVUsQ0FBQyxVQUFVLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4RDtRQUNELE1BQU0sS0FBSyxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBYkQsb0NBYUMifQ==