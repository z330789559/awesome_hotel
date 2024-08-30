import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { Validate, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'Matches', async: false })
export class MatchesConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `$property must match ${relatedPropertyName}`;
  }
}

export const PassWordMatches = function (
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    Validate(
      MatchesConstraint,
      [property],
      validationOptions,
    )(object, propertyName);
  };
};
