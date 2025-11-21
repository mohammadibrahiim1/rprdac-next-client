"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MailDisplay } from "./mail-display";
import { NavDesktop } from "./nav-desktop";
import { NavMobile } from "./nav-mobile";
import { MailDisplayMobile } from "./mail-display-mobile";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useDispatch, useSelector } from "react-redux";
import { RootState, appDispatch } from "@/redux/store/store";
import { setSelectedMail } from "@/redux/features/mail/mailSlice";

import { type Mail } from "../data";
import { useGetMailsQuery } from "@/redux/services/mailsApi";
import { MailList } from "./mail-list";

interface MailProps {
  accounts?: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const isMobile = useIsMobile();
  const dispatch: appDispatch = useDispatch();

  const [tab, setTab] = React.useState("all");

  // Redux selected mail
  const selectedMail = useSelector(
    (state: RootState) => state.mail.selectedMail
  );

  // RTK Query fetch mails
  const { data: mails = [] } = useGetMailsQuery();

  // select mail handler
  const handleSelectMail = (mail: Mail) => {
    dispatch(setSelectedMail(mail));
  };

  const filteredMails =
    tab === "all" ? mails : mails.filter((item) => item.read === false); // unread

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="items-stretch"
      >
        {/* LEFT NAVIGATION PANEL */}
        <ResizablePanel
          hidden={isMobile}
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=true`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=false`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <NavDesktop isCollapsed={isCollapsed} />
        </ResizablePanel>

        <ResizableHandle hidden={isMobile} withHandle />

        {/* MIDDLE MAIL LIST PANEL */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs
            defaultValue="all"
            className="flex h-full flex-col gap-0"
            onValueChange={(value) => setTab(value)}
          >
            <div className="flex items-center px-4 py-2">
              <div className="flex items-center gap-2">
                {isMobile && <NavMobile />}
                <h1 className="text-xl font-bold">Inbox</h1>
              </div>
              <TabsList className="ml-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </div>

            <Separator />

            <div className="bg-background/95 supports-backdrop-filter:bg-background/60 p-4 backdrop-blur">
              <form>
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>

            <div className="min-h-0">
              <MailList
                items={filteredMails}
                onSelectMail={handleSelectMail}
                selectedMail={null}
              />
            </div>
          </Tabs>
        </ResizablePanel>

        <ResizableHandle hidden={isMobile} withHandle />

        {/* RIGHT MAIL DISPLAY PANEL */}
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          hidden={isMobile}
          minSize={30}
        >
          {isMobile ? (
            <MailDisplayMobile mail={selectedMail} />
          ) : (
            <MailDisplay mail={selectedMail} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
