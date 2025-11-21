import { accounts, mails } from "@/components/rpr-mail/data";
import MailPage from "@/components/rpr-mail/MailPage";
import { cookies } from "next/headers";

export default async function Notification() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail");
  const collapsed = (await cookies()).get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  return (
    <div className="max-w-6xl mx-auto h-screen">
      <div className="">
        <MailPage
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </div>
  );
}
