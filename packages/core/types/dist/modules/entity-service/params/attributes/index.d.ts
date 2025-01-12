import type * as Schema from '../../../../schema';
import type * as UID from '../../../../uid';
import type { Array, Constants, If, Extends, IsNotNever, MatchFirst } from '../../../../utils';
import type { OmitRelationsWithoutTarget, RelationInputValue } from './relation';
import type { ID } from './id';
import type * as Literals from './literals';
export * from './id';
export * from './utils';
export * from './literals';
export * from './relation';
/**
 * List of possible values for the scalar attributes
 * Uses the local GetValue to benefit from the values' overrides
 */
export type ScalarValues = GetValue<Schema.Attribute.BigInteger | Schema.Attribute.Boolean | Schema.Attribute.DateTime | Schema.Attribute.Date | Schema.Attribute.Decimal | Schema.Attribute.Email | Schema.Attribute.Enumeration<string[]> | Schema.Attribute.Float | Schema.Attribute.Integer | Schema.Attribute.Blocks | Schema.Attribute.JSON | Schema.Attribute.RichText | Schema.Attribute.String | Schema.Attribute.Text | Schema.Attribute.Time | Schema.Attribute.Timestamp | Schema.Attribute.UID>;
/**
 * Attribute.GetValues override with extended values
 */
export type GetValues<TSchemaUID extends UID.Schema> = {
    id?: ID;
} & OmitRelationsWithoutTarget<TSchemaUID, {
    [TKey in Schema.OptionalAttributeNames<TSchemaUID>]?: GetValue<Schema.AttributeByName<TSchemaUID, TKey>>;
} & {
    [TKey in Schema.RequiredAttributeNames<TSchemaUID>]-?: GetValue<Schema.AttributeByName<TSchemaUID, TKey>>;
}>;
/**
 * Attribute.GetValue override with extended values
 *
 * Fallback to unknown if never is found
 */
export type GetValue<TAttribute extends Schema.Attribute.Attribute, TGuard = unknown> = If<IsNotNever<TAttribute>, MatchFirst<[
    [
        Extends<TAttribute, Schema.Attribute.OfType<'relation'>>,
        TAttribute extends Schema.Attribute.Relation<infer TRelationKind, infer TTarget> ? If<IsNotNever<TTarget>, RelationInputValue<TRelationKind>> : never
    ],
    [
        Extends<TAttribute, Schema.Attribute.OfType<'dynamiczone'>>,
        TAttribute extends Schema.Attribute.DynamicZone<infer TComponentsUIDs> ? Array<Array.Values<TComponentsUIDs> extends infer TComponentUID ? TComponentUID extends UID.Component ? GetValues<TComponentUID> & {
            __component: TComponentUID;
        } : never : never> : never
    ],
    [
        Extends<TAttribute, Schema.Attribute.OfType<'component'>>,
        TAttribute extends Schema.Attribute.Component<infer TComponentUID, infer TRepeatable> ? TComponentUID extends UID.Component ? GetValues<TComponentUID> extends infer TValues ? If<TRepeatable, TValues[], TValues> : never : never : never
    ],
    [
        Extends<TAttribute, Schema.Attribute.Boolean>,
        Literals.BooleanValue
    ],
    [
        Extends<TAttribute, Schema.Attribute.Integer | Schema.Attribute.BigInteger | Schema.Attribute.Float | Schema.Attribute.Decimal>,
        Literals.NumberValue
    ],
    [
        Extends<TAttribute, Schema.Attribute.Time>,
        Literals.TimeValue
    ],
    [
        Extends<TAttribute, Schema.Attribute.Date>,
        Literals.DateValue
    ],
    [
        Extends<TAttribute, Schema.Attribute.Timestamp | Schema.Attribute.DateTime>,
        Literals.DateTimeValue
    ],
    [
        Constants.True,
        Schema.Attribute.Value<TAttribute, TGuard>
    ]
], unknown>, unknown>;
//# sourceMappingURL=index.d.ts.map