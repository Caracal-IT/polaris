/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Context,
} from './model/context.model';

export namespace Components {
  interface MoonButton {
    'caption': string;
    'ctx': Context;
    'next': string;
  }
  interface MoonLabel {
    'caption': string;
  }
  interface MoonPanel {
    'caption': string;
  }
  interface PolarisAnalytics {}
  interface PolarisWorkflow {
    'ctx': Context;
    'load': (process: any, next?: string, sessionId?: string) => Promise<void>;
    'process': string|object;
    'tag': string;
    'value'?: any;
  }
}

declare global {


  interface HTMLMoonButtonElement extends Components.MoonButton, HTMLStencilElement {}
  var HTMLMoonButtonElement: {
    prototype: HTMLMoonButtonElement;
    new (): HTMLMoonButtonElement;
  };

  interface HTMLMoonLabelElement extends Components.MoonLabel, HTMLStencilElement {}
  var HTMLMoonLabelElement: {
    prototype: HTMLMoonLabelElement;
    new (): HTMLMoonLabelElement;
  };

  interface HTMLMoonPanelElement extends Components.MoonPanel, HTMLStencilElement {}
  var HTMLMoonPanelElement: {
    prototype: HTMLMoonPanelElement;
    new (): HTMLMoonPanelElement;
  };

  interface HTMLPolarisAnalyticsElement extends Components.PolarisAnalytics, HTMLStencilElement {}
  var HTMLPolarisAnalyticsElement: {
    prototype: HTMLPolarisAnalyticsElement;
    new (): HTMLPolarisAnalyticsElement;
  };

  interface HTMLPolarisWorkflowElement extends Components.PolarisWorkflow, HTMLStencilElement {}
  var HTMLPolarisWorkflowElement: {
    prototype: HTMLPolarisWorkflowElement;
    new (): HTMLPolarisWorkflowElement;
  };
  interface HTMLElementTagNameMap {
    'moon-button': HTMLMoonButtonElement;
    'moon-label': HTMLMoonLabelElement;
    'moon-panel': HTMLMoonPanelElement;
    'polaris-analytics': HTMLPolarisAnalyticsElement;
    'polaris-workflow': HTMLPolarisWorkflowElement;
  }
}

declare namespace LocalJSX {
  interface MoonButton {
    'caption'?: string;
    'ctx'?: Context;
    'next'?: string;
  }
  interface MoonLabel {
    'caption'?: string;
  }
  interface MoonPanel {
    'caption'?: string;
  }
  interface PolarisAnalytics {}
  interface PolarisWorkflow {
    'ctx'?: Context;
    'onWfMessage'?: (event: CustomEvent<any>) => void;
    'process'?: string|object;
    'tag'?: string;
    'value'?: any;
  }

  interface IntrinsicElements {
    'moon-button': MoonButton;
    'moon-label': MoonLabel;
    'moon-panel': MoonPanel;
    'polaris-analytics': PolarisAnalytics;
    'polaris-workflow': PolarisWorkflow;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'moon-button': LocalJSX.MoonButton & JSXBase.HTMLAttributes<HTMLMoonButtonElement>;
      'moon-label': LocalJSX.MoonLabel & JSXBase.HTMLAttributes<HTMLMoonLabelElement>;
      'moon-panel': LocalJSX.MoonPanel & JSXBase.HTMLAttributes<HTMLMoonPanelElement>;
      'polaris-analytics': LocalJSX.PolarisAnalytics & JSXBase.HTMLAttributes<HTMLPolarisAnalyticsElement>;
      'polaris-workflow': LocalJSX.PolarisWorkflow & JSXBase.HTMLAttributes<HTMLPolarisWorkflowElement>;
    }
  }
}


