import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from './../errors/errors';

export function validateRequestBody<T extends object>(requiredFields?: (keyof T)[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        // If no requiredFields provided or empty array, just pass through
        if (!requiredFields || requiredFields.length === 0) {
            next();
            return;
        }

        const missingFields: string[] = [];

        requiredFields.forEach((field) => {
            if (req.body[field] === undefined || req.body[field] === null) {
                missingFields.push(String(field));
            }
        });

        if (missingFields.length > 0) {
            throw new BadRequestError(`Missing required fields: ${missingFields.join(', ')}`);
        }
        next();
    }
}
