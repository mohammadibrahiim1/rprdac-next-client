declare module "react-resizable-panels" {
  import * as React from "react";

  interface PanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "horizontal" | "vertical";
    className?: string;
    children?: React.ReactNode;
    onLayout?: (sizes: number[]) => void; // added
  }

  interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    hidden?: boolean; // added
    collapsible?: boolean; // added
    collapsedSize?: number; // added
    onCollapse?: () => void; // added
    onResize?: () => void; // added
  }

  interface PanelResizeHandleProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    withHandle?: boolean; // added
    hidden?: boolean; // added
  }

  export const PanelGroup: React.FC<PanelGroupProps>;
  export const Panel: React.FC<PanelProps>;
  export const PanelResizeHandle: React.FC<PanelResizeHandleProps>;
}
