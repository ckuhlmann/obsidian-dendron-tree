import { EditorState } from "@codemirror/state";
import "obsidian";

declare module "obsidian" {
  enum PopoverState {
    Showing,
    Shown,
    Hiding,
    Hidden,
  }

  interface HoverParent {
    type?: string;
  }
  interface HoverPopover {
    parent: HoverParent | null;
    targetEl: HTMLElement;
    hoverEl: HTMLElement;
    position(pos?: MousePos): void;
    hide(): void;
    show(): void;
    shouldShowSelf(): boolean;
    timer: number;
    waitTime: number;
    shouldShow(): boolean;
    transition(): void;
  }

  interface MousePos {
    x: number;
    y: number;
  }
  interface PagePreviewPlugin {
    onLinkHover(
      parent: HoverParent,
      tergetEl: HTMLElement,
      link: string,
      sourcePath: string,
      state: EditorState
    );
  }
  interface InternalPlugins {
    "page-preview": PagePreviewPlugin;
  }

  interface App {
    internalPlugins: {
      getEnabledPluginById<T extends keyof InternalPlugins>(id: T): InternalPlugins[T] | undefined;
    };
  }
  interface MarkdownRenderer {
    renderer: {
      set(markdown: string): void;
    };
  }
  interface MarkdownRendererConstructorType {
    new (app: App, container: HTMLElement, queed: boolean): MarkdownRenderer;
  }

  interface Workspace {
    registerEditorExtension(extension: Extension): void;
    unregisterEditorExtension(extension: Extension): void;
  }

  interface PopoverSuggest<T> {
    suggestEl: HTMLDivElement;
    suggestions: {
      setSuggestions(list: T[]);
    };
    setAutoDestroy(el: HTMLElement);
    reposition({ left: number, right: number, top: number, bottom: number });
  }

  interface ClickableToken {
    type: string;
    text: string;
    start: EditorPosition;
    end: EditorPosition;
  }

  interface Editor {
    getClickableTokenAt?: (pos: EditorPosition) => ClickableToken | undefined;
  }
}
