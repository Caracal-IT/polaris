# polaris-workflow



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type               | Default     |
| ----------- | ------------ | ----------- | ------------------ | ----------- |
| `activity`  | `activity`   |             | `string`           | `undefined` |
| `ctx`       | --           |             | `Context`          | `this`      |
| `parent`    | --           |             | `Context`          | `undefined` |
| `process`   | `process`    |             | `object \| string` | `undefined` |
| `sessionId` | `session-id` |             | `string`           | `undefined` |
| `tag`       | `tag`        |             | `string`           | `undefined` |
| `url`       | `url`        |             | `string`           | `undefined` |
| `value`     | `value`      |             | `any`              | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `wfMessage` |             | `CustomEvent<any>` |


## Methods

### `load(process: any, next?: string, sessionId?: string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setServices(ctx: Context) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [polaris-main](../app/polaris-main)

### Graph
```mermaid
graph TD;
  polaris-main --> polaris-workflow
  style polaris-workflow fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with love!*
