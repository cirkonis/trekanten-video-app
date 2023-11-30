import Joi from "joi";
import {User} from "@/types/user";
import {BadRequest} from "@/app/api/_Error-Handlers/BadRequest";

export function validateUpdateUserBody(userToValidate: User){

    const schema = Joi.object({
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    // Validate the request body against the schema
    const { error, value } = schema.validate(userToValidate);

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return BadRequest();
    }

    return value;
}