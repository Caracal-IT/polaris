export interface Message {
    type: 'START_LOADING' |
          'END_LOADING' |
          'ERROR' |
          'VALIDATION_ERROR' |
          'WORKFLOW_CHANGING' |
          'WORKFLOW_CHANGED';
    description?: string;
    metadata?: any;
}