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
import {
  MenuItem,
} from './model/menu-item.model';

export namespace Components {
  interface MoonButton {
    'caption': string;
    'ctx': Context;
    'next': string;
  }
  interface MoonHeader {
    'caption': string;
  }
  interface MoonLabel {
    'caption': string;
  }
  interface MoonPanel {
    'caption': string;
  }
  interface PolarisAnalytics {}
  interface PolarisLoader {}
  interface PolarisMain {
    'ctx': Context;
  }
  interface PolarisMenu {
    'ctx'?: Context;
    'items': Array<MenuItem>|string;
  }
  interface PolarisWorkflow {
    'activity': string;
    'ctx': Context;
    'load': (process: any, next?: string, sessionId?: string) => Promise<void>;
    'parent': Context;
    'process': string|object;
    'sessionId': string;
    'setServices': (ctx: Context) => Promise<void>;
    'tag': string;
    'url': string;
    'value'?: any;
  }
}

declare global {


  interface HTMLMoonButtonElement extends Components.MoonButton, HTMLStencilElement {}
  var HTMLMoonButtonElement: {
    prototype: HTMLMoonButtonElement;
    new (): HTMLMoonButtonElement;
  };

  interface HTMLMoonHeaderElement extends Components.MoonHeader, HTMLStencilElement {}
  var HTMLMoonHeaderElement: {
    prototype: HTMLMoonHeaderElement;
    new (): HTMLMoonHeaderElement;
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

  interface HTMLPolarisLoaderElement extends Components.PolarisLoader, HTMLStencilElement {}
  var HTMLPolarisLoaderElement: {
    prototype: HTMLPolarisLoaderElement;
    new (): HTMLPolarisLoaderElement;
  };

  interface HTMLPolarisMainElement extends Components.PolarisMain, HTMLStencilElement {}
  var HTMLPolarisMainElement: {
    prototype: HTMLPolarisMainElement;
    new (): HTMLPolarisMainElement;
  };

  interface HTMLPolarisMenuElement extends Components.PolarisMenu, HTMLStencilElement {}
  var HTMLPolarisMenuElement: {
    prototype: HTMLPolarisMenuElement;
    new (): HTMLPolarisMenuElement;
  };

  interface HTMLPolarisWorkflowElement extends Components.PolarisWorkflow, HTMLStencilElement {}
  var HTMLPolarisWorkflowElement: {
    prototype: HTMLPolarisWorkflowElement;
    new (): HTMLPolarisWorkflowElement;
  };
  interface HTMLElementTagNameMap {
    'moon-button': HTMLMoonButtonElement;
    'moon-header': HTMLMoonHeaderElement;
    'moon-label': HTMLMoonLabelElement;
    'moon-panel': HTMLMoonPanelElement;
    'polaris-analytics': HTMLPolarisAnalyticsElement;
    'polaris-loader': HTMLPolarisLoaderElement;
    'polaris-main': HTMLPolarisMainElement;
    'polaris-menu': HTMLPolarisMenuElement;
    'polaris-workflow': HTMLPolarisWorkflowElement;
  }
}

declare namespace LocalJSX {
  interface MoonButton {
    'caption'?: string;
    'ctx'?: Context;
    'next'?: string;
  }
  interface MoonHeader {
    'caption'?: string;
  }
  interface MoonLabel {
    'caption'?: string;
  }
  interface MoonPanel {
    'caption'?: string;
  }
  interface PolarisAnalytics {}
  interface PolarisLoader {}
  interface PolarisMain {
    'ctx'?: Context;
  }
  interface PolarisMenu {
    'ctx'?: Context;
    'items'?: Array<MenuItem>|string;
  }
  interface PolarisWorkflow {
    'activity'?: string;
    'ctx'?: Context;
    'onWfMessage'?: (event: CustomEvent<any>) => void;
    'parent'?: Context;
    'process'?: string|object;
    'sessionId'?: string;
    'tag'?: string;
    'url'?: string;
    'value'?: any;
  }

  interface IntrinsicElements {
    'moon-button': MoonButton;
    'moon-header': MoonHeader;
    'moon-label': MoonLabel;
    'moon-panel': MoonPanel;
    'polaris-analytics': PolarisAnalytics;
    'polaris-loader': PolarisLoader;
    'polaris-main': PolarisMain;
    'polaris-menu': PolarisMenu;
    'polaris-workflow': PolarisWorkflow;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'moon-button': LocalJSX.MoonButton & JSXBase.HTMLAttributes<HTMLMoonButtonElement>;
      'moon-header': LocalJSX.MoonHeader & JSXBase.HTMLAttributes<HTMLMoonHeaderElement>;
      'moon-label': LocalJSX.MoonLabel & JSXBase.HTMLAttributes<HTMLMoonLabelElement>;
      'moon-panel': LocalJSX.MoonPanel & JSXBase.HTMLAttributes<HTMLMoonPanelElement>;
      'polaris-analytics': LocalJSX.PolarisAnalytics & JSXBase.HTMLAttributes<HTMLPolarisAnalyticsElement>;
      'polaris-loader': LocalJSX.PolarisLoader & JSXBase.HTMLAttributes<HTMLPolarisLoaderElement>;
      'polaris-main': LocalJSX.PolarisMain & JSXBase.HTMLAttributes<HTMLPolarisMainElement>;
      'polaris-menu': LocalJSX.PolarisMenu & JSXBase.HTMLAttributes<HTMLPolarisMenuElement>;
      'polaris-workflow': LocalJSX.PolarisWorkflow & JSXBase.HTMLAttributes<HTMLPolarisWorkflowElement>;
    }
  }
}


